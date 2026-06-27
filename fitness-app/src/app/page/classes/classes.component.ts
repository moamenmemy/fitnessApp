import { CustomListItem } from '../../Shareds/custamList/interface/custom-list';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  Component,
  computed,
  HostListener,
  inject,
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
import { SecrionTitleComponent } from 'fitness-app/src/app/Shareds/section-title/secrion-title.component';

export interface ClassesListItem extends CustomListItem {
  category: string;
}
@Component({
  selector: 'app-classes',
  imports: [
    CommonModule,
    NgOptimizedImage,
    CarouselModule,
    CustomTabsComponent,
    CustomCaruselComponent,
    SecrionTitleComponent,
  ],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css',
})
export class ClassesComponent {
  
  private _exercises = inject(Exercises);
  private _router = inject(Router);
  responsiveOptions = [
    { breakpoint: '1400px', numVisible: 5, numScroll: 1 },
    { breakpoint: '1024px', numVisible: 4, numScroll: 1 },
    { breakpoint: '768px', numVisible: 3, numScroll: 1 },
    { breakpoint: '560px', numVisible: 2, numScroll: 1 },
  ];

  getTab = signal<Workout>({} as Workout);
  workotbyid = signal<workotbyid>({} as workotbyid);
  screenWidth = signal<number>(window.innerWidth);
  activeTabId = signal<string | number>('');
  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
  }
  // Tabs
  tabs = computed(
    () =>
      this.getTab()?.musclesGroup?.map((item) => ({
        id: item._id,
        text: item.name,
      })) ?? [],
  );
  rowsCount = computed(() => {
    const len = this.musclesList().length;
    const width = this.screenWidth();

    const isMobile = width < 768;

    if (isMobile) {
      return 1;
    }
    return len > 3 ? 2 : 1;
  });
  // Carousel data (muscles)
musclesList = computed<CarouselItem[]>(() =>
  (this.workotbyid()?.muscles ?? []).map((m) => ({
    id: m._id,
    title: m.name,
    imageSrc: m.image,
    subText: '',
  }))
);
  chunkedTabs = computed(() => {
    const allTabs = this.tabs();
    const chunkSize = 4;
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
        const checks = res.musclesGroup.map((group) =>
          this._exercises.getMuscleGroupsById(group._id).pipe(
            map((data) => ({
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

  onCardClick(id: string) {
    this._router.navigate(['/workoutsDetails', id]);
  }
}
