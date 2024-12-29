import { createStore } from 'solid-js/store';
import { Objectf } from '@/lib/Objectf';

type THeaderStoreData = typeof HeaderStoreDefaults;

const HeaderStoreDefaults = {
  title: 'PIXYA',
};

class HeaderStore {
  private readonly _get;

  private readonly _set;

  public constructor() {
    [this._get, this._set] = createStore<THeaderStoreData>(structuredClone(HeaderStoreDefaults));
  }

  public get title() { return this._get.title }
  public set title(value: string) { this._set('title', value) }

  public reset() {
    Objectf.keys(HeaderStoreDefaults).forEach((key) =>
      this._set(key, HeaderStoreDefaults[key])
    );
  }
}

const instance = new HeaderStore();

export { instance as HeaderStore, HeaderStoreDefaults };
