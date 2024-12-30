import type { JSX } from 'solid-js';

import { ToolTypes } from '@/types/TToolType';
import { ToolStore } from '@/store/ToolStore';
import { ImageStore } from '@/store/ImageStore';

import './Tools.sass';
import { hexToRgba } from '@/lib/helpers/hexToRgba';
import { rgbaToRgbHex } from '@/lib/helpers/rgbaToRgbHex';

export function Tools() {
  const onSave = async () => {
    const frame = ImageStore.instance.currentImage;
    if (!frame) return;

    const canvas = new OffscreenCanvas(frame.width, frame.height);
    const context = canvas.getContext('2d');
    if (!context) return;

    context.putImageData(frame.imageData, 0, 0);

    const blob = await canvas.convertToBlob({ type: 'image/png' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.download = 'Frame_0.png';
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onFill = () => {
    ImageStore.instance.fill(ImageStore.instance.currentImageId, ToolStore.instance.color);
  };

  const onMainColorChange: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event> = (e) => {
    ToolStore.instance.color = hexToRgba(e.currentTarget.value);
  };

  const onAltColorChange: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event> = (e) => {
    ToolStore.instance.altColor = hexToRgba(e.currentTarget.value);
  };

  const onResizeClick = () => {
    const widthElement = document.querySelector<HTMLInputElement>('#frameWidth');
    const heightElement = document.querySelector<HTMLInputElement>('#frameHeight');
    if (!widthElement || !heightElement) return;

    const width = Number(widthElement.value) | 0;
    const height = Number(heightElement.value) | 0;
    if (Number.isNaN(width) || Number.isNaN(height)) return;
    if (width < 1 || height < 1) return;

    ImageStore.instance.resize(ImageStore.instance.currentImageId, width, height);

    const newInstance = ImageStore.instance.currentImage;
    if (!newInstance) return;

    // TODO: wtf
    const canvas = document.querySelector<HTMLCanvasElement>('.viewport__canvas');
    if (!canvas) return;

    canvas.width = newInstance.width;
    canvas.height = newInstance.height;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.putImageData(newInstance.imageData, 0, 0);
  };

  const frame = ImageStore.instance.currentImage;
  if (!frame) return;

  return (
    <div class="tools">
      {ToolTypes.map((tool) => {
        if (tool === 'none') return null;

        const action = () => {
          ToolStore.instance.tool = ToolStore.instance.tool === tool ? 'none' : tool;
        };

        const classList = ['tools__tool'];
        if (ToolStore.instance.tool === tool) {
          classList.push('selected');
        }

        return <p class={classList.join(' ')} onClick={action}>{tool}</p>
      })}

      <p class="tools__tool" onClick={onSave}>Save</p>
      <p class="tools__tool" onClick={onFill}>Fill</p>
      <p class="tools__tool">
        Width: <input id="frameWidth" type="number" value={frame.width} />
        Height: <input id="frameHeight" type="number" value={frame.height} />
        <button onClick={onResizeClick}>Resize</button>
      </p>
      <p class="tools__tool">Size: {ToolStore.instance.size}</p>

      <p class="tools__tool">
        <input type="color" onChange={onMainColorChange} value={rgbaToRgbHex(ToolStore.instance.color)}/>
        <input type="color" onChange={onAltColorChange} value={rgbaToRgbHex(ToolStore.instance.altColor)}/>
      </p>
    </div>
  );
}
