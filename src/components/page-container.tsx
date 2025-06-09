import { cn } from '@/lib/utils';
import * as React from 'react';

// Основной контейнер страницы
function PageContainer({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex flex-col flex-1 bg-bg-surface1 rounded overflow-hidden p-2.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Заголовок страницы
function PageHeader({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'px-6 py-7 flex justify-between items-center gap-2.5 border-b border-border-soft',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Заголовок текст
function PageTitle({
  className,
  children,
  ...props
}: React.ComponentProps<'h1'>) {
  return (
    <h1
      className={cn(
        'text-fg-default text-[32px] leading-[100%] tracking-[-0.02em] font-bold',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

// Контент страницы
function PageContent({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('flex-1 flex flex-col overflow-hidden', className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Секция с отступами
function PageSection({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('px-6 py-6', className)} {...props}>
      {children}
    </div>
  );
}

// Контейнер фильтров/действий
function PageActions({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'px-6 py-6 flex justify-between items-center gap-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Контейнер таблицы с правильными отступами
function PageTableContainer({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex-1 px-4 pb-4 overflow-auto', className)} {...props}>
      {children}
    </div>
  );
}

export {
  PageContainer,
  PageHeader,
  PageTitle,
  PageContent,
  PageSection,
  PageActions,
  PageTableContainer,
};
