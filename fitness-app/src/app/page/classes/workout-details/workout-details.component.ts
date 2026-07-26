import {
  DifficultyLevelsResponse,
} from './../../../core/interface/workout';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  NgOptimizedImage } from '@angular/common';
import { SecrionTitleComponent } from 'fitness-app/src/app/Shareds/section-title/secrion-title.component';
import { CustomListComponent } from 'fitness-app/src/app/Shareds/custamList/custom-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSagittarius } from '@fortawesome/free-solid-svg-icons';
import { Exercises } from 'fitness-app/src/app/core/services/exercises/exercises';
import { CustomTabsComponent } from 'fitness-app/src/app/Shareds/customTabs/custamTabs.component';
import { Meals } from '../../healthy/service/meals/meals';
import { TabItem } from 'fitness-app/src/app/Shareds/customTabs/interface/customTabs';
import { CustomCaruselComponent } from 'fitness-app/src/app/Shareds/customCarousel/customCarusel.component';
import { Exercise, ExercisesResponse } from 'fitness-app/src/app/core/interface/exercies';
import { CustomListItem } from 'fitness-app/src/app/Shareds/custamList/interface/custom-list';
import { MealCategory } from '../../healthy/interface/healthy';
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

  _cachedEmbedUrl: SafeResourceUrl | null = null;

  onExerciseChange() {
    const selected = this.selectedExercise();
    const url = selected?.short_youtube_demonstration_link;
    if (!url) {
      this._cachedEmbedUrl = null;
      return;
    }
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/,
    );
    const videoId = match?.[1];
    if (!videoId) {
      this._cachedEmbedUrl = null;
      return;
    }
    this._cachedEmbedUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1&origin=${window.location.origin}`,
    );
  }

  selectedExercise = signal<Exercise | null>(null);
  isPlaying = signal(false);
  private currentTime = signal(0);
  private isVideoEnded = signal(false);

  playSelectedVideo() {
    const playing = this.isPlaying();

    if (this.isVideoEnded()) {
      this.seekToStart();
      this.isVideoEnded.set(false);
      return;
    }

    this.isPlaying.set(!playing);
    if (!playing) {
      this.sendCommand('playVideo');
    } else {
      this.sendCommand('pauseVideo');
    }
  }

  private sendCommand(command: string) {
    const iframe = document.querySelector('iframe');
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command }),
        '*'
      );
    }
  }

  private seekToStart() {
    const iframe = document.querySelector('iframe');
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'seekTo', args: [0, true] }),
        '*'
      );
      setTimeout(() => this.sendCommand('playVideo'), 100);
    }
  }

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
    window.addEventListener('message', this.handleYoutubeMessage.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('message', this.handleYoutubeMessage.bind(this));
  }

  private handleYoutubeMessage(event: MessageEvent) {
    if (!event.data || typeof event.data !== 'string') return;
    
    try {
      const data = JSON.parse(event.data);
      if (data?.event === 'onStateChange' && data?.data === 0) {
        this.isVideoEnded.set(true);
        this.isPlaying.set(false);
      }
    } catch {}
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
      this.mealtab.set(res);
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
          this.onExerciseChange();
          this.isPlaying.set(false);
        }
      }
    });
}
onVideoSelected(item: CustomListItem) {


  const exercise = this.exerciseList().find(
    ex => ex._id === item.id
  );

  if (exercise) {
    this.selectedExercise.set(exercise);
    this.onExerciseChange();
    this.isPlaying.set(false);
  }
}
getYoutubeEmbedUrl(): SafeResourceUrl | null {
  return this._cachedEmbedUrl;
}
getYoutubeThumbnail(url: string | null): string {
  if (!url) return 'assets/novideo.jpg';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/);
  const videoId = match?.[1];
  if (!videoId) return 'assets/novideo.jpg';
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}
filteredClassItems = computed(() =>
  this.exerciseList().map(item => ({
    id: item._id,
    title: item.exercise,
    subTitle: item.difficulty_level,
    description:
      `${item.target_muscle_group} • ${item.primary_equipment}`,
    imageUrl: this.getYoutubeThumbnail(item.short_youtube_demonstration_link),
    hasVideo: !!item.short_youtube_demonstration_link,
    videoUrl: item.short_youtube_demonstration_link,
    exerciseData: item
  }))
);
}
