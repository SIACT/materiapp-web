import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService, SelectionsMap } from '../../services/dashboard.service';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { KnobModule } from 'primeng/knob';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
  selector: 'app-stadistics',
  standalone: true,
  imports: [KnobModule,FormsModule, MeterGroupModule, CommonModule, CardModule,ButtonModule],
  template: `

  <div class="">
    <div class="card flex justify-center mb-8 flex-col items-center">
      <h1 class>Total Carrera</h1>
      <p-knob [(ngModel)]="values" [readonly]="true" />
    </div>

    <div class="card">
    <p-metergroup [value]="value" labelPosition="start">
        <ng-template #label>
            <div class="flex flex-wrap gap-4">
                <ng-container *ngFor="let meterItem of value; let index = index">
                    <p-card class="flex-1" styleClass="border border-surface shadow-none">
                        <div class="flex justify-between gap-8">
                            <div class="flex flex-col gap-1">
                                <span class="text-surface-500 dark:text-surface-400 text-sm">{{ meterItem.label }}</span>
                                <span class="font-bold text-lg">{{ meterItem.value }}%</span>
                            </div>
                            <span class="w-8 h-8 rounded-full inline-flex justify-center items-center text-center" [style]="{ 'background-color': meterItem.color1, color: '#ffffff' }">
                                <i [class]="meterItem.icon"></i>
                            </span>
                        </div>
                    </p-card>
                </ng-container>
            </div>
        </ng-template>
        <ng-template #meter let-value let-class="class" let-width="size">
            <span [class]="class" [style]="{ background: 'linear-gradient(to right, ' + value.color1 + ', ' + value.color2 + ')', width: width }"></span>
        </ng-template>
        <ng-template #start let-totalPercent="totalPercent">
            <div class="flex bg-blue-500 items-center mt-4 mb-2 relative">
              <span [style]="{ width: totalPercent + '%' }" class="absolute text-right ">{{ totalPercent }}%</span>
               
      
            </div>
        </ng-template>
        <ng-template #end>
            <p class="flex items-center justify-center">Tu progreso actual</p>
        </ng-template>
    </p-metergroup>
</div>

  </div>
    
  
  `,
  
})
export class AppStadistics implements OnInit {
    values: number = 0;
    value: { label: string; color1: string; color2: string; value: number; icon?: string }[] = [];

    constructor(private dashboardService: DashboardService) {}

    ngOnInit() {
        // subscribe to selection changes and recalculate metrics
        this.dashboardService.selections$.subscribe((selections: SelectionsMap) => {
            const tabsCount = Object.keys(selections || {}).length || 0;
            const { totalPercent, categoryPercents } = this.dashboardService.computeMetrics(tabsCount || 0);

            this.values = totalPercent;
            // map categoryPercents into the format expected by p-metergroup
            this.value = categoryPercents.map((cp: any) => ({ label: cp.label, color1: cp.color1, color2: cp.color2, value: cp.value, icon: cp.icon }));
        });
    }
}
