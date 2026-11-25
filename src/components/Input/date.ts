const pad = (n: number) => String(n).padStart(2, '0');

/** A Date as "YYYY-MM-DD" (the value of the Date variant). */
export const toIso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** "YYYY-MM-DD" as a local Date, or undefined when the text is not a real date. */
export function fromIso(value?: string): Date | undefined {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value ?? '');
  if (!m) return undefined;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.getMonth() === Number(m[2]) - 1 && d.getDate() === Number(m[3]) ? d : undefined;
}

/** "YYYY-MM-DD" shown in the field as "DD.MM.YYYY". */
export function formatDisplay(value?: string): string {
  const d = fromIso(value);
  return d ? `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}` : '';
}

/** "DD.MM.YYYY" typed in the field as "YYYY-MM-DD", or undefined when it is not a real date. */
export function parseDisplay(text: string): string | undefined {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(text.trim());
  if (!m) return undefined;
  const iso = `${m[3]}-${m[2]}-${m[1]}`;
  return fromIso(iso) ? iso : undefined;
}
