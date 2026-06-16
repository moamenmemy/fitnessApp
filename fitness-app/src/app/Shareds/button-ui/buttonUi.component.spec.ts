import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonUiComponent } from './buttonUi.component';

describe('ButtonUiComponent', () => {
  let component: ButtonUiComponent;
  let fixture: ComponentFixture<ButtonUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonUiComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
