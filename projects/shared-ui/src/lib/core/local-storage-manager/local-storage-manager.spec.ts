import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, it, expect, afterEach } from 'vitest';

import { LocalStorageManager } from './local-storage-manager';

describe('LocalStorageManager', () => {
  let service: LocalStorageManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageManager);
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('set and get', () => {
    it('should store and retrieve a value', () => {
      const testKey = 'test-key';
      const testValue = { name: 'John', age: 30 };

      service.set(testKey, testValue);
      const result = service.get(testKey);

      expect(result).toEqual(testValue);
    });

    it('should return undefined for non-existent key', () => {
      const result = service.get('non-existent-key');
      expect(result).toBeUndefined();
    });

    it('should return undefined for undefined key', () => {
      const result = service.get(undefined);
      expect(result).toBeUndefined();
    });

    it('should not set value for undefined key', () => {
      service.set(undefined, 'test-value');
      expect(localStorage.length).toBe(0);
    });
  });

  describe('expiration', () => {
    it('should store value without expiration when expireIn is 0', () => {
      const testKey = 'test-key';
      const testValue = 'test-value';

      service.set(testKey, testValue, 0);
      const result = service.get(testKey);

      expect(result).toBe(testValue);
    });

    it('should return undefined for expired value', () => {
      const testKey = 'test-key';
      const testValue = 'test-value';

      // Set with 1ms expiration
      service.set(testKey, testValue, 1);

      // Wait for expiration
      setTimeout(() => {
        const result = service.get(testKey);
        expect(result).toBeUndefined();
      }, 10);
    });

    it('should clean up expired data from localStorage', () => {
      const testKey = 'test-key';
      const testValue = 'test-value';

      service.set(testKey, testValue, 1);

      setTimeout(() => {
        service.get(testKey);
        expect(localStorage.getItem(testKey)).toBeNull();
      }, 10);
    });
  });

  describe('remove', () => {
    it('should remove a stored value', () => {
      const testKey = 'test-key';
      const testValue = 'test-value';

      service.set(testKey, testValue);
      expect(service.get(testKey)).toBe(testValue);

      service.remove(testKey);
      expect(service.get(testKey)).toBeUndefined();
    });

    it('should handle removing non-existent key', () => {
      expect(() => service.remove('non-existent-key')).not.toThrow();
    });

    it('should handle removing undefined key', () => {
      expect(() => service.remove(undefined)).not.toThrow();
    });
  });

  describe('clear', () => {
    it('should clear all localStorage data', () => {
      service.set('key1', 'value1');
      service.set('key2', 'value2');

      expect(localStorage.length).toBe(2);

      service.clear();

      expect(localStorage.length).toBe(0);
      expect(service.get('key1')).toBeUndefined();
      expect(service.get('key2')).toBeUndefined();
    });
  });

  describe('has', () => {
    it('should return true for existing key', () => {
      const testKey = 'test-key';
      const testValue = 'test-value';

      service.set(testKey, testValue);
      expect(service.has(testKey)).toBe(true);
    });

    it('should return false for non-existent key', () => {
      expect(service.has('non-existent-key')).toBe(false);
    });

    it('should return false for undefined key', () => {
      expect(service.has(undefined)).toBe(false);
    });

    it('should return false for expired key', () => {
      const testKey = 'test-key';
      const testValue = 'test-value';

      service.set(testKey, testValue, 1);

      setTimeout(() => {
        expect(service.has(testKey)).toBe(false);
      }, 10);
    });
  });

  describe('getAllKeys', () => {
    it('should return all localStorage keys', () => {
      service.set('key1', 'value1');
      service.set('key2', 'value2');

      const keys = service.getAllKeys();
      expect(keys).toContain('key1');
      expect(keys).toContain('key2');
      expect(keys.length).toBe(2);
    });

    it('should return empty array when localStorage is empty', () => {
      const keys = service.getAllKeys();
      expect(keys).toEqual([]);
    });
  });

  describe('size', () => {
    it('should return the number of items in localStorage', () => {
      expect(service.size()).toBe(0);

      service.set('key1', 'value1');
      expect(service.size()).toBe(1);

      service.set('key2', 'value2');
      expect(service.size()).toBe(2);

      service.remove('key1');
      expect(service.size()).toBe(1);
    });
  });

  describe('error handling', () => {
    it('should handle invalid JSON data', () => {
      const testKey = 'test-key';

      // Manually set invalid JSON data
      localStorage.setItem(testKey, 'invalid-json');

      const result = service.get(testKey);
      expect(result).toBeUndefined();

      // Should clean up invalid data
      expect(localStorage.getItem(testKey)).toBeNull();
    });
  });
});
