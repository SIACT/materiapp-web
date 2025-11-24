import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { Usercredits } from "../usercredits/usercredits";
import { FormsModule } from '@angular/forms';
import { Knob } from 'primeng/knob';

interface StatCard {
  title: string;
  percent: number;
  current: number;
  total: number;
  trend: number;
}

@Component({
  selector: 'app-stadistics',
  standalone: true,
  imports: [CardModule, ProgressBarModule, CommonModule, Usercredits,FormsModule,Knob],
  template: `
    <div class="grid grid-cols-5 gap-5">
      <div class="col-span-2">
        <app-usercredits></app-usercredits>
      </div>
     
      <div class="col-span-3 grid grid-cols-2 gap-4">
        <p-card
          *ngFor="let item of stats"
          class="rounded-2xl shadow-sm p-2 bg-white flex flex-col gap-3"
        >

          <h3 class="text-sm font-semibold text-gray-700 text-center">
            {{ item.title }}
          </h3>

          <h1 class="text-3xl font-bold text-gray-900 text-center">
            {{ item.percent }}%
          </h1>

          <p class="text-xs text-gray-500 text-center pb-2">
            {{ item.current }} / {{ item.total }}
          </p>

          <p-progressBar
            [value]="item.percent"
            [style]="{ height: '18px' }"
            class="rounded-full"
          ></p-progressBar>

        </p-card>
      </div>
    </div>
  <p-card class="mt-5 p-5 rounded-2xl shadow-md">
  <div class="grid grid-cols-2 gap-4 items-center">

    <!-- KNOB -->
    <div class="flex justify-center">
      <p-knob
        [(ngModel)]="value"
        valueTemplate="{value}%"
        [size]="200"
        [strokeWidth]="16"
        [readonly]="true"
        class="text-green-500"
      />
    </div>

    <!-- ESTADÍSTICAS -->
    <div class="text-black space-y-2">
      <h1 class="text-xl font-bold">Estadísticas</h1>

      <div class="space-y-1 mt-3">

        <p class="flex justify-between border-b pb-1">
          <span class="font-semibold text-gray-600">Carrera:</span>
          <span class="font-medium">Ingeniería de Sistemas</span>
        </p>

        <p class="flex justify-between border-b pb-1">
          <span class="font-semibold text-gray-600">Créditos completados:</span>
          <span class="font-medium">85 / 140</span>
        </p>

        <p class="flex justify-between border-b pb-1">
          <span class="font-semibold text-gray-600">Estimado de graduación:</span>
          <span class="font-medium">2026 - I</span>
        </p>

        <p class="flex justify-between border-b pb-1">
          <span class="font-semibold text-gray-600">Fecha de ingreso:</span>
          <span class="font-medium">2021 - I</span>
        </p>

        <p class="flex justify-between">
          <span class="font-semibold text-gray-600">Código:</span>
          <span class="font-medium">202112345</span>
        </p>

      </div>
    </div>

  </div>
</p-card>
  `
})
export class Stadistics {
  value: number = 60;
  stats: StatCard[] = [
    { title: 'Humanísticas', percent: 57, current: 218, total: 380, trend: -3 },
    { title: 'Pénsum', percent: 32, current: 120, total: 380, trend: +2 },
    { title: 'Electivas', percent: 75, current: 45, total: 60, trend: +1 },
    { title: 'Extras', percent: 80, current: 8, total: 20, trend: 0 }
  ];
}
