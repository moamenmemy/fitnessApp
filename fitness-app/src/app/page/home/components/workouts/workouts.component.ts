import { Component, computed, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { SecrionTitleComponent } from 'fitness-app/src/app/Shareds/section-title/secrion-title.component';
import { Exercises } from 'fitness-app/src/app/core/services/exercises/exercises';
import { Workout } from 'fitness-app/src/app/core/interface/workout';
import { CustomTabsComponent } from 'fitness-app/src/app/Shareds/customTabs/custamTabs.component';
@Component({
  selector: 'app-workouts',
  imports: [NgOptimizedImage, SecrionTitleComponent,CustomTabsComponent],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.css',
})
export class WorkoutsComponent {
  _exercises = inject(Exercises);
  getTab=signal<Workout>({} as Workout);
   tabs = computed(() =>
    this.getTab()?.musclesGroup?.map(item => ({
      id: item._id,
      text: item.name
    })) ?? []
  );
  ngOnInit() {
    this.getMuscleGroups();
  }
  getMuscleGroups() {
    this._exercises.getMuscleGroups().subscribe({
      next: (res) => {
        console.log(res);
        this.getTab.set(res);
      },
    });
  }
}
