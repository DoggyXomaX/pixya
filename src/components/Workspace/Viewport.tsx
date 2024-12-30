import type { ImageDomain } from '@/domains/ImageDomain';

import { createEffect, onCleanup } from 'solid-js';
import { ToolStore } from '@/store/ToolStore';
import { ImageStore } from '@/store/ImageStore';

import './Viewport.sass';

export function Viewport() {
  const frame = ImageStore.instance.currentImage;
  if (!frame) return null;

  createEffect(() => {
    const canvas = document.querySelector<HTMLCanvasElement>('.viewport__canvas');
    if (!canvas) return;

    const cursor = document.querySelector<HTMLDivElement>('.viewport__cursor');
    if (!cursor) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const onFrameChange = (item: ImageDomain) => {
      context.putImageData(item.imageData, 0, 0);
    };

    // First component render
    const initialFrame = ImageStore.instance.currentImage;
    if (initialFrame) onFrameChange(initialFrame);

    let isLeftHold = false;
    let isRightHold = false;

    const getXY = (e: PointerEvent | WheelEvent, frame: ImageDomain): { x: number; y: number } => {
      const { left, top, width, height } = canvas.getBoundingClientRect();
      return {
        x: ((e.clientX - left) / width) * frame.width | 0,
        y: ((e.clientY - top) / height) * frame.height | 0,
      };
    }

    const onPencil = (e: PointerEvent) => {
      const currentFrame = ImageStore.instance.currentImage;
      if (!currentFrame) return;

      const { x, y } = getXY(e, currentFrame);
      const color = isLeftHold ? ToolStore.instance.color : ToolStore.instance.altColor;

      const size = ToolStore.instance.size;
      const halfSize = size / 2 | 0;
      currentFrame.store.fillRect(
        currentFrame.id,
        x - halfSize,
        y - halfSize,
        size,
        size,
        color,
      );
    };

    const onEraser = (e: PointerEvent) => {
      const currentFrame = ImageStore.instance.currentImage;
      if (!currentFrame) return;

      const { x, y } = getXY(e, currentFrame);

      const size = ToolStore.instance.size;
      const halfSize = size / 2 | 0;
      currentFrame.store.fillRect(
        currentFrame.id,
        x - halfSize,
        y - halfSize,
        size,
        size,
        { r: 0, g: 0, b: 0, a: 0 },
      );
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.button !== 2) return;

      switch (ToolStore.instance.tool) {
        case 'pencil': {
          isLeftHold = e.button === 0;
          isRightHold = e.button === 2;
          onPencil(e);
          break;
        }
        case 'eraser': {
          isLeftHold = e.button === 0;
          isRightHold = e.button === 2;
          onEraser(e);
          break;
        }
      }
    };

    const updateCursor = (e: PointerEvent | WheelEvent) => {
      const frame = ImageStore.instance.currentImage;
      if (!frame) return;

      const { left, top, width, height } = canvas.getBoundingClientRect();
      const { x, y } = getXY(e, frame);

      const size = ToolStore.instance.size;
      const halfSize = size / 2 | 0;

      const toolX = x - halfSize;
      const toolY = y - halfSize;

      const bWidth = width / frame.width;
      const bHeight = height / frame.height;

      cursor.style.width = `${bWidth * size}px`;
      cursor.style.height = `${bHeight * size}px`;
      cursor.style.left = `${left + toolX * bWidth}px`;
      cursor.style.top = `${top + toolY * bHeight}px`;
    }

    const onPointerMove = (e: PointerEvent) => {
      updateCursor(e);

      if (!isLeftHold && !isRightHold) return;

      switch (ToolStore.instance.tool) {
        case 'pencil': {
          onPencil(e);
          break;
        }
        case 'eraser': {
          onEraser(e);
          break;
        }
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.button === 0) isLeftHold = false;
      if (e.button === 2) isRightHold = false;
    }

    const onContext = (e: MouseEvent) => e.preventDefault();

    const onWheel = (e: WheelEvent) => {
      ToolStore.instance.size += Math.sign(-e.deltaY);
      updateCursor(e);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('contextmenu', onContext);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('wheel', onWheel);
    ImageStore.instance.on('change', onFrameChange);

    onCleanup(() => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('contextmenu', onContext);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('wheel', onWheel);
      ImageStore.instance.off('change', onFrameChange);
    });
  });

  return (
    <div class="viewport">
      <canvas class="viewport__canvas" width={frame.width} height={frame.height}>
        Your device does not support this graphics API!
      </canvas>
      <div class="viewport__cursor"></div>
    </div>
  )
}
