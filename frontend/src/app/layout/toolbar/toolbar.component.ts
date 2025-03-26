import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from "../../shared/constants/user.constants";
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input() user: IUser | null = null;

  @Output() snavToggled: EventEmitter<any> = new EventEmitter<any>();
  @Output() logout: EventEmitter<any> = new EventEmitter<any>();

  languages: string[] = []

  constructor(
    private translocoService: TranslocoService
  ) {
  }

  ngOnInit(): void {
    //this.translocoService.getActiveLang();
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
    this.logout.emit();
  }

}
