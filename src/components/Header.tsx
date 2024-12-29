import { HeaderStore } from '@/store/HeaderStore';

import style from '@/components/Header.module.sass';

export function Header() {
  return <h1 class={style.header}>{HeaderStore.title}</h1>;
}