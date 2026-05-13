import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesBarComponent } from './servicesBar.component';

describe('ServicesBarComponent', () => {
  let component: ServicesBarComponent;
  let fixture: ComponentFixture<ServicesBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServicesBarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
