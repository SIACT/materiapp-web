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
    <div class="hidden lg:block">
      <p-splitter [panelSizes]="[35, 65]" [style]="{ height: '100vh' }" class="mb-8">
        <ng-template #panel>
            <div class="flex items-center justify-center h-full">
                <app-semester></app-semester>
            </div>
        </ng-template>
        <ng-template #panel>
            <div class="flex pt-8 justify-center h-full  "> 
                <app-stadistics></app-stadistics>
            </div>
        </ng-template>
      </p-splitter>
    </div>
   

    <!-- Pantallas medianas (md) -->
    <div class="hidden md:block lg:hidden">
      <p-splitter [panelSizes]="[50, 50]" [style]="{ height: '100vh' }" class="mb-8">
        <ng-template #panel>
            <div class="flex items-center justify-center h-full">
                <app-semester></app-semester>
            </div>
        </ng-template>
        <ng-template #panel>
            <div class="flex pt-8  items-center justify-center h-full bg-base-secondary"> 
                <app-stadistics></app-stadistics>
            </div>
        </ng-template>
      </p-splitter>
    </div>

    <!-- Pantallas pequeñas (móvil) -->
    <div class="block md:hidden">
      <p-splitter [layout]="'vertical'" [panelSizes]="[65, 35]" [style]="{ height: '100vh' }" class="mb-8">
        <ng-template #panel>
            <div class="flex items-center justify-center h-full">
                <app-semester></app-semester>
            </div>
        </ng-template>
        <ng-template #panel>
            <div class="flex pt-8 items-center justify-center h-full bg-base-secondary"> 
                <app-stadistics></app-stadistics>
            </div>
        </ng-template>
      </p-splitter>
    </div>

    `,
})
export class Dashboard {
}