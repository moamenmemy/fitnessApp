import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhyUsComponent } from './whyUs.component';

describe('WhyUsComponent', () => {
  let component: WhyUsComponent;
  let fixture: ComponentFixture<WhyUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyUsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WhyUsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
