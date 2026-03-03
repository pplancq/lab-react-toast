import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ToastService } from '../ToastService';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllTimers();
});

describe('ToastService', () => {
  it('should return empty array on initialization for getAllToastIds', () => {
    const store = new ToastService();

    expect(store.getAllToastIds()).toStrictEqual([]);
  });

  it('should add a toast and increment currentId with default duration', () => {
    const store = new ToastService();

    store.addToast('Hello World');

    const ids = store.getAllToastIds();
    expect(ids).toHaveLength(1);

    const toast = store.getToastById(ids[0]);

    expect(toast).toBeDefined();
    expect(toast?.id).toStrictEqual(ids[0]);
    expect(toast?.message).toStrictEqual('Hello World');
    expect(toast?.duration).toStrictEqual(3000);
  });

  it('should accept custom duration when adding a toast', () => {
    const store = new ToastService();

    store.addToast('Short', 1500);

    const ids = store.getAllToastIds();
    expect(ids).toHaveLength(1);
    expect(store.getToastById(ids[0])?.duration).toStrictEqual(1500);
  });

  it('should use constructor default duration when provided', () => {
    const store = new ToastService(10000);

    store.addToast('Long');

    const ids = store.getAllToastIds();
    expect(ids).toHaveLength(1);
    expect(store.getToastById(ids[0])?.duration).toStrictEqual(10000);
  });

  it('should return all toast ids after adding multiple toasts', () => {
    const store = new ToastService();

    store.addToast('A');
    store.addToast('B');
    store.addToast('C');

    const ids = store.getAllToastIds();
    expect(ids).toHaveLength(3);
  });

  it('should remove toast and update ids', () => {
    const store = new ToastService();

    store.addToast('A');
    store.addToast('B');
    store.addToast('C');

    const ids = store.getAllToastIds();
    expect(ids).toHaveLength(3);

    const idToRemove = ids[1];
    store.removeToast(idToRemove);

    expect(store.getToastById(idToRemove)).toBeUndefined();
    expect(store.getAllToastIds()).toStrictEqual([ids[0], ids[2]]);
  });

  it('should notify subscribers on add and remove, and allow unsubscribe', () => {
    const store = new ToastService();

    const observer = vi.fn();
    const unsubscribe = store.subscribe(observer);

    store.addToast('One');
    expect(observer).toHaveBeenCalledTimes(1);

    store.addToast('Two');
    expect(observer).toHaveBeenCalledTimes(2);

    unsubscribe();

    store.addToast('Three');
    expect(observer).toHaveBeenCalledTimes(2);

    const observer2 = vi.fn();
    const unsubscribe2 = store.subscribe(observer2);

    const ids = store.getAllToastIds();
    store.removeToast(ids[0]);
    expect(observer2).toHaveBeenCalledTimes(1);

    unsubscribe2();
  });

  it('should notify subscribers on automatic removal', () => {
    const storeAuto = new ToastService();
    const observerAuto = vi.fn();
    const unsubscribeAuto = storeAuto.subscribe(observerAuto);

    storeAuto.addToast('Auto');
    expect(observerAuto).toHaveBeenCalledTimes(1); // add

    const ids = storeAuto.getAllToastIds();
    expect(ids).toHaveLength(1);
    const addedId = ids[0];

    vi.advanceTimersByTime(3000);
    expect(observerAuto).toHaveBeenCalledTimes(2); // removal after timeout

    expect(storeAuto.getToastById(addedId)).toBeUndefined();
    expect(storeAuto.getAllToastIds()).toStrictEqual([]);

    unsubscribeAuto();
  });

  it('should not notify subscribers twice when toast is manually removed before timeout', () => {
    const store = new ToastService();
    const observer = vi.fn();
    const unsubscribe = store.subscribe(observer);

    store.addToast('Manual', 10000);
    expect(observer).toHaveBeenCalledTimes(1);
    const ids = store.getAllToastIds();
    expect(ids).toHaveLength(1);
    const toastId = ids[0];

    vi.advanceTimersByTime(100);
    store.removeToast(toastId);
    expect(observer).toHaveBeenCalledTimes(2);
    observer.mockClear();

    vi.advanceTimersByTime(10000);
    expect(observer).not.toHaveBeenCalled();
    expect(store.getToastById(toastId)).toBeUndefined();
    expect(store.getAllToastIds()).toStrictEqual([]);
    unsubscribe();
  });
});
