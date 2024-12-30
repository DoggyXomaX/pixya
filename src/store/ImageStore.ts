import { ImageDomain, TImageStubData } from '@/domains/ImageDomain';
import { XEventTarget } from '@/lib/XEventTarget';
import { TColor } from '@/types/TColor';
import { createStore } from 'solid-js/store';
import { Objectf } from '@/lib/Objectf';

type TImageStoreEventMap = {
  change: [item: ImageDomain];
};

type TImageStoreData = {
  currentImageId: string;
};

class ImageStore extends XEventTarget<TImageStoreEventMap> {
  private _images: ImageDomain[];

  private readonly _get;
  private readonly _set;
  private readonly _defaults: TImageStoreData = {
    currentImageId: '',
  };

  public constructor() {
    super();
    this._images = [];
    [this._get, this._set] = createStore<TImageStoreData>({ ...this._defaults });
  }

  public static get instance() {
    return instance;
  }

  public get currentImage(): ImageDomain | undefined {
    return this.get(this._get.currentImageId);
  }

  public get currentImageId(): string {
    return this._get.currentImageId;
  }

  public set currentImageId(value: string) {
    this._set('currentImageId', value);
  }

  public create(data: TImageStubData) {
    const domain = new ImageDomain(this, data);

    this._images.push(domain);

    return domain;
  }

  public get(id: unknown) {
    return this._images.find((image) => image.id === id);
  }

  public setWidth(id: unknown, value: number) {
    const item = this.get(id);
    if (item) {
      item.setWidth(value);
      this.dispatch('change', item);
    }
  }

  public setHeight(id: unknown, value: number) {
    const item = this.get(id);
    if (item) {
      item.setHeight(value);
      this.dispatch('change', item);
    }
  }

  public resize(id: unknown, width: number, height: number) {
    const item = this.get(id);
    if (item) {
      item.resize(width, height);
      this.dispatch('change', item);
    }
  }

  public getPixel(id: unknown, x: number, y: number) {
    return this.get(id)?.getPixel(x, y);
  }

  public setPixel(id: unknown, x: number, y: number, color: TColor) {
    const item = this.get(id);
    if (item) {
      item.setPixel(x, y, color);
      this.dispatch('change', item);
    }
  }

  public fill(id: unknown, color: TColor) {
    const item = this.get(id);
    if (item) {
      item.fill(color);
      this.dispatch('change', item);
    }
  }

  public reset() {
    this._images = [];
    Objectf.keys(this._defaults).forEach((key) =>
      this._set(key, this._defaults[key]),
    );
  }
}

const instance = new ImageStore();

export { ImageStore };
