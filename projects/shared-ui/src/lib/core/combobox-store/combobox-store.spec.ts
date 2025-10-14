import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { firstValueFrom } from 'rxjs';
import { LogManager } from '../log-manager/log-manager';
import { ComboboxStore, ComboboxOption, ComboboxOptionInput } from './combobox-store';

describe('ComboboxStore', () => {
  let store: ComboboxStore;
  let logManager: LogManager;

  const mockOptions: ComboboxOptionInput[] = [
    { label: 'Apple', value: 1 },
    { label: 'Banana', value: 2 },
    { label: 'Cherry', value: 3, groupLabel: 'Fruits' },
    { label: 'Carrot', value: 4, groupLabel: 'Vegetables' },
    { label: 'Disabled Option', value: 5, disabled: true },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComboboxStore, LogManager],
    });
    store = TestBed.inject(ComboboxStore);
    logManager = TestBed.inject(LogManager);
  });

  describe('initialization', () => {
    it('should be created', () => {
      expect(store).toBeTruthy();
    });

    it('should initialize with default state', () => {
      expect(store.isInitialized()).toBe(false);
      expect(store.options()).toEqual([]);
      expect(store.selectedValues()).toEqual([]);
      expect(store.inputValue()).toBe('');
      expect(store.focusedOption()).toBeNull();
    });

    it('should initialize with options and config', () => {
      store.initialize(mockOptions, {
        isMultiSelect: true,
        allowNewOptions: true,
      });

      expect(store.isInitialized()).toBe(true);
      expect(store.options().length).toBe(5);
      expect(store.isMultiSelect()).toBe(true);
      expect(store.allowNewOptions()).toBe(true);
    });

    it('should sort options alphabetically by label on initialization', () => {
      store.initialize(mockOptions);

      const labels = store.options().map((opt) => opt.label);
      expect(labels).toEqual(['Apple', 'Banana', 'Carrot', 'Cherry', 'Disabled Option']);
    });

    it('should apply default values to options', () => {
      const minimalOptions: ComboboxOptionInput[] = [{ label: 'Test', value: 1 }];

      store.initialize(minimalOptions);

      const option = store.options()[0];
      expect(option.disabled).toBe(false);
      expect(option.groupLabel).toBe('Uncategorized');
    });
  });

  describe('options management', () => {
    beforeEach(() => {
      store.initialize(mockOptions);
    });

    it('should update options and maintain existing selections', () => {
      store.setSelectedValues([1, 2]);

      const newOptions: ComboboxOptionInput[] = [
        { label: 'Apple', value: 1 },
        { label: 'Orange', value: 6 },
      ];

      store.setOptions(newOptions);

      expect(store.selectedValues()).toEqual([1]);
    });

    it('should clear focused option if it no longer exists after update', () => {
      const option = store.options()[0];
      store.setFocusedOption(option);

      const newOptions: ComboboxOptionInput[] = [{ label: 'Orange', value: 6 }];

      store.setOptions(newOptions);

      expect(store.focusedOption()).toBeNull();
    });

    it('should get option by value', () => {
      const option = store.getOptionByValue(1);

      expect(option).toBeDefined();
      expect(option?.label).toBe('Apple');
    });

    it('should return undefined for non-existent value', () => {
      const option = store.getOptionByValue(999);

      expect(option).toBeUndefined();
    });

    it('should return grouped options sorted by group label', () => {
      const grouped = store.groupedOptions();

      expect(grouped.length).toBe(3);
      expect(grouped[0].groupLabel).toBe('Fruits');
      expect(grouped[1].groupLabel).toBe('Uncategorized');
      expect(grouped[2].groupLabel).toBe('Vegetables');
    });
  });

  describe('selection management', () => {
    beforeEach(() => {
      store.initialize(mockOptions, { isMultiSelect: false });
    });

    it('should set single selected value', () => {
      store.setSelectedValues([1]);

      expect(store.selectedValues()).toEqual([1]);
    });

    it('should update input value for single selection', () => {
      store.setSelectedValues([1]);

      expect(store.inputValue()).toBe('Apple');
    });

    it('should log error and use only first value when setting multiple values in single-select mode', () => {
      const errorSpy = vi.spyOn(logManager, 'error');

      store.setSelectedValues([1, 2, 3]);

      expect(errorSpy).toHaveBeenCalled();
      expect(store.selectedValues()).toEqual([1]);
    });

    it('should allow multiple selections in multi-select mode', () => {
      store.setIsMultiSelect(true);
      store.setSelectedValues([1, 2, 3]);

      expect(store.selectedValues()).toEqual([1, 2, 3]);
    });

    it('should clear input value for multi-select when selection changes', () => {
      store.setIsMultiSelect(true);
      store.setInputValue('test');
      store.setSelectedValues([1, 2]);

      expect(store.inputValue()).toBe('');
    });

    it('should return selected options including isNew flag for new options', () => {
      store.initialize(mockOptions, { allowNewOptions: true });
      store.setSelectedValues([1, 999]);

      const selectedOptions = store.selectedOptions();

      expect(selectedOptions.length).toBe(2);
      expect(selectedOptions[0].value).toBe(1);
      expect(selectedOptions[0].isNew).toBeUndefined();
      expect(selectedOptions[1].value).toBe(999);
      expect(selectedOptions[1].isNew).toBe(true);
    });

    it('should log error when setting non-existent values without allowNewOptions', () => {
      const errorSpy = vi.spyOn(logManager, 'error');

      store.setSelectedValues([999]);

      expect(errorSpy).toHaveBeenCalled();
      expect(store.selectedValues()).toEqual([]);
    });

    it('should keep only first value when switching from multi to single select', () => {
      store.setIsMultiSelect(true);
      store.setSelectedValues([1, 2, 3]);

      store.setIsMultiSelect(false);

      expect(store.selectedValues()).toEqual([1]);
    });

    it('should emit selectedValuesChanged event', async () => {
      const promise = firstValueFrom(store.selectedValuesChanged$);

      store.setSelectedValues([1]);

      const emittedValue = await promise;
      expect(emittedValue).toEqual([1]);
    });
  });

  describe('input value management', () => {
    beforeEach(() => {
      store.initialize(mockOptions);
    });

    it('should set input value', () => {
      store.setInputValue('test');

      expect(store.inputValue()).toBe('test');
    });

    it('should clear input value', () => {
      store.setInputValue('test');
      store.clearInputValue();

      expect(store.inputValue()).toBe('');
    });

    it('should emit inputValueChanged event', async () => {
      const promise = firstValueFrom(store.inputValueChanged$);

      store.setInputValue('test');

      const emittedValue = await promise;
      expect(emittedValue).toBe('test');
    });

    it('should not emit inputValueChanged if value unchanged', () => {
      const eventSpy = vi.fn();
      store.inputValueChanged$.subscribe(eventSpy);

      store.setInputValue('test');
      store.setInputValue('test');

      expect(eventSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('filtering', () => {
    beforeEach(() => {
      store.initialize(mockOptions);
    });

    it('should filter options with option filter', () => {
      store.setOptionFilter((inputValue, option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));

      store.setInputValue('car');

      const filtered = store.filteredOptions();
      expect(filtered.length).toBe(2);
      expect(filtered.map((opt) => opt.label)).toEqual(['Carrot', 'Cherry']);
    });

    it('should filter out selected options when configured', () => {
      store.setFilterSelectedOptions(true);
      store.setSelectedValues([1]);

      const filtered = store.filteredOptions();
      expect(filtered.every((opt) => opt.value !== 1)).toBe(true);
    });

    it('should return filtered grouped options', () => {
      store.setOptionFilter((_inputValue, option) => option.groupLabel === 'Fruits');

      const filteredGrouped = store.filteredGroupedOptions();

      expect(filteredGrouped.length).toBe(1);
      expect(filteredGrouped[0].groupLabel).toBe('Fruits');
    });
  });

  describe('focus management', () => {
    beforeEach(() => {
      store.initialize(mockOptions);
    });

    it('should set focused option', () => {
      const option = store.options()[0];
      store.setFocusedOption(option);

      expect(store.focusedOption()).toEqual(option);
    });

    it('should emit focusedOptionChanged event', async () => {
      const promise = firstValueFrom(store.focusedOptionChanged$);
      const option = store.options()[0];

      store.setFocusedOption(option);

      const emittedValue = await promise;
      expect(emittedValue).toEqual(option);
    });

    it('should get focused option index', () => {
      const option = store.filteredOptions()[2];
      store.setFocusedOption(option);

      const index = store.getFocusedOptionIndex();
      expect(index).toBe(2);
    });

    it('should return -1 for focused index when nothing focused', () => {
      const index = store.getFocusedOptionIndex();
      expect(index).toBe(-1);
    });

    it('should get focused option group index', () => {
      const option = store.options().find((opt) => opt.groupLabel === 'Fruits');
      store.setFocusedOption(option!);

      const groupIndex = store.getFocusedOptionGroupIndex();
      expect(groupIndex.groupIndex).toBeGreaterThanOrEqual(0);
      expect(groupIndex.optionIndex).toBeGreaterThanOrEqual(0);
    });

    it('should focus next option', () => {
      store.focusFirst();
      const firstOption = store.focusedOption();

      store.focusNext();

      expect(store.focusedOption()).not.toEqual(firstOption);
    });

    it('should wrap to first option when focusing next from last', () => {
      store.focusLast();
      store.focusNext();

      expect(store.focusedOption()).toEqual(store.filteredOptions()[0]);
    });

    it('should focus previous option', () => {
      store.focusLast();
      const lastOption = store.focusedOption();

      store.focusPrevious();

      expect(store.focusedOption()).not.toEqual(lastOption);
    });

    it('should wrap to last option when focusing previous from first', () => {
      store.focusFirst();
      store.focusPrevious();

      const lastOption = store.filteredOptions()[store.filteredOptions().length - 1];
      expect(store.focusedOption()).toEqual(lastOption);
    });

    it('should focus first option', () => {
      store.focusFirst();

      expect(store.focusedOption()).toEqual(store.filteredOptions()[0]);
    });

    it('should focus last option', () => {
      store.focusLast();

      const lastOption = store.filteredOptions()[store.filteredOptions().length - 1];
      expect(store.focusedOption()).toEqual(lastOption);
    });

    it('should not change focus when no options available', () => {
      store.setOptions([]);

      store.focusNext();
      expect(store.focusedOption()).toBeNull();

      store.focusPrevious();
      expect(store.focusedOption()).toBeNull();

      store.focusFirst();
      expect(store.focusedOption()).toBeNull();

      store.focusLast();
      expect(store.focusedOption()).toBeNull();
    });
  });

  describe('grouped focus management', () => {
    beforeEach(() => {
      store.initialize(mockOptions);
    });

    it('should focus first option in grouped view', () => {
      store.groupFocusFirst();

      const grouped = store.filteredGroupedOptions();
      expect(store.focusedOption()).toEqual(grouped[0].options[0]);
    });

    it('should focus last option in grouped view', () => {
      store.groupFocusLast();

      const grouped = store.filteredGroupedOptions();
      const lastGroup = grouped[grouped.length - 1];
      const lastOption = lastGroup.options[lastGroup.options.length - 1];

      expect(store.focusedOption()).toEqual(lastOption);
    });

    it('should focus next option within same group', () => {
      const grouped = store.filteredGroupedOptions();
      const firstGroup = grouped.find((group) => group.options.length > 1);

      if (firstGroup) {
        store.setFocusedOption(firstGroup.options[0]);
        store.groupFocusNext();

        expect(store.focusedOption()).toEqual(firstGroup.options[1]);
      }
    });

    it('should move to next group when at end of current group', () => {
      const grouped = store.filteredGroupedOptions();

      if (grouped.length > 1) {
        const firstGroup = grouped[0];
        store.setFocusedOption(firstGroup.options[firstGroup.options.length - 1]);

        store.groupFocusNext();

        expect(store.focusedOption()).toEqual(grouped[1].options[0]);
      }
    });

    it('should wrap to first group when focusing next from last group', () => {
      store.groupFocusLast();
      store.groupFocusNext();

      const grouped = store.filteredGroupedOptions();
      expect(store.focusedOption()).toEqual(grouped[0].options[0]);
    });

    it('should focus previous option within same group', () => {
      const grouped = store.filteredGroupedOptions();
      const groupWithMultiple = grouped.find((group) => group.options.length > 1);

      if (groupWithMultiple) {
        store.setFocusedOption(groupWithMultiple.options[1]);
        store.groupFocusPrevious();

        expect(store.focusedOption()).toEqual(groupWithMultiple.options[0]);
      }
    });

    it('should move to previous group when at start of current group', () => {
      const grouped = store.filteredGroupedOptions();

      if (grouped.length > 1) {
        store.setFocusedOption(grouped[1].options[0]);
        store.groupFocusPrevious();

        const previousGroup = grouped[0];
        expect(store.focusedOption()).toEqual(previousGroup.options[previousGroup.options.length - 1]);
      }
    });

    it('should wrap to last group when focusing previous from first group', () => {
      store.groupFocusFirst();
      store.groupFocusPrevious();

      const grouped = store.filteredGroupedOptions();
      const lastGroup = grouped[grouped.length - 1];
      expect(store.focusedOption()).toEqual(lastGroup.options[lastGroup.options.length - 1]);
    });

    it('should focus first option when nothing focused and calling groupFocusNext', () => {
      store.groupFocusNext();

      const grouped = store.filteredGroupedOptions();
      expect(store.focusedOption()).toEqual(grouped[0].options[0]);
    });

    it('should focus last option when nothing focused and calling groupFocusPrevious', () => {
      store.groupFocusPrevious();

      const grouped = store.filteredGroupedOptions();
      const lastGroup = grouped[grouped.length - 1];
      expect(store.focusedOption()).toEqual(lastGroup.options[lastGroup.options.length - 1]);
    });

    it('should not change focus in grouped navigation when no options available', () => {
      store.setOptions([]);

      store.groupFocusNext();
      expect(store.focusedOption()).toBeNull();

      store.groupFocusPrevious();
      expect(store.focusedOption()).toBeNull();

      store.groupFocusFirst();
      expect(store.focusedOption()).toBeNull();

      store.groupFocusLast();
      expect(store.focusedOption()).toBeNull();
    });
  });

  describe('configuration management', () => {
    beforeEach(() => {
      store.initialize(mockOptions);
    });

    it('should update full configuration', () => {
      store.setConfig({
        isMultiSelect: true,
        allowNewOptions: true,
        filterSelectedOptions: true,
      });

      expect(store.isMultiSelect()).toBe(true);
      expect(store.allowNewOptions()).toBe(true);
      expect(store.config().filterSelectedOptions).toBe(true);
    });

    it('should partially update configuration', () => {
      store.setConfig({ isMultiSelect: true });

      expect(store.isMultiSelect()).toBe(true);
      expect(store.allowNewOptions()).toBe(false);
    });

    it('should set isMultiSelect', () => {
      store.setIsMultiSelect(true);

      expect(store.isMultiSelect()).toBe(true);
    });

    it('should set allowNewOptions', () => {
      store.setAllowNewOptions(true);

      expect(store.allowNewOptions()).toBe(true);
    });

    it('should set filterSelectedOptions', () => {
      store.setFilterSelectedOptions(true);

      expect(store.config().filterSelectedOptions).toBe(true);
    });

    it('should set option filter', () => {
      const filter = (_inputValue: string, _option: ComboboxOption) => true;

      store.setOptionFilter(filter);

      expect(store.config().optionFilter).toBe(filter);
    });

    it('should clear option filter', () => {
      const filter = (_inputValue: string, _option: ComboboxOption) => true;
      store.setOptionFilter(filter);

      store.setOptionFilter(null);

      expect(store.config().optionFilter).toBeNull();
    });
  });

  describe('opened state management', () => {
    beforeEach(() => {
      store.initialize(mockOptions);
    });

    it('should initialize with closed state', () => {
      expect(store.isOpened()).toBe(false);
    });

    it('should set opened state', () => {
      store.setIsOpened(true);

      expect(store.isOpened()).toBe(true);
    });

    it('should open combobox', () => {
      store.open();

      expect(store.isOpened()).toBe(true);
    });

    it('should close combobox', () => {
      store.open();
      store.close();

      expect(store.isOpened()).toBe(false);
    });

    it('should toggle combobox state', () => {
      expect(store.isOpened()).toBe(false);

      store.toggle();
      expect(store.isOpened()).toBe(true);

      store.toggle();
      expect(store.isOpened()).toBe(false);
    });

    it('should emit isOpenedChanged event', async () => {
      const promise = firstValueFrom(store.isOpenedChanged$);

      store.setIsOpened(true);

      const emittedValue = await promise;
      expect(emittedValue).toBe(true);
    });

    it('should not emit isOpenedChanged if value unchanged', () => {
      const eventSpy = vi.fn();
      store.isOpenedChanged$.subscribe(eventSpy);

      store.setIsOpened(false);
      store.setIsOpened(false);

      expect(eventSpy).toHaveBeenCalledTimes(0);
    });

    it('should reset focused option when closing', () => {
      const option = store.options()[0];
      store.setFocusedOption(option);
      store.open();

      expect(store.focusedOption()).toEqual(option);

      store.close();

      expect(store.focusedOption()).toBeNull();
    });

    it('should emit focusedOptionChanged when focused option resets on close', async () => {
      const option = store.options()[0];
      store.setFocusedOption(option);
      store.open();

      const promise = firstValueFrom(store.focusedOptionChanged$);
      store.close();

      const emittedValue = await promise;
      expect(emittedValue).toBeNull();
    });

    it('should not emit focusedOptionChanged when closing if nothing was focused', () => {
      const eventSpy = vi.fn();
      store.focusedOptionChanged$.subscribe(eventSpy);

      store.open();
      store.close();

      expect(eventSpy).toHaveBeenCalledTimes(0);
    });

    it('should reset focused option when using setIsOpened(false)', () => {
      const option = store.options()[0];
      store.setFocusedOption(option);
      store.setIsOpened(true);

      expect(store.focusedOption()).toEqual(option);

      store.setIsOpened(false);

      expect(store.focusedOption()).toBeNull();
    });

    it('should reset focused option when toggling from opened to closed', () => {
      const option = store.options()[0];
      store.setFocusedOption(option);
      store.toggle();

      expect(store.focusedOption()).toEqual(option);
      expect(store.isOpened()).toBe(true);

      store.toggle();

      expect(store.focusedOption()).toBeNull();
      expect(store.isOpened()).toBe(false);
    });

    it('should maintain focused option when opening', () => {
      const option = store.options()[0];
      store.setFocusedOption(option);

      store.open();

      expect(store.focusedOption()).toEqual(option);
    });
  });

  describe('grouping state management', () => {
    beforeEach(() => {
      store.initialize(mockOptions);
    });

    it('should initialize with grouping disabled by default', () => {
      expect(store.isGroupingEnabled()).toBe(false);
    });

    it('should initialize with grouping enabled when configured', () => {
      store.initialize(mockOptions, { isGroupingEnabled: true });

      expect(store.isGroupingEnabled()).toBe(true);
    });

    it('should set grouping enabled state', () => {
      store.setIsGroupingEnabled(true);

      expect(store.isGroupingEnabled()).toBe(true);
    });

    it('should update grouping enabled state after initialization', () => {
      expect(store.isGroupingEnabled()).toBe(false);

      store.setIsGroupingEnabled(true);
      expect(store.isGroupingEnabled()).toBe(true);

      store.setIsGroupingEnabled(false);
      expect(store.isGroupingEnabled()).toBe(false);
    });

    it('should still provide grouped options when grouping is disabled', () => {
      store.setIsGroupingEnabled(false);

      const grouped = store.groupedOptions();
      expect(grouped.length).toBeGreaterThan(0);
    });

    it('should still provide non-grouped options when grouping is enabled', () => {
      store.setIsGroupingEnabled(true);

      const options = store.options();
      expect(options.length).toBeGreaterThan(0);
    });
  });

  describe('edge cases', () => {
    it('should handle empty options list', () => {
      store.initialize([]);

      expect(store.options()).toEqual([]);
      expect(store.filteredOptions()).toEqual([]);
      expect(store.groupedOptions()).toEqual([]);
    });

    it('should handle options with same labels', () => {
      const duplicateOptions: ComboboxOptionInput[] = [
        { label: 'Same', value: 1 },
        { label: 'Same', value: 2 },
      ];

      store.initialize(duplicateOptions);

      expect(store.options().length).toBe(2);
      expect(store.getOptionByValue(1)).toBeDefined();
      expect(store.getOptionByValue(2)).toBeDefined();
    });

    it('should handle empty string values', () => {
      const emptyStringOption: ComboboxOptionInput[] = [{ label: 'Empty', value: '' }];

      store.initialize(emptyStringOption, { allowNewOptions: true });
      store.setSelectedValues(['']);

      expect(store.selectedValues()).toEqual(['']);
    });

    it('should handle numeric string values', () => {
      const numericOptions: ComboboxOptionInput[] = [{ label: 'One', value: '1' }];

      store.initialize(numericOptions);
      store.setSelectedValues(['1']);

      expect(store.selectedValues()).toEqual(['1']);
    });
  });
});
