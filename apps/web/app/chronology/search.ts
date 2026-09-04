export function matchesEvent(event: { names: { text: string }[] }, query: string) {
  const needle = query.trim().toLocaleLowerCase();
  return !needle || event.names.some((name) => name.text.toLocaleLowerCase().includes(needle));
}
