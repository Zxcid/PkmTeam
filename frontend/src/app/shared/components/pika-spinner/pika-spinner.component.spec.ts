import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PikaSpinnerComponent } from './pika-spinner.component';

describe('PikaSpinnerComponent', () => {
  let component: PikaSpinnerComponent;
  let fixture: ComponentFixture<PikaSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PikaSpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PikaSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
