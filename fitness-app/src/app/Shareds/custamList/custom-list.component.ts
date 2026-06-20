import { Component, input,  } from '@angular/core';
import { CustomListItem } from './interface/custom-list';


@Component({
  selector: 'app-custom-list',
  imports: [],
  templateUrl: './custom-list.component.html',
  styleUrl: './custom-list.component.css',
})
export class CustomListComponent {
items = input.required<CustomListItem[]>();
}
