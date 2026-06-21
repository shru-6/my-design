import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { OTPInput } from 'input-otp';
import { PanelGroupProps, ImperativePanelGroupHandle, PanelProps, ImperativePanelHandle, PanelResizeHandleProps } from 'react-resizable-panels';

declare const buttonVariants: (props?: ({
    variant?: "outline" | "ghost" | "primary" | "secondary" | "destructive" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    iconOnly?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ButtonBaseProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "type">;
type ButtonProps = ButtonBaseProps & {
    variant?: VariantProps<typeof buttonVariants>["variant"];
    size?: VariantProps<typeof buttonVariants>["size"];
    left?: React.ReactNode;
    right?: React.ReactNode;
    iconOnly?: boolean;
    ariaLabel?: string;
    loading?: boolean;
    className?: string;
    children?: React.ReactNode;
    href?: string;
    label?: string;
    type?: "button" | "submit" | "reset";
};
declare const Button: React.ForwardRefExoticComponent<ButtonBaseProps & {
    variant?: VariantProps<typeof buttonVariants>["variant"];
    size?: VariantProps<typeof buttonVariants>["size"];
    left?: React.ReactNode;
    right?: React.ReactNode;
    iconOnly?: boolean;
    ariaLabel?: string;
    loading?: boolean;
    className?: string;
    children?: React.ReactNode;
    href?: string;
    label?: string;
    type?: "button" | "submit" | "reset";
} & React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;

declare const fabVariants: (props?: ({
    variant?: "primary" | "secondary" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    position?: "bottom-right" | "bottom-left" | "bottom-center" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface FABProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">, VariantProps<typeof fabVariants> {
    left: React.ReactNode;
    ariaLabel: string;
}
declare const FAB: React.ForwardRefExoticComponent<FABProps & React.RefAttributes<HTMLButtonElement>>;

interface CopyButtonProps extends Omit<ButtonProps, "onClick" | "children" | "onCopy" | "label"> {
    /** Text or value copied to the clipboard. */
    value: string;
    /** Fired after a successful clipboard write. */
    onValueCopy?: (value: string) => void;
    onCopyError?: (error: unknown) => void;
    /** Shown on the button before copy / when reset. */
    copyLabel?: React.ReactNode;
    /** Shown on the button briefly after a successful copy. */
    copiedLabel?: React.ReactNode;
    /** How long to show `copiedLabel` on the button (ms). */
    timeout?: number;
    /** Wraps the button in a `Tooltip` when true. */
    tooltip?: boolean;
    /** Tooltip body when idle; defaults to `copyLabel`. */
    tooltipLabel?: React.ReactNode;
    /** Tooltip body after copy; defaults to `copiedLabel`. */
    tooltipCopiedLabel?: React.ReactNode;
    /** @deprecated Use `tooltipLabel`. */
    tooltipContent?: React.ReactNode;
    children?: React.ReactNode;
}
declare const CopyButton: React.ForwardRefExoticComponent<CopyButtonProps & React.RefAttributes<HTMLButtonElement>>;

interface DropdownItem {
    label: React.ReactNode;
    value?: string;
    onClick?: () => void;
    left?: React.ReactNode;
    disabled?: boolean;
    separator?: boolean;
    children?: DropdownItem[];
}
interface DropdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    items: DropdownItem[];
    triggerProps?: {
        label?: React.ReactNode;
        left?: React.ReactNode;
        variant?: ButtonProps["variant"];
        size?: ButtonProps["size"];
        className?: string;
    };
    /** Optional custom trigger (replaces `triggerProps` button). */
    trigger?: React.ReactNode;
    contentClassName?: string;
    align?: "start" | "center" | "end";
    sideOffset?: number;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}
declare function Dropdown({ items, triggerProps, trigger, contentClassName, align, sideOffset, open: openProp, defaultOpen, onOpenChange, className, ...rest }: DropdownProps): react_jsx_runtime.JSX.Element;
declare namespace Dropdown {
    var displayName: string;
}

type SplitButtonMenuItem = {
    label: React.ReactNode;
    onClick?: () => void;
    left?: React.ReactNode;
    disabled?: boolean;
    separator?: boolean;
};
interface SplitButtonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    onClick?: () => void;
    menuItems: SplitButtonMenuItem[];
    disabled?: boolean;
    loading?: boolean;
    children?: React.ReactNode;
    variant?: Exclude<ButtonProps["variant"], "destructive">;
    size?: ButtonProps["size"];
    buttonProps?: Partial<Omit<ButtonProps, "variant" | "size" | "children" | "iconOnly">>;
    dropdownProps?: Partial<Omit<DropdownProps, "items" | "trigger">>;
}
declare function SplitButton({ onClick, menuItems, disabled, loading, children, variant, size, buttonProps, dropdownProps, className, ...rest }: SplitButtonProps): react_jsx_runtime.JSX.Element;
declare namespace SplitButton {
    var displayName: string;
}

declare const iconVariants: (props?: ({
    size?: "xs" | "sm" | "md" | "lg" | "xl" | null | undefined;
    variant?: "default" | "muted" | null | undefined;
    shape?: "default" | "circle" | "square" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type Status$1 = "online" | "offline" | "away" | "busy";
type StatusPosition = "top-right" | "bottom-right";
interface IconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">, VariantProps<typeof iconVariants> {
    node?: React.ReactNode;
    alt?: string;
    status?: Status$1;
    statusPosition?: StatusPosition;
    fallback?: React.ReactNode;
}
declare const Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<HTMLSpanElement>>;

declare const labelVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {
    required?: boolean;
    left?: React.ReactNode;
}
declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;

declare const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
declare const focusRingOffset = "focus-visible:ring-offset-2";
declare const focusRingDestructive = "focus-visible:ring-destructive";
declare const peerFocusRing = "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring";
/** Unified disabled: no pointer, dimmed, not-allowed cursor (fields, buttons, thumbs). */
declare const disabledControl = "disabled:cursor-not-allowed disabled:opacity-60 disabled:pointer-events-none";
declare const ringOffsetBackground = "ring-offset-background";
type StringFieldValidateOpts = {
    validate?: boolean | ((value: string) => string | undefined);
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    errorMessage?: string;
};
declare function getStringFieldValidationError(value: string, opts: StringFieldValidateOpts): string | undefined;
declare const fieldSurfaceVariants: (props?: ({
    control?: "input" | "textarea" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    variant?: "outline" | "filled" | "ghost" | "underline" | null | undefined;
    invalid?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type FieldSurfaceProps = VariantProps<typeof fieldSurfaceVariants>;
interface FieldLayoutProps {
    className?: string;
    label?: React.ReactNode;
    htmlFor?: string;
    required?: boolean;
    size?: LabelProps["size"];
    errorMessage?: string;
    children: React.ReactNode;
}
declare function FieldLayout({ className, label, htmlFor, required, size, errorMessage, children, }: FieldLayoutProps): react_jsx_runtime.JSX.Element;

interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, Omit<VariantProps<typeof fieldSurfaceVariants>, "control" | "invalid"> {
    label?: React.ReactNode;
    errorMessage?: string;
    left?: React.ReactNode;
    right?: React.ReactNode;
    rightInteractive?: boolean;
    validate?: boolean | ((value: string) => string | undefined);
    onValidate?: (isValid: boolean, error?: string) => void;
}
declare const TextInput: React.ForwardRefExoticComponent<TextInputProps & React.RefAttributes<HTMLInputElement>>;

interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">, Omit<VariantProps<typeof fieldSurfaceVariants>, "control" | "invalid"> {
    label?: React.ReactNode;
    errorMessage?: string;
    validate?: boolean | ((value: string) => string | undefined);
    onValidate?: (isValid: boolean, error?: string) => void;
    resize?: "none" | "vertical" | "horizontal" | "both";
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;

declare const checkboxVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange" | "defaultChecked">, VariantProps<typeof checkboxVariants> {
    default?: boolean;
    indeterminate?: boolean;
    label?: React.ReactNode;
    description?: React.ReactNode;
    errorMessage?: string;
    onChange?: (checked: boolean) => void;
}
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;

declare const radioVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    selected?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange">, VariantProps<typeof radioVariants> {
    default?: boolean;
    label?: React.ReactNode;
    description?: React.ReactNode;
    errorMessage?: string;
    onChange?: (checked: boolean) => void;
}
declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>>;

declare const toggleVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const toggleThumbVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "role" | "size">, VariantProps<typeof toggleVariants> {
    default?: boolean;
    label?: React.ReactNode;
    description?: React.ReactNode;
    errorMessage?: string;
    onChange?: (checked: boolean) => void;
    checked?: boolean;
    defaultChecked?: boolean;
}
declare const Toggle: React.ForwardRefExoticComponent<ToggleProps & React.RefAttributes<HTMLButtonElement>>;

declare const sliderVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SliderProps extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, "value" | "defaultValue" | "onValueChange" | "onChange">, VariantProps<typeof sliderVariants> {
    value?: number | [number, number];
    defaultValue?: number | [number, number];
    onChange?: (value: number | [number, number]) => void;
    range?: boolean;
    showValue?: boolean;
    valueFormatter?: (value: number | [number, number]) => React.ReactNode;
    marks?: Array<{
        value: number;
        label?: React.ReactNode;
    }>;
    label?: React.ReactNode;
    errorMessage?: string;
}
declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLSpanElement>>;

declare const ratingVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type RatingPrecision = 1 | 0.5 | 0.25;
interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">, VariantProps<typeof ratingVariants> {
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    max?: number;
    /** Coerced from string when set from selects (e.g. test harness). */
    precision?: RatingPrecision | number | string;
    readOnly?: boolean;
    disabled?: boolean;
    left?: React.ReactNode;
    showValue?: boolean;
    label?: React.ReactNode;
    errorMessage?: string;
}
declare const Rating: React.ForwardRefExoticComponent<RatingProps & React.RefAttributes<HTMLDivElement>>;

interface InputOTPProps extends Omit<React.ComponentPropsWithoutRef<typeof OTPInput>, "maxLength" | "render" | "children" | "value" | "onChange" | "defaultValue" | "size">, Omit<VariantProps<typeof fieldSurfaceVariants>, "control" | "invalid"> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    length?: number;
    mask?: boolean;
    label?: React.ReactNode;
    errorMessage?: string;
    validate?: boolean | ((value: string) => string | undefined);
    onValidate?: (isValid: boolean, error?: string) => void;
}
declare const InputOTP: React.ForwardRefExoticComponent<InputOTPProps & React.RefAttributes<HTMLInputElement>>;

interface SearchInputProps extends Omit<TextInputProps, "onChange" | "left" | "right" | "type"> {
    /** Immediate value updates (string). */
    onChange?: (value: string) => void;
    /** Debounced callback (see `debounceMs`). */
    onSearch?: (value: string) => void;
    onClear?: () => void;
    debounceMs?: number;
    clearable?: boolean;
    loading?: boolean;
}
declare const SearchInput: React.ForwardRefExoticComponent<SearchInputProps & React.RefAttributes<HTMLInputElement>>;

type PhoneCountry = {
    code: string;
    label: string;
    dial: string;
};
/** Phone field value — `dialCode` is derived via {@link getPhoneDialCode}, not stored on the value. */
type PhoneValue = {
    countryCode: string;
    number: string;
};
declare function getPhoneDialCode(countryCode: string, allowed?: PhoneCountry[]): string;

interface PhoneInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
    value?: PhoneValue;
    defaultValue?: PhoneValue;
    onChange?: (value: PhoneValue) => void;
    defaultCountry?: string;
    allowedCountries?: string[];
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    label?: React.ReactNode;
    errorMessage?: string;
    validate?: boolean | ((value: PhoneValue) => string | undefined);
    onValidate?: (isValid: boolean, error?: string) => void;
    size?: VariantProps<typeof fieldSurfaceVariants>["size"];
    variant?: VariantProps<typeof fieldSurfaceVariants>["variant"];
    inputProps?: Partial<TextInputProps>;
    dropdownProps?: Partial<DropdownProps>;
    className?: string;
}
declare function PhoneInput({ value, defaultValue, onChange, defaultCountry, allowedCountries, placeholder, disabled, required, label, errorMessage, validate, onValidate, size, variant, inputProps, dropdownProps, className, ...rest }: PhoneInputProps): react_jsx_runtime.JSX.Element;
declare namespace PhoneInput {
    var displayName: string;
}

type CommandItem = {
    label: React.ReactNode;
    value: string;
    left?: React.ReactNode;
    group?: string;
    disabled?: boolean;
    keywords?: string[];
};
interface CommandProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    items?: CommandItem[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    inputValue?: string;
    defaultInputValue?: string;
    onInputValueChange?: (value: string) => void;
    onSelect?: (item: CommandItem) => void;
    placeholder?: string;
    emptyState?: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    loop?: boolean;
    debounceMs?: number;
    filterFn?: (item: CommandItem, query: string) => boolean;
    maxHeight?: string | number;
    searchInputProps?: Partial<SearchInputProps>;
    className?: string;
    children?: React.ReactNode;
}
declare function Command({ items, value, defaultValue, onValueChange, inputValue, defaultInputValue, onInputValueChange, onSelect, placeholder, emptyState, loading, disabled, loop, debounceMs, filterFn, maxHeight, searchInputProps, className, children, ...rest }: CommandProps): react_jsx_runtime.JSX.Element;
declare namespace Command {
    var displayName: string;
}

type DateRangeValue = {
    from: Date | null;
    to: Date | null;
};

type CalendarSelectionMode = "single" | "multiple" | "range";
interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
    value?: Date | Date[] | DateRangeValue | null;
    defaultValue?: Date | Date[] | DateRangeValue | null;
    onChange?: (value: Date | Date[] | DateRangeValue | null) => void;
    minDate?: Date;
    maxDate?: Date;
    /** Minimum inclusive span when `selectionMode="range"` (both endpoints count). */
    minRangeDays?: number;
    /** Maximum inclusive span when `selectionMode="range"`. */
    maxRangeDays?: number;
    disabled?: boolean;
    selectionMode?: CalendarSelectionMode;
    showOutsideDays?: boolean;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    disabledDates?: Date[] | ((date: Date) => boolean);
    highlightedDates?: Date[];
    locale?: string;
    className?: string;
}
declare function Calendar({ value, defaultValue, onChange, minDate, maxDate, minRangeDays, maxRangeDays, disabled, selectionMode, showOutsideDays, weekStartsOn, disabledDates, highlightedDates, locale, className, ...rest }: CalendarProps): react_jsx_runtime.JSX.Element;
declare namespace Calendar {
    var displayName: string;
}

interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
    value?: Date | null;
    defaultValue?: Date | null;
    onChange?: (value: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    label?: React.ReactNode;
    errorMessage?: string;
    format?: string;
    locale?: string;
    closeOnSelect?: boolean;
    clearable?: boolean;
    size?: VariantProps<typeof fieldSurfaceVariants>["size"];
    variant?: VariantProps<typeof fieldSurfaceVariants>["variant"];
    inputProps?: Partial<TextInputProps>;
    calendarProps?: Partial<CalendarProps>;
    className?: string;
}
declare function DatePicker({ value, defaultValue, onChange, minDate, maxDate, disabled, required, placeholder, label, errorMessage, format, locale, closeOnSelect, clearable, size, variant, inputProps, calendarProps, className, ...rest }: DatePickerProps): react_jsx_runtime.JSX.Element;
declare namespace DatePicker {
    var displayName: string;
}

interface TimePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
    value?: Date | null;
    defaultValue?: Date | null;
    onChange?: (value: Date | null) => void;
    minTime?: Date;
    maxTime?: Date;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    label?: React.ReactNode;
    errorMessage?: string;
    format?: "12h" | "24h";
    step?: number;
    closeOnSelect?: boolean;
    clearable?: boolean;
    size?: VariantProps<typeof fieldSurfaceVariants>["size"];
    variant?: VariantProps<typeof fieldSurfaceVariants>["variant"];
    inputProps?: Partial<TextInputProps>;
    className?: string;
}
declare function TimePicker({ value, defaultValue, onChange, disabled, required, placeholder, label, errorMessage, format, step, closeOnSelect, clearable, size, variant, inputProps, className, ...rest }: TimePickerProps): react_jsx_runtime.JSX.Element;
declare namespace TimePicker {
    var displayName: string;
}

type DatePreset = {
    label: React.ReactNode;
    value: DateRangeValue;
};
interface DateRangePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
    value?: DateRangeValue | null;
    defaultValue?: DateRangeValue | null;
    onChange?: (value: DateRangeValue | null) => void;
    /** Earliest selectable calendar day. */
    minDate?: Date;
    /** Latest selectable calendar day. */
    maxDate?: Date;
    /** Minimum inclusive span (both endpoints count). */
    minRangeDays?: number;
    /** Maximum inclusive span (both endpoints count). */
    maxRangeDays?: number;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    label?: React.ReactNode;
    errorMessage?: string;
    format?: string;
    locale?: string;
    /** Require Apply to commit; shows Apply / Cancel footer. When false, closes on a valid complete range. */
    showApplyButton?: boolean;
    applyLabel?: string;
    cancelLabel?: string;
    clearable?: boolean;
    presets?: DatePreset[];
    size?: VariantProps<typeof fieldSurfaceVariants>["size"];
    variant?: VariantProps<typeof fieldSurfaceVariants>["variant"];
    inputProps?: Partial<TextInputProps>;
    calendarProps?: Partial<CalendarProps>;
    className?: string;
}
declare function DateRangePicker({ value, defaultValue, onChange, minDate, maxDate, minRangeDays, maxRangeDays, disabled, required, placeholder, label, errorMessage, format, locale, showApplyButton, applyLabel, cancelLabel, clearable, presets, size, variant, inputProps, calendarProps, className, ...rest }: DateRangePickerProps): react_jsx_runtime.JSX.Element;
declare namespace DateRangePicker {
    var displayName: string;
}

interface UploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
    onUpload: (files: File[]) => void | Promise<void>;
    onRemove?: (file: File, index: number) => void;
    value?: File[];
    defaultValue?: File[];
    onChange?: (files: File[]) => void;
    multiple?: boolean;
    maxFiles?: number;
    accept?: string;
    maxSize?: number;
    disabled?: boolean;
    loading?: boolean;
    dragAndDrop?: boolean;
    preview?: boolean;
    label?: React.ReactNode;
    errorMessage?: string;
    showFileList?: boolean;
    size?: VariantProps<typeof fieldSurfaceVariants>["size"];
    variant?: VariantProps<typeof fieldSurfaceVariants>["variant"];
    className?: string;
    children?: React.ReactNode;
}
declare function Upload({ onUpload, onRemove, value, defaultValue, onChange, multiple, maxFiles, accept, maxSize, disabled, loading, dragAndDrop, preview, label, errorMessage, showFileList, size, variant, className, children, ...rest }: UploadProps): react_jsx_runtime.JSX.Element;
declare namespace Upload {
    var displayName: string;
}

interface InlineEditProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onChange" | "defaultValue"> {
    value?: string;
    defaultValue?: string;
    onSave?: (value: string) => void;
    onCancel?: () => void;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    validate?: boolean | ((value: string) => string | undefined);
    editTrigger?: "click" | "doubleClick";
    saveOnBlur?: boolean;
    saveOnEnter?: boolean;
    className?: string;
}
declare function InlineEdit({ value, defaultValue, onSave, onCancel, placeholder, disabled, required, validate, editTrigger, saveOnBlur, saveOnEnter, className, ...rest }: InlineEditProps): react_jsx_runtime.JSX.Element;
declare namespace InlineEdit {
    var displayName: string;
}

interface SelectOption {
    label: React.ReactNode;
    value: string;
    disabled?: boolean;
    group?: string;
    /** When this option is selected, replaces the field-level `left` adornment (if set). */
    left?: React.ReactNode;
}
interface SelectProps extends Omit<React.ComponentPropsWithoutRef<"select">, "size"> {
    items: SelectOption[];
    /** Leading adornment (same behavior as TextInput `left` — keyword strings resolve via Icon). */
    left?: React.ReactNode;
    placeholder?: string;
    label?: React.ReactNode;
    errorMessage?: string;
    required?: boolean;
    size?: VariantProps<typeof fieldSurfaceVariants>["size"];
    variant?: VariantProps<typeof fieldSurfaceVariants>["variant"];
    className?: string;
    /** @deprecated Native select has no separate popover; kept for API compatibility (no-op). */
    contentClassName?: string;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
}
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;

interface HelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    tone?: "default" | "muted" | "error";
}
declare const HelperText: React.ForwardRefExoticComponent<HelperTextProps & React.RefAttributes<HTMLParagraphElement>>;

interface RadioGroupItem {
    label: React.ReactNode;
    value: string;
    description?: React.ReactNode;
    disabled?: boolean;
}
declare const groupVariants$1: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface RadioGroupProps extends Omit<React.ComponentPropsWithoutRef<"fieldset">, "onChange"> {
    items: RadioGroupItem[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    orientation?: VariantProps<typeof groupVariants$1>["orientation"];
    size?: RadioProps["size"];
    errorMessage?: string;
    /** Group caption; rendered as `<legend>` for fieldset accessibility. */
    heading?: React.ReactNode;
    className?: string;
}
declare const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLFieldSetElement>>;

type FormValues = Record<string, unknown>;
type FormValidateOn$1 = "submit" | "change" | "blur";
type FormFieldRenderProps = {
    id: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    errorMessage?: string;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
};
type FormContextValue = {
    values: FormValues;
    errors: Record<string, string | undefined>;
    touched: Record<string, boolean>;
    submitted: boolean;
    setValue: (name: string, value: unknown) => void;
    setError: (name: string, error?: string) => void;
    setTouched: (name: string, touched: boolean) => void;
    validateOn: FormValidateOn$1;
    disabled?: boolean;
    loading?: boolean;
};
declare function useFormContext(): FormContextValue | null;

type FormValidateFn = (values: FormValues) => Record<string, string | undefined> | void;
type FormValidateOn = "submit" | "change" | "blur";
type FormLayout = "vertical" | "horizontal" | "grid";
interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit" | "onChange"> {
    onSubmit: (values: FormValues) => void | Promise<void>;
    onCancel?: () => void;
    initialValues?: FormValues;
    values?: FormValues;
    onValuesChange?: (values: FormValues) => void;
    validate?: FormValidateFn;
    errors?: Record<string, string | undefined>;
    validateOn?: FormValidateOn;
    /** Controlled submitted flag — errors show after submit when validateOn is "submit". */
    submitted?: boolean;
    onSubmittedChange?: (submitted: boolean) => void;
    /** Auto-clear submitted state after N ms (e.g. reset error display). */
    resetSubmittedAfterMs?: number;
    layout?: FormLayout;
    columns?: 1 | 2 | 3 | 4;
    submitLabel?: string;
    cancelLabel?: string;
    footer?: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
    submitButtonProps?: Partial<ButtonProps>;
    cancelButtonProps?: Partial<ButtonProps>;
    children?: React.ReactNode;
    className?: string;
}
declare function Form({ onSubmit, onCancel, initialValues, values: valuesProp, onValuesChange, validate, errors: errorsProp, validateOn, submitted: submittedProp, onSubmittedChange, resetSubmittedAfterMs, layout, columns, submitLabel, cancelLabel, footer, disabled, loading, submitButtonProps, cancelButtonProps, children, className, ...props }: FormProps): react_jsx_runtime.JSX.Element;
declare namespace Form {
    var displayName: string;
}

type FormFieldType = "text" | "email" | "password" | "number" | "url" | "search" | "textarea";
interface FormFieldProps {
    name: string;
    type?: FormFieldType;
    label?: React.ReactNode;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    validate?: boolean | ((value: string) => string | undefined);
    errorMessage?: string;
    touched?: boolean;
    showError?: boolean;
    render?: (props: FormFieldRenderProps) => React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    inputProps?: Partial<TextInputProps>;
    labelProps?: Record<string, unknown>;
    helperTextProps?: Record<string, unknown>;
}
declare function FormField({ name, type, label, placeholder, required, disabled, value: valueProp, defaultValue, onChange: onChangeProp, validate, errorMessage, touched: touchedProp, showError, render, children, className, inputProps, }: FormFieldProps): react_jsx_runtime.JSX.Element;
declare namespace FormField {
    var displayName: string;
}

interface InputGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    children: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
    invalid?: boolean;
    orientation?: "horizontal" | "vertical";
    /** Merge outer border and radii across direct controls (horizontal only). */
    attached?: boolean;
    size?: VariantProps<typeof fieldSurfaceVariants>["size"];
    variant?: VariantProps<typeof fieldSurfaceVariants>["variant"];
    /** Leading icon/slot rendered inside `InputGroupInput` (pill shell when set, attached horizontal). */
    left?: React.ReactNode;
    /** Default `placeholder` for nested `InputGroupInput` when the input omits one. */
    placeholder?: string;
    className?: string;
}
declare function InputGroup({ children, disabled, loading, invalid, orientation, attached, size, variant, left, placeholder, className, ...props }: InputGroupProps): react_jsx_runtime.JSX.Element;
declare namespace InputGroup {
    var displayName: string;
}
interface InputGroupInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof fieldSurfaceVariants> {
}
declare const InputGroupInput: React.ForwardRefExoticComponent<InputGroupInputProps & React.RefAttributes<HTMLInputElement>>;
interface InputGroupAddonProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
}
declare function InputGroupAddon({ className, children, ...props }: InputGroupAddonProps): react_jsx_runtime.JSX.Element;
declare namespace InputGroupAddon {
    var displayName: string;
}
type InputGroupButtonProps = ButtonProps;
/** Outline-style trigger sized for horizontal attached groups. */
declare const InputGroupButton: React.ForwardRefExoticComponent<{
    defaultChecked?: boolean | undefined | undefined;
    defaultValue?: string | number | readonly string[] | undefined;
    suppressContentEditableWarning?: boolean | undefined | undefined;
    suppressHydrationWarning?: boolean | undefined | undefined;
    accessKey?: string | undefined | undefined;
    autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters" | undefined | (string & {}) | undefined;
    autoFocus?: boolean | undefined | undefined;
    className?: string | undefined | undefined;
    contentEditable?: (boolean | "true" | "false") | "inherit" | "plaintext-only" | undefined;
    contextMenu?: string | undefined | undefined;
    dir?: string | undefined | undefined;
    draggable?: (boolean | "true" | "false") | undefined;
    enterKeyHint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send" | undefined | undefined;
    hidden?: boolean | undefined | undefined;
    id?: string | undefined | undefined;
    lang?: string | undefined | undefined;
    nonce?: string | undefined | undefined;
    slot?: string | undefined | undefined;
    spellCheck?: (boolean | "true" | "false") | undefined;
    style?: React.CSSProperties | undefined;
    tabIndex?: number | undefined | undefined;
    title?: string | undefined | undefined;
    translate?: "yes" | "no" | undefined | undefined;
    radioGroup?: string | undefined | undefined;
    role?: React.AriaRole | undefined;
    about?: string | undefined | undefined;
    content?: string | undefined | undefined;
    datatype?: string | undefined | undefined;
    inlist?: any;
    prefix?: string | undefined | undefined;
    property?: string | undefined | undefined;
    rel?: string | undefined | undefined;
    resource?: string | undefined | undefined;
    rev?: string | undefined | undefined;
    typeof?: string | undefined | undefined;
    vocab?: string | undefined | undefined;
    autoCorrect?: string | undefined | undefined;
    autoSave?: string | undefined | undefined;
    color?: string | undefined | undefined;
    itemProp?: string | undefined | undefined;
    itemScope?: boolean | undefined | undefined;
    itemType?: string | undefined | undefined;
    itemID?: string | undefined | undefined;
    itemRef?: string | undefined | undefined;
    results?: number | undefined | undefined;
    security?: string | undefined | undefined;
    unselectable?: "on" | "off" | undefined | undefined;
    inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined | undefined;
    is?: string | undefined | undefined;
    exportparts?: string | undefined | undefined;
    part?: string | undefined | undefined;
    "aria-activedescendant"?: string | undefined | undefined;
    "aria-atomic"?: (boolean | "true" | "false") | undefined;
    "aria-autocomplete"?: "none" | "inline" | "list" | "both" | undefined | undefined;
    "aria-braillelabel"?: string | undefined | undefined;
    "aria-brailleroledescription"?: string | undefined | undefined;
    "aria-busy"?: (boolean | "true" | "false") | undefined;
    "aria-checked"?: boolean | "false" | "mixed" | "true" | undefined | undefined;
    "aria-colcount"?: number | undefined | undefined;
    "aria-colindex"?: number | undefined | undefined;
    "aria-colindextext"?: string | undefined | undefined;
    "aria-colspan"?: number | undefined | undefined;
    "aria-controls"?: string | undefined | undefined;
    "aria-current"?: boolean | "false" | "true" | "page" | "step" | "location" | "date" | "time" | undefined | undefined;
    "aria-describedby"?: string | undefined | undefined;
    "aria-description"?: string | undefined | undefined;
    "aria-details"?: string | undefined | undefined;
    "aria-disabled"?: (boolean | "true" | "false") | undefined;
    "aria-dropeffect"?: "none" | "copy" | "execute" | "link" | "move" | "popup" | undefined | undefined;
    "aria-errormessage"?: string | undefined | undefined;
    "aria-expanded"?: (boolean | "true" | "false") | undefined;
    "aria-flowto"?: string | undefined | undefined;
    "aria-grabbed"?: (boolean | "true" | "false") | undefined;
    "aria-haspopup"?: boolean | "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog" | undefined | undefined;
    "aria-hidden"?: (boolean | "true" | "false") | undefined;
    "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling" | undefined | undefined;
    "aria-keyshortcuts"?: string | undefined | undefined;
    "aria-label"?: string | undefined | undefined;
    "aria-labelledby"?: string | undefined | undefined;
    "aria-level"?: number | undefined | undefined;
    "aria-live"?: "off" | "assertive" | "polite" | undefined | undefined;
    "aria-modal"?: (boolean | "true" | "false") | undefined;
    "aria-multiline"?: (boolean | "true" | "false") | undefined;
    "aria-multiselectable"?: (boolean | "true" | "false") | undefined;
    "aria-orientation"?: "horizontal" | "vertical" | undefined | undefined;
    "aria-owns"?: string | undefined | undefined;
    "aria-placeholder"?: string | undefined | undefined;
    "aria-posinset"?: number | undefined | undefined;
    "aria-pressed"?: boolean | "false" | "mixed" | "true" | undefined | undefined;
    "aria-readonly"?: (boolean | "true" | "false") | undefined;
    "aria-relevant"?: "additions" | "additions removals" | "additions text" | "all" | "removals" | "removals additions" | "removals text" | "text" | "text additions" | "text removals" | undefined | undefined;
    "aria-required"?: (boolean | "true" | "false") | undefined;
    "aria-roledescription"?: string | undefined | undefined;
    "aria-rowcount"?: number | undefined | undefined;
    "aria-rowindex"?: number | undefined | undefined;
    "aria-rowindextext"?: string | undefined | undefined;
    "aria-rowspan"?: number | undefined | undefined;
    "aria-selected"?: (boolean | "true" | "false") | undefined;
    "aria-setsize"?: number | undefined | undefined;
    "aria-sort"?: "none" | "ascending" | "descending" | "other" | undefined | undefined;
    "aria-valuemax"?: number | undefined | undefined;
    "aria-valuemin"?: number | undefined | undefined;
    "aria-valuenow"?: number | undefined | undefined;
    "aria-valuetext"?: string | undefined | undefined;
    dangerouslySetInnerHTML?: {
        __html: string | TrustedHTML;
    } | undefined | undefined;
    onCopy?: React.ClipboardEventHandler<HTMLButtonElement> | undefined;
    onCopyCapture?: React.ClipboardEventHandler<HTMLButtonElement> | undefined;
    onCut?: React.ClipboardEventHandler<HTMLButtonElement> | undefined;
    onCutCapture?: React.ClipboardEventHandler<HTMLButtonElement> | undefined;
    onPaste?: React.ClipboardEventHandler<HTMLButtonElement> | undefined;
    onPasteCapture?: React.ClipboardEventHandler<HTMLButtonElement> | undefined;
    onCompositionEnd?: React.CompositionEventHandler<HTMLButtonElement> | undefined;
    onCompositionEndCapture?: React.CompositionEventHandler<HTMLButtonElement> | undefined;
    onCompositionStart?: React.CompositionEventHandler<HTMLButtonElement> | undefined;
    onCompositionStartCapture?: React.CompositionEventHandler<HTMLButtonElement> | undefined;
    onCompositionUpdate?: React.CompositionEventHandler<HTMLButtonElement> | undefined;
    onCompositionUpdateCapture?: React.CompositionEventHandler<HTMLButtonElement> | undefined;
    onFocus?: React.FocusEventHandler<HTMLButtonElement> | undefined;
    onFocusCapture?: React.FocusEventHandler<HTMLButtonElement> | undefined;
    onBlur?: React.FocusEventHandler<HTMLButtonElement> | undefined;
    onBlurCapture?: React.FocusEventHandler<HTMLButtonElement> | undefined;
    onChange?: React.FormEventHandler<HTMLButtonElement> | undefined;
    onChangeCapture?: React.FormEventHandler<HTMLButtonElement> | undefined;
    onBeforeInput?: React.InputEventHandler<HTMLButtonElement> | undefined;
    onBeforeInputCapture?: React.FormEventHandler<HTMLButtonElement> | undefined;
    onInput?: React.FormEventHandler<HTMLButtonElement> | undefined;
    onInputCapture?: React.FormEventHandler<HTMLButtonElement> | undefined;
    onReset?: React.FormEventHandler<HTMLButtonElement> | undefined;
    onResetCapture?: React.FormEventHandler<HTMLButtonElement> | undefined;
    onSubmit?: React.FormEventHandler<HTMLButtonElement> | undefined;
    onSubmitCapture?: React.FormEventHandler<HTMLButtonElement> | undefined;
    onInvalid?: React.FormEventHandler<HTMLButtonElement> | undefined;
    onInvalidCapture?: React.FormEventHandler<HTMLButtonElement> | undefined;
    onLoad?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onLoadCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onError?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onErrorCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement> | undefined;
    onKeyDownCapture?: React.KeyboardEventHandler<HTMLButtonElement> | undefined;
    onKeyPress?: React.KeyboardEventHandler<HTMLButtonElement> | undefined;
    onKeyPressCapture?: React.KeyboardEventHandler<HTMLButtonElement> | undefined;
    onKeyUp?: React.KeyboardEventHandler<HTMLButtonElement> | undefined;
    onKeyUpCapture?: React.KeyboardEventHandler<HTMLButtonElement> | undefined;
    onAbort?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onAbortCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onCanPlay?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onCanPlayCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onCanPlayThrough?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onCanPlayThroughCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onDurationChange?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onDurationChangeCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onEmptied?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onEmptiedCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onEncrypted?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onEncryptedCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onEnded?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onEndedCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onLoadedData?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onLoadedDataCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onLoadedMetadata?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onLoadedMetadataCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onLoadStart?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onLoadStartCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onPause?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onPauseCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onPlay?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onPlayCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onPlaying?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onPlayingCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onProgress?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onProgressCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onRateChange?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onRateChangeCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onSeeked?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onSeekedCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onSeeking?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onSeekingCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onStalled?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onStalledCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onSuspend?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onSuspendCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onTimeUpdate?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onTimeUpdateCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onVolumeChange?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onVolumeChangeCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onWaiting?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onWaitingCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onAuxClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onAuxClickCapture?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onClickCapture?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onContextMenu?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onContextMenuCapture?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onDoubleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onDoubleClickCapture?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onDrag?: React.DragEventHandler<HTMLButtonElement> | undefined;
    onDragCapture?: React.DragEventHandler<HTMLButtonElement> | undefined;
    onDragEnd?: React.DragEventHandler<HTMLButtonElement> | undefined;
    onDragEndCapture?: React.DragEventHandler<HTMLButtonElement> | undefined;
    onDragEnter?: React.DragEventHandler<HTMLButtonElement> | undefined;
    onDragEnterCapture?: React.DragEventHandler<HTMLButtonElement> | undefined;
    onDragExit?: React.DragEventHandler<HTMLButtonElement> | undefined;
    onDragExitCapture?: React.DragEventHandler<HTMLButtonElement> | undefined;
    onDragLeave?: React.DragEventHandler<HTMLButtonElement> | undefined;
    onDragLeaveCapture?: React.DragEventHandler<HTMLButtonElement> | undefined;
    onDragOver?: React.DragEventHandler<HTMLButtonElement> | undefined;
    onDragOverCapture?: React.DragEventHandler<HTMLButtonElement> | undefined;
    onDragStart?: React.DragEventHandler<HTMLButtonElement> | undefined;
    onDragStartCapture?: React.DragEventHandler<HTMLButtonElement> | undefined;
    onDrop?: React.DragEventHandler<HTMLButtonElement> | undefined;
    onDropCapture?: React.DragEventHandler<HTMLButtonElement> | undefined;
    onMouseDown?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onMouseDownCapture?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onMouseLeave?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onMouseMove?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onMouseMoveCapture?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onMouseOut?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onMouseOutCapture?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onMouseOver?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onMouseOverCapture?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onMouseUp?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onMouseUpCapture?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onSelect?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onSelectCapture?: React.ReactEventHandler<HTMLButtonElement> | undefined;
    onTouchCancel?: React.TouchEventHandler<HTMLButtonElement> | undefined;
    onTouchCancelCapture?: React.TouchEventHandler<HTMLButtonElement> | undefined;
    onTouchEnd?: React.TouchEventHandler<HTMLButtonElement> | undefined;
    onTouchEndCapture?: React.TouchEventHandler<HTMLButtonElement> | undefined;
    onTouchMove?: React.TouchEventHandler<HTMLButtonElement> | undefined;
    onTouchMoveCapture?: React.TouchEventHandler<HTMLButtonElement> | undefined;
    onTouchStart?: React.TouchEventHandler<HTMLButtonElement> | undefined;
    onTouchStartCapture?: React.TouchEventHandler<HTMLButtonElement> | undefined;
    onPointerDown?: React.PointerEventHandler<HTMLButtonElement> | undefined;
    onPointerDownCapture?: React.PointerEventHandler<HTMLButtonElement> | undefined;
    onPointerMove?: React.PointerEventHandler<HTMLButtonElement> | undefined;
    onPointerMoveCapture?: React.PointerEventHandler<HTMLButtonElement> | undefined;
    onPointerUp?: React.PointerEventHandler<HTMLButtonElement> | undefined;
    onPointerUpCapture?: React.PointerEventHandler<HTMLButtonElement> | undefined;
    onPointerCancel?: React.PointerEventHandler<HTMLButtonElement> | undefined;
    onPointerCancelCapture?: React.PointerEventHandler<HTMLButtonElement> | undefined;
    onPointerEnter?: React.PointerEventHandler<HTMLButtonElement> | undefined;
    onPointerLeave?: React.PointerEventHandler<HTMLButtonElement> | undefined;
    onPointerOver?: React.PointerEventHandler<HTMLButtonElement> | undefined;
    onPointerOverCapture?: React.PointerEventHandler<HTMLButtonElement> | undefined;
    onPointerOut?: React.PointerEventHandler<HTMLButtonElement> | undefined;
    onPointerOutCapture?: React.PointerEventHandler<HTMLButtonElement> | undefined;
    onGotPointerCapture?: React.PointerEventHandler<HTMLButtonElement> | undefined;
    onGotPointerCaptureCapture?: React.PointerEventHandler<HTMLButtonElement> | undefined;
    onLostPointerCapture?: React.PointerEventHandler<HTMLButtonElement> | undefined;
    onLostPointerCaptureCapture?: React.PointerEventHandler<HTMLButtonElement> | undefined;
    onScroll?: React.UIEventHandler<HTMLButtonElement> | undefined;
    onScrollCapture?: React.UIEventHandler<HTMLButtonElement> | undefined;
    onWheel?: React.WheelEventHandler<HTMLButtonElement> | undefined;
    onWheelCapture?: React.WheelEventHandler<HTMLButtonElement> | undefined;
    onAnimationStart?: React.AnimationEventHandler<HTMLButtonElement> | undefined;
    onAnimationStartCapture?: React.AnimationEventHandler<HTMLButtonElement> | undefined;
    onAnimationEnd?: React.AnimationEventHandler<HTMLButtonElement> | undefined;
    onAnimationEndCapture?: React.AnimationEventHandler<HTMLButtonElement> | undefined;
    onAnimationIteration?: React.AnimationEventHandler<HTMLButtonElement> | undefined;
    onAnimationIterationCapture?: React.AnimationEventHandler<HTMLButtonElement> | undefined;
    onTransitionEnd?: React.TransitionEventHandler<HTMLButtonElement> | undefined;
    onTransitionEndCapture?: React.TransitionEventHandler<HTMLButtonElement> | undefined;
    form?: string | undefined | undefined;
    disabled?: boolean | undefined | undefined;
    formAction?: string | undefined;
    formEncType?: string | undefined | undefined;
    formMethod?: string | undefined | undefined;
    formNoValidate?: boolean | undefined | undefined;
    formTarget?: string | undefined | undefined;
    name?: string | undefined | undefined;
    value?: string | number | readonly string[] | undefined;
} & {
    variant?: VariantProps<(props?: ({
        variant?: "outline" | "ghost" | "primary" | "secondary" | "destructive" | null | undefined;
        size?: "sm" | "md" | "lg" | null | undefined;
        iconOnly?: boolean | null | undefined;
    } & class_variance_authority_types.ClassProp) | undefined) => string>["variant"];
    size?: VariantProps<(props?: ({
        variant?: "outline" | "ghost" | "primary" | "secondary" | "destructive" | null | undefined;
        size?: "sm" | "md" | "lg" | null | undefined;
        iconOnly?: boolean | null | undefined;
    } & class_variance_authority_types.ClassProp) | undefined) => string>["size"];
    left?: React.ReactNode;
    right?: React.ReactNode;
    iconOnly?: boolean;
    ariaLabel?: string;
    loading?: boolean;
    className?: string;
    children?: React.ReactNode;
    href?: string;
    label?: string;
    type?: "button" | "submit" | "reset";
} & React.RefAttributes<HTMLButtonElement>>;

declare const cardVariants: (props?: ({
    variant?: "transparent" | "surface-1" | "surface-2" | "outlined" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type CardVariant = VariantProps<typeof cardVariants>["variant"];
type CardColor = never;
interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, VariantProps<typeof cardVariants> {
    header?: React.ReactNode;
    footer?: React.ReactNode;
    minHeight?: string | number;
    maxHeight?: string | number;
    children?: React.ReactNode;
}
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;

declare const separatorVariants: (props?: ({
    variant?: "dashed" | "dotted" | "solid" | null | undefined;
    orientation?: "horizontal" | "vertical" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SeparatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, VariantProps<typeof separatorVariants> {
    decorative?: boolean;
}
declare const Separator: React.ForwardRefExoticComponent<SeparatorProps & React.RefAttributes<HTMLDivElement>>;

declare const stackVariants: (props?: ({
    direction?: "row" | "column" | null | undefined;
    gap?: "sm" | "md" | "lg" | "none" | null | undefined;
    align?: "center" | "end" | "baseline" | "start" | "stretch" | null | undefined;
    justify?: "center" | "end" | "start" | "between" | "around" | "evenly" | null | undefined;
    wrap?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type StackRootTag = "div" | "ul" | "ol";
interface StackProps<T = unknown> extends Omit<React.HTMLAttributes<HTMLElement>, "children">, VariantProps<typeof stackVariants> {
    /** Semantic wrapper (`ul` / `ol` for lists). Default `div`. */
    as?: StackRootTag;
    className?: string;
    items: readonly T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    getItemKey?: (item: T, index: number) => React.Key;
}
declare const Stack: (<T>(props: StackProps<T> & React.RefAttributes<HTMLElement>) => React.ReactElement | null) & {
    displayName: string;
};

type GridColumnCount$1 = 1 | 2 | 3 | 4 | 6 | 12;
type GridRowCount$1 = 1 | 2 | 3 | 4 | 5 | 6;
declare const gridSpacingVariants: (props?: ({
    gap?: "sm" | "md" | "lg" | "none" | null | undefined;
    columnGap?: "sm" | "md" | "lg" | "none" | null | undefined;
    rowGap?: "sm" | "md" | "lg" | "none" | null | undefined;
    autoFlow?: "default" | "row" | "column" | "dense" | "rowDense" | "colDense" | null | undefined;
    alignItems?: "center" | "end" | "start" | "stretch" | null | undefined;
    justifyItems?: "center" | "end" | "start" | "stretch" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
/**
 * **autoFlow** → CSS `grid-auto-flow`: `default` (no class, browser row); `row` (explicit);
 * `column` (fill columns first); `dense` | `rowDense` | `colDense` (backfill holes).
 */
type GridRootTag = "div" | "ul" | "ol";
interface GridProps<T = unknown> extends Omit<React.HTMLAttributes<HTMLElement>, "children">, VariantProps<typeof gridSpacingVariants> {
    /** Semantic wrapper (`ul` / `ol` for lists). Default `div`. */
    as?: GridRootTag;
    /** Fixed column count; ignored when `minChildWidth` is set. */
    columns?: GridColumnCount$1;
    /** Fixed row count (implicit tracks). */
    rows?: GridRowCount$1;
    /** When set, uses auto-fill columns with this min track width (e.g. `12rem`, `200px`). */
    minChildWidth?: string;
    className?: string;
    items: readonly T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    getItemKey?: (item: T, index: number) => React.Key;
}
declare const Grid: (<T>(props: GridProps<T> & React.RefAttributes<HTMLElement>) => React.ReactElement | null) & {
    displayName: string;
};

/** Display string for a width/height ratio (e.g. 16/9 → `16:9`), same idea as PillGroup `{count}`. */
declare function formatAspectRatioLabel(ratio: number): string;
interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    /** Width ÷ height. Coerced if passed as string from forms. */
    ratio?: number | string;
    minWidth?: number | string;
    maxWidth?: number | string;
}
declare const AspectRatio: React.ForwardRefExoticComponent<AspectRatioProps & React.RefAttributes<HTMLDivElement>>;

declare const ResizablePanelGroup: React.ForwardRefExoticComponent<React.PropsWithoutRef<PanelGroupProps> & React.RefAttributes<ImperativePanelGroupHandle>>;
declare const ResizablePanel: React.ForwardRefExoticComponent<React.PropsWithoutRef<PanelProps> & React.RefAttributes<ImperativePanelHandle>>;
interface ResizableHandleProps extends PanelResizeHandleProps {
    /** Visual grip in the handle track. */
    withHandle?: boolean;
}
declare function ResizableHandle({ className, withHandle, children, ...props }: ResizableHandleProps): react_jsx_runtime.JSX.Element;
declare namespace ResizableHandle {
    var displayName: string;
}

interface CollapsibleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    /** Primary control label or node. */
    trigger: React.ReactNode;
    children: React.ReactNode;
    disabled?: boolean;
    /** Optional footer below the collapsible region. */
    footer?: React.ReactNode;
    /** Top border above revealed content. */
    showContentDivider?: boolean;
    className?: string;
}
declare function Collapsible({ open: controlledOpen, defaultOpen, onOpenChange, trigger, children, disabled, footer, showContentDivider, className, ...props }: CollapsibleProps): react_jsx_runtime.JSX.Element;
declare namespace Collapsible {
    var displayName: string;
}

interface AccordionItem {
    value: string;
    label: React.ReactNode;
    content: React.ReactNode;
    left?: React.ReactNode;
    disabled?: boolean;
    loading?: boolean;
}
interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
    items: AccordionItem[];
    type?: "single" | "multiple";
    /** Selected panel value(s). */
    value?: string | string[];
    defaultValue?: string | string[];
    onChange?: (next: string | string[]) => void;
    className?: string;
}
declare function Accordion({ items, type, value, defaultValue, onChange, className, ...props }: AccordionProps): react_jsx_runtime.JSX.Element;
declare namespace Accordion {
    var displayName: string;
}

interface ResizeContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    direction?: "horizontal" | "vertical" | "both";
    minScale?: number;
    maxScale?: number;
    defaultScale?: number;
    scale?: number;
    onScaleChange?: (scale: number) => void;
    fit?: "contain" | "cover" | "fill";
    showControls?: boolean;
    disabled?: boolean;
    maxWidth?: string | number;
    maxHeight?: string | number;
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
    contentProps?: React.HTMLAttributes<HTMLDivElement>;
    children?: React.ReactNode;
    className?: string;
}
declare function ResizeContainer({ direction: _direction, minScale, maxScale, defaultScale, scale: scaleProp, onScaleChange, fit, showControls, disabled, maxWidth, maxHeight, containerProps, contentProps, children, className, ...rest }: ResizeContainerProps): react_jsx_runtime.JSX.Element;
declare namespace ResizeContainer {
    var displayName: string;
}

interface BreadcrumbItem {
    label: React.ReactNode;
    href?: string;
    /** Marks the current page (renders as Text, not a link). */
    current?: boolean;
}
interface BreadcrumbProps extends Omit<React.ComponentPropsWithoutRef<"nav">, "children"> {
    items: BreadcrumbItem[];
    /** Shown between items; default chevron. */
    separator?: React.ReactNode;
    /** Collapse middle segments when items.length exceeds this (keeps first + last). */
    maxItems?: number;
    className?: string;
}
declare const Breadcrumb: React.ForwardRefExoticComponent<BreadcrumbProps & React.RefAttributes<HTMLElement>>;

declare const sidebarVariants: (props?: ({
    variant?: "default" | "inset" | "floating" | null | undefined;
    side?: "left" | "right" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type SidebarItem = {
    label: React.ReactNode;
    value?: string;
    href?: string;
    left?: React.ReactNode;
    badge?: React.ReactNode;
    disabled?: boolean;
    children?: SidebarItem[];
};
interface SidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "onChange">, VariantProps<typeof sidebarVariants> {
    items: SidebarItem[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    collapsed?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    container?: "screen" | "parent";
    heightMode?: "viewport" | "parent" | "content";
    header?: React.ReactNode;
    footer?: React.ReactNode;
    children?: React.ReactNode;
    width?: string | number;
    collapsedWidth?: string | number;
    toggleButtonProps?: Partial<ButtonProps>;
    itemProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    className?: string;
}
declare function Sidebar({ items, value, defaultValue, onChange, side, variant, collapsible, defaultCollapsed, collapsed: collapsedProp, onCollapsedChange, container, heightMode, header, footer, children, width, collapsedWidth, toggleButtonProps, itemProps, className, ...rest }: SidebarProps): react_jsx_runtime.JSX.Element;
declare namespace Sidebar {
    var displayName: string;
}

type NavMenuItem = {
    label: React.ReactNode;
    value?: string;
    href?: string;
    left?: React.ReactNode;
    description?: React.ReactNode;
    disabled?: boolean;
    children?: NavMenuItem[];
};
interface NavigationMenuProps extends Omit<React.HTMLAttributes<HTMLElement>, "children" | "onChange"> {
    items: NavMenuItem[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    orientation?: "horizontal" | "vertical";
    children?: React.ReactNode;
    className?: string;
}
declare function NavigationMenu({ items, value, defaultValue, onChange, orientation, children, className, ...rest }: NavigationMenuProps): react_jsx_runtime.JSX.Element;
declare namespace NavigationMenu {
    var displayName: string;
}

type MenubarMenu = {
    label: React.ReactNode;
    value?: string;
    items: DropdownItem[];
};
interface MenubarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    menus: MenubarMenu[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    className?: string;
}
declare function Menubar({ menus, value, defaultValue, onChange, className, ...rest }: MenubarProps): react_jsx_runtime.JSX.Element;
declare namespace Menubar {
    var displayName: string;
}

interface ContextMenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    items: DropdownItem[];
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    className?: string;
    contentClassName?: string;
}
declare function ContextMenu({ items, open: openProp, defaultOpen, onOpenChange, children, className, contentClassName, ...rest }: ContextMenuProps): react_jsx_runtime.JSX.Element;
declare namespace ContextMenu {
    var displayName: string;
}

declare const linkVariants: (props?: ({
    variant?: "default" | "muted" | "underline" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children">, VariantProps<typeof linkVariants> {
    href: string;
    className?: string;
    children?: React.ReactNode;
}
declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;

declare const navbarVariants: (props?: ({
    variant?: "default" | "floating" | "bordered" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type NavItem = {
    label: React.ReactNode;
    href?: string;
    left?: React.ReactNode;
    active?: boolean;
    disabled?: boolean;
    children?: NavItem[];
};
interface NavbarProps extends Omit<React.HTMLAttributes<HTMLElement>, "children">, VariantProps<typeof navbarVariants> {
    logo?: React.ReactNode;
    items?: NavItem[];
    left?: React.ReactNode;
    right?: React.ReactNode;
    sticky?: boolean;
    separator?: boolean;
    children?: React.ReactNode;
    /** Passed to top-level nav links (not submenus). */
    linkVariant?: React.ComponentProps<typeof Link>["variant"];
}
declare function Navbar({ logo, items, left, right, sticky, separator, variant, className, children, linkVariant, ...rest }: NavbarProps): react_jsx_runtime.JSX.Element;
declare namespace Navbar {
    var displayName: string;
}

interface PaginationProps extends Omit<React.ComponentPropsWithoutRef<"nav">, "children" | "onChange"> {
    /** Total number of records (not pages). */
    total: number;
    pageSize?: number;
    /** 1-based current page. */
    value?: number;
    defaultValue?: number;
    onChange?: (page: number) => void;
    /** Precomputed page count; if omitted, derived from total / pageSize. */
    pageCount?: number;
    siblingCount?: number;
    showFirstLast?: boolean;
    disabled?: boolean;
    className?: string;
}
declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLElement>>;

type StepStatus = "complete" | "current" | "upcoming" | "error";
interface StepItem {
    label: React.ReactNode;
    description?: React.ReactNode;
    optional?: boolean;
    status?: StepStatus;
}
interface StepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    steps: StepItem[];
    value?: number;
    defaultValue?: number;
    onChange?: (step: number) => void;
    orientation?: "horizontal" | "vertical";
    allowBack?: boolean;
    /**
     * Horizontal layout only: space between equal-width step columns.
     * - `none` — no gutter; columns still share width equally (`flex-1`).
     * - `md` — even gap between columns (`gap-4`).
     */
    horizontalGap?: "none" | "md";
}
declare const Stepper: React.ForwardRefExoticComponent<StepperProps & React.RefAttributes<HTMLDivElement>>;

declare const tabsListVariants: (props?: ({
    variant?: "default" | "underline" | "pill" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface TabItem {
    label: React.ReactNode;
    value: string;
    left?: React.ReactNode;
    badge?: React.ReactNode;
    disabled?: boolean;
    /** Panel body (`ReactNode` only — compose `Icon` or other nodes yourself). */
    content?: React.ReactNode;
}
interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
    items: TabItem[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    orientation?: "horizontal" | "vertical";
    variant?: VariantProps<typeof tabsListVariants>["variant"];
    className?: string;
    listClassName?: string;
}
declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;

declare const feedbackVariantOptions: {
    readonly tone: {
        readonly neutral: "";
        readonly info: "";
        readonly success: "";
        readonly warning: "";
        readonly danger: "";
    };
    readonly variant: {
        readonly solid: "";
        readonly subtle: "bg-muted/40";
        readonly outline: "bg-background";
    };
};
type FeedbackTone = keyof typeof feedbackVariantOptions.tone;
type FeedbackVariant = keyof typeof feedbackVariantOptions.variant;
type FeedbackSurfaceVariantProps = {
    tone?: FeedbackTone;
    variant?: FeedbackVariant;
};

declare const alertVariants: (props?: ({
    readonly tone?: "danger" | "info" | "neutral" | "success" | "warning" | null | undefined;
    readonly variant?: "subtle" | "outline" | "solid" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, FeedbackSurfaceVariantProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    left?: React.ReactNode;
    action?: React.ReactNode;
    dismissible?: boolean;
    /** Called after the alert is dismissed (including via the close control). */
    onClose?: () => void;
    className?: string;
    children?: React.ReactNode;
}
declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;

declare const toastVariants: (props?: ({
    readonly tone?: "danger" | "info" | "neutral" | "success" | "warning" | null | undefined;
    readonly variant?: "subtle" | "outline" | "solid" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ToastTone = NonNullable<FeedbackSurfaceVariantProps["tone"]>;
type ToastVariant = NonNullable<FeedbackSurfaceVariantProps["variant"]>;
type ToastAction = {
    label: string;
    onClick?: () => void;
};
interface ToastProps extends FeedbackSurfaceVariantProps {
    id?: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    duration?: number;
    action?: ToastAction;
    left?: React.ReactNode;
    dismissible?: boolean;
    onClose?: () => void;
    className?: string;
}
declare function Toast({ tone, variant, title, description, action, left, dismissible, onClose, className, }: ToastProps): react_jsx_runtime.JSX.Element;
declare namespace Toast {
    var displayName: string;
}

declare function dismissToast(id: string): void;
declare function toast(input: Omit<ToastProps, "id">): string;
declare function clearToasts(): void;

type ToasterPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
interface ToasterProps {
    position?: ToasterPosition;
    maxVisible?: number;
    className?: string;
}
declare function Toaster({ position, maxVisible, className }: ToasterProps): React.ReactPortal | null;
declare namespace Toaster {
    var displayName: string;
}

type SpinnerSize = "xs" | "sm" | "md" | "lg";
interface SpinnerProps extends Omit<React.SVGProps<SVGSVGElement>, "children"> {
    size?: SpinnerSize;
    className?: string;
    label?: string;
}
declare const Spinner: React.ForwardRefExoticComponent<Omit<SpinnerProps, "ref"> & React.RefAttributes<SVGSVGElement>>;

declare const overlayVariants: (props?: ({
    blur?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
/** Portal mount target for `Overlay`: viewport body, scoped parent from `OverlayPortalScope`, a DOM node, or a ref to one. */
type OverlayPortalContainer = "body" | "parent" | HTMLElement | React.RefObject<HTMLElement | null>;
interface OverlayProps extends VariantProps<typeof overlayVariants> {
    open?: boolean;
    onClose?: () => void;
    /**
     * Portal target. Positioning is `fixed` when the resolved node is `document.body`, otherwise `absolute`.
     */
    container?: OverlayPortalContainer | null;
    /** Renders a corner close control (calls `onClose`). */
    showCloseButton?: boolean;
    /** When false, backdrop clicks do not call `onClose` (close button still works if shown). */
    closeOnBackdropClick?: boolean;
    className?: string;
    children?: React.ReactNode;
}
/**
 * Wrap a region where `Overlay` with `container="parent"` should mount (creates a positioned, isolated stacking context).
 */
declare function OverlayPortalScope({ children, className, }: {
    children: React.ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;
declare function Overlay({ open, onClose, container, blur, showCloseButton, closeOnBackdropClick, className, children, }: OverlayProps): React.ReactPortal | null;
declare namespace Overlay {
    var displayName: string;
}

interface LoadingOverlayProps {
    open: boolean;
    message?: React.ReactNode;
    blur?: boolean;
    className?: string;
    container?: OverlayProps["container"];
    /** Spinner size; defaults scale with typical overlay use. */
    spinnerSize?: React.ComponentProps<typeof Spinner>["size"];
}
declare function LoadingOverlay({ open, message, blur, className, container, spinnerSize, }: LoadingOverlayProps): react_jsx_runtime.JSX.Element;
declare namespace LoadingOverlay {
    var displayName: string;
}

declare const emptyStateVariants: (props?: ({
    variant?: "default" | "error" | "minimal" | "spacious" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface EmptyStateAction {
    label: string;
    onClick?: () => void;
    loading?: boolean;
    disabled?: boolean;
    variant?: React.ComponentProps<typeof Button>["variant"];
}
interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, VariantProps<typeof emptyStateVariants> {
    title?: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    action?: EmptyStateAction;
    className?: string;
}
declare const EmptyState: React.ForwardRefExoticComponent<EmptyStateProps & React.RefAttributes<HTMLDivElement>>;

declare const pageHeaderVariants: (props?: ({
    variant?: "default" | "bordered" | "minimal" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, VariantProps<typeof pageHeaderVariants> {
    heading?: React.ReactNode;
    subheading?: React.ReactNode;
    description?: React.ReactNode;
    badge?: React.ReactNode;
    actions?: React.ReactNode;
    left?: React.ReactNode;
    right?: React.ReactNode;
    sticky?: boolean;
    separator?: boolean;
    className?: string;
    children?: React.ReactNode;
}
declare function PageHeader({ heading, subheading, description, badge, actions, left, right, sticky, separator, variant, className, children, ...props }: PageHeaderProps): react_jsx_runtime.JSX.Element;
declare namespace PageHeader {
    var displayName: string;
}

declare const pageFooterVariants: (props?: ({
    variant?: "default" | "minimal" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface PageFooterProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof pageFooterVariants> {
    left?: React.ReactNode;
    right?: React.ReactNode;
    sticky?: boolean;
    separator?: boolean;
    children?: React.ReactNode;
    className?: string;
}
declare function PageFooter({ left, right, sticky, separator, variant, className, children, ...props }: PageFooterProps): react_jsx_runtime.JSX.Element;
declare namespace PageFooter {
    var displayName: string;
}

declare const heroVariants: (props?: ({
    variant?: "default" | "split" | "centered" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type HeroActions = {
    primary?: ButtonProps;
    secondary?: ButtonProps;
};
interface HeroProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">, VariantProps<typeof heroVariants> {
    title?: React.ReactNode;
    description?: React.ReactNode;
    image?: string;
    badge?: React.ReactNode;
    actions?: HeroActions;
    children?: React.ReactNode;
    className?: string;
}
declare function Hero({ title, description, image, badge, actions, variant, className, children, ...props }: HeroProps): react_jsx_runtime.JSX.Element;
declare namespace Hero {
    var displayName: string;
}

interface AuthLayoutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    logo?: React.ReactNode;
    footer?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}
declare function AuthLayout({ title, subtitle, logo, footer, children, className, ...props }: AuthLayoutProps): react_jsx_runtime.JSX.Element;
declare namespace AuthLayout {
    var displayName: string;
}

interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
    sidebar?: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}
declare function AppShell({ sidebar, header, footer, children, className, ...props }: AppShellProps): react_jsx_runtime.JSX.Element;
declare namespace AppShell {
    var displayName: string;
}

interface HistoryControlButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
    canUndo?: boolean;
    canRedo?: boolean;
    canReset?: boolean;
    onUndo?: () => void;
    onRedo?: () => void;
    onReset?: () => void;
    /** When false, hides the undo control (e.g. reset-only toolbar). Default true. */
    showUndo?: boolean;
    /** When false, hides the redo control. Default true. */
    showRedo?: boolean;
    showLabels?: boolean;
    undoButtonProps?: Partial<ButtonProps>;
    redoButtonProps?: Partial<ButtonProps>;
    resetButtonProps?: Partial<ButtonProps>;
    className?: string;
}
declare function HistoryControlButtons({ canUndo, canRedo, canReset, onUndo, onRedo, onReset, showUndo, showRedo, showLabels, undoButtonProps, redoButtonProps, resetButtonProps, className, ...rest }: HistoryControlButtonsProps): react_jsx_runtime.JSX.Element;
declare namespace HistoryControlButtons {
    var displayName: string;
}

declare const positionVariants: (props?: ({
    position?: "top-right" | "bottom-right" | "bottom-left" | "top-left" | "left-center" | "right-center" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const slideVariants: (props?: ({
    slideFrom?: "left" | "right" | "top" | "bottom" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type FixedScreenWidgetPosition = NonNullable<VariantProps<typeof positionVariants>["position"]>;
type FixedScreenWidgetSlideFrom = NonNullable<VariantProps<typeof slideVariants>["slideFrom"]>;
interface FixedScreenWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    position?: FixedScreenWidgetPosition;
    slideFrom?: FixedScreenWidgetSlideFrom;
    trigger?: React.ReactNode;
    triggerProps?: Partial<ButtonProps>;
    panelProps?: Partial<CardProps>;
    offsetX?: number;
    offsetY?: number;
    pointerEvents?: "none" | "auto";
    closeOnOutsideClick?: boolean;
    closeOnEscape?: boolean;
    children?: React.ReactNode;
    className?: string;
}
declare function FixedScreenWidget({ open: openProp, defaultOpen, onOpenChange, position, slideFrom, trigger, triggerProps, panelProps, offsetX, offsetY, pointerEvents, closeOnOutsideClick, closeOnEscape, children, className, ...rest }: FixedScreenWidgetProps): react_jsx_runtime.JSX.Element;
declare namespace FixedScreenWidget {
    var displayName: string;
}

declare const modalSurfaceVariants: (props?: ({
    size?: "sm" | "md" | "lg" | "xl" | "full" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type ModalSize = NonNullable<VariantProps<typeof modalSurfaceVariants>["size"]>;
type ModalTriggerProps = {
    label?: string;
    left?: React.ReactNode;
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
    className?: string;
};
interface ModalProps extends VariantProps<typeof modalSurfaceVariants> {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    onClose?: () => void;
    triggerProps?: ModalTriggerProps;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    showClose?: boolean;
    loading?: boolean;
    minHeight?: string | number;
    maxHeight?: string | number;
    className?: string;
    cardProps?: Omit<CardProps, "header" | "footer" | "children" | "minHeight" | "maxHeight">;
    /** Portal target for the backdrop — use `parent` inside `OverlayPortalScope` for scoped previews. */
    container?: OverlayPortalContainer;
    children?: React.ReactNode;
}
declare const Modal: React.ForwardRefExoticComponent<ModalProps & React.RefAttributes<HTMLDivElement>>;

type TriggerModalProps = ModalProps & {
    triggerProps?: ModalTriggerProps;
};
/** Modal with an optional trigger button — base for ConfirmModal and FormModal. */
declare function TriggerModal({ triggerProps, showClose, ...modalProps }: TriggerModalProps): react_jsx_runtime.JSX.Element;
declare namespace TriggerModal {
    var displayName: string;
}

type ConfirmModalIntent = "default" | "destructive" | "delete" | "save" | "warning";
type ConfirmModalConfirmProps = {
    label: string;
    onClick?: () => void;
    loading?: boolean;
};
type ConfirmModalCancelProps = {
    label: string;
    onClick?: () => void;
};
interface ConfirmModalProps extends Omit<TriggerModalProps, "header" | "footer" | "children" | "triggerProps"> {
    triggerProps?: ModalTriggerProps;
    heading: React.ReactNode;
    description?: React.ReactNode;
    left?: React.ReactNode;
    intent?: ConfirmModalIntent;
    confirmProps: ConfirmModalConfirmProps;
    cancelProps?: ConfirmModalCancelProps;
    loading?: boolean;
    container?: OverlayPortalContainer;
    triggerModalProps?: Partial<TriggerModalProps>;
    className?: string;
}
declare function ConfirmModal({ open: openProp, defaultOpen, onOpenChange, triggerProps, heading, description, left, intent, confirmProps, cancelProps, loading, container, triggerModalProps, className, size, ...rest }: ConfirmModalProps): react_jsx_runtime.JSX.Element;
declare namespace ConfirmModal {
    var displayName: string;
}

type FormModalMode = "create" | "edit";
type FormFieldSchema = {
    name: string;
    type?: FormFieldType;
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    validate?: boolean | ((value: string) => string | undefined);
    errorMessage?: string;
};
interface FormModalProps extends Omit<TriggerModalProps, "header" | "footer" | "children" | "triggerProps"> {
    triggerProps?: ModalTriggerProps;
    heading: React.ReactNode;
    subheading?: React.ReactNode;
    left?: React.ReactNode;
    mode?: FormModalMode;
    fields?: FormFieldSchema[];
    formProps?: Omit<FormProps, "children" | "onSubmit" | "onCancel" | "footer">;
    onSubmit: (values: Record<string, unknown>) => void | Promise<void>;
    onSubmitSuccess?: (values: Record<string, unknown>) => void;
    onSubmitError?: (error: unknown) => void;
    submitLabel?: string;
    submittingLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
    submitDisabled?: boolean;
    onCancel?: () => void;
    validateOnSubmit?: boolean;
    container?: OverlayPortalContainer;
    submitButtonProps?: Partial<ButtonProps>;
    cancelButtonProps?: Partial<ButtonProps>;
    triggerModalProps?: Partial<TriggerModalProps>;
    className?: string;
    children?: React.ReactNode;
}
declare function FormModal({ open: openProp, defaultOpen, onOpenChange, triggerProps, heading, subheading, left, mode, fields, formProps, onSubmit, onSubmitSuccess, onSubmitError, submitLabel, submittingLabel, cancelLabel, loading, submitDisabled, onCancel, validateOnSubmit, container, submitButtonProps, cancelButtonProps, triggerModalProps, className, children, size, ...rest }: FormModalProps): react_jsx_runtime.JSX.Element;
declare namespace FormModal {
    var displayName: string;
}

declare const textVariants: (props?: ({
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "base" | "2xs" | "2xl" | null | undefined;
    variant?: "default" | "muted" | "code" | "subtle" | "danger" | "outline" | null | undefined;
    weight?: "bold" | "normal" | "medium" | "semibold" | "extrabold" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, "children">, Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "type">, VariantProps<typeof textVariants> {
    as?: "span" | "div" | "p" | "label" | "button";
    left?: React.ReactNode;
    right?: React.ReactNode;
    truncate?: boolean;
    lineClamp?: number;
    className?: string;
    children?: React.ReactNode;
}
declare const Text: React.ForwardRefExoticComponent<TextProps & React.RefAttributes<HTMLElement>>;

declare const skeletonVariants: (props?: ({
    variant?: "button" | "checkbox" | "radio" | "input" | "text" | "avatar" | "badge" | "card" | "tableCell" | "tableRow" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {
    width?: string | number;
    height?: string | number;
    count?: number;
    className?: string;
    children?: React.ReactNode;
}
declare const Skeleton: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>;
interface TableSkeletonProps {
    columns: number;
    rows?: number;
    selectable?: boolean;
    size?: "sm" | "md" | "lg";
    /** Optional per-column widths (px, rem, %, etc.). */
    columnWidths?: Array<string | number | undefined>;
    className?: string;
}
/** Column-aware table placeholder — matches Table cell rhythm. */
declare function TableSkeleton({ columns, rows, selectable, size, columnWidths, className, }: TableSkeletonProps): react_jsx_runtime.JSX.Element;
declare namespace TableSkeleton {
    var displayName: string;
}

declare const pillSurfaceVariants: (props?: ({
    appearance?: "subtle" | "outline" | "ghost" | "solid" | null | undefined;
    size?: "sm" | "md" | null | undefined;
    tone?: "danger" | "info" | "neutral" | "success" | "warning" | null | undefined;
    shape?: "rounded" | "pill" | null | undefined;
    selected?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
/** Button-like chip surfaces (same palette as the old action Toggle). */
declare const toggleSurfaceVariants: (props?: ({
    toggleSurface?: "outline" | "ghost" | "primary" | "secondary" | null | undefined;
    size?: "sm" | "md" | null | undefined;
    shape?: "rounded" | "pill" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface PillProps extends Omit<React.HTMLAttributes<HTMLElement>, "children">, VariantProps<typeof pillSurfaceVariants> {
    as?: "span" | "button";
    /**
     * Typography (`Text` `variant`). Separate from `appearance`: shell uses solid/subtle/outline/ghost;
     * text uses default/muted/subtle/code/danger/outline.
     */
    variant?: VariantProps<typeof textVariants>["variant"];
    left?: React.ReactNode;
    right?: React.ReactNode;
    /** Renders a dismiss control (e.g. filter chips). */
    onRemove?: () => void;
    dot?: boolean;
    selected?: boolean;
    disabled?: boolean;
    /** Button-style surface (`primary` / `secondary` / `outline` / `ghost`); when set, overrides `appearance` + `tone` coloring. `""` ignored (e.g. props panel). */
    toggleSurface?: VariantProps<typeof toggleSurfaceVariants>["toggleSurface"] | "";
    /** Shows a spinner and disables interaction. */
    loading?: boolean;
    children?: React.ReactNode;
}
declare const Pill: React.ForwardRefExoticComponent<PillProps & React.RefAttributes<HTMLElement>>;
/** @deprecated Use `Pill`; kept for compatibility. */
declare const Badge: React.ForwardRefExoticComponent<PillProps & React.RefAttributes<HTMLElement>>;
type TagSurfaceVariant = "solid" | "subtle" | "outline";
interface TagProps extends Omit<PillProps, "children" | "appearance" | "as" | "right" | "variant"> {
    label: React.ReactNode;
    /** Maps to Pill `appearance` (solid / subtle / outline). */
    variant?: TagSurfaceVariant;
}
/** @deprecated Prefer `<Pill onRemove={…}>` or plain `Pill` with `children`. */
declare const Tag: React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLElement>>;

type BadgeProps = PillProps;

declare const avatarVariants: (props?: ({
    size?: "xs" | "sm" | "md" | "lg" | "xl" | null | undefined;
    shape?: "circle" | "square" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type Status = "online" | "offline" | "away" | "busy";
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
    src?: string;
    alt?: string;
    name?: string;
    /** Fallback background — semantic token name or any CSS color. */
    color?: string;
    fallback?: React.ReactNode;
    status?: Status;
}
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>>;

interface AvatarGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    items: Omit<AvatarProps, "size">[];
    max?: number;
    size?: AvatarProps["size"];
}
declare function AvatarGroup({ items, max, size, className, ...rest }: AvatarGroupProps): react_jsx_runtime.JSX.Element;
declare namespace AvatarGroup {
    var displayName: string;
}

declare const progressVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ProgressProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof progressVariants> {
    /** Omit or pass `null` for unknown progress (same as `loading`). */
    value?: number | null;
    max?: number;
    showLabel?: boolean;
    /** Unknown completion (e.g. waiting on server). Same as `value={null}`. */
    loading?: boolean;
}
declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;

declare const kbdVariants: (props?: ({
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface KbdProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof kbdVariants> {
}
declare const Kbd: React.ForwardRefExoticComponent<KbdProps & React.RefAttributes<HTMLElement>>;
interface KbdGroupProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const KbdGroup: React.ForwardRefExoticComponent<KbdGroupProps & React.RefAttributes<HTMLDivElement>>;

declare const imageVariants: (props?: ({
    variant?: "default" | "circle" | "square" | "rounded" | null | undefined;
    fit?: "fill" | "none" | "contain" | "cover" | "scale-down" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "placeholder">, VariantProps<typeof imageVariants> {
    fallback?: React.ReactNode;
    placeholder?: "blur" | "skeleton" | "none";
    loadingStrategy?: "lazy" | "eager";
    position?: string;
    /**
     * When true, shows a control to enter/exit native fullscreen on the image (wrapper element).
     */
    allowFullscreen?: boolean;
}
declare const Image: React.ForwardRefExoticComponent<ImageProps & React.RefAttributes<HTMLImageElement>>;

type PillTone = "neutral" | "info" | "success" | "warning" | "danger";
interface PillItem {
    label: React.ReactNode;
    value: string;
    tone?: PillTone;
    disabled?: boolean;
    left?: React.ReactNode;
    selected?: boolean;
    dot?: boolean;
    loading?: boolean;
}
declare const groupVariants: (props?: ({
    gap?: "sm" | "md" | "lg" | null | undefined;
    wrap?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface PillGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onSelect">, VariantProps<typeof groupVariants> {
    items: PillItem[];
    value?: string[];
    defaultValue?: string[];
    onChange?: (next: string[]) => void;
    selectable?: boolean;
    onSelect?: (item: PillItem, selected: boolean) => void;
    multiple?: boolean;
    removable?: boolean;
    onRemove?: (value: string) => void;
    maxVisible?: number;
    overflowLabel?: string;
    children?: React.ReactNode;
    size?: PillProps["size"];
    /** Maps to Pill `appearance` (solid / subtle / outline / ghost). Ignored when `toggleSurface` is set. */
    variant?: PillProps["appearance"];
    /** Button-style surface for every pill (`primary` / `secondary` / `outline` / `ghost`). */
    toggleSurface?: PillProps["toggleSurface"];
    /** Disables all pills and shows a trailing spinner. */
    loading?: boolean;
}
declare function PillGroup({ items, value, defaultValue, onChange, selectable, onSelect, multiple, removable, onRemove, maxVisible, overflowLabel, children, size, variant, toggleSurface, loading: groupLoading, gap, wrap, className, ...props }: PillGroupProps): react_jsx_runtime.JSX.Element;
declare namespace PillGroup {
    var displayName: string;
}

interface DescriptionItem {
    label: React.ReactNode;
    value: React.ReactNode;
}
declare const descriptionListVariants: (props?: ({
    layout?: "horizontal" | "vertical" | null | undefined;
    size?: "sm" | "md" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface DescriptionListProps extends Omit<React.HTMLAttributes<HTMLDListElement>, "children">, VariantProps<typeof descriptionListVariants> {
    items: readonly DescriptionItem[];
}
declare const DescriptionList: React.ForwardRefExoticComponent<DescriptionListProps & React.RefAttributes<HTMLDListElement>>;

interface ListItem {
    label: React.ReactNode;
    value?: string;
    left?: React.ReactNode;
    description?: React.ReactNode;
    action?: React.ReactNode;
    disabled?: boolean;
    selected?: boolean;
}
type ListLayout = "list" | "grid";
/** Default filter: case-insensitive match on `label`, `description`, and `value`. */
declare function defaultListItemFilter(items: readonly ListItem[], query: string): ListItem[];
type ListSearchConfig = Omit<Partial<SearchInputProps>, "value" | "defaultValue" | "onChange" | "onSearch" | "onClear"> & {
    /** Replace built-in label/description/value matching. */
    filter?: (items: readonly ListItem[], query: string) => readonly ListItem[];
    defaultQuery?: string;
    /** Controlled query (pairs with `onChange`). */
    value?: string;
    onChange?: (value: string) => void;
    /** Fired when debounced query updates (after `onSearch`). */
    onDebouncedChange?: (query: string) => void;
    /** When false, search UI does not filter list items (e.g. filters external data). Default true. */
    filterItems?: boolean;
};
type StackGap = NonNullable<VariantProps<typeof stackVariants>["gap"]>;
type GridGap = NonNullable<VariantProps<typeof gridSpacingVariants>["gap"]>;
type GridColumnCount = 1 | 2 | 3 | 4 | 6 | 12;
type GridRowCount = 1 | 2 | 3 | 4 | 5 | 6;
interface ListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onSelect"> {
    items: readonly ListItem[];
    listType?: "unordered" | "ordered" | "none";
    layout?: ListLayout;
    divider?: boolean;
    selectable?: boolean;
    selectedValue?: string;
    defaultSelectedValue?: string;
    onSelect?: (value: string, item: ListItem) => void;
    /** Shown when `items` is empty (ignores search). */
    emptyState?: React.ReactNode;
    /** Shown when search is active and nothing matches. */
    noResultsState?: React.ReactNode;
    loading?: boolean;
    children?: React.ReactNode;
    /** Prepended above search (if any) and the list body. */
    header?: React.ReactNode;
    /** `true`: default search field + built-in filter. Object: pass `filter` and/or SearchInput props. */
    search?: boolean | ListSearchConfig;
    direction?: VariantProps<typeof stackVariants>["direction"];
    gap?: StackGap;
    align?: VariantProps<typeof stackVariants>["align"];
    justify?: VariantProps<typeof stackVariants>["justify"];
    wrap?: VariantProps<typeof stackVariants>["wrap"];
    columns?: GridColumnCount;
    rows?: GridRowCount;
    minChildWidth?: string;
    columnGap?: VariantProps<typeof gridSpacingVariants>["columnGap"];
    rowGap?: VariantProps<typeof gridSpacingVariants>["rowGap"];
    autoFlow?: VariantProps<typeof gridSpacingVariants>["autoFlow"];
    alignItems?: VariantProps<typeof gridSpacingVariants>["alignItems"];
    justifyItems?: VariantProps<typeof gridSpacingVariants>["justifyItems"];
    /** Grid gap (and fallback when you only set `gap` in grid mode). */
    gridGap?: GridGap;
}
declare const List: React.ForwardRefExoticComponent<ListProps & React.RefAttributes<HTMLDivElement>>;

declare const tableVariants: (props?: ({
    variant?: "default" | "bordered" | "striped" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TableColumnAlign = "left" | "center" | "right";
interface TableColumn<T> {
    key: string;
    /** Header cell content (any `ReactNode`; not passed through `Icon`). */
    header: React.ReactNode;
    /** Cell content; default renders `row[key]` as a `ReactNode`. */
    render?: (row: T, rowIndex: number) => React.ReactNode;
    sortable?: boolean;
    width?: string | number;
    align?: TableColumnAlign;
    /** Pin column while scrolling horizontally. Set `width` on columns used in offset math; unknown widths are omitted (no default). */
    sticky?: "left" | "right";
}
type SortDirection = "asc" | "desc";
interface TableProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">, VariantProps<typeof tableVariants> {
    data: T[];
    columns: TableColumn<T>[];
    /** When true, column headers with `sortable` toggle sort. */
    sortable?: boolean;
    /** Uncontrolled default sort column key. */
    defaultSortKey?: string;
    defaultSortDirection?: SortDirection;
    sortKey?: string;
    sortDirection?: SortDirection;
    onSortChange?: (key: string, direction: SortDirection) => void;
    selectable?: boolean;
    selectedRows?: Array<string | number>;
    defaultSelectedRows?: Array<string | number>;
    onSelectionChange?: (selected: Array<string | number>) => void;
    getRowId?: (row: T, index: number) => string | number;
    stickyHeader?: boolean;
    onRowClick?: (row: T, index: number) => void;
    loading?: boolean;
    /** Skeleton row count when `loading` (defaults to data length or 5). */
    loadingRows?: number;
    emptyState?: React.ReactNode;
    pagination?: PaginationProps;
    /** Scroll container max height (number → px, or any CSS length). */
    maxHeight?: string | number;
}
declare function Table<T>({ data, columns, sortable: tableSortable, defaultSortKey, defaultSortDirection, sortKey: sortKeyProp, sortDirection: sortDirectionProp, onSortChange, selectable, selectedRows: selectedRowsProp, defaultSelectedRows, onSelectionChange, getRowId, stickyHeader, onRowClick, loading, loadingRows, emptyState, pagination, maxHeight, variant, size, className, ...props }: TableProps<T>): react_jsx_runtime.JSX.Element;
declare namespace Table {
    var displayName: string;
}

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
}
declare const Video: React.ForwardRefExoticComponent<VideoProps & React.RefAttributes<HTMLVideoElement>>;

type TreeMovePosition$1 = "before" | "after" | "inside";
declare function deleteTreeNode(items: TreeItem[], id: string): TreeItem[];
declare function addTreeNodeSibling(items: TreeItem[], targetId: string, node: TreeItem): TreeItem[];
declare function addTreeNodeChild(items: TreeItem[], targetId: string, node: TreeItem): TreeItem[];
declare function moveTreeNode(items: TreeItem[], draggedId: string, targetId: string, position: TreeMovePosition$1): TreeItem[];

type TreeItemKind = "folder" | "file";
type TreeItem = {
    id: string;
    label: React.ReactNode;
    left?: React.ReactNode;
    kind?: TreeItemKind;
    children?: TreeItem[];
};
type TreeAddRelation = "sibling" | "child";
type TreeMovePosition = "before" | "after" | "inside";
interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
    items: TreeItem[];
    selectedId?: string;
    defaultSelectedId?: string;
    onSelect?: (id: string) => void;
    expandedIds?: string[];
    defaultExpandedIds?: string[];
    onExpandedChange?: (ids: string[]) => void;
    showIndentGuides?: boolean;
    loading?: boolean;
    emptyState?: React.ReactNode;
    indent?: number;
    draggable?: boolean;
    onMove?: (payload: {
        draggedId: string;
        targetId: string;
        position: TreeMovePosition;
    }) => void;
    allowAddSibling?: boolean;
    allowAddChild?: boolean;
    allowDelete?: boolean;
    onAdd?: (payload: {
        targetId: string;
        relation: TreeAddRelation;
    }) => void;
    onDelete?: (id: string) => void;
    className?: string;
}
declare function TreeView({ items, selectedId, defaultSelectedId, onSelect, expandedIds, defaultExpandedIds, onExpandedChange, showIndentGuides, loading, emptyState, indent, draggable, onMove, allowAddSibling, allowAddChild, allowDelete, onAdd, onDelete, className, ...rest }: TreeViewProps): react_jsx_runtime.JSX.Element;
declare namespace TreeView {
    var displayName: string;
}

type CarouselItem = {
    image: string;
    imageAlt?: string;
    content?: React.ReactNode;
};
interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    items: CarouselItem[];
    autoPlay?: boolean;
    loop?: boolean;
    interval?: number;
    showIndicators?: boolean;
    showArrows?: boolean;
    orientation?: "horizontal" | "vertical";
    className?: string;
}
declare function Carousel({ items, autoPlay, loop, interval, showIndicators, showArrows, orientation, className, ...rest }: CarouselProps): react_jsx_runtime.JSX.Element | null;
declare namespace Carousel {
    var displayName: string;
}

interface CodeBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
    showCopy?: boolean;
    filename?: string;
}
declare function CodeBlock({ code, language, showLineNumbers, showCopy, filename, className, ...rest }: CodeBlockProps): react_jsx_runtime.JSX.Element;
declare namespace CodeBlock {
    var displayName: string;
}

declare const alertDialogVariants: (props?: ({
    variant?: "default" | "destructive" | "warning" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type AlertDialogConfirmProps = {
    label: string;
    onClick?: () => void;
    loading?: boolean;
};
type AlertDialogCancelProps = {
    label: string;
    onClick?: () => void;
};
interface AlertDialogProps extends VariantProps<typeof alertDialogVariants> {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    title: string;
    description?: string;
    confirmProps: AlertDialogConfirmProps;
    cancelProps?: AlertDialogCancelProps;
    loading?: boolean;
    className?: string;
    container?: OverlayPortalContainer;
}
declare function AlertDialog({ open: openProp, defaultOpen, onOpenChange, title, description, variant, confirmProps, cancelProps, loading, className, container, }: AlertDialogProps): react_jsx_runtime.JSX.Element;
declare namespace AlertDialog {
    var displayName: string;
}

declare const drawerVariants: (props?: ({
    placement?: "left" | "right" | "top" | "bottom" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | "full" | null | undefined;
    variant?: "default" | "sheet" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type DrawerPlacement = NonNullable<VariantProps<typeof drawerVariants>["placement"]>;
type DrawerSize = NonNullable<VariantProps<typeof drawerVariants>["size"]>;
type DrawerVariant = NonNullable<VariantProps<typeof drawerVariants>["variant"]>;
interface DrawerProps extends VariantProps<typeof drawerVariants> {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    showClose?: boolean;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    cardProps?: Omit<CardProps, "header" | "footer" | "children">;
    container?: OverlayPortalContainer;
    children?: React.ReactNode;
}
declare const Drawer: React.ForwardRefExoticComponent<DrawerProps & React.RefAttributes<HTMLDivElement>>;

type PopoverPlacement = "top" | "bottom" | "left" | "right";
type PopoverTriggerProps = {
    label?: React.ReactNode;
    left?: React.ReactNode;
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
    className?: string;
};
interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    triggerProps?: PopoverTriggerProps;
    trigger?: React.ReactNode;
    /** When false, trigger click does not toggle (e.g. HoverCard). */
    openOnClick?: boolean;
    closeOnOutsideClick?: boolean;
    placement?: PopoverPlacement;
    offset?: number;
    className?: string;
    cardProps?: Omit<CardProps, "children">;
    children?: React.ReactNode;
}
declare function Popover({ open: openProp, defaultOpen, onOpenChange, triggerProps, trigger, openOnClick, closeOnOutsideClick, placement, offset, className, cardProps, children, ...rest }: PopoverProps): react_jsx_runtime.JSX.Element;
declare namespace Popover {
    var displayName: string;
}

type HoverCardTriggerProps = {
    label?: React.ReactNode;
    left?: React.ReactNode;
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
    className?: string;
};
interface HoverCardProps extends Omit<PopoverProps, "triggerProps" | "trigger" | "closeOnOutsideClick"> {
    triggerProps?: HoverCardTriggerProps;
    trigger?: React.ReactNode;
    openDelay?: number;
    closeDelay?: number;
    placement?: PopoverPlacement;
}
declare function HoverCard({ open: openProp, defaultOpen, onOpenChange, triggerProps, trigger, openDelay, closeDelay, placement, offset, className, cardProps, children, ...rest }: HoverCardProps): react_jsx_runtime.JSX.Element;
declare namespace HoverCard {
    var displayName: string;
}

declare const tooltipContentVariants: (props?: ({
    variant?: "default" | "inverted" | "info" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const tooltipArrowVariants: (props?: ({
    variant?: "default" | "inverted" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TooltipPlacement = "top" | "bottom" | "left" | "right";
interface TooltipProps {
    content: React.ReactNode;
    disabled?: boolean;
    children: React.ReactNode;
    placement?: TooltipPlacement;
    /** Opacity fade-in length (ms). */
    transitionDuration?: number;
    className?: string;
    variant?: VariantProps<typeof tooltipContentVariants>["variant"];
    /**
     * When true, you can move onto the tooltip; close is deferred briefly so the pointer can cross the gap.
     * When false, leaving the trigger closes immediately (`pointer-events-none` on the tooltip).
     */
    keepOpenOnContentHover?: boolean;
    /**
     * When true, try alternate sides so the tooltip stays inside the viewport (window edges).
     */
    autoPlacement?: boolean;
    /** Extra horizontal offset (px) after placement. */
    xOffset?: number;
    /** Extra vertical offset (px) after placement. */
    yOffset?: number;
    /** Max width (`number` = px, or CSS length string). Omit for default (~20rem). */
    maxWidth?: number | string;
    /** When false, hides the placement arrow. */
    showArrow?: boolean;
}
declare function Tooltip({ content, disabled, children, placement, transitionDuration, className, variant, keepOpenOnContentHover, autoPlacement, xOffset, yOffset, maxWidth, showArrow, }: TooltipProps): react_jsx_runtime.JSX.Element;
declare namespace Tooltip {
    var displayName: string;
}
declare function TooltipProvider({ children }: {
    children?: React.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare namespace TooltipProvider {
    var displayName: string;
}
type TooltipProviderProps = {
    children?: React.ReactNode;
};

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
}
declare const VisuallyHidden: React.ForwardRefExoticComponent<VisuallyHiddenProps & React.RefAttributes<HTMLSpanElement>>;

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
    className?: string;
}
interface ErrorBoundaryState {
    hasError: boolean;
}
declare class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    static displayName: string;
    state: ErrorBoundaryState;
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    render(): string | number | boolean | Iterable<React.ReactNode> | react_jsx_runtime.JSX.Element | null | undefined;
}

type ChartDatum = Record<string, unknown>;

type ChartType = "bar" | "line" | "area" | "pie" | "donut" | "scatter";
interface ChartProps extends React.SVGAttributes<SVGSVGElement> {
    type: ChartType;
    data: ChartDatum[];
    xKey?: string;
    yKey?: string;
    valueKey?: string;
    labelKey?: string;
    responsive?: boolean;
    legend?: boolean;
    tooltip?: boolean;
    grid?: boolean;
    config?: Record<string, {
        label?: string;
        color?: string;
    }>;
    height?: number | string;
    width?: number | string;
    innerRadius?: number;
    horizontal?: boolean;
    stacked?: boolean;
    area?: boolean;
    showPoints?: boolean;
    className?: string;
}
declare function Chart({ type, data, xKey, yKey, valueKey, labelKey, responsive, legend, grid, height, width, innerRadius, horizontal, area, showPoints, className, ...props }: ChartProps): react_jsx_runtime.JSX.Element;
declare namespace Chart {
    var displayName: string;
}

interface BarChartProps extends Omit<ChartProps, "type" | "data"> {
    data: ChartDatum[];
    xKey: string;
    yKey: string;
    stacked?: boolean;
    horizontal?: boolean;
}
declare function BarChart({ data, xKey, yKey, stacked, horizontal, ...props }: BarChartProps): react_jsx_runtime.JSX.Element;
declare namespace BarChart {
    var displayName: string;
}

interface LineChartProps extends Omit<ChartProps, "type" | "data"> {
    data: ChartDatum[];
    xKey: string;
    yKey: string;
    curve?: "linear" | "monotone" | "step";
    showPoints?: boolean;
    area?: boolean;
}
declare function LineChart({ data, xKey, yKey, curve: _curve, showPoints, area, ...props }: LineChartProps): react_jsx_runtime.JSX.Element;
declare namespace LineChart {
    var displayName: string;
}

interface PieChartProps extends Omit<ChartProps, "type" | "data"> {
    data: ChartDatum[];
    valueKey: string;
    labelKey?: string;
    innerRadius?: number;
    padAngle?: number;
    startAngle?: number;
    endAngle?: number;
}
declare function PieChart({ data, valueKey, labelKey, innerRadius, ...props }: PieChartProps): react_jsx_runtime.JSX.Element;
declare namespace PieChart {
    var displayName: string;
}

interface ThemeToggleProps {
    className?: string;
    position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}
declare function ThemeToggle({ className, position }: ThemeToggleProps): react_jsx_runtime.JSX.Element;

type ThemeSelection = {
    color?: string;
    typography?: string;
    shape?: string;
    density?: string;
    animation?: string;
    custom?: string;
};
type ThemeMetadata$1 = {
    name: string;
    file: string;
    icon: string;
    description: string;
};
/**
 * Hook for managing design system theme switching
 */
declare function useTheme(): {
    selectedThemes: ThemeSelection;
    updateTheme: (category: keyof ThemeSelection, themeId: string | undefined) => Promise<void>;
    resetToDefaults: () => Promise<void>;
    applyPreset: (preset: Partial<ThemeSelection>) => Promise<void>;
    isLoading: boolean;
    error: string | null;
    getAvailableThemes: (category: string) => Promise<Record<string, ThemeMetadata$1>>;
};

interface ThemePanelProps {
    categories: Array<[string, {
        name: string;
        themes: Record<string, ThemeMetadata$1>;
        order?: number;
    }]>;
    selectedThemes: ThemeSelection;
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    categoryThemes: Record<string, ThemeMetadata$1>;
    themesLoading: boolean;
    isApplying: boolean;
    onThemeSelect: (category: keyof ThemeSelection, themeId: string) => void;
    onResetAll: () => void;
    onClose?: () => void;
    /** When false, hides the header close control (inline / settings sections). Default true. */
    showClose?: boolean;
    className?: string;
}
declare function ThemePanel({ categories, selectedThemes, activeCategory, onCategoryChange, categoryThemes, themesLoading, isApplying, onThemeSelect, onResetAll, onClose, showClose, className, }: ThemePanelProps): react_jsx_runtime.JSX.Element;

declare function useThemeToggle(options?: {
    embedded?: boolean;
}): {
    selectedThemes: ThemeSelection;
    isLoading: boolean;
    isOpen: boolean;
    activeCategory: string;
    categoryThemes: Record<string, ThemeMetadata$1>;
    themesLoading: boolean;
    categories: [string, {
        name: string;
        themes: Record<string, any>;
        order?: number;
    }][];
    menuRef: React.RefObject<HTMLDivElement>;
    triggerRef: React.RefObject<HTMLButtonElement>;
    setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
    handleThemeSelect: (category: keyof ThemeSelection, themeId: string) => Promise<void>;
    handleResetAll: () => Promise<void>;
    toggleMenu: () => void;
    closeMenu: () => void;
};

type ThemePreset = Partial<ThemeSelection>;
/**
 * Merge a partial theme selection with defaults (or a base) and apply CSS variables.
 * Persists to localStorage when `persist` is true (default).
 */
declare function applyPreset(preset: ThemePreset, options?: {
    base?: ThemeSelection;
    persist?: boolean;
    storageKey?: string;
}): Promise<ThemeSelection>;

/**
 * Theme Configuration
 * Registry of all available themes organized by category
 *
 * Base themes are defined here. For custom themes, use registerTheme() to add them.
 * Create theme files in public/tokens/themes/{category}/{themeId}.json and register them.
 */
type ThemeMetadata = {
    name: string;
    file: string;
    icon: string;
    description: string;
};
type ThemeCategory = {
    name: string;
    order: number;
    themes: Record<string, ThemeMetadata>;
};
/**
 * Centralized theme category order
 * Used everywhere to ensure consistency
 * Custom category is included but handled specially (optional, user-created files)
 *
 * ⚠️ IF YOU UPDATE THIS, ALSO UPDATE:
 * 1. scripts/themeConfig.js - THEME_CATEGORY_ORDER (JavaScript version)
 * 2. scripts/apply-theme-sync.js - THEME_CATEGORY_ORDER constant (standalone script, can't import)
 */
declare const THEME_CATEGORY_ORDER: readonly ["color", "typography", "shape", "density", "animation", "custom"];
/**
 * Register a custom theme dynamically
 * Use this to add custom themes after creating theme files in public/tokens/themes/
 *
 * Example:
 * ```ts
 * import { registerTheme } from 'shru-design-system'
 *
 * // After creating public/tokens/themes/color/ocean.json
 * registerTheme('color', 'ocean', {
 *   name: 'Ocean',
 *   file: 'color/ocean.json',
 *   icon: '🌊',
 *   description: 'Ocean color theme'
 * })
 * ```
 */
declare function registerTheme(category: string, themeId: string, metadata: ThemeMetadata): Record<string, ThemeCategory>;
/**
 * Register a theme from a token file
 * Helper function that loads the theme file and registers it automatically
 *
 * Example:
 * ```ts
 * import { registerThemeFromFile } from 'shru-design-system'
 *
 * // After creating public/tokens/themes/color/ocean.json
 * await registerThemeFromFile('color', 'ocean')
 * ```
 */
declare function registerThemeFromFile(category: string, themeId: string, filePath?: string): Promise<{
    success: boolean;
    themeId: string;
    category: string;
}>;
/**
 * Get merged theme categories (base + discovered)
 */
declare function getThemeCategories(): Promise<Record<string, ThemeCategory>>;
/**
 * Get theme file path
 */
declare function getThemeFilePath(category: string, themeId: string): string | null;
/**
 * Get all themes for a category
 */
declare function getThemesForCategory(category: string): Promise<Record<string, ThemeMetadata>>;
/**
 * Get theme by ID
 */
declare function getTheme(category: string, themeId: string): Promise<ThemeMetadata | null>;

/**
 * Theme Utilities
 * Pure utility functions for theme management
 * Note: generateAndApplyTheme has side effects (modifies DOM) but is the main theme application utility
 */

/**
 * Debug helper: Enable debug mode to see all CSS variables in console
 * Call this in browser console: window.__DESIGN_SYSTEM_DEBUG__ = true
 */
declare function enableDebugMode(): void;
/**
 * Debug helper: Get all current CSS variables
 */
declare function getCurrentCSSVariables(): Record<string, string>;

/**
 * Synchronous theme application for blocking script execution
 * This runs before React hydrates to prevent theme flash
 */
/**
 * Apply theme synchronously using blocking XMLHttpRequest
 * This prevents flash of unstyled content
 */
declare function applyThemeSync(): void;

export { Accordion, type AccordionItem, type AccordionProps, Alert, AlertDialog, type AlertDialogCancelProps, type AlertDialogConfirmProps, type AlertDialogProps, type AlertProps, AppShell, type AppShellProps, AspectRatio, type AspectRatioProps, AuthLayout, type AuthLayoutProps, Avatar, AvatarGroup, type AvatarGroupProps, type AvatarProps, Badge, type BadgeProps, BarChart, type BarChartProps, Breadcrumb, type BreadcrumbItem, type BreadcrumbProps, Button, type ButtonProps, Calendar, type CalendarProps, type CalendarSelectionMode, Card, type CardColor, type CardProps, type CardVariant, Carousel, type CarouselItem, type CarouselProps, Chart, type ChartProps, type ChartType, Checkbox, type CheckboxProps, CodeBlock, type CodeBlockProps, Collapsible, type CollapsibleProps, Command, type CommandItem, type CommandProps, ConfirmModal, type ConfirmModalCancelProps, type ConfirmModalConfirmProps, type ConfirmModalIntent, type ConfirmModalProps, ContextMenu, type ContextMenuProps, CopyButton, type CopyButtonProps, DatePicker, type DatePickerProps, type DatePreset, DateRangePicker, type DateRangePickerProps, type DescriptionItem, DescriptionList, type DescriptionListProps, Drawer, type DrawerPlacement, type DrawerProps, type DrawerSize, type DrawerVariant, Dropdown, type DropdownItem, type DropdownProps, EmptyState, type EmptyStateAction, type EmptyStateProps, ErrorBoundary, type ErrorBoundaryProps, FAB, type FABProps, FieldLayout, type FieldLayoutProps, type FieldSurfaceProps, FixedScreenWidget, type FixedScreenWidgetPosition, type FixedScreenWidgetProps, type FixedScreenWidgetSlideFrom, Form, FormField, type FormFieldProps, type FormFieldRenderProps, type FormFieldSchema, type FormFieldType, FormModal, type FormModalMode, type FormModalProps, type FormProps, type FormValues, Grid, type GridProps, type GridRootTag, HelperText, type HelperTextProps, Hero, type HeroActions, type HeroProps, HistoryControlButtons, type HistoryControlButtonsProps, HoverCard, type HoverCardProps, type HoverCardTriggerProps, Icon, type IconProps, Image, type ImageProps, InlineEdit, type InlineEditProps, InputGroup, InputGroupAddon, type InputGroupAddonProps, InputGroupButton, type InputGroupButtonProps, InputGroupInput, type InputGroupInputProps, type InputGroupProps, InputOTP, type InputOTPProps, Kbd, KbdGroup, type KbdGroupProps, type KbdProps, Label, type LabelProps, LineChart, type LineChartProps, Link, type LinkProps, List, type ListItem, type ListLayout, type ListProps, type ListSearchConfig, LoadingOverlay, type LoadingOverlayProps, Menubar, type MenubarMenu, type MenubarProps, Modal, type ModalProps, type ModalSize, type ModalTriggerProps, type NavItem, type NavMenuItem, Navbar, type NavbarProps, NavigationMenu, type NavigationMenuProps, Overlay, type OverlayPortalContainer, OverlayPortalScope, type OverlayProps, PageFooter, type PageFooterProps, PageHeader, type PageHeaderProps, Pagination, type PaginationProps, PhoneInput, type PhoneInputProps, type PhoneValue, PieChart, type PieChartProps, Pill, PillGroup, type PillGroupProps, type PillItem, type PillProps, Popover, type PopoverPlacement, type PopoverProps, type PopoverTriggerProps, Progress, type ProgressProps, Radio, RadioGroup, type RadioGroupItem, type RadioGroupProps, type RadioProps, Rating, type RatingPrecision, type RatingProps, ResizableHandle, type ResizableHandleProps, ResizablePanel, ResizablePanelGroup, ResizeContainer, type ResizeContainerProps, SearchInput, type SearchInputProps, Select, type SelectOption, type SelectProps, Separator, type SeparatorProps, Sidebar, type SidebarItem, type SidebarProps, Skeleton, type SkeletonProps, Slider, type SliderProps, type SortDirection, Spinner, type SpinnerProps, type SpinnerSize, SplitButton, type SplitButtonMenuItem, type SplitButtonProps, Stack, type StackProps, type StackRootTag, type StepItem, type StepStatus, Stepper, type StepperProps, type StringFieldValidateOpts, THEME_CATEGORY_ORDER, type TabItem, Table, type TableColumn, type TableColumnAlign, type TableProps, TableSkeleton, type TableSkeletonProps, Tabs, type TabsProps, Tag, type TagProps, type TagSurfaceVariant, Text, TextInput, type TextInputProps, type TextProps, Textarea, type TextareaProps, type ThemeMetadata$1 as ThemeMetadata, ThemePanel, type ThemePanelProps, type ThemePreset, type ThemeSelection, ThemeToggle, type ThemeToggleProps, TimePicker, type TimePickerProps, Toast, type ToastAction, type ToastProps, type ToastTone, type ToastVariant, Toaster, type ToasterPosition, type ToasterProps, Toggle, type ToggleProps, Tooltip, type TooltipPlacement, type TooltipProps, TooltipProvider, type TooltipProviderProps, type TreeAddRelation, type TreeItem, type TreeItemKind, type TreeMovePosition, TreeView, type TreeViewProps, TriggerModal, type TriggerModalProps, Upload, type UploadProps, Video, type VideoProps, VisuallyHidden, type VisuallyHiddenProps, addTreeNodeChild, addTreeNodeSibling, alertDialogVariants, alertVariants, applyPreset, applyThemeSync, pillSurfaceVariants as badgeVariants, buttonVariants, cardVariants, clearToasts, defaultListItemFilter, deleteTreeNode, descriptionListVariants, disabledControl, dismissToast, drawerVariants, emptyStateVariants, enableDebugMode, fieldSurfaceVariants, focusRing, focusRingDestructive, focusRingOffset, formatAspectRatioLabel, getCurrentCSSVariables, getPhoneDialCode, getStringFieldValidationError, getTheme, getThemeCategories, getThemeFilePath, getThemesForCategory, gridSpacingVariants as gridVariants, heroVariants, iconVariants, linkVariants, modalSurfaceVariants, moveTreeNode, navbarVariants, overlayVariants, pageFooterVariants, pageHeaderVariants, peerFocusRing, pillSurfaceVariants as pillVariants, ratingVariants, registerTheme, registerThemeFromFile, ringOffsetBackground, sidebarVariants, stackVariants, textVariants, toast, toastVariants, toggleThumbVariants, toggleVariants, tooltipArrowVariants, tooltipContentVariants, useFormContext, useTheme, useThemeToggle };
