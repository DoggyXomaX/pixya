import { XEventTarget } from '@/lib/XEventTarget';
import { TToolType } from '@/types/TToolType';
import { createStore } from 'solid-js/store';
import { TColor } from '@/types/TColor';
import { Objectf } from '@/lib/Objectf';
import { clamp } from '@/lib/Mathf';

type TToolStoreEventMap = {
  change: [type: TToolType];
};

type TToolStoreData = {
  tool: TToolType;
  color: TColor;
  altColor: TColor;
  size: number;
}

class ToolStore extends XEventTarget<TToolStoreEventMap> {
  private readonly _get;
  private readonly _set;
  private readonly _defaults: TToolStoreData = {
    tool: 'pencil',
    color: { r: 0, g: 0, b: 0, a: 255 },
    altColor: { r: 255, g: 255, b: 255, a: 255 },
    size: 1,
  }

  public constructor() {
    super();

    [this._get, this._set] = createStore<TToolStoreData>({ ...this._defaults });
  }

  public static get instance() {
    return instance;
  }

  public get tool() {
    return this._get.tool;
  }

  public set tool(value: TToolType) {
    this._set('tool', value);
  }

  public get color() {
    return this._get.color;
  }

  public set color(value: TColor) {
    this._set('color', value);
  }

  public get altColor() {
    return this._get.altColor;
  }

  public set altColor(value: TColor) {
    this._set('altColor', value);
  }

  public get size() {
    return this._get.size;
  }

  public set size(value: number) {
    this._set('size', clamp(value, 1, 100));
  }

  public reset() {
    Objectf.keys(this._defaults).forEach((key) =>
      this._set(key, this._defaults[key])
    );
  }
}

const instance = new ToolStore();

export { ToolStore };