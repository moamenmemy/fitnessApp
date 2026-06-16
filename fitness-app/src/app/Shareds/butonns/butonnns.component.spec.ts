import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButonnnsComponent } from './butonnns.component';

describe('ButonnnsComponent', () => {
  let component: ButonnnsComponent;
  let fixture: ComponentFixture<ButonnnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButonnnsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButonnnsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
