import './Tools.sass';
import { ToolTypes } from '@/types/TToolType';
import { ToolStore } from '@/store/ToolStore';

export function Tools() {
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
    </div>
  );
}
