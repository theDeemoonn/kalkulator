import InfoSquare from '@/components/icon/info-square';
import { TypographyBodyS, TypographyMuted } from '@/components/typography';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { Input } from './input';
import { Label } from './label';
import { Slider } from './slider';

// Типы размеров
export type InputSize = 'sm' | 'md' | 'lg';

// Основные пропсы компонента
export type InputWithControlsProps = {
  // Основные свойства
  value: number | string;
  onChange: (value: number | string) => void;

  // Размеры и внешний вид
  size?: InputSize;
  className?: string;
  disabled?: boolean;
  error?: boolean;

  // Лейблы и текст
  label?: string;
  measure?: string;
  title?: string;
  subtitle?: string;
  prefix?: string;
  suffix?: string;

  // Кнопка информации
  showInfoButton?: boolean;
  onInfoClick?: () => void;

  // Слайдер (только для числовых значений)
  showSlider?: boolean;
  min?: number;
  max?: number;
  step?: number;

  // Инпут настройки
  type?: 'number' | 'text';
  placeholder?: string;
  'aria-label'?: string;
};

const sizeStyles = {
  sm: {
    container: 'w-48',
    input: 'w-16 h-7 text-sm',
    text: 'text-sm',
  },
  md: {
    container: 'w-56',
    input: 'w-20 h-8 text-base',
    text: 'text-sm',
  },
  lg: {
    container: 'w-64',
    input: 'w-24 h-9 text-base',
    text: 'text-base',
  },
};

export const InputWithControls: React.FC<InputWithControlsProps> = ({
  value,
  onChange,
  size = 'md',
  className,
  disabled,
  error,
  label,
  measure,
  title,
  subtitle,
  prefix,
  suffix,
  showInfoButton = false,
  onInfoClick,
  showSlider = false,
  min = 0,
  max = 100,
  step = 1,
  type = 'number',
  placeholder,
  'aria-label': ariaLabel,
}) => {
  const styles = sizeStyles[size];

  const handleSliderChange = (val: number[]) => {
    if (type === 'number' && val[0] !== value) {
      onChange(val[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      const num = Number(e.target.value);
      if (!isNaN(num)) onChange(num);
    } else {
      onChange(e.target.value);
    }
  };

  // Кнопка информации
  const InfoButton = () => (
    <button
      type="button"
      tabIndex={0}
      aria-label="Информация"
      onClick={onInfoClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onInfoClick?.()}
      className="relative outline-none focus-visible:ring-2 focus-visible:ring-accent-default rounded"
      role="button"
    >
      <InfoSquare className="w-4 h-4" />
    </button>
  );

  // Режим с measure, title, subtitle (как в InputWithSlider)
  const isComplexMode = measure || title || subtitle;

  if (isComplexMode) {
    return (
      <div
        className={cn(
          'relative flex flex-col gap-1.5',
          styles.container,
          className
        )}
      >
        <div
          className={cn(
            'bg-bg-surface1 rounded-sm outline outline-offset-[-1px] outline-border-hard flex flex-col gap-0.5 overflow-hidden px-1.5 pt-2.5 pb-1.5',
            error && 'outline-destructive'
          )}
        >
          {/* Верхняя секция */}
          <div className="flex min-h-10 px-1 gap-1.5 items-start">
            <div className="flex flex-col justify-center items-center select-none">
              {measure && (
                <span className="text-fg-default text-base font-bold leading-tight">
                  {measure}
                </span>
              )}
              {subtitle && (
                <sub className="text-fg-default text-base font-bold leading-tight">
                  {subtitle}
                </sub>
              )}
            </div>
            <div className="flex-1 flex items-center justify-center text-fg-soft text-sm font-medium leading-tight">
              {title}
            </div>
            {showInfoButton && <InfoButton />}
          </div>

          {/* Нижняя секция */}
          <div className="flex p-1 bg-bg-surface1 rounded-sm items-center gap-1.5">
            <div className="flex-1 flex items-center gap-1.5">
              {!value && value == 0 ? (
                <div className="text-fg-default text-sm font-medium leading-tight select-none">
                  <TypographyMuted>{placeholder}</TypographyMuted>
                </div>
              ) : (
                <>
                  {prefix && (
                    <div className="text-fg-default text-sm font-medium leading-tight select-none">
                      {prefix}
                    </div>
                  )}
                  <Input
                    type={type}
                    min={type === 'number' ? min : undefined}
                    max={type === 'number' ? max : undefined}
                    step={type === 'number' ? step : undefined}
                    suffix={suffix}
                    value={value}
                    onChange={handleInputChange}
                    disabled={disabled}
                    placeholder={placeholder}
                    aria-label={ariaLabel || title || label}
                    className={cn(
                      styles.input,
                      'text-right px-2 py-1 border-none'
                    )}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Слайдер */}
        {showSlider && type === 'number' && (
          <div className="relative left-0 right-0 bottom-3.5 w-full px-2.5 flex items-center h-3.5">
            <Slider
              min={min}
              max={max}
              step={step}
              value={[Number(value)]}
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
        )}
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', styles.container, className)}>
      {label && (
        <div className="flex justify-between items-center">
          <Label className="leading-none h-[18px] flex items-center">
            <TypographyBodyS className="text-fg-soft">{label}</TypographyBodyS>
          </Label>
          {showInfoButton && <InfoButton />}
        </div>
      )}

      <div className="flex gap-2">
        <div className="flex items-center gap-1">
          <Input
            type={type}
            min={type === 'number' ? min : undefined}
            max={type === 'number' ? max : undefined}
            step={type === 'number' ? step : undefined}
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            placeholder={placeholder}
            aria-label={ariaLabel || label}
            className={cn(styles.container)}
            prefix={prefix}
            suffix={suffix}
          />
        </div>
      </div>

      {/* Слайдер для простого режима - исправлена ширина */}
      {showSlider && type === 'number' && (
        <div className="relative  left-0 right-0 bottom-4 w-full px-2.5 flex items-center h-3.5">
          <Slider
            min={min}
            max={max}
            step={step}
            value={[Number(value)]}
            onValueChange={handleSliderChange}
            disabled={disabled}
            className="w-full h-0.5 bg-border-hard2"
          />
        </div>
      )}
    </div>
  );
};
