export const updateBgColor = (theme: string) => {
  if (theme === 'dark') {
    return 'bg-sky-950';
  }
  if (theme === 'light') {
    return 'bg-sky-200';
  }
};
