import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSagittarius } from '@fortawesome/free-solid-svg-icons';
import { ButtonUiComponent } from "../../shared/components/button-ui/buttonUi.component";
import { SecrionTitleComponent } from "../../shared/components/secrion-title.component";

@Component({
  selector: 'app-about-section',
  imports: [FontAwesomeModule, CommonModule, ButtonUiComponent, SecrionTitleComponent],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css',
})
export class AboutSectionComponent {
  sagittarius = faSagittarius;
  feature1 = [
  {
    title: 'Personal Trainer',
    desc1: 'Achieve your fitness goals with the',
    desc2: 'guidance of our certified trainers.'
  },
  {
    title: 'Cardio Programs',
    desc1: 'From steady-state runs to interval',
    desc2: 'sprints, our treadmill programs.'
  },
 
];
feature2=[
   {
    title: 'Quality Equipment',
    desc1: 'Our gym is equipped with the',
    desc2: 'latest cardio & strength machines.'
  },
  {
    title: 'Healthy Nutritions',
    desc1: 'Fuel your fitness journey with',
    desc2: 'customized meal plans for you.'
  }
]
}
