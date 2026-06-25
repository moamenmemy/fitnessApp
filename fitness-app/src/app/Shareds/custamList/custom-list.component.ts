import { Component, computed, input, output, signal,  } from '@angular/core';
import { CustomListItem } from './interface/custom-list';
import { CustomTabsComponent } from '../customTabs/custamTabs.component';
import { TabItem } from '../customTabs/interface/customTabs';
import { CarouselModule } from 'primeng/carousel';
import {   EventEmitter,  } from '@angular/core';

@Component({
  selector: 'app-custom-list',
  imports: [CustomTabsComponent, CarouselModule],
  templateUrl: './custom-list.component.html',
  styleUrl: './custom-list.component.css',
})
export class CustomListComponent {
 // استقبال البيانات كـ Signals Input
  tabs = input<any[]>([]);
  items = input<any[]>([]);

  // استخدام output() بدلاً من EventEmitter
  tabChange = output<string | number>();
  itemClick = output<any>();

  // تقسيم التابات
 // تأكدي من التعامل مع الحالة التي تكون فيها التابات فارغة
chunkedTabs = computed(() => {
  const data = this.tabs(); 
  if (!data || data.length === 0) return []; // حماية إضافية
  
  const chunkSize = 6;
  const pages = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    pages.push(data.slice(i, i + chunkSize));
  }
  return pages;
});
}
