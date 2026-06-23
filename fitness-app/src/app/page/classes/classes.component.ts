
import { CustomListItem } from '../../Shareds/custamList/interface/custom-list';
import { CustomListComponent } from '../../Shareds/custamList/custom-list.component';
import { CommonModule } from '@angular/common';

import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Exercises } from 'fitness-app/src/app/core/services/exercises/exercises';
import {
  Workout,
  workotbyid,
} from 'fitness-app/src/app/core/interface/workout';
  import { CarouselItem } from 'fitness-app/src/app/Shareds/customCarousel/interface/customCarusel';
  import { CustomTabsComponent } from 'fitness-app/src/app/Shareds/customTabs/custamTabs.component';
import { CarouselModule } from 'primeng/carousel';
import { CustomCaruselComponent } from 'fitness-app/src/app/Shareds/customCarousel/customCarusel.component';
import { forkJoin, map } from 'rxjs';
import { SecrionTitleComponent } from "fitness-app/src/app/Shareds/section-title/secrion-title.component";

export interface ClassesListItem extends CustomListItem {
  category: string;
}
@Component({
  selector: 'app-classes',
  imports: [CommonModule, CustomListComponent, NgOptimizedImage, CarouselModule, CustomTabsComponent, CustomCaruselComponent, SecrionTitleComponent],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css',
})
export class ClassesComponent {

private _exercises = inject(Exercises);
  responsiveOptions = [
    { breakpoint: '1400px', numVisible: 5, numScroll: 1 },
    { breakpoint: '1024px', numVisible: 4, numScroll: 1 },
    { breakpoint: '768px', numVisible: 3, numScroll: 1 },
    { breakpoint: '560px', numVisible: 2, numScroll: 1 }
  ];


  getTab = signal<Workout>({} as Workout);
  workotbyid = signal<workotbyid>({} as workotbyid);

  activeTabId = signal<string | number>('');

  // Tabs
   tabs = computed(() =>
    this.getTab()?.musclesGroup?.map((item) => ({
      id: item._id,
      text: item.name,
    })) ?? []
  );
rowsCount = computed(() => {
  const len = this.musclesList().length;

  return len > 3 ? 2 : 1;
});
  // Carousel data (muscles)
  musclesList = computed<CarouselItem[]>(() =>
    (this.workotbyid()?.muscles ?? []).map((m) => ({
      title: m.name,
      imageSrc: m.image,
      subText: '',
    }))
  );

  
  chunkedTabs = computed(() => {
    const allTabs = this.tabs();
    const chunkSize = 6;
    const pages: any[][] = [];

    for (let i = 0; i < allTabs.length; i += chunkSize) {
      pages.push(allTabs.slice(i, i + chunkSize));
    }

    return pages;
  });

  ngOnInit() {
    this.getMuscleGroups();
  }

  // Load tabs (only show groups that have data)
  getMuscleGroups() {
    this._exercises.getMuscleGroups().subscribe({
      next: (res) => {
        const checks = res.musclesGroup.map(group =>
          this._exercises.getMuscleGroupsById(group._id).pipe(
            map(data => ({
              ...group,
              hasData: data.muscles && data.muscles.length > 0,
            })),
          ),
        );

        forkJoin(checks).subscribe({
          next: (results) => {
            const groupsWithData = results
              .filter((r) => r.hasData)
              .map((r) => ({ _id: r._id as string, name: r.name as string }));

            this.getTab.set({ ...res, musclesGroup: groupsWithData });

            if (groupsWithData.length > 0) {
              this.onTabChanged(groupsWithData[0]._id);
            }
          },
        });
      },
    });
  }

  // On tab click
   onTabChanged(tabId: string | number) {
    this.activeTabId.set(tabId);

    this._exercises.getMuscleGroupsById(String(tabId)).subscribe({
      next: (res) => {
        this.workotbyid.set(res);
      },
    });
  }





























































  // classTabs = signal<string[]>(['All', 'Gym', 'Yoga', 'Cardio']); 
  // currentTab = signal<string>('All');

 
  // classItems = signal<ClassesListItem[]>([
  //   {
  //     id: 1,
  //     title: 'Bench Press Workout',
  //     subTitle: '3 Groups * 15 Times',
  //     description: 'A powerful chest exercise designed to build upper body strength and muscle mass effectively.',
  //     imageUrl: 'assets/images/bench-press.jpg',
  //     category: 'Gym',
  //     hasVideo: true
  //   },
  //   {
  //     id: 2,
  //     title: 'Vinyasa Yoga Flow',
  //     subTitle: '45 Minutes Session',
  //     description: 'Connect your breath with movement in this dynamic yoga session that improves flexibility and focus.',
  //     imageUrl: 'assets/images/yoga.jpg',
  //     category: 'Yoga',
  //     hasVideo: false
  //   },
  //   {
  //     id: 3,
  //     title: 'High-Intensity Cardio',
  //     subTitle: '4 Groups * 12 Times',
  //     description: 'Burn calories and boost your endurance with this fast-paced, full-body cardio routine.',
  //     imageUrl: 'assets/images/cardio.jpg',
  //     category: 'Cardio',
  //     hasVideo: true
  //   },
  //   {
  //     id: 4,
  //     title: 'Squats & Legs Day',
  //     subTitle: '4 Groups * 12 Times',
  //     description: 'Strengthen your lower body and core with standard and variations of heavy squats.',
  //     imageUrl: 'assets/images/squats.jpg',
  //     category: 'Gym',
  //     hasVideo: true
  //   }
  // ]); 

 
  // filteredClassItems = computed(() => {
  //   const items = this.classItems();
  //   const tab = this.currentTab();
  //   if (tab === 'All') return items;
  //   return items.filter(item => item.category === tab); 
  // });
  // onTabChange(tab: string) {
  //   this.currentTab.set(tab);
  // }
}
