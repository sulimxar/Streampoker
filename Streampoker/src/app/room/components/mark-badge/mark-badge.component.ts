declare var $;
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-mark-badge',
  templateUrl: './mark-badge.component.html',
  styleUrls: ['./mark-badge.component.scss']
})
export class MarkBadgeComponent implements OnInit, AfterViewInit {

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

  ngAfterViewInit(): void {
    $('[data-toggle="tooltip"]').on({
      click: function (e) {
        $(e.currentTarget).tooltip('show');
      }
    });

    $('[data-toggle="tooltip"]').on('shown.bs.tooltip', function (e) {
      setTimeout(function () {
        $(e.target).tooltip('hide');
      }, 2000);
    });
  }
}
