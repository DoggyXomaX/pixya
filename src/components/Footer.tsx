import { getFooterText } from '@/lib/helpers/getFooterText';

import './Footer.sass';

const footerText = getFooterText();

export function Footer() {
  return <footer class="footer">{footerText}</footer>
}
