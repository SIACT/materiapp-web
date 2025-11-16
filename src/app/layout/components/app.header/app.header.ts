import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
 <!-- Header -->
      <header class="w-full h-12 bg-slate-800 text-white flex items-center justify-between px-4 shadow-lg">
        <button 
          class="lg:hidden p-2 hover:bg-slate-700 rounded transition-colors"
          (click)="toggleSidebar()">
          <span class="text-2xl">☰</span>
        </button>
        
        <div class="text-2xl cursor-pointer hover:text-blue-400 transition-colors">
          👤
        </div>
      </header>
  `,
 
})
export class AppHeader {

  sidebarOpen = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }


}
