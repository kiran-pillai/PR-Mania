export const updateBgColor = (theme: string) => {
  if (theme === 'dark') {
    return 'bg-sky-950';
  }
  if (theme === 'light') {
    return 'bg-sky-200';
  }
};

export const getBorderColor = (theme: string) =>
  `${theme === 'dark' ? '2px solid var(--dark-seperator)' : '0.5px solid var(--light-seperator)'}`;
