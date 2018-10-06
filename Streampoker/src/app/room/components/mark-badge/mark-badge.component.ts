declare var $;
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
//import * as $ from 'jquery';

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

   // $('[data-toggle="tooltip"]').tooltip('toggleEnabled');

    // $('[data-toggle="tooltip"]').mouseleave(function(e) {
    //   console.log(e);
    //   $(e.target).tooltip('hide');
    // });

    $('[data-toggle="tooltip"]').on({
      click: function (e) {
         $(e.currentTarget).tooltip('show');
      }
    });

    // document.querySelector('[data-toggle="tooltip"]').addEventListener('mouseenter', function () {

    //  // console.log('mouse enter');
    // });

    // document.querySelector('[data-toggle="tooltip"]').addEventListener('click', function (e) {

    //   console.log('mouse enter', e);
    // });

    // document.querySelector('[data-toggle="tooltip"]').addEventListener('click', function (e) {

    //   console.log('mouse enter', e);
    // });

    //$('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="tooltip"]').on('shown.bs.tooltip', function (e) {
      // console.log('shown: ', $(e.target).tooltip('hide'));
      //$(e.target).tooltip('hide');
      setTimeout( function() {
        $(e.target).tooltip('hide');
      }, 2000);
     });

    // $('[data-toggle="tooltip"]').on('hidden.bs.tooltip', function () {
    //  // console.log('hidden');
    // });

    //$('[data-toggle="popover"]').popover();
  //   $(function() {
  //     const e = $('[data-toggle="tooltip"]');
  //     console.log(e);
  //     (e as any).tooltip();
  // });
  // $(document).ready(function() {
  //   ($('[data-toggle="tooltip"]') as any).tooltip();
  //   });
//   $(document).ready(function() {
//     ($('[data-toggle="tooltip"]') as any).tooltip( {
//       delay: {show: 500, hide: 100},
//       container: 'body'
//     });
// });
  }
}
