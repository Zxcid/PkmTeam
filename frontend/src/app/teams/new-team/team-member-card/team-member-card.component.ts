import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ITeamPokemon } from 'src/app/shared/constants/team.model';
import { EditMemberDialogComponent } from './edit-member-dialog/edit-member-dialog.component';

@Component({
  selector: 'app-team-member-card',
  templateUrl: './team-member-card.component.html',
  styleUrls: ['./team-member-card.component.scss']
})
export class TeamMemberCardComponent implements OnInit {
  @Input() form!: AbstractControl;
  @Output() removed = new EventEmitter<void>();

  natureSelected!: string;
  abilitySelected!: string;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log('control value: ', this.form.value);
  }

  onEditPokemon(): void {
    const teamPokemon: ITeamPokemon = this.form.value;
    this.dialog.open(EditMemberDialogComponent, {
      height: '600px',
      width: '1200px',
      autoFocus: false,
      data: { teamPokemon }
    })
      .afterClosed()
      .subscribe((resp) => {
        const { nature, ability } = resp;
        this.form.get('nature')?.patchValue(nature);
        this.form.get('ability')?.patchValue(ability);
        console.log('new control value: ', this.form.value);
      });
  }

  onRemovePokemon(): void {
    this.removed.emit();
  }

  formatTypeName(type: string): string {
    return type.substring(5);
  }
}

