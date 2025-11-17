import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Semester } from "./components/semester/semester";
import { SplitterModule } from "primeng/splitter";
import { AppStadistics } from "./components/stadistics/stadistics";
import { Shearch } from "./components/shearch/shearch";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [Semester, SplitterModule, CommonModule, Shearch],
    template: `
    

    <div>
        <app-shearch></app-shearch>
    </div>
    <div>
        <app-semester></app-semester>
    </div>

   

    `,
})
export class Dashboard {
}