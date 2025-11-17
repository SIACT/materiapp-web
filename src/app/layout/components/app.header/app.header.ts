import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../services/layout.service';
import { ButtonModule } from 'primeng/button';
import { Button } from "primeng/button";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  template: `
 <!-- Header -->
      <header class="w-full h-12 text-gray-900 flex items-center justify-between px-4">
        <div class="flex items-center px-3 gap-3">
          <button 
            pButton 
            type="button" 
            class="lg:hidden p-button-text p-button-rounded" 
            aria-label="Alternar menú"
            (click)="toggleSidebar()">
            <span class="pi pi-bars text-lg" aria-hidden="true"></span>
          </button>
          <span class="h-6 w-px bg-white"></span>
          <span class="text-base font-medium">{{ currentSelection }}</span>
        </div>
        <div class="text-sm font-semibold px-3">SIACT</div>
      </header>
  `,
 
})
export class AppHeader implements OnInit, OnDestroy {
  currentSelection = 'Inicio';
  private sub: Subscription | undefined;

  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.sub = this.layoutService.current$.subscribe(label => {
      this.currentSelection = label || 'Inicio';
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  toggleSidebar() {
    this.layoutService.toggleSidebarVisibility();
  }
}
