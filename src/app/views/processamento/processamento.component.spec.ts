import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessamentoComponent } from './processamento.component';

describe('ProcessamentoComponent', () => {
  let component: ProcessamentoComponent;
  let fixture: ComponentFixture<ProcessamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcessamentoComponent]
    });
    fixture = TestBed.createComponent(ProcessamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
