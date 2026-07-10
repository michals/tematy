export default function getBaseLetter(str) {
  if (!str) return '';
  const first = str.trim().charAt(0).toUpperCase();
  const mapping = {
    Ą: 'A',
    Ć: 'C',
    Ę: 'E',
    Ł: 'L',
    Ń: 'N',
    Ó: 'O',
    Ś: 'S',
    Ź: 'Z',
    Ż: 'Z',
  };
  return mapping[first] || first;
}
