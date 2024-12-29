import style from './Viewport.module.sass';

export function Viewport() {
  return (
    <div class={style.viewport}>
      <canvas class={style.viewport__canvas} width="32" height="32">
        Your device does not support this graphics API!
      </canvas>
    </div>
  )
}
