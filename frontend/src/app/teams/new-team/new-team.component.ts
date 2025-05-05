import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, finalize, Observable, Subject, switchMap, tap } from "rxjs";
import { ESpinnerType } from 'src/app/shared/constants/app.constants';
import { ESections } from 'src/app/shared/constants/routing.constants';
import { ICreateTeamRequest, ITeamDto } from 'src/app/shared/constants/team.model';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { TeamsService } from 'src/app/shared/services/teams.service';
import { teamNameValidator } from 'src/app/shared/validators/team-name.validator';
import { IPokemon } from "../../shared/constants/pokemon.model";
import { PokemonService } from "../../shared/services/pokemon.service";
import { TeamPokemonForm } from '../constants/form.constants';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit, OnDestroy {
  editMode: boolean = false;
  pkUserTeam!: number;
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
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.editMode = true;
      this.pkUserTeam = +id;
      this.getTeamDetails(+id);
    }

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
    this.teamForm.markAsDirty();
  }

  onPokemonRemoved(index: number): void {
    this.teamMembers.removeAt(index);
  }

  onSubmit(): void {
    const { teamName, teamMembers } = this.teamForm.getRawValue();

    if (!teamName || teamName === 'New Team')
      throw new Error('Please, insert a valid name for the team');

    if (!this.editMode && this.teamForm.get('teamName')?.hasError('teamNameTaken'))
      throw new Error('The team name is already in use.');

    if (this.teamForm.pristine) {
      this.snackbar.warning('There are no changes in the team.');
      return;
    }

    const request: ICreateTeamRequest = {
      teamName: teamName,
      pkPokemons: teamMembers.map((pkm: TeamPokemonForm) => pkm.pkPokemon)
    };

    if (this.pkUserTeam) 
      this.updateTeam(request)
    else 
      this.saveTeam(request);
  }

  private saveTeam(request: ICreateTeamRequest): void {
    this.spinner.show(ESpinnerType.PIKA);
    this.teamService.saveTeam(request)
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        next: (response: ITeamDto) => !this.editMode ? this.router.navigate([ESections.teams, response.pkUserTeam]) : null,
        error: (error: HttpErrorResponse) => new Error(error.message)
      });
  }

  private updateTeam(request: ICreateTeamRequest): void {
    this.spinner.show(ESpinnerType.PIKA);
    this.teamService.updateTeam(request, this.pkUserTeam)
      .pipe(
        finalize(() => this.spinner.hide())
      )
      .subscribe();
  }

  onDeleteTeam() {
    this.spinner.show(ESpinnerType.PIKA);
    this.teamService.deleteTeam(this.pkUserTeam)
      .subscribe({
        next: () => this.router.navigate([ESections.teams, ESections.new_team]),
        error: (error: HttpErrorResponse) => new Error(error.message),
        complete: () => this.spinner.hide()
      });
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

  private getTeamDetails(id: number): void {
    this.spinner.show(ESpinnerType.PIKA);
    this.teamService.getUserTeamById(+id!)
      .pipe(
        tap((team) => console.log('team: ', team)),
        finalize(() => this.spinner.hide())
      )
      .subscribe((team: ITeamDto) => this.patchValueToForm(team));
  }

  private patchValueToForm(team: ITeamDto): void {
    const { name, teamMembers } = team;

    this.teamForm.patchValue({ teamName: name });

    teamMembers.forEach(pkm => {
      const pkmForm = this.fb.group({
        pkPokemon: [pkm.pkPokemon],
        name: [pkm.name],
        spriteUrl: [pkm.spriteUrl],
        types: [pkm.types]
      });

      this.teamMembers.push(pkmForm);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
