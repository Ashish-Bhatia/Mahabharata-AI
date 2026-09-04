export function sortChronology<T extends { sequence: number; id: string }>(events: T[]) {
  return [...events].sort((a, b) => a.sequence - b.sequence || a.id.localeCompare(b.id));
}
