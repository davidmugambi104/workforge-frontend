import React, { forwardRef, useId } from 'react';
import { cn } from '@lib/utils/cn';
import { TextareaProps } from './Textarea.types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      fullWidth = true,
      id,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const textareaId = id || generatedId;

    return (
      <div className={cn('flex flex-col gap-2', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-semibold tracking-tight text-slate-800"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-0 top-3.5 pl-4 flex items-start pointer-events-none">
              <span className="text-slate-400 sm:text-sm">{leftIcon}</span>
            </div>
          )}

          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            className={cn(
              'w-full rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-[15px] text-slate-900 shadow-sm transition-all duration-200',
              'placeholder:text-slate-400 hover:border-slate-300 hover:shadow-md',
              'focus:outline-none focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/12',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50',
              leftIcon && 'pl-11',
              rightIcon && 'pr-11',
              error && 'border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-red-500/15',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-0 top-3.5 pr-4 flex items-start pointer-events-none">
              <span className="text-slate-400 sm:text-sm">{rightIcon}</span>
            </div>
          )}
        </div>

        {error && (
          <p id={`${textareaId}-error`} className="text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={`${textareaId}-hint`} className="text-sm text-slate-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
