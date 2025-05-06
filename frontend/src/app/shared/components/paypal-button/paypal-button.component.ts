import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.scss']
})
export class PaypalButtonComponent implements AfterViewInit {
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    // Carica lo script PayPal se non esiste già
    if (!(window as any).PayPal) {
      const script = this.renderer.createElement('script');
      script.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js';
      script.charset = 'UTF-8';
      script.onload = () => this.renderButton();
      this.renderer.appendChild(document.body, script);
    } else {
      this.renderButton();
    }
  }

  private renderButton(): void {
    (window as any).PayPal.Donation.Button({
      env: 'production',
      hosted_button_id: environment.paypanButtonId,
      image: {
        src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif',
        alt: 'Donate with PayPal button',
        title: 'PayPal - The safer, easier way to pay online!'
      }
    }).render('#donate-button');
  }
}
