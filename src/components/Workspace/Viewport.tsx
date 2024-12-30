import type { ImageDomain } from '@/domains/ImageDomain';

import { createEffect, onCleanup } from 'solid-js';
import { ToolStore } from '@/store/ToolStore';
import { ImageStore } from '@/store/ImageStore';
import { BackgroundStore } from '@/store/BackgroundStore';

import './Viewport.sass';
import { EMouseButton } from '@/enums/EMouseButton';

export function Viewport() {
  const frame = ImageStore.instance.currentImage;
  if (!frame) return null;

  createEffect(() => {
    // First component render

    const viewport = document.querySelector<HTMLDivElement>('.viewport');
    if (!viewport) return;

    const background = document.querySelector<HTMLDivElement>('.viewport__background');
    if (!background) return;

    const canvas = document.querySelector<HTMLCanvasElement>('.viewport__canvas');
    if (!canvas) return;

    const cursor = document.querySelector<HTMLDivElement>('.viewport__cursor');
    if (!cursor) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const onFrameChange = (item: ImageDomain) => {
      context.putImageData(item.imageData, 0, 0);
    };

    const effectFrame = ImageStore.instance.currentImage;
    if (effectFrame) onFrameChange(effectFrame);

    let currentHold = EMouseButton.None;

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
      const color = currentHold === EMouseButton.Left ? ToolStore.instance.color : ToolStore.instance.altColor;

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
      if (e.button !== EMouseButton.Left && e.button !== EMouseButton.Right) return;

      currentHold = e.button;

      switch (ToolStore.instance.tool) {
        case 'pencil': return onPencil(e);
        case 'eraser': return onEraser(e);
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

      if (currentHold === EMouseButton.None) return;

      switch (ToolStore.instance.tool) {
        case 'pencil': return onPencil(e);
        case 'eraser': return onEraser(e);
      }
    };

    const onPointerUp = () => {
      currentHold = EMouseButton.None;
    }

    const onContext = (e: MouseEvent) => e.preventDefault();

    const onWheel = (e: WheelEvent) => {
      ToolStore.instance.size += Math.sign(-e.deltaY);
      updateCursor(e);
    };

    const onResize = new ResizeObserver((entries) => {
      const viewportWidth = viewport.offsetWidth;
      const viewportHeight = viewport.offsetHeight;

      const size = Math.min(viewportWidth, viewportHeight);
      background.style.width = `${size}px`;
      background.style.height = `${size}px`;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
    });

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('contextmenu', onContext);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('wheel', onWheel);
    ImageStore.instance.on('change', onFrameChange);
    onResize.observe(viewport);

    onCleanup(() => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('contextmenu', onContext);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('wheel', onWheel);
      ImageStore.instance.off('change', onFrameChange);
      onResize.disconnect();
    });
  });

  return (
    <div class="viewport">
      <div class="viewport__wrapper">
        <canvas class="viewport__canvas" width={frame.width} height={frame.height}>
          Your device does not support this graphics API!
        </canvas>
        <div class="viewport__background">
          {!!(BackgroundStore.instance.url) && <img src={BackgroundStore.instance.url} alt={BackgroundStore.instance.url} />}
        </div>
      </div>
      <div class="viewport__cursor" />
    </div>
  )
}
