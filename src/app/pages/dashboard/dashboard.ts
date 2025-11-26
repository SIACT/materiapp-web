import { SplitterModule } from "primeng/splitter";
import { Semester } from "./components/semester/semester";
import { CommonModule } from "@angular/common";
import { Shearch } from "./components/shearch/shearch";
import { Component } from "@angular/core";
import { Modal } from "./components/modal/modal";
 
import { Prueba2 } from "./components/semester/prueba2/prueba2";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [Semester, SplitterModule, CommonModule, Shearch, Modal, Prueba2],
    template: `
            <!-- Search -->
    <div class="flex flex-col  ">  
    <div class="flex flex-col-reverse">  
    <div>
        <app-modal></app-modal>
    </div>
    <div >
        <app-shearch></app-shearch>
    </div>
    </div>
    <div class="pt-4">
        <app-semester></app-semester>
    </div>
    <div>
       <app-prueba2></app-prueba2>
    </div>

    </div>
    `
})
export class Dashboard {}
