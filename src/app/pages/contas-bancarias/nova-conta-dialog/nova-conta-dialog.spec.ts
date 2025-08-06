import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaContaDialog } from './nova-conta-dialog';

describe('NovaContaDialog', () => {
  let component: NovaContaDialog;
  let fixture: ComponentFixture<NovaContaDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaContaDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaContaDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
