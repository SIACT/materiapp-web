import { Component } from '@angular/core';
import { Stadistics } from './components/stadistics/stadistics';
import { Yourclass } from "./components/yourclass/yourclass";
 

@Component({
  selector: 'app-stadistics.layout',
  standalone: true,
  imports: [Stadistics, Yourclass],
  template: ` 
     <div class="grid grid-cols-5 gap-5">
      
      <div class="col-span-2 pl-1">
        <app-yourclass></app-yourclass>
      </div>

      <div class="col-span-3 pr-2">
        <app-stadistics></app-stadistics>
      </div>

    </div>
  
  ` 
 
})
export class StadisticsLayout {

}
