import { cn } from '@/lib/utils';
import * as React from 'react';

function Input({
  className,
  type,
  prefix,
  suffix,
  ...props
}: React.ComponentProps<'input'> & {
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
}) {
  if (prefix || suffix) {
    return (
      <div
        className={cn(
          'flex h-10 w-full min-w-0 rounded border border-border-hard bg-bg-surface1 text-base transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-within:border-accent-default focus-within:ring-accent-default/50 focus-within:ring-[3px]',
          className
        )}
      >
        {prefix && (
          <span className="flex items-center pl-2.5 pr-1 text-fg-default select-none text-[16px] leading-[120%] tracking-[-0.01em] font-semibold">
            {prefix}
          </span>
        )}
        <input
          type={type}
          data-slot="input"
          className={cn(
            'file:text-foreground placeholder:text-fg-soft selection:bg-accent-default selection:text-accent-on-accent flex-1 bg-transparent border-0 outline-none file:inline-flex file:h-7 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            prefix ? 'pl-0' : 'pl-2.5',
            suffix ? 'pr-0' : 'pr-2.5',
            'py-2.5'
          )}
          {...props}
        />
        {suffix && (
          <span className="flex items-center pr-2.5 pl-1 text-fg-default select-none">
            {suffix}
          </span>
        )}
      </div>
    );
  }

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-fg-soft selection:bg-accent-default selection:text-accent-on-accent flex h-10 w-full min-w-0 rounded border border-border-hard bg-bg-surface1 p-2.5 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-accent-default focus-visible:ring-accent-default/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  );
}

export { Input };
