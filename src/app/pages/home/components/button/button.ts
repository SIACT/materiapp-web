import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: `
    <button class="custom-button">
      <ng-content></ng-content>
    </button>
  `,
  
})
export class Button {

}
