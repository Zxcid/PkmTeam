import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-team-member-card',
  templateUrl: './team-member-card.component.html',
  styleUrls: ['./team-member-card.component.scss']
})
export class TeamMemberCardComponent {
  @Input() form!: AbstractControl;
  @Output() removed = new EventEmitter<void>();

  onRemovePokemon(): void {
    this.removed.emit();
  }

  formatTypeName(type: string): string {
    return type.substring(5);
  }
}

