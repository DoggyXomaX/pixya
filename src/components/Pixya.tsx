import { Footer } from '@/components/Footer';
import { Workspace } from '@/components/Workspace';
import { Header } from "@/components/Header";

import style from '@/components/Pixya.module.sass';

export function Pixya() {
  return (
    <div class={style.pixya}>
      <Header />
      <Workspace />
      <Footer />
    </div>
  )
}