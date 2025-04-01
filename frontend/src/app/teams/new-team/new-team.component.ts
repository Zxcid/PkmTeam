import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, finalize, Observable, Subject, switchMap } from "rxjs";
import { ESpinnerType } from 'src/app/shared/constants/app.constants';
import { ESections } from 'src/app/shared/constants/routing.constants';
import { ICreateTeamRequest, ITeamDto } from 'src/app/shared/constants/team.model';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { teamNameValidator } from 'src/app/shared/validators/team-name.validator';
import { IPokemon } from "../../shared/constants/pokemon.model";
import { PokemonService } from "../../shared/services/pokemon.service";
import { TeamPokemonForm } from '../constants/form.constants';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit, OnDestroy {
  isTitleEditable = false;
  teamCount = 0;
  teamForm!: FormGroup;
  pokemonList!: Observable<IPokemon[]>;
  pkmSearch$ = new Subject<string>();
  destroy$ = new Subject<boolean>();

  get teamMembers(): FormArray {
    return this.teamForm.get('teamMembers') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private pkmService: PokemonService,
    private teamService: TeamsService,
    private spinner: SpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();

    this.pokemonList = this.pkmSearch$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((pkmName: string) => {
        this.spinner.show(ESpinnerType.POKE);
        return this.pkmService.searchPokemonAutocomplete(pkmName).pipe(
          finalize(() => this.spinner.hide())
        );
      })
    );
  }

  toggleIsTitleEditable(): void {
    this.isTitleEditable = !this.isTitleEditable;
  }

  onPkmSearch(event: Event): void {
    this.pkmSearch$.next((event.target as HTMLInputElement).value);
  }

  onPokemonSelected(event: MatAutocompleteSelectedEvent): void {
    if (this.teamMembers.length >= 6) {
      this.teamForm.get('pokemonSearch')?.reset();
      throw new Error('You can only have 6 Pokémon in a team!');
    }

    const selected: IPokemon = event.option.value;

    const pkmForm = this.fb.group({
      pkPokemon: [selected.pkPokemon],
      name: [selected.name],
      spriteUrl: [selected.spriteUrl],
      types: [selected.types]
    });

    this.teamMembers.push(pkmForm);
    this.teamForm.get('pokemonSearch')?.reset();
  }

  onPokemonRemoved(index: number): void {
    this.teamMembers.removeAt(index);
  }

  onSubmit(): void {
    const { teamName, teamMembers } = this.teamForm.getRawValue();
    const request: ICreateTeamRequest = {
      teamName: teamName,
      pkPokemons: teamMembers.map((pkm: TeamPokemonForm) => pkm.pkPokemon)
    };

    this.spinner.show(ESpinnerType.PIKA);
    this.teamService.saveTeam(request)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        next: (response: ITeamDto) => this.router.navigate([ESections.teams, response.pkUserTeam]),
        error: (error: HttpErrorResponse) => new Error(error.message)
      });
  }

  deleteTeam(): void {
    // TODO
  }

  private createForm(): void {
    this.teamForm = this.fb.group({
      teamName: ['', {
        validators: [Validators.required],
        asyncValidators: [teamNameValidator(this.teamService)],
        updateOn: 'change' // 'blur'
      }],
      pokemonSearch: [''],
      teamMembers: this.fb.array([])
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
