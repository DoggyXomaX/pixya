/* @refresh reload */
import { render } from 'solid-js/web';

import { Pixya } from '@/components/Pixya';

import '@/assets/sass/index.sass';

const pixyaApp = document.querySelector<HTMLDivElement>('.pixya-app');
if (!pixyaApp) throw Error('No pixya-app found!');

render(() => <Pixya />, pixyaApp);
