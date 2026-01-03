'use strict';

var React = require('react');
var reactSlot = require('@radix-ui/react-slot');
var classVarianceAuthority = require('class-variance-authority');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var jsxRuntime = require('react/jsx-runtime');
var LabelPrimitive = require('@radix-ui/react-label');
var SeparatorPrimitive = require('@radix-ui/react-separator');
var CheckboxPrimitive = require('@radix-ui/react-checkbox');
var lucideReact = require('lucide-react');
var DialogPrimitive = require('@radix-ui/react-dialog');
var SelectPrimitive = require('@radix-ui/react-select');
var TooltipPrimitive = require('@radix-ui/react-tooltip');

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

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var LabelPrimitive__namespace = /*#__PURE__*/_interopNamespace(LabelPrimitive);
var SeparatorPrimitive__namespace = /*#__PURE__*/_interopNamespace(SeparatorPrimitive);
var CheckboxPrimitive__namespace = /*#__PURE__*/_interopNamespace(CheckboxPrimitive);
var DialogPrimitive__namespace = /*#__PURE__*/_interopNamespace(DialogPrimitive);
var SelectPrimitive__namespace = /*#__PURE__*/_interopNamespace(SelectPrimitive);
var TooltipPrimitive__namespace = /*#__PURE__*/_interopNamespace(TooltipPrimitive);

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
var Button = React__namespace.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? reactSlot.Slot : "button";
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      ref,
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
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
      outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
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
var Badge = React__namespace.forwardRef(({ className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? reactSlot.Slot : "span";
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      ref,
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
});
Badge.displayName = "Badge";
var TextInput = React__namespace.forwardRef(
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
var Label = React__namespace.forwardRef(({ className, ...props }, ref) => {
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
var Textarea = React__namespace.forwardRef(
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
var Separator = React__namespace.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
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
var Checkbox = React__namespace.forwardRef(({ className, ...props }, ref) => {
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
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(ModalPortal, { "data-slot": "modal-portal", children: [
    /* @__PURE__ */ jsxRuntime.jsx(ModalOverlay, {}),
    /* @__PURE__ */ jsxRuntime.jsxs(
      DialogPrimitive__namespace.Content,
      {
        "data-slot": "modal-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-component-md rounded-lg border p-component-lg shadow-lg duration-normal font-sans sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
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
function ModalHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "modal-header",
      className: cn("flex flex-col gap-component-sm text-center sm:text-left font-sans", className),
      ...props
    }
  );
}
function ModalFooter({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "modal-footer",
      className: cn(
        "flex flex-col-reverse gap-component-sm sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function ModalTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Title,
    {
      "data-slot": "modal-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
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
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
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
  const discovered = JSON.parse(JSON.stringify(baseThemeCategories));
  try {
    const tokensBase = typeof window !== "undefined" && window.__THEME_TOKENS_BASE__ ? window.__THEME_TOKENS_BASE__ : "/tokens";
    const knownCategories = Object.keys(baseThemeCategories);
    for (const category of knownCategories) {
      const existingThemes = discovered[category]?.themes || {};
      const themeIds = Object.keys(existingThemes);
      const commonThemeNames = ["ocean", "forest", "sunset", "midnight", "pastel", "vibrant", "muted", "high-contrast"];
      for (const themeName of commonThemeNames) {
        if (themeIds.includes(themeName)) continue;
        const themePath = `${tokensBase}/themes/${category}/${themeName}.json`;
        try {
          const response = await fetch(themePath);
          if (response.ok && response.headers.get("content-type")?.includes("application/json")) {
            const themeData = await response.json();
            registerTheme(category, themeName, {
              name: themeData.name || themeName.charAt(0).toUpperCase() + themeName.slice(1),
              file: `${category}/${themeName}.json`,
              icon: themeData.icon || "\u{1F3A8}",
              description: themeData.description || `Custom ${category} theme: ${themeName}`
            });
            if (!discovered[category]) {
              discovered[category] = {
                name: category.charAt(0).toUpperCase() + category.slice(1),
                order: baseThemeCategories[category]?.order || 99,
                themes: {}
              };
            }
            discovered[category].themes[themeName] = {
              name: themeData.name || themeName.charAt(0).toUpperCase() + themeName.slice(1),
              file: `${category}/${themeName}.json`,
              icon: themeData.icon || "\u{1F3A8}",
              description: themeData.description || `Custom ${category} theme: ${themeName}`
            };
          }
        } catch {
        }
      }
    }
    discoveredThemesCache = discovered;
    return discovered;
  } catch (error) {
    if (typeof window !== "undefined" && window.__DESIGN_SYSTEM_DEBUG__) {
      console.warn("Error discovering themes:", error);
    }
    return baseThemeCategories;
  }
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
  const [selectedThemes, setSelectedThemes] = React.useState(getDefaultThemes());
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const applyTheme = React.useCallback(async (themes) => {
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
  React.useEffect(() => {
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
  const updateTheme = React.useCallback(async (category, themeId) => {
    const newThemes = {
      ...selectedThemes,
      [category]: themeId || void 0
    };
    setSelectedThemes(newThemes);
    await applyTheme(newThemes);
  }, [selectedThemes, applyTheme]);
  const resetToDefaults = React.useCallback(async () => {
    const defaults = getDefaultThemes();
    setSelectedThemes(defaults);
    await applyTheme(defaults);
  }, [applyTheme]);
  const getAvailableThemes = React.useCallback(async (category) => {
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
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [themeCategories, setThemeCategories] = React.useState(null);
  const menuRef = React.useRef(null);
  React.useEffect(() => {
    getThemeCategories().then(setThemeCategories);
  }, []);
  React.useEffect(() => {
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
  const handleCategoryClick = React.useCallback((categoryKey) => {
    setSelectedCategory(categoryKey);
  }, []);
  const handleThemeSelect = React.useCallback(async (category, themeId) => {
    const currentTheme = selectedThemes[category];
    const newTheme = currentTheme === themeId ? void 0 : themeId;
    await updateTheme(category, newTheme);
  }, [selectedThemes, updateTheme]);
  const handleBack = React.useCallback(() => {
    setSelectedCategory(null);
  }, []);
  const toggleMenu = React.useCallback(() => {
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
  const [themes, setThemes] = React.useState({});
  React.useEffect(() => {
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

exports.Badge = Badge;
exports.Button = Button;
exports.Checkbox = Checkbox;
exports.Label = Label;
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
exports.THEME_CATEGORY_ORDER = THEME_CATEGORY_ORDER;
exports.TextInput = TextInput;
exports.Textarea = Textarea;
exports.ThemeToggle = ThemeToggle;
exports.Tooltip = Tooltip;
exports.TooltipContent = TooltipContent;
exports.TooltipProvider = TooltipProvider;
exports.TooltipTrigger = TooltipTrigger;
exports.applyThemeSync = applyThemeSync;
exports.badgeVariants = badgeVariants;
exports.buttonVariants = buttonVariants;
exports.enableDebugMode = enableDebugMode;
exports.getCurrentCSSVariables = getCurrentCSSVariables;
exports.getTheme = getTheme;
exports.getThemeCategories = getThemeCategories;
exports.getThemeFilePath = getThemeFilePath;
exports.getThemesForCategory = getThemesForCategory;
exports.registerTheme = registerTheme;
exports.registerThemeFromFile = registerThemeFromFile;
exports.useTheme = useTheme;
exports.useThemeToggle = useThemeToggle;
