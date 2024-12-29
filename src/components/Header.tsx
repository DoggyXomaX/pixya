import { HeaderStore } from '@/store/HeaderStore';

export function Header() {
  return <h1 class="header">{HeaderStore.title}</h1>;
}