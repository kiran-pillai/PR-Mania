import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils';
import { Cross2Icon } from '@radix-ui/react-icons';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export interface BadgeCloseableProps extends BadgeProps {
  onClose: () => void;
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
function BadgeRemovable({ className, variant, ...props }: BadgeCloseableProps) {
  const { children, onClose, ...rest } = props;
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...rest}>
      {children}
      <Cross2Icon className="ml-2 h-4 w-4 cursor-pointer" onClick={onClose} />
    </div>
  );
}

export { Badge, badgeVariants, BadgeRemovable };
