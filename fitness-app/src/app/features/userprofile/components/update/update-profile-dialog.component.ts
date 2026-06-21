import { Component, effect, input, output, signal } from '@angular/core';
import { ScrollComponent } from 'fitness-app/src/app/Shareds/number-scuroll/scroll.component';
import { RadioComponent } from 'fitness-app/src/app/Shareds/reusableRadio/radio.component';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-update-profile-dialog',
  imports: [DialogModule, RadioComponent,ScrollComponent],
  templateUrl: './update-profile-dialog.component.html',
  styleUrl: './update-profile-dialog.component.css',
})
export class UpdateProfileDialogComponent {
   visible = input<boolean>(false);
  type = input<'goal' | 'activityLevel' | 'weight' | null>(null);

  userData = input<any>();
  goals = input<any[]>([]);
  activityLevel = input<any[]>([]);

  visibleChange = output<boolean>();
  save = output<any>();

  localData = signal<any>({});

  constructor() {
    effect(() => {
      const data = this.userData();

      if (data) {
        this.localData.set({ ...data });
      }
    });
  }

  close() {
    this.visibleChange.emit(false);
  }

  submit() {
    this.save.emit(this.localData());
    this.close();
  }

  updateField(key: string, value: any) {
    this.localData.update(prev => ({
      ...prev,
      [key]: value
    }));
  }
}
