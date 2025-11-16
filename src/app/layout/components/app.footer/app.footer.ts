import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ CommonModule],
  template: `
  <footer class="app-footer">
  <div class="footer-content bg-gray-800 text-white p-4 flex flex-col items-center justify-center">
    <div class="footer-section">
      <h3 class="app-name text-white text-2xl font-bold p-ui">{{ appName }}</h3>
    </div>
    
    <div class="footer-section">
      <p class="authors">
        <strong>Autores:</strong>
        <span *ngFor="let author of authors; let last = last">
          {{ author }}<span *ngIf="!last">, </span>
        </span>
      </p>
    </div>
    
    <div class="footer-section">
      <p class="location">{{ location }}</p>
      <p class="copyright">&copy; {{ currentYear }}</p>
    </div>
  </div>
</footer>
  `,

})
export class AppFooter {
  currentYear: number = new Date().getFullYear();
  appName: string = 'Materiapp';
  authors: string[] = ['Ing. Yorth Ortegón', 'Ing. Christian Salazar'];
  location: string = 'Pasto, Nariño';
}
