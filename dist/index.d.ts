import * as react_jsx_runtime from 'react/jsx-runtime';
import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React$1 from 'react';
import { ComponentProps } from 'react';
import { VariantProps } from 'class-variance-authority';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { OTPInput } from 'input-otp';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { Command as Command$1 } from 'cmdk';
import { DayPicker, DayButton } from 'react-day-picker';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import * as react_hook_form from 'react-hook-form';
import { FieldValues, FieldPath, ControllerProps } from 'react-hook-form';
import { Slot } from '@radix-ui/react-slot';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Drawer as Drawer$1 } from 'vaul';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { ToasterProps } from 'sonner';
import * as RechartsPrimitive from 'recharts';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import * as ResizablePrimitive from 'react-resizable-panels';
import { LucideIcon } from 'lucide-react';
import * as src from 'src';

declare const buttonVariants: (props?: ({
    readonly variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    readonly size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Button({ className, variant, size, asChild, ...props }: React$1.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
}): react_jsx_runtime.JSX.Element;

declare function ButtonShowcase(): react_jsx_runtime.JSX.Element;

declare const textInputTypes: readonly ["text", "email", "password", "number", "tel", "url", "search"];
declare function TextInput({ className, type, ...props }: React$1.ComponentProps<"input"> & {
    type?: typeof textInputTypes[number];
}): react_jsx_runtime.JSX.Element;

declare function TextInputShowcase(): react_jsx_runtime.JSX.Element;

declare const badgeVariants: (props?: ({
    readonly variant?: "default" | "destructive" | "outline" | "secondary" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Badge({ className, variant, asChild, ...props }: React$1.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
}): react_jsx_runtime.JSX.Element;

declare function BadgeShowcase(): react_jsx_runtime.JSX.Element;

declare function Label({ className, ...props }: React$1.ComponentProps<typeof LabelPrimitive.Root>): react_jsx_runtime.JSX.Element;

declare function LabelShowcase(): react_jsx_runtime.JSX.Element;

declare function Textarea({ className, ...props }: React$1.ComponentProps<"textarea">): react_jsx_runtime.JSX.Element;

declare function TextareaShowcase(): react_jsx_runtime.JSX.Element;

declare const separatorOrientations: readonly ["horizontal", "vertical"];
declare function Separator({ className, orientation, decorative, ...props }: React$1.ComponentProps<typeof SeparatorPrimitive.Root> & {
    orientation?: typeof separatorOrientations[number];
}): react_jsx_runtime.JSX.Element;

declare function SeparatorShowcase(): react_jsx_runtime.JSX.Element;

declare function Checkbox({ className, ...props }: React$1.ComponentProps<typeof CheckboxPrimitive.Root>): react_jsx_runtime.JSX.Element;

declare function CheckboxShowcase(): react_jsx_runtime.JSX.Element;

declare function Switch({ className, ...props }: React$1.ComponentProps<typeof SwitchPrimitive.Root>): react_jsx_runtime.JSX.Element;

declare function SwitchShowcase(): react_jsx_runtime.JSX.Element;

declare function Radio({ className, ...props }: React$1.ComponentProps<typeof RadioGroupPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function RadioItem({ className, ...props }: React$1.ComponentProps<typeof RadioGroupPrimitive.Item>): react_jsx_runtime.JSX.Element;

declare function RadioShowcase(): react_jsx_runtime.JSX.Element;

declare function Skeleton({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;

declare function SkeletonShowcase(): react_jsx_runtime.JSX.Element;

declare function Progress({ className, value, ...props }: React$1.ComponentProps<typeof ProgressPrimitive.Root>): react_jsx_runtime.JSX.Element;

declare function ProgressShowcase(): react_jsx_runtime.JSX.Element;

declare function Spinner({ className, ...props }: React$1.ComponentProps<"svg">): react_jsx_runtime.JSX.Element;

declare function SpinnerShowcase(): react_jsx_runtime.JSX.Element;

declare function Avatar({ className, ...props }: React$1.ComponentProps<typeof AvatarPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function AvatarImage({ className, ...props }: React$1.ComponentProps<typeof AvatarPrimitive.Image>): react_jsx_runtime.JSX.Element;
declare function AvatarFallback({ className, ...props }: React$1.ComponentProps<typeof AvatarPrimitive.Fallback>): react_jsx_runtime.JSX.Element;

declare function AvatarShowcase(): react_jsx_runtime.JSX.Element;

declare function Empty({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function EmptyHeader({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare const emptyMediaVariants: (props?: ({
    readonly variant?: "default" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function EmptyMedia({ className, variant, ...props }: React$1.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>): react_jsx_runtime.JSX.Element;
declare function EmptyTitle({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function EmptyDescription({ className, ...props }: React$1.ComponentProps<"p">): react_jsx_runtime.JSX.Element;
declare function EmptyContent({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;

declare function EmptyShowcase(): react_jsx_runtime.JSX.Element;

declare const sliderOrientations: readonly ["horizontal", "vertical"];
declare function Slider({ className, defaultValue, value, min, max, orientation, ...props }: React$1.ComponentProps<typeof SliderPrimitive.Root> & {
    orientation?: typeof sliderOrientations[number];
}): react_jsx_runtime.JSX.Element;

declare function SliderShowcase(): react_jsx_runtime.JSX.Element;

declare const toggleVariants: (props?: ({
    readonly variant?: "default" | "outline" | null | undefined;
    readonly size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Toggle({ className, variant, size, ...props }: React$1.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>): react_jsx_runtime.JSX.Element;

declare function ToggleShowcase(): react_jsx_runtime.JSX.Element;

declare const alertVariants: (props?: ({
    readonly variant?: "default" | "destructive" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Alert({ className, variant, ...props }: React$1.ComponentProps<"div"> & VariantProps<typeof alertVariants>): react_jsx_runtime.JSX.Element;
declare function AlertTitle({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AlertDescription({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;

declare function AlertShowcase(): react_jsx_runtime.JSX.Element;

declare function InputOTP({ className, containerClassName, ...props }: React$1.ComponentProps<typeof OTPInput> & {
    containerClassName?: string;
}): react_jsx_runtime.JSX.Element;
declare function InputOTPGroup({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function InputOTPSlot({ index, className, ...props }: React$1.ComponentProps<"div"> & {
    index: number;
}): react_jsx_runtime.JSX.Element;
declare function InputOTPSeparator({ ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;

declare function InputOTPShowcase(): react_jsx_runtime.JSX.Element;

declare function Kbd({ className, ...props }: React$1.ComponentProps<"kbd">): react_jsx_runtime.JSX.Element;
declare function KbdGroup({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;

declare function KbdShowcase(): react_jsx_runtime.JSX.Element;

declare const textVariants: readonly ["default", "muted", "small", "large"];
declare const textAsElements: readonly ["p", "span", "div"];
interface TextProps$1 extends React$1.HTMLAttributes<HTMLParagraphElement> {
    variant?: typeof textVariants[number];
    as?: typeof textAsElements[number];
}
declare function Text$1({ className, variant, as: Component, ...props }: TextProps$1): react_jsx_runtime.JSX.Element;
declare function TextShowcase(): react_jsx_runtime.JSX.Element;

interface ImageProps extends React$1.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: React$1.ReactNode;
    src?: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
    loading?: "lazy" | "eager";
}
/**
 * Image component - uses standard HTML img tag for library compatibility.
 *
 * For Next.js optimization, use next/image directly in your Next.js app.
 * This component is library-compatible and works in any React environment.
 */
declare function Image({ className, fallback, alt, src, width, height, loading, ...props }: ImageProps): react_jsx_runtime.JSX.Element;
declare function ImageShowcase(): react_jsx_runtime.JSX.Element;

interface UploadProps extends React$1.InputHTMLAttributes<HTMLInputElement> {
    onUpload?: (files: FileList | null) => void;
}
declare function Upload({ className, onUpload, onChange, ...props }: UploadProps): react_jsx_runtime.JSX.Element;
declare function UploadShowcase(): react_jsx_runtime.JSX.Element;

interface ErrorBoundaryProps {
    children: React$1.ReactNode;
    fallback?: React$1.ReactNode;
    className?: string;
}
interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}
declare class ErrorBoundary extends React$1.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): ErrorBoundaryState;
    componentDidCatch(error: Error, errorInfo: React$1.ErrorInfo): void;
    render(): string | number | bigint | boolean | react_jsx_runtime.JSX.Element | Iterable<React$1.ReactNode> | Promise<string | number | bigint | boolean | React$1.ReactPortal | React$1.ReactElement<unknown, string | React$1.JSXElementConstructor<any>> | Iterable<React$1.ReactNode> | null | undefined> | null | undefined;
}
declare function ErrorBoundaryShowcase(): react_jsx_runtime.JSX.Element;

declare function Select({ ...props }: React$1.ComponentProps<typeof SelectPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function SelectGroup({ ...props }: React$1.ComponentProps<typeof SelectPrimitive.Group>): react_jsx_runtime.JSX.Element;
declare function SelectValue({ ...props }: React$1.ComponentProps<typeof SelectPrimitive.Value>): react_jsx_runtime.JSX.Element;
declare const selectTriggerSizes: readonly ["sm", "default"];
declare function SelectTrigger({ className, size, children, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Trigger> & {
    size?: typeof selectTriggerSizes[number];
}): react_jsx_runtime.JSX.Element;
declare function SelectContent({ className, children, position, align, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Content>): react_jsx_runtime.JSX.Element;
declare function SelectLabel({ className, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Label>): react_jsx_runtime.JSX.Element;
declare function SelectItem({ className, children, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Item>): react_jsx_runtime.JSX.Element;
declare function SelectSeparator({ className, ...props }: React$1.ComponentProps<typeof SelectPrimitive.Separator>): react_jsx_runtime.JSX.Element;
declare function SelectScrollUpButton({ className, ...props }: React$1.ComponentProps<typeof SelectPrimitive.ScrollUpButton>): react_jsx_runtime.JSX.Element;
declare function SelectScrollDownButton({ className, ...props }: React$1.ComponentProps<typeof SelectPrimitive.ScrollDownButton>): react_jsx_runtime.JSX.Element;

declare function SelectShowcase(): react_jsx_runtime.JSX.Element;

declare function Tabs({ className, ...props }: React$1.ComponentProps<typeof TabsPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function TabsList({ className, ...props }: React$1.ComponentProps<typeof TabsPrimitive.List>): react_jsx_runtime.JSX.Element;
declare function TabsTrigger({ className, ...props }: React$1.ComponentProps<typeof TabsPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare function TabsContent({ className, ...props }: React$1.ComponentProps<typeof TabsPrimitive.Content>): react_jsx_runtime.JSX.Element;

declare function TabsShowcase(): react_jsx_runtime.JSX.Element;

declare function Breadcrumb({ ...props }: React$1.ComponentProps<"nav">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbList({ className, ...props }: React$1.ComponentProps<"ol">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbItem({ className, ...props }: React$1.ComponentProps<"li">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbLink({ asChild, className, ...props }: React$1.ComponentProps<"a"> & {
    asChild?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function BreadcrumbPage({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbSeparator({ children, className, ...props }: React$1.ComponentProps<"li">): react_jsx_runtime.JSX.Element;
declare function BreadcrumbEllipsis({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;

declare function BreadcrumbShowcase(): react_jsx_runtime.JSX.Element;

declare function Pagination({ className, ...props }: React$1.ComponentProps<"nav">): react_jsx_runtime.JSX.Element;
declare function PaginationContent({ className, ...props }: React$1.ComponentProps<"ul">): react_jsx_runtime.JSX.Element;
declare function PaginationItem({ ...props }: React$1.ComponentProps<"li">): react_jsx_runtime.JSX.Element;
type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<React$1.ComponentProps<typeof Button>, "size"> & React$1.ComponentProps<"a">;
declare function PaginationLink({ className, isActive, size, ...props }: PaginationLinkProps): react_jsx_runtime.JSX.Element;
declare function PaginationPrevious({ className, ...props }: React$1.ComponentProps<typeof PaginationLink>): react_jsx_runtime.JSX.Element;
declare function PaginationNext({ className, ...props }: React$1.ComponentProps<typeof PaginationLink>): react_jsx_runtime.JSX.Element;
declare function PaginationEllipsis({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;

declare function PaginationShowcase(): react_jsx_runtime.JSX.Element;

declare function Modal({ ...props }: React$1.ComponentProps<typeof DialogPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function ModalTrigger({ ...props }: React$1.ComponentProps<typeof DialogPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare function ModalPortal({ ...props }: React$1.ComponentProps<typeof DialogPrimitive.Portal>): react_jsx_runtime.JSX.Element;
declare function ModalClose({ ...props }: React$1.ComponentProps<typeof DialogPrimitive.Close>): react_jsx_runtime.JSX.Element;
declare function ModalOverlay({ className, ...props }: React$1.ComponentProps<typeof DialogPrimitive.Overlay>): react_jsx_runtime.JSX.Element;
declare function ModalContent({ className, children, showCloseButton, ...props }: React$1.ComponentProps<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function ModalHeader({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function ModalFooter({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function ModalTitle({ className, ...props }: React$1.ComponentProps<typeof DialogPrimitive.Title>): react_jsx_runtime.JSX.Element;
declare function ModalDescription({ className, ...props }: React$1.ComponentProps<typeof DialogPrimitive.Description>): react_jsx_runtime.JSX.Element;

declare function ModalShowcase(): react_jsx_runtime.JSX.Element;

declare function Popover({ ...props }: React$1.ComponentProps<typeof PopoverPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function PopoverTrigger({ ...props }: React$1.ComponentProps<typeof PopoverPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare const popoverSides: readonly ["top", "right", "bottom", "left"];
declare const popoverAligns: readonly ["start", "center", "end"];
declare function PopoverContent({ className, align, sideOffset, side, ...props }: React$1.ComponentProps<typeof PopoverPrimitive.Content> & {
    side?: typeof popoverSides[number];
    align?: typeof popoverAligns[number];
}): react_jsx_runtime.JSX.Element;
declare function PopoverAnchor({ ...props }: React$1.ComponentProps<typeof PopoverPrimitive.Anchor>): react_jsx_runtime.JSX.Element;

declare function PopoverShowcase(): react_jsx_runtime.JSX.Element;

declare function Sheet({ ...props }: React$1.ComponentProps<typeof DialogPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function SheetTrigger({ ...props }: React$1.ComponentProps<typeof DialogPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare function SheetClose({ ...props }: React$1.ComponentProps<typeof DialogPrimitive.Close>): react_jsx_runtime.JSX.Element;
declare const sheetSides: readonly ["top", "right", "bottom", "left"];
declare function SheetContent({ className, children, side, ...props }: React$1.ComponentProps<typeof DialogPrimitive.Content> & {
    side?: typeof sheetSides[number];
}): react_jsx_runtime.JSX.Element;
declare function SheetHeader({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function SheetFooter({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function SheetTitle({ className, ...props }: React$1.ComponentProps<typeof DialogPrimitive.Title>): react_jsx_runtime.JSX.Element;
declare function SheetDescription({ className, ...props }: React$1.ComponentProps<typeof DialogPrimitive.Description>): react_jsx_runtime.JSX.Element;

declare function SheetShowcase(): react_jsx_runtime.JSX.Element;

declare function TooltipProvider({ delayDuration, ...props }: React$1.ComponentProps<typeof TooltipPrimitive.Provider>): react_jsx_runtime.JSX.Element;
declare function Tooltip({ ...props }: React$1.ComponentProps<typeof TooltipPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function TooltipTrigger({ ...props }: React$1.ComponentProps<typeof TooltipPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare const tooltipSides: readonly ["top", "right", "bottom", "left"];
declare function TooltipContent({ className, sideOffset, children, side, ...props }: React$1.ComponentProps<typeof TooltipPrimitive.Content> & {
    side?: typeof tooltipSides[number];
}): react_jsx_runtime.JSX.Element;

declare function TooltipShowcase(): react_jsx_runtime.JSX.Element;

declare function Accordion({ ...props }: React$1.ComponentProps<typeof AccordionPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function AccordionItem({ className, ...props }: React$1.ComponentProps<typeof AccordionPrimitive.Item>): react_jsx_runtime.JSX.Element;
declare function AccordionTrigger({ className, children, ...props }: React$1.ComponentProps<typeof AccordionPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare function AccordionContent({ className, children, ...props }: React$1.ComponentProps<typeof AccordionPrimitive.Content>): react_jsx_runtime.JSX.Element;

declare function AccordionShowcase(): react_jsx_runtime.JSX.Element;

declare function Collapsible({ ...props }: React$1.ComponentProps<typeof CollapsiblePrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function CollapsibleTrigger({ ...props }: React$1.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>): react_jsx_runtime.JSX.Element;
declare function CollapsibleContent({ ...props }: React$1.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>): react_jsx_runtime.JSX.Element;

declare function CollapsibleShowcase(): react_jsx_runtime.JSX.Element;

declare function Command({ className, ...props }: React$1.ComponentProps<typeof Command$1>): react_jsx_runtime.JSX.Element;
declare function CommandDialog({ title, description, children, className, showCloseButton, ...props }: React$1.ComponentProps<typeof Modal> & {
    title?: string;
    description?: string;
    className?: string;
    showCloseButton?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function CommandInput({ className, ...props }: React$1.ComponentProps<typeof Command$1.Input>): react_jsx_runtime.JSX.Element;
declare function CommandList({ className, ...props }: React$1.ComponentProps<typeof Command$1.List>): react_jsx_runtime.JSX.Element;
declare function CommandEmpty({ ...props }: React$1.ComponentProps<typeof Command$1.Empty>): react_jsx_runtime.JSX.Element;
declare function CommandGroup({ className, ...props }: React$1.ComponentProps<typeof Command$1.Group>): react_jsx_runtime.JSX.Element;
declare function CommandSeparator({ className, ...props }: React$1.ComponentProps<typeof Command$1.Separator>): react_jsx_runtime.JSX.Element;
declare function CommandItem({ className, ...props }: React$1.ComponentProps<typeof Command$1.Item>): react_jsx_runtime.JSX.Element;
declare function CommandShortcut({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;

declare function CommandShowcase(): react_jsx_runtime.JSX.Element;

declare function Calendar({ className, classNames, showOutsideDays, captionLayout, buttonVariant, formatters, components, ...props }: React$1.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React$1.ComponentProps<typeof Button>["variant"];
}): react_jsx_runtime.JSX.Element;
declare function CalendarDayButton({ className, day, modifiers, ...props }: React$1.ComponentProps<typeof DayButton>): react_jsx_runtime.JSX.Element;

declare function CalendarShowcase(): react_jsx_runtime.JSX.Element;

declare function DropdownMenu({ ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function DropdownMenuPortal({ ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.Portal>): react_jsx_runtime.JSX.Element;
declare function DropdownMenuTrigger({ ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare function DropdownMenuContent({ className, sideOffset, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.Content>): react_jsx_runtime.JSX.Element;
declare function DropdownMenuGroup({ ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.Group>): react_jsx_runtime.JSX.Element;
declare function DropdownMenuItem({ className, inset, variant, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): react_jsx_runtime.JSX.Element;
declare function DropdownMenuCheckboxItem({ className, children, checked, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>): react_jsx_runtime.JSX.Element;
declare function DropdownMenuRadioGroup({ ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>): react_jsx_runtime.JSX.Element;
declare function DropdownMenuRadioItem({ className, children, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>): react_jsx_runtime.JSX.Element;
declare function DropdownMenuLabel({ className, inset, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function DropdownMenuSeparator({ className, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.Separator>): react_jsx_runtime.JSX.Element;
declare function DropdownMenuShortcut({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
declare function DropdownMenuSub({ ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.Sub>): react_jsx_runtime.JSX.Element;
declare function DropdownMenuSubTrigger({ className, inset, children, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function DropdownMenuSubContent({ className, ...props }: React$1.ComponentProps<typeof DropdownMenuPrimitive.SubContent>): react_jsx_runtime.JSX.Element;

declare function DropdownMenuShowcase(): react_jsx_runtime.JSX.Element;

declare function ContextMenu({ ...props }: React$1.ComponentProps<typeof ContextMenuPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function ContextMenuTrigger({ ...props }: React$1.ComponentProps<typeof ContextMenuPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare function ContextMenuGroup({ ...props }: React$1.ComponentProps<typeof ContextMenuPrimitive.Group>): react_jsx_runtime.JSX.Element;
declare function ContextMenuPortal({ ...props }: React$1.ComponentProps<typeof ContextMenuPrimitive.Portal>): react_jsx_runtime.JSX.Element;
declare function ContextMenuSub({ ...props }: React$1.ComponentProps<typeof ContextMenuPrimitive.Sub>): react_jsx_runtime.JSX.Element;
declare function ContextMenuRadioGroup({ ...props }: React$1.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>): react_jsx_runtime.JSX.Element;
declare function ContextMenuSubTrigger({ className, inset, children, ...props }: React$1.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function ContextMenuSubContent({ className, ...props }: React$1.ComponentProps<typeof ContextMenuPrimitive.SubContent>): react_jsx_runtime.JSX.Element;
declare function ContextMenuContent({ className, ...props }: React$1.ComponentProps<typeof ContextMenuPrimitive.Content>): react_jsx_runtime.JSX.Element;
declare function ContextMenuItem({ className, inset, variant, ...props }: React$1.ComponentProps<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): react_jsx_runtime.JSX.Element;
declare function ContextMenuCheckboxItem({ className, children, checked, ...props }: React$1.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>): react_jsx_runtime.JSX.Element;
declare function ContextMenuRadioItem({ className, children, ...props }: React$1.ComponentProps<typeof ContextMenuPrimitive.RadioItem>): react_jsx_runtime.JSX.Element;
declare function ContextMenuLabel({ className, inset, ...props }: React$1.ComponentProps<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function ContextMenuSeparator({ className, ...props }: React$1.ComponentProps<typeof ContextMenuPrimitive.Separator>): react_jsx_runtime.JSX.Element;
declare function ContextMenuShortcut({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;

declare function ContextMenuShowcase(): react_jsx_runtime.JSX.Element;

declare function Menubar({ className, ...props }: React$1.ComponentProps<typeof MenubarPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function MenubarMenu({ ...props }: React$1.ComponentProps<typeof MenubarPrimitive.Menu>): react_jsx_runtime.JSX.Element;
declare function MenubarGroup({ ...props }: React$1.ComponentProps<typeof MenubarPrimitive.Group>): react_jsx_runtime.JSX.Element;
declare function MenubarPortal({ ...props }: React$1.ComponentProps<typeof MenubarPrimitive.Portal>): react_jsx_runtime.JSX.Element;
declare function MenubarRadioGroup({ ...props }: React$1.ComponentProps<typeof MenubarPrimitive.RadioGroup>): react_jsx_runtime.JSX.Element;
declare function MenubarTrigger({ className, ...props }: React$1.ComponentProps<typeof MenubarPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare function MenubarContent({ className, align, alignOffset, sideOffset, ...props }: React$1.ComponentProps<typeof MenubarPrimitive.Content>): react_jsx_runtime.JSX.Element;
declare function MenubarItem({ className, inset, variant, ...props }: React$1.ComponentProps<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
}): react_jsx_runtime.JSX.Element;
declare function MenubarCheckboxItem({ className, children, checked, ...props }: React$1.ComponentProps<typeof MenubarPrimitive.CheckboxItem>): react_jsx_runtime.JSX.Element;
declare function MenubarRadioItem({ className, children, ...props }: React$1.ComponentProps<typeof MenubarPrimitive.RadioItem>): react_jsx_runtime.JSX.Element;
declare function MenubarLabel({ className, inset, ...props }: React$1.ComponentProps<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function MenubarSeparator({ className, ...props }: React$1.ComponentProps<typeof MenubarPrimitive.Separator>): react_jsx_runtime.JSX.Element;
declare function MenubarShortcut({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
declare function MenubarSub({ ...props }: React$1.ComponentProps<typeof MenubarPrimitive.Sub>): react_jsx_runtime.JSX.Element;
declare function MenubarSubTrigger({ className, inset, children, ...props }: React$1.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function MenubarSubContent({ className, ...props }: React$1.ComponentProps<typeof MenubarPrimitive.SubContent>): react_jsx_runtime.JSX.Element;

declare function MenubarShowcase(): react_jsx_runtime.JSX.Element;

declare function NavigationMenu({ className, children, viewport, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
    viewport?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function NavigationMenuList({ className, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.List>): react_jsx_runtime.JSX.Element;
declare function NavigationMenuItem({ className, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Item>): react_jsx_runtime.JSX.Element;
declare const navigationMenuTriggerStyle: (props?: class_variance_authority_types.ClassProp | undefined) => string;
declare function NavigationMenuTrigger({ className, children, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare function NavigationMenuContent({ className, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Content>): react_jsx_runtime.JSX.Element;
declare function NavigationMenuViewport({ className, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Viewport>): react_jsx_runtime.JSX.Element;
declare function NavigationMenuLink({ className, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Link>): react_jsx_runtime.JSX.Element;
declare function NavigationMenuIndicator({ className, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Indicator>): react_jsx_runtime.JSX.Element;

declare function NavigationMenuShowcase(): react_jsx_runtime.JSX.Element;

declare const Form: <TFieldValues extends FieldValues, TContext = any, TTransformedValues = TFieldValues>(props: react_hook_form.FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React$1.JSX.Element;
declare const FormField: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => react_jsx_runtime.JSX.Element;
declare const useFormField: () => {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: react_hook_form.FieldError;
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
};
declare function FormItem({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function FormLabel({ className, ...props }: React$1.ComponentProps<typeof LabelPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function FormControl({ ...props }: React$1.ComponentProps<typeof Slot>): react_jsx_runtime.JSX.Element;
declare function FormDescription({ className, ...props }: React$1.ComponentProps<"p">): react_jsx_runtime.JSX.Element;
declare function FormMessage({ className, ...props }: React$1.ComponentProps<"p">): react_jsx_runtime.JSX.Element | null;

declare function FormShowcase(): react_jsx_runtime.JSX.Element;

declare function HoverCard({ ...props }: React$1.ComponentProps<typeof HoverCardPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function HoverCardTrigger({ ...props }: React$1.ComponentProps<typeof HoverCardPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare function HoverCardContent({ className, align, sideOffset, ...props }: React$1.ComponentProps<typeof HoverCardPrimitive.Content>): react_jsx_runtime.JSX.Element;

declare function HoverCardShowcase(): react_jsx_runtime.JSX.Element;

declare function AlertDialog({ ...props }: React$1.ComponentProps<typeof AlertDialogPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function AlertDialogTrigger({ ...props }: React$1.ComponentProps<typeof AlertDialogPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare function AlertDialogPortal({ ...props }: React$1.ComponentProps<typeof AlertDialogPrimitive.Portal>): react_jsx_runtime.JSX.Element;
declare function AlertDialogOverlay({ className, ...props }: React$1.ComponentProps<typeof AlertDialogPrimitive.Overlay>): react_jsx_runtime.JSX.Element;
declare function AlertDialogContent({ className, ...props }: React$1.ComponentProps<typeof AlertDialogPrimitive.Content>): react_jsx_runtime.JSX.Element;
declare function AlertDialogHeader({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AlertDialogFooter({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function AlertDialogTitle({ className, ...props }: React$1.ComponentProps<typeof AlertDialogPrimitive.Title>): react_jsx_runtime.JSX.Element;
declare function AlertDialogDescription({ className, ...props }: React$1.ComponentProps<typeof AlertDialogPrimitive.Description>): react_jsx_runtime.JSX.Element;
declare function AlertDialogAction({ className, ...props }: React$1.ComponentProps<typeof AlertDialogPrimitive.Action>): react_jsx_runtime.JSX.Element;
declare function AlertDialogCancel({ className, ...props }: React$1.ComponentProps<typeof AlertDialogPrimitive.Cancel>): react_jsx_runtime.JSX.Element;

declare function AlertDialogShowcase(): react_jsx_runtime.JSX.Element;

declare function Drawer({ ...props }: React$1.ComponentProps<typeof Drawer$1.Root>): react_jsx_runtime.JSX.Element;
declare function DrawerTrigger({ ...props }: React$1.ComponentProps<typeof Drawer$1.Trigger>): react_jsx_runtime.JSX.Element;
declare function DrawerPortal({ ...props }: React$1.ComponentProps<typeof Drawer$1.Portal>): react_jsx_runtime.JSX.Element;
declare function DrawerClose({ ...props }: React$1.ComponentProps<typeof Drawer$1.Close>): react_jsx_runtime.JSX.Element;
declare function DrawerOverlay({ className, ...props }: React$1.ComponentProps<typeof Drawer$1.Overlay>): react_jsx_runtime.JSX.Element;
declare function DrawerContent({ className, children, ...props }: React$1.ComponentProps<typeof Drawer$1.Content>): react_jsx_runtime.JSX.Element;
declare function DrawerHeader({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function DrawerFooter({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function DrawerTitle({ className, ...props }: React$1.ComponentProps<typeof Drawer$1.Title>): react_jsx_runtime.JSX.Element;
declare function DrawerDescription({ className, ...props }: React$1.ComponentProps<typeof Drawer$1.Description>): react_jsx_runtime.JSX.Element;

declare function DrawerShowcase(): react_jsx_runtime.JSX.Element;

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];
type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: "horizontal" | "vertical";
    setApi?: (api: CarouselApi) => void;
};
declare function Carousel({ orientation, opts, setApi, plugins, className, children, ...props }: React$1.ComponentProps<"div"> & CarouselProps): react_jsx_runtime.JSX.Element;
declare function CarouselContent({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CarouselItem({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CarouselPrevious({ className, variant, size, ...props }: React$1.ComponentProps<typeof Button>): react_jsx_runtime.JSX.Element;
declare function CarouselNext({ className, variant, size, ...props }: React$1.ComponentProps<typeof Button>): react_jsx_runtime.JSX.Element;

declare function CarouselShowcase(): react_jsx_runtime.JSX.Element;

declare function InputGroup({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare const inputGroupAddonVariants: (props?: ({
    align?: "inline-start" | "inline-end" | "block-start" | "block-end" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function InputGroupAddon({ className, align, ...props }: React$1.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>): react_jsx_runtime.JSX.Element;
declare const inputGroupButtonVariants: (props?: ({
    size?: "sm" | "icon-sm" | "xs" | "icon-xs" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function InputGroupButton({ className, type, variant, size, ...props }: Omit<React$1.ComponentProps<typeof Button>, "size"> & VariantProps<typeof inputGroupButtonVariants>): react_jsx_runtime.JSX.Element;
declare function InputGroupText({ className, ...props }: React$1.ComponentProps<"span">): react_jsx_runtime.JSX.Element;
declare function InputGroupInput({ className, ...props }: React$1.ComponentProps<typeof TextInput>): react_jsx_runtime.JSX.Element;
declare function InputGroupTextarea({ className, ...props }: React$1.ComponentProps<"textarea">): react_jsx_runtime.JSX.Element;

declare function InputGroupShowcase(): react_jsx_runtime.JSX.Element;

declare function ToggleGroup({ className, variant, size, spacing, children, ...props }: React$1.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants> & {
    spacing?: number;
}): react_jsx_runtime.JSX.Element;
declare function ToggleGroupItem({ className, children, variant, size, ...props }: React$1.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>): react_jsx_runtime.JSX.Element;

declare function ToggleGroupShowcase(): react_jsx_runtime.JSX.Element;

declare const Toaster: ({ ...props }: ToasterProps) => react_jsx_runtime.JSX.Element;

declare function ToasterShowcase(): react_jsx_runtime.JSX.Element;

declare function FieldSet({ className, ...props }: React$1.ComponentProps<"fieldset">): react_jsx_runtime.JSX.Element;
declare function FieldLegend({ className, variant, ...props }: React$1.ComponentProps<"legend"> & {
    variant?: "legend" | "label";
}): react_jsx_runtime.JSX.Element;
declare function FieldGroup({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare const fieldVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | "responsive" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function Field({ className, orientation, ...props }: React$1.ComponentProps<"div"> & VariantProps<typeof fieldVariants>): react_jsx_runtime.JSX.Element;
declare function FieldContent({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function FieldLabel({ className, ...props }: React$1.ComponentProps<typeof Label>): react_jsx_runtime.JSX.Element;
declare function FieldTitle({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function FieldDescription({ className, ...props }: React$1.ComponentProps<"p">): react_jsx_runtime.JSX.Element;
declare function FieldSeparator({ children, className, ...props }: React$1.ComponentProps<"div"> & {
    children?: React$1.ReactNode;
}): react_jsx_runtime.JSX.Element;
declare function FieldError({ className, children, errors, ...props }: React$1.ComponentProps<"div"> & {
    errors?: Array<{
        message?: string;
    } | undefined>;
}): react_jsx_runtime.JSX.Element | null;

declare function FieldShowcase(): react_jsx_runtime.JSX.Element;

declare const THEMES: {
    readonly light: "";
    readonly dark: ".dark";
};
type ChartConfig = {
    [k in string]: {
        label?: React$1.ReactNode;
        icon?: React$1.ComponentType;
    } & ({
        color?: string;
        theme?: never;
    } | {
        color?: never;
        theme: Record<keyof typeof THEMES, string>;
    });
};
type ChartContextProps = {
    config: ChartConfig;
};
declare function useChart(): ChartContextProps;
declare function ChartContainer({ id, className, children, config, ...props }: React$1.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React$1.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
}): react_jsx_runtime.JSX.Element;
declare const ChartStyle: ({ id, config }: {
    id: string;
    config: ChartConfig;
}) => react_jsx_runtime.JSX.Element | null;
declare const ChartTooltip: typeof RechartsPrimitive.Tooltip;
declare function ChartTooltipContent({ active, payload, className, indicator, hideLabel, hideIndicator, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey, }: React$1.ComponentProps<typeof RechartsPrimitive.Tooltip> & React$1.ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
}): react_jsx_runtime.JSX.Element | null;
declare const ChartLegend: typeof RechartsPrimitive.Legend;
declare function ChartLegendContent({ className, hideIcon, payload, verticalAlign, nameKey, }: React$1.ComponentProps<"div"> & Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean;
    nameKey?: string;
}): react_jsx_runtime.JSX.Element | null;

declare function ChartShowcase(): react_jsx_runtime.JSX.Element;

interface FormInputProps extends React$1.ComponentProps<typeof TextInput> {
    label?: string;
    error?: string;
    description?: string;
}
declare function FormInput({ className, label, error, description, id, ...props }: FormInputProps): react_jsx_runtime.JSX.Element;
declare function FormInputShowcase(): react_jsx_runtime.JSX.Element;

interface InlineEditProps {
    value: string;
    onSave: (value: string) => void;
    className?: string;
    placeholder?: string;
}
declare function InlineEdit({ value: initialValue, onSave, className, placeholder, }: InlineEditProps): react_jsx_runtime.JSX.Element;
declare function InlineEditShowcase(): react_jsx_runtime.JSX.Element;

interface ConfirmModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "default" | "destructive";
}
declare function ConfirmModal({ open, onOpenChange, onConfirm, title, description, confirmLabel, cancelLabel, variant, }: ConfirmModalProps): react_jsx_runtime.JSX.Element;
declare function ConfirmModalShowcase(): react_jsx_runtime.JSX.Element;

interface TriggerModalProps {
    trigger: React$1.ReactNode;
    title: string;
    children: React$1.ReactNode;
    footer?: React$1.ReactNode;
}
declare function TriggerModal({ trigger, title, children, footer, }: TriggerModalProps): react_jsx_runtime.JSX.Element;
declare function TriggerModalShowcase(): react_jsx_runtime.JSX.Element;

interface FormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    onSubmit: (data: any) => void;
    children: React$1.ReactNode;
    submitLabel?: string;
    cancelLabel?: string;
}
declare function FormModal({ open, onOpenChange, title, onSubmit, children, submitLabel, cancelLabel, }: FormModalProps): react_jsx_runtime.JSX.Element;
declare function FormModalShowcase(): react_jsx_runtime.JSX.Element;

interface ToastProps {
    title?: string;
    description?: string;
    variant?: "default" | "success" | "error" | "warning";
    className?: string;
}
declare function Toast({ title, description, variant, className, }: ToastProps): react_jsx_runtime.JSX.Element;
declare function ToastShowcase(): react_jsx_runtime.JSX.Element;

interface SnackbarProps {
    message: string;
    action?: React$1.ReactNode;
    variant?: "default" | "success" | "error";
    className?: string;
}
declare function Snackbar({ message, action, variant, className, }: SnackbarProps): react_jsx_runtime.JSX.Element;
declare function SnackbarShowcase(): react_jsx_runtime.JSX.Element;

interface InfoBannerProps {
    message: string;
    variant?: "info" | "warning" | "success";
    className?: string;
}
declare function InfoBanner({ message, variant, className, }: InfoBannerProps): react_jsx_runtime.JSX.Element;
declare function InfoBannerShowcase(): react_jsx_runtime.JSX.Element;

interface StatusTextProps {
    text: string;
    status: "success" | "error" | "warning" | "info";
    className?: string;
}
declare function StatusText({ text, status, className, }: StatusTextProps): react_jsx_runtime.JSX.Element;
declare function StatusTextShowcase(): react_jsx_runtime.JSX.Element;

interface CopyButtonProps extends React$1.ComponentProps<typeof Button> {
    text: string;
    onCopy?: () => void;
}
declare function CopyButton({ text, onCopy, ...props }: CopyButtonProps): react_jsx_runtime.JSX.Element;
declare function CopyButtonShowcase(): react_jsx_runtime.JSX.Element;

interface HistoryControlButtonsProps {
    className?: string;
}
/**
 * History Control Buttons - Library-compatible version
 *
 * Uses browser history API instead of Next.js router for library compatibility.
 * For Next.js apps, you can use next/navigation's useRouter directly.
 */
declare function HistoryControlButtons({ className, }: HistoryControlButtonsProps): react_jsx_runtime.JSX.Element;
declare function HistoryControlButtonsShowcase(): react_jsx_runtime.JSX.Element;

interface StepperProps {
    steps: Array<{
        label: string;
        completed?: boolean;
        active?: boolean;
    }>;
    className?: string;
}
declare function Stepper({ steps, className }: StepperProps): react_jsx_runtime.JSX.Element;
declare function StepperShowcase(): react_jsx_runtime.JSX.Element;

declare function Card({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CardHeader({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CardTitle({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CardDescription({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CardAction({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CardContent({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function CardFooter({ className, ...props }: React$1.ComponentProps<"div">): react_jsx_runtime.JSX.Element;

declare function CardShowcase(): react_jsx_runtime.JSX.Element;

declare function ScrollArea({ className, children, ...props }: React$1.ComponentProps<typeof ScrollAreaPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function ScrollBar({ className, orientation, ...props }: React$1.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>): react_jsx_runtime.JSX.Element;

declare function ScrollAreaShowcase(): react_jsx_runtime.JSX.Element;

declare function AspectRatio({ ...props }: React.ComponentProps<typeof AspectRatioPrimitive.Root>): react_jsx_runtime.JSX.Element;

declare function AspectRatioShowcase(): react_jsx_runtime.JSX.Element;

declare function Table({ className, ...props }: React$1.ComponentProps<"table">): react_jsx_runtime.JSX.Element;
declare function TableHeader({ className, ...props }: React$1.ComponentProps<"thead">): react_jsx_runtime.JSX.Element;
declare function TableBody({ className, ...props }: React$1.ComponentProps<"tbody">): react_jsx_runtime.JSX.Element;
declare function TableFooter({ className, ...props }: React$1.ComponentProps<"tfoot">): react_jsx_runtime.JSX.Element;
declare function TableRow({ className, ...props }: React$1.ComponentProps<"tr">): react_jsx_runtime.JSX.Element;
declare function TableHead({ className, ...props }: React$1.ComponentProps<"th">): react_jsx_runtime.JSX.Element;
declare function TableCell({ className, ...props }: React$1.ComponentProps<"td">): react_jsx_runtime.JSX.Element;
declare function TableCaption({ className, ...props }: React$1.ComponentProps<"caption">): react_jsx_runtime.JSX.Element;

declare function TableShowcase(): react_jsx_runtime.JSX.Element;

declare function ResizablePanelGroup({ className, ...props }: React$1.ComponentProps<typeof ResizablePrimitive.PanelGroup>): react_jsx_runtime.JSX.Element;
declare function ResizablePanel({ ...props }: React$1.ComponentProps<typeof ResizablePrimitive.Panel>): react_jsx_runtime.JSX.Element;
declare function ResizableHandle({ withHandle, className, ...props }: React$1.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
    withHandle?: boolean;
}): react_jsx_runtime.JSX.Element;

declare function ResizableShowcase(): react_jsx_runtime.JSX.Element;

type SidebarContextProps = {
    state: "expanded" | "collapsed";
    open: boolean;
    setOpen: (open: boolean) => void;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
};
declare function useSidebar(): SidebarContextProps;
declare function SidebarProvider({ defaultOpen, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }: ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}): react_jsx_runtime.JSX.Element;
declare function Sidebar({ side, variant, collapsible, className, children, ...props }: ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
}): react_jsx_runtime.JSX.Element;
declare function SidebarTrigger({ className, onClick, ...props }: ComponentProps<typeof Button>): react_jsx_runtime.JSX.Element;
declare function SidebarRail({ className, ...props }: ComponentProps<"button">): react_jsx_runtime.JSX.Element;
declare function SidebarInset({ className, ...props }: ComponentProps<"main">): react_jsx_runtime.JSX.Element;
declare function SidebarInput({ className, ...props }: ComponentProps<typeof TextInput>): react_jsx_runtime.JSX.Element;
declare function SidebarHeader({ className, ...props }: ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function SidebarFooter({ className, ...props }: ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function SidebarSeparator({ className, ...props }: ComponentProps<typeof Separator>): react_jsx_runtime.JSX.Element;
declare function SidebarContent({ className, ...props }: ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function SidebarGroup({ className, ...props }: ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function SidebarGroupLabel({ className, asChild, ...props }: ComponentProps<"div"> & {
    asChild?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function SidebarGroupAction({ className, asChild, ...props }: ComponentProps<"button"> & {
    asChild?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function SidebarGroupContent({ className, ...props }: ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function SidebarMenu({ className, ...props }: ComponentProps<"ul">): react_jsx_runtime.JSX.Element;
declare function SidebarMenuItem({ className, ...props }: ComponentProps<"li">): react_jsx_runtime.JSX.Element;
declare const sidebarMenuButtonVariants: (props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function SidebarMenuButton({ asChild, isActive, variant, size, tooltip, className, ...props }: ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>): react_jsx_runtime.JSX.Element;
declare function SidebarMenuAction({ className, asChild, showOnHover, ...props }: ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function SidebarMenuBadge({ className, ...props }: ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function SidebarMenuSkeleton({ className, showIcon, ...props }: ComponentProps<"div"> & {
    showIcon?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function SidebarMenuSub({ className, ...props }: ComponentProps<"ul">): react_jsx_runtime.JSX.Element;
declare function SidebarMenuSubItem({ className, ...props }: ComponentProps<"li">): react_jsx_runtime.JSX.Element;
declare function SidebarMenuSubButton({ asChild, size, isActive, className, ...props }: ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
}): react_jsx_runtime.JSX.Element;

declare function SidebarShowcase(): react_jsx_runtime.JSX.Element;

interface ContainerProps extends React$1.HTMLAttributes<HTMLDivElement> {
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}
declare function Container({ className, maxWidth, ...props }: ContainerProps): react_jsx_runtime.JSX.Element;
declare function ContainerShowcase(): react_jsx_runtime.JSX.Element;

interface StackProps$1 extends React$1.HTMLAttributes<HTMLDivElement> {
    direction?: "row" | "column";
    spacing?: "none" | "sm" | "md" | "lg";
    align?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "end" | "between" | "around";
}
declare function Stack$1({ className, direction, spacing, align, justify, ...props }: StackProps$1): react_jsx_runtime.JSX.Element;
declare function StackShowcase(): react_jsx_runtime.JSX.Element;

interface GridProps extends React$1.HTMLAttributes<HTMLDivElement> {
    cols?: 1 | 2 | 3 | 4 | 6 | 12;
    gap?: "none" | "sm" | "md" | "lg";
}
declare function Grid({ className, cols, gap, ...props }: GridProps): react_jsx_runtime.JSX.Element;
declare function GridShowcase(): react_jsx_runtime.JSX.Element;

interface BoxProps$1 extends React$1.HTMLAttributes<HTMLDivElement> {
    as?: React$1.ElementType;
}
declare function Box$1({ className, as: Component, ...props }: BoxProps$1): react_jsx_runtime.JSX.Element;
declare function BoxShowcase(): react_jsx_runtime.JSX.Element;

interface ListProps extends React$1.HTMLAttributes<HTMLUListElement> {
    variant?: "ordered" | "unordered";
}
declare function List({ className, variant, ...props }: ListProps): react_jsx_runtime.JSX.Element;
declare function ListShowcase(): react_jsx_runtime.JSX.Element;

interface HeaderProps extends React$1.HTMLAttributes<HTMLElement> {
    sticky?: boolean;
}
declare function Header({ className, sticky, ...props }: HeaderProps): react_jsx_runtime.JSX.Element;
declare function HeaderShowcase(): react_jsx_runtime.JSX.Element;

interface FooterProps extends React$1.HTMLAttributes<HTMLElement> {
}
declare function Footer({ className, ...props }: FooterProps): react_jsx_runtime.JSX.Element;
declare function FooterShowcase(): react_jsx_runtime.JSX.Element;

interface CollapsiblePanelProps {
    title: string;
    children: React$1.ReactNode;
    defaultOpen?: boolean;
    className?: string;
}
declare function CollapsiblePanel({ title, children, defaultOpen, className, }: CollapsiblePanelProps): react_jsx_runtime.JSX.Element;
declare function CollapsiblePanelShowcase(): react_jsx_runtime.JSX.Element;

interface ResizeContainerProps {
    children: React$1.ReactNode;
    direction?: "horizontal" | "vertical";
    className?: string;
}
declare function ResizeContainer({ children, direction, className, }: ResizeContainerProps): react_jsx_runtime.JSX.Element;
declare function ResizeContainerShowcase(): react_jsx_runtime.JSX.Element;

interface EmptyScreenProps {
    title?: string;
    description?: string;
    icon?: React$1.ReactNode;
    action?: React$1.ReactNode;
    className?: string;
}
declare function EmptyScreen({ title, description, icon, action, className, }: EmptyScreenProps): react_jsx_runtime.JSX.Element;
declare function EmptyScreenShowcase(): react_jsx_runtime.JSX.Element;

interface BoxProps extends React$1.HTMLAttributes<HTMLDivElement> {
    as?: React$1.ElementType;
}
declare function Box({ className, as: Component, ...props }: BoxProps): react_jsx_runtime.JSX.Element;

interface FlexProps extends React$1.HTMLAttributes<HTMLDivElement> {
    direction?: "row" | "column" | "row-reverse" | "column-reverse";
    wrap?: boolean;
    gap?: "none" | "sm" | "md" | "lg";
}
declare function Flex({ className, direction, wrap, gap, ...props }: FlexProps): react_jsx_runtime.JSX.Element;

interface StackProps extends React$1.HTMLAttributes<HTMLDivElement> {
    spacing?: "none" | "sm" | "md" | "lg";
}
declare function Stack({ className, spacing, ...props }: StackProps): react_jsx_runtime.JSX.Element;

interface TextProps extends React$1.HTMLAttributes<HTMLElement> {
    as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
    weight?: "normal" | "medium" | "semibold" | "bold";
}
declare function Text({ className, as: Component, size, weight, ...props }: TextProps): react_jsx_runtime.JSX.Element;

interface IconProps {
    icon: LucideIcon;
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
}
declare function Icon({ icon: IconComponent, size, className, }: IconProps): react_jsx_runtime.JSX.Element;

interface VisuallyHiddenProps extends React$1.HTMLAttributes<HTMLSpanElement> {
}
declare function VisuallyHidden({ className, ...props }: VisuallyHiddenProps): react_jsx_runtime.JSX.Element;

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
type ThemeMetadata = {
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
    getAvailableThemes: (category: string) => Promise<Record<string, ThemeMetadata>>;
};

declare function useThemeToggle(): {
    selectedThemes: ThemeSelection;
    isLoading: boolean;
    getAvailableThemes: (category: string) => Promise<Record<string, src.ThemeMetadata>>;
    isOpen: boolean;
    selectedCategory: string | null;
    themeCategories: any;
    categories: [string, {
        name: string;
        themes: Record<string, any>;
        order?: number;
    }][];
    menuRef: React$1.RefObject<HTMLDivElement | null>;
    handleCategoryClick: (categoryKey: string) => void;
    handleThemeSelect: (category: keyof ThemeSelection, themeId: string) => Promise<void>;
    handleBack: () => void;
    toggleMenu: () => void;
};

/**
 * Register a custom theme dynamically
 * Allows users to add themes without modifying the base config
 * @param {string} category - Theme category (e.g., 'color', 'custom')
 * @param {string} themeId - Unique theme identifier
 * @param {Object} metadata - Theme metadata
 * @param {string} metadata.name - Display name
 * @param {string} metadata.file - File path relative to themes/ (e.g., 'color/blue.json')
 * @param {string} [metadata.icon] - Icon emoji or character
 * @param {string} [metadata.description] - Theme description
 */
declare function registerTheme(category: string, themeId: string, metadata: {
    name: string;
    file: string;
    icon?: string | undefined;
    description?: string | undefined;
}): any;
/**
 * Get merged theme categories (base + discovered)
 */
declare function getThemeCategories(): Promise<any>;
/**
 * Get theme file path
 */
declare function getThemeFilePath(category: any, themeId: any): string | null;
/**
 * Get all themes for a category
 */
declare function getThemesForCategory(category: any): Promise<any>;
/**
 * Get theme by ID
 */
declare function getTheme(category: any, themeId: any): Promise<any>;

/**
 * Discover themes by attempting to load token files
 * Scans common theme patterns and registers them if found
 */
declare function discoverTokenFiles(): Promise<{
    category: string;
    themeName: any;
    path: string;
}[]>;
/**
 * Scan a specific category directory for theme files
 * Useful for discovering user-added themes
 */
declare function scanCategory(category: any): Promise<{
    category: any;
    name: string;
    path: string;
}[]>;
/**
 * Register a theme from a token file
 * Call this when you add a new token file to make it appear in ThemeToggle
 */
declare function registerThemeFromFile(category: any, themeId: any, filePath: any): Promise<{
    success: boolean;
    themeId: any;
    category: any;
}>;

export { Accordion, AccordionContent, AccordionItem, AccordionShowcase, AccordionTrigger, Alert, AlertDescription, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogShowcase, AlertDialogTitle, AlertDialogTrigger, AlertShowcase, AlertTitle, AspectRatio, AspectRatioShowcase, Avatar, AvatarFallback, AvatarImage, AvatarShowcase, Badge, BadgeShowcase, Box$1 as Box, type BoxProps$1 as BoxProps, BoxShowcase, Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbShowcase, Button, ButtonShowcase, Calendar, CalendarDayButton, CalendarShowcase, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardShowcase, CardTitle, Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselShowcase, type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartShowcase, ChartStyle, ChartTooltip, ChartTooltipContent, Checkbox, CheckboxShowcase, Collapsible, CollapsibleContent, CollapsiblePanel, type CollapsiblePanelProps, CollapsiblePanelShowcase, CollapsibleShowcase, CollapsibleTrigger, Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut, CommandShowcase, ConfirmModal, type ConfirmModalProps, ConfirmModalShowcase, Container, type ContainerProps, ContainerShowcase, ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuShowcase, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger, CopyButton, type CopyButtonProps, CopyButtonShowcase, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerShowcase, DrawerTitle, DrawerTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuShowcase, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyScreen, type EmptyScreenProps, EmptyScreenShowcase, EmptyShowcase, EmptyTitle, ErrorBoundary, ErrorBoundaryShowcase, Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldShowcase, FieldTitle, Footer, type FooterProps, FooterShowcase, Form, FormControl, FormDescription, FormField, FormInput, type FormInputProps, FormInputShowcase, FormItem, FormLabel, FormMessage, FormModal, type FormModalProps, FormModalShowcase, FormShowcase, Grid, type GridProps, GridShowcase, Header, type HeaderProps, HeaderShowcase, HistoryControlButtons, type HistoryControlButtonsProps, HistoryControlButtonsShowcase, HoverCard, HoverCardContent, HoverCardShowcase, HoverCardTrigger, Icon, type IconProps, Image, type ImageProps, ImageShowcase, InfoBanner, type InfoBannerProps, InfoBannerShowcase, InlineEdit, type InlineEditProps, InlineEditShowcase, InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupShowcase, InputGroupText, InputGroupTextarea, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPShowcase, InputOTPSlot, Kbd, KbdGroup, KbdShowcase, Label, LabelShowcase, List, type ListProps, ListShowcase, Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarPortal, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarShowcase, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger, Modal, ModalClose, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalOverlay, ModalPortal, ModalShowcase, ModalTitle, ModalTrigger, NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuShowcase, NavigationMenuTrigger, NavigationMenuViewport, Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationShowcase, Popover, PopoverAnchor, PopoverContent, PopoverShowcase, PopoverTrigger, Box as PrimitiveBox, type BoxProps as PrimitiveBoxProps, Flex as PrimitiveFlex, type FlexProps as PrimitiveFlexProps, Stack as PrimitiveStack, type StackProps as PrimitiveStackProps, Text as PrimitiveText, type TextProps as PrimitiveTextProps, Progress, ProgressShowcase, Radio, RadioItem, RadioShowcase, ResizableHandle, ResizablePanel, ResizablePanelGroup, ResizableShowcase, ResizeContainer, type ResizeContainerProps, ResizeContainerShowcase, ScrollArea, ScrollAreaShowcase, ScrollBar, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectShowcase, SelectTrigger, SelectValue, Separator, SeparatorShowcase, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetShowcase, SheetTitle, SheetTrigger, Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarShowcase, SidebarTrigger, Skeleton, SkeletonShowcase, Slider, SliderShowcase, Snackbar, type SnackbarProps, SnackbarShowcase, Spinner, SpinnerShowcase, Stack$1 as Stack, type StackProps$1 as StackProps, StackShowcase, StatusText, type StatusTextProps, StatusTextShowcase, Stepper, type StepperProps, StepperShowcase, Switch, SwitchShowcase, Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, TableShowcase, Tabs, TabsContent, TabsList, TabsShowcase, TabsTrigger, Text$1 as Text, TextInput, TextInputShowcase, type TextProps$1 as TextProps, TextShowcase, Textarea, TextareaShowcase, type ThemeMetadata, type ThemeSelection, ThemeToggle, type ThemeToggleProps, Toast, type ToastProps, ToastShowcase, Toaster, ToasterShowcase, Toggle, ToggleGroup, ToggleGroupItem, ToggleGroupShowcase, ToggleShowcase, Tooltip, TooltipContent, TooltipProvider, TooltipShowcase, TooltipTrigger, TriggerModal, type TriggerModalProps, TriggerModalShowcase, Upload, type UploadProps, UploadShowcase, VisuallyHidden, type VisuallyHiddenProps, alertVariants, badgeVariants, buttonVariants, discoverTokenFiles, emptyMediaVariants, fieldVariants, getTheme, getThemeCategories, getThemeFilePath, getThemesForCategory, navigationMenuTriggerStyle, registerTheme, registerThemeFromFile, scanCategory, toggleVariants, useChart, useFormField, useSidebar, useTheme, useThemeToggle };
