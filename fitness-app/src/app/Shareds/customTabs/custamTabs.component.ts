import { Component, input, output, signal, OnInit } from '@angular/core';
import { TabItem } from './interface/customTabs';

@Component({
  selector: 'app-custom-tabs',
  standalone: true,
  imports: [],
  templateUrl: './custamTabs.component.html', 
  styleUrl: './custamTabs.component.css'   
})
export class CustomTabsComponent implements OnInit {

  tabsData = input.required<TabItem[]>();
  
  
  bindLabel = input<string>('text');
  
 
  initialTab = input<string | number | null>(null);
  
  
  activeTabInternal = signal<string | number | null>(null);
  
  
  tabChanged = output<string | number>();

  ngOnInit() {

    if (this.initialTab()) {
      this.activeTabInternal.set(this.initialTab());
    } else if (this.tabsData().length > 0) {
      this.activeTabInternal.set(this.tabsData()[0].id);
    }
  }

  selectTab(tab: TabItem) {
    this.activeTabInternal.set(tab.id);
    this.tabChanged.emit(tab.id);
  }

 l
 getTabLabel(tab: Record<string, string | number | boolean>): string {
  const labelKey = this.bindLabel() || 'text';
  return String(tab[labelKey] || '');
}
}