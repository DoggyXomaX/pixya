import { Footer } from '@/components/Footer';
import { Workspace } from '@/components/Workspace';
import { Header } from "@/components/Header";

import '@/components/Pixya.sass';

export function Pixya() {
  return (
    <div class="pixya">
      <Header />
      <Workspace />
      <Footer />
    </div>
  )
}