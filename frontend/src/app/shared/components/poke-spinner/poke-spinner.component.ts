import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-poke-spinner',
  templateUrl: './poke-spinner.component.html',
  styleUrls: ['./poke-spinner.component.scss']
})
export class PokeSpinnerComponent implements OnInit {

  @Input() scale: number = 1;

  isLoading!: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.isLoading = this.spinnerService.pokeSpinner$;
  }

}
