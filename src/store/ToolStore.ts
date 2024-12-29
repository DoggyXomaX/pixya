import { XEventTarget } from '@/lib/XEventTarget';
import { TToolType } from '@/types/TToolType';
import { createStore } from 'solid-js/store';
import { TColor } from '@/types/TColor';
import { Objectf } from '@/lib/Objectf';

type TToolStoreEventMap = {
  change: [type: TToolType];
};

type TToolStoreData = {
  tool: TToolType;
  color: TColor;
  altColor: TColor;
}

class ToolStore extends XEventTarget<TToolStoreEventMap> {
  private readonly _get;
  private readonly _set;

  private readonly defaults: TToolStoreData = {
    tool: 'none',
    color: { r: 0, g: 0, b: 0, a: 255 },
    altColor: { r: 255, g: 255, b: 255, a: 255 },
  }

  public constructor() {
    super();

    [this._get, this._set] = createStore<TToolStoreData>({ ...this.defaults });
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

  public reset() {
    Objectf.keys(this.defaults).forEach((key) =>
      this._set(key, this.defaults[key])
    );
  }
}

const instance = new ToolStore();

export { ToolStore };