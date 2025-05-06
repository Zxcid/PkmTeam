import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ESections } from '../../shared/constants/routing.constants';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent {

  constructor(private router: Router) {}

  backToHome() {
    this.router.navigate([ESections.home]);
  }
}
