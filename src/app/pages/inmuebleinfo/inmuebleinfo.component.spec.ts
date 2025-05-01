import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InmuebleinfoComponent } from './inmuebleinfo.component';

describe('InmuebleinfoComponent', () => {
  let component: InmuebleinfoComponent;
  let fixture: ComponentFixture<InmuebleinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InmuebleinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InmuebleinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
