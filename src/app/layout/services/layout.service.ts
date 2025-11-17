

import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface LayoutConfig {
	darkTheme: boolean;
	inputStyle?: 'outlined' | 'filled';
	ripple?: boolean;

	// Theme and UI presets used by the configurator
	preset?: string;
	primary?: string;
	surface?: string;
	menuMode?: 'static' | 'overlay';
}

@Injectable({ providedIn: 'root' })
export class LayoutService {
	private currentSubject = new BehaviorSubject<string>('Inicio');
	current$ = this.currentSubject.asObservable();

	private sidebarVisibleSubject = new BehaviorSubject<boolean>(true);
	sidebarVisible$ = this.sidebarVisibleSubject.asObservable();

	// Signal-based layout config so components can read via `layoutConfig()`
	// and update via `layoutConfig.update(...)` (WritableSignal API).
	layoutConfig: WritableSignal<LayoutConfig> = signal<LayoutConfig>({
		darkTheme: false,
		inputStyle: 'outlined',
		ripple: true,
		preset: 'Aura',
		primary: 'emerald',
		surface: 'slate',
		menuMode: 'static'
	});

	setCurrent(label: string) {
		this.currentSubject.next(label || 'Inicio');
	}

	toggleSidebarVisibility() {
		this.sidebarVisibleSubject.next(!this.sidebarVisibleSubject.value);
	}

	setSidebarVisibility(visible: boolean) {
		this.sidebarVisibleSubject.next(visible);
	}

	get isSidebarVisible(): boolean {
		return this.sidebarVisibleSubject.value;
	}
}

