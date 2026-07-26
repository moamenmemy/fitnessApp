import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmartCoachComponent } from './smart-coach.component';

describe('SmartCoachComponent', () => {
  let component: SmartCoachComponent;
  let fixture: ComponentFixture<SmartCoachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartCoachComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SmartCoachComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
