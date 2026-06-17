import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomListItem } from './interface/custom-list';

@Component({
  selector: 'app-custom-list',
  imports: [],
  templateUrl: './custom-list.component.html',
  styleUrl: './custom-list.component.css',
})
export class CustomListComponent {
  @Input() tabs: string[] = [];
  @Input() items: CustomListItem[] = [];
  @Input() activeTab = '';

  
  @Output() tabChanged = new EventEmitter<string>();

  selectTab(tab: string) {
    this.activeTab = tab;
    this.tabChanged.emit(tab);
  }
}
