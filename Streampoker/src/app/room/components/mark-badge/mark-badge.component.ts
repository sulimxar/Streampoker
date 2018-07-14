import { Component, OnInit, Input } from '@angular/core';
import { markDirty } from '@angular/core/src/render3';

@Component({
  selector: 'app-mark-badge',
  templateUrl: './mark-badge.component.html',
  styleUrls: ['./mark-badge.component.scss']
})
export class MarkBadgeComponent implements OnInit {

  @Input() name: string;
  @Input() mark: string;

  constructor() { }

  get abbreviation(): string {
    if (this.name) {
      const words = this.name.split(' ');
      if (words.length === 1) {
        return this.name.substr(0, 2).toUpperCase();
      }

      return (words[0].substr(0, 1) + words[1].substr(0, 1)).toUpperCase();
    }
    return this.name;
  }

  ngOnInit() {
  }

}
