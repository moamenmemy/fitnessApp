import {
  DifficultyLevelsResponse,
  Workout,
} from './../../../core/interface/workout';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { SecrionTitleComponent } from 'fitness-app/src/app/Shareds/section-title/secrion-title.component';
import { CustomListComponent } from 'fitness-app/src/app/Shareds/custamList/custom-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSagittarius } from '@fortawesome/free-solid-svg-icons';
import { Exercises } from 'fitness-app/src/app/core/services/exercises/exercises';
import { CustomTabsComponent } from 'fitness-app/src/app/Shareds/customTabs/custamTabs.component';
import { Carousel } from 'primeng/carousel';
import { Meals } from '../../healthy/service/meals/meals';
import { TabItem } from 'fitness-app/src/app/Shareds/customTabs/interface/customTabs';
import { CustomCaruselComponent } from 'fitness-app/src/app/Shareds/customCarousel/customCarusel.component';
import { Exercise, ExercisesResponse } from 'fitness-app/src/app/core/interface/exercies';
@Component({
  selector: 'app-workout-details',
  imports: [
    NgOptimizedImage,
    SecrionTitleComponent,
    CustomListComponent,
    FontAwesomeModule,
    CustomTabsComponent,
    CustomCaruselComponent,
  ],
  templateUrl: './workout-details.component.html',
  styleUrl: './workout-details.component.css',
})
export class WorkoutDetailsComponent {
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  _sanitizer = inject(DomSanitizer);

selectedExercise = signal<Exercise | null>(null);
isPlaying = signal(false);
  
exerciseList = signal<Exercise[]>([]);
  sagittarius = faSagittarius;
  mealtab = signal<TabItem[]>([]);
  _activatedRoute = inject(ActivatedRoute);
  _exerces = inject(Exercises);
  _meals = inject(Meals);
  workoutId = computed(() => this._activatedRoute.snapshot.paramMap.get('id'));
  workus = signal([
    { message: 'Expertly designed workout.' },
    { message: 'Expertly designed workout.' },
    { message: 'Expertly designed workout.' },
  ]);
  getTab = signal<DifficultyLevelsResponse>({} as DifficultyLevelsResponse);

  tabs = computed(
    () =>
      this.getTab()?.difficulty_levels?.map((level) => ({
        id: level.id,
        text: level.name,
      })) ?? [],
  );

  activeTabId = signal<string>('');
  chunkedTabs = computed(() => {
    const allTabs = this.tabs();

    console.log('allTabs', allTabs);

    const chunkSize = 2;
    const pages: any[][] = [];

    for (let i = 0; i < allTabs.length; i += chunkSize) {
      pages.push(allTabs.slice(i, i + chunkSize));
    }

    return pages;
  });
  ngOnInit() {
    this.getDifficultyLevels();
    this.getallmeal();
  }
  getDifficultyLevels() {
    const id = this.workoutId();

    if (!id) return;

    this._exerces.GetAllDifficultyLevels(id).subscribe({
      next: (res) => {
        this.getTab.set(res);
        console.log(res);

        if (res.difficulty_levels.length) {
          this.onTabChanged(res.difficulty_levels[0].id);
        }
      },
    });
  }

  getallmeal() {
    this._meals.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.mealtab.set(
          res.map((category: any) => ({
            id: category.id,
            title: category.title ?? category.text,
            imageSrc: category.imageSrc,
            text: category.text,
          })),
        );
      },
    });
  }
onTabChanged(levelId: string | number) {
  this.activeTabId.set(String(levelId));

  this._exerces
    .GetExercisesByPrime(
      this.workoutId()!,
      this.activeTabId()
    )
    .subscribe({
      next: (res: ExercisesResponse) => {

        this.exerciseList.set(res.exercises);

        if (res.exercises.length) {
          this.selectedExercise.set(res.exercises[0]);
          this.isPlaying.set(false);
        }
      }
    });
}
onVideoSelected(id: string) {
  const exercise = this.exerciseList().find(
    item => item._id === id
  );

  if (exercise) {
    this.selectedExercise.set(exercise);
    this.isPlaying.set(false);
  }
}
playSelectedVideo() {
  this.isPlaying.set(true);
}
getYoutubeEmbedUrl(): SafeResourceUrl | null {

  const url =
    this.selectedExercise()?.short_youtube_demonstration_link;

  if (!url) return null;

  const videoId = url.split('/').pop();

  return this._sanitizer.bypassSecurityTrustResourceUrl(
    `https://www.youtube.com/embed/${videoId}?autoplay=1`
  );
}
filteredClassItems = computed(() =>
  this.exerciseList().map(item => ({
    id: item._id,
    title: item.exercise,
    subTitle: item.difficulty_level,
    description:
      `${item.target_muscle_group} • ${item.primary_equipment}`,
    imageUrl: 'assets/workout.jpg',
    hasVideo: !!item.short_youtube_demonstration_link,
    videoUrl: item.short_youtube_demonstration_link
  }))
);
}
