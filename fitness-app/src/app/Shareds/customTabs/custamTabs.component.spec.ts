import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustamTabsComponent } from './custamTabs.component';

describe('CustamTabsComponent', () => {
  let component: CustamTabsComponent;
  let fixture: ComponentFixture<CustamTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustamTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustamTabsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
