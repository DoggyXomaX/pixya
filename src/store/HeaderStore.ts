import { createStore } from 'solid-js/store';
import { Objectf } from '@/lib/Objectf';

type THeaderStoreData = {
  title: string;
};

class HeaderStore {
  private readonly _get;
  private readonly _set;
  private readonly _defaults: THeaderStoreData = {
    title: 'PIXYA',
  };

  public constructor() {
    [this._get, this._set] = createStore<THeaderStoreData>({ ...this._defaults });
  }

  public static get instance() {
    return instance;
  }

  public get title() {
    return this._get.title;
  }

  public set title(value: string) {
    this._set('title', value);
  }

  public reset() {
    Objectf.keys(this._defaults).forEach((key) =>
      this._set(key, this._defaults[key])
    );
  }
}

const instance = new HeaderStore();

export { HeaderStore };
