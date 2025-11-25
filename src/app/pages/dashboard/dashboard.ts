import { SplitterModule } from "primeng/splitter";
import { Semester } from "./components/semester/semester";
import { CommonModule } from "@angular/common";
import { Shearch } from "./components/shearch/shearch";
import { Component } from "@angular/core";
import { Modal } from "./components/modal/modal";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [Semester, SplitterModule, CommonModule, Shearch, Modal],
    template: `

            <!-- Search -->
             <div>
                <app-modal></app-modal>
             </div>
            <div>
                <app-shearch></app-shearch>
            </div>

            <!-- Contenido -->
            <div class="pt-4">
                <app-semester></app-semester>
            </div>
 
    `
})
export class Dashboard {}
