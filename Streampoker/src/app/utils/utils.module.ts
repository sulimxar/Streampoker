import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestrictInputDirective } from './directives/restrict-input.directive';


// Classes

export { Guid } from './helpers/guid';
export { UiHelper } from './helpers/uiHelper';


// Services

export { ServerTimeService } from './services/server-time.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RestrictInputDirective],
  exports: [RestrictInputDirective]
})
export class UtilsModule { }
