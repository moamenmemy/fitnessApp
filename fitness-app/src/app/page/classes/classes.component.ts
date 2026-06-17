import { Component } from '@angular/core';
import { CustomListItem } from '../../Shareds/custamList/interface/custom-list';
import { CustomListComponent } from '../../Shareds/custamList/custom-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classes',
  imports: [CommonModule, CustomListComponent],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css',
})
export class ClassesComponent {
  // 3. تجهيز لستة الـ Tabs
  classTabs: string[] = ['Beginner', 'Intermediate', 'Advanced'];
  
 
  currentTab = 'Beginner';

  // 5. بيانات وهمية للتجربة (Mock Data) مطابقة للـ Interface
  classItems: CustomListItem[] = [
    {
      id: 1,
      title: 'Bench Press',
      subTitle: '3 Groups * 15 Times',
      description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Tempus.',
      imageUrl: 'assets/images/bench-press.jpg' // حط مسار لأي صورة عندك في المشروع للتجربة
    },
    {
      id: 2,
      title: 'Squats',
      subTitle: '4 Groups * 12 Times',
      description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Tempus.',
      imageUrl: 'assets/images/squats.jpg'
    }
  ];

  // دالة بتشتغل لما المستخدم يغير الـ Tab (لو حبيت مستقبلاً تفلتر الداتا بناءً عليها)
  onTabChange(selectedTab: string) {
    this.currentTab = selectedTab;
    console.log('Selected Tab changed to:', selectedTab);
    // هنا تقدر تعمل فلترة للـ classItems بناءً على الـ Tab لو الداتا جاية من API
  }
}
