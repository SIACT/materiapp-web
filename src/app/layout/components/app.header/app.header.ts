import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
 <!-- Header -->
      <header class="w-full h-12 container-header text-gray-900 flex items-center justify-between px-4 shadow-lg">
        <div class="flex items-center px-7">
          <span class="pi pi-bars text-xl mr-3" aria-hidden="true"></span>
          <span class="h-6 w-px bg-white mr-3"></span>
          <span class="text-base font-medium">{{ currentSelection }}</span>
        </div>
        <div class="text-sm font-semibold px-7">SIACT</div>
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
}
