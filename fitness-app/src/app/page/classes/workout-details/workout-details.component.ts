import {
  DifficultyLevelsResponse,
  Workout,
} from './../../../core/interface/workout';
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
@Component({
  selector: 'app-workout-details',
  imports: [
    NgOptimizedImage,
    SecrionTitleComponent,
    CustomListComponent,
    FontAwesomeModule,
    CustomTabsComponent,
    CustomCaruselComponent
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

  getallmeal(){
    this._meals.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res);
        this.mealtab.set(res.map((category: any) => ({
          id: category.id,
          title: category.title ?? category.text,
          imageSrc: category.imageSrc,
          text: category.text,
        })));
      }
    })

  }
  onTabChanged(levelId: string | number) {
    this.activeTabId.set(String(levelId));

    console.log('Level Id:', levelId);

    // API الخاصة بالمستوى المختار
    // this._exerces.getExercisesByLevel(levelId).subscribe(...)
  }
  exercises = Array(8).fill({
    name: 'Bench Press',
    image: 'assets/workout.jpg',
  });

  classTabs = signal<string[]>(['All', 'Gym', 'Yoga', 'Cardio']);
  currentTab = signal<string>('All');

  classItems = signal([
    {
      id: 1,
      title: 'Bench Press ',
      subTitle: '3 Groups * 15 Times',
      description:
        'A powerful chest exercise designed to build upper body strength and muscle mass effectively.',
      imageUrl: 'assets/workout.jpg',
      category: 'Gym',
      hasVideo: true,
    },
    {
      id: 2,
      title: 'Vinyasa Yoga Flow',
      subTitle: '45 Minutes Session',
      description:
        'Connect your breath with movement in this dynamic yoga session that improves flexibility and focus.',
      imageUrl: 'assets/workout.jpg',
      category: 'Yoga',
      hasVideo: false,
    },
    {
      id: 3,
      title: 'High-Intensity Cardio',
      subTitle: '4 Groups * 12 Times',
      description:
        'Burn calories and boost your endurance with this fast-paced, full-body cardio routine.',
      imageUrl: 'assets/workout.jpg',
      category: 'Cardio',
      hasVideo: true,
    },
    {
      id: 4,
      title: 'Squats & Legs Day',
      subTitle: '4 Groups * 12 Times',
      description:
        'Strengthen your lower body and core with standard and variations of heavy squats.',
      imageUrl: 'assets/workout.jpg',
      category: 'Gym',
      hasVideo: true,
    },
  ]);

  // filteredClassItems = computed(() => {
  //   const items = this.classItems();
  //   const tab = this.currentTab();
  //   if (tab === 'All') return items;
  //   return items.filter(item => item.category === tab);
  // });
  // onTabChange(tab: string) {
  //   this.currentTab.set(tab);
  // }

  //   recommendations = [
  //   {
  //     image: 'assets/food1.jpg',
  //     category: 'Breakfast'
  //   },
  //   {
  //     image: 'assets/food2.jpg',
  //     category: 'Lunch'
  //   },
  //   {
  //     image: 'assets/food3.jpg',
  //     category: 'Dinner'
  //   }
  // ];
}
