import { AbstractObserver } from '@Front/toast/AbstractObserver/AbstractObserver';

export type Toast = {
  id: number;
  message: string;
  duration?: number;
};

export class ToastService extends AbstractObserver {
  private currentId: number = 0;

  private readonly defaultDuration: number;

  private toast: Map<number, Toast> = new Map();

  private cachedAllToastIds: Array<number> = [];

  constructor(duration: number = 3000) {
    super();

    this.defaultDuration = duration;
  }

  addToast(toast: string, duration?: number) {
    this.currentId += 1;

    this.toast.set(this.currentId, {
      id: this.currentId,
      message: toast,
      duration: duration || this.defaultDuration,
    });

    this.cachedAllToastIds = Array.from(this.toast.keys());

    this.notifyObservers();
  }

  getAllToastIds() {
    return this.cachedAllToastIds;
  }

  getToastById(id: number) {
    return this.toast.get(id);
  }

  removeToast(id: number) {
    this.toast.delete(id);

    this.cachedAllToastIds = Array.from(this.toast.keys());

    this.notifyObservers();
  }
}
