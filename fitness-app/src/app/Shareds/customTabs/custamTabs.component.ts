import { Component, input, output, signal, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-tabs',
  standalone: true,
  imports: [],
  templateUrl: './custamTabs.component.html', 
  styleUrl: './custamTabs.component.css'   
})
export class CustomTabsComponent implements OnInit {
  // 1. استقبال الداتا من الـ API
  tabsData = input.required<any[]>();

  // 2. الحقل المراد عرضه في حالة الأوبجكتس
  bindLabel = input<string>('');
  
  // 3. التاب الافتراضي اللي الأب عاوزه يبدأ بيه (اختياري)
  initialTab = input<any>(null); 

  // 🎯 4. الـ Signal الداخلي الحر والمسؤول عن تغيير الـ Active Tab
  activeTabInternal = signal<any>(null); 

  // 5. الحدث الموجه للأب عند التغيير
  tabChanged = output<any>();

  ngOnInit() {
    // تحديد التاب النشط عند البداية
    if (this.initialTab()) {
      this.activeTabInternal.set(this.initialTab());
    } else if (this.tabsData().length > 0) {
      this.activeTabInternal.set(this.tabsData()[0]);
    }
  }

  getTabLabel(tab: any): string {
    if (this.bindLabel() && typeof tab === 'object') {
      return tab[this.bindLabel()];
    }
    return tab;
  }

  selectTab(tab: any) {
    this.activeTabInternal.set(tab); // ✅ هنا بنعدل الـ Signal الداخلي بحرية تامة
    this.tabChanged.emit(tab);
  }

  // دالة الفحص بتعتمد على الـ Signal الداخلي حالياً
  isActive(tab: any): boolean {
    const currentActive = this.activeTabInternal();
    if (typeof tab === 'object' && typeof currentActive === 'object') {
      return tab.id === currentActive?.id || JSON.stringify(tab) === JSON.stringify(currentActive);
    }
    return tab === currentActive;
  }
}