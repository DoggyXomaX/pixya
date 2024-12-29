export const getFooterText = () => {
  const fromYear = 2024;
  const footerText = ['(c) Artem Filin', `${fromYear}`];
  const currentYear = new Date().getFullYear();
  if (currentYear > fromYear) footerText.push('-', `${currentYear}`);
  return footerText.join(' ');
};