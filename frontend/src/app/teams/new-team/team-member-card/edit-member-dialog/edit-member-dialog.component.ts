import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IAbility, INature } from 'src/app/shared/constants/pokemon.model';
import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { TeamPokemonForm } from 'src/app/teams/constants/form.constants';

export type TEditPokemonData = {
  teamPokemon: TeamPokemonForm
}

@Component({
  selector: 'app-edit-member-dialog',
  templateUrl: './edit-member-dialog.component.html',
  styleUrls: ['./edit-member-dialog.component.scss']
})
export class EditMemberDialogComponent implements OnInit {

  pokemonDetailForm!: FormGroup;
  natureList!: Observable<INature[]>;
  abilityList!: Observable<IAbility[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TEditPokemonData,
    private dialogRef: MatDialogRef<EditMemberDialogComponent>,
    private fb: FormBuilder,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.populateDropdowns();
  }

  onSubmit(): void {
    const { nature, ability } = this.pokemonDetailForm.value;
    this.dialogRef.close({ nature, ability });
  }

  private createForm(): void {
    this.pokemonDetailForm = this.fb.group({
      nature: [null],
      ability: [null],
      moves: [null]
    });
  }

  private populateDropdowns(): void {
    this.abilityList = this.pokemonService.getAllAbilities();
    this.natureList = this.pokemonService.getAllNatures();
  }

}
