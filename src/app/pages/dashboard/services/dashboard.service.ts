import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface DashboardFilters {
  search: string;
  calendar: string | null;
  onlyRemaining: boolean;
}

interface Subject {
  name: string;
  code: string;
  credits: number;
 
}

export type SelectionsMap = { [tabValue: string]: Subject[] };


@Injectable({ providedIn: 'root' })
export class DashboardService {
  
  private filtersSubject = new BehaviorSubject<DashboardFilters>({
    search: '',
    calendar: null,
    onlyRemaining: false
  });
  filters$ = this.filtersSubject.asObservable();

  updateFilters(filters: Partial<DashboardFilters>) {
    this.filtersSubject.next({
      ...this.filtersSubject.value,
      ...filters
    });
  }


  // mantiene el mapa de selecciones por semestre
  private selectionsSubject = new BehaviorSubject<SelectionsMap>({});
  selections$ = this.selectionsSubject.asObservable();

  // lista de materias disponibles para la carrera
  subjects: Subject[] = [
    { name: 'Algoritmos', code: 'ALG', credits: 4  },
    { name: 'Bases de Datos', code: 'BD', credits: 3  },
    { name: 'Programación II', code: 'PROG2', credits: 4  },
    { name: 'Estructuras de Datos', code: 'ED', credits: 3  },
    { name: 'Sistemas Operativos', code: 'SO', credits: 3  }
  ];

  // Mapeo de materia -> categoría para estadística (ajustable)
  private subjectCategoryMap: { [code: string]: string } = {
    ALG: 'Pensum',
    BD: 'Electivas',
    PROG2: 'Humanisticas',
    ED: 'Pensum',
    SO: 'Electivas'
  };

  // actualiza las selecciones para un tab y emite
  updateSelection(tabValue: string, selected: Subject[] | undefined) {
    const current = { ...(this.selectionsSubject.value || {}) };
    current[tabValue] = selected ? [...selected] : [];
    this.selectionsSubject.next(current);
  }

  // calcula métricas: totalSelected y porcentaje por categoría
  computeMetrics(tabsCount: number) {
    const selections = this.selectionsSubject.value || {};

    // máximo posible por categoría = tabsCount * occurrences of cities mapped to that category per tab
    const categoryCountsAvailable: { [cat: string]: number } = {};
    const categorySelected: { [cat: string]: number } = {};

    // count how many subject types belong to each category (per tab)
    this.subjects.forEach(s => {
      const cat = this.subjectCategoryMap[s.code] || 'Other';
      categoryCountsAvailable[cat] = (categoryCountsAvailable[cat] || 0) + 1;
    });

    // multiply by number of tabs to get total available per category
    Object.keys(categoryCountsAvailable).forEach(cat => {
      categoryCountsAvailable[cat] = categoryCountsAvailable[cat] * tabsCount;
      categorySelected[cat] = 0;
    });

    // tally selected
    Object.values(selections).forEach(arr => {
        (arr || []).forEach(s => {
        const cat = this.subjectCategoryMap[s.code] || 'Other';
        categorySelected[cat] = (categorySelected[cat] || 0) + 1;
      });
    });

    // compute percentages per category (0-100) relative to available
    const categoryPercents: { label: string; value: number; color1: string; color2: string; icon?: string }[] = [];
    const colorPalette = ['#34d399', '#fbbf24', '#60a5fa', '#c084fc'];
    let idx = 0;
    Object.keys(categoryCountsAvailable).forEach(cat => {
      const available = categoryCountsAvailable[cat] || 1;
      const selected = categorySelected[cat] || 0;
      const percent = Math.round((selected / available) * 100);
      categoryPercents.push({ label: cat, value: percent, color1: colorPalette[idx % colorPalette.length], color2: colorPalette[(idx + 1) % colorPalette.length], icon: 'pi pi-chart-bar' });
      idx++;
    });

    // total percent overall: total selected / total available
    const totalAvailable = Object.values(categoryCountsAvailable).reduce((a, b) => a + b, 0) || 1;
    const totalSelected = Object.values(categorySelected).reduce((a, b) => a + b, 0);
    const totalPercent = Math.round((totalSelected / totalAvailable) * 100);

    return { totalPercent, categoryPercents };
  }
}
