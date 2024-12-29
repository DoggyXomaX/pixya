/* @refresh reload */
import { render } from 'solid-js/web';
import { Pixya } from '@/components/Pixya';
import { prepareStores } from '@/prepareStores';

import '@/index.sass';

const appContainer = document.querySelector<HTMLDivElement>('pixya');
if (!appContainer) throw Error('No pixya container!');

prepareStores();

render(Pixya, appContainer);
