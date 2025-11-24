import { Component } from '@angular/core';
import { OptionsPlan } from "./components/options-plan/options-plan";
import { TableResults } from "./components/table-results/table-results";
import { AppMessage } from "./components/message/message";

@Component({
  selector: 'app-layout.recommedation',
  imports: [OptionsPlan, TableResults, AppMessage],
  template: `
  <div class="text-black">
  <section class="container">
  
  </section>
  <section>
    <app-options-plan></app-options-plan>
  </section>
  <section class="grid grid-cols-7">
    <div class="col-span-5">
        <app-table-results></app-table-results>
    </div>
    <div class="col-span-2">
        <app-message></app-message>
    </div>

    
  </section>
  </div>
   
    `,
 
})
export class LayoutRecommedation {

}
