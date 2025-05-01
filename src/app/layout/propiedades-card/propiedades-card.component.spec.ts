import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropiedadesCardComponent } from './propiedades-card.component';

describe('PropiedadesCardComponent', () => {
  let component: PropiedadesCardComponent;
  let fixture: ComponentFixture<PropiedadesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropiedadesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropiedadesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
