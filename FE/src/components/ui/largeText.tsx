import { cn } from '@/utils';
import { TextProps } from './mutedText';

export function LargeText(props: TextProps) {
  const { children, size = 'lg', className } = props;
  return (
    <div className={cn('text-lg font-semibold', className)}>{children}</div>
  );
}
