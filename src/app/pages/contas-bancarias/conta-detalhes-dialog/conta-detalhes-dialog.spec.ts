import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaDetalhesDialog } from './conta-detalhes-dialog';

describe('ContaDetalhesDialog', () => {
  let component: ContaDetalhesDialog;
  let fixture: ComponentFixture<ContaDetalhesDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContaDetalhesDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContaDetalhesDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
