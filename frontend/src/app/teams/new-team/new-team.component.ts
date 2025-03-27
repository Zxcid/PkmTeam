import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { catchError, debounceTime, distinctUntilChanged, finalize, forkJoin, from, map, Observable, of, startWith, Subject, switchMap, tap } from "rxjs";
import { ESpinnerType } from 'src/app/shared/constants/app.constants';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { IPokemon } from "../../shared/constants/pokemon.model";
import { ITeam } from "../../shared/constants/team.model";
import { PokemonService } from "../../shared/services/pokemon.service";

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
  team!: ITeam;
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
    private spinner: SpinnerService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createForm();

    this.pokemonList = this.pkmSearch$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.spinner.show(ESpinnerType.POKE)),
        switchMap((pkmName: string) => this.pkmService.searchPokemonAutocomplete(pkmName)
            .pipe(
              catchError(error => {
                console.error('Error fetching Pokémon:', error);
                return of([]);
              }),
              finalize(() => this.spinner.hide())
            )
        )
      );
  }

  toggleIsTitleEditable(): void {
    this.isTitleEditable = !this.isTitleEditable;
  }

  getTeamName(): string {
    return !!this.teamName ? this.teamName : `Team #${this.teamCount + 1}`;
  }

  onSubmit(): void {
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
