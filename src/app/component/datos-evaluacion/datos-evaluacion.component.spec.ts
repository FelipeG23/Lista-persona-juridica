import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosEvaluacionComponent } from './datos-evaluacion.component';

describe('DatosEvaluacionComponent', () => {
  let component: DatosEvaluacionComponent;
  let fixture: ComponentFixture<DatosEvaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosEvaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
