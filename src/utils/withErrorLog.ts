export function withErrorLog(fn: () => unknown): void {
  try {
    const p = fn();

    if (
      p &&
      typeof p === 'object' &&
      typeof (p as Promise<unknown>).catch === 'function'
    ) {
      (p as Promise<unknown>).catch(console.error);
    }
  } catch (e) {
    console.error(e);
  }
}
