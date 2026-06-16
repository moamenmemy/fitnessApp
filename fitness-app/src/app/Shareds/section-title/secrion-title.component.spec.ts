import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecrionTitleComponent } from './secrion-title.component';

describe('SecrionTitleComponent', () => {
  let component: SecrionTitleComponent;
  let fixture: ComponentFixture<SecrionTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecrionTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SecrionTitleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
