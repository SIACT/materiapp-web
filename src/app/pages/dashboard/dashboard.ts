import { SplitterModule } from "primeng/splitter";
import { Semester } from "./components/semester/semester";
import { CommonModule } from "@angular/common";
import { Shearch } from "./components/shearch/shearch";
import { Component } from "@angular/core";
import { Modal } from "./components/modal/modal";
 
import { Prueba2 } from "./components/semester/prueba2/prueba2";
import { Modal2 } from "./components/modal/modal2";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [SplitterModule, CommonModule, Shearch,  Modal2, Semester],
    template: `
            <!-- Search -->
    <div class="flex flex-col  ">  
    <div class="flex flex-col-reverse">  
    
    <div >
        <app-shearch></app-shearch>
    </div>
    </div>
    <div>
        <app-modal2></app-modal2>
    </div>
    <!-- <div>
       <app-prueba2></app-prueba2>
    </div> -->

    <div>
        <app-semester></app-semester>
    </div>

    </div>
    `
})
export class Dashboard {}
