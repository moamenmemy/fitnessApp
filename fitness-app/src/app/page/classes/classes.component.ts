import { Component, computed,signal } from '@angular/core';
import { CustomListItem } from '../../Shareds/custamList/interface/custom-list';
import { CustomListComponent } from '../../Shareds/custamList/custom-list.component';
import { CommonModule } from '@angular/common';
export interface ClassesListItem extends CustomListItem {
  category: string;
}
@Component({
  selector: 'app-classes',
  imports: [CommonModule, CustomListComponent],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css',
})
export class ClassesComponent {
// 1. التابات المتاحة في الديزاين
  classTabs = signal<string[]>(['All', 'Gym', 'Yoga', 'Cardio']); 
  currentTab = signal<string>('All');

  // 2. حطينا داتا من عندنا هنا مؤقتاً عشان الـ Tabs تشتغل وتفلتر صح
  classItems = signal<ClassesListItem[]>([
    {
      id: 1,
      title: 'Bench Press Workout',
      subTitle: '3 Groups * 15 Times',
      description: 'A powerful chest exercise designed to build upper body strength and muscle mass effectively.',
      imageUrl: 'assets/images/bench-press.jpg',
      category: 'Gym',
      hasVideo: true
    },
    {
      id: 2,
      title: 'Vinyasa Yoga Flow',
      subTitle: '45 Minutes Session',
      description: 'Connect your breath with movement in this dynamic yoga session that improves flexibility and focus.',
      imageUrl: 'assets/images/yoga.jpg',
      category: 'Yoga',
      hasVideo: false
    },
    {
      id: 3,
      title: 'High-Intensity Cardio',
      subTitle: '4 Groups * 12 Times',
      description: 'Burn calories and boost your endurance with this fast-paced, full-body cardio routine.',
      imageUrl: 'assets/images/cardio.jpg',
      category: 'Cardio',
      hasVideo: true
    },
    {
      id: 4,
      title: 'Squats & Legs Day',
      subTitle: '4 Groups * 12 Times',
      description: 'Strengthen your lower body and core with standard and variations of heavy squats.',
      imageUrl: 'assets/images/squats.jpg',
      category: 'Gym',
      hasVideo: true
    }
  ]); 

  // 3. الـ Computed بيفلتر تلقائياً بناءً على الـ category المكتوب فوق
  filteredClassItems = computed(() => {
    const items = this.classItems();
    const tab = this.currentTab();
    if (tab === 'All') return items;
    return items.filter(item => item.category === tab); 
  });

 

  // 4. دالة تغيير الـ Tab وسيت للـ Signal
  onTabChange(tab: string) {
    this.currentTab.set(tab);
  }
}
