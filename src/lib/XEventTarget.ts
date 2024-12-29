import { Objectf } from '@/lib/Objectf';

export abstract class XEventTarget<EventMap extends Record<string, unknown[]>> {
  public _listeners: { [EventName in keyof EventMap]?: ((...args: EventMap[EventName]) => void)[] } = {};

  public on<Type extends keyof EventMap>(type: Type, listener: (...args: EventMap[Type]) => void): void {
    if (!this._listeners[type]) this._listeners[type] = [];
    this._listeners[type]?.push(listener);
  }

  public off<Type extends keyof EventMap>(type: Type, listener: (...args: EventMap[Type]) => void): void {
    if (!this._listeners[type]) return;
    const listenerIndex = this._listeners[type].indexOf(listener);
    if (listenerIndex !== -1) this._listeners[type].splice(listenerIndex, 1);
  }

  public dispatch<Type extends keyof EventMap>(type: Type, ...args: EventMap[Type]): void {
    if (!this._listeners[type]) return;
    this._listeners[type].forEach((listener) => listener(...args));
  }

  public offAll() {
    Objectf.keys(this._listeners).forEach((key) => {
      this._listeners[key] = [];
    });
  }
}