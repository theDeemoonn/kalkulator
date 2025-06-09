import { cn } from '@/lib/utils';
import * as React from 'react';

export function TypographyDisplayM({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        'text-[42px] leading-[100%] tracking-[-0.03em] font-normal',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function TypographyDisplayMStrong({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        'text-[42px] leading-[100%] tracking-[-0.03em] font-bold',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function TypographyDisplayS({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        'text-[36px] leading-[100%] tracking-[-0.03em] font-normal',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function TypographyDisplaySStrong({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        'text-[36px] leading-[100%] tracking-[-0.03em] font-bold',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function TypographyH1({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        'text-[32px] leading-[100%] tracking-[-0.02em] font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        'text-[28px] leading-[100%] tracking-[-0.02em] font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'text-[24px] leading-[110%] tracking-[-0.01em] font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function TypographyH4({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4
      className={cn(
        'text-[20px] leading-[120%] tracking-[-0.01em] font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

export function TypographyH5({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h5
      className={cn(
        'text-[16px] leading-[120%] tracking-[-0.01em] font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </h5>
  );
}

export function TypographyBodyXL({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-[18px] leading-[140%] tracking-[0em] font-normal',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function TypographyBodyL({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-[16px] leading-[140%] tracking-[0em] font-normal',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function TypographyBodyM({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-[14px] leading-[140%] tracking-[0em] font-normal',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function TypographyBodyS({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-[12px] leading-[140%] tracking-[0em] font-normal',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function TypographyDescriptionL({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'text-[12px] leading-[140%] tracking-[0em] font-normal text-fg-soft',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function TypographyDescriptionM({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'text-[10px] leading-[140%] tracking-[0em] font-normal text-fg-soft',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function TypographyP({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-[16px] leading-[140%] tracking-[0em] font-normal',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function TypographyBlockquote({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn(
        'mt-6 border-l-2 border-border-soft pl-6 italic text-[16px] leading-[140%]',
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
}

export function TypographyInlineCode({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={cn(
        'relative rounded bg-bg-surface3 px-[0.3rem] py-[0.2rem] text-[14px] font-mono font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </code>
  );
}

export function TypographyLead({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'text-[20px] leading-[140%] tracking-[-0.01em] text-fg-soft',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function TypographyLarge({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('text-[18px] leading-[140%] font-semibold', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function TypographySmall({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <small
      className={cn(
        'text-[12px] leading-[140%] font-medium text-fg-soft',
        className
      )}
      {...props}
    >
      {children}
    </small>
  );
}

export function TypographyMuted({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-[14px] leading-[140%] text-fg-soft', className)}
      {...props}
    >
      {children}
    </p>
  );
}
