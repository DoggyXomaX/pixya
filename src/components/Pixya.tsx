import { Footer } from './Footer';

export function Pixya() {
  return (
    <>
      <header class="header">PIXYA</header>
      <div class="viewport">
        <canvas class="viewport__canvas" width="32" height="32"></canvas>
      </div>
      <Footer />
    </>
  )
}