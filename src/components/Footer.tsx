import { compute } from '@/lib/helpers/compute';

import style from './Footer.module.sass';

const footerText = compute(() => {
  const fromYear = 2024;
  const footerText = ['(c) Artem Filin', `${fromYear}`];
  const currentYear = new Date().getFullYear();
  if (currentYear > fromYear) footerText.push('-', `${currentYear}`);
  return footerText.join(' ');
});

export function Footer() {
  return <footer class={style.footer}>{footerText}</footer>
}
