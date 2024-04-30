export const updateBgColor = (theme: string) => {
  if (theme === 'dark') {
    return 'bg-sky-950';
  }
  if (theme === 'light') {
    return 'bg-sky-200';
  }
};

export const getBorderColor = (theme: string) =>
  `2px solid ${theme === 'dark' ? 'var(--dark-seperator)' : 'var(--light-seperator)'}`;
