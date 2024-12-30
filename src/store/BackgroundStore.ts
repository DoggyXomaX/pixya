import { createStore } from 'solid-js/store';
import { Objectf } from '@/lib/Objectf';

type TBackgroundStoreData = {
  url: string;
};

class BackgroundStore {
  private readonly _get;
  private readonly _set;
  private readonly _defaults: TBackgroundStoreData = {
    url: '',
  };

  public constructor() {
    [this._get, this._set] = createStore<TBackgroundStoreData>({ ...this._defaults });
  }

  public static get instance() {
    return instance;
  }

  public get url(): string {
    return this._get.url;
  }

  public set url(value: string) {
    this._set('url', value);
  }

  public reset() {
    Objectf.keys(this._defaults).forEach((key) => {
      this._set(key, this._defaults[key]);
    });
  }
}

const instance = new BackgroundStore();

export { BackgroundStore };
