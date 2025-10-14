import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { vi, beforeEach, describe, it, expect } from 'vitest';

import { UiThemeStoreService } from './ui-theme-store';

describe('UiThemeStoreService', () => {
  let uiThemeStore: UiThemeStoreService;
  let mockDocument: Document;
  let mockBody: HTMLBodyElement;

  beforeEach(() => {
    mockBody = {
      classList: {
        add: vi.fn(),
        remove: vi.fn(),
      },
    } as any;

    mockDocument = {
      body: mockBody,
    } as any;

    TestBed.configureTestingModule({
      providers: [{ provide: DOCUMENT, useValue: mockDocument }],
    });
    uiThemeStore = TestBed.inject(UiThemeStoreService);
  });

  it('should be created', () => {
    expect(uiThemeStore).toBeTruthy();
  });

  it('should initialize with light mode by default', () => {
    expect(uiThemeStore.isDarkMode()).toBe(false);
  });

  it('should set dark mode and update signal', () => {
    uiThemeStore.setDarkMode(true);
    expect(uiThemeStore.isDarkMode()).toBe(true);
  });

  it('should set light mode and update signal', () => {
    uiThemeStore.setDarkMode(false);
    expect(uiThemeStore.isDarkMode()).toBe(false);
  });

  it('should add dark-theme class to body when dark mode is enabled', () => {
    uiThemeStore.setDarkMode(true);

    TestBed.tick();

    expect(mockBody.classList.add).toHaveBeenCalledWith('dark-theme');
  });

  it('should remove dark-theme class from body when dark mode is disabled', () => {
    // First set to dark mode, then to light mode
    uiThemeStore.setDarkMode(true);

    TestBed.tick();

    uiThemeStore.setDarkMode(false);

    TestBed.tick();

    expect(mockBody.classList.remove).toHaveBeenCalledWith('dark-theme');
  });

  it('should handle multiple theme changes correctly', () => {
    uiThemeStore.setDarkMode(true);

    TestBed.tick();

    uiThemeStore.setDarkMode(false);

    TestBed.tick();

    uiThemeStore.setDarkMode(true);

    TestBed.tick();

    expect(mockBody.classList.add).toHaveBeenCalledTimes(2);
    expect(mockBody.classList.remove).toHaveBeenCalledTimes(1);
    expect(uiThemeStore.isDarkMode()).toBe(true);
  });
});
