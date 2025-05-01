import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosotrosInfoComponent } from './nosotros-info.component';

describe('NosotrosInfoComponent', () => {
  let component: NosotrosInfoComponent;
  let fixture: ComponentFixture<NosotrosInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosotrosInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosotrosInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
