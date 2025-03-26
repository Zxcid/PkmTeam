import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ESpinnerType } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private pikaSpinnerSubj = new BehaviorSubject<boolean>(false);
  private pokeSpinnerSubj = new BehaviorSubject<boolean>(false);
  pikaSpinner$ = this.pikaSpinnerSubj.asObservable();
  pokeSpinner$ = this.pokeSpinnerSubj.asObservable();

  constructor() { }

  show(type?: ESpinnerType): void {
    switch (type) {
      case ESpinnerType.PIKA:
        this.pikaSpinnerSubj.next(true);
        break;
      case ESpinnerType.POKE:
        this.pokeSpinnerSubj.next(true);
    }
  }

  hide(): void {
    this.pikaSpinnerSubj.next(false);
    this.pokeSpinnerSubj.next(false);
  }
}
