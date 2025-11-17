import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Semester } from "./components/semester/semester";
import { SplitterModule } from "primeng/splitter";
import { AppStadistics } from "./components/stadistics/stadistics";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [Semester, SplitterModule, CommonModule, AppStadistics],
    template: `
    
    <!-- Pantallas grandes (lg y superior) -->
    <div class="hidden lg:flex lg:flex-col lg:h-screen">
      <p-splitter [panelSizes]="[35, 65]" [style]="{ height: 'calc(100vh - 0rem)' }">
        <ng-template #panel>
            <div class="flex items-center justify-center h-full overflow-auto">
                <app-semester></app-semester>
            </div>
        </ng-template>
        <ng-template #panel>
            <div class="flex justify-center h-full overflow-auto p-4"> 
                <app-stadistics></app-stadistics>
            </div>
        </ng-template>
      </p-splitter>
    </div>
   

    <!-- Pantallas medianas (md) -->
    <div class="hidden md:flex md:flex-col md:h-screen lg:hidden">
      <p-splitter [panelSizes]="[50, 50]" [style]="{ height: 'calc(100vh - 1rem)' }">
        <ng-template #panel>
            <div class="flex items-center justify-center h-full overflow-auto">
                <app-semester></app-semester>
            </div>
        </ng-template>
        <ng-template #panel>
            <div class="flex items-center justify-center h-full overflow-auto bg-base-secondary p-2"> 
                <app-stadistics></app-stadistics>
            </div>
        </ng-template>
      </p-splitter>
    </div>

    <!-- Pantallas medianas pequeñas (sm: 640px - 767px) -->
    <div class="hidden sm:flex sm:flex-col md:hidden h-screen">
      <p-splitter [layout]="'vertical'" [panelSizes]="[60, 40]" [style]="{ height: 'calc(160vh - 0rem)' }">
        <ng-template #panel>
            <div class="flex items-center justify-center h-full overflow-auto p-1">
                <app-semester></app-semester>
            </div>
        </ng-template>
        <ng-template #panel>
            <div class="flex items-center justify-center h-full overflow-auto bg-base-secondary pt-32"> 
                <app-stadistics></app-stadistics>
            </div>
        </ng-template>
      </p-splitter>
    </div>

    <!-- Pantallas muy pequeñas (móvil mini: < 640px) -->
    <div class="flex flex-col sm:hidden h-screen">
      <p-splitter [layout]="'vertical'" [panelSizes]="[55, 45]" [style]="{ height: 'calc(200vh - 0rem)' }">
        <ng-template #panel>
            <div class="flex items-center justify-center h-full overflow-auto p-0.5">
                <app-semester></app-semester>
            </div>
        </ng-template>
        <ng-template #panel>
            <div class="flex items-center justify-center h-full overflow-auto bg-base-secondary pt-20 p-4"> 
                <app-stadistics></app-stadistics>
            </div>
        </ng-template>
      </p-splitter>
    </div>

    `,
})
export class Dashboard {
}