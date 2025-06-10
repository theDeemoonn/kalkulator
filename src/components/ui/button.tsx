import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-[14px] leading-[140%] tracking-[0em] font-medium align-middle transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default:
          'bg-accent-default text-accent-on-accent hover:bg-accent-hover',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline:
          'border border-border-hard bg-bg-surface1 hover:bg-bg-surface3 hover:text-fg-default',
        secondary: 'bg-bg-surface3 text-fg-default hover:bg-bg-surface4',
        ghost: 'hover:bg-bg-surface3 hover:text-fg-default',
        link: 'text-accent-default underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 gap-1.5 px-2.5 rounded',
        sm: 'h-8 gap-1 px-2 rounded text-[12px]',
        lg: 'h-12 gap-2 px-4 rounded text-[16px]',
        icon: 'w-10 h-10 p-0 rounded',
        full: 'h-10 gap-1.5 px-2.5 rounded w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  // Автоматически определяем icon-only вариант
  const isIconOnly = !children && (leftIcon || rightIcon);
  const effectiveSize = isIconOnly ? 'icon' : size;

  // Функция для рендеринга иконки с правильными размерами
  const renderIcon = (icon: React.ReactNode, position: 'left' | 'right') => {
    if (!icon) return null;

    if (React.isValidElement(icon)) {
      // Проверяем, что элемент поддерживает className
      const iconElement = icon as React.ReactElement<{ className?: string }>;
      const existingClassName = iconElement.props?.className || '';

      return React.cloneElement(iconElement, {
        className: cn(
          'shrink-0',
          effectiveSize === 'icon' ? 'size-5' : 'size-5',
          existingClassName
        ),
      });
    }

    return <span className="shrink-0 size-4">{icon}</span>;
  };

  const content = asChild ? (
    children
  ) : (
    <>
      {leftIcon && renderIcon(leftIcon, 'left')}
      {children && <span className="truncate">{children}</span>}
      {rightIcon && renderIcon(rightIcon, 'right')}
    </>
  );

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size: effectiveSize,
          className,
        }),
        // Дополнительные стили для правильного отступа при наличии иконок
        {
          'px-3': leftIcon && children && effectiveSize === 'default',
          'px-2.5': leftIcon && children && effectiveSize === 'sm',
          'px-4': leftIcon && children && effectiveSize === 'lg',
        }
      )}
      {...props}
    >
      {content}
    </Comp>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
