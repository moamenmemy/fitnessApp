import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FloatingImageComponent } from './floating-image.component';

describe('FloatingImageComponent', () => {
  let component: FloatingImageComponent;
  let fixture: ComponentFixture<FloatingImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FloatingImageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
