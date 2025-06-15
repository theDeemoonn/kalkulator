import { cn } from '@/lib/utils';
import * as React from 'react';
import { Slider } from './slider';

// Типы пропсов
export type InputWithSliderProps = {
  measure: string | React.ReactNode;
  title: string;
  subtitle?: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  onInfoClick?: () => void;
  error?: boolean;
  label?: string;
  disabled?: boolean;
  className?: string;
};

export const InputWithSlider: React.FC<InputWithSliderProps> = ({
  measure,
  title,
  subtitle,
  value,
  unit,
  min,
  max,
  step = 1,
  onChange,
  onInfoClick,
  error,
  label,
  disabled,
  className,
}) => {
  const handleSliderChange = (val: number[]) => {
    if (val[0] !== value) onChange(val[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (!isNaN(num)) onChange(num);
  };

  return (
    <div className={cn('relative flex flex-col gap-1.5 h-[86px]', className)}>
      <div
        className={cn(
          'bg-bg-surface1 rounded-sm outline outline-offset-[-1px] outline-border-hard flex flex-col gap-0.5 overflow-hidden px-1.5 pt-2.5 pb-1.5',
          error && 'outline-destructive'
        )}
      >
        {/* Верхняя секция */}
        <div className="flex min-h-10 px-1 gap-1.5 items-start">
          <div className="flex flex-col justify-center items-center select-none">
            <span className="text-fg-default text-base font-bold leading-tight">
              {measure}
            </span>
            <sub className="text-fg-default text-base font-bold leading-tight">
              {subtitle}
            </sub>
          </div>
          <div className="flex-1 flex items-center justify-center text-fg-soft text-sm font-medium leading-tight">
            {title}
          </div>
          <button
            type="button"
            tabIndex={0}
            aria-label="Информация"
            onClick={onInfoClick}
            onKeyDown={(e) =>
              (e.key === 'Enter' || e.key === ' ') && onInfoClick?.()
            }
            className="relative p-0.5 outline-none focus-visible:ring-2 focus-visible:ring-accent-default rounded"
            role="button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.99973 5.7785V5.83599M7.94504 8.29691H9.35129L9.35156 12.5156M13.2187 2.25C14.6167 2.25 15.75 3.38327 15.75 4.78124L15.75 13.2188C15.75 14.6167 14.6167 15.75 13.2188 15.75H4.78125C3.38328 15.75 2.25 14.6167 2.25 13.2188V4.78124C2.25 3.38327 3.38328 2.25 4.78125 2.25H13.2187Z"
                stroke="var(--fg-soft, #99928B)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {/* Нижняя секция */}
        <div className="flex bg-bg-surface1 rounded-sm items-center gap-1.5">
          <div className="flex-1 flex items-center gap-1.5">
            <div className="text-fg-default text-sm font-medium leading-tight select-none">
              {value}
            </div>
            <div className="text-fg-default text-sm font-medium leading-tight select-none">
              {unit}
            </div>
          </div>
        </div>
      </div>
      {/* Слайдер снизу */}
      <div className="absolute left-0 right-0 bottom-1 w-full px-2.5 flex items-center h-3.5">
        <Slider
          min={min}
          max={max}
          step={step}
          value={[value]}
          onValueChange={handleSliderChange}
          disabled={disabled}
          className="flex-1 h-0.5 bg-border-hard2"
        />
        <div
          tabIndex={0}
          aria-label="Перетащить"
          role="button"
          className="ml-2 flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-accent-default rounded"
        ></div>
      </div>
    </div>
  );
};
