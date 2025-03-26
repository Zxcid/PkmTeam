import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './pika-spinner.component.html',
  styleUrls: ['./pika-spinner.component.scss']
})
export class PikaSpinnerComponent implements OnInit {
  isLoading!: Observable<boolean>;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.isLoading = this.spinnerService.pikaSpinner$;
  }

}
