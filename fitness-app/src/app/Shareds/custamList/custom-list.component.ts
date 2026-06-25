import { Component, input, signal, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import { CustomListItem } from './interface/custom-list';

@Component({
  selector: 'app-custom-list',
  imports: [],
  templateUrl: './custom-list.component.html',
  styleUrl: './custom-list.component.css',
})
export class CustomListComponent {
  items = input.required<CustomListItem[]>();
  private _router = inject(Router);
videoSelected = output<string>();
  playingVideoId = signal<string | number | null>(null);

  onThumbnailClick(item: CustomListItem) {
    this._router.navigate(['/workoutsDetails', item.id]);
  }

onPlayClick(item: CustomListItem) {
  if (!item.videoUrl) return;

  this.videoSelected.emit(item.id.toString());
}

  onVideoEnded(item: CustomListItem) {
    if (this.playingVideoId() === item.id) {
      this.playingVideoId.set(null);
    }
  }

  playing(item: CustomListItem) {
    return this.playingVideoId() === item.id;
  }
}
