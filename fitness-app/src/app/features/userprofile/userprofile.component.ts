import { Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Theme } from '../../core/services/theme/theme';
import { signal } from '@angular/core';
import { Exercises } from '../../core/auth/exercises/exercises';
import { Language } from '../../core/auth/language/language';
import { AuthService } from '@org/auth';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ChangePasswordDialogComponent } from "./components/chanagePassword/change-password-dialog.component";
import { UpdateProfileDialogComponent } from "./components/update/update-profile-dialog.component";
import { UpdateProfileRequest, UploadProfileUserRequest } from 'libs/auth/src/lib/interface/auth-response-dto';

@Component({
  selector: 'app-userprofile',
  imports: [
    NgOptimizedImage,
    FontAwesomeModule,
    FormsModule,
    ToggleSwitchModule,
    DialogModule,
    ChangePasswordDialogComponent,
    UpdateProfileDialogComponent
  ],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css',
})
export class UserprofileComponent {

  _e = inject(Exercises);
  _auth = inject(AuthService);

  showPasswordDialog = false;
  showEditDialog = false;

  selectedField = '';

  showUpdateDialog = signal(false);
  selectedType = signal<'goal' | 'activityLevel' | 'weight' | null>(null);

  selectedValue: any = null;

  // ✅ FIX: nullable safe
  userData = signal<UploadProfileUserRequest  | null>(null);

  _router = inject(Router);
  rotate = faArrowsRotate;

  currentLanguage = computed(() =>
    this.langService.lang() === 'en' ? 'English' : 'Arabic',
  );

  theme = inject(Theme);
  langService = inject(Language);

  isDarkMode = computed(() => this.theme.theme() === 'dark');

  onThemeToggle(checked: boolean) {
    this.theme.setTheme(checked ? 'dark' : 'light');
  }

  // ===================== INFO CARDS =====================
  infos = [
    { id: 'goal', title: 'your Goal', text: 'TAP TO CHANGE' },
    { id: 'activityLevel', title: 'level', text: 'TAP TO CHANGE' },
    { id: 'weight', title: 'weight', text: 'TAP TO CHANGE' },
  ];

  // ===================== SETTINGS =====================
  settingsCards = [
    { id: 'password', title: 'Change Password', icon: 'pi pi-refresh' },
    { id: 'language', title: 'Select Language', subTitle: 'English', icon: 'pi pi-globe' },
    { id: 'mood', title: 'Mood', subTitle: 'Dark', icon: 'pi pi-moon', type: 'switch' },
    { id: 'security', title: 'Security', icon: 'pi pi-shield' },
    { id: 'privacy', title: 'Privacy Policy', icon: 'pi pi-lock' },
    { id: 'help', title: 'Help', icon: 'pi pi-question-circle' },
    { id: 'logout', title: 'Logout', icon: 'pi pi-sign-out', type: 'logout' },
  ];

  // ===================== INIT =====================
  ngOnInit(): void {
    this.getExercise();
    this.loadUserProfile();
  }

  loadUserProfile() {
    this._auth.GetloggedUserData().subscribe({
      next: (res) => {
        this.userData.set(res.user); // ✅ مهم جدا
        console.log(res);
      }
    });
  }

uploaddata() {
  const data = this.userData();

  if (!data) return;

  const payload: UpdateProfileRequest = {
    goal: data.goal,
    weight: data.weight,
    activityLevel: data.activityLevel
  };

  this._auth.editProfile(payload).subscribe({
    next: (res) => {
      console.log('updated', res);
      this.userData.set(res.user); // مهم عشان UI يتحدث
    }
  });
}
  getExercise() {
    this._e.getExercises().subscribe((res) => console.log(res));
  }

  // ===================== OPEN EDIT =====================
  openEdit(type: 'goal' | 'activityLevel' | 'weight') {
    this.selectedType.set(type);

    const current = this.userData();
    this.selectedValue = current ? (current as any)[type] : null;

    this.showUpdateDialog.set(true);
  }

  // ===================== SAVE =====================
  saveProfile(updated: any) {
    const payload: UpdateProfileRequest = {
      goal: updated.goal,
      weight: updated.weight,
      activityLevel: updated.activityLevel,
    };

    this._auth.editProfile(payload).subscribe({
      next: (res) => {
        this.userData.set(res.user);
      },
      error: (err) => {
        console.error('edit profile failed', err);
      },
    });
  }

  toggleLanguage() {
    this.langService.toggleLanguage();
  }

  onCardClick(cardId: string) {
    if (cardId === 'language') {
      this.toggleLanguage();
      return;
    }

    if (cardId === 'logout') {
      this._auth.logout().subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this._router.navigate(['/auth/login']);
            localStorage.removeItem('token');
          }
        },
      });
      return;
    }

    if (cardId === 'password') {
      this.showPasswordDialog = true;
      return;
    }
  }

  goals = signal([
    { id: 'Gain Weight', text: 'Gain Weight' },
    { id: 'Lose Weight', text: 'Lose Weight' },
    { id: 'Get Fitter', text: 'Get Fitter' },
    { id: 'Gain More Flexible', text: 'Gain More Flexible' },
    { id: 'Learn The Basic', text: 'Learn The Basic' },
  ]);

  activityLevel = signal([
    { id: 'level1', text: 'level1' },
    { id: 'level2', text: 'level2' },
    { id: 'level3', text: 'level3' },
    { id: 'level4', text: 'level4' },
    { id: 'level5', text: 'level5' },
  ]);
}