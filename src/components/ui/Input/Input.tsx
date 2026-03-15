import React, { forwardRef, useId } from 'react';
import { cn } from '@lib/utils/cn'; // adjust import path as needed

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      fullWidth = true,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className={cn('flex flex-col gap-2', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-semibold tracking-tight text-slate-800"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-slate-400 transition-colors group-focus-within:text-[#0A2540]">
                {leftIcon}
              </span>
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              'group flex h-12 w-full rounded-2xl border px-4 py-3 text-[15px] font-medium shadow-sm transition-all duration-200',
              'border-slate-200 bg-white/95 text-slate-900 placeholder:font-normal placeholder:text-slate-400',
              'hover:border-slate-300 hover:shadow-md',
              'focus:outline-none focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/12 focus:shadow-[0_0_0_1px_rgba(0,102,255,0.08)]',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50',
              leftIcon && 'pl-11',
              rightIcon && 'pr-11',
              error && 'border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-red-500/15',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <span className="text-slate-400">
                {rightIcon}
              </span>
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm font-medium text-red-600"
          >
            {error}
          </p>
        )}

        {hint && !error && (
          <p
            id={`${inputId}-hint`}
            className="text-sm text-slate-500"
          >
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';