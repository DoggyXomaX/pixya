import { Tools } from './Tools';
import { Viewport } from './Viewport';
import { Info } from './Info';

import style from './Workspace.module.sass';

export function Workspace() {
  return (
    <div class={style.workspace}>
      <Tools />
      <Viewport />
      <Info />
    </div>
  );
}
