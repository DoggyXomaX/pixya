/* @refresh reload */
import { render } from 'solid-js/web';
import { Pixya } from '@/components/Pixya';
import '@/index.sass';

const appContainer = document.querySelector<HTMLDivElement>('pixya');
if (!appContainer) throw Error('No pixya container!');

render(Pixya, appContainer);
