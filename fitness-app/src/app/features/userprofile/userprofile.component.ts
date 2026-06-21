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
interface SettingCard {
  id: string;
  title: string;
  icon: string;
  subTitle?: string;
  type?: 'switch' | 'button' | 'logout';
}
@Component({
  selector: 'app-userprofile',
  imports: [
    NgOptimizedImage,
    FontAwesomeModule,
    FormsModule,
    ToggleSwitchModule,
  ],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css',
})
export class UserprofileComponent {
  _e = inject(Exercises);
  _auth = inject(AuthService);
  _router = inject(Router);
  rotate = faArrowsRotate;
  theme = inject(Theme);
 langService = inject(Language);
  isDarkMode = computed(() => this.theme.theme() === 'dark');
  onThemeToggle(checked: boolean) {
    this.theme.setTheme(checked ? 'dark' : 'light');
  }
  infos = [
    {
      title: 'your Goal',
      text: 'TAP TO CHANGE',
      lable: 'Change Goal',
    },
    {
      title: 'level',
      text: 'TAP TO CHANGE',
      lable: 'Change Goal',
    },
    {
      title: 'weight',
      text: 'TAP TO CHANGE',
      lable: 'Change Goal',
    },
  ];

  // مصفوفة البيانات الخاصة بالكروت
  settingsCards: SettingCard[] = [
    { id: 'password', title: 'Change Password', icon: 'pi pi-refresh' },
    {
      id: 'language',
      title: 'Select Language',
      subTitle: 'English',
      icon: 'pi pi-globe',
    },
    {
      id: 'mood',
      title: 'Mood',
      subTitle: 'Dark',
      icon: 'pi pi-moon',
      type: 'switch',
    },
    { id: 'security', title: 'Security', icon: 'pi pi-shield' },
    { id: 'privacy', title: 'Privacy Policy', icon: 'pi pi-lock' },
    { id: 'help', title: 'Help', icon: 'pi pi-question-circle' },
    { id: 'logout', title: 'Logout', icon: 'pi pi-sign-out', type: 'logout' },
  ];
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
       console.log(res);
       if (res.message === 'success'){
       this._router.navigate(['/auth/login']);}
     },
   });
   
    }

    console.log('Card clicked:', cardId);
  }
ngOnInit(): void {
  this.getExercise();
}
  getExercise() {
    this._e.getExercises().subscribe((res) => console.log(res));
  }
}
