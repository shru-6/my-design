import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { OTPInput } from 'input-otp';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import { PanelGroupProps, ImperativePanelGroupHandle, PanelProps, ImperativePanelHandle, PanelResizeHandleProps } from 'react-resizable-panels';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

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

declare const switchVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SwitchProps extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, "onCheckedChange" | "onChange">, VariantProps<typeof switchVariants> {
    default?: boolean;
    label?: React.ReactNode;
    description?: React.ReactNode;
    errorMessage?: string;
    onChange?: (checked: boolean) => void;
}
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;

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

interface HelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
    tone?: "default" | "muted" | "error";
}
declare const HelperText: React.ForwardRefExoticComponent<HelperTextProps & React.RefAttributes<HTMLParagraphElement>>;

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
interface AspectRatioProps extends Omit<React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>, "ratio"> {
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

declare const linkVariants: (props?: ({
    variant?: "default" | "muted" | "underline" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children">, VariantProps<typeof linkVariants> {
    href: string;
    external?: boolean;
    className?: string;
    children?: React.ReactNode;
}
declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;

type SpinnerSize = "xs" | "sm" | "md" | "lg";
interface SpinnerProps extends Omit<React.SVGProps<SVGSVGElement>, "children"> {
    size?: SpinnerSize;
    className?: string;
    label?: string;
}
declare const Spinner: React.ForwardRefExoticComponent<Omit<SpinnerProps, "ref"> & React.RefAttributes<SVGSVGElement>>;

declare const skeletonVariants: (props?: ({
    variant?: "button" | "checkbox" | "radio" | "input" | "text" | "card" | "avatar" | "badge" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {
    width?: string | number;
    height?: string | number;
    count?: number;
    className?: string;
    children?: React.ReactNode;
}
declare const Skeleton: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>;

declare const pillSurfaceVariants: (props?: ({
    appearance?: "subtle" | "outline" | "ghost" | "solid" | null | undefined;
    size?: "sm" | "md" | null | undefined;
    tone?: "danger" | "neutral" | "info" | "success" | "warning" | null | undefined;
    shape?: "rounded" | "pill" | null | undefined;
    selected?: boolean | null | undefined;
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
    fallback?: React.ReactNode;
    status?: Status;
}
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>>;

declare const progressVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ProgressProps extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, "value">, VariantProps<typeof progressVariants> {
    value?: number;
    max?: number;
    showLabel?: boolean;
    indeterminate?: boolean;
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
    fit?: "none" | "fill" | "contain" | "cover" | "scale-down" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "placeholder">, VariantProps<typeof imageVariants> {
    fallback?: React.ReactNode;
    placeholder?: "blur" | "skeleton" | "none";
    loadingStrategy?: "lazy" | "eager";
    position?: string;
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
    /** Maps to Pill `appearance` (solid / subtle / outline / ghost). */
    variant?: PillProps["appearance"];
}
declare function PillGroup({ items, value, defaultValue, onChange, selectable, onSelect, multiple, removable, onRemove, maxVisible, overflowLabel, children, size, variant, gap, wrap, className, ...props }: PillGroupProps): react_jsx_runtime.JSX.Element;

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

interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string;
}
declare const Video: React.ForwardRefExoticComponent<VideoProps & React.RefAttributes<HTMLVideoElement>>;

declare const overlayVariants: (props?: ({
    blur?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface OverlayProps extends VariantProps<typeof overlayVariants> {
    open?: boolean;
    onClose?: () => void;
    container?: HTMLElement | null;
    /** When false, uses absolute positioning so the overlay can be scoped to a positioned ancestor (e.g. previews). Default: true (fixed, viewport-relative). */
    fixed?: boolean;
    className?: string;
    children?: React.ReactNode;
}
declare function Overlay({ open, onClose, container, blur, fixed, className, children, }: OverlayProps): React.ReactPortal | null;

declare const tooltipContentVariants: (props?: ({
    variant?: "default" | "inverted" | "info" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const tooltipArrowVariants: (props?: ({
    variant?: "default" | "inverted" | "info" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type TooltipPlacement = "top" | "bottom" | "left" | "right";
interface TooltipProps {
    content: React.ReactNode;
    openDelay?: number;
    disabled?: boolean;
    children: React.ReactNode;
    placement?: TooltipPlacement;
    className?: string;
    variant?: VariantProps<typeof tooltipContentVariants>["variant"];
}
declare function Tooltip({ content, openDelay, disabled, children, placement, className, variant, }: TooltipProps): react_jsx_runtime.JSX.Element;
declare const TooltipProvider: React.FC<TooltipPrimitive.TooltipProviderProps>;
type TooltipProviderProps = React.ComponentProps<typeof TooltipPrimitive.Provider>;

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
    state: ErrorBoundaryState;
    static getDerivedStateFromError(): {
        hasError: boolean;
    };
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void;
    render(): string | number | boolean | Iterable<React.ReactNode> | react_jsx_runtime.JSX.Element | null | undefined;
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
    isLoading: boolean;
    error: string | null;
    getAvailableThemes: (category: string) => Promise<Record<string, ThemeMetadata$1>>;
};

declare function useThemeToggle(): {
    selectedThemes: ThemeSelection;
    isLoading: boolean;
    getAvailableThemes: (category: string) => Promise<Record<string, ThemeMetadata$1>>;
    isOpen: boolean;
    selectedCategory: string | null;
    themeCategories: any;
    categories: [string, {
        name: string;
        themes: Record<string, any>;
        order?: number;
    }][];
    menuRef: React.RefObject<HTMLDivElement>;
    handleCategoryClick: (categoryKey: string) => void;
    handleThemeSelect: (category: keyof ThemeSelection, themeId: string) => Promise<void>;
    handleBack: () => void;
    toggleMenu: () => void;
};

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

export { AspectRatio, type AspectRatioProps, Avatar, type AvatarProps, Badge, type BadgeProps, Button, type ButtonProps, Card, type CardColor, type CardProps, type CardVariant, Checkbox, type CheckboxProps, type DescriptionItem, DescriptionList, type DescriptionListProps, ErrorBoundary, type ErrorBoundaryProps, FAB, type FABProps, FieldLayout, type FieldLayoutProps, type FieldSurfaceProps, Grid, type GridProps, type GridRootTag, HelperText, type HelperTextProps, Icon, type IconProps, Image, type ImageProps, InputOTP, type InputOTPProps, Kbd, KbdGroup, type KbdGroupProps, type KbdProps, Label, type LabelProps, Link, type LinkProps, List, type ListItem, type ListLayout, type ListProps, type ListSearchConfig, Overlay, type OverlayProps, Pill, PillGroup, type PillGroupProps, type PillItem, type PillProps, Progress, type ProgressProps, Radio, type RadioProps, Rating, type RatingPrecision, type RatingProps, ResizableHandle, type ResizableHandleProps, ResizablePanel, ResizablePanelGroup, SearchInput, type SearchInputProps, Separator, type SeparatorProps, Skeleton, type SkeletonProps, Slider, type SliderProps, Spinner, type SpinnerProps, type SpinnerSize, Stack, type StackProps, type StackRootTag, type StringFieldValidateOpts, Switch, type SwitchProps, THEME_CATEGORY_ORDER, Tag, type TagProps, type TagSurfaceVariant, Text, TextInput, type TextInputProps, type TextProps, Textarea, type TextareaProps, type ThemeMetadata$1 as ThemeMetadata, type ThemeSelection, ThemeToggle, type ThemeToggleProps, Tooltip, type TooltipPlacement, type TooltipProps, TooltipProvider, type TooltipProviderProps, Video, type VideoProps, VisuallyHidden, type VisuallyHiddenProps, applyThemeSync, pillSurfaceVariants as badgeVariants, buttonVariants, cardVariants, defaultListItemFilter, descriptionListVariants, disabledControl, enableDebugMode, fieldSurfaceVariants, focusRing, focusRingDestructive, focusRingOffset, formatAspectRatioLabel, getCurrentCSSVariables, getStringFieldValidationError, getTheme, getThemeCategories, getThemeFilePath, getThemesForCategory, gridSpacingVariants as gridVariants, iconVariants, linkVariants, overlayVariants, peerFocusRing, pillSurfaceVariants as pillVariants, ratingVariants, registerTheme, registerThemeFromFile, ringOffsetBackground, stackVariants, textVariants, tooltipArrowVariants, tooltipContentVariants, useTheme, useThemeToggle };
