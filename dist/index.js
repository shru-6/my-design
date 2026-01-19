'use strict';

var React15 = require('react');
var reactSlot = require('@radix-ui/react-slot');
var classVarianceAuthority = require('class-variance-authority');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var jsxRuntime = require('react/jsx-runtime');
var LabelPrimitive = require('@radix-ui/react-label');
var SeparatorPrimitive = require('@radix-ui/react-separator');
var CheckboxPrimitive = require('@radix-ui/react-checkbox');
var lucideReact = require('lucide-react');
var AvatarPrimitive = require('@radix-ui/react-avatar');
var ProgressPrimitive = require('@radix-ui/react-progress');
var RadioGroupPrimitive = require('@radix-ui/react-radio-group');
var SliderPrimitive = require('@radix-ui/react-slider');
var SwitchPrimitive = require('@radix-ui/react-switch');
var TogglePrimitive = require('@radix-ui/react-toggle');
var inputOtp = require('input-otp');
var DialogPrimitive = require('@radix-ui/react-dialog');
var SelectPrimitive = require('@radix-ui/react-select');
var TooltipPrimitive = require('@radix-ui/react-tooltip');
var AccordionPrimitive = require('@radix-ui/react-accordion');
var AlertDialogPrimitive = require('@radix-ui/react-alert-dialog');
var CollapsiblePrimitive = require('@radix-ui/react-collapsible');
var PopoverPrimitive = require('@radix-ui/react-popover');
var DropdownMenuPrimitive = require('@radix-ui/react-dropdown-menu');
var TabsPrimitive = require('@radix-ui/react-tabs');
var vaul = require('vaul');
var HoverCardPrimitive = require('@radix-ui/react-hover-card');
var ToggleGroupPrimitive = require('@radix-ui/react-toggle-group');
var ContextMenuPrimitive = require('@radix-ui/react-context-menu');
var cmdk = require('cmdk');
var reactDayPicker = require('react-day-picker');
var MenubarPrimitive = require('@radix-ui/react-menubar');
var NavigationMenuPrimitive = require('@radix-ui/react-navigation-menu');
var useEmblaCarousel = require('embla-carousel-react');
var reactHookForm = require('react-hook-form');
var RechartsPrimitive = require('recharts');
var sonner = require('sonner');
var AspectRatioPrimitive = require('@radix-ui/react-aspect-ratio');
var ScrollAreaPrimitive = require('@radix-ui/react-scroll-area');
var ResizablePrimitive = require('react-resizable-panels');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React15__namespace = /*#__PURE__*/_interopNamespace(React15);
var LabelPrimitive__namespace = /*#__PURE__*/_interopNamespace(LabelPrimitive);
var SeparatorPrimitive__namespace = /*#__PURE__*/_interopNamespace(SeparatorPrimitive);
var CheckboxPrimitive__namespace = /*#__PURE__*/_interopNamespace(CheckboxPrimitive);
var AvatarPrimitive__namespace = /*#__PURE__*/_interopNamespace(AvatarPrimitive);
var ProgressPrimitive__namespace = /*#__PURE__*/_interopNamespace(ProgressPrimitive);
var RadioGroupPrimitive__namespace = /*#__PURE__*/_interopNamespace(RadioGroupPrimitive);
var SliderPrimitive__namespace = /*#__PURE__*/_interopNamespace(SliderPrimitive);
var SwitchPrimitive__namespace = /*#__PURE__*/_interopNamespace(SwitchPrimitive);
var TogglePrimitive__namespace = /*#__PURE__*/_interopNamespace(TogglePrimitive);
var DialogPrimitive__namespace = /*#__PURE__*/_interopNamespace(DialogPrimitive);
var SelectPrimitive__namespace = /*#__PURE__*/_interopNamespace(SelectPrimitive);
var TooltipPrimitive__namespace = /*#__PURE__*/_interopNamespace(TooltipPrimitive);
var AccordionPrimitive__namespace = /*#__PURE__*/_interopNamespace(AccordionPrimitive);
var AlertDialogPrimitive__namespace = /*#__PURE__*/_interopNamespace(AlertDialogPrimitive);
var CollapsiblePrimitive__namespace = /*#__PURE__*/_interopNamespace(CollapsiblePrimitive);
var PopoverPrimitive__namespace = /*#__PURE__*/_interopNamespace(PopoverPrimitive);
var DropdownMenuPrimitive__namespace = /*#__PURE__*/_interopNamespace(DropdownMenuPrimitive);
var TabsPrimitive__namespace = /*#__PURE__*/_interopNamespace(TabsPrimitive);
var HoverCardPrimitive__namespace = /*#__PURE__*/_interopNamespace(HoverCardPrimitive);
var ToggleGroupPrimitive__namespace = /*#__PURE__*/_interopNamespace(ToggleGroupPrimitive);
var ContextMenuPrimitive__namespace = /*#__PURE__*/_interopNamespace(ContextMenuPrimitive);
var MenubarPrimitive__namespace = /*#__PURE__*/_interopNamespace(MenubarPrimitive);
var NavigationMenuPrimitive__namespace = /*#__PURE__*/_interopNamespace(NavigationMenuPrimitive);
var useEmblaCarousel__default = /*#__PURE__*/_interopDefault(useEmblaCarousel);
var RechartsPrimitive__namespace = /*#__PURE__*/_interopNamespace(RechartsPrimitive);
var AspectRatioPrimitive__namespace = /*#__PURE__*/_interopNamespace(AspectRatioPrimitive);
var ScrollAreaPrimitive__namespace = /*#__PURE__*/_interopNamespace(ScrollAreaPrimitive);
var ResizablePrimitive__namespace = /*#__PURE__*/_interopNamespace(ResizablePrimitive);

// src/atoms/Button.tsx
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
var buttonVariantsConfig = {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3 gap-component-sm",
      sm: "h-8 rounded-md gap-component-xs px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4 gap-component-md",
      icon: "size-9",
      "icon-sm": "size-8",
      "icon-lg": "size-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
};
var buttonVariants = classVarianceAuthority.cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium font-sans transition-all duration-normal disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  buttonVariantsConfig
);
var Button = React15__namespace.forwardRef(({ className, variant, size, asChild = false, stopPropagation, onClick, ...props }, ref) => {
  const Comp = asChild ? reactSlot.Slot : "button";
  const handleClick = (e) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    onClick?.(e);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      ref,
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size }), className),
      onClick: handleClick,
      ...props
    }
  );
});
Button.displayName = "Button";
var badgeVariantsConfig = {
  variants: {
    variant: {
      default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
      secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
      destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      disabled: "border-transparent bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
    }
  },
  defaultVariants: {
    variant: "default"
  }
};
var badgeVariants = classVarianceAuthority.cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium font-sans w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-component-xs [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] duration-normal overflow-hidden",
  badgeVariantsConfig
);
var Badge = React15__namespace.forwardRef(({ className, variant, asChild = false, onClick, ...props }, ref) => {
  const Comp = asChild ? reactSlot.Slot : "span";
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      ref,
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), onClick && "cursor-pointer", className),
      onClick,
      ...props
    }
  );
});
Badge.displayName = "Badge";
var TextInput = React15__namespace.forwardRef(
  ({ className, type = "text", ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        ref,
        type,
        "data-slot": "text-input",
        className: cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] duration-normal outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium font-sans disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        ),
        ...props
      }
    );
  }
);
TextInput.displayName = "TextInput";
var Label = React15__namespace.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    LabelPrimitive__namespace.Root,
    {
      ref,
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
});
Label.displayName = "Label";
var Textarea = React15__namespace.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "textarea",
      {
        ref,
        "data-slot": "textarea",
        className: cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] duration-normal outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm font-sans",
          className
        ),
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
var Separator = React15__namespace.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    SeparatorPrimitive__namespace.Root,
    {
      ref,
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
});
Separator.displayName = "Separator";
var Checkbox = React15__namespace.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    CheckboxPrimitive__namespace.Root,
    {
      ref,
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        CheckboxPrimitive__namespace.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none",
          children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CheckIcon, { className: "size-3.5" })
        }
      )
    }
  );
});
Checkbox.displayName = "Checkbox";
var alertVariantsConfig = {
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
      destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      error: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
    }
  },
  defaultVariants: {
    variant: "default"
  }
};
var alertVariants = classVarianceAuthority.cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  alertVariantsConfig
);
function Alert({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: cn(alertVariants({ variant }), className),
      ...props
    }
  );
}
function AlertTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "alert-title",
      className: cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      ),
      ...props
    }
  );
}
function AlertDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "alert-description",
      className: cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      ),
      ...props
    }
  );
}
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AvatarPrimitive__namespace.Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AvatarPrimitive__namespace.Image,
    {
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AvatarPrimitive__namespace.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ProgressPrimitive__namespace.Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        ProgressPrimitive__namespace.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
function Radio({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    RadioGroupPrimitive__namespace.Root,
    {
      "data-slot": "radio",
      className: cn("grid gap-3", className),
      ...props
    }
  );
}
function RadioItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    RadioGroupPrimitive__namespace.Item,
    {
      "data-slot": "radio-item",
      className: cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        RadioGroupPrimitive__namespace.Indicator,
        {
          "data-slot": "radio-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CircleIcon, { className: "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" })
        }
      )
    }
  );
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-skeleton animate-pulse rounded-md", className),
      ...props
    }
  );
}
function SkeletonGrid({
  count = 6,
  cols = { default: 1, md: 2, lg: 3 },
  className,
  renderSkeleton
}) {
  const defaultSkeleton = () => /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-32" });
  const skeleton = renderSkeleton || defaultSkeleton;
  const colMap = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6"
  };
  const gridClasses = cn(
    "grid gap-4",
    cols.default && colMap[cols.default],
    cols.md && `md:${colMap[cols.md]}`,
    cols.lg && `lg:${colMap[cols.lg]}`,
    className
  );
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: gridClasses, "data-slot": "skeleton-grid", children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ jsxRuntime.jsx(React15__namespace.Fragment, { children: skeleton() }, i)) });
}
function SkeletonText({
  lines = 3,
  className,
  lineHeight = "md",
  lastLineWidth = "3/4"
}) {
  const heightClasses = {
    sm: "h-3",
    md: "h-4",
    lg: "h-5"
  };
  const widthClasses = {
    full: "w-full",
    "3/4": "w-3/4",
    "1/2": "w-1/2"
  };
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("space-y-2", className), "data-slot": "skeleton-text", children: Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ jsxRuntime.jsx(
    Skeleton,
    {
      className: cn(
        heightClasses[lineHeight],
        i === lines - 1 && widthClasses[lastLineWidth],
        i < lines - 1 && "w-full"
      )
    },
    i
  )) });
}
function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  orientation = "horizontal",
  ...props
}) {
  const _values = React15__namespace.useMemo(
    () => Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max],
    [value, defaultValue, min, max]
  );
  return /* @__PURE__ */ jsxRuntime.jsxs(
    SliderPrimitive__namespace.Root,
    {
      "data-slot": "slider",
      defaultValue,
      value,
      min,
      max,
      orientation,
      className: cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          SliderPrimitive__namespace.Track,
          {
            "data-slot": "slider-track",
            className: cn(
              "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ jsxRuntime.jsx(
              SliderPrimitive__namespace.Range,
              {
                "data-slot": "slider-range",
                className: cn(
                  "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: _values.length }, (_, index) => /* @__PURE__ */ jsxRuntime.jsx(
          SliderPrimitive__namespace.Thumb,
          {
            "data-slot": "slider-thumb",
            className: "border-primary ring-ring/50 block size-4 shrink-0 rounded-full border bg-white shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          },
          index
        ))
      ]
    }
  );
}
function Spinner({
  className,
  size = "default",
  ...props
}) {
  const sizeClasses = {
    sm: "size-3",
    default: "size-4",
    lg: "size-6"
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    lucideReact.Loader2Icon,
    {
      role: "status",
      "aria-label": "Loading",
      className: cn("animate-spin", sizeClasses[size], className),
      ...props
    }
  );
}
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    SwitchPrimitive__namespace.Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        SwitchPrimitive__namespace.Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
var toggleVariantsConfig = {
  variants: {
    variant: {
      default: "bg-transparent",
      outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
    },
    size: {
      default: "h-9 px-2 min-w-9",
      sm: "h-8 px-1.5 min-w-8",
      lg: "h-10 px-2.5 min-w-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
};
var toggleVariants = classVarianceAuthority.cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  toggleVariantsConfig
);
function Toggle({
  className,
  variant,
  size,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    TogglePrimitive__namespace.Root,
    {
      "data-slot": "toggle",
      className: cn(toggleVariants({ variant, size }), className),
      ...props
    }
  );
}
function Empty({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "empty",
      className: cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        className
      ),
      ...props
    }
  );
}
function EmptyHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "empty-header",
      className: cn(
        "flex max-w-sm flex-col items-center gap-2 text-center",
        className
      ),
      ...props
    }
  );
}
var emptyMediaVariantsConfig = {
  variants: {
    variant: {
      default: "bg-transparent",
      icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6"
    }
  },
  defaultVariants: {
    variant: "default"
  }
};
var emptyMediaVariants = classVarianceAuthority.cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  emptyMediaVariantsConfig
);
function EmptyMedia({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": variant,
      className: cn(emptyMediaVariants({ variant, className })),
      ...props
    }
  );
}
function EmptyTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "empty-title",
      className: cn("text-lg font-medium tracking-tight", className),
      ...props
    }
  );
}
function EmptyDescription({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "empty-description",
      className: cn(
        "text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
        className
      ),
      ...props
    }
  );
}
function EmptyContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "empty-content",
      className: cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        className
      ),
      ...props
    }
  );
}
function Text({
  className,
  variant = "default",
  as: Component2 = "p",
  leftIcon,
  rightIcon,
  children,
  ...props
}) {
  const hasIcons = leftIcon || rightIcon;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    Component2,
    {
      "data-slot": "text",
      className: cn(
        "text-foreground",
        variant === "muted" && "text-muted-foreground",
        variant === "small" && "text-sm",
        variant === "large" && "text-lg",
        hasIcons && "flex items-center gap-2",
        className
      ),
      ...props,
      children: [
        leftIcon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", children: leftIcon }),
        children,
        rightIcon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0", children: rightIcon })
      ]
    }
  );
}
function InputOTP({
  className,
  containerClassName,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    inputOtp.OTPInput,
    {
      "data-slot": "input-otp",
      containerClassName: cn(
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      ),
      className: cn("disabled:cursor-not-allowed", className),
      ...props
    }
  );
}
function InputOTPGroup({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "input-otp-group",
      className: cn("flex items-center", className),
      ...props
    }
  );
}
function InputOTPSlot({
  index,
  className,
  ...props
}) {
  const inputOTPContext = React15__namespace.useContext(inputOtp.OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      "data-slot": "input-otp-slot",
      "data-active": isActive,
      className: cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className
      ),
      ...props,
      children: [
        char,
        hasFakeCaret && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "animate-caret-blink bg-foreground h-4 w-px duration-1000" }) })
      ]
    }
  );
}
function InputOTPSeparator({ ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { "data-slot": "input-otp-separator", role: "separator", ...props, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.MinusIcon, {}) });
}
function Kbd({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "kbd",
    {
      "data-slot": "kbd",
      className: cn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium select-none",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className
      ),
      ...props
    }
  );
}
function KbdGroup({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: cn("inline-flex items-center gap-1", className),
      ...props
    }
  );
}
function Image2({
  className,
  fallback,
  alt,
  src,
  width,
  height,
  loading = "lazy",
  ...props
}) {
  const [hasError, setHasError] = React15__namespace.useState(false);
  if (!src || src.trim() === "") {
    if (fallback) {
      return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: fallback });
    }
    return null;
  }
  if (hasError && fallback) {
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: fallback });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "img",
    {
      "data-slot": "image",
      className: cn("object-cover", className),
      alt: alt || "",
      src,
      width,
      height,
      loading,
      onError: () => setHasError(true),
      ...props
    }
  );
}
function Upload({
  className,
  onUpload,
  onChange,
  ...props
}) {
  const handleChange = (e) => {
    onChange?.(e);
    onUpload?.(e.target.files);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    "input",
    {
      type: "file",
      "data-slot": "upload",
      className: cn(
        "file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90",
        className
      ),
      onChange: handleChange,
      ...props
    }
  );
}
var ErrorBoundary = class extends React15__namespace.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: this.props.fallback });
      }
      return /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          "data-slot": "error-boundary",
          className: cn(
            "flex flex-col items-center justify-center p-8 text-center",
            this.props.className
          ),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-lg font-semibold text-destructive", children: "Something went wrong" }),
            this.state.error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: this.state.error.message })
          ]
        }
      );
    }
    return this.props.children;
  }
};
var cardVariants = classVarianceAuthority.cva(
  "bg-card text-card-foreground flex flex-col rounded-lg border shadow-sm overflow-hidden",
  {
    variants: {
      variant: {
        minimal: "border-0 shadow-none bg-transparent",
        filled: "bg-muted border-0 text-muted-foreground",
        subtle: "bg-muted/30 border-muted/50 text-foreground",
        outlined: "bg-background border-border text-foreground"
      },
      size: {
        xs: "gap-0",
        sm: "gap-0",
        md: "gap-0",
        lg: "gap-0"
      }
    },
    defaultVariants: {
      variant: "outlined",
      size: "md"
    }
  }
);
var cardSizeVariants = classVarianceAuthority.cva("", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
function Card({
  className,
  variant,
  size,
  header,
  footer,
  children,
  maxHeight,
  maxWidth,
  contentHeight,
  interactive,
  onClick,
  ...props
}) {
  const handleClick = (e) => {
    if (interactive && onClick) {
      e.stopPropagation();
      onClick(e);
    } else if (onClick) {
      onClick(e);
    }
  };
  const style = {};
  if (maxHeight) {
    style.maxHeight = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;
  }
  if (maxWidth) {
    style.maxWidth = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      "data-slot": "card",
      className: cn(
        cardVariants({ variant, size }),
        interactive && "cursor-pointer transition-all hover:shadow-md",
        className
      ),
      style,
      onClick: handleClick,
      ...props,
      children: [
        header && /* @__PURE__ */ jsxRuntime.jsx(CardHeader, { size, children: header }),
        /* @__PURE__ */ jsxRuntime.jsx(
          CardContent,
          {
            size,
            style: contentHeight ? {
              height: typeof contentHeight === "number" ? `${contentHeight}px` : contentHeight
            } : void 0,
            children
          }
        ),
        footer && /* @__PURE__ */ jsxRuntime.jsx(CardFooter, { size, children: footer })
      ]
    }
  );
}
function CardHeader({
  className,
  size,
  left,
  right,
  children,
  ...props
}) {
  const sizePadding = {
    xs: "py-1.5 px-2",
    sm: "py-2 px-3",
    md: "py-3 px-4",
    lg: "py-4 px-6"
  };
  const effectiveSize = size || "md";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "flex items-center justify-between",
        "sticky top-0 z-10 bg-card/95 backdrop-blur-sm",
        sizePadding[effectiveSize],
        cardSizeVariants({ size: effectiveSize }),
        className
      ),
      ...props,
      children: [
        left && /* @__PURE__ */ jsxRuntime.jsx("div", { "data-slot": "card-header-left", className: "w-fit", children: left }),
        children && /* @__PURE__ */ jsxRuntime.jsx("div", { "data-slot": "card-header-content", className: "w-full", children }),
        right && /* @__PURE__ */ jsxRuntime.jsx("div", { "data-slot": "card-header-right", className: "w-fit", children: right })
      ]
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardAction({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "card-action",
      className: cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, size, ...props }) {
  const sizePadding = {
    xs: "py-2.5 px-3",
    sm: "py-3 px-4",
    md: "py-4 px-6",
    lg: "py-5 px-8"
  };
  const effectiveSize = size || "md";
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn(
        // Add scrollable content styles by default (can be overridden)
        "flex-1 min-h-0 overflow-auto",
        sizePadding[effectiveSize],
        cardSizeVariants({ size: effectiveSize }),
        className
      ),
      ...props
    }
  );
}
function CardFooter({
  className,
  size,
  left,
  right,
  children,
  ...props
}) {
  const sizePadding = {
    xs: "py-2.5 px-3 [.border-t]:pt-2.5",
    sm: "py-3 px-4 [.border-t]:pt-3",
    md: "py-4 px-6 [.border-t]:pt-4",
    lg: "py-5 px-8 [.border-t]:pt-5"
  };
  const effectiveSize = size || "md";
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "card-footer",
      className: cn(
        "flex items-center justify-between",
        "sticky bottom-0 z-10 bg-card/95 backdrop-blur-sm",
        sizePadding[effectiveSize],
        cardSizeVariants({ size: effectiveSize }),
        className
      ),
      ...props,
      children: left !== void 0 || right !== void 0 ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        left && /* @__PURE__ */ jsxRuntime.jsx("div", { "data-slot": "card-footer-left", children: left }),
        children && /* @__PURE__ */ jsxRuntime.jsx("div", { "data-slot": "card-footer-content", children }),
        right && /* @__PURE__ */ jsxRuntime.jsx("div", { "data-slot": "card-footer-right", children: right })
      ] }) : children
    }
  );
}
function Modal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Root, { "data-slot": "modal", ...props });
}
function ModalTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Trigger, { "data-slot": "modal-trigger", ...props });
}
function ModalPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Portal, { "data-slot": "modal-portal", ...props });
}
function ModalClose({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Close, { "data-slot": "modal-close", ...props });
}
function ModalOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Overlay,
    {
      "data-slot": "modal-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 duration-normal",
        className
      ),
      ...props
    }
  );
}
function ModalContent({
  className,
  children,
  showCloseButton = true,
  onClick,
  variant,
  size,
  header,
  footer,
  ...props
}) {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick?.(e);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(ModalPortal, { "data-slot": "modal-portal", children: [
    /* @__PURE__ */ jsxRuntime.jsx(ModalOverlay, {}),
    /* @__PURE__ */ jsxRuntime.jsxs(
      DialogPrimitive__namespace.Content,
      {
        "data-slot": "modal-content",
        className: cn(
          // Modal-specific positioning and animations
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] duration-normal font-sans sm:max-w-lg",
          className
        ),
        onClick: handleClick,
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            Card,
            {
              variant: variant || "outlined",
              size: size || "md",
              className: "rounded-lg",
              header,
              footer,
              children
            }
          ),
          showCloseButton && /* @__PURE__ */ jsxRuntime.jsxs(
            DialogPrimitive__namespace.Close,
            {
              "data-slot": "modal-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.XIcon, {}),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function ModalTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Title,
    {
      "data-slot": "modal-title",
      asChild: true,
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className })
    }
  );
}
function ModalDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Description,
    {
      "data-slot": "modal-description",
      asChild: true,
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { className })
    }
  );
}
var ModalHeader = CardHeader;
var ModalFooter = CardFooter;
function Select({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Root, { "data-slot": "select", ...props });
}
function SelectGroup({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Group, { "data-slot": "select-group", ...props });
}
function SelectValue({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    SelectPrimitive__namespace.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsxs(
    SelectPrimitive__namespace.Content,
    {
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      align,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsxRuntime.jsx(
          SelectPrimitive__namespace.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(SelectScrollDownButton, {})
      ]
    }
  ) });
}
function SelectLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    SelectPrimitive__namespace.Label,
    {
      "data-slot": "select-label",
      className: cn("text-muted-foreground px-2 py-1.5 text-xs", className),
      ...props
    }
  );
}
function SelectItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    SelectPrimitive__namespace.Item,
    {
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.ItemText, { children })
      ]
    }
  );
}
function SelectSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    SelectPrimitive__namespace.Separator,
    {
      "data-slot": "select-separator",
      className: cn("bg-border pointer-events-none -mx-1 my-1 h-px", className),
      ...props
    }
  );
}
function SelectScrollUpButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    SelectPrimitive__namespace.ScrollUpButton,
    {
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronUpIcon, { className: "size-4" })
    }
  );
}
function SelectScrollDownButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    SelectPrimitive__namespace.ScrollDownButton,
    {
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDownIcon, { className: "size-4" })
    }
  );
}
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    TooltipPrimitive__namespace.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntime.jsx(TooltipPrimitive__namespace.Root, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(TooltipPrimitive__namespace.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  side,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(TooltipPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsxs(
    TooltipPrimitive__namespace.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      side,
      className: cn(
        "bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntime.jsx(TooltipPrimitive__namespace.Arrow, { className: "bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(AccordionPrimitive__namespace.Root, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AccordionPrimitive__namespace.Item,
    {
      "data-slot": "accordion-item",
      className: cn("border-b last:border-b-0", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(AccordionPrimitive__namespace.Header, { className: "flex", children: /* @__PURE__ */ jsxRuntime.jsxs(
    AccordionPrimitive__namespace.Trigger,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDownIcon, { className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AccordionPrimitive__namespace.Content,
    {
      "data-slot": "accordion-content",
      className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("pt-0 pb-4", className), children })
    }
  );
}
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(AlertDialogPrimitive__namespace.Root, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(AlertDialogPrimitive__namespace.Trigger, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(AlertDialogPrimitive__namespace.Portal, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AlertDialogPrimitive__namespace.Overlay,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntime.jsx(
      AlertDialogPrimitive__namespace.Content,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AlertDialogPrimitive__namespace.Title,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AlertDialogPrimitive__namespace.Description,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AlertDialogPrimitive__namespace.Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    AlertDialogPrimitive__namespace.Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
function Breadcrumb({ ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...props });
}
function BreadcrumbList({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "ol",
    {
      "data-slot": "breadcrumb-list",
      className: cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      ),
      ...props
    }
  );
}
function BreadcrumbItem({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "li",
    {
      "data-slot": "breadcrumb-item",
      className: cn("inline-flex items-center gap-1.5", className),
      ...props
    }
  );
}
function BreadcrumbLink({
  asChild,
  className,
  ...props
}) {
  const Comp = asChild ? reactSlot.Slot : "a";
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      "data-slot": "breadcrumb-link",
      className: cn("hover:text-foreground transition-colors", className),
      ...props
    }
  );
}
function BreadcrumbPage({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      "data-slot": "breadcrumb-page",
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: cn("text-foreground font-normal", className),
      ...props
    }
  );
}
function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "li",
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: cn("[&>svg]:size-3.5", className),
      ...props,
      children: children ?? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, {})
    }
  );
}
function BreadcrumbEllipsis({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "span",
    {
      "data-slot": "breadcrumb-ellipsis",
      role: "presentation",
      "aria-hidden": "true",
      className: cn("flex size-9 items-center justify-center", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.MoreHorizontal, { className: "size-4" }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "More" })
      ]
    }
  );
}
function Collapsible({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(CollapsiblePrimitive__namespace.Root, { "data-slot": "collapsible", ...props });
}
function CollapsibleTrigger2({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    CollapsiblePrimitive__namespace.CollapsibleTrigger,
    {
      "data-slot": "collapsible-trigger",
      ...props
    }
  );
}
function CollapsibleContent2({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    CollapsiblePrimitive__namespace.CollapsibleContent,
    {
      "data-slot": "collapsible-content",
      ...props
    }
  );
}
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  side,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    PopoverPrimitive__namespace.Content,
    {
      "data-slot": "popover-content",
      align,
      side,
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      ),
      ...props
    }
  ) });
}
function PopoverAnchor({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(PopoverPrimitive__namespace.Anchor, { "data-slot": "popover-anchor", ...props });
}
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuPrimitive__namespace.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuPrimitive__namespace.Portal, { "data-slot": "dropdown-menu-portal", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DropdownMenuPrimitive__namespace.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    DropdownMenuPrimitive__namespace.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuGroup({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuPrimitive__namespace.Group, { "data-slot": "dropdown-menu-group", ...props });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DropdownMenuPrimitive__namespace.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    DropdownMenuPrimitive__namespace.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      checked,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuPrimitive__namespace.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CheckIcon, { className: "size-4" }) }) }),
        children
      ]
    }
  );
}
function DropdownMenuRadioGroup({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DropdownMenuPrimitive__namespace.RadioGroup,
    {
      "data-slot": "dropdown-menu-radio-group",
      ...props
    }
  );
}
function DropdownMenuRadioItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    DropdownMenuPrimitive__namespace.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuPrimitive__namespace.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CircleIcon, { className: "size-2 fill-current" }) }) }),
        children
      ]
    }
  );
}
function DropdownMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DropdownMenuPrimitive__namespace.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DropdownMenuPrimitive__namespace.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("bg-border -mx-1 my-1 h-px", className),
      ...props
    }
  );
}
function DropdownMenuShortcut({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSub({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(DropdownMenuPrimitive__namespace.Sub, { "data-slot": "dropdown-menu-sub", ...props });
}
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    DropdownMenuPrimitive__namespace.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": inset,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRightIcon, { className: "ml-auto size-4" })
      ]
    }
  );
}
function DropdownMenuSubContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DropdownMenuPrimitive__namespace.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      ),
      ...props
    }
  );
}
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    TabsPrimitive__namespace.Root,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    TabsPrimitive__namespace.List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    TabsPrimitive__namespace.Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    TabsPrimitive__namespace.Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Root, { "data-slot": "sheet", ...props });
}
function SheetTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Trigger, { "data-slot": "sheet-trigger", ...props });
}
function SheetClose({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Close, { "data-slot": "sheet-close", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxRuntime.jsxs(
      DialogPrimitive__namespace.Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxRuntime.jsxs(DialogPrimitive__namespace.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.XIcon, { className: "size-4" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "sheet-footer",
      className: cn("mt-auto flex flex-col gap-2 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function SheetDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Description,
    {
      "data-slot": "sheet-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function Drawer({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(vaul.Drawer.Root, { "data-slot": "drawer", ...props });
}
function DrawerTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(vaul.Drawer.Trigger, { "data-slot": "drawer-trigger", ...props });
}
function DrawerPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(vaul.Drawer.Portal, { "data-slot": "drawer-portal", ...props });
}
function DrawerClose({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(vaul.Drawer.Close, { "data-slot": "drawer-close", ...props });
}
function DrawerOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    vaul.Drawer.Overlay,
    {
      "data-slot": "drawer-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DrawerContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(DrawerPortal, { "data-slot": "drawer-portal", children: [
    /* @__PURE__ */ jsxRuntime.jsx(DrawerOverlay, {}),
    /* @__PURE__ */ jsxRuntime.jsxs(
      vaul.Drawer.Content,
      {
        "data-slot": "drawer-content",
        className: cn(
          "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
          "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
          "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
          "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
          "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" }),
          children
        ]
      }
    )
  ] });
}
function DrawerHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "drawer-header",
      className: cn(
        "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
        className
      ),
      ...props
    }
  );
}
function DrawerFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "drawer-footer",
      className: cn("mt-auto flex flex-col gap-2 p-4", className),
      ...props
    }
  );
}
function DrawerTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    vaul.Drawer.Title,
    {
      "data-slot": "drawer-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
function DrawerDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    vaul.Drawer.Description,
    {
      "data-slot": "drawer-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function HoverCard({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(HoverCardPrimitive__namespace.Root, { "data-slot": "hover-card", ...props });
}
function HoverCardTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(HoverCardPrimitive__namespace.Trigger, { "data-slot": "hover-card-trigger", ...props });
}
function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(HoverCardPrimitive__namespace.Portal, { "data-slot": "hover-card-portal", children: /* @__PURE__ */ jsxRuntime.jsx(
    HoverCardPrimitive__namespace.Content,
    {
      "data-slot": "hover-card-content",
      align,
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      ),
      ...props
    }
  ) });
}
function Pagination({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "nav",
    {
      role: "navigation",
      "aria-label": "pagination",
      "data-slot": "pagination",
      className: cn("mx-auto flex w-full justify-center", className),
      ...props
    }
  );
}
function PaginationContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "ul",
    {
      "data-slot": "pagination-content",
      className: cn("flex flex-row items-center gap-1", className),
      ...props
    }
  );
}
function PaginationItem({ ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("li", { "data-slot": "pagination-item", ...props });
}
function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "a",
    {
      "aria-current": isActive ? "page" : void 0,
      "data-slot": "pagination-link",
      "data-active": isActive,
      className: cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size
        }),
        className
      ),
      ...props
    }
  );
}
function PaginationPrevious({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    PaginationLink,
    {
      "aria-label": "Go to previous page",
      className: cn("gap-1 px-2.5 sm:pl-2.5", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeftIcon, {}),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:block", children: "Previous" })
      ]
    }
  );
}
function PaginationNext({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    PaginationLink,
    {
      "aria-label": "Go to next page",
      className: cn("gap-1 px-2.5 sm:pr-2.5", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "hidden sm:block", children: "Next" }),
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRightIcon, {})
      ]
    }
  );
}
function PaginationEllipsis({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "span",
    {
      "aria-hidden": true,
      "data-slot": "pagination-ellipsis",
      className: cn("flex size-9 items-center justify-center", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.MoreHorizontalIcon, { className: "size-4" }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "More pages" })
      ]
    }
  );
}
var ToggleGroupContext = React15__namespace.createContext({
  size: "default",
  variant: "default",
  spacing: 0
});
function ToggleGroup({
  className,
  variant,
  size,
  spacing = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToggleGroupPrimitive__namespace.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": variant,
      "data-size": size,
      "data-spacing": spacing,
      style: { "--gap": spacing },
      className: cn(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(ToggleGroupContext.Provider, { value: { variant, size, spacing }, children })
    }
  );
}
function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}) {
  const context = React15__namespace.useContext(ToggleGroupContext);
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToggleGroupPrimitive__namespace.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": context.variant || variant,
      "data-size": context.size || size,
      "data-spacing": context.spacing,
      className: cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size
        }),
        "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10",
        "data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l",
        className
      ),
      ...props,
      children
    }
  );
}
function ContextMenu({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(ContextMenuPrimitive__namespace.Root, { "data-slot": "context-menu", ...props });
}
function ContextMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(ContextMenuPrimitive__namespace.Trigger, { "data-slot": "context-menu-trigger", ...props });
}
function ContextMenuGroup({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(ContextMenuPrimitive__namespace.Group, { "data-slot": "context-menu-group", ...props });
}
function ContextMenuPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(ContextMenuPrimitive__namespace.Portal, { "data-slot": "context-menu-portal", ...props });
}
function ContextMenuSub({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(ContextMenuPrimitive__namespace.Sub, { "data-slot": "context-menu-sub", ...props });
}
function ContextMenuRadioGroup({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ContextMenuPrimitive__namespace.RadioGroup,
    {
      "data-slot": "context-menu-radio-group",
      ...props
    }
  );
}
function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    ContextMenuPrimitive__namespace.SubTrigger,
    {
      "data-slot": "context-menu-sub-trigger",
      "data-inset": inset,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRightIcon, { className: "ml-auto" })
      ]
    }
  );
}
function ContextMenuSubContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ContextMenuPrimitive__namespace.SubContent,
    {
      "data-slot": "context-menu-sub-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      ),
      ...props
    }
  );
}
function ContextMenuContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(ContextMenuPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    ContextMenuPrimitive__namespace.Content,
    {
      "data-slot": "context-menu-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] origin-(--radix-context-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ContextMenuPrimitive__namespace.Item,
    {
      "data-slot": "context-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    ContextMenuPrimitive__namespace.CheckboxItem,
    {
      "data-slot": "context-menu-checkbox-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      checked,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(ContextMenuPrimitive__namespace.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CheckIcon, { className: "size-4" }) }) }),
        children
      ]
    }
  );
}
function ContextMenuRadioItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    ContextMenuPrimitive__namespace.RadioItem,
    {
      "data-slot": "context-menu-radio-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(ContextMenuPrimitive__namespace.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CircleIcon, { className: "size-2 fill-current" }) }) }),
        children
      ]
    }
  );
}
function ContextMenuLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ContextMenuPrimitive__namespace.Label,
    {
      "data-slot": "context-menu-label",
      "data-inset": inset,
      className: cn(
        "text-foreground px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      ),
      ...props
    }
  );
}
function ContextMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ContextMenuPrimitive__namespace.Separator,
    {
      "data-slot": "context-menu-separator",
      className: cn("bg-border -mx-1 my-1 h-px", className),
      ...props
    }
  );
}
function ContextMenuShortcut({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      "data-slot": "context-menu-shortcut",
      className: cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      ),
      ...props
    }
  );
}
function Command({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.Command,
    {
      "data-slot": "command",
      className: cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className
      ),
      ...props
    }
  );
}
function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(Modal, { ...props, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(ModalHeader, { className: "sr-only", children: [
      /* @__PURE__ */ jsxRuntime.jsx(ModalTitle, { children: title }),
      /* @__PURE__ */ jsxRuntime.jsx(ModalDescription, { children: description })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      ModalContent,
      {
        className: cn("overflow-hidden p-0", className),
        showCloseButton,
        children: /* @__PURE__ */ jsxRuntime.jsx(Command, { className: "[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children })
      }
    )
  ] });
}
function CommandInput({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      "data-slot": "command-input-wrapper",
      className: "flex h-9 items-center gap-2 border-b px-3",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.SearchIcon, { className: "size-4 shrink-0 opacity-50" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          cmdk.Command.Input,
          {
            "data-slot": "command-input",
            className: cn(
              "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
              className
            ),
            ...props
          }
        )
      ]
    }
  );
}
function CommandList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.Command.List,
    {
      "data-slot": "command-list",
      className: cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      ),
      ...props
    }
  );
}
function CommandEmpty({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.Command.Empty,
    {
      "data-slot": "command-empty",
      className: "py-6 text-center text-sm",
      ...props
    }
  );
}
function CommandGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.Command.Group,
    {
      "data-slot": "command-group",
      className: cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className
      ),
      ...props
    }
  );
}
function CommandSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.Command.Separator,
    {
      "data-slot": "command-separator",
      className: cn("bg-border -mx-1 h-px", className),
      ...props
    }
  );
}
function CommandItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    cmdk.Command.Item,
    {
      "data-slot": "command-item",
      className: cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function CommandShortcut({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      "data-slot": "command-shortcut",
      className: cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      ),
      ...props
    }
  );
}
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = reactDayPicker.getDefaultClassNames();
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactDayPicker.DayPicker,
    {
      showOutsideDays,
      className: cn(
        "bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      ),
      captionLayout,
      formatters: {
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters
      },
      classNames: {
        root: cn("w-64", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute bg-popover inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-muted-foreground",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          props.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md" : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-md bg-accent",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames
      },
      components: {
        Root: ({ className: className2, rootRef, ...props2 }) => {
          return /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              "data-slot": "calendar",
              ref: rootRef,
              className: cn(className2),
              ...props2
            }
          );
        },
        Chevron: ({ className: className2, orientation, ...props2 }) => {
          if (orientation === "left") {
            return /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeftIcon, { className: cn("size-4", className2), ...props2 });
          }
          if (orientation === "right") {
            return /* @__PURE__ */ jsxRuntime.jsx(
              lucideReact.ChevronRightIcon,
              {
                className: cn("size-4", className2),
                ...props2
              }
            );
          }
          return /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDownIcon, { className: cn("size-4", className2), ...props2 });
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props2 }) => {
          return /* @__PURE__ */ jsxRuntime.jsx("td", { ...props2, children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children }) });
        },
        ...components
      },
      ...props
    }
  );
}
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}) {
  const defaultClassNames = reactDayPicker.getDefaultClassNames();
  const ref = React15__namespace.useRef(null);
  React15__namespace.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    Button,
    {
      ref,
      variant: "ghost",
      size: "icon",
      "data-day": day.date.toLocaleDateString(),
      "data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
      "data-range-start": modifiers.range_start,
      "data-range-end": modifiers.range_end,
      "data-range-middle": modifiers.range_middle,
      className: cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      ),
      ...props
    }
  );
}
function Menubar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    MenubarPrimitive__namespace.Root,
    {
      "data-slot": "menubar",
      className: cn(
        "bg-background flex h-9 items-center gap-1 rounded-md border p-1 shadow-xs",
        className
      ),
      ...props
    }
  );
}
function MenubarMenu({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(MenubarPrimitive__namespace.Menu, { "data-slot": "menubar-menu", ...props });
}
function MenubarGroup({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(MenubarPrimitive__namespace.Group, { "data-slot": "menubar-group", ...props });
}
function MenubarPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(MenubarPrimitive__namespace.Portal, { "data-slot": "menubar-portal", ...props });
}
function MenubarRadioGroup({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(MenubarPrimitive__namespace.RadioGroup, { "data-slot": "menubar-radio-group", ...props });
}
function MenubarTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    MenubarPrimitive__namespace.Trigger,
    {
      "data-slot": "menubar-trigger",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none",
        className
      ),
      ...props
    }
  );
}
function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(MenubarPortal, { children: /* @__PURE__ */ jsxRuntime.jsx(
    MenubarPrimitive__namespace.Content,
    {
      "data-slot": "menubar-content",
      align,
      alignOffset,
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[12rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    MenubarPrimitive__namespace.Item,
    {
      "data-slot": "menubar-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    MenubarPrimitive__namespace.CheckboxItem,
    {
      "data-slot": "menubar-checkbox-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      checked,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(MenubarPrimitive__namespace.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CheckIcon, { className: "size-4" }) }) }),
        children
      ]
    }
  );
}
function MenubarRadioItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    MenubarPrimitive__namespace.RadioItem,
    {
      "data-slot": "menubar-radio-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-xs py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(MenubarPrimitive__namespace.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CircleIcon, { className: "size-2 fill-current" }) }) }),
        children
      ]
    }
  );
}
function MenubarLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    MenubarPrimitive__namespace.Label,
    {
      "data-slot": "menubar-label",
      "data-inset": inset,
      className: cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      ),
      ...props
    }
  );
}
function MenubarSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    MenubarPrimitive__namespace.Separator,
    {
      "data-slot": "menubar-separator",
      className: cn("bg-border -mx-1 my-1 h-px", className),
      ...props
    }
  );
}
function MenubarShortcut({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      "data-slot": "menubar-shortcut",
      className: cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      ),
      ...props
    }
  );
}
function MenubarSub({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(MenubarPrimitive__namespace.Sub, { "data-slot": "menubar-sub", ...props });
}
function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    MenubarPrimitive__namespace.SubTrigger,
    {
      "data-slot": "menubar-sub-trigger",
      "data-inset": inset,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRightIcon, { className: "ml-auto h-4 w-4" })
      ]
    }
  );
}
function MenubarSubContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    MenubarPrimitive__namespace.SubContent,
    {
      "data-slot": "menubar-sub-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      ),
      ...props
    }
  );
}
function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    NavigationMenuPrimitive__namespace.Root,
    {
      "data-slot": "navigation-menu",
      "data-viewport": viewport,
      className: cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      ),
      ...props,
      children: [
        children,
        viewport && /* @__PURE__ */ jsxRuntime.jsx(NavigationMenuViewport, {})
      ]
    }
  );
}
function NavigationMenuList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    NavigationMenuPrimitive__namespace.List,
    {
      "data-slot": "navigation-menu-list",
      className: cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    NavigationMenuPrimitive__namespace.Item,
    {
      "data-slot": "navigation-menu-item",
      className: cn("relative", className),
      ...props
    }
  );
}
var navigationMenuTriggerStyle = classVarianceAuthority.cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
);
function NavigationMenuTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    NavigationMenuPrimitive__namespace.Trigger,
    {
      "data-slot": "navigation-menu-trigger",
      className: cn(navigationMenuTriggerStyle(), "group", className),
      ...props,
      children: [
        children,
        " ",
        /* @__PURE__ */ jsxRuntime.jsx(
          lucideReact.ChevronDownIcon,
          {
            className: "relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180",
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function NavigationMenuContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    NavigationMenuPrimitive__namespace.Content,
    {
      "data-slot": "navigation-menu-content",
      className: cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuViewport({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: cn(
        "absolute top-full left-0 isolate z-50 flex justify-center"
      ),
      children: /* @__PURE__ */ jsxRuntime.jsx(
        NavigationMenuPrimitive__namespace.Viewport,
        {
          "data-slot": "navigation-menu-viewport",
          className: cn(
            "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
            className
          ),
          ...props
        }
      )
    }
  );
}
function NavigationMenuLink({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    NavigationMenuPrimitive__namespace.Link,
    {
      "data-slot": "navigation-menu-link",
      className: cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuIndicator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    NavigationMenuPrimitive__namespace.Indicator,
    {
      "data-slot": "navigation-menu-indicator",
      className: cn(
        "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" })
    }
  );
}
var CarouselContext = React15__namespace.createContext(null);
function useCarousel() {
  const context = React15__namespace.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}) {
  const [carouselRef, api] = useEmblaCarousel__default.default(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y"
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React15__namespace.useState(false);
  const [canScrollNext, setCanScrollNext] = React15__namespace.useState(false);
  const onSelect = React15__namespace.useCallback((api2) => {
    if (!api2) return;
    setCanScrollPrev(api2.canScrollPrev());
    setCanScrollNext(api2.canScrollNext());
  }, []);
  const scrollPrev = React15__namespace.useCallback(() => {
    api?.scrollPrev();
  }, [api]);
  const scrollNext = React15__namespace.useCallback(() => {
    api?.scrollNext();
  }, [api]);
  const handleKeyDown = React15__namespace.useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );
  React15__namespace.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);
  React15__namespace.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    CarouselContext.Provider,
    {
      value: {
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      },
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          onKeyDownCapture: handleKeyDown,
          className: cn("relative", className),
          role: "region",
          "aria-roledescription": "carousel",
          "data-slot": "carousel",
          ...props,
          children
        }
      )
    }
  );
}
function CarouselContent({ className, ...props }) {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref: carouselRef,
      className: "overflow-hidden",
      "data-slot": "carousel-content",
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          className: cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className
          ),
          ...props
        }
      )
    }
  );
}
function CarouselItem({ className, ...props }) {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      role: "group",
      "aria-roledescription": "slide",
      "data-slot": "carousel-item",
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      ),
      ...props
    }
  );
}
function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  return /* @__PURE__ */ jsxRuntime.jsxs(
    Button,
    {
      "data-slot": "carousel-previous",
      variant,
      size,
      className: cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal" ? "top-1/2 -left-12 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollPrev,
      onClick: scrollPrev,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowLeft, {}),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Previous slide" })
      ]
    }
  );
}
function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  return /* @__PURE__ */ jsxRuntime.jsxs(
    Button,
    {
      "data-slot": "carousel-next",
      variant,
      size,
      className: cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal" ? "top-1/2 -right-12 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      ),
      disabled: !canScrollNext,
      onClick: scrollNext,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowRight, {}),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Next slide" })
      ]
    }
  );
}
var Form = reactHookForm.FormProvider;
var FormFieldContext = React15__namespace.createContext(
  {}
);
var FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsxRuntime.jsx(reactHookForm.Controller, { ...props }) });
};
var useFormField = () => {
  const fieldContext = React15__namespace.useContext(FormFieldContext);
  const itemContext = React15__namespace.useContext(FormItemContext);
  const { getFieldState } = reactHookForm.useFormContext();
  const formState = reactHookForm.useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
var FormItemContext = React15__namespace.createContext(
  {}
);
function FormItem({ className, ...props }) {
  const id = React15__namespace.useId();
  return /* @__PURE__ */ jsxRuntime.jsx(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "form-item",
      className: cn("grid gap-2", className),
      ...props
    }
  ) });
}
function FormLabel({
  className,
  ...props
}) {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsxRuntime.jsx(
    Label,
    {
      "data-slot": "form-label",
      "data-error": !!error,
      className: cn("data-[error=true]:text-destructive", className),
      htmlFor: formItemId,
      ...props
    }
  );
}
function FormControl({ ...props }) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactSlot.Slot,
    {
      "data-slot": "form-control",
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    }
  );
}
function FormDescription({ className, ...props }) {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "p",
    {
      "data-slot": "form-description",
      id: formDescriptionId,
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function FormMessage({ className, ...props }) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "p",
    {
      "data-slot": "form-message",
      id: formMessageId,
      className: cn("text-destructive text-sm", className),
      ...props,
      children: body
    }
  );
}
function FieldSet({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "fieldset",
    {
      "data-slot": "field-set",
      className: cn(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className
      ),
      ...props
    }
  );
}
function FieldLegend({
  className,
  variant = "legend",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "legend",
    {
      "data-slot": "field-legend",
      "data-variant": variant,
      className: cn(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        className
      ),
      ...props
    }
  );
}
function FieldGroup({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "field-group",
      className: cn(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4",
        className
      ),
      ...props
    }
  );
}
var fieldVariants = classVarianceAuthority.cva(
  "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: ["flex-col [&>*]:w-full [&>.sr-only]:w-auto"],
        horizontal: [
          "flex-row items-center",
          "[&>[data-slot=field-label]]:flex-auto",
          "has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
        ],
        responsive: [
          "flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto",
          "@md/field-group:[&>[data-slot=field-label]]:flex-auto",
          "@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
        ]
      }
    },
    defaultVariants: {
      orientation: "vertical"
    }
  }
);
function Field({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      role: "group",
      "data-slot": "field",
      "data-orientation": orientation,
      className: cn(fieldVariants({ orientation }), className),
      ...props
    }
  );
}
function FieldContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "field-content",
      className: cn(
        "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
        className
      ),
      ...props
    }
  );
}
function FieldLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Label,
    {
      "data-slot": "field-label",
      className: cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
        "has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10",
        className
      ),
      ...props
    }
  );
}
function FieldTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "field-label",
      className: cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
        className
      ),
      ...props
    }
  );
}
function FieldDescription({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "p",
    {
      "data-slot": "field-description",
      className: cn(
        "text-muted-foreground text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance",
        "last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      ),
      ...props
    }
  );
}
function FieldSeparator({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      "data-slot": "field-separator",
      "data-content": !!children,
      className: cn(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(Separator, { className: "absolute inset-0 top-1/2" }),
        children && /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            className: "bg-background text-muted-foreground relative mx-auto block w-fit px-2",
            "data-slot": "field-separator-content",
            children
          }
        )
      ]
    }
  );
}
function FieldError({
  className,
  children,
  errors,
  ...props
}) {
  const content = React15.useMemo(() => {
    if (children) {
      return children;
    }
    if (!errors?.length) {
      return null;
    }
    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values()
    ];
    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message;
    }
    return /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "ml-4 flex list-disc flex-col gap-1", children: uniqueErrors.map(
      (error, index) => error?.message && /* @__PURE__ */ jsxRuntime.jsx("li", { children: error.message }, index)
    ) });
  }, [children, errors]);
  if (!content) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      role: "alert",
      "data-slot": "field-error",
      className: cn("text-destructive text-sm font-normal", className),
      ...props,
      children: content
    }
  );
}
var THEMES = { light: "", dark: ".dark" };
var ChartContext = React15__namespace.createContext(null);
function useChart() {
  const context = React15__namespace.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}) {
  const uniqueId = React15__namespace.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsxRuntime.jsx(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      "data-slot": "chart",
      "data-chart": chartId,
      className: cn(
        "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border flex aspect-video justify-center text-xs [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-surface]:outline-hidden",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsxRuntime.jsx(RechartsPrimitive__namespace.ResponsiveContainer, { children })
      ]
    }
  ) });
}
var ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config2]) => config2.theme || config2.color
  );
  if (!colorConfig.length) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
            const color = itemConfig.theme?.[theme] || itemConfig.color;
            return color ? `  --color-${key}: ${color};` : null;
          }).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
};
var ChartTooltip = RechartsPrimitive__namespace.Tooltip;
function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey
}) {
  const { config } = useChart();
  const tooltipLabel = React15__namespace.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }
    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value = !labelKey && typeof label === "string" ? config[label]?.label || label : itemConfig?.label;
    if (labelFormatter) {
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
    }
    if (!value) {
      return null;
    }
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("font-medium", labelClassName), children: value });
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey
  ]);
  if (!active || !payload?.length) {
    return null;
  }
  const nestLabel = payload.length === 1 && indicator !== "dot";
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn(
        "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
        className
      ),
      children: [
        !nestLabel ? tooltipLabel : null,
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid gap-1.5", children: payload.filter((item) => item.type !== "none").map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;
          return /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: cn(
                "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                indicator === "dot" && "items-center"
              ),
              children: formatter && item?.value !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                itemConfig?.icon ? /* @__PURE__ */ jsxRuntime.jsx(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsxRuntime.jsx(
                  "div",
                  {
                    className: cn(
                      "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                      {
                        "h-2.5 w-2.5": indicator === "dot",
                        "w-1": indicator === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                        "my-0.5": nestLabel && indicator === "dashed"
                      }
                    ),
                    style: {
                      "--color-bg": indicatorColor,
                      "--color-border": indicatorColor
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsxs(
                  "div",
                  {
                    className: cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-1.5", children: [
                        nestLabel ? tooltipLabel : null,
                        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: itemConfig?.label || item.name })
                      ] }),
                      item.value && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-foreground font-mono font-medium tabular-nums", children: item.value.toLocaleString() })
                    ]
                  }
                )
              ] })
            },
            item.dataKey
          );
        }) })
      ]
    }
  );
}
var ChartLegend = RechartsPrimitive__namespace.Legend;
function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey
}) {
  const { config } = useChart();
  if (!payload?.length) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      ),
      children: payload.filter((item) => item.type !== "none").map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        return /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            className: cn(
              "[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
            ),
            children: [
              itemConfig?.icon && !hideIcon ? /* @__PURE__ */ jsxRuntime.jsx(itemConfig.icon, {}) : /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  className: "h-2 w-2 shrink-0 rounded-[2px]",
                  style: {
                    backgroundColor: item.color
                  }
                }
              ),
              itemConfig?.label
            ]
          },
          item.value
        );
      })
    }
  );
}
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}
var variantMap = {
  default: "default",
  success: "default",
  error: "destructive",
  warning: "default"
};
function Toast({
  title,
  description,
  variant = "default",
  className
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    Alert,
    {
      "data-slot": "toast",
      variant: variantMap[variant],
      className: cn(
        "shadow-lg",
        variant === "success" && "border-green-500",
        variant === "warning" && "border-yellow-500",
        className
      ),
      children: [
        title && /* @__PURE__ */ jsxRuntime.jsx(AlertTitle, { children: title }),
        description && /* @__PURE__ */ jsxRuntime.jsx(AlertDescription, { children: description })
      ]
    }
  );
}
var Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    sonner.Toaster,
    {
      className: "toaster group",
      icons: {
        success: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CircleCheckIcon, { className: "size-4" }),
        info: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.InfoIcon, { className: "size-4" }),
        warning: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.TriangleAlertIcon, { className: "size-4" }),
        error: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.OctagonXIcon, { className: "size-4" }),
        loading: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2Icon, { className: "size-4 animate-spin" })
      },
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)"
      },
      ...props
    }
  );
};
var variantMap2 = {
  default: "default",
  success: "default",
  error: "destructive"
};
function Snackbar({
  message,
  action,
  variant = "default",
  className
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    Alert,
    {
      "data-slot": "snackbar",
      variant: variantMap2[variant],
      className: cn(
        "fixed bottom-4 left-1/2 -translate-x-1/2 shadow-lg flex items-center gap-4",
        variant === "success" && "border-green-500",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(AlertDescription, { children: message }),
        action && /* @__PURE__ */ jsxRuntime.jsx("div", { children: action })
      ]
    }
  );
}
var statusIcons = {
  success: lucideReact.CheckCircleIcon,
  error: lucideReact.XCircleIcon,
  warning: lucideReact.AlertCircleIcon,
  info: lucideReact.AlertCircleIcon
};
function StatusText({
  text,
  status = "info",
  count,
  label,
  variant = "body",
  formatText,
  className,
  as = "div"
}) {
  const displayText = React15__namespace.useMemo(() => {
    let baseText = "";
    if (text) {
      baseText = text;
    } else if (count !== void 0 && label) {
      const pluralizedLabel = count === 1 ? label : `${label}s`;
      baseText = `${count} ${pluralizedLabel}`;
    }
    if (formatText) {
      return formatText(baseText, count, label);
    }
    return baseText;
  }, [text, count, label, formatText]);
  const Icon2 = statusIcons[status];
  const variantClasses = {
    caption: "text-xs",
    body: "text-sm",
    heading: "text-base font-medium",
    badge: ""
  };
  if (variant === "badge") {
    const badgeVariantMap = {
      success: "default",
      error: "destructive",
      warning: "outline",
      info: "secondary"
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      Badge,
      {
        variant: badgeVariantMap[status],
        "data-slot": "status-text",
        className: cn("flex items-center gap-1.5", className),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(Icon2, { className: "size-3" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: displayText })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    Text,
    {
      as,
      "data-slot": "status-text",
      className: cn(
        "flex items-center gap-2",
        variantClasses[variant],
        status === "success" && "text-green-600 dark:text-green-400",
        status === "error" && "text-destructive",
        status === "warning" && "text-yellow-600 dark:text-yellow-400",
        status === "info" && "text-blue-600 dark:text-blue-400",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(Icon2, { className: "size-4" }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { children: displayText })
      ]
    }
  );
}
function Stepper({ steps, className }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "stepper",
      className: cn("flex items-center gap-4", className),
      children: steps.map((step, index) => /* @__PURE__ */ jsxRuntime.jsxs(React15__namespace.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: cn(
                "flex size-8 items-center justify-center rounded-full border-2",
                step.completed ? "border-primary bg-primary text-primary-foreground" : step.active ? "border-primary text-primary" : "border-muted text-muted-foreground"
              ),
              children: step.completed ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CheckIcon, { className: "size-4" }) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm font-medium", children: index + 1 })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: cn(
                "text-sm",
                step.active && "font-medium text-foreground",
                !step.active && "text-muted-foreground"
              ),
              children: step.label
            }
          )
        ] }),
        index < steps.length - 1 && /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: cn(
              "h-0.5 w-12",
              step.completed ? "bg-primary" : "bg-muted"
            )
          }
        )
      ] }, index))
    }
  );
}
var variantMap3 = {
  info: { variant: "default", icon: lucideReact.InfoIcon },
  warning: { variant: "default", icon: lucideReact.AlertCircleIcon },
  success: { variant: "default", icon: lucideReact.CheckCircleIcon }
};
function InfoBanner({
  message,
  variant = "info",
  className,
  tooltip = false,
  children
}) {
  const { icon: Icon2 } = variantMap3[variant];
  const content = /* @__PURE__ */ jsxRuntime.jsxs(
    Alert,
    {
      "data-slot": "info-banner",
      className: cn(
        variant === "info" && "bg-primary/10 text-primary border-primary/20 [&>svg]:text-primary",
        variant === "warning" && "bg-destructive/10 text-destructive border-destructive/20 [&>svg]:text-destructive",
        variant === "success" && "bg-muted/50 text-muted-foreground border-border [&>svg]:text-muted-foreground",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(Icon2, { className: "size-4" }),
        /* @__PURE__ */ jsxRuntime.jsx(AlertDescription, { className: "text-sm", children: message })
      ]
    }
  );
  if (tooltip) {
    return /* @__PURE__ */ jsxRuntime.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntime.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(TooltipTrigger, { asChild: true, children: children || /* @__PURE__ */ jsxRuntime.jsx(Icon2, { className: "size-4" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(TooltipContent, { children: /* @__PURE__ */ jsxRuntime.jsx("p", { children: message }) })
    ] }) });
  }
  return content;
}
function InlineEdit({
  value: initialValue,
  onSave,
  className,
  placeholder
}) {
  const [isEditing, setIsEditing] = React15__namespace.useState(false);
  const [value, setValue] = React15__namespace.useState(initialValue);
  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setValue(initialValue);
    setIsEditing(false);
  };
  if (isEditing) {
    return /* @__PURE__ */ jsxRuntime.jsx("div", { "data-slot": "inline-edit", className: cn("inline-flex items-center", className), children: /* @__PURE__ */ jsxRuntime.jsx(
      TextInput,
      {
        value,
        onChange: (e) => setValue(e.target.value),
        onBlur: handleSave,
        onKeyDown: (e) => {
          if (e.key === "Enter") handleSave();
          if (e.key === "Escape") handleCancel();
        },
        autoFocus: true,
        className: "h-9"
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      "data-slot": "inline-edit-display",
      className: cn(
        "inline-flex items-center h-9 cursor-pointer hover:underline px-3 py-2",
        "border border-transparent rounded-md",
        className
      ),
      onClick: () => setIsEditing(true),
      children: value || placeholder || "Click to edit"
    }
  );
}
function InputGroup({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: cn(
        "group/input-group border-input dark:bg-input/30 relative flex w-full items-center rounded-md border shadow-xs transition-[color,box-shadow] outline-none",
        "h-9 min-w-0 has-[>textarea]:h-auto",
        // Variants based on alignment.
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",
        // Focus state.
        "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot=input-group-control]:focus-visible]:ring-[3px]",
        // Error state.
        "has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",
        className
      ),
      ...props
    }
  );
}
var inputGroupAddonVariants = classVarianceAuthority.cva(
  "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end": "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start": "order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5",
        "block-end": "order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5"
      }
    },
    defaultVariants: {
      align: "inline-start"
    }
  }
);
function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      role: "group",
      "data-slot": "input-group-addon",
      "data-align": align,
      className: cn(inputGroupAddonVariants({ align }), className),
      onClick: (e) => {
        if (e.target.closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      },
      ...props
    }
  );
}
var inputGroupButtonVariants = classVarianceAuthority.cva(
  "text-sm shadow-none flex gap-2 items-center",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 px-2 rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2",
        sm: "h-8 px-2.5 gap-1.5 rounded-md has-[>svg]:px-2.5",
        "icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
        "icon-sm": "size-8 p-0 has-[>svg]:p-0"
      }
    },
    defaultVariants: {
      size: "xs"
    }
  }
);
function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Button,
    {
      type,
      "data-size": size,
      variant,
      className: cn(inputGroupButtonVariants({ size }), className),
      ...props
    }
  );
}
function InputGroupText({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function InputGroupInput({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    TextInput,
    {
      "data-slot": "input-group-control",
      className: cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        className
      ),
      ...props
    }
  );
}
function InputGroupTextarea({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Textarea,
    {
      "data-slot": "input-group-control",
      className: cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
        className
      ),
      ...props
    }
  );
}
function FormInput({
  className,
  type = "text",
  label,
  error,
  description,
  variant = "default",
  id,
  options,
  onValueChange,
  checked,
  onCheckedChange,
  ...props
}) {
  const inputId = id || React15__namespace.useId();
  if (type === "checkbox") {
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { "data-slot": "form-input", className: cn("space-y-2", className), children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          Checkbox,
          {
            id: inputId,
            checked,
            onCheckedChange,
            disabled: props.disabled
          }
        ),
        label && /* @__PURE__ */ jsxRuntime.jsxs(Label, { htmlFor: inputId, className: cn("cursor-pointer", error && "text-destructive"), children: [
          label,
          props.required && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-destructive ml-1", children: "*" })
        ] })
      ] }),
      description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: description }),
      error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-destructive", role: "alert", children: error })
    ] });
  }
  if (type === "select") {
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { "data-slot": "form-input", className: cn("space-y-2", className), children: [
      label && /* @__PURE__ */ jsxRuntime.jsxs(Label, { htmlFor: inputId, className: error && "text-destructive", children: [
        label,
        props.required && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-destructive ml-1", children: "*" })
      ] }),
      description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: description }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        Select,
        {
          value: props.value,
          onValueChange,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              SelectTrigger,
              {
                id: inputId,
                className: cn(
                  error && "border-destructive",
                  variant === "minimal" && "border-0 shadow-none bg-transparent"
                ),
                children: /* @__PURE__ */ jsxRuntime.jsx(SelectValue, { placeholder: props.placeholder || "Select..." })
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(SelectContent, { children: options?.map((option) => /* @__PURE__ */ jsxRuntime.jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
          ]
        }
      ),
      error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-destructive", role: "alert", children: error })
    ] });
  }
  if (type === "textarea") {
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { "data-slot": "form-input", className: cn("space-y-2", className), children: [
      label && /* @__PURE__ */ jsxRuntime.jsxs(Label, { htmlFor: inputId, className: error && "text-destructive", children: [
        label,
        props.required && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-destructive ml-1", children: "*" })
      ] }),
      description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: description }),
      /* @__PURE__ */ jsxRuntime.jsx(
        Textarea,
        {
          id: inputId,
          className: cn(
            error && "border-destructive",
            variant === "minimal" && "border-0 shadow-none bg-transparent"
          ),
          ...props
        }
      ),
      error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-destructive", role: "alert", children: error })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { "data-slot": "form-input", className: cn("space-y-2", className), children: [
    label && /* @__PURE__ */ jsxRuntime.jsxs(Label, { htmlFor: inputId, className: error && "text-destructive", children: [
      label,
      props.required && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-destructive ml-1", children: "*" })
    ] }),
    description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: description }),
    /* @__PURE__ */ jsxRuntime.jsx(
      TextInput,
      {
        id: inputId,
        type,
        className: cn(
          error && "border-destructive",
          variant === "minimal" && "border-0 shadow-none bg-transparent"
        ),
        ...props
      }
    ),
    error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-destructive", role: "alert", children: error })
  ] });
}
function SearchInput({
  placeholder = "Search...",
  value: valueProp,
  onChange,
  onSearch,
  debounceMs = 300,
  clearable = true,
  icon,
  variant = "default",
  size = "md",
  className
}) {
  const [internalValue, setInternalValue] = React15__namespace.useState("");
  const [debouncedValue, setDebouncedValue] = React15__namespace.useState("");
  const isControlled = valueProp !== void 0;
  const value = isControlled ? valueProp : internalValue;
  const setValue = isControlled ? onChange || (() => {
  }) : setInternalValue;
  React15__namespace.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      if (onSearch) {
        onSearch(value);
      }
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [value, debounceMs, onSearch]);
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };
  const handleClear = () => {
    setValue("");
    if (onChange) {
      onChange("");
    }
    if (onSearch) {
      onSearch("");
    }
  };
  const sizeClasses = {
    sm: "h-8 text-sm",
    md: "h-9 text-sm",
    lg: "h-10 text-base"
  };
  const variantClasses = {
    default: "border",
    minimal: "border-0 shadow-none bg-transparent",
    filled: "border-0 bg-muted"
  };
  const SearchIconComponent = icon || /* @__PURE__ */ jsxRuntime.jsx(lucideReact.SearchIcon, { className: "size-4" });
  return /* @__PURE__ */ jsxRuntime.jsxs(InputGroup, { className: cn("relative", className), "data-slot": "search-input", children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none", children: SearchIconComponent }),
    /* @__PURE__ */ jsxRuntime.jsx(
      InputGroupInput,
      {
        type: "search",
        placeholder,
        value,
        onChange: handleChange,
        className: cn(
          "pl-9 pr-9",
          sizeClasses[size],
          variantClasses[variant]
        )
      }
    ),
    clearable && value && /* @__PURE__ */ jsxRuntime.jsx(
      Button,
      {
        type: "button",
        variant: "ghost",
        size: "icon-sm",
        className: "absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6",
        onClick: handleClear,
        "aria-label": "Clear search",
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.XIcon, { className: "size-3" })
      }
    )
  ] });
}
function TriggerModal({
  open,
  onOpenChange,
  triggerLabel,
  trigger,
  triggerProps,
  stopPropagation = true,
  icon,
  title,
  description,
  children,
  footer,
  showCloseButton = true,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(Modal, { open, onOpenChange, ...props, children: [
    (triggerLabel || trigger) && /* @__PURE__ */ jsxRuntime.jsx(ModalTrigger, { asChild: true, children: trigger || /* @__PURE__ */ jsxRuntime.jsxs(Button, { ...triggerProps, stopPropagation, children: [
      icon && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "mr-2", children: icon }),
      triggerLabel
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      ModalContent,
      {
        "data-slot": "trigger-modal",
        showCloseButton,
        className,
        onClick: (e) => e.stopPropagation(),
        header: /* @__PURE__ */ jsxRuntime.jsxs(ModalHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(ModalTitle, { children: title }),
          description && /* @__PURE__ */ jsxRuntime.jsx(ModalDescription, { children: description })
        ] }),
        footer: footer ? /* @__PURE__ */ jsxRuntime.jsx(ModalFooter, { children: footer }) : void 0,
        children
      }
    )
  ] });
}
function ConfirmModal({
  open: openProp,
  onOpenChange,
  triggerLabel,
  triggerProps,
  stopPropagation = true,
  icon,
  text,
  title,
  description,
  onConfirm,
  confirmLabel,
  cancelLabel = "Cancel",
  variant = "default",
  loading = false,
  error,
  showModal = true,
  ...props
}) {
  const [open, setOpen] = React15__namespace.useState(openProp ?? false);
  const [isSubmitting, setIsSubmitting] = React15__namespace.useState(false);
  const isControlled = openProp !== void 0;
  const isOpen = isControlled ? openProp : open;
  const setIsOpen = isControlled ? onOpenChange : setOpen;
  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm();
      setIsOpen?.(false);
    } catch (err) {
      console.error("Confirm action error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  const getVariantConfig = () => {
    switch (variant) {
      case "delete":
      case "destructive":
        return {
          buttonVariant: "destructive",
          defaultConfirmLabel: "Delete"
        };
      case "save":
        return {
          buttonVariant: "default",
          defaultConfirmLabel: "Save"
        };
      case "warning":
        return {
          buttonVariant: "default",
          defaultConfirmLabel: "Continue"
        };
      default:
        return {
          buttonVariant: "default",
          defaultConfirmLabel: "Confirm"
        };
    }
  };
  const { buttonVariant, defaultConfirmLabel } = getVariantConfig();
  const finalConfirmLabel = confirmLabel || defaultConfirmLabel;
  const isLoading = loading || isSubmitting;
  const footer = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      Button,
      {
        variant: "outline",
        onClick: () => setIsOpen?.(false),
        disabled: isLoading,
        children: cancelLabel
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      Button,
      {
        variant: buttonVariant,
        onClick: handleConfirm,
        disabled: isLoading,
        children: isLoading ? "Loading..." : finalConfirmLabel
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntime.jsx(
    TriggerModal,
    {
      open: isOpen && showModal,
      onOpenChange: setIsOpen,
      triggerLabel,
      triggerProps,
      icon,
      stopPropagation,
      title,
      description: description || text,
      footer,
      showCloseButton: false,
      className: "data-slot-confirm-modal",
      ...props,
      children: error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-destructive", children: error })
    }
  );
}
function CopyButton({
  text,
  getText,
  onCopy,
  stopPropagation = true,
  ...props
}) {
  const [copied, setCopied] = React15__namespace.useState(false);
  const handleCopy = async (e) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    const textToCopy = getText ? getText() : text || "";
    if (!textToCopy) return;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    Button,
    {
      "data-slot": "copy-button",
      variant: "ghost",
      size: "icon",
      onClick: handleCopy,
      stopPropagation,
      ...props,
      children: copied ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CheckIcon, { className: "size-4" }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CopyIcon, { className: "size-4" })
    }
  );
}
function FormModal({
  open: openProp,
  onOpenChange,
  triggerLabel,
  triggerProps,
  icon,
  title,
  description,
  variant,
  itemType,
  onSubmit,
  submitLabel,
  submittingLabel,
  cancelLabel = "Cancel",
  loading: loadingProp,
  isSubmitDisabled,
  onCreated,
  fields,
  children,
  beforeFields,
  afterFields,
  ...props
}) {
  const [open, setOpen] = React15__namespace.useState(openProp ?? false);
  const [formData, setFormData] = React15__namespace.useState({});
  const [errors, setErrors] = React15__namespace.useState({});
  const [isSubmitting, setIsSubmitting] = React15__namespace.useState(false);
  const getSubmitLabel = () => {
    if (submittingLabel && (isSubmitting || loadingProp)) return submittingLabel;
    if (submitLabel) return submitLabel;
    if (variant === "create") {
      return itemType ? `Create ${itemType}` : "Create";
    }
    if (variant === "edit") {
      return itemType ? `Update ${itemType}` : "Update";
    }
    return "Submit";
  };
  const loading = loadingProp ?? isSubmitting;
  const isControlled = openProp !== void 0;
  const isOpen = isControlled ? openProp : open;
  const setIsOpen = isControlled ? onOpenChange : setOpen;
  React15__namespace.useEffect(() => {
    if (fields) {
      const initialData = {};
      fields.forEach((field) => {
        if (field.defaultValue !== void 0) {
          initialData[field.name] = field.defaultValue;
        }
      });
      setFormData(initialData);
    }
  }, [fields]);
  const fieldOptions = React15__namespace.useMemo(() => {
    if (!fields) return {};
    const optionsMap = {};
    fields.forEach((field) => {
      if (field.type === "select" && field.options) {
        if (Array.isArray(field.options)) {
          optionsMap[field.name] = field.options;
        } else if (typeof field.options === "function") {
          try {
            optionsMap[field.name] = field.options(formData);
          } catch (e) {
            console.error(`Error resolving options for field ${field.name}:`, e);
            optionsMap[field.name] = [];
          }
        }
      }
    });
    return optionsMap;
  }, [fields, formData]);
  const handleChange = (name, value, field) => {
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (field?.onChange) {
      field.onChange(value, {
        formData: newFormData,
        setFormData: (data) => {
          if (typeof data === "function") {
            setFormData((prev) => data(prev));
          } else {
            setFormData(data);
          }
        },
        fieldName: name
      });
    }
  };
  const validateField = (field, value) => {
    if (field.required && (value === void 0 || value === null || value === "")) {
      return `${field.label || field.name} is required`;
    }
    if (field.validation) {
      return field.validation(value);
    }
    return void 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fields) {
      return;
    }
    const newErrors = {};
    fields.forEach((field) => {
      const isActive = typeof field.active === "function" ? field.active(formData) : field.active !== false;
      if (isActive) {
        const error = validateField(field, formData[field.name]);
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      if (onCreated && variant === "create") {
        onCreated(formData);
      }
      setIsOpen?.(false);
      setFormData({});
      setErrors({});
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const renderField = (field) => {
    const isActive = typeof field.active === "function" ? field.active(formData) : field.active !== false;
    if (!isActive) return null;
    const value = formData[field.name] ?? field.defaultValue;
    const error = errors[field.name];
    const resolvedPlaceholder = typeof field.placeholder === "function" ? field.placeholder(formData) : field.placeholder;
    const resolvedRequired = typeof field.required === "function" ? field.required(formData) : field.required;
    const resolvedHelpText = typeof field.helpText === "function" ? field.helpText(formData) : field.helpText;
    switch (field.type) {
      case "text":
      case "email":
      case "url":
        return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            FormInput,
            {
              label: field.label,
              description: field.description,
              error,
              type: field.type,
              placeholder: resolvedPlaceholder,
              value: value || "",
              onChange: (e) => handleChange(field.name, e.target.value, field),
              required: resolvedRequired
            }
          ),
          resolvedHelpText && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: resolvedHelpText })
        ] }, field.name);
      case "number":
        return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            FormInput,
            {
              label: field.label,
              description: field.description,
              error,
              type: "number",
              placeholder: resolvedPlaceholder,
              value: value || "",
              onChange: (e) => handleChange(field.name, parseFloat(e.target.value) || 0, field),
              min: field.min,
              max: field.max,
              step: field.step,
              required: resolvedRequired
            }
          ),
          resolvedHelpText && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: resolvedHelpText })
        ] }, field.name);
      case "textarea":
        return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          field.label && /* @__PURE__ */ jsxRuntime.jsxs(Label, { htmlFor: field.name, className: error && "text-destructive", children: [
            field.label,
            resolvedRequired && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-destructive ml-1", children: "*" })
          ] }),
          field.description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: field.description }),
          /* @__PURE__ */ jsxRuntime.jsx(
            Textarea,
            {
              id: field.name,
              placeholder: resolvedPlaceholder,
              value: value || "",
              onChange: (e) => handleChange(field.name, e.target.value, field),
              className: error && "border-destructive",
              required: resolvedRequired,
              rows: field.rows
            }
          ),
          resolvedHelpText && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: resolvedHelpText }),
          error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-destructive", role: "alert", children: error })
        ] }, field.name);
      case "select":
        const resolvedOptions = fieldOptions[field.name] || [];
        const optionsKey = resolvedOptions.map((o) => o.value).join(",");
        return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          field.label && /* @__PURE__ */ jsxRuntime.jsxs(Label, { htmlFor: field.name, className: error && "text-destructive", children: [
            field.label,
            resolvedRequired && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-destructive ml-1", children: "*" })
          ] }),
          field.description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: field.description }),
          /* @__PURE__ */ jsxRuntime.jsxs(
            Select,
            {
              value: value || "",
              onValueChange: (val) => handleChange(field.name, val, field),
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(SelectTrigger, { id: field.name, className: error && "border-destructive", children: /* @__PURE__ */ jsxRuntime.jsx(SelectValue, { placeholder: resolvedPlaceholder || "Select..." }) }),
                /* @__PURE__ */ jsxRuntime.jsx(SelectContent, { children: resolvedOptions.map((option) => /* @__PURE__ */ jsxRuntime.jsx(SelectItem, { value: option.value, children: option.label }, option.value)) }, `select-content-${field.name}-${optionsKey}`)
              ]
            },
            `select-${field.name}-${optionsKey}`
          ),
          resolvedHelpText && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: resolvedHelpText }),
          error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-destructive", role: "alert", children: error })
        ] }, field.name);
      case "checkbox":
        return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              Checkbox,
              {
                id: field.name,
                checked: value || false,
                onCheckedChange: (checked) => handleChange(field.name, checked, field)
              }
            ),
            field.label && /* @__PURE__ */ jsxRuntime.jsxs(Label, { htmlFor: field.name, className: "cursor-pointer", children: [
              field.label,
              resolvedRequired && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-destructive ml-1", children: "*" })
            ] })
          ] }),
          field.description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground ml-6", children: field.description }),
          resolvedHelpText && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground ml-6", children: resolvedHelpText }),
          error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-destructive ml-6", role: "alert", children: error })
        ] }, field.name);
      case "upload":
        const handleFileChange = (e) => {
          const files = e.target.files;
          handleChange(field.name, files, field);
          if (field.onFileSelect && files && files.length > 0) {
            field.onFileSelect(files[0], {
              formData,
              setFormData: (data) => {
                if (typeof data === "function") {
                  setFormData((prev) => data(prev));
                } else {
                  setFormData(data);
                }
              }
            });
          }
        };
        const uploadVariantClasses = {
          default: "",
          dashed: "border-dashed border-2",
          outlined: "border-2"
        };
        const uploadSizeClasses = {
          sm: "text-xs py-1",
          md: "text-sm py-2",
          lg: "text-base py-3"
        };
        return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          field.label && /* @__PURE__ */ jsxRuntime.jsxs(Label, { htmlFor: field.name, className: error && "text-destructive", children: [
            field.label,
            resolvedRequired && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-destructive ml-1", children: "*" })
          ] }),
          field.description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: field.description }),
          /* @__PURE__ */ jsxRuntime.jsx(
            Upload,
            {
              id: field.name,
              accept: field.accept,
              multiple: field.multiple,
              onChange: handleFileChange,
              className: cn(
                error && "border-destructive",
                uploadVariantClasses[field.variant || "default"],
                uploadSizeClasses[field.size || "md"]
              )
            }
          ),
          resolvedHelpText && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: resolvedHelpText }),
          error && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-destructive", role: "alert", children: error })
        ] }, field.name);
      default:
        return null;
    }
  };
  const footer = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      Button,
      {
        type: "button",
        variant: "outline",
        onClick: () => setIsOpen?.(false),
        disabled: isSubmitting,
        children: cancelLabel
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      Button,
      {
        className: "ml-2",
        type: "submit",
        disabled: loading || (typeof isSubmitDisabled === "function" ? isSubmitDisabled(formData) : isSubmitDisabled ?? false),
        children: loading ? getSubmitLabel() : getSubmitLabel()
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntime.jsx(
    TriggerModal,
    {
      open: isOpen,
      onOpenChange: setIsOpen,
      triggerLabel,
      triggerProps,
      icon,
      stopPropagation: true,
      title,
      description,
      showCloseButton: false,
      footer,
      className: "data-slot-form-modal",
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, onClick: (e) => e.stopPropagation(), children: [
        beforeFields,
        fields ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-4", children: fields.map((field) => renderField(field)) }) : children,
        afterFields
      ] })
    }
  );
}
function HistoryControlButtons({
  canUndo = false,
  canRedo = false,
  isDirty = false,
  onUndo,
  onRedo,
  onReset,
  className,
  showLabels = false
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      "data-slot": "history-control-buttons",
      className: cn("flex items-center gap-1", className),
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: onUndo,
            disabled: !canUndo || !onUndo,
            title: "Undo (Ctrl+Z)",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(lucideReact.UndoIcon, { className: "size-4" }),
              showLabels && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only ml-2", children: "Undo" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: onRedo,
            disabled: !canRedo || !onRedo,
            title: "Redo (Ctrl+Shift+Z)",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(lucideReact.RedoIcon, { className: "size-4" }),
              showLabels && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only ml-2", children: "Redo" })
            ]
          }
        ),
        onReset && /* @__PURE__ */ jsxRuntime.jsxs(
          Button,
          {
            variant: "ghost",
            size: "icon",
            onClick: onReset,
            disabled: !isDirty,
            title: "Reset changes",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(lucideReact.RotateCcwIcon, { className: "size-4" }),
              showLabels && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only ml-2", children: "Reset" })
            ]
          }
        )
      ]
    }
  );
}
function Box({
  className,
  as: Component2 = "div",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Component2,
    {
      "data-slot": "box",
      className: cn(className),
      ...props
    }
  );
}
function Stack({
  className,
  direction = "column",
  spacing = "md",
  align,
  justify,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Box,
    {
      "data-slot": "stack",
      className: cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        spacing === "sm" && (direction === "row" ? "gap-2" : "space-y-2"),
        spacing === "md" && (direction === "row" ? "gap-4" : "space-y-4"),
        spacing === "lg" && (direction === "row" ? "gap-6" : "space-y-6"),
        align === "start" && "items-start",
        align === "center" && "items-center",
        align === "end" && "items-end",
        align === "stretch" && "items-stretch",
        justify === "start" && "justify-start",
        justify === "center" && "justify-center",
        justify === "end" && "justify-end",
        justify === "between" && "justify-between",
        justify === "around" && "justify-around",
        className
      ),
      ...props
    }
  );
}
function Grid({
  className,
  cols = 3,
  gap = "md",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "grid",
      className: cn(
        "grid",
        cols === 1 && "grid-cols-1",
        cols === 2 && "grid-cols-2",
        cols === 3 && "grid-cols-3",
        cols === 4 && "grid-cols-4",
        cols === 6 && "grid-cols-6",
        cols === 12 && "grid-cols-12",
        gap === "sm" && "gap-2",
        gap === "md" && "gap-4",
        gap === "lg" && "gap-6",
        className
      ),
      ...props
    }
  );
}
function AspectRatio({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(AspectRatioPrimitive__namespace.Root, { "data-slot": "aspect-ratio", ...props });
}
function ScrollArea({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    ScrollAreaPrimitive__namespace.Root,
    {
      "data-slot": "scroll-area",
      className: cn("relative", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          ScrollAreaPrimitive__namespace.Viewport,
          {
            "data-slot": "scroll-area-viewport",
            className: "focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1",
            children
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(ScrollBar, {}),
        /* @__PURE__ */ jsxRuntime.jsx(ScrollAreaPrimitive__namespace.Corner, {})
      ]
    }
  );
}
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ScrollAreaPrimitive__namespace.ScrollAreaScrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation,
      className: cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        ScrollAreaPrimitive__namespace.ScrollAreaThumb,
        {
          "data-slot": "scroll-area-thumb",
          className: "bg-border relative flex-1 rounded-full"
        }
      )
    }
  );
}
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      ),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCaption({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "caption",
    {
      "data-slot": "table-caption",
      className: cn("text-muted-foreground mt-4 text-sm", className),
      ...props
    }
  );
}
function Container({
  className,
  maxWidth = "xl",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Box,
    {
      "data-slot": "container",
      className: cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        maxWidth === "sm" && "max-w-screen-sm",
        maxWidth === "md" && "max-w-screen-md",
        maxWidth === "lg" && "max-w-screen-lg",
        maxWidth === "xl" && "max-w-screen-xl",
        maxWidth === "2xl" && "max-w-screen-2xl",
        maxWidth === "full" && "max-w-full",
        className
      ),
      ...props
    }
  );
}
var emptyScreenVariants = classVarianceAuthority.cva(
  "py-12",
  {
    variants: {
      variant: {
        default: "",
        minimal: "py-6",
        spacious: "py-16",
        error: "py-12"
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
function EmptyScreen({
  title = "No items",
  description,
  icon,
  action,
  variant,
  size,
  className
}) {
  const errorIcon = variant === "error" ? icon || /* @__PURE__ */ jsxRuntime.jsx(lucideReact.AlertCircleIcon, { className: "size-12 text-destructive" }) : icon;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    Empty,
    {
      className: cn(
        emptyScreenVariants({ variant, size }),
        variant === "error" && "text-destructive",
        className
      ),
      "data-slot": "empty-screen",
      children: [
        errorIcon && /* @__PURE__ */ jsxRuntime.jsx(EmptyContent, { children: errorIcon }),
        /* @__PURE__ */ jsxRuntime.jsxs(EmptyHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(EmptyTitle, { children: title }),
          description && /* @__PURE__ */ jsxRuntime.jsx(EmptyDescription, { children: description })
        ] }),
        action && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-4", children: action })
      ]
    }
  );
}
function List3({
  items = [],
  renderItem,
  searchable = false,
  searchPlaceholder = "Search...",
  emptyTitle = "No items",
  emptyDescription,
  emptyAction,
  loading = false,
  skeletonCount = 6,
  renderSkeleton,
  type = "list",
  gridCols = { default: 1, md: 2, lg: 3 },
  className,
  searchValue: searchValueProp,
  onSearchChange: onSearchChangeProp,
  filterItems,
  error,
  header,
  footer
}) {
  const [internalSearchValue, setInternalSearchValue] = React15__namespace.useState("");
  const isControlled = searchValueProp !== void 0;
  const searchValue = isControlled ? searchValueProp : internalSearchValue;
  const setSearchValue = isControlled ? onSearchChangeProp || (() => {
  }) : setInternalSearchValue;
  const safeItems = React15__namespace.useMemo(() => {
    return Array.isArray(items) ? items : [];
  }, [items]);
  const filteredItems = React15__namespace.useMemo(() => {
    if (!searchable || !searchValue) return safeItems;
    if (filterItems) {
      return filterItems(safeItems, searchValue);
    }
    const lowerSearch = searchValue.toLowerCase();
    return safeItems.filter((item) => {
      const itemStr = JSON.stringify(item).toLowerCase();
      return itemStr.includes(lowerSearch);
    });
  }, [safeItems, searchValue, searchable, filterItems]);
  const gridClasses = React15__namespace.useMemo(() => {
    if (type !== "grid") return "";
    const cols = gridCols || {};
    const classes = [];
    const colMap = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6"
    };
    if (cols.default && colMap[cols.default]) {
      classes.push(colMap[cols.default]);
    }
    if (cols.md && colMap[cols.md]) {
      classes.push(`md:${colMap[cols.md]}`);
    }
    if (cols.lg && colMap[cols.lg]) {
      classes.push(`lg:${colMap[cols.lg]}`);
    }
    return classes.join(" ");
  }, [type, gridCols]);
  const defaultRenderSkeleton = () => /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: type === "grid" ? "h-32" : "h-16" });
  const skeletonRenderer = renderSkeleton || defaultRenderSkeleton;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("space-y-4", className), "data-slot": "enhanced-list", children: [
    header && /* @__PURE__ */ jsxRuntime.jsx("div", { "data-slot": "list-header", children: header }),
    searchable && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.SearchIcon, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntime.jsx(
        TextInput,
        {
          type: "search",
          placeholder: searchPlaceholder,
          value: searchValue,
          onChange: (e) => setSearchValue(e.target.value),
          className: "pl-9"
        }
      )
    ] }),
    error && !loading && /* @__PURE__ */ jsxRuntime.jsx("div", { "data-slot": "list-error", className: "text-destructive text-sm", children: typeof error === "string" ? error : error }),
    loading && !error && /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: cn(
          type === "grid" && "grid gap-4",
          type === "list" && "space-y-2",
          gridClasses
        ),
        children: Array.from({ length: skeletonCount }).map((_, i) => /* @__PURE__ */ jsxRuntime.jsx(React15__namespace.Fragment, { children: skeletonRenderer() }, i))
      }
    ),
    !loading && !error && filteredItems.length === 0 && /* @__PURE__ */ jsxRuntime.jsx(
      EmptyScreen,
      {
        title: emptyTitle,
        description: emptyDescription,
        action: emptyAction
      }
    ),
    !loading && !error && filteredItems.length > 0 && /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: cn(
          type === "grid" && "grid gap-4",
          type === "list" && "space-y-2",
          gridClasses
        ),
        children: filteredItems.map((item, index) => /* @__PURE__ */ jsxRuntime.jsx(React15__namespace.Fragment, { children: renderItem(item, index) }, index))
      }
    ),
    footer && /* @__PURE__ */ jsxRuntime.jsx("div", { "data-slot": "list-footer", children: footer })
  ] });
}
var headerVariants = classVarianceAuthority.cva(
  "w-full bg-background",
  {
    variants: {
      variant: {
        default: "border-b",
        bordered: "border-b-2"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Header2({
  className,
  sticky = false,
  variant,
  heading,
  caption,
  description,
  badge,
  actions,
  left,
  right,
  children,
  ...props
}) {
  const actionsContent = actions && actions.length > 0 ? actions : right;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Box,
    {
      as: "header",
      "data-slot": "header",
      className: cn(
        headerVariants({ variant }),
        sticky && "sticky top-0 z-50",
        className
      ),
      ...props,
      children: heading || caption || description || left || actionsContent || badge ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-4", children: [
          left,
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
              heading && /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "text-lg font-semibold", children: heading }),
              badge
            ] }),
            caption && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: caption }),
            description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: description })
          ] })
        ] }),
        actionsContent && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center gap-2", children: actionsContent })
      ] }) : children
    }
  );
}
function Footer({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Box,
    {
      as: "footer",
      "data-slot": "footer",
      className: cn(
        "w-full border-t bg-background",
        className
      ),
      ...props
    }
  );
}
function CollapsiblePanel({
  children,
  direction = "horizontal",
  position = "right",
  defaultOpen = true,
  minWidth = "w-80",
  minHeight = "h-full",
  keyword = "",
  className,
  triggerClassName,
  onToggle,
  open: openProp,
  onOpenChange
}) {
  const [internalOpen, setInternalOpen] = React15__namespace.useState(defaultOpen);
  const isControlled = openProp !== void 0;
  const isOpen = isControlled ? openProp : internalOpen;
  const setIsOpen = isControlled ? onOpenChange : setInternalOpen;
  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen?.(newState);
    onToggle?.(newState);
  };
  const getCollapseClasses = () => {
    if (direction === "horizontal") {
      return isOpen ? minWidth : "w-0";
    } else {
      return isOpen ? minHeight : "h-0";
    }
  };
  const getTriggerIcon = () => {
    if (direction === "horizontal") {
      if (position === "left") {
        return isOpen ? lucideReact.ChevronRight : lucideReact.ChevronLeft;
      } else {
        return isOpen ? lucideReact.ChevronLeft : lucideReact.ChevronRight;
      }
    } else {
      if (position === "top") {
        return isOpen ? lucideReact.ChevronDown : lucideReact.ChevronUp;
      } else {
        return isOpen ? lucideReact.ChevronUp : lucideReact.ChevronDown;
      }
    }
  };
  const getTriggerPosition = () => {
    if (direction === "horizontal") {
      if (position === "left") {
        return isOpen ? "absolute -left-3 top-1/2 -translate-y-1/2" : "absolute -left-6 top-1/2 -translate-y-1/2";
      } else {
        return isOpen ? "absolute -right-3 top-1/2 -translate-y-1/2" : "absolute -right-6 top-1/2 -translate-y-1/2";
      }
    } else {
      if (position === "top") {
        return isOpen ? "absolute -top-3 left-1/2 -translate-x-1/2" : "absolute -top-6 left-1/2 -translate-x-1/2";
      } else {
        return isOpen ? "absolute -bottom-3 left-1/2 -translate-x-1/2" : "absolute -bottom-6 left-1/2 -translate-x-1/2";
      }
    }
  };
  const TriggerIcon = getTriggerIcon();
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn(
        "relative transition-all duration-300 ease-in-out",
        getCollapseClasses(),
        className
      ),
      children: [
        isOpen && /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: cn(
              "h-full transition-opacity duration-300",
              direction === "horizontal" ? minWidth : "w-full"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          Button,
          {
            variant: "ghost",
            onClick: handleToggle,
            className: cn(
              getTriggerPosition(),
              "w-6 h-6 p-0 bg-muted border border-border rounded-full",
              "flex items-center justify-center text-foreground hover:bg-accent",
              "transition-colors shadow-lg hover:scale-110 z-50",
              "min-w-0",
              // Override Button's min-width
              triggerClassName
            ),
            title: `${isOpen ? "Collapse" : "Expand"} ${keyword || "panel"}`,
            "data-slot": "collapsible-panel-trigger",
            children: /* @__PURE__ */ jsxRuntime.jsx(TriggerIcon, { className: "w-3 h-3" })
          }
        )
      ]
    }
  );
}
function ResizablePanelGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ResizablePrimitive__namespace.PanelGroup,
    {
      "data-slot": "resizable-panel-group",
      className: cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      ),
      ...props
    }
  );
}
function ResizablePanel({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(ResizablePrimitive__namespace.Panel, { "data-slot": "resizable-panel", ...props });
}
function ResizableHandle({
  withHandle,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    ResizablePrimitive__namespace.PanelResizeHandle,
    {
      "data-slot": "resizable-handle",
      className: cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      ),
      ...props,
      children: withHandle && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.GripVerticalIcon, { className: "size-2.5" }) })
    }
  );
}
function ResizeContainer({
  children,
  direction = "horizontal",
  className,
  maxWidth,
  maxHeight,
  containerClassName,
  contentClassName,
  padding,
  minScale,
  maxScale,
  fit = "contain",
  showControls
}) {
  const childArray = React15__namespace.Children.toArray(children);
  const containerStyle = {};
  if (maxWidth) {
    containerStyle.maxWidth = typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
  }
  if (maxHeight) {
    containerStyle.maxHeight = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;
  }
  const contentStyle = {};
  if (padding !== void 0) {
    contentStyle.padding = `${padding}px`;
  }
  if (minScale !== void 0 || maxScale !== void 0 || fit) {
    contentStyle.transformOrigin = "top left";
    if (fit === "contain" || fit === "cover") {
      contentStyle.objectFit = fit;
    }
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn("relative", containerClassName),
      style: containerStyle,
      "data-slot": "resize-container-wrapper",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          ResizablePanelGroup,
          {
            direction,
            className: cn("w-full", className),
            "data-slot": "resize-container",
            children: childArray.map((child, index) => /* @__PURE__ */ jsxRuntime.jsxs(React15__namespace.Fragment, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(ResizablePanel, { defaultSize: 50, children: /* @__PURE__ */ jsxRuntime.jsx(
                "div",
                {
                  className: cn("w-full h-full", contentClassName),
                  style: contentStyle,
                  children: child
                }
              ) }),
              index < childArray.length - 1 && /* @__PURE__ */ jsxRuntime.jsx(ResizableHandle, {})
            ] }, index))
          }
        ),
        showControls && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute bottom-2 right-2 flex gap-2", "data-slot": "resize-controls" })
      ]
    }
  );
}
function useIsMobile() {
  const [isMobile, setIsMobile] = React15.useState(false);
  React15.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
}
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = React15.createContext(null);
function useSidebar() {
  const context = React15.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React15.useState(false);
  const [_open, _setOpen] = React15.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React15.useCallback(
    (value) => {
      const openState = typeof value === "function" ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
      if (typeof document !== "undefined") {
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      }
    },
    [setOpenProp, open]
  );
  const toggleSidebar = React15.useCallback(() => {
    return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
  }, [isMobile, setOpen, setOpenMobile]);
  React15.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);
  const state = open ? "expanded" : "collapsed";
  const contextValue = React15.useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntime.jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "sidebar-wrapper",
      style: {
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        ...style
      },
      className: cn(
        "group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
        className
      ),
      ...props,
      children
    }
  ) }) });
}
function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
  if (collapsible === "none") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        "data-slot": "sidebar",
        className: cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
          className
        ),
        ...props,
        children
      }
    );
  }
  if (isMobile) {
    return /* @__PURE__ */ jsxRuntime.jsx(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxRuntime.jsxs(
      SheetContent,
      {
        "data-sidebar": "sidebar",
        "data-slot": "sidebar",
        "data-mobile": "true",
        className: "bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden",
        style: {
          "--sidebar-width": SIDEBAR_WIDTH_MOBILE
        },
        side,
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs(SheetHeader, { className: "sr-only", children: [
            /* @__PURE__ */ jsxRuntime.jsx(SheetTitle, { children: "Sidebar" }),
            /* @__PURE__ */ jsxRuntime.jsx(SheetDescription, { children: "Displays the mobile sidebar." })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex h-full w-full flex-col", children })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: "group peer text-sidebar-foreground hidden md:block",
      "data-state": state,
      "data-collapsible": state === "collapsed" ? collapsible : "",
      "data-variant": variant,
      "data-side": side,
      "data-slot": "sidebar",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            "data-slot": "sidebar-gap",
            className: cn(
              "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
            )
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            "data-slot": "sidebar-container",
            className: cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              className
            ),
            ...props,
            children: /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                "data-sidebar": "sidebar",
                "data-slot": "sidebar-inner",
                className: "bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
                children
              }
            )
          }
        )
      ]
    }
  );
}
function SidebarTrigger({
  className,
  onClick,
  ...props
}) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxRuntime.jsxs(
    Button,
    {
      "data-sidebar": "trigger",
      "data-slot": "sidebar-trigger",
      variant: "ghost",
      size: "icon",
      className: cn("size-7", className),
      onClick: (event) => {
        onClick?.(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.PanelLeftIcon, {}),
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function SidebarRail({ className, ...props }) {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      "data-sidebar": "rail",
      "data-slot": "sidebar-rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: toggleSidebar,
      title: "Toggle Sidebar",
      className: cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      ),
      ...props
    }
  );
}
function SidebarInset({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "main",
    {
      "data-slot": "sidebar-inset",
      className: cn(
        "bg-background relative flex w-full flex-1 flex-col",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        className
      ),
      ...props
    }
  );
}
function SidebarInput({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    TextInput,
    {
      "data-slot": "sidebar-input",
      "data-sidebar": "input",
      className: cn("bg-background h-8 w-full shadow-none", className),
      ...props
    }
  );
}
function SidebarHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "sidebar-header",
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "sidebar-footer",
      "data-sidebar": "footer",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
}
function SidebarSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Separator,
    {
      "data-slot": "sidebar-separator",
      "data-sidebar": "separator",
      className: cn("bg-sidebar-border mx-2 w-auto", className),
      ...props
    }
  );
}
function SidebarContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "sidebar-content",
      "data-sidebar": "content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarGroup({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "sidebar-group",
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      ...props
    }
  );
}
function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? reactSlot.Slot : "div";
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      "data-slot": "sidebar-group-label",
      "data-sidebar": "group-label",
      className: cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      ),
      ...props
    }
  );
}
function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? reactSlot.Slot : "button";
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      "data-slot": "sidebar-group-action",
      "data-sidebar": "group-action",
      className: cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarGroupContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "sidebar-group-content",
      "data-sidebar": "group-content",
      className: cn("w-full text-sm", className),
      ...props
    }
  );
}
function SidebarMenu({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "ul",
    {
      "data-slot": "sidebar-menu",
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    }
  );
}
function SidebarMenuItem({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "li",
    {
      "data-slot": "sidebar-menu-item",
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  );
}
var sidebarMenuButtonVariants = classVarianceAuthority.cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}) {
  const Comp = asChild ? reactSlot.Slot : "button";
  const { isMobile, state } = useSidebar();
  const button = /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-button",
      "data-sidebar": "menu-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(sidebarMenuButtonVariants({ variant, size }), className),
      ...props
    }
  );
  if (!tooltip) {
    return button;
  }
  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip
    };
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(TooltipTrigger, { asChild: true, children: button }),
    /* @__PURE__ */ jsxRuntime.jsx(
      TooltipContent,
      {
        side: "right",
        align: "center",
        hidden: state !== "collapsed" || isMobile,
        ...tooltip
      }
    )
  ] });
}
function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}) {
  const Comp = asChild ? reactSlot.Slot : "button";
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-action",
      "data-sidebar": "menu-action",
      className: cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover && "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
        className
      ),
      ...props
    }
  );
}
function SidebarMenuBadge({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "sidebar-menu-badge",
      "data-sidebar": "menu-badge",
      className: cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}) {
  const width = React15.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      "data-slot": "sidebar-menu-skeleton",
      "data-sidebar": "menu-skeleton",
      className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
      ...props,
      children: [
        showIcon && /* @__PURE__ */ jsxRuntime.jsx(
          Skeleton,
          {
            className: "size-4 rounded-md",
            "data-sidebar": "menu-skeleton-icon"
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          Skeleton,
          {
            className: "h-4 max-w-(--skeleton-width) flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: {
              "--skeleton-width": width
            }
          }
        )
      ]
    }
  );
}
function SidebarMenuSub({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "ul",
    {
      "data-slot": "sidebar-menu-sub",
      "data-sidebar": "menu-sub",
      className: cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
}
function SidebarMenuSubItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "li",
    {
      "data-slot": "sidebar-menu-sub-item",
      "data-sidebar": "menu-sub-item",
      className: cn("group/menu-sub-item relative", className),
      ...props
    }
  );
}
function SidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}) {
  const Comp = asChild ? reactSlot.Slot : "a";
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      "data-slot": "sidebar-menu-sub-button",
      "data-sidebar": "menu-sub-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
}

// src/themes/themeConfig.ts
var THEME_CATEGORY_ORDER = ["color", "typography", "shape", "density", "animation", "custom"];
var baseThemeCategories = {
  color: {
    name: "Color",
    order: 1,
    themes: {
      white: {
        name: "White",
        file: "color/white.json",
        icon: "\u{1F3A8}",
        description: "Light theme with white background"
      },
      dark: {
        name: "Dark",
        file: "color/dark.json",
        icon: "\u{1F319}",
        description: "Dark theme with dark background"
      }
    }
  },
  typography: {
    name: "Typography",
    order: 2,
    themes: {
      sans: {
        name: "Sans",
        file: "typography/sans.json",
        icon: "\u{1F4DD}",
        description: "Sans-serif font family"
      },
      serif: {
        name: "Serif",
        file: "typography/serif.json",
        icon: "\u{1F4D6}",
        description: "Serif font family"
      }
    }
  },
  shape: {
    name: "Shape",
    order: 3,
    themes: {
      smooth: {
        name: "Smooth",
        file: "shape/smooth.json",
        icon: "\u{1F532}",
        description: "Smooth rounded corners"
      },
      sharp: {
        name: "Sharp",
        file: "shape/sharp.json",
        icon: "\u2B1C",
        description: "Sharp square corners"
      }
    }
  },
  density: {
    name: "Density",
    order: 4,
    themes: {
      comfortable: {
        name: "Comfortable",
        file: "density/comfortable.json",
        icon: "\u{1F4CF}",
        description: "Comfortable spacing"
      },
      compact: {
        name: "Compact",
        file: "density/compact.json",
        icon: "\u{1F4D0}",
        description: "Compact spacing"
      }
    }
  },
  animation: {
    name: "Animation",
    order: 5,
    themes: {
      gentle: {
        name: "Gentle",
        file: "animation/gentle.json",
        icon: "\u2728",
        description: "Gentle animations"
      },
      brisk: {
        name: "Brisk",
        file: "animation/brisk.json",
        icon: "\u26A1",
        description: "Fast, brisk animations"
      }
    }
  },
  custom: {
    name: "Custom",
    order: 6,
    themes: {
      brand: {
        name: "Brand",
        file: "custom/brand.json",
        icon: "\u{1F3AF}",
        description: "Brand colors with purple and pink accents"
      },
      minimal: {
        name: "Minimal",
        file: "custom/minimal.json",
        icon: "\u26AA",
        description: "Minimal theme with reduced spacing"
      }
    }
  }
};
var discoveredThemesCache = null;
async function discoverThemes() {
  if (discoveredThemesCache) {
    return discoveredThemesCache;
  }
  const themes = JSON.parse(JSON.stringify(baseThemeCategories));
  discoveredThemesCache = themes;
  return themes;
}
function registerTheme(category, themeId, metadata) {
  if (!discoveredThemesCache) {
    discoveredThemesCache = JSON.parse(JSON.stringify(baseThemeCategories));
  }
  const cache = discoveredThemesCache;
  if (!cache[category]) {
    let order = 99;
    if (THEME_CATEGORY_ORDER.includes(category)) {
      const index = THEME_CATEGORY_ORDER.indexOf(category);
      order = (index + 1) * 10;
    }
    cache[category] = {
      name: category.charAt(0).toUpperCase() + category.slice(1),
      order,
      themes: {}
    };
  }
  cache[category].themes[themeId] = {
    name: metadata.name,
    file: metadata.file,
    icon: metadata.icon || "\u{1F3A8}",
    description: metadata.description || ""
  };
  return cache;
}
async function registerThemeFromFile(category, themeId, filePath) {
  const tokensBase = typeof window !== "undefined" && window.__THEME_TOKENS_BASE__ ? window.__THEME_TOKENS_BASE__ : "/tokens";
  const path = filePath || `${tokensBase}/themes/${category}/${themeId}.json`;
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load theme file: ${response.statusText}`);
    }
    const themeData = await response.json();
    registerTheme(category, themeId, {
      name: themeData.name || themeId.charAt(0).toUpperCase() + themeId.slice(1),
      file: filePath || `${category}/${themeId}.json`,
      icon: themeData.icon || "\u{1F3A8}",
      description: themeData.description || `Custom ${category} theme: ${themeId}`
    });
    return { success: true, themeId, category };
  } catch (error) {
    if (typeof window !== "undefined" && window.__DESIGN_SYSTEM_DEBUG__) {
      console.error(`Failed to register theme from ${path}:`, error);
    }
    throw error;
  }
}
async function getThemeCategories() {
  return await discoverThemes();
}
function getThemeFilePath(category, themeId) {
  const categories = discoveredThemesCache || baseThemeCategories;
  const theme = categories[category]?.themes[themeId];
  if (!theme) return null;
  return `/tokens/themes/${theme.file}`;
}
async function getThemesForCategory(category) {
  const categories = await getThemeCategories();
  return categories[category]?.themes || {};
}
async function getTheme(category, themeId) {
  const categories = await getThemeCategories();
  return categories[category]?.themes[themeId] || null;
}

// src/tokens/base.json
var base_default = {
  _createdBy: "shru-design-system library",
  color: {
    primary: "{palette.blue.500}",
    "primary-hover": "{palette.blue.600}",
    "primary-foreground": "{palette.white}",
    secondary: "{palette.gray.100}",
    "secondary-foreground": "{palette.gray.900}",
    background: "{palette.white}",
    foreground: "{palette.gray.900}",
    card: "{palette.white}",
    "card-foreground": "{palette.gray.900}",
    popover: "{palette.white}",
    "popover-foreground": "{palette.gray.900}",
    muted: "{palette.gray.100}",
    "muted-foreground": "{palette.gray.500}",
    accent: "{palette.gray.100}",
    "accent-foreground": "{palette.gray.900}",
    destructive: "{palette.red.500}",
    "destructive-foreground": "{palette.white}",
    border: "{palette.gray.200}",
    input: "{palette.gray.200}",
    ring: "{palette.gray.400}",
    skeleton: "{palette.gray.200}"
  },
  spacing: {
    component: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem"
    },
    base: "0.25rem"
  },
  font: {
    body: "var(--font-sans)",
    sans: "var(--font-sans)",
    mono: "var(--font-mono)"
  },
  radius: {
    button: "0.375rem",
    card: "0.5rem",
    input: "0.375rem"
  }
};

// src/tokens/palettes.json
var palettes_default = {
  _createdBy: "shru-design-system library",
  palette: {
    white: "#ffffff",
    black: "#000000",
    transparent: "transparent",
    gray: {
      "50": "#f9fafb",
      "100": "#f3f4f6",
      "200": "#e5e7eb",
      "300": "#d1d5db",
      "400": "#9ca3af",
      "500": "#6b7280",
      "600": "#4b5563",
      "700": "#374151",
      "800": "#1f2937",
      "900": "#111827",
      "950": "#030712"
    },
    blue: {
      "50": "#eff6ff",
      "100": "#dbeafe",
      "200": "#bfdbfe",
      "300": "#93c5fd",
      "400": "#60a5fa",
      "500": "#3b82f6",
      "600": "#2563eb",
      "700": "#1d4ed8",
      "800": "#1e40af",
      "900": "#1e3a8a",
      "950": "#172554"
    },
    red: {
      "50": "#fef2f2",
      "100": "#fee2e2",
      "200": "#fecaca",
      "300": "#fca5a5",
      "400": "#f87171",
      "500": "#ef4444",
      "600": "#dc2626",
      "700": "#b91c1c",
      "800": "#991b1b",
      "900": "#7f1d1d",
      "950": "#450a0a"
    },
    purple: {
      "50": "#faf5ff",
      "100": "#f3e8ff",
      "200": "#e9d5ff",
      "300": "#d8b4fe",
      "400": "#c084fc",
      "500": "#a855f7",
      "600": "#9333ea",
      "700": "#7e22ce",
      "800": "#6b21a8",
      "900": "#581c87",
      "950": "#3b0764"
    },
    pink: {
      "50": "#fdf2f8",
      "100": "#fce7f3",
      "200": "#fbcfe8",
      "300": "#f9a8d4",
      "400": "#f472b6",
      "500": "#ec4899",
      "600": "#db2777",
      "700": "#be185d",
      "800": "#9f1239",
      "900": "#831843",
      "950": "#500724"
    }
  }
};

// src/tokens/themes/color/dark.json
var dark_default = {
  _createdBy: "shru-design-system library",
  color: {
    primary: "{palette.blue.400}",
    "primary-foreground": "{palette.gray.900}",
    background: "{palette.gray.900}",
    foreground: "{palette.gray.50}",
    card: "{palette.gray.800}",
    "card-foreground": "{palette.gray.50}",
    popover: "{palette.gray.800}",
    "popover-foreground": "{palette.gray.50}",
    secondary: "{palette.gray.800}",
    "secondary-foreground": "{palette.gray.50}",
    muted: "{palette.gray.800}",
    "muted-foreground": "{palette.gray.400}",
    accent: "{palette.gray.800}",
    "accent-foreground": "{palette.gray.50}",
    destructive: "{palette.red.500}",
    "destructive-foreground": "{palette.white}",
    border: "{palette.gray.700}",
    input: "{palette.gray.700}",
    ring: "{palette.gray.600}",
    skeleton: "{palette.gray.700}"
  }
};

// src/tokens/themes/color/white.json
var white_default = {
  _createdBy: "shru-design-system library",
  color: {
    primary: "{palette.blue.500}",
    "primary-foreground": "{palette.white}",
    background: "{palette.white}",
    foreground: "{palette.gray.900}",
    card: "{palette.white}",
    "card-foreground": "{palette.gray.900}",
    popover: "{palette.white}",
    "popover-foreground": "{palette.gray.900}",
    secondary: "{palette.gray.100}",
    "secondary-foreground": "{palette.gray.900}",
    muted: "{palette.gray.100}",
    "muted-foreground": "{palette.gray.500}",
    accent: "{palette.gray.100}",
    "accent-foreground": "{palette.gray.900}",
    destructive: "{palette.red.500}",
    "destructive-foreground": "{palette.white}",
    border: "{palette.gray.200}",
    input: "{palette.gray.200}",
    ring: "{palette.gray.400}",
    skeleton: "{palette.gray.200}"
  }
};

// src/tokens/themes/typography/sans.json
var sans_default = {
  _createdBy: "shru-design-system library",
  font: {
    body: "system-ui, -apple-system, sans-serif",
    sans: "system-ui, -apple-system, sans-serif"
  }
};

// src/tokens/themes/typography/serif.json
var serif_default = {
  _createdBy: "shru-design-system library",
  font: {
    body: "Georgia, serif",
    sans: "Georgia, serif"
  }
};

// src/tokens/themes/shape/smooth.json
var smooth_default = {
  _createdBy: "shru-design-system library",
  radius: {
    button: "0.5rem",
    card: "0.75rem",
    input: "0.5rem"
  }
};

// src/tokens/themes/shape/sharp.json
var sharp_default = {
  _createdBy: "shru-design-system library",
  radius: {
    button: "0",
    card: "0",
    input: "0"
  }
};

// src/tokens/themes/density/comfortable.json
var comfortable_default = {
  _createdBy: "shru-design-system library",
  spacing: {
    component: {
      xs: "0.5rem",
      sm: "0.75rem",
      md: "1.25rem",
      lg: "2rem",
      xl: "2.5rem"
    }
  }
};

// src/tokens/themes/density/compact.json
var compact_default = {
  _createdBy: "shru-design-system library",
  spacing: {
    component: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "0.75rem",
      lg: "1rem",
      xl: "1.5rem"
    }
  }
};

// src/tokens/themes/animation/gentle.json
var gentle_default = {
  _createdBy: "shru-design-system library",
  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms"
    }
  }
};

// src/tokens/themes/animation/brisk.json
var brisk_default = {
  _createdBy: "shru-design-system library",
  animation: {
    duration: {
      fast: "100ms",
      normal: "200ms",
      slow: "300ms"
    }
  }
};

// src/tokens/themes/custom/brand.json
var brand_default = {
  _createdBy: "shru-design-system library",
  color: {
    primary: "{palette.purple.600}",
    "primary-foreground": "{palette.white}",
    accent: "{palette.pink.500}",
    "accent-foreground": "{palette.white}"
  },
  radius: {
    button: "0.5rem",
    card: "0.75rem"
  }
};

// src/tokens/themes/custom/minimal.json
var minimal_default = {
  _createdBy: "shru-design-system library",
  color: {
    primary: "{palette.gray.700}",
    "primary-foreground": "{palette.white}",
    background: "{palette.white}",
    foreground: "{palette.gray.900}"
  },
  spacing: {
    component: {
      xs: "0.375rem",
      sm: "0.5rem",
      md: "0.75rem"
    }
  }
};

// src/themes/tokenLoader.ts
var EMBEDDED_TOKEN_BASE = "__EMBEDDED__";
var EMBEDDED_TOKENS = {
  "base.json": base_default,
  "palettes.json": palettes_default,
  "themes/color/dark.json": dark_default,
  "themes/color/white.json": white_default,
  "themes/typography/sans.json": sans_default,
  "themes/typography/serif.json": serif_default,
  "themes/shape/smooth.json": smooth_default,
  "themes/shape/sharp.json": sharp_default,
  "themes/density/comfortable.json": comfortable_default,
  "themes/density/compact.json": compact_default,
  "themes/animation/gentle.json": gentle_default,
  "themes/animation/brisk.json": brisk_default,
  "themes/custom/brand.json": brand_default,
  "themes/custom/minimal.json": minimal_default
};
function normalizeTokenPath(path) {
  return path.replace(/^\/?tokens\//, "");
}
function getEmbeddedToken(normalizedPath) {
  return EMBEDDED_TOKENS[normalizedPath];
}

// src/themes/themeUtils.ts
function getThemeName(selectedThemes) {
  const parts = [];
  if (selectedThemes.color) parts.push(selectedThemes.color);
  if (selectedThemes.typography) parts.push(selectedThemes.typography);
  if (selectedThemes.shape) parts.push(selectedThemes.shape);
  if (selectedThemes.density) parts.push(selectedThemes.density);
  if (selectedThemes.animation) parts.push(selectedThemes.animation);
  return parts.length > 0 ? parts.join("-") : "default";
}
function validateThemeSelection(selectedThemes, themeCategories) {
  const errors = [];
  for (const [category, themeId] of Object.entries(selectedThemes)) {
    if (!themeId) continue;
    const categoryConfig = themeCategories[category];
    if (!categoryConfig) {
      errors.push(`Unknown category: ${category}`);
      continue;
    }
    const theme = categoryConfig.themes[themeId];
    if (!theme) {
      errors.push(`Theme ${themeId} not found in category ${category}`);
    }
  }
  return {
    valid: errors.length === 0,
    errors
  };
}
function getDefaultThemes() {
  return {
    color: "white",
    typography: "sans",
    shape: "smooth",
    density: "comfortable",
    animation: "gentle"
  };
}
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function deepMerge(target, source) {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}
var tokenCache = /* @__PURE__ */ new Map();
function getTokenBaseCandidates() {
  const bases = [];
  if (typeof window !== "undefined" && window.__THEME_TOKENS_BASE__) {
    bases.push(window.__THEME_TOKENS_BASE__);
  }
  const env = typeof globalThis !== "undefined" ? globalThis.process?.env : void 0;
  if (env?.DESIGN_SYSTEM_TOKENS_BASE) {
    bases.push(env.DESIGN_SYSTEM_TOKENS_BASE);
  }
  bases.push(EMBEDDED_TOKEN_BASE);
  bases.push("/tokens");
  return Array.from(new Set(bases.filter(Boolean)));
}
async function loadTokenFile(path) {
  const normalizedPath = normalizeTokenPath(path);
  if (tokenCache.has(normalizedPath)) {
    return deepClone(tokenCache.get(normalizedPath));
  }
  const bases = getTokenBaseCandidates();
  for (const base of bases) {
    if (base === EMBEDDED_TOKEN_BASE) {
      const embedded = getEmbeddedToken(normalizedPath);
      if (embedded) {
        tokenCache.set(normalizedPath, embedded);
        return deepClone(embedded);
      }
      continue;
    }
    const url = base.endsWith("/") ? `${base}${normalizedPath}` : `${base}/${normalizedPath}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          continue;
        }
        throw new Error(`Failed to load ${url}: ${response.statusText}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        continue;
      }
      const data = await response.json();
      tokenCache.set(normalizedPath, data);
      return deepClone(data);
    } catch (error) {
      if (typeof window !== "undefined" && window.__DESIGN_SYSTEM_DEBUG__) {
        console.warn(`Error loading token file ${url}:`, error);
      }
    }
  }
  return null;
}
function resolveReferences(tokens, palette) {
  const resolved = JSON.parse(JSON.stringify(tokens));
  function resolveValue(value) {
    if (typeof value !== "string") return value;
    const match = value.match(/^\{([^}]+)\}$/);
    if (!match) return value;
    const path = match[1].split(".");
    let current = { palette, ...resolved };
    for (const key of path) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        if (typeof window !== "undefined" && window.__DESIGN_SYSTEM_DEBUG__) {
          console.warn(`Token reference not found: {${match[1]}}`);
        }
        return value;
      }
    }
    return typeof current === "string" ? current : value;
  }
  function traverse(obj) {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        traverse(obj[key]);
      } else {
        obj[key] = resolveValue(obj[key]);
      }
    }
  }
  traverse(resolved);
  return resolved;
}
function hexToHSL(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  const lPercent = Math.round(l * 100);
  return `${h} ${s}% ${lPercent}%`;
}
function isHexColor(value) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}
function flattenToCSS(tokens, prefix = "", result = {}, isColorContext = false) {
  for (const key in tokens) {
    const value = tokens[key];
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const enteringColor = key === "color" && prefix === "";
      const enteringTypography = key === "typography" && prefix === "";
      const enteringShape = key === "shape" && prefix === "";
      const enteringAnimation = key === "animation" && prefix === "";
      const enteringDensity = key === "spacing" && prefix === "";
      const inColorContext = isColorContext || enteringColor;
      if (enteringColor) {
        flattenToCSS(value, "", result, true);
      } else if (enteringTypography) {
        flattenToCSS(value, "", result, false);
      } else if (enteringShape) {
        flattenToCSS(value, "", result, false);
      } else if (enteringAnimation) {
        flattenToCSS(value, "", result, false);
      } else if (enteringDensity) {
        flattenToCSS(value, "spacing", result, false);
      } else if (inColorContext) {
        flattenToCSS(value, "", result, true);
      } else {
        const newPrefix = prefix ? `${prefix}-${key}` : key;
        flattenToCSS(value, newPrefix, result, false);
      }
    } else {
      let cssKey;
      if (isColorContext || prefix === "" && key === "color") {
        cssKey = `--${key}`;
      } else if (prefix === "") {
        cssKey = `--${key}`;
      } else {
        cssKey = `--${prefix}-${key}`;
      }
      let finalValue = value;
      if (isColorContext && typeof value === "string" && isHexColor(value)) {
        finalValue = hexToHSL(value);
      }
      result[cssKey] = finalValue;
    }
  }
  return result;
}
function mapToTailwindVars(cssVars) {
  const mapped = { ...cssVars };
  if (cssVars["--radius-button"] && !cssVars["--radius"]) {
    mapped["--radius"] = cssVars["--radius-button"];
  }
  if (cssVars["--radius-card"] && !cssVars["--radius-lg"]) {
    mapped["--radius-lg"] = cssVars["--radius-card"];
  }
  if (cssVars["--font-body"] && !cssVars["--font-sans"]) {
    mapped["--font-sans"] = cssVars["--font-body"];
  }
  if (cssVars["--spacing-base"] && !cssVars["--spacing"]) {
    mapped["--spacing"] = cssVars["--spacing-base"];
  } else if (cssVars["--spacing-component-md"] && !cssVars["--spacing"]) {
    mapped["--spacing"] = cssVars["--spacing-component-md"];
  }
  return mapped;
}
function generateCSSString(cssVars) {
  const mappedVars = mapToTailwindVars(cssVars);
  const vars = Object.entries(mappedVars).sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => `  ${key}: ${value};`).join("\n");
  if (typeof window !== "undefined" && window.__DESIGN_SYSTEM_DEBUG__) {
    console.group("\u{1F3A8} Design System CSS Variables");
    console.table(mappedVars);
    console.log("Total variables:", Object.keys(mappedVars).length);
    console.groupEnd();
  }
  return `:root {
${vars}
}`;
}
function applyThemeCSS(css) {
  let styleTag = document.getElementById("dynamic-theme");
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = "dynamic-theme";
    document.head.appendChild(styleTag);
  }
  styleTag.textContent = css;
}
function enableDebugMode() {
  if (typeof window !== "undefined") {
    window.__DESIGN_SYSTEM_DEBUG__ = true;
    console.log("\u{1F50D} Design System debug mode enabled");
    console.log("CSS variables will be logged when themes change");
  }
}
function getCurrentCSSVariables() {
  if (typeof window === "undefined") return {};
  const styleTag = document.getElementById("dynamic-theme");
  if (!styleTag) return {};
  const cssText = styleTag.textContent || "";
  const vars = {};
  const matches = cssText.matchAll(/--([^:]+):\s*([^;]+);/g);
  for (const match of matches) {
    vars[`--${match[1].trim()}`] = match[2].trim();
  }
  return vars;
}
async function generateAndApplyTheme(selectedThemes = {}) {
  try {
    const themeCategories = await getThemeCategories();
    const validation = validateThemeSelection(selectedThemes, themeCategories);
    if (!validation.valid) {
      const nonCustomErrors = validation.errors.filter((err) => !err.includes("custom"));
      if (nonCustomErrors.length > 0) {
        if (typeof window !== "undefined" && window.__DESIGN_SYSTEM_DEBUG__) {
          console.error("Invalid theme selection:", nonCustomErrors);
        }
        throw new Error(`Invalid theme selection: ${nonCustomErrors.join(", ")}`);
      }
      if (typeof window !== "undefined" && window.__DESIGN_SYSTEM_DEBUG__) {
        console.warn("Custom theme files not found, continuing without them:", validation.errors);
      }
    }
    const base = await loadTokenFile("/tokens/base.json");
    if (!base) {
      throw new Error("Failed to load base tokens from /tokens/base.json");
    }
    const palettes = await loadTokenFile("/tokens/palettes.json");
    if (!palettes || !palettes.palette) {
      throw new Error("Failed to load palette from /tokens/palettes.json");
    }
    const palette = palettes.palette;
    let merged = deepMerge(base, { palette });
    for (const category of THEME_CATEGORY_ORDER) {
      const themeId = selectedThemes[category];
      if (!themeId) continue;
      const themePath = `/tokens/themes/${category}/${themeId}.json`;
      const themeData = await loadTokenFile(themePath);
      if (themeData) {
        merged = deepMerge(merged, themeData);
      } else {
        if (category !== "custom" && typeof window !== "undefined" && window.__DESIGN_SYSTEM_DEBUG__) {
          console.warn(`Theme file not found: ${themePath}`);
        } else if (category === "custom" && typeof window !== "undefined" && window.__DESIGN_SYSTEM_DEBUG__) {
          console.warn(`Custom theme file not found: ${themePath} (this is normal if you haven't created it yet)`);
        }
      }
    }
    const resolved = resolveReferences(merged, palette);
    const cssVars = flattenToCSS(resolved);
    const css = generateCSSString(cssVars);
    if (typeof document !== "undefined") {
      applyThemeCSS(css);
      if (window.__DESIGN_SYSTEM_DEBUG__) {
        window.__DESIGN_SYSTEM_VARS__ = cssVars;
        console.log("\u{1F4A1} Access CSS variables via: window.__DESIGN_SYSTEM_VARS__");
      }
    }
    return {
      success: true,
      themeName: getThemeName(selectedThemes),
      cssVars
    };
  } catch (error) {
    if (typeof window !== "undefined" && window.__DESIGN_SYSTEM_DEBUG__) {
      console.error("Error generating theme:", error);
    }
    throw error;
  }
}

// src/themes/useTheme.tsx
var STORAGE_KEY = "design-system-theme";
function useTheme() {
  const [selectedThemes, setSelectedThemes] = React15.useState(getDefaultThemes());
  const [isLoading, setIsLoading] = React15.useState(false);
  const [error, setError] = React15.useState(null);
  const applyTheme = React15.useCallback(async (themes) => {
    setIsLoading(true);
    setError(null);
    try {
      await generateAndApplyTheme(themes);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(themes));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to apply theme";
      setError(errorMessage);
      if (typeof window !== "undefined" && window.__DESIGN_SYSTEM_DEBUG__) {
        console.error("Theme application error:", err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);
  React15.useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setSelectedThemes(parsed);
          applyTheme(parsed);
        } catch {
          const defaults = getDefaultThemes();
          setSelectedThemes(defaults);
          applyTheme(defaults);
        }
      } else {
        const defaults = getDefaultThemes();
        applyTheme(defaults);
      }
    }
  }, [applyTheme]);
  const updateTheme = React15.useCallback(async (category, themeId) => {
    const newThemes = {
      ...selectedThemes,
      [category]: themeId || void 0
    };
    setSelectedThemes(newThemes);
    await applyTheme(newThemes);
  }, [selectedThemes, applyTheme]);
  const resetToDefaults = React15.useCallback(async () => {
    const defaults = getDefaultThemes();
    setSelectedThemes(defaults);
    await applyTheme(defaults);
  }, [applyTheme]);
  const getAvailableThemes = React15.useCallback(async (category) => {
    const categories = await getThemeCategories();
    return categories[category]?.themes || {};
  }, []);
  return {
    selectedThemes,
    updateTheme,
    resetToDefaults,
    isLoading,
    error,
    getAvailableThemes
  };
}

// src/themes/ui/ThemeToggle/useThemeToggle.ts
function useThemeToggle() {
  const { selectedThemes, updateTheme, isLoading, getAvailableThemes } = useTheme();
  const [isOpen, setIsOpen] = React15.useState(false);
  const [selectedCategory, setSelectedCategory] = React15.useState(null);
  const [themeCategories, setThemeCategories] = React15.useState(null);
  const menuRef = React15.useRef(null);
  React15.useEffect(() => {
    getThemeCategories().then(setThemeCategories);
  }, []);
  React15.useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedCategory(null);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);
  const handleCategoryClick = React15.useCallback((categoryKey) => {
    setSelectedCategory(categoryKey);
  }, []);
  const handleThemeSelect = React15.useCallback(async (category, themeId) => {
    const currentTheme = selectedThemes[category];
    const newTheme = currentTheme === themeId ? void 0 : themeId;
    await updateTheme(category, newTheme);
  }, [selectedThemes, updateTheme]);
  const handleBack = React15.useCallback(() => {
    setSelectedCategory(null);
  }, []);
  const toggleMenu = React15.useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) {
        setSelectedCategory(null);
      }
      return !prev;
    });
  }, []);
  const categories = themeCategories ? Object.entries(themeCategories).sort(([, a], [, b]) => (a.order || 0) - (b.order || 0)) : [];
  return {
    selectedThemes,
    isLoading,
    getAvailableThemes,
    isOpen,
    selectedCategory,
    themeCategories,
    categories,
    menuRef,
    handleCategoryClick,
    handleThemeSelect,
    handleBack,
    toggleMenu
  };
}

// src/themes/ui/ThemeToggle/themeToggleConfig.ts
var categoryIcons = {
  color: "\u{1F3A8}",
  typography: "\u{1F4DD}",
  shape: "\u{1F532}",
  density: "\u{1F4CF}",
  animation: "\u2728"
};
var positionClasses = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6"
};
function getArcConfig(position) {
  switch (position) {
    case "bottom-right":
      return { startAngle: -60, endAngle: -180, sweep: -150 };
    case "bottom-left":
      return { startAngle: -120, endAngle: 0, sweep: 150 };
    case "top-right":
      return { startAngle: 60, endAngle: 0, sweep: 150 };
    case "top-left":
      return { startAngle: 120, endAngle: 0, sweep: -150 };
  }
}

// src/themes/ui/ThemeToggle/themeToggleUtils.ts
function getPositionOnArc(angleDeg, radius) {
  const rad = angleDeg * Math.PI / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius
  };
}
function ThemeToggle({
  className,
  position = "bottom-right"
}) {
  const {
    selectedThemes,
    isLoading,
    getAvailableThemes,
    isOpen,
    selectedCategory,
    categories,
    menuRef,
    handleCategoryClick,
    handleThemeSelect,
    handleBack,
    toggleMenu
  } = useThemeToggle();
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      ref: menuRef,
      id: "theme-toggle",
      className: cn("fixed z-50", positionClasses[position], className),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            onClick: toggleMenu,
            className: cn(
              "w-14 h-14 rounded-full bg-primary text-primary-foreground",
              "shadow-lg hover:shadow-xl",
              "flex items-center justify-center",
              "relative z-10",
              "transition-all duration-200",
              "hover:scale-110 active:scale-95",
              isOpen && "rotate-90"
            ),
            "aria-label": "Theme settings",
            title: "Theme settings",
            children: /* @__PURE__ */ jsxRuntime.jsxs(
              "svg",
              {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73 2.15l.22.38a2 2 0 0 1 0 2.73l-.22.38a2 2 0 0 0 2.15 2.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-2.15l-.22-.38a2 2 0 0 1 0-2.73l.22-.38a2 2 0 0 0-2.15-2.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }),
                  /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "3" })
                ]
              }
            )
          }
        ),
        isOpen && /* @__PURE__ */ jsxRuntime.jsx(TooltipProvider, { delayDuration: 300, children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute inset-0 pointer-events-none", children: !selectedCategory ? /* @__PURE__ */ jsxRuntime.jsx(
          CategoryRing,
          {
            categories,
            onCategoryClick: handleCategoryClick,
            selectedThemes,
            position
          }
        ) : /* @__PURE__ */ jsxRuntime.jsx(
          ThemeRingAsync,
          {
            category: selectedCategory,
            getAvailableThemes,
            selectedTheme: selectedThemes[selectedCategory],
            onThemeSelect: (themeId) => handleThemeSelect(selectedCategory, themeId),
            onBack: handleBack,
            isLoading,
            position
          }
        ) }) })
      ]
    }
  );
}
function RadialWheel({
  items,
  position,
  radius,
  buttonSize,
  startOffset = 0.75
}) {
  const arcConfig = getArcConfig(position);
  const totalItems = items.length;
  const angleStep = Math.abs(arcConfig.sweep) / totalItems;
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute inset-0", children: items.map((item, index) => {
    const angle = arcConfig.startAngle + angleStep * (index + startOffset) * Math.sign(arcConfig.sweep);
    const pos = getPositionOnArc(angle, radius);
    return /* @__PURE__ */ jsxRuntime.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          onClick: item.onClick,
          disabled: item.disabled,
          className: cn(
            "absolute rounded-full",
            "bg-background border-2 shadow-lg",
            "flex items-center justify-center text-lg",
            "pointer-events-auto",
            "transition-all duration-200",
            "hover:scale-110 active:scale-95",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            item.isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/50",
            item.className
          ),
          style: {
            width: `${buttonSize}px`,
            height: `${buttonSize}px`,
            left: `${pos.x}px`,
            top: `${pos.y}px`
          },
          "aria-label": item.label,
          children: item.content
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(TooltipContent, { side: "right", sideOffset: 8, children: item.label })
    ] }, item.id);
  }) });
}
function CategoryRing({
  categories,
  onCategoryClick,
  selectedThemes,
  position
}) {
  const radius = 60;
  const buttonSize = 40;
  const items = categories.map(([categoryKey, category]) => {
    const hasSelection = !!selectedThemes[categoryKey];
    return {
      id: categoryKey,
      content: categoryIcons[categoryKey] || "\u2699\uFE0F",
      label: category.name,
      onClick: () => onCategoryClick(categoryKey),
      isSelected: hasSelection,
      className: hasSelection ? "bg-primary/10" : void 0
    };
  });
  return /* @__PURE__ */ jsxRuntime.jsx(
    RadialWheel,
    {
      items,
      position,
      radius,
      buttonSize,
      startOffset: 0.5
    }
  );
}
function ThemeRingAsync({
  category,
  getAvailableThemes,
  selectedTheme,
  onThemeSelect,
  onBack,
  isLoading,
  position
}) {
  const [themes, setThemes] = React15.useState({});
  React15.useEffect(() => {
    getAvailableThemes(category).then(setThemes);
  }, [category, getAvailableThemes]);
  const themeEntries = Object.entries(themes);
  const radius = 65;
  const buttonSize = 40;
  const backButtonSize = 36;
  const arcConfig = getArcConfig(position);
  const backButtonPos = getPositionOnArc(arcConfig.startAngle, radius);
  const items = themeEntries.map(([themeId, theme]) => ({
    id: themeId,
    content: theme.icon,
    label: theme.name,
    onClick: () => !isLoading && onThemeSelect(themeId),
    isSelected: selectedTheme === themeId,
    disabled: isLoading,
    className: "text-base"
    // Smaller text for theme icons
  }));
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        onClick: onBack,
        className: cn(
          "absolute rounded-full",
          "bg-muted border border-border shadow-md",
          "flex items-center justify-center",
          "pointer-events-auto",
          "transition-all duration-200",
          "hover:scale-110 active:scale-95"
        ),
        style: {
          width: `${backButtonSize}px`,
          height: `${backButtonSize}px`,
          left: `${backButtonPos.x}px`,
          top: `${backButtonPos.y}px`
        },
        "aria-label": "Back",
        children: /* @__PURE__ */ jsxRuntime.jsxs(
          "svg",
          {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "m12 19-7-7 7-7" }),
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M19 12H5" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      RadialWheel,
      {
        items,
        position,
        radius,
        buttonSize,
        startOffset: 1
      }
    ),
    isLoading && /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: "absolute w-12 h-12 rounded-full bg-primary/20 border-2 border-primary animate-pulse pointer-events-none",
        style: {
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }
      }
    )
  ] });
}

// src/themes/applyThemeSync.ts
var STORAGE_KEY2 = "design-system-theme";
function getTokenBaseCandidatesSync() {
  const bases = [];
  if (typeof window !== "undefined" && window.__THEME_TOKENS_BASE__) {
    bases.push(window.__THEME_TOKENS_BASE__);
  }
  const env = typeof globalThis !== "undefined" ? globalThis.process?.env : void 0;
  if (env?.DESIGN_SYSTEM_TOKENS_BASE) {
    bases.push(env.DESIGN_SYSTEM_TOKENS_BASE);
  }
  bases.push(EMBEDDED_TOKEN_BASE);
  bases.push("/tokens");
  return Array.from(new Set(bases.filter(Boolean)));
}
function applyThemeSync() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }
  const tokenBases = getTokenBaseCandidatesSync();
  let selectedThemes = getDefaultThemes();
  try {
    const stored = localStorage.getItem(STORAGE_KEY2);
    if (stored) {
      selectedThemes = JSON.parse(stored);
    }
  } catch {
  }
  try {
    const base = loadJSONSync("/tokens/base.json", tokenBases);
    if (!base) {
      return;
    }
    const palettes = loadJSONSync("/tokens/palettes.json", tokenBases);
    const palette = palettes?.palette || {};
    let merged = deepMergeSync(base, { palette });
    for (const category of THEME_CATEGORY_ORDER) {
      const themeId = selectedThemes[category];
      if (!themeId) continue;
      const themeData = loadJSONSync(`/tokens/themes/${category}/${themeId}.json`, tokenBases);
      if (themeData) {
        merged = deepMergeSync(merged, themeData);
      }
    }
    const resolved = resolveReferencesSync(merged, palette);
    const cssVars = flattenToCSSSync(resolved);
    const mappedVars = mapToTailwindVarsSync(cssVars);
    const css = `:root {
${Object.entries(mappedVars).map(([key, value]) => `  ${key}: ${value};`).join("\n")}
}`;
    let styleTag = document.getElementById("dynamic-theme");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "dynamic-theme";
    }
    document.head.appendChild(styleTag);
    styleTag.textContent = css;
  } catch (error) {
    if (typeof window !== "undefined" && window.__DESIGN_SYSTEM_DEBUG__) {
      console.warn("Sync theme application failed, will apply via React:", error);
    }
  }
}
function loadJSONSync(path, bases) {
  const normalizedPath = normalizeTokenPath(path);
  for (const base of bases) {
    if (base === EMBEDDED_TOKEN_BASE) {
      const embedded = getEmbeddedToken(normalizedPath);
      if (embedded) {
        return deepCloneSync(embedded);
      }
      continue;
    }
    try {
      const xhr = new XMLHttpRequest();
      const url = base.endsWith("/") ? `${base}${normalizedPath}` : `${base}/${normalizedPath}`;
      xhr.open("GET", url, false);
      xhr.send(null);
      if (xhr.status === 404) {
        continue;
      }
      if (xhr.status === 200 || xhr.status === 0) {
        const contentType = xhr.getResponseHeader("content-type");
        if (contentType && contentType.includes("application/json")) {
          return JSON.parse(xhr.responseText);
        }
        continue;
      }
    } catch {
    }
  }
  return null;
}
function deepMergeSync(target, source) {
  const output = { ...target };
  if (isObjectSync(target) && isObjectSync(source)) {
    Object.keys(source).forEach((key) => {
      if (isObjectSync(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMergeSync(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}
function deepCloneSync(value) {
  return JSON.parse(JSON.stringify(value));
}
function isObjectSync(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function resolveReferencesSync(tokens, palette) {
  const resolved = JSON.parse(JSON.stringify(tokens));
  function resolveValue(value) {
    if (typeof value !== "string") return value;
    const match = value.match(/^\{([^}]+)\}$/);
    if (!match) return value;
    const path = match[1].split(".");
    let current = { palette, ...resolved };
    for (const key of path) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        return value;
      }
    }
    return typeof current === "string" ? current : value;
  }
  function traverse(obj) {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        traverse(obj[key]);
      } else {
        obj[key] = resolveValue(obj[key]);
      }
    }
  }
  traverse(resolved);
  return resolved;
}
function hexToHSL2(hex) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  const lPercent = Math.round(l * 100);
  return `${h} ${s}% ${lPercent}%`;
}
function isHexColor2(value) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}
function flattenToCSSSync(tokens, prefix = "", result = {}, isColorContext = false) {
  for (const key in tokens) {
    const value = tokens[key];
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const enteringColor = key === "color" && prefix === "";
      const enteringTypography = key === "typography" && prefix === "";
      const enteringShape = key === "shape" && prefix === "";
      const enteringAnimation = key === "animation" && prefix === "";
      const enteringDensity = key === "spacing" && prefix === "";
      const inColorContext = isColorContext || enteringColor;
      if (enteringColor) {
        flattenToCSSSync(value, "", result, true);
      } else if (enteringTypography) {
        flattenToCSSSync(value, "", result, false);
      } else if (enteringShape) {
        flattenToCSSSync(value, "", result, false);
      } else if (enteringAnimation) {
        flattenToCSSSync(value, "", result, false);
      } else if (enteringDensity) {
        flattenToCSSSync(value, "spacing", result, false);
      } else if (inColorContext) {
        flattenToCSSSync(value, "", result, true);
      } else {
        const newPrefix = prefix ? `${prefix}-${key}` : key;
        flattenToCSSSync(value, newPrefix, result, false);
      }
    } else {
      let cssKey;
      if (isColorContext || prefix === "" && key === "color") {
        cssKey = `--${key}`;
      } else if (prefix === "") {
        cssKey = `--${key}`;
      } else {
        cssKey = `--${prefix}-${key}`;
      }
      let finalValue = value;
      if (isColorContext && typeof value === "string" && isHexColor2(value)) {
        finalValue = hexToHSL2(value);
      }
      result[cssKey] = finalValue;
    }
  }
  return result;
}
function mapToTailwindVarsSync(cssVars) {
  const mapped = { ...cssVars };
  if (cssVars["--radius-button"] && !cssVars["--radius"]) {
    mapped["--radius"] = cssVars["--radius-button"];
  }
  if (cssVars["--radius-card"] && !cssVars["--radius-lg"]) {
    mapped["--radius-lg"] = cssVars["--radius-card"];
  }
  if (cssVars["--font-body"] && !cssVars["--font-sans"]) {
    mapped["--font-sans"] = cssVars["--font-body"];
  }
  if (cssVars["--spacing-base"] && !cssVars["--spacing"]) {
    mapped["--spacing"] = cssVars["--spacing-base"];
  } else if (cssVars["--spacing-component-md"] && !cssVars["--spacing"]) {
    mapped["--spacing"] = cssVars["--spacing-component-md"];
  }
  return mapped;
}

exports.Accordion = Accordion;
exports.AccordionContent = AccordionContent;
exports.AccordionItem = AccordionItem;
exports.AccordionTrigger = AccordionTrigger;
exports.Alert = Alert;
exports.AlertDescription = AlertDescription;
exports.AlertDialog = AlertDialog;
exports.AlertDialogAction = AlertDialogAction;
exports.AlertDialogCancel = AlertDialogCancel;
exports.AlertDialogContent = AlertDialogContent;
exports.AlertDialogDescription = AlertDialogDescription;
exports.AlertDialogFooter = AlertDialogFooter;
exports.AlertDialogHeader = AlertDialogHeader;
exports.AlertDialogOverlay = AlertDialogOverlay;
exports.AlertDialogPortal = AlertDialogPortal;
exports.AlertDialogTitle = AlertDialogTitle;
exports.AlertDialogTrigger = AlertDialogTrigger;
exports.AlertTitle = AlertTitle;
exports.AspectRatio = AspectRatio;
exports.Avatar = Avatar;
exports.AvatarFallback = AvatarFallback;
exports.AvatarImage = AvatarImage;
exports.Badge = Badge;
exports.Box = Box;
exports.Breadcrumb = Breadcrumb;
exports.BreadcrumbEllipsis = BreadcrumbEllipsis;
exports.BreadcrumbItem = BreadcrumbItem;
exports.BreadcrumbLink = BreadcrumbLink;
exports.BreadcrumbList = BreadcrumbList;
exports.BreadcrumbPage = BreadcrumbPage;
exports.BreadcrumbSeparator = BreadcrumbSeparator;
exports.Button = Button;
exports.Calendar = Calendar;
exports.CalendarDayButton = CalendarDayButton;
exports.Card = Card;
exports.CardAction = CardAction;
exports.CardContent = CardContent;
exports.CardDescription = CardDescription;
exports.CardFooter = CardFooter;
exports.CardHeader = CardHeader;
exports.CardTitle = CardTitle;
exports.Carousel = Carousel;
exports.CarouselContent = CarouselContent;
exports.CarouselItem = CarouselItem;
exports.CarouselNext = CarouselNext;
exports.CarouselPrevious = CarouselPrevious;
exports.ChartContainer = ChartContainer;
exports.ChartLegend = ChartLegend;
exports.ChartLegendContent = ChartLegendContent;
exports.ChartStyle = ChartStyle;
exports.ChartTooltip = ChartTooltip;
exports.ChartTooltipContent = ChartTooltipContent;
exports.Checkbox = Checkbox;
exports.Collapsible = Collapsible;
exports.CollapsibleContent = CollapsibleContent2;
exports.CollapsiblePanel = CollapsiblePanel;
exports.CollapsibleTrigger = CollapsibleTrigger2;
exports.Command = Command;
exports.CommandDialog = CommandDialog;
exports.CommandEmpty = CommandEmpty;
exports.CommandGroup = CommandGroup;
exports.CommandInput = CommandInput;
exports.CommandItem = CommandItem;
exports.CommandList = CommandList;
exports.CommandSeparator = CommandSeparator;
exports.CommandShortcut = CommandShortcut;
exports.ConfirmModal = ConfirmModal;
exports.Container = Container;
exports.ContextMenu = ContextMenu;
exports.ContextMenuCheckboxItem = ContextMenuCheckboxItem;
exports.ContextMenuContent = ContextMenuContent;
exports.ContextMenuGroup = ContextMenuGroup;
exports.ContextMenuItem = ContextMenuItem;
exports.ContextMenuLabel = ContextMenuLabel;
exports.ContextMenuPortal = ContextMenuPortal;
exports.ContextMenuRadioGroup = ContextMenuRadioGroup;
exports.ContextMenuRadioItem = ContextMenuRadioItem;
exports.ContextMenuSeparator = ContextMenuSeparator;
exports.ContextMenuShortcut = ContextMenuShortcut;
exports.ContextMenuSub = ContextMenuSub;
exports.ContextMenuSubContent = ContextMenuSubContent;
exports.ContextMenuSubTrigger = ContextMenuSubTrigger;
exports.ContextMenuTrigger = ContextMenuTrigger;
exports.CopyButton = CopyButton;
exports.Drawer = Drawer;
exports.DrawerClose = DrawerClose;
exports.DrawerContent = DrawerContent;
exports.DrawerDescription = DrawerDescription;
exports.DrawerFooter = DrawerFooter;
exports.DrawerHeader = DrawerHeader;
exports.DrawerOverlay = DrawerOverlay;
exports.DrawerPortal = DrawerPortal;
exports.DrawerTitle = DrawerTitle;
exports.DrawerTrigger = DrawerTrigger;
exports.DropdownMenu = DropdownMenu;
exports.DropdownMenuCheckboxItem = DropdownMenuCheckboxItem;
exports.DropdownMenuContent = DropdownMenuContent;
exports.DropdownMenuGroup = DropdownMenuGroup;
exports.DropdownMenuItem = DropdownMenuItem;
exports.DropdownMenuLabel = DropdownMenuLabel;
exports.DropdownMenuPortal = DropdownMenuPortal;
exports.DropdownMenuRadioGroup = DropdownMenuRadioGroup;
exports.DropdownMenuRadioItem = DropdownMenuRadioItem;
exports.DropdownMenuSeparator = DropdownMenuSeparator;
exports.DropdownMenuShortcut = DropdownMenuShortcut;
exports.DropdownMenuSub = DropdownMenuSub;
exports.DropdownMenuSubContent = DropdownMenuSubContent;
exports.DropdownMenuSubTrigger = DropdownMenuSubTrigger;
exports.DropdownMenuTrigger = DropdownMenuTrigger;
exports.Empty = Empty;
exports.EmptyContent = EmptyContent;
exports.EmptyDescription = EmptyDescription;
exports.EmptyHeader = EmptyHeader;
exports.EmptyMedia = EmptyMedia;
exports.EmptyScreen = EmptyScreen;
exports.EmptyTitle = EmptyTitle;
exports.ErrorBoundary = ErrorBoundary;
exports.Field = Field;
exports.FieldContent = FieldContent;
exports.FieldDescription = FieldDescription;
exports.FieldError = FieldError;
exports.FieldGroup = FieldGroup;
exports.FieldLabel = FieldLabel;
exports.FieldLegend = FieldLegend;
exports.FieldSeparator = FieldSeparator;
exports.FieldSet = FieldSet;
exports.FieldTitle = FieldTitle;
exports.Footer = Footer;
exports.Form = Form;
exports.FormControl = FormControl;
exports.FormDescription = FormDescription;
exports.FormField = FormField;
exports.FormInput = FormInput;
exports.FormItem = FormItem;
exports.FormLabel = FormLabel;
exports.FormMessage = FormMessage;
exports.FormModal = FormModal;
exports.Grid = Grid;
exports.Header = Header2;
exports.HistoryControlButtons = HistoryControlButtons;
exports.HoverCard = HoverCard;
exports.HoverCardContent = HoverCardContent;
exports.HoverCardTrigger = HoverCardTrigger;
exports.Image = Image2;
exports.InfoBanner = InfoBanner;
exports.InlineEdit = InlineEdit;
exports.InputGroup = InputGroup;
exports.InputGroupAddon = InputGroupAddon;
exports.InputGroupButton = InputGroupButton;
exports.InputGroupInput = InputGroupInput;
exports.InputGroupText = InputGroupText;
exports.InputGroupTextarea = InputGroupTextarea;
exports.InputOTP = InputOTP;
exports.InputOTPGroup = InputOTPGroup;
exports.InputOTPSeparator = InputOTPSeparator;
exports.InputOTPSlot = InputOTPSlot;
exports.Kbd = Kbd;
exports.KbdGroup = KbdGroup;
exports.Label = Label;
exports.List = List3;
exports.Menubar = Menubar;
exports.MenubarCheckboxItem = MenubarCheckboxItem;
exports.MenubarContent = MenubarContent;
exports.MenubarGroup = MenubarGroup;
exports.MenubarItem = MenubarItem;
exports.MenubarLabel = MenubarLabel;
exports.MenubarMenu = MenubarMenu;
exports.MenubarPortal = MenubarPortal;
exports.MenubarRadioGroup = MenubarRadioGroup;
exports.MenubarRadioItem = MenubarRadioItem;
exports.MenubarSeparator = MenubarSeparator;
exports.MenubarShortcut = MenubarShortcut;
exports.MenubarSub = MenubarSub;
exports.MenubarSubContent = MenubarSubContent;
exports.MenubarSubTrigger = MenubarSubTrigger;
exports.MenubarTrigger = MenubarTrigger;
exports.Modal = Modal;
exports.ModalClose = ModalClose;
exports.ModalContent = ModalContent;
exports.ModalDescription = ModalDescription;
exports.ModalFooter = ModalFooter;
exports.ModalHeader = ModalHeader;
exports.ModalOverlay = ModalOverlay;
exports.ModalPortal = ModalPortal;
exports.ModalTitle = ModalTitle;
exports.ModalTrigger = ModalTrigger;
exports.NavigationMenu = NavigationMenu;
exports.NavigationMenuContent = NavigationMenuContent;
exports.NavigationMenuIndicator = NavigationMenuIndicator;
exports.NavigationMenuItem = NavigationMenuItem;
exports.NavigationMenuLink = NavigationMenuLink;
exports.NavigationMenuList = NavigationMenuList;
exports.NavigationMenuTrigger = NavigationMenuTrigger;
exports.NavigationMenuViewport = NavigationMenuViewport;
exports.Pagination = Pagination;
exports.PaginationContent = PaginationContent;
exports.PaginationEllipsis = PaginationEllipsis;
exports.PaginationItem = PaginationItem;
exports.PaginationLink = PaginationLink;
exports.PaginationNext = PaginationNext;
exports.PaginationPrevious = PaginationPrevious;
exports.Popover = Popover;
exports.PopoverAnchor = PopoverAnchor;
exports.PopoverContent = PopoverContent;
exports.PopoverTrigger = PopoverTrigger;
exports.Progress = Progress;
exports.Radio = Radio;
exports.RadioItem = RadioItem;
exports.ResizableHandle = ResizableHandle;
exports.ResizablePanel = ResizablePanel;
exports.ResizablePanelGroup = ResizablePanelGroup;
exports.ResizeContainer = ResizeContainer;
exports.ScrollArea = ScrollArea;
exports.ScrollBar = ScrollBar;
exports.SearchInput = SearchInput;
exports.Select = Select;
exports.SelectContent = SelectContent;
exports.SelectGroup = SelectGroup;
exports.SelectItem = SelectItem;
exports.SelectLabel = SelectLabel;
exports.SelectScrollDownButton = SelectScrollDownButton;
exports.SelectScrollUpButton = SelectScrollUpButton;
exports.SelectSeparator = SelectSeparator;
exports.SelectTrigger = SelectTrigger;
exports.SelectValue = SelectValue;
exports.Separator = Separator;
exports.Sheet = Sheet;
exports.SheetClose = SheetClose;
exports.SheetContent = SheetContent;
exports.SheetDescription = SheetDescription;
exports.SheetFooter = SheetFooter;
exports.SheetHeader = SheetHeader;
exports.SheetTitle = SheetTitle;
exports.SheetTrigger = SheetTrigger;
exports.Sidebar = Sidebar;
exports.SidebarContent = SidebarContent;
exports.SidebarFooter = SidebarFooter;
exports.SidebarGroup = SidebarGroup;
exports.SidebarGroupAction = SidebarGroupAction;
exports.SidebarGroupContent = SidebarGroupContent;
exports.SidebarGroupLabel = SidebarGroupLabel;
exports.SidebarHeader = SidebarHeader;
exports.SidebarInput = SidebarInput;
exports.SidebarInset = SidebarInset;
exports.SidebarMenu = SidebarMenu;
exports.SidebarMenuAction = SidebarMenuAction;
exports.SidebarMenuBadge = SidebarMenuBadge;
exports.SidebarMenuButton = SidebarMenuButton;
exports.SidebarMenuItem = SidebarMenuItem;
exports.SidebarMenuSkeleton = SidebarMenuSkeleton;
exports.SidebarMenuSub = SidebarMenuSub;
exports.SidebarMenuSubButton = SidebarMenuSubButton;
exports.SidebarMenuSubItem = SidebarMenuSubItem;
exports.SidebarProvider = SidebarProvider;
exports.SidebarRail = SidebarRail;
exports.SidebarSeparator = SidebarSeparator;
exports.SidebarTrigger = SidebarTrigger;
exports.Skeleton = Skeleton;
exports.SkeletonGrid = SkeletonGrid;
exports.SkeletonText = SkeletonText;
exports.Slider = Slider;
exports.Snackbar = Snackbar;
exports.Spinner = Spinner;
exports.Stack = Stack;
exports.StatusText = StatusText;
exports.Stepper = Stepper;
exports.Switch = Switch;
exports.THEME_CATEGORY_ORDER = THEME_CATEGORY_ORDER;
exports.Table = Table;
exports.TableBody = TableBody;
exports.TableCaption = TableCaption;
exports.TableCell = TableCell;
exports.TableFooter = TableFooter;
exports.TableHead = TableHead;
exports.TableHeader = TableHeader;
exports.TableRow = TableRow;
exports.Tabs = Tabs;
exports.TabsContent = TabsContent;
exports.TabsList = TabsList;
exports.TabsTrigger = TabsTrigger;
exports.Text = Text;
exports.TextInput = TextInput;
exports.Textarea = Textarea;
exports.ThemeToggle = ThemeToggle;
exports.Toast = Toast;
exports.Toaster = Toaster;
exports.Toggle = Toggle;
exports.ToggleGroup = ToggleGroup;
exports.ToggleGroupItem = ToggleGroupItem;
exports.Tooltip = Tooltip;
exports.TooltipContent = TooltipContent;
exports.TooltipProvider = TooltipProvider;
exports.TooltipTrigger = TooltipTrigger;
exports.TriggerModal = TriggerModal;
exports.Upload = Upload;
exports.alertVariants = alertVariants;
exports.applyThemeSync = applyThemeSync;
exports.badgeVariants = badgeVariants;
exports.buttonVariants = buttonVariants;
exports.emptyMediaVariants = emptyMediaVariants;
exports.enableDebugMode = enableDebugMode;
exports.fieldVariants = fieldVariants;
exports.getCurrentCSSVariables = getCurrentCSSVariables;
exports.getTheme = getTheme;
exports.getThemeCategories = getThemeCategories;
exports.getThemeFilePath = getThemeFilePath;
exports.getThemesForCategory = getThemesForCategory;
exports.navigationMenuTriggerStyle = navigationMenuTriggerStyle;
exports.registerTheme = registerTheme;
exports.registerThemeFromFile = registerThemeFromFile;
exports.toggleVariants = toggleVariants;
exports.useChart = useChart;
exports.useFormField = useFormField;
exports.useSidebar = useSidebar;
exports.useTheme = useTheme;
exports.useThemeToggle = useThemeToggle;
