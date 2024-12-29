import { Tools } from './Tools';
import { Viewport } from './Viewport';
import { Info } from './Info';

import './Workspace.sass';

export function Workspace() {
  return (
    <div class="workspace">
      <Tools />
      <Viewport />
      <Info />
    </div>
  );
}
