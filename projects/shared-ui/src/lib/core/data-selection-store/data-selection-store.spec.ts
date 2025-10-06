import { DataSelectionStore } from './data-selection-store';

describe('DataSelectionStore', () => {
  let store: DataSelectionStore<string>;

  beforeEach(() => {
    store = new DataSelectionStore<string>();
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  // todo: add comprehensive unit tests
});
