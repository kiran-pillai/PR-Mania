export const getAvatarInitials = (name: string) => {
  const isFullName = name?.split(' ').length > 1;
  return isFullName
    ? name
        ?.split(' ')
        ?.map((n) => n[0])
        ?.join('')
    : name?.[0];
};
