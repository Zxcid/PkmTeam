import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() snavToggled: EventEmitter<any> = new EventEmitter<any>();
  @Output() logout: EventEmitter<any> = new EventEmitter<any>();

  languages: string[] = []

  constructor(
    public authService: AuthService,
    private translocoService: TranslocoService
  ) {
  }

  ngOnInit(): void {
    this.languages = this.translocoService.getAvailableLangs() as string[];
    console.log('available langs: ', this.languages);
  }

  changeLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  snavToggle(): void {
    this.snavToggled.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }

}
