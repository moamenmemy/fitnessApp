
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

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CustomTabsComponent,
    CarouselModule,
    CustomCaruselComponent,
    SecrionTitleComponent
],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.css',
})
export class WorkoutsComponent implements OnInit {
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

  // Carousel data (muscles)
  musclesList = computed<CarouselItem[]>(() =>
    (this.workotbyid()?.muscles ?? []).map((m) => ({
      title: m.name,
      imageSrc: m.image,
      subText: '',
    }))
  );

  // Chunked Tabs (زي زميلك)
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

}