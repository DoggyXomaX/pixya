import type { ImageDomain } from '@/domains/ImageDomain';

import { createEffect } from 'solid-js';
import { ToolStore } from '@/store/ToolStore';
import { ImageStore } from '@/store/ImageStore';

import './Viewport.sass';

export function Viewport() {
  createEffect(() => {
    const canvas = document.querySelector<HTMLCanvasElement>('.viewport__canvas');
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const onFrameChange = (item: ImageDomain) => {
      context.putImageData(item.imageData, 0, 0);
    };

    // First component render
    const currentFrame = ImageStore.instance.get(ImageStore.instance.currentImage);
    if (currentFrame) onFrameChange(currentFrame);

    let isLeftHold = false;
    let isRightHold = false;

    const onPencil = (e: PointerEvent) => {
      const currentFrame = ImageStore.instance.get(ImageStore.instance.currentImage);
      if (!currentFrame) return;

      const { left, top, width, height } = canvas.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * currentFrame.width | 0;
      const y = ((e.clientY - top) / height) * currentFrame.height | 0;

      const color = isLeftHold ? ToolStore.instance.color : ToolStore.instance.altColor;
      currentFrame.store.setPixel(currentFrame.id, x, y, color);
    }

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.button !== 2) return;

      switch (ToolStore.instance.tool) {
        case 'pencil': {
          isLeftHold = e.button === 0;
          isRightHold = e.button === 2;
          onPencil(e);
          break;
        }
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isLeftHold && !isRightHold) return;

      switch (ToolStore.instance.tool) {
        case 'pencil': {
          onPencil(e);
          break;
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.button === 0) isLeftHold = false;
      if (e.button === 2) isRightHold = false;
    }

    const onContext = (e: MouseEvent) => e.preventDefault();

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('contextmenu', onContext);
    document.addEventListener('pointerup', onPointerUp);
    ImageStore.instance.on('change', onFrameChange);

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      ImageStore.instance.off('change', onFrameChange);
    };
  });

  return (
    <div class="viewport">
      <canvas class="viewport__canvas" width="32" height="32">
        Your device does not support this graphics API!
      </canvas>
    </div>
  )
}
