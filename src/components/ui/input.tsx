'use client';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface InputProps extends Omit<React.ComponentProps<'input'>, 'prefix'> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

function Input({
  className,
  type,
  prefix,
  suffix,
  value,
  defaultValue,
  onChange,
  ...props
}: InputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const [isFocused, setIsFocused] = React.useState(false);

  // Определяем, есть ли значение в input
  const hasValue = React.useMemo(() => {
    if (value !== undefined) {
      return String(value).length > 0;
    }
    return String(internalValue).length > 0;
  }, [value, internalValue]);

  // Показывать ли prefix
  const showPrefix = !hasValue && !isFocused;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };
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
          <span
            className={cn(
              'flex items-center pl-2.5 pr-1 text-fg-soft select-none text-[16px] leading-[120%] tracking-[-0.01em] font-semibold transition-all duration-200 ease-in-out',
              showPrefix
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2 pointer-events-none'
            )}
          >
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          data-slot="input"
          className={cn(
            'file:text-foreground placeholder:text-fg-soft selection:bg-accent-default selection:text-accent-on-accent flex-1 bg-transparent border-0 outline-none file:inline-flex file:h-7 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            showPrefix ? 'pl-0' : 'pl-2.5',
            suffix ? 'pr-0' : 'pr-2.5',
            'py-2.5 transition-all duration-200 ease-in-out'
          )}
          {...props}
        />
        {suffix && (
          <span className="flex items-center pr-2.5 pl-1 text-fg-soft select-none">
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
