import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoLancamentoDialog } from './novo-lancamento-dialog';

describe('NovoLancamentoDialog', () => {
  let component: NovoLancamentoDialog;
  let fixture: ComponentFixture<NovoLancamentoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoLancamentoDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoLancamentoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
