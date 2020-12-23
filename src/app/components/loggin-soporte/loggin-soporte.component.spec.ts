import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogginSoporteComponent } from './loggin-soporte.component';

describe('LogginSoporteComponent', () => {
  let component: LogginSoporteComponent;
  let fixture: ComponentFixture<LogginSoporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogginSoporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogginSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
