import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPokemon } from 'src/app/shared/constants/pokemon.model';

@Component({
  selector: 'app-team-member-card',
  templateUrl: './team-member-card.component.html',
  styleUrls: ['./team-member-card.component.scss']
})
export class TeamMemberCardComponent {

  @Input() pokemon!: IPokemon;

  @Output() removed: EventEmitter<void> = new EventEmitter();

  onRemovePokemon() {
    this.removed.emit();
  }

  formatTypeName(type: string): string {
    return type.substring(5);
  }

}
