import type { TColor } from '@/types/TColor';

import { stubString } from '@/lib/stub/stubString';
import { generateId } from '@/lib/helpers/generateId';
import { stubNumber } from '@/lib/stub/stubNumber';
import { ImageStore } from '@/store/ImageStore';

type TImageInputData = {
  id: string;
  width: number;
  height: number;
}


type TImageStubData = Partial<TImageInputData>;

class ImageDomain implements TImageInputData {
  public readonly store: ImageStore;

  private readonly _id: string;

  private _width: number;

  private _height: number;

  private _imageData: ImageData;

  public constructor(store: ImageStore, data: TImageStubData) {
    const raw = ImageDomain.stub(data);

    this.store = store;

    this._id = raw.id;
    this._width = raw.width;
    this._height = raw.height;
    this._imageData = new ImageData(this.width, this.height);
  }

  public get id() {
    return this._id;
  }

  public get width() {
    return this._width;
  }

  public get height() {
    return this._height;
  }

  public get imageData() {
    return this._imageData;
  }

  public setWidth(value: number) {
    return this.resize(value, this._height);
  }

  public setHeight(value: number) {
    return this.resize(this._width, value);
  }

  public resize(width: number, height: number) {
    if (width < 1 || height < 1) return;
    if (Number.isNaN(width) || Number.isNaN(height)) return;
    if (!Number.isFinite(width) || !Number.isFinite(height)) return;

    const targetImageData = new ImageData(width, height);
    const sourceData32 = new Int32Array(this._imageData.data.buffer);
    const targetData32 = new Int32Array(targetImageData.data.buffer);

    const oldWidth = this._width;
    const oldHeight = this._height;
    const copyWidth = Math.min(width, oldWidth);
    const copyHeight = Math.min(height, oldHeight);
    for (let y = 0; y < copyHeight; y++) {
      for (let x = 0; x < copyWidth; x++) {
        targetData32[y * width + x] = sourceData32[y * oldWidth + x];
      }
    }

    this._imageData = targetImageData;
    this._width = width;
    this._height = height;
  }

  public getPixel(x: number, y: number): TColor {
    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
      return { r: 0, g: 0, b: 0, a: 0 };
    }

    const i = (y * this._width + x) * 4;

    const { data } = this._imageData;
    return {
      r: data[i],
      g: data[i + 1],
      b: data[i + 2],
      a: data[i + 3],
    };
  }

  public setPixel(x: number, y: number, color: TColor) {
    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
      return;
    }

    const i = (y * this._width + x) * 4;
    const { data: outData } = this._imageData;
    outData[i] = color.r & 0xff;
    outData[i + 1] = color.g & 0xff;
    outData[i + 2] = color.b & 0xff;
    outData[i + 3] = color.a & 0xff;
  }

  public fill(color: TColor) {
    const [color32] = new Int32Array(
      new Uint8Array([
        color.r & 0xff,
        color.g & 0xff,
        color.b & 0xff,
        color.a & 0xff
      ]).buffer
    );

    const data32 = new Int32Array(this._imageData.data.buffer);
    const dataLen = data32.length;
    for (let i = 0; i < dataLen; i++) {
      data32[i] = color32;
    }
  }

  public static stub(data: TImageStubData): TImageInputData {
    return {
      id: stubString(data.id, generateId('Image')),
      width: stubNumber(data.width, 32),
      height: stubNumber(data.height, 32),
    };
  }
}

export type { TImageStubData };
export { ImageDomain };