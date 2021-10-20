export const useMakeTextFile = (list: string[]) => {
  if (list?.length) {
    const data = new Blob([list.join(' ')], { type: 'text/plain' });
    return { downloadLink: window.URL.createObjectURL(data) };
  }

  return { downloadLink: null };
};
