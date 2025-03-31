import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, finalize, Observable, Subject, switchMap } from "rxjs";
import { ESpinnerType } from 'src/app/shared/constants/app.constants';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { IPokemon } from "../../shared/constants/pokemon.model";
import { PokemonService } from "../../shared/services/pokemon.service";
import { TeamsService } from 'src/app/shared/services/teams.service';
import { ICreateTeamRequest } from 'src/app/shared/constants/team.model';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit, OnDestroy {
  storage: Storage = inject(Storage);

  isTitleEditable: boolean = false;
  teamMembers: IPokemon[] = [];
  teamForm!: FormGroup;
  teamCount: number = 0;

  private _teamName!: string;
  get teamName(): string {
    return this._teamName;
  }

  set teamName(value: string) {
    this._teamName = value;
  }

  pokemonList!: Observable<IPokemon[]>;
  pkmSearch$: Subject<string> = new Subject<string>();
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private pkmService: PokemonService,
    private teamService: TeamsService,
    private spinner: SpinnerService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createForm();

    this.pokemonList = this.pkmSearch$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((pkmName: string) => {
          this.spinner.show(ESpinnerType.POKE);
          return this.pkmService.searchPokemonAutocomplete(pkmName)
            .pipe(
              finalize(() => this.spinner.hide())
            )
        })
      );
  }

  toggleIsTitleEditable(): void {
    this.isTitleEditable = !this.isTitleEditable;
  }

  getTeamName(): string {
    return !!this.teamName ? this.teamName : `Team #${this.teamCount + 1}`;
  }

  onSubmit(): void {
    const teamMembers: number[] = this.teamMembers.map(pk => pk.pkPokemon);
    const request: ICreateTeamRequest = {
      teamName: this.getTeamName(),
      pkPokemons: teamMembers
    };

    this.spinner.show(ESpinnerType.PIKA);
    this.teamService.saveTeam(request)
      .pipe(
        finalize(() => this.spinner.hide())
      )
      .subscribe();
  }

  onPkmSearch(event: Event): void {
    this.pkmSearch$.next((event.target as HTMLInputElement).value);
  }

  onPokemonSelected(event: MatAutocompleteSelectedEvent): void {
    if (this.teamMembers.length >= 6) {
      this.teamForm.get('pokemonSearch')?.reset();
      throw new Error('You can only have 6 pokemon in a team! Please, remove one before adding another.');
    }

    const selectedPokemon: IPokemon = event.option.value;
    this.teamMembers.push(selectedPokemon);
    this.teamForm.get('pokemonSearch')?.reset();
  }

  onPokemonRemoved(i: number) {
    this.teamMembers.splice(i, 1);
  }

  deleteTeam(): void { }

  private createForm(): void {
    this.teamForm = this.fb.group({
      teamName: ['', [Validators.required]],
      pokemonSearch: ['']
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
