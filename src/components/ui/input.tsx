import { cn } from '@/lib/utils';
import * as React from 'react';

function Input({
  className,
  type,
  prefix,
  suffix,
  ...props
}: React.ComponentProps<'input'> & {
  prefix?: string;
  suffix?: string;
}) {
  if (prefix || suffix) {
    return (
      <div
        className={cn(
          'flex h-10 w-full min-w-0 rounded border text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
          // Custom styling for the new design
          'bg-[var(--bg-surface1)] border-[var(--border-hard)]',
          className
        )}
        style={{
          borderWidth: '1px',
        }}
      >
        {prefix && (
          <span className="flex items-center pl-2.5 pr-1 text-muted-foreground select-none">
            {prefix}
          </span>
        )}
        <input
          type={type}
          data-slot="input"
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex-1 bg-transparent border-0 outline-none file:inline-flex file:h-7 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            prefix ? 'pl-0' : 'pl-2.5',
            suffix ? 'pr-0' : 'pr-2.5',
            'py-2.5'
          )}
          {...props}
        />
        {suffix && (
          <span className="flex items-center pr-2.5 pl-1 text-muted-foreground select-none">
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
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-10 w-full min-w-0 rounded border p-2.5 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        // Custom styling for the new design
        'bg-[var(--bg-surface1)] border-[var(--border-hard)]',
        className
      )}
      style={{
        borderWidth: '1px',
      }}
      {...props}
    />
  );
}

export { Input };
