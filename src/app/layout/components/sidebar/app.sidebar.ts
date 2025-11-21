import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule, CommonModule, RouterLink],
  template: `
  <section class="min-h-lvh flex flex-col">
    <div class="flex flex-col flex-1 gap-7 overflow-y-auto min-h-full ">
      <div>
      <p-menu [model]="topItems"  styleClass=" min-w-full flex-1 !border-0">
        <ng-template #start>
          <span class="inline-flex items-center gap-1 px-2 py-3">
            <span class="text-xl font-semibold">MATER<span class="text-secondary">IA</span>PP</span>
          </span>
        </ng-template>
        <ng-template #submenuheader let-item>
          <br>
          <span class="!text-primary font-bold">{{ item.label }}</span>
        </ng-template>
        <ng-template #item let-item>
          <a [routerLink]="item.routerLink" pRipple class="flex items-center p-menu-item-link">
            <span [class]="item.icon"></span>
            <span class="ml-2">{{ item.label }}</span>
            <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
            <span *ngIf="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
          </a>
        </ng-template>
      </p-menu>
      </div>
        <div class="mt-auto"></div>
      <div>
      <p-menu   [model]="BottomItems"
      styleClass="sidebar-menu !border-0">
         <ng-template #submenuheader let-item>
          <br>
          <span class="!text-primary font-bold">{{ item.label }}</span>
        </ng-template>
        <ng-template #item let-item>
          <a [routerLink]="item.routerLink" pRipple class="flex items-center p-menu-item-link">
            <span [class]="item.icon"></span>
            <span class="ml-2">{{ item.label }}</span>
            <p-badge *ngIf="item.badge" class="ml-auto" [value]="item.badge" />
            <span *ngIf="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
          </a>
        </ng-template>
      </p-menu>
    </div>
    <div class="flex-none pb-8">
      <button pRipple class="relative overflow-hidden w-full border-0 bg-transparent flex items-start p-2 pl-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200">
        <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" class="mr-2" shape="circle" />
        <span class="inline-flex flex-col">
          <span class="font-bold">Amy Elsner</span>
          <span class="text-sm">Admin</span>
        </span>
      </button>
    </div>
    </div>
  </section>
  `,
  
})
export class AppSidebar {
  topItems: MenuItem[] | undefined;
  BottomItems: MenuItem[] | undefined;

  ngOnInit() {
    this.topItems = [
      {
        label: 'Carreras',
        items: [
          {
            label: 'Inicio',
            icon: 'pi pi-home',
            routerLink: '/',
          },
          {
            label: 'Mi Pensum',
            icon: 'pi pi-graduation-cap',
            routerLink: '/pensum/materias',
          },
          {
            label: 'Recomendacion',
            icon: 'pi pi-microchip-ai',
            routerLink: '/recommendation/ia',
          },
          {
            label: 'Curriculum',
            icon: 'pi pi-calendar',
            routerLink: '/recommendation/ia',
          }
        ]
      },
      this.BottomItems = [
        {
          label: 'Configuración',
          items: [
            {
              label: 'Perfil',
              icon: 'pi pi-user',
              routerLink: '/profile',
            },
            {
              label: 'Ajustes',
              icon: 'pi pi-cog',
              routerLink: '/settings',
            }
          ]
        }
      ]
       
    ];
  }

}
