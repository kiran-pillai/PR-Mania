import { cn } from '@/utils';

export interface TextProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MutedText(props: TextProps) {
  const { children, size = 'sm', className } = props;
  return (
    <p className={cn(`text-${size} text-muted-foreground`, className)}>
      {children}
    </p>
  );
}
