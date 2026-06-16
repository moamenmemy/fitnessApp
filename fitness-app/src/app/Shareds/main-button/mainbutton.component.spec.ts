import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainbuttonComponent } from './mainbutton.component';

describe('MainbuttonComponent', () => {
  let component: MainbuttonComponent;
  let fixture: ComponentFixture<MainbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainbuttonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainbuttonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
