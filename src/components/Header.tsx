import { HeaderStore } from '@/store/HeaderStore';

import '@/components/Header.sass';

export function Header() {
  return <h1 class="header">{HeaderStore.instance.title}</h1>;
}