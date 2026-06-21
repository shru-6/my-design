'use strict';

var React9 = require('react');
var classVarianceAuthority = require('class-variance-authority');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var jsxRuntime = require('react/jsx-runtime');
var reactDom = require('react-dom');
var lucideReact = require('lucide-react');
var SliderPrimitive = require('@radix-ui/react-slider');
var inputOtp = require('input-otp');
var reactResizablePanels = require('react-resizable-panels');

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

var React9__namespace = /*#__PURE__*/_interopNamespace(React9);
var SliderPrimitive__namespace = /*#__PURE__*/_interopNamespace(SliderPrimitive);

// src/components/actions/Button.tsx
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
var iconVariants = classVarianceAuthority.cva("inline-flex items-center justify-center shrink-0", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8"
    },
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground"
    },
    shape: {
      default: "",
      circle: "rounded-full",
      square: "rounded-md"
    }
  },
  defaultVariants: {
    size: "md",
    variant: "default",
    shape: "default"
  }
});
var statusTone = {
  online: "bg-success",
  offline: "bg-muted-foreground",
  away: "bg-warning",
  busy: "bg-info"
};
function isEmptyIconNode(node) {
  if (node == null || node === false) return true;
  if (typeof node === "string") return node.trim().length === 0;
  if (Array.isArray(node)) return node.length === 0 || node.every(isEmptyIconNode);
  return false;
}
var Icon = React9__namespace.forwardRef(
  ({
    node,
    alt,
    status,
    statusPosition = "bottom-right",
    fallback,
    size,
    variant,
    shape,
    className,
    ...props
  }, ref) => {
    const resolvedContent = isEmptyIconNode(node) ? fallback ?? null : node;
    if (resolvedContent == null || resolvedContent === false) return null;
    if (typeof resolvedContent === "string" && resolvedContent.trim() === "") return null;
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "span",
      {
        ref,
        "data-slot": "icon",
        role: alt ? "img" : void 0,
        "aria-label": alt,
        className: cn(iconVariants({ size, variant, shape }), status && "relative", className),
        ...props,
        children: [
          React9__namespace.isValidElement(resolvedContent) ? React9__namespace.cloneElement(resolvedContent, {
            className: cn(resolvedContent.props.className),
            "aria-hidden": alt ? void 0 : true
          }) : resolvedContent,
          status && /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: cn(
                "absolute h-2.5 w-2.5 rounded-full border border-background",
                statusPosition === "top-right" ? "-right-0.5 -top-0.5" : "-bottom-0.5 -right-0.5",
                statusTone[status]
              )
            }
          )
        ]
      }
    );
  }
);
Icon.displayName = "Icon";
var textVariants = classVarianceAuthority.cva("text-foreground", {
  variants: {
    size: {
      "2xs": "text-[10px] leading-tight",
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl"
    },
    variant: {
      default: "",
      muted: "text-muted-foreground",
      subtle: "opacity-80",
      code: "font-mono rounded bg-muted px-1.5 py-0.5",
      danger: "text-destructive",
      outline: "border border-border"
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold"
    }
  },
  defaultVariants: {
    size: "md",
    variant: "default",
    weight: "normal"
  }
});
var textIconSizeMap = {
  "2xs": "xs",
  xs: "xs",
  sm: "xs",
  base: "sm",
  md: "sm",
  lg: "md",
  xl: "lg",
  "2xl": "xl"
};
var Text = React9__namespace.forwardRef(
  ({ as: Comp = "div", left, right, truncate, lineClamp, size, variant, weight, className, children, ...props }, ref) => {
    const resolvedSize = size ?? "md";
    const iconSize = textIconSizeMap[resolvedSize];
    const clamped = lineClamp != null;
    const isInlineHost = Comp === "span" || Comp === "button";
    return /* @__PURE__ */ jsxRuntime.jsxs(
      Comp,
      {
        ref,
        "data-slot": "text",
        className: cn(
          textVariants({ size, variant, weight }),
          isInlineHost ? "inline-flex min-w-0 items-center gap-1.5" : "flex min-w-0 items-center gap-1.5",
          className
        ),
        ...props,
        children: [
          left ? /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: left, size: iconSize }) : null,
          /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: cn("min-w-0", truncate && "truncate", clamped && "overflow-hidden"),
              style: clamped ? {
                WebkitLineClamp: lineClamp,
                WebkitBoxOrient: "vertical",
                display: "-webkit-box"
              } : void 0,
              children
            }
          ),
          right ? /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: right, size: iconSize }) : null
        ]
      }
    );
  }
);
Text.displayName = "Text";
var toneToVariant = {
  default: "default",
  muted: "muted",
  error: "danger"
};
var HelperText = React9__namespace.forwardRef(
  ({ tone = "muted", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
    "p",
    {
      ref,
      className: cn(textVariants({ size: "xs", variant: toneToVariant[tone] }), className),
      ...props,
      children
    }
  )
);
HelperText.displayName = "HelperText";
var labelVariants = classVarianceAuthority.cva("inline-flex items-center gap-1.5 text-foreground", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
var labelTextSizeMap = {
  sm: "xs",
  md: "sm",
  lg: "base"
};
var Label = React9__namespace.forwardRef(
  ({ size, required, left, className, children, ...props }, ref) => {
    const resolvedSize = size ?? "md";
    return /* @__PURE__ */ jsxRuntime.jsxs(
      Text,
      {
        ref,
        as: "label",
        size: labelTextSizeMap[resolvedSize],
        weight: "medium",
        left,
        className: cn(labelVariants({ size }), className),
        ...props,
        children: [
          children,
          required ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: textVariants({ variant: "danger" }), children: "*" }) : null
        ]
      }
    );
  }
);
Label.displayName = "Label";
var focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
var focusRingOffset = "focus-visible:ring-offset-2";
var focusRingDestructive = "focus-visible:ring-destructive";
var peerFocusRing = "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring";
var disabledControl = "disabled:cursor-not-allowed disabled:opacity-60 disabled:pointer-events-none";
var ringOffsetBackground = "ring-offset-background";
function getStringFieldValidationError(value, opts) {
  if (!opts.validate) return void 0;
  if (typeof opts.validate === "function") return opts.validate(value);
  if (opts.required && value.trim().length === 0) return opts.errorMessage ?? "This field is required.";
  if (opts.minLength != null && value.length < opts.minLength) {
    return opts.errorMessage ?? `Minimum length is ${opts.minLength}.`;
  }
  if (opts.maxLength != null && value.length > opts.maxLength) {
    return opts.errorMessage ?? `Maximum length is ${opts.maxLength}.`;
  }
  return void 0;
}
function useSyncStringFieldValidation(value, params) {
  const { validate, required, minLength, maxLength, errorMessage, onValidate } = params;
  const validationOpts = React9__namespace.useMemo(
    () => ({ validate, required, minLength, maxLength, errorMessage }),
    [validate, required, minLength, maxLength, errorMessage]
  );
  const validationError = React9__namespace.useMemo(
    () => getStringFieldValidationError(value, validationOpts),
    [value, validationOpts]
  );
  React9__namespace.useEffect(() => {
    if (validate) {
      onValidate?.(!validationError, validationError);
    }
  }, [validate, validationError, onValidate]);
  return {
    validationError,
    hasError: Boolean(validationError),
    validationOpts
  };
}
function fieldControlBlurHandler(validationOpts, userOnBlur, onValidate) {
  return (event) => {
    userOnBlur?.(event);
    if (validationOpts.validate) {
      const nextError = getStringFieldValidationError(event.currentTarget.value, validationOpts);
      onValidate?.(!nextError, nextError);
    }
  };
}
var fieldSurfaceBase = `w-full rounded-md border bg-background text-foreground transition-colors placeholder:text-muted-foreground ${focusRing} ${disabledControl}`;
var fieldSurfaceVariants = classVarianceAuthority.cva(fieldSurfaceBase, {
  variants: {
    control: {
      input: "",
      textarea: ""
    },
    size: {
      sm: "",
      md: "",
      lg: ""
    },
    variant: {
      outline: "border-border",
      filled: "border-transparent bg-muted",
      ghost: "border-transparent bg-transparent",
      underline: "rounded-none border-0 border-b border-border px-0"
    },
    invalid: {
      true: `border-destructive ${focusRingDestructive}`,
      false: ""
    }
  },
  compoundVariants: [
    {
      control: "input",
      size: "sm",
      class: "h-[var(--control-height-sm,2rem)] text-sm px-[var(--control-padding-sm,0.625rem)]"
    },
    {
      control: "input",
      size: "md",
      class: "h-[var(--control-height-md,2.5rem)] text-sm px-[var(--control-padding-md,0.75rem)]"
    },
    {
      control: "input",
      size: "lg",
      class: "h-[var(--control-height-lg,2.75rem)] text-base px-[var(--control-padding-lg,0.875rem)]"
    },
    {
      control: "textarea",
      size: "sm",
      class: "text-sm px-[var(--control-padding-sm,0.625rem)] py-2"
    },
    {
      control: "textarea",
      size: "md",
      class: "text-sm px-[var(--control-padding-md,0.75rem)] py-2.5"
    },
    {
      control: "textarea",
      size: "lg",
      class: "text-base px-[var(--control-padding-lg,0.875rem)] py-3"
    }
  ],
  defaultVariants: {
    control: "input",
    size: "md",
    variant: "outline",
    invalid: false
  }
});
function FieldLayout({
  className,
  label,
  htmlFor,
  required,
  size,
  errorMessage,
  children
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("w-full space-y-1.5", className), children: [
    label ? /* @__PURE__ */ jsxRuntime.jsx(Label, { htmlFor, required, size, children: label }) : null,
    children,
    /* @__PURE__ */ jsxRuntime.jsx(ControlErrorMessage, { message: errorMessage })
  ] });
}
function ControlLabelStack(props) {
  const { label, description, as: Comp = "span", htmlFor, className } = props;
  if (!label && !description) return null;
  return /* @__PURE__ */ jsxRuntime.jsxs(Comp, { htmlFor: Comp === "label" ? htmlFor : void 0, className: cn("grid gap-0.5 leading-tight", className), children: [
    label ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "span", size: "sm", weight: "medium", children: label }) : null,
    description ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "span", size: "xs", variant: "muted", children: description }) : null
  ] });
}
function ControlErrorMessage(props) {
  const { message } = props;
  if (!message) return null;
  return /* @__PURE__ */ jsxRuntime.jsx(HelperText, { tone: "error", children: message });
}
var adornmentPosition = {
  left: "absolute inset-y-0 left-0 flex items-center pl-3",
  right: "absolute inset-y-0 right-0 flex items-center pr-3"
};
function InputAdornmentSlot(props) {
  const { side, node, iconSize = "sm", interactive = false } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      className: cn(
        adornmentPosition[side],
        interactive ? "pointer-events-auto" : "pointer-events-none",
        textVariants({ variant: "muted" })
      ),
      children: React9__namespace.isValidElement(node) ? node : /* @__PURE__ */ jsxRuntime.jsx(Icon, { node, size: iconSize })
    }
  );
}
var sizeClass = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6"
};
var Spinner = React9__namespace.forwardRef(
  ({ size = "md", className, label = "Loading", ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsxs(
    "svg",
    {
      ref,
      role: "status",
      "aria-label": label,
      className: cn(textVariants({ variant: "muted" }), "animate-spin", sizeClass[size], className),
      viewBox: "0 0 24 24",
      fill: "none",
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "3", className: "opacity-25" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "path",
          {
            fill: "currentColor",
            className: "opacity-75",
            d: "M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"
          }
        )
      ]
    }
  )
);
Spinner.displayName = "Spinner";
var buttonVariants = classVarianceAuthority.cva(
  `inline-flex items-center justify-center gap-2 rounded-[var(--radius-button,0.375rem)] font-medium transition-colors ${focusRing} ${focusRingOffset} ${disabledControl}`,
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline: "border border-border bg-background text-foreground hover:bg-muted",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      },
      size: {
        sm: "h-[var(--control-height-sm,2rem)] px-[var(--control-padding-sm,0.625rem)] text-sm",
        md: "h-[var(--control-height-md,2.5rem)] px-[var(--control-padding-md,0.75rem)] text-sm",
        lg: "h-[var(--control-height-lg,2.75rem)] px-[var(--control-padding-lg,0.875rem)] text-base"
      },
      iconOnly: {
        true: "aspect-square p-0",
        false: ""
      }
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", class: "w-[var(--control-height-sm,2rem)]" },
      { iconOnly: true, size: "md", class: "w-[var(--control-height-md,2.5rem)]" },
      { iconOnly: true, size: "lg", class: "w-[var(--control-height-lg,2.75rem)]" }
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      iconOnly: false
    }
  }
);
var Button = React9__namespace.forwardRef((props, ref) => {
  const {
    variant,
    size,
    left,
    right,
    iconOnly,
    ariaLabel,
    loading,
    className,
    children,
    href,
    label,
    type = "button",
    disabled,
    ...domProps
  } = props;
  const busy = Boolean(loading);
  const content = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    busy ? /* @__PURE__ */ jsxRuntime.jsx(Spinner, { size: size === "lg" ? "md" : "sm" }) : left ? /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: left, size: "sm" }) : null,
    !iconOnly ? children ?? label : null,
    !busy && right ? /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: right, size: "sm" }) : null
  ] });
  const classes = cn(buttonVariants({ variant, size, iconOnly }), className);
  if (href) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "a",
      {
        ref,
        href,
        "aria-label": ariaLabel,
        "aria-busy": busy || void 0,
        className: classes,
        ...domProps,
        children: content
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ref,
      type,
      "aria-label": ariaLabel,
      "aria-busy": busy || void 0,
      disabled: disabled || busy,
      className: classes,
      ...domProps,
      children: content
    }
  );
});
Button.displayName = "Button";
var fabVariants = classVarianceAuthority.cva(
  `fixed z-sticky inline-flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 ${focusRing} ${disabledControl}`,
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground"
      },
      size: {
        sm: "h-10 w-10",
        md: "h-12 w-12",
        lg: "h-14 w-14"
      },
      position: {
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "bottom-center": "bottom-4 left-1/2 -translate-x-1/2"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      position: "bottom-right"
    }
  }
);
var FAB = React9__namespace.forwardRef(
  ({ left, ariaLabel, variant, size, position, className, onClick, type = "button", ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      ref,
      type,
      "aria-label": ariaLabel,
      className: cn(fabVariants({ variant, size, position }), className),
      onClick,
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: left, size: size === "lg" ? "lg" : "md" })
    }
  )
);
FAB.displayName = "FAB";
var tooltipContentVariants = classVarianceAuthority.cva(
  [
    "z-toast overflow-visible rounded-md px-3 py-1.5 text-xs shadow-md",
    "transition-opacity ease-out"
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        inverted: "bg-foreground text-background",
        info: "border border-info/40 bg-info/15 text-info"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var tooltipArrowVariants = classVarianceAuthority.cva("pointer-events-none absolute h-2 w-2 rotate-45", {
  variants: {
    variant: {
      default: "bg-primary",
      inverted: "bg-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
var INFO_ARROW = {
  top: "bottom-[-5px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[5px] border-solid border-t-info/50",
  bottom: "top-[-5px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[5px] border-x-transparent border-b-[5px] border-solid border-b-info/50",
  left: "right-[-5px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[5px] border-y-transparent border-l-[5px] border-solid border-l-info/50",
  right: "left-[-5px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[5px] border-y-transparent border-r-[5px] border-solid border-r-info/50"
};
var ARROW_PLACEMENT = {
  top: "bottom-[-4px] left-1/2 -translate-x-1/2",
  bottom: "top-[-4px] left-1/2 -translate-x-1/2",
  left: "right-[-4px] top-1/2 -translate-y-1/2",
  right: "left-[-4px] top-1/2 -translate-y-1/2"
};
function tooltipArrowClass(placement, variant) {
  if (variant === "info") {
    return cn("pointer-events-none absolute", INFO_ARROW[placement]);
  }
  return cn(tooltipArrowVariants({ variant }), ARROW_PLACEMENT[placement]);
}
var HIDDEN = { top: -9999, left: -9999 };
var CONTENT_HOVER_CLOSE_DELAY_MS = 160;
var VIEWPORT_PADDING = 8;
function clampToViewport(left, top, w, h) {
  const p = VIEWPORT_PADDING;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const maxLeft = Math.max(p, vw - w - p);
  const maxTop = Math.max(p, vh - h - p);
  return {
    left: Math.min(Math.max(left, p), maxLeft),
    top: Math.min(Math.max(top, p), maxTop)
  };
}
function fitsInViewport(left, top, w, h) {
  const p = VIEWPORT_PADDING;
  const vw = typeof window !== "undefined" ? window.innerWidth : 0;
  const vh = typeof window !== "undefined" ? window.innerHeight : 0;
  return left >= p && top >= p && left + w <= vw - p && top + h <= vh - p;
}
function flipPlacement(p) {
  switch (p) {
    case "top":
      return "bottom";
    case "bottom":
      return "top";
    case "left":
      return "right";
    case "right":
      return "left";
  }
}
function placementCandidates(preferred) {
  const flip = flipPlacement(preferred);
  const rest = ["top", "bottom", "left", "right"].filter((x) => x !== preferred && x !== flip);
  return [preferred, flip, rest[0], rest[1]];
}
function pickPlacementAndCoords(trigger, preferred, w, h, gap, autoPlacement, xOffset, yOffset) {
  const order = autoPlacement ? placementCandidates(preferred) : [preferred];
  for (const p of order) {
    const c2 = placeTooltip(trigger, p, w, h, gap);
    const left = c2.left + xOffset;
    const top = c2.top + yOffset;
    if (!autoPlacement || fitsInViewport(left, top, w, h)) {
      return { placement: p, coords: { left, top } };
    }
  }
  const c = placeTooltip(trigger, preferred, w, h, gap);
  return {
    placement: preferred,
    coords: clampToViewport(c.left + xOffset, c.top + yOffset, w, h)
  };
}
function placeTooltip(trigger, placement, w, h, offset = 6) {
  switch (placement) {
    case "top":
      return {
        top: trigger.top - h - offset,
        left: trigger.left + trigger.width / 2 - w / 2
      };
    case "bottom":
      return {
        top: trigger.bottom + offset,
        left: trigger.left + trigger.width / 2 - w / 2
      };
    case "left":
      return {
        top: trigger.top + trigger.height / 2 - h / 2,
        left: trigger.left - w - offset
      };
    case "right":
      return {
        top: trigger.top + trigger.height / 2 - h / 2,
        left: trigger.right + offset
      };
  }
}
function mergeRefs(...refs) {
  return (node) => {
    for (const ref of refs) {
      if (ref == null) continue;
      if (typeof ref === "function") ref(node);
      else ref.current = node;
    }
  };
}
function Tooltip({
  content,
  disabled,
  children,
  placement = "top",
  transitionDuration = 200,
  className,
  variant,
  keepOpenOnContentHover = true,
  autoPlacement = false,
  xOffset = 0,
  yOffset = 0,
  maxWidth,
  showArrow = true
}) {
  const triggerRef = React9__namespace.useRef(null);
  const floatingRef = React9__namespace.useRef(null);
  const hideTimeoutRef = React9__namespace.useRef(null);
  const [open, setOpen] = React9__namespace.useState(false);
  const [entered, setEntered] = React9__namespace.useState(false);
  const [coords, setCoords] = React9__namespace.useState(HIDDEN);
  const [resolvedPlacement, setResolvedPlacement] = React9__namespace.useState(placement);
  const id = React9__namespace.useId();
  const tooltipId = `tooltip-${id}`;
  const maxWidthCss = maxWidth !== void 0 && maxWidth !== null && maxWidth !== "" ? typeof maxWidth === "number" ? `${maxWidth}px` : String(maxWidth) : void 0;
  React9__namespace.useLayoutEffect(() => {
    if (!open) setResolvedPlacement(placement);
  }, [placement, open]);
  const clearCloseTimer = React9__namespace.useCallback(() => {
    if (hideTimeoutRef.current != null) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);
  const hide = React9__namespace.useCallback(() => {
    clearCloseTimer();
    setOpen(false);
    setEntered(false);
    setCoords(HIDDEN);
  }, [clearCloseTimer]);
  const scheduleClose = React9__namespace.useCallback(() => {
    clearCloseTimer();
    hideTimeoutRef.current = window.setTimeout(() => {
      hideTimeoutRef.current = null;
      hide();
    }, CONTENT_HOVER_CLOSE_DELAY_MS);
  }, [hide, clearCloseTimer]);
  const show = React9__namespace.useCallback(() => {
    clearCloseTimer();
    if (!disabled) setOpen(true);
  }, [disabled, clearCloseTimer]);
  React9__namespace.useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);
  const onTriggerPointerLeave = React9__namespace.useCallback(
    (e, childHandler) => {
      childHandler?.(e);
      if (keepOpenOnContentHover) {
        const next = e.relatedTarget;
        if (next instanceof Node && floatingRef.current?.contains(next)) return;
        scheduleClose();
      } else {
        hide();
      }
    },
    [keepOpenOnContentHover, scheduleClose, hide]
  );
  const updatePosition = React9__namespace.useCallback(() => {
    const trigger2 = triggerRef.current;
    const float = floatingRef.current;
    if (!trigger2 || !float) return;
    const rect = trigger2.getBoundingClientRect();
    const { width, height } = float.getBoundingClientRect();
    const { placement: resolved, coords: next } = pickPlacementAndCoords(
      rect,
      placement,
      width,
      height,
      6,
      autoPlacement,
      xOffset,
      yOffset
    );
    setResolvedPlacement(resolved);
    setCoords(next);
  }, [placement, autoPlacement, xOffset, yOffset]);
  React9__namespace.useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    const onScrollOrResize = () => updatePosition();
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, updatePosition, content, placement, maxWidthCss]);
  React9__namespace.useLayoutEffect(() => {
    if (!open) return;
    setEntered(false);
    const id2 = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id2);
  }, [open]);
  const bindTrigger = (el) => {
    triggerRef.current = el;
  };
  const trigger = React9__namespace.isValidElement(children) && typeof children !== "string" ? React9__namespace.cloneElement(children, {
    ref: mergeRefs(
      bindTrigger,
      children.ref
    ),
    onPointerEnter: (e) => {
      children.props.onPointerEnter?.(e);
      show();
    },
    onPointerLeave: (e) => {
      onTriggerPointerLeave(
        e,
        children.props.onPointerLeave
      );
    },
    onFocus: (e) => {
      children.props.onFocus?.(e);
      show();
    },
    onBlur: (e) => {
      children.props.onBlur?.(e);
      hide();
    },
    "aria-describedby": open ? tooltipId : void 0
  }) : /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      ref: bindTrigger,
      className: "inline-flex",
      onPointerEnter: show,
      onPointerLeave: (e) => onTriggerPointerLeave(e),
      onFocus: show,
      onBlur: hide,
      "aria-describedby": open ? tooltipId : void 0,
      children
    }
  );
  const portal = open && typeof document !== "undefined" ? reactDom.createPortal(
    /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref: floatingRef,
        id: tooltipId,
        role: "tooltip",
        style: {
          position: "fixed",
          top: coords.top,
          left: coords.left,
          transitionDuration: `${transitionDuration}ms`,
          ...maxWidthCss ? { maxWidth: maxWidthCss } : {}
        },
        className: cn(
          tooltipContentVariants({ variant }),
          maxWidthCss ? "max-w-none" : "max-w-xs",
          entered ? "opacity-100" : "opacity-0",
          !keepOpenOnContentHover && "pointer-events-none",
          className
        ),
        onPointerEnter: keepOpenOnContentHover ? show : void 0,
        onPointerLeave: keepOpenOnContentHover ? scheduleClose : void 0,
        children: [
          content,
          showArrow ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: tooltipArrowClass(resolvedPlacement, variant), "aria-hidden": true }) : null
        ]
      }
    ),
    document.body
  ) : null;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    trigger,
    portal
  ] });
}
Tooltip.displayName = "Tooltip";
function TooltipProvider({ children }) {
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children });
}
TooltipProvider.displayName = "TooltipProvider";
var CopyButton = React9__namespace.forwardRef(
  ({
    value,
    onValueCopy,
    onCopyError,
    copyLabel = "Copy",
    copiedLabel = "Copied!",
    timeout = 2e3,
    tooltip = true,
    tooltipLabel,
    tooltipCopiedLabel,
    tooltipContent,
    children,
    disabled,
    ...buttonProps
  }, ref) => {
    const [copied, setCopied] = React9__namespace.useState(false);
    const timerRef = React9__namespace.useRef();
    React9__namespace.useEffect(() => () => clearTimeout(timerRef.current), []);
    const handleCopy = async () => {
      if (disabled) return;
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        onValueCopy?.(value);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCopied(false), timeout);
      } catch (e) {
        onCopyError?.(e);
      }
    };
    const button = /* @__PURE__ */ jsxRuntime.jsx(Button, { ref, onClick: handleCopy, disabled, ...buttonProps, children: children ?? (copied ? copiedLabel : copyLabel) });
    if (!tooltip) return button;
    const idleTooltip = tooltipLabel ?? tooltipContent ?? copyLabel;
    const copiedTooltip = tooltipCopiedLabel ?? copiedLabel;
    const content = copied ? copiedTooltip : idleTooltip;
    return /* @__PURE__ */ jsxRuntime.jsx(Tooltip, { content, disabled, children: button });
  }
);
CopyButton.displayName = "CopyButton";

// src/utils/zIndex.ts
var zLayers = {
  sticky: 10,
  dropdown: 20,
  overlay: 40,
  modal: 50,
  toast: 60
};
function zLayerValue(layer) {
  return zLayers[layer];
}

// src/utils/floatingPosition.ts
var VIEWPORT_MARGIN = 8;
function computeFloatingMenuStyle(trigger, menu, options) {
  const align = options?.align ?? "start";
  const sideOffset = options?.sideOffset ?? 4;
  const maxHeightCap = options?.maxHeightCap ?? 320;
  const minWidth = options?.minWidth ?? "10rem";
  const zIndex = options?.zIndex ?? zLayerValue("dropdown");
  const rect = trigger.getBoundingClientRect();
  const menuHeight = menu?.offsetHeight ?? 0;
  const menuWidth = menu?.offsetWidth ?? 0;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const spaceBelow = vh - rect.bottom - sideOffset - VIEWPORT_MARGIN;
  const spaceAbove = rect.top - sideOffset - VIEWPORT_MARGIN;
  const openBelow = menuHeight === 0 || spaceBelow >= menuHeight || spaceBelow >= spaceAbove;
  let top = openBelow ? rect.bottom + sideOffset : rect.top - sideOffset - (menuHeight || 0);
  let left = rect.left;
  let transform;
  if (align === "center") {
    left = rect.left + rect.width / 2;
    transform = "translateX(-50%)";
    if (menuWidth > 0) {
      const half = menuWidth / 2;
      if (left - half < VIEWPORT_MARGIN) left = VIEWPORT_MARGIN + half;
      if (left + half > vw - VIEWPORT_MARGIN) left = vw - VIEWPORT_MARGIN - half;
    }
  } else if (align === "end") {
    left = rect.right;
    transform = "translateX(-100%)";
    if (menuWidth > 0 && left - menuWidth < VIEWPORT_MARGIN) {
      left = VIEWPORT_MARGIN + menuWidth;
    }
  } else if (menuWidth > 0 && left + menuWidth > vw - VIEWPORT_MARGIN) {
    left = Math.max(VIEWPORT_MARGIN, vw - VIEWPORT_MARGIN - menuWidth);
  }
  if (top < VIEWPORT_MARGIN) top = VIEWPORT_MARGIN;
  if (menuHeight > 0 && top + menuHeight > vh - VIEWPORT_MARGIN) {
    top = Math.max(VIEWPORT_MARGIN, vh - VIEWPORT_MARGIN - menuHeight);
  }
  const available = openBelow ? spaceBelow : spaceAbove;
  const maxHeight = Math.max(120, Math.min(maxHeightCap, available));
  return {
    position: "fixed",
    top,
    left,
    transform,
    zIndex,
    minWidth: align === "start" ? `${Math.max(rect.width, 0)}px` : minWidth,
    maxHeight,
    overflowY: "auto",
    visibility: "visible"
  };
}

// src/components/overlays/useFloatingMenu.ts
function useFloatingMenu({
  open,
  onOpenChange,
  triggerRef,
  menuRef,
  align = "start",
  sideOffset = 4,
  minWidth = "10rem",
  maxHeight: maxHeightCap = 320,
  zIndex = zLayerValue("dropdown")
}) {
  const [menuStyle, setMenuStyle] = React9__namespace.useState({ visibility: "hidden" });
  const [positioned, setPositioned] = React9__namespace.useState(false);
  const updatePosition = React9__namespace.useCallback(() => {
    const trigger = triggerRef.current;
    const menu = menuRef.current;
    if (!trigger) return;
    setMenuStyle(
      computeFloatingMenuStyle(trigger, menu, {
        align,
        sideOffset,
        maxHeightCap,
        minWidth,
        zIndex
      })
    );
  }, [align, maxHeightCap, minWidth, sideOffset, triggerRef, menuRef, zIndex]);
  React9__namespace.useLayoutEffect(() => {
    if (!open) {
      setPositioned(false);
      return;
    }
    setPositioned(false);
    updatePosition();
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      updatePosition();
      raf2 = requestAnimationFrame(() => setPositioned(true));
    });
    const fallback = window.setTimeout(() => setPositioned(true), 48);
    const onReposition = () => updatePosition();
    window.addEventListener("scroll", onReposition, true);
    window.addEventListener("resize", onReposition);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(fallback);
      window.removeEventListener("scroll", onReposition, true);
      window.removeEventListener("resize", onReposition);
    };
  }, [open, updatePosition]);
  React9__namespace.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      const t = e.target;
      if (triggerRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      onOpenChange(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [open, onOpenChange, triggerRef, menuRef]);
  const resolvedStyle = React9__namespace.useMemo(
    () => ({
      ...menuStyle,
      visibility: positioned ? menuStyle.visibility ?? "visible" : "hidden"
    }),
    [menuStyle, positioned]
  );
  return { menuStyle: resolvedStyle, updatePosition, positioned };
}
var floatingMenuListClass = "z-dropdown overflow-y-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none";
var floatingMenuSurfaceClass = "z-dropdown overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md outline-none";
var floatingMenuHoverClass = "hover:bg-[hsl(var(--foreground)/0.08)] focus-visible:bg-[hsl(var(--foreground)/0.08)] active:bg-[hsl(var(--foreground)/0.12)]";
var floatingMenuItemClass = "flex w-full cursor-default select-none items-center gap-2 rounded-sm border-0 bg-transparent px-2 py-1.5 text-left text-sm text-popover-foreground outline-none transition-colors disabled:pointer-events-none disabled:opacity-50";
var floatingMenuItemSelectedClass = "bg-[hsl(var(--foreground)/0.06)]";
function FloatingMenuItem({ className, selected, type = "button", ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    "button",
    {
      type,
      className: cn(floatingMenuItemClass, floatingMenuHoverClass, selected && floatingMenuItemSelectedClass, className),
      ...props
    }
  );
}
FloatingMenuItem.displayName = "FloatingMenuItem";
function Dropdown({
  items,
  triggerProps,
  trigger,
  contentClassName,
  align = "start",
  sideOffset = 4,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  ...rest
}) {
  const { label = "Menu", left, variant = "outline", size = "md", className: triggerClassName } = triggerProps ?? {};
  const [internalOpen, setInternalOpen] = React9__namespace.useState(defaultOpen);
  const isControlled = openProp !== void 0 && onOpenChange != null;
  const open = isControlled ? Boolean(openProp) : internalOpen;
  const setOpen = React9__namespace.useCallback(
    (next) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );
  const triggerRef = React9__namespace.useRef(null);
  const menuRef = React9__namespace.useRef(null);
  const { menuStyle } = useFloatingMenu({
    open,
    onOpenChange: setOpen,
    triggerRef,
    menuRef,
    align,
    sideOffset
  });
  const focusableIndex = React9__namespace.useRef(0);
  const onMenuKeyDown = (e) => {
    const menu = menuRef.current;
    if (!menu) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const count = menu.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])').length;
      focusableIndex.current = Math.min(focusableIndex.current + 1, Math.max(0, count - 1));
      const nodes = menu.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])');
      nodes[focusableIndex.current]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusableIndex.current = Math.max(focusableIndex.current - 1, 0);
      const nodes = menu.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])');
      nodes[focusableIndex.current]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      focusableIndex.current = 0;
      menu.querySelector('[role="menuitem"]')?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      const nodes = menu.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])');
      focusableIndex.current = Math.max(0, nodes.length - 1);
      nodes[nodes.length - 1]?.focus();
    }
  };
  React9__namespace.useEffect(() => {
    if (!open || !menuRef.current) return;
    focusableIndex.current = 0;
    const first = menuRef.current.querySelector('[role="menuitem"]:not([aria-disabled="true"])');
    requestAnimationFrame(() => first?.focus());
  }, [open]);
  const menuContent = open ? /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref: menuRef,
      role: "menu",
      tabIndex: -1,
      style: menuStyle,
      onKeyDown: onMenuKeyDown,
      className: cn(floatingMenuListClass, contentClassName),
      children: items.map(
        (item, index) => item.separator ? /* @__PURE__ */ jsxRuntime.jsx("div", { role: "separator", className: "-mx-1 my-1 h-px bg-border" }, `sep-${index}`) : /* @__PURE__ */ jsxRuntime.jsxs(
          "button",
          {
            type: "button",
            role: "menuitem",
            tabIndex: -1,
            disabled: item.disabled,
            className: cn(floatingMenuItemClass, floatingMenuHoverClass, item.disabled && "pointer-events-none opacity-50"),
            onClick: () => {
              if (item.disabled) return;
              item.onClick?.();
              setOpen(false);
            },
            children: [
              item.left ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: item.left, size: "sm" }) }) : null,
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1", children: item.label })
            ]
          },
          item.value ?? `item-${index}`
        )
      )
    }
  ) : null;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("relative inline-block", className), ...rest, children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { ref: triggerRef, children: trigger ? React9__namespace.isValidElement(trigger) ? React9__namespace.cloneElement(trigger, {
      onClick: (e) => {
        trigger.props.onClick?.(e);
        setOpen(!open);
      },
      "aria-expanded": open,
      "aria-haspopup": "menu"
    }) : trigger : /* @__PURE__ */ jsxRuntime.jsxs(
      Button,
      {
        variant,
        size,
        className: cn("gap-2", triggerClassName),
        "aria-expanded": open,
        "aria-haspopup": "menu",
        onClick: () => setOpen(!open),
        children: [
          left ? /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: left, size: "sm" }) : null,
          label
        ]
      }
    ) }),
    typeof document !== "undefined" && menuContent ? reactDom.createPortal(menuContent, document.body) : null
  ] });
}
Dropdown.displayName = "Dropdown";
function menuToDropdownItems(items) {
  return items.map((item) => ({
    label: item.label,
    onClick: item.onClick,
    left: item.left,
    disabled: item.disabled,
    separator: item.separator
  }));
}
function SplitButton({
  onClick,
  menuItems,
  disabled,
  loading,
  children,
  variant = "primary",
  size = "md",
  buttonProps,
  dropdownProps,
  className,
  ...rest
}) {
  const items = menuToDropdownItems(menuItems ?? []);
  const {
    className: bpClass,
    onClick: bpOnClick,
    disabled: bpDisabled,
    loading: bpLoading,
    ...restButton
  } = buttonProps ?? {};
  const divideClass = variant === "outline" ? "divide-border border border-border bg-background" : variant === "ghost" ? "divide-border/50" : variant === "secondary" ? "divide-secondary-foreground/25" : "divide-primary-foreground/25";
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("inline-flex divide-x overflow-hidden rounded-md", divideClass, className), ...rest, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      Button,
      {
        variant,
        size,
        disabled: disabled ?? bpDisabled,
        loading: loading ?? bpLoading,
        className: cn("rounded-none rounded-l-md border-0 shadow-none", bpClass),
        onClick: (e) => {
          bpOnClick?.(e);
          onClick?.();
        },
        ...restButton,
        children: children ?? "Action"
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      Dropdown,
      {
        items,
        align: "end",
        trigger: /* @__PURE__ */ jsxRuntime.jsx(
          Button,
          {
            variant,
            size,
            iconOnly: true,
            ariaLabel: "Open menu",
            disabled: Boolean(disabled ?? bpDisabled) || Boolean(loading ?? bpLoading),
            className: cn("rounded-none rounded-r-md border-0 shadow-none", bpClass),
            left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: "h-4 w-4", strokeWidth: 2, "aria-hidden": true })
          }
        ),
        ...dropdownProps
      }
    )
  ] });
}
SplitButton.displayName = "SplitButton";
var TextInput = React9__namespace.forwardRef(
  ({
    id,
    label,
    errorMessage,
    left,
    right,
    rightInteractive,
    size,
    variant,
    className,
    validate,
    onValidate,
    value,
    defaultValue,
    onBlur,
    onChange,
    required,
    minLength,
    maxLength,
    ...props
  }, ref) => {
    const generatedId = React9__namespace.useId();
    const inputId = id ?? generatedId;
    const [uncontrolledValue, setUncontrolledValue] = React9__namespace.useState(String(defaultValue ?? ""));
    const resolvedValue = value != null ? String(value) : uncontrolledValue;
    const { validationError, hasError, validationOpts } = useSyncStringFieldValidation(resolvedValue, {
      validate,
      required,
      minLength,
      maxLength,
      errorMessage,
      onValidate
    });
    return /* @__PURE__ */ jsxRuntime.jsx(
      FieldLayout,
      {
        label,
        htmlFor: inputId,
        required,
        size,
        errorMessage: hasError ? validationError : void 0,
        children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative", children: [
          left ? /* @__PURE__ */ jsxRuntime.jsx(InputAdornmentSlot, { side: "left", node: left }) : null,
          /* @__PURE__ */ jsxRuntime.jsx(
            "input",
            {
              ref,
              id: inputId,
              value,
              defaultValue,
              required,
              minLength,
              maxLength,
              onChange: (event) => {
                if (value == null) {
                  setUncontrolledValue(event.target.value);
                }
                onChange?.(event);
              },
              onBlur: fieldControlBlurHandler(validationOpts, onBlur, onValidate),
              className: cn(
                fieldSurfaceVariants({ control: "input", size, variant, invalid: hasError }),
                left && "pl-10",
                right && "pr-10",
                className
              ),
              ...props
            }
          ),
          right ? /* @__PURE__ */ jsxRuntime.jsx(InputAdornmentSlot, { side: "right", node: right, interactive: rightInteractive }) : null
        ] })
      }
    );
  }
);
TextInput.displayName = "TextInput";
function getResizeClass(resize) {
  if (resize === "none") return "resize-none";
  if (resize === "vertical") return "resize-y";
  if (resize === "horizontal") return "resize-x";
  return "resize";
}
var Textarea = React9__namespace.forwardRef(
  ({
    id,
    label,
    errorMessage,
    size,
    variant,
    className,
    validate,
    onValidate,
    value,
    defaultValue,
    onBlur,
    onChange,
    required,
    minLength,
    maxLength,
    resize = "vertical",
    ...props
  }, ref) => {
    const generatedId = React9__namespace.useId();
    const textareaId = id ?? generatedId;
    const [uncontrolledValue, setUncontrolledValue] = React9__namespace.useState(String(defaultValue ?? ""));
    const resolvedValue = value != null ? String(value) : uncontrolledValue;
    const { validationError, hasError, validationOpts } = useSyncStringFieldValidation(resolvedValue, {
      validate,
      required,
      minLength,
      maxLength,
      errorMessage,
      onValidate
    });
    return /* @__PURE__ */ jsxRuntime.jsx(
      FieldLayout,
      {
        label,
        htmlFor: textareaId,
        required,
        size,
        errorMessage: hasError ? validationError : void 0,
        children: /* @__PURE__ */ jsxRuntime.jsx(
          "textarea",
          {
            ref,
            id: textareaId,
            value,
            defaultValue,
            required,
            minLength,
            maxLength,
            onChange: (event) => {
              if (value == null) {
                setUncontrolledValue(event.target.value);
              }
              onChange?.(event);
            },
            onBlur: fieldControlBlurHandler(validationOpts, onBlur, onValidate),
            className: cn(
              fieldSurfaceVariants({ control: "textarea", size, variant, invalid: hasError }),
              getResizeClass(resize),
              className
            ),
            ...props
          }
        )
      }
    );
  }
);
Textarea.displayName = "Textarea";
var checkboxVariants = classVarianceAuthority.cva(
  `inline-flex items-center justify-center rounded border border-border bg-background text-primary ${ringOffsetBackground} transition-colors ${disabledControl}`,
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var Checkbox = React9__namespace.forwardRef(
  ({
    size,
    label,
    description,
    errorMessage,
    className,
    onChange,
    id,
    checked,
    default: defaultState,
    indeterminate,
    ...props
  }, ref) => {
    const generatedId = React9__namespace.useId();
    const checkboxId = id ?? generatedId;
    const isControlled = checked !== void 0 && onChange != null;
    const resolvedDefault = Boolean(defaultState ?? checked);
    const [internalChecked, setInternalChecked] = React9__namespace.useState(resolvedDefault);
    const resolvedChecked = isControlled ? Boolean(checked) : internalChecked;
    const inputRef = React9__namespace.useRef(null);
    React9__namespace.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate]);
    React9__namespace.useImperativeHandle(ref, () => inputRef.current);
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("label", { htmlFor: checkboxId, className: "inline-flex shrink-0 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "input",
            {
              ref: inputRef,
              id: checkboxId,
              type: "checkbox",
              className: "peer sr-only",
              checked: isControlled ? Boolean(checked) : void 0,
              defaultChecked: isControlled ? void 0 : resolvedDefault,
              onChange: (event) => {
                if (!isControlled) {
                  setInternalChecked(event.target.checked);
                }
                onChange?.(event.target.checked);
              },
              ...props
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              "aria-hidden": "true",
              className: cn(
                checkboxVariants({ size }),
                peerFocusRing,
                resolvedChecked && "border-primary bg-primary text-primary-foreground",
                className
              ),
              children: indeterminate || resolvedChecked ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-[11px] leading-none", children: indeterminate ? "\u2212" : "\u2713" }) : null
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(ControlLabelStack, { as: "label", htmlFor: checkboxId, label, description })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(ControlErrorMessage, { message: errorMessage })
    ] });
  }
);
Checkbox.displayName = "Checkbox";
var radioVariants = classVarianceAuthority.cva(
  `inline-flex items-center justify-center rounded-full border border-border bg-background transition-colors ${disabledControl}`,
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6"
      },
      selected: {
        true: "border-primary",
        false: ""
      }
    },
    defaultVariants: {
      size: "md",
      selected: false
    }
  }
);
var Radio = React9__namespace.forwardRef(
  ({
    size,
    checked,
    default: defaultState,
    defaultChecked,
    onChange,
    className,
    id,
    label,
    description,
    errorMessage,
    disabled,
    ...props
  }, ref) => {
    const generatedId = React9__namespace.useId();
    const radioId = id ?? generatedId;
    const resolvedDefault = defaultState ?? defaultChecked;
    const [internalChecked, setInternalChecked] = React9__namespace.useState(Boolean(checked ?? resolvedDefault));
    const isControlled = checked !== void 0 && onChange != null;
    const resolvedChecked = isControlled ? checked : internalChecked;
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        "label",
        {
          htmlFor: radioId,
          className: cn("flex items-start gap-2", disabled && "cursor-not-allowed opacity-60"),
          children: [
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: cn(radioVariants({ size, selected: resolvedChecked }), className), children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "input",
                {
                  ref,
                  id: radioId,
                  type: "radio",
                  className: "sr-only",
                  checked: isControlled ? checked : void 0,
                  defaultChecked: isControlled ? void 0 : Boolean(checked ?? resolvedDefault),
                  onChange: (event) => {
                    if (!isControlled) {
                      setInternalChecked(event.target.checked);
                    }
                    onChange?.(event.target.checked);
                  },
                  ...props,
                  disabled
                }
              ),
              resolvedChecked ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "h-2 w-2 rounded-full bg-primary" }) : null
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(ControlLabelStack, { label, description })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(ControlErrorMessage, { message: errorMessage })
    ] });
  }
);
Radio.displayName = "Radio";
var toggleVariants = classVarianceAuthority.cva(
  `peer inline-flex shrink-0 cursor-pointer items-center rounded-full border transition-colors ${disabledControl} data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=unchecked]:border-border`,
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-12"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var toggleThumbVariants = classVarianceAuthority.cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0.5",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var Toggle = React9__namespace.forwardRef(
  ({
    size,
    label,
    description,
    errorMessage,
    className,
    onChange,
    id,
    checked,
    default: defaultState,
    defaultChecked,
    disabled,
    onClick,
    ...props
  }, ref) => {
    const generatedId = React9__namespace.useId();
    const toggleId = id ?? generatedId;
    const resolvedDefault = defaultState ?? defaultChecked ?? false;
    const isControlled = checked !== void 0;
    const [internalChecked, setInternalChecked] = React9__namespace.useState(() => Boolean(resolvedDefault));
    const on = isControlled ? Boolean(checked) : internalChecked;
    const readOnly = isControlled && !onChange;
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("label", { htmlFor: toggleId, className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            ref,
            type: "button",
            role: "switch",
            id: toggleId,
            "aria-checked": on,
            disabled,
            "data-state": on ? "checked" : "unchecked",
            className: cn(toggleVariants({ size }), className),
            onClick: (e) => {
              onClick?.(e);
              if (readOnly || disabled) return;
              const next = !on;
              if (!isControlled) setInternalChecked(next);
              onChange?.(next);
            },
            ...props,
            children: /* @__PURE__ */ jsxRuntime.jsx("span", { "data-state": on ? "checked" : "unchecked", className: toggleThumbVariants({ size }) })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(ControlLabelStack, { label, description })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(ControlErrorMessage, { message: errorMessage })
    ] });
  }
);
Toggle.displayName = "Toggle";
var sliderThumbClassName = `block h-4 w-4 rounded-full border border-primary/60 bg-background shadow ${focusRing} ${disabledControl}`;
var sliderVariants = classVarianceAuthority.cva("relative flex w-full touch-none select-none items-center", {
  variants: {
    size: {
      sm: "h-4",
      md: "h-5",
      lg: "h-6"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
var Slider = React9__namespace.forwardRef(
  ({
    value,
    defaultValue = 0,
    onChange,
    range: range2 = false,
    showValue,
    valueFormatter,
    marks,
    label,
    errorMessage,
    size,
    orientation = "horizontal",
    className,
    ...props
  }, ref) => {
    const normalizeValue = React9__namespace.useCallback(
      (nextValue) => {
        if (Array.isArray(nextValue)) return nextValue;
        if (range2) return [nextValue, nextValue];
        return nextValue;
      },
      [range2]
    );
    const initialValue = React9__namespace.useMemo(() => {
      const seed = value ?? defaultValue;
      return normalizeValue(seed);
    }, [defaultValue, normalizeValue, value]);
    const [internalValue, setInternalValue] = React9__namespace.useState(initialValue);
    const isControlled = value !== void 0 && onChange != null;
    const current = isControlled ? value : internalValue;
    const currentDisplay = valueFormatter ? valueFormatter(current) : Array.isArray(current) ? `${current[0]} - ${current[1]}` : current;
    const toRadix = (v) => Array.isArray(v) ? [v[0], v[1]] : [v];
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "w-full space-y-1.5", children: [
      (label || showValue) && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        label ? /* @__PURE__ */ jsxRuntime.jsx(Label, { size: "sm", children: label }) : /* @__PURE__ */ jsxRuntime.jsx("span", {}),
        showValue ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "span", size: "xs", variant: "muted", children: currentDisplay }) : null
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        SliderPrimitive__namespace.Root,
        {
          ref,
          value: toRadix(current),
          onValueChange: (next) => {
            const nextValue = range2 ? [next[0] ?? 0, next[1] ?? next[0] ?? 0] : next[0] ?? 0;
            if (!isControlled) setInternalValue(nextValue);
            onChange?.(nextValue);
          },
          className: cn(
            sliderVariants({ size }),
            orientation === "vertical" ? "h-40 w-6 flex-col" : "w-full",
            className
          ),
          ...props,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(SliderPrimitive__namespace.Track, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntime.jsx(SliderPrimitive__namespace.Range, { className: "absolute h-full bg-primary" }) }),
            /* @__PURE__ */ jsxRuntime.jsx(SliderPrimitive__namespace.Thumb, { className: sliderThumbClassName }),
            range2 ? /* @__PURE__ */ jsxRuntime.jsx(SliderPrimitive__namespace.Thumb, { className: sliderThumbClassName }) : null
          ]
        }
      ),
      marks?.length ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-between", children: marks.map((mark) => /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "span", size: "2xs", variant: "muted", children: mark.label ?? mark.value }, `${mark.value}-${String(mark.label ?? "")}`)) }) : null,
      /* @__PURE__ */ jsxRuntime.jsx(ControlErrorMessage, { message: errorMessage })
    ] });
  }
);
Slider.displayName = "Slider";
var ratingVariants = classVarianceAuthority.cva("inline-flex items-center gap-0.5", {
  variants: {
    size: {
      sm: "[&_.rating-star-slot]:h-4 [&_.rating-star-slot]:w-4",
      md: "[&_.rating-star-slot]:h-5 [&_.rating-star-slot]:w-5",
      lg: "[&_.rating-star-slot]:h-6 [&_.rating-star-slot]:w-6"
    }
  },
  defaultVariants: { size: "md" }
});
function roundToStep(value, step) {
  const n = Math.round(value / step);
  return Math.min(100, Math.max(0, n * step));
}
function fillForStar(starIndex1Based, value) {
  return Math.min(1, Math.max(0, value - (starIndex1Based - 1)));
}
function valueFromPointer(starIndex1Based, clientX, starLeft, starWidth, max, precision) {
  const rel = starWidth > 0 ? Math.min(1, Math.max(0, (clientX - starLeft) / starWidth)) : 1;
  const step = precision;
  const segments = step === 1 ? 1 : step === 0.5 ? 2 : 4;
  const seg = Math.max(1, Math.ceil(rel * segments));
  const frac = seg / segments;
  const raw = starIndex1Based - 1 + frac;
  return roundToStep(Math.min(max, raw), step);
}
var Rating = React9__namespace.forwardRef(
  ({
    className,
    size,
    value: valueProp,
    defaultValue = 0,
    onChange,
    max = 5,
    precision: precisionProp = 1,
    readOnly,
    disabled,
    left,
    showValue,
    label,
    errorMessage,
    id,
    ...props
  }, ref) => {
    const n = Number(precisionProp);
    const precision = n === 0.25 ? 0.25 : n === 0.5 ? 0.5 : 1;
    const isControlled = valueProp !== void 0;
    const [internal, setInternal] = React9__namespace.useState(() => roundToStep(defaultValue, precision));
    const value = roundToStep(isControlled ? valueProp : internal, precision);
    const setValue = React9__namespace.useCallback(
      (next) => {
        const v = roundToStep(next, precision);
        if (!isControlled) setInternal(v);
        onChange?.(v);
      },
      [isControlled, onChange, precision]
    );
    const starRefs = React9__namespace.useRef([]);
    const onStarPointer = React9__namespace.useCallback(
      (starIndex1Based, clientX) => {
        if (readOnly || disabled) return;
        const el = starRefs.current[starIndex1Based - 1];
        if (!el) return;
        const r = el.getBoundingClientRect();
        setValue(valueFromPointer(starIndex1Based, clientX, r.left, r.width, max, precision));
      },
      [readOnly, disabled, max, precision, setValue]
    );
    const onKeyDown = (e) => {
      if (readOnly || disabled) return;
      const step = precision;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        setValue(Math.min(max, value + step));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        setValue(Math.max(0, value - step));
      } else if (e.key === "Home") {
        e.preventDefault();
        setValue(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setValue(max);
      }
    };
    const rootId = id ?? React9__namespace.useId();
    const interactive = !readOnly && !disabled;
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, className: cn("flex flex-col gap-1", className), ...props, children: [
      label ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "sm", weight: "medium", className: "text-foreground", children: label }) : null,
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        left ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "inline-flex shrink-0 items-center", children: left }) : null,
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            id: rootId,
            role: "slider",
            "aria-valuemin": 0,
            "aria-valuemax": max,
            "aria-valuenow": value,
            "aria-disabled": disabled || readOnly,
            "aria-readonly": readOnly,
            "aria-valuetext": `${value} of ${max}`,
            tabIndex: interactive ? 0 : void 0,
            onKeyDown,
            className: cn(ratingVariants({ size }), interactive && "cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"),
            children: Array.from({ length: max }, (_, i) => {
              const k = i + 1;
              const fill = fillForStar(k, value);
              return /* @__PURE__ */ jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  ref: (el) => {
                    starRefs.current[i] = el;
                  },
                  disabled,
                  tabIndex: -1,
                  className: cn(
                    "rating-star-slot relative inline-block shrink-0 border-0 bg-transparent p-0 align-middle",
                    interactive && "cursor-pointer",
                    (readOnly || disabled) && "cursor-default"
                  ),
                  onClick: (e) => onStarPointer(k, e.clientX),
                  "aria-hidden": true,
                  children: /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "relative inline-block h-full w-full", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      lucideReact.Star,
                      {
                        className: "pointer-events-none absolute inset-0 text-muted-foreground",
                        strokeWidth: 1.5,
                        "aria-hidden": true
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      "span",
                      {
                        className: "absolute inset-y-0 left-0 overflow-hidden",
                        style: { width: `${fill * 100}%` },
                        "aria-hidden": true,
                        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Star, { className: "pointer-events-none h-full min-w-full fill-primary text-primary", strokeWidth: 1.5 })
                      }
                    )
                  ] })
                },
                k
              );
            })
          }
        ),
        showValue ? /* @__PURE__ */ jsxRuntime.jsxs(Text, { as: "span", size: "sm", variant: "muted", className: "tabular-nums", children: [
          value,
          "/",
          max
        ] }) : null
      ] }),
      errorMessage ? /* @__PURE__ */ jsxRuntime.jsx(ControlErrorMessage, { message: errorMessage }) : null
    ] });
  }
);
Rating.displayName = "Rating";
var InputOTP = React9__namespace.forwardRef(
  ({
    id,
    label,
    errorMessage,
    length = 6,
    mask,
    size = "md",
    variant = "outline",
    className,
    validate,
    onValidate,
    value: valueProp,
    defaultValue = "",
    onChange,
    onComplete,
    disabled,
    autoFocus,
    onBlur,
    ...props
  }, ref) => {
    const isControlled = valueProp !== void 0;
    const [internal, setInternal] = React9__namespace.useState(defaultValue);
    const value = isControlled ? valueProp : internal;
    const setValue = React9__namespace.useCallback(
      (next) => {
        if (!isControlled) setInternal(next);
        onChange?.(next);
      },
      [isControlled, onChange]
    );
    const { validationOpts, validationError } = useSyncStringFieldValidation(value, {
      validate,
      required: false,
      minLength: typeof validate === "boolean" && validate ? length : void 0,
      maxLength: length,
      errorMessage,
      onValidate
    });
    const showError = errorMessage ?? validationError;
    const invalid = Boolean(showError);
    const rootId = id ?? React9__namespace.useId();
    return /* @__PURE__ */ jsxRuntime.jsx(FieldLayout, { label, htmlFor: rootId, size, errorMessage: showError, children: /* @__PURE__ */ jsxRuntime.jsx(
      inputOtp.OTPInput,
      {
        ref,
        id: rootId,
        "data-slot": "input-otp",
        maxLength: length,
        value,
        onChange: setValue,
        onComplete,
        disabled,
        autoFocus,
        pattern: inputOtp.REGEXP_ONLY_DIGITS,
        inputMode: "numeric",
        autoComplete: "one-time-code",
        containerClassName: cn("flex gap-2", className),
        onBlur: fieldControlBlurHandler(validationOpts, onBlur, onValidate),
        ...props,
        render: ({ slots }) => /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: slots.map((slot, i) => /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: cn(
              "relative flex w-10 items-center justify-center rounded-md border font-mono tabular-nums",
              fieldSurfaceVariants({ control: "input", size, variant, invalid }),
              slot.isActive && "ring-2 ring-ring ring-offset-2 ring-offset-background"
            ),
            children: /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-foreground", children: [
              mask && slot.char ? "\u2022" : slot.char,
              slot.hasFakeCaret ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "h-4 w-px animate-pulse bg-foreground duration-1000" }) }) : null
            ] })
          },
          i
        )) })
      }
    ) });
  }
);
InputOTP.displayName = "InputOTP";
var SearchInput = React9__namespace.forwardRef(
  ({
    className,
    size = "md",
    variant = "outline",
    value: valueProp,
    defaultValue = "",
    onChange,
    onSearch,
    onClear,
    debounceMs = 300,
    clearable = true,
    loading = false,
    disabled,
    placeholder = "Search\u2026",
    name,
    ...props
  }, ref) => {
    const isControlled = valueProp !== void 0;
    const [internal, setInternal] = React9__namespace.useState(String(defaultValue ?? ""));
    const value = isControlled ? String(valueProp ?? "") : internal;
    const setValue = React9__namespace.useCallback(
      (next) => {
        if (!isControlled) setInternal(next);
        onChange?.(next);
      },
      [isControlled, onChange]
    );
    React9__namespace.useEffect(() => {
      if (!onSearch) return;
      if (debounceMs <= 0) {
        onSearch(value);
        return;
      }
      const t = window.setTimeout(() => onSearch(value), debounceMs);
      return () => window.clearTimeout(t);
    }, [value, debounceMs, onSearch]);
    const showClear = clearable && !disabled && value.length > 0;
    const handleClear = () => {
      setValue("");
      onClear?.();
      if (debounceMs <= 0) {
        onSearch?.("");
      }
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      TextInput,
      {
        ref,
        name,
        size,
        variant,
        className,
        placeholder,
        disabled,
        autoComplete: "off",
        "aria-busy": loading || void 0,
        value,
        left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Search, { className: "h-4 w-4", strokeWidth: 2 }),
        right: loading ? /* @__PURE__ */ jsxRuntime.jsx(Spinner, { size: "sm", className: "pointer-events-none" }) : showClear ? /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            tabIndex: -1,
            disabled,
            onClick: handleClear,
            className: cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-md",
              "text-muted-foreground hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            ),
            "aria-label": "Clear search",
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4", strokeWidth: 2 })
          }
        ) : void 0,
        rightInteractive: showClear,
        onChange: (e) => {
          const next = e.target.value;
          if (!isControlled) setInternal(next);
          onChange?.(next);
        },
        ...props
      }
    );
  }
);
SearchInput.displayName = "SearchInput";

// src/components/inputs/phoneCountries.ts
var PHONE_COUNTRIES = [
  { code: "US", label: "United States", dial: "+1" },
  { code: "CA", label: "Canada", dial: "+1" },
  { code: "GB", label: "United Kingdom", dial: "+44" },
  { code: "IN", label: "India", dial: "+91" },
  { code: "AU", label: "Australia", dial: "+61" },
  { code: "DE", label: "Germany", dial: "+49" },
  { code: "FR", label: "France", dial: "+33" },
  { code: "JP", label: "Japan", dial: "+81" },
  { code: "BR", label: "Brazil", dial: "+55" },
  { code: "MX", label: "Mexico", dial: "+52" }
];
function findCountry(code) {
  return PHONE_COUNTRIES.find((c) => c.code === code) ?? PHONE_COUNTRIES[0];
}
function getPhoneDialCode(countryCode, allowed = PHONE_COUNTRIES) {
  const country = allowed.find((c) => c.code === countryCode) ?? findCountry(countryCode);
  return country.dial;
}
function toPhoneValue(country, number) {
  return {
    countryCode: country.code,
    number: number.replace(/\D/g, "")
  };
}
function normalizePhoneValue(input, allowed = PHONE_COUNTRIES) {
  if (!input) return toPhoneValue(allowed[0], "");
  if (typeof input === "string") {
    const parsed = splitPhoneValue(input, allowed);
    return toPhoneValue(parsed.country, parsed.number);
  }
  const legacy = input;
  const country = allowed.find((c) => c.code === legacy.countryCode) ?? findCountry(legacy.countryCode);
  return {
    countryCode: country.code,
    number: legacy.number.replace(/\D/g, "")
  };
}
function splitPhoneValue(value, allowed = PHONE_COUNTRIES, preferredCountryCode) {
  const trimmed = value.trim();
  if (!trimmed) {
    const preferred = void 0;
    return { country: preferred ?? allowed[0], number: "" };
  }
  const match = [...allowed].sort((a, b) => b.dial.length - a.dial.length).find((c) => trimmed.startsWith(c.dial));
  if (!match) {
    const preferred = void 0;
    return { country: preferred ?? allowed[0], number: trimmed.replace(/\D/g, "") };
  }
  if (match.dial === "+1" && preferredCountryCode) ;
  return { country: match, number: trimmed.slice(match.dial.length).replace(/\D/g, "") };
}
function PhoneInput({
  value,
  defaultValue,
  onChange,
  defaultCountry = "US",
  allowedCountries,
  placeholder = "Phone number",
  disabled,
  required,
  label,
  errorMessage,
  validate,
  onValidate,
  size = "md",
  variant = "outline",
  inputProps,
  dropdownProps,
  className,
  ...rest
}) {
  const allowed = React9__namespace.useMemo(() => {
    if (!allowedCountries?.length) return PHONE_COUNTRIES;
    return PHONE_COUNTRIES.filter((c) => allowedCountries.includes(c.code));
  }, [allowedCountries]);
  const initial = normalizePhoneValue(
    defaultValue ?? toPhoneValue(findCountry(defaultCountry), ""),
    allowed
  );
  const [internal, setInternal] = React9__namespace.useState(initial);
  const isControlled = value !== void 0;
  const resolved = normalizePhoneValue(isControlled ? value : internal, allowed);
  const country = React9__namespace.useMemo(
    () => allowed.find((c) => c.code === resolved.countryCode) ?? findCountry(resolved.countryCode),
    [allowed, resolved.countryCode]
  );
  const emit2 = (nextCountry, nextNumber) => {
    const next = toPhoneValue(nextCountry, nextNumber);
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };
  const validateString = validate === void 0 ? void 0 : typeof validate === "function" ? (raw) => validate(normalizePhoneValue({ ...resolved, number: raw }, allowed)) : validate;
  const countryItems = allowed.map((c) => ({
    label: `${c.label} (${c.dial})`,
    value: c.code,
    onClick: () => emit2(c, resolved.number)
  }));
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("w-full", disabled && "pointer-events-none opacity-50", className), ...rest, children: /* @__PURE__ */ jsxRuntime.jsx(FieldLayout, { label, required, errorMessage, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex w-full items-stretch overflow-hidden rounded-md border border-border bg-background shadow-sm focus-within:ring-2 focus-within:ring-ring", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      Dropdown,
      {
        items: countryItems,
        triggerProps: {
          label: `${country.code} \xB7 ${country.dial}`,
          variant: "ghost",
          size,
          className: "shrink-0 rounded-none border-0 border-r border-border"
        },
        ...dropdownProps
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-w-0 flex-1", children: /* @__PURE__ */ jsxRuntime.jsx(
      TextInput,
      {
        required,
        size,
        variant: "ghost",
        disabled,
        placeholder,
        value: resolved.number,
        validate: validateString,
        onValidate,
        inputMode: "tel",
        autoComplete: "tel-national",
        className: "border-0 shadow-none focus-visible:ring-0",
        onChange: (e) => {
          const next = e.target.value.replace(/[^\d\s()-]/g, "");
          emit2(country, next);
        },
        ...inputProps
      }
    ) })
  ] }) }) });
}
PhoneInput.displayName = "PhoneInput";
function defaultFilter(item, query) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const label = typeof item.label === "string" ? item.label : "";
  const haystack = [label, item.value, ...item.keywords ?? []].join(" ").toLowerCase();
  return haystack.includes(q);
}
function Command({
  items = [],
  value,
  defaultValue,
  onValueChange,
  inputValue,
  defaultInputValue = "",
  onInputValueChange,
  onSelect,
  placeholder = "Search\u2026",
  emptyState = "No results.",
  loading = false,
  disabled,
  loop = true,
  debounceMs = 0,
  filterFn = defaultFilter,
  maxHeight = "16rem",
  searchInputProps,
  className,
  children,
  ...rest
}) {
  const [internalValue, setInternalValue] = React9__namespace.useState(defaultValue ?? "");
  const [internalQuery, setInternalQuery] = React9__namespace.useState(defaultInputValue);
  const [open, setOpen] = React9__namespace.useState(false);
  const [activeIndex, setActiveIndex] = React9__namespace.useState(0);
  const triggerRef = React9__namespace.useRef(null);
  const menuRef = React9__namespace.useRef(null);
  const [menuStyle, setMenuStyle] = React9__namespace.useState({ visibility: "hidden" });
  const isValueControlled = value !== void 0;
  const isQueryControlled = inputValue !== void 0;
  const selectedValue = isValueControlled ? value ?? "" : internalValue;
  const query = isQueryControlled ? inputValue ?? "" : internalQuery;
  const filtered = React9__namespace.useMemo(
    () => items.filter((item) => !item.disabled && filterFn(item, query)),
    [items, query, filterFn]
  );
  const grouped = React9__namespace.useMemo(() => {
    const out = [];
    for (const item of filtered) {
      const g = item.group;
      const last = out[out.length - 1];
      if (last && last.group === g) last.items.push(item);
      else out.push({ group: g, items: [item] });
    }
    return out;
  }, [filtered]);
  const flatItems = filtered;
  const setQuery = (next) => {
    if (!isQueryControlled) setInternalQuery(next);
    onInputValueChange?.(next);
    setOpen(true);
    setActiveIndex(0);
  };
  const selectItem = (item) => {
    if (!isValueControlled) setInternalValue(item.value);
    onValueChange?.(item.value);
    onSelect?.(item);
    setQuery(typeof item.label === "string" ? item.label : item.value);
    setOpen(false);
  };
  const updatePosition = React9__namespace.useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMenuStyle({
      position: "fixed",
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
      zIndex: zLayerValue("dropdown"),
      visibility: "visible"
    });
  }, []);
  React9__namespace.useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    const ro = () => updatePosition();
    window.addEventListener("scroll", ro, true);
    window.addEventListener("resize", ro);
    return () => {
      window.removeEventListener("scroll", ro, true);
      window.removeEventListener("resize", ro);
    };
  }, [open, updatePosition]);
  React9__namespace.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      const t = e.target;
      if (triggerRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [open]);
  const onInputKeyDown = (e) => {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (!flatItems.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => {
        const next = i + 1;
        if (next >= flatItems.length) return loop ? 0 : i;
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => {
        const next = i - 1;
        if (next < 0) return loop ? flatItems.length - 1 : 0;
        return next;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flatItems[activeIndex];
      if (item) selectItem(item);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };
  const menu = open && items.length ? /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref: menuRef,
      role: "listbox",
      style: { ...menuStyle, maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight },
      className: "overflow-y-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
      children: loading ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntime.jsx(Spinner, { size: "sm" }) }) : flatItems.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "px-3 py-2 text-sm text-muted-foreground", children: emptyState }) : grouped.map((section, sectionIndex) => /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        section.group ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "px-2 py-1.5 text-xs font-medium text-muted-foreground", children: section.group }) : null,
        section.items.map((item) => {
          const flatIndex = flatItems.indexOf(item);
          const active = item.value === selectedValue || flatIndex === activeIndex;
          return /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              role: "option",
              "aria-selected": active,
              disabled: item.disabled,
              className: cn(
                "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm",
                "hover:bg-accent hover:text-accent-foreground",
                active && "bg-accent text-accent-foreground",
                item.disabled && "pointer-events-none opacity-50"
              ),
              onMouseEnter: () => setActiveIndex(flatIndex),
              onClick: () => selectItem(item),
              children: [
                item.left ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: item.left, size: "sm" }) }) : null,
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1", children: item.label })
              ]
            },
            item.value
          );
        })
      ] }, section.group ?? `section-${sectionIndex}`))
    }
  ) : null;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("relative w-full", className), ...rest, children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { ref: triggerRef, children: /* @__PURE__ */ jsxRuntime.jsx(
      SearchInput,
      {
        placeholder,
        disabled,
        loading,
        debounceMs,
        value: query,
        onChange: setQuery,
        onFocus: () => setOpen(true),
        onKeyDown: onInputKeyDown,
        ...searchInputProps
      }
    ) }),
    children,
    typeof document !== "undefined" && menu ? reactDom.createPortal(menu, document.body) : null
  ] });
}
Command.displayName = "Command";

// src/components/inputs/dateUtils.ts
function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}
function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}
function addDays(date, amount) {
  const d = new Date(date);
  d.setDate(d.getDate() + amount);
  return d;
}
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isBeforeDay(a, b) {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}
function isAfterDay(a, b) {
  return startOfDay(a).getTime() > startOfDay(b).getTime();
}
function isBetweenDays(date, from, to) {
  const t = startOfDay(date).getTime();
  return t >= startOfDay(from).getTime() && t <= startOfDay(to).getTime();
}
function rangeLengthDays(from, to) {
  const start = isBeforeDay(from, to) ? startOfDay(from) : startOfDay(to);
  const end = isBeforeDay(from, to) ? startOfDay(to) : startOfDay(from);
  const msPerDay = 24 * 60 * 60 * 1e3;
  return Math.round((end.getTime() - start.getTime()) / msPerDay) + 1;
}
function isRangeWithinLimits(range2, limits) {
  if (!range2.from || !range2.to) return false;
  const from = startOfDay(range2.from);
  const to = startOfDay(range2.to);
  if (limits?.minDate && isBeforeDay(from, limits.minDate)) return false;
  if (limits?.maxDate && isAfterDay(to, limits.maxDate)) return false;
  if (limits?.minDate && isBeforeDay(to, limits.minDate)) return false;
  if (limits?.maxDate && isAfterDay(from, limits.maxDate)) return false;
  const len = rangeLengthDays(from, to);
  if (limits?.minRangeDays != null && len < limits.minRangeDays) return false;
  if (limits?.maxRangeDays != null && len > limits.maxRangeDays) return false;
  return true;
}
function formatDate(date, format = "PP") {
  if (format === "PP") {
    return date.toLocaleDateString(void 0, { year: "numeric", month: "short", day: "numeric" });
  }
  if (format === "P") {
    return date.toLocaleDateString();
  }
  return date.toLocaleDateString();
}
function formatDateRange(range2, format = "PP") {
  if (!range2.from && !range2.to) return "";
  if (range2.from && !range2.to) return formatDate(range2.from, format);
  if (range2.from && range2.to) return `${formatDate(range2.from, format)} \u2013 ${formatDate(range2.to, format)}`;
  return "";
}
function parseDateInput(value) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? null : startOfDay(parsed);
}
function formatTime(date, format = "24h") {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  if (format === "24h") {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }
  const period = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 || 12;
  return `${h12}:${String(minutes).padStart(2, "0")} ${period}`;
}
function parseTimeInput(value, format = "24h") {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const match24 = trimmed.match(/^(\d{1,2}):(\d{2})$/);
  if (match24 && format === "24h") {
    const h = Number(match24[1]);
    const m = Number(match24[2]);
    if (h >= 0 && h < 24 && m >= 0 && m < 60) {
      const d = /* @__PURE__ */ new Date();
      d.setHours(h, m, 0, 0);
      return d;
    }
  }
  const match12 = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (match12) {
    let h = Number(match12[1]) % 12;
    const m = Number(match12[2]);
    if (match12[3].toUpperCase() === "PM") h += 12;
    const d = /* @__PURE__ */ new Date();
    d.setHours(h, m, 0, 0);
    return d;
  }
  return null;
}
function getCalendarDays(month, weekStartsOn = 0) {
  const start = startOfMonth(month);
  const end = endOfMonth(month);
  const days = [];
  const startOffset = (start.getDay() - weekStartsOn + 7) % 7;
  const gridStart = addDays(start, -startOffset);
  const endOffset = (weekStartsOn + 6 - end.getDay() + 7) % 7;
  const gridEnd = addDays(end, endOffset);
  let cursor = gridStart;
  while (cursor.getTime() <= gridEnd.getTime()) {
    days.push(new Date(cursor));
    cursor = addDays(cursor, 1);
  }
  return days;
}
var WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
function isDateDisabled(date, opts) {
  if (opts.disabled) return true;
  if (opts.minDate && isBeforeDay(date, opts.minDate)) return true;
  if (opts.maxDate && isAfterDay(date, opts.maxDate)) return true;
  if (Array.isArray(opts.disabledDates)) {
    return opts.disabledDates.some((d) => isSameDay(d, date));
  }
  if (typeof opts.disabledDates === "function") return opts.disabledDates(date);
  if (opts.selectionMode === "range" && opts.rangeAnchor && (opts.minRangeDays != null || opts.maxRangeDays != null)) {
    const len = rangeLengthDays(opts.rangeAnchor, date);
    if (opts.minRangeDays != null && len < opts.minRangeDays) return true;
    if (opts.maxRangeDays != null && len > opts.maxRangeDays) return true;
  }
  return false;
}
function normalizeRange(value) {
  if (!value || value instanceof Date) return { from: value instanceof Date ? value : null, to: null };
  if (Array.isArray(value)) return { from: value[0] ?? null, to: value[1] ?? null };
  return { from: value.from ?? null, to: value.to ?? null };
}
function Calendar({
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  minRangeDays,
  maxRangeDays,
  disabled,
  selectionMode = "single",
  showOutsideDays = true,
  weekStartsOn = 0,
  disabledDates,
  highlightedDates = [],
  locale,
  className,
  ...rest
}) {
  const initial = value ?? defaultValue ?? null;
  const [month, setMonth] = React9__namespace.useState(() => startOfMonth(initial instanceof Date ? initial : /* @__PURE__ */ new Date()));
  const [internal, setInternal] = React9__namespace.useState(initial);
  const [rangeDraft, setRangeDraft] = React9__namespace.useState(null);
  const isControlled = value !== void 0;
  const selected = isControlled ? value ?? null : internal;
  const setSelected = (next) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };
  const monthLabel = month.toLocaleDateString(locale, { month: "long", year: "numeric" });
  const days = getCalendarDays(month, weekStartsOn);
  const weekdays = [...WEEKDAY_LABELS.slice(weekStartsOn), ...WEEKDAY_LABELS.slice(0, weekStartsOn)];
  const range2 = normalizeRange(selected);
  const rangeAnchor = selectionMode === "range" && range2.from && !range2.to ? startOfDay(range2.from) : rangeDraft;
  const disableOpts = {
    disabled,
    minDate,
    maxDate,
    disabledDates,
    selectionMode,
    rangeAnchor,
    minRangeDays,
    maxRangeDays
  };
  const handleSelect = (date) => {
    if (isDateDisabled(date, disableOpts)) return;
    const day = startOfDay(date);
    if (selectionMode === "single") {
      setSelected(day);
      return;
    }
    if (selectionMode === "multiple") {
      const current = Array.isArray(selected) ? selected : [];
      const exists = current.some((d) => isSameDay(d, day));
      const next = exists ? current.filter((d) => !isSameDay(d, day)) : [...current, day];
      setSelected(next);
      return;
    }
    const range3 = normalizeRange(selected);
    if (!rangeDraft || range3.from && range3.to) {
      setRangeDraft(day);
      setSelected({ from: day, to: null });
      return;
    }
    const from = isBeforeDay(rangeDraft, day) ? rangeDraft : day;
    const to = isBeforeDay(rangeDraft, day) ? day : rangeDraft;
    if (minRangeDays != null && rangeLengthDays(from, to) < minRangeDays) return;
    if (maxRangeDays != null && rangeLengthDays(from, to) > maxRangeDays) return;
    setRangeDraft(null);
    setSelected({ from, to });
  };
  const isSelectedDay = (date) => {
    if (!selected) return false;
    if (selectionMode === "single" && selected instanceof Date) return isSameDay(selected, date);
    if (selectionMode === "multiple" && Array.isArray(selected)) return selected.some((d) => isSameDay(d, date));
    const range3 = normalizeRange(selected);
    if (range3.from && !range3.to) return isSameDay(range3.from, date);
    if (range3.from && range3.to) return isBetweenDays(date, range3.from, range3.to);
    return false;
  };
  const isRangeEdge = (date) => {
    if (selectionMode !== "range") return false;
    const range3 = normalizeRange(selected);
    if (range3.from && isSameDay(range3.from, date)) return "start";
    if (range3.to && isSameDay(range3.to, date)) return "end";
    return false;
  };
  const isRangeMiddle = (date) => {
    if (selectionMode !== "range") return false;
    const range3 = normalizeRange(selected);
    if (!range3.from || !range3.to) return false;
    return isBetweenDays(date, range3.from, range3.to) && !isSameDay(date, range3.from) && !isSameDay(date, range3.to);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("w-[280px] select-none p-3", className), ...rest, children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mb-3 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          iconOnly: true,
          "aria-label": "Previous month",
          disabled,
          left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { className: "h-4 w-4" }),
          onClick: () => setMonth((m) => addMonths(m, -1))
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "sm", weight: "semibold", children: monthLabel }),
      /* @__PURE__ */ jsxRuntime.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          iconOnly: true,
          "aria-label": "Next month",
          disabled,
          left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: "h-4 w-4" }),
          onClick: () => setMonth((m) => addMonths(m, 1))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mb-1 grid grid-cols-7 gap-1", children: weekdays.map((label) => /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "xs", variant: "muted", className: "text-center", children: label }, label)) }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-7 gap-1", children: days.map((date) => {
      const inMonth = date.getMonth() === month.getMonth();
      if (!showOutsideDays && !inMonth) {
        return /* @__PURE__ */ jsxRuntime.jsx("div", { "aria-hidden": true }, date.toISOString());
      }
      const dayDisabled = isDateDisabled(date, disableOpts);
      const rangeEdge = isRangeEdge(date);
      const rangeMiddle = isRangeMiddle(date);
      const highlighted = highlightedDates.some((d) => isSameDay(d, date));
      const activeRange = normalizeRange(selected);
      const pendingStart = selectionMode === "range" && activeRange.from && !activeRange.to && isSameDay(activeRange.from, date);
      const isEndpoint = rangeEdge === "start" || rangeEdge === "end" || pendingStart || selectionMode === "single" && isSelectedDay(date) || selectionMode === "multiple" && isSelectedDay(date);
      return /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          disabled: dayDisabled,
          onClick: () => handleSelect(date),
          className: cn(
            "h-9 w-9 border-0 bg-transparent text-sm transition-colors",
            !inMonth && "text-muted-foreground/50",
            dayDisabled && "pointer-events-none opacity-40",
            highlighted && !isEndpoint && !rangeMiddle && "font-semibold text-primary",
            rangeMiddle && cn("rounded-none bg-primary/15 text-foreground", floatingMenuHoverClass),
            isEndpoint && cn(
              "rounded-md bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:bg-primary/90",
              rangeEdge === "start" && activeRange.to && "rounded-r-none",
              rangeEdge === "end" && "rounded-l-none"
            ),
            inMonth && !dayDisabled && !isEndpoint && !rangeMiddle && cn("rounded-md", floatingMenuHoverClass)
          ),
          children: date.getDate()
        },
        date.toISOString()
      );
    }) })
  ] });
}
Calendar.displayName = "Calendar";
function DatePicker({
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  disabled,
  required,
  placeholder = "Pick a date",
  label,
  errorMessage,
  format = "PP",
  locale,
  closeOnSelect = true,
  clearable = true,
  size = "md",
  variant = "outline",
  inputProps,
  calendarProps,
  className,
  ...rest
}) {
  const [internal, setInternal] = React9__namespace.useState(defaultValue ?? null);
  const [open, setOpen] = React9__namespace.useState(false);
  const [inputText, setInputText] = React9__namespace.useState("");
  const triggerRef = React9__namespace.useRef(null);
  const menuRef = React9__namespace.useRef(null);
  const isControlled = value !== void 0;
  const selected = isControlled ? value ?? null : internal;
  const { menuStyle } = useFloatingMenu({
    open,
    onOpenChange: setOpen,
    triggerRef,
    menuRef,
    maxHeight: 360
  });
  const setSelected = (next) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
    setInputText(next ? formatDate(next, format) : "");
  };
  React9__namespace.useEffect(() => {
    setInputText(selected ? formatDate(selected, format) : "");
  }, [selected, format]);
  const menu = open ? /* @__PURE__ */ jsxRuntime.jsx("div", { ref: menuRef, style: menuStyle, className: floatingMenuSurfaceClass, children: /* @__PURE__ */ jsxRuntime.jsx(
    Calendar,
    {
      value: selected,
      onChange: (next) => {
        const date = next instanceof Date ? startOfDay(next) : null;
        setSelected(date);
        if (closeOnSelect) setOpen(false);
      },
      minDate,
      maxDate,
      disabled,
      locale,
      selectionMode: "single",
      ...calendarProps
    }
  ) }) : null;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("relative w-full", className), ...rest, children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { ref: triggerRef, children: /* @__PURE__ */ jsxRuntime.jsx(
      TextInput,
      {
        label,
        required,
        errorMessage,
        size,
        variant,
        disabled,
        placeholder,
        value: inputText,
        left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Calendar, { className: "h-4 w-4", strokeWidth: 2 }),
        right: clearable && selected && !disabled ? /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            tabIndex: -1,
            className: "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground",
            "aria-label": "Clear date",
            onClick: () => setSelected(null),
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" })
          }
        ) : void 0,
        rightInteractive: clearable && Boolean(selected),
        onFocus: () => !disabled && setOpen(true),
        onChange: (e) => {
          const nextText = e.target.value;
          setInputText(nextText);
          const parsed = parseDateInput(nextText);
          if (parsed) setSelected(parsed);
          if (!nextText) setSelected(null);
        },
        ...inputProps
      }
    ) }),
    typeof document !== "undefined" && menu ? reactDom.createPortal(menu, document.body) : null
  ] });
}
DatePicker.displayName = "DatePicker";
function buildTimeOptions(format, step) {
  const options = [];
  for (let total = 0; total < 24 * 60; total += step) {
    const h = Math.floor(total / 60);
    const m = total % 60;
    const d = /* @__PURE__ */ new Date();
    d.setHours(h, m, 0, 0);
    options.push(formatTime(d, format));
  }
  return options;
}
function TimePicker({
  value,
  defaultValue,
  onChange,
  disabled,
  required,
  placeholder = "Pick a time",
  label,
  errorMessage,
  format = "24h",
  step = 30,
  closeOnSelect = true,
  clearable = true,
  size = "md",
  variant = "outline",
  inputProps,
  className,
  ...rest
}) {
  const [internal, setInternal] = React9__namespace.useState(defaultValue ?? null);
  const [open, setOpen] = React9__namespace.useState(false);
  const [inputText, setInputText] = React9__namespace.useState("");
  const triggerRef = React9__namespace.useRef(null);
  const menuRef = React9__namespace.useRef(null);
  const isControlled = value !== void 0;
  const selected = isControlled ? value ?? null : internal;
  const options = React9__namespace.useMemo(() => buildTimeOptions(format, step), [format, step]);
  const { menuStyle } = useFloatingMenu({
    open,
    onOpenChange: setOpen,
    triggerRef,
    menuRef,
    maxHeight: 224
  });
  const setSelected = (next) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
    setInputText(next ? formatTime(next, format) : "");
    if (closeOnSelect) setOpen(false);
  };
  React9__namespace.useEffect(() => {
    setInputText(selected ? formatTime(selected, format) : "");
  }, [selected, format]);
  const menu = open ? /* @__PURE__ */ jsxRuntime.jsx("div", { ref: menuRef, role: "listbox", style: menuStyle, className: floatingMenuListClass, children: options.map((option) => /* @__PURE__ */ jsxRuntime.jsx(
    FloatingMenuItem,
    {
      role: "option",
      selected: inputText === option,
      onClick: () => setSelected(parseTimeInput(option, format)),
      children: option
    },
    option
  )) }) : null;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("relative w-full", className), ...rest, children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { ref: triggerRef, children: /* @__PURE__ */ jsxRuntime.jsx(
      TextInput,
      {
        label,
        required,
        errorMessage,
        size,
        variant,
        disabled,
        placeholder,
        value: inputText,
        left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Clock, { className: "h-4 w-4", strokeWidth: 2 }),
        right: clearable && selected && !disabled ? /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            tabIndex: -1,
            className: "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground",
            "aria-label": "Clear time",
            onClick: () => setSelected(null),
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" })
          }
        ) : void 0,
        rightInteractive: clearable && Boolean(selected),
        onFocus: () => !disabled && setOpen(true),
        onChange: (e) => {
          const nextText = e.target.value;
          setInputText(nextText);
          const parsed = parseTimeInput(nextText, format);
          if (parsed) setSelected(parsed);
          if (!nextText) setSelected(null);
        },
        ...inputProps
      }
    ) }),
    typeof document !== "undefined" && menu ? reactDom.createPortal(menu, document.body) : null
  ] });
}
TimePicker.displayName = "TimePicker";
var EMPTY_RANGE = { from: null, to: null };
function normalizeRangeInput(next) {
  if (!next) return null;
  return {
    from: next.from ? startOfDay(next.from) : null,
    to: next.to ? startOfDay(next.to) : null
  };
}
function DateRangePicker({
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  minRangeDays,
  maxRangeDays,
  disabled,
  required,
  placeholder = "Pick a date range",
  label,
  errorMessage,
  format = "PP",
  locale,
  showApplyButton = false,
  applyLabel = "Apply",
  cancelLabel = "Cancel",
  clearable = true,
  presets = [],
  size = "md",
  variant = "outline",
  inputProps,
  calendarProps,
  className,
  ...rest
}) {
  const [internal, setInternal] = React9__namespace.useState(
    normalizeRangeInput(defaultValue ?? null)
  );
  const [open, setOpen] = React9__namespace.useState(false);
  const [draft, setDraft] = React9__namespace.useState(EMPTY_RANGE);
  const triggerRef = React9__namespace.useRef(null);
  const menuRef = React9__namespace.useRef(null);
  const isControlled = value !== void 0;
  const selected = isControlled ? normalizeRangeInput(value ?? null) : internal;
  const limits = React9__namespace.useMemo(
    () => ({ minDate, maxDate, minRangeDays, maxRangeDays }),
    [minDate, maxDate, minRangeDays, maxRangeDays]
  );
  const { menuStyle } = useFloatingMenu({
    open,
    onOpenChange: setOpen,
    triggerRef,
    menuRef,
    maxHeight: 420
  });
  React9__namespace.useEffect(() => {
    if (!open) return;
    setDraft(selected ?? EMPTY_RANGE);
  }, [open, selected]);
  const commitRange = (next) => {
    const normalized = normalizeRangeInput(next);
    if (!isControlled) setInternal(normalized);
    onChange?.(normalized);
  };
  const setSelected = (next) => {
    const normalized = normalizeRangeInput(next);
    if (showApplyButton) {
      setDraft(normalized ?? EMPTY_RANGE);
      return;
    }
    commitRange(normalized);
    if (!showApplyButton && normalized?.from && normalized?.to && isRangeWithinLimits(normalized, limits)) {
      setOpen(false);
    }
  };
  const applyDraft = () => {
    if (!draft?.from || !draft?.to || !isRangeWithinLimits(draft, limits)) return;
    commitRange(draft);
    setOpen(false);
  };
  const cancelDraft = () => {
    setDraft(selected ?? EMPTY_RANGE);
    setOpen(false);
  };
  const calendarValue = showApplyButton && open ? draft : selected ?? EMPTY_RANGE;
  const canApply = Boolean(draft?.from && draft?.to && isRangeWithinLimits(draft, limits));
  const display = selected ? formatDateRange(selected, format) : "";
  const menu = open ? /* @__PURE__ */ jsxRuntime.jsxs("div", { ref: menuRef, style: menuStyle, className: floatingMenuSurfaceClass, children: [
    presets.length ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-wrap gap-1 border-b border-border p-2", children: presets.map((preset, index) => {
      const next = normalizeRangeInput(preset.value);
      const valid = next && isRangeWithinLimits(next, limits);
      return /* @__PURE__ */ jsxRuntime.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          disabled: !valid,
          onClick: () => {
            if (!next || !valid) return;
            if (showApplyButton) setDraft(next);
            else setSelected(next);
          },
          children: preset.label
        },
        index
      );
    }) }) : null,
    /* @__PURE__ */ jsxRuntime.jsx(
      Calendar,
      {
        value: calendarValue,
        onChange: (next) => {
          if (next && typeof next === "object" && !Array.isArray(next) && !(next instanceof Date)) {
            setSelected({
              from: next.from ? startOfDay(next.from) : null,
              to: next.to ? startOfDay(next.to) : null
            });
          }
        },
        minDate,
        maxDate,
        minRangeDays,
        maxRangeDays,
        disabled,
        locale,
        selectionMode: "range",
        ...calendarProps
      }
    ),
    showApplyButton ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-end gap-2 border-t border-border p-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "ghost", size: "sm", onClick: cancelDraft, children: cancelLabel }),
      /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "primary", size: "sm", disabled: !canApply, onClick: applyDraft, children: applyLabel })
    ] }) : null
  ] }) : null;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("relative w-full", className), ...rest, children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { ref: triggerRef, children: /* @__PURE__ */ jsxRuntime.jsx(
      TextInput,
      {
        label,
        required,
        errorMessage,
        size,
        variant,
        disabled,
        placeholder,
        readOnly: true,
        value: display,
        left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Calendar, { className: "h-4 w-4", strokeWidth: 2 }),
        right: clearable && selected?.from && !disabled ? /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            tabIndex: -1,
            className: "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground",
            "aria-label": "Clear range",
            onClick: () => {
              if (showApplyButton) setDraft(EMPTY_RANGE);
              commitRange(null);
            },
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" })
          }
        ) : void 0,
        rightInteractive: clearable && Boolean(selected?.from),
        onFocus: () => !disabled && setOpen(true),
        onClick: () => !disabled && setOpen(true),
        ...inputProps
      }
    ) }),
    typeof document !== "undefined" && menu ? reactDom.createPortal(menu, document.body) : null
  ] });
}
DateRangePicker.displayName = "DateRangePicker";
var skeletonVariants = classVarianceAuthority.cva("animate-pulse bg-skeleton", {
  variants: {
    variant: {
      text: "h-4 w-12 rounded",
      avatar: "h-10 w-10 rounded-full",
      button: "h-9 w-24 rounded-md",
      badge: "h-5 w-5 rounded-full",
      card: "h-32 w-32 rounded-lg",
      input: "h-9 w-24 rounded-md",
      checkbox: "h-4 w-4 rounded-sm",
      tableCell: "h-4 w-full rounded",
      tableRow: "h-10 w-full rounded-md",
      radio: "h-5 w-5 rounded-full"
    }
  },
  defaultVariants: {
    variant: "text"
  }
});
function withUnit(value) {
  if (value == null) return void 0;
  return typeof value === "number" ? `${value}px` : value;
}
var Skeleton = React9__namespace.forwardRef(
  ({ variant, width, height, count = 1, className, children, ...props }, ref) => {
    const items = Array.from({ length: Math.max(1, count) });
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("flex flex-col gap-2", count === 1 && "contents"), children: items.map((_, idx) => /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref: idx === 0 ? ref : void 0,
        "data-slot": `skeleton-${idx}`,
        className: cn(skeletonVariants({ variant }), className),
        style: { width: withUnit(width), height: withUnit(height) },
        ...props,
        children
      },
      idx
    )) });
  }
);
Skeleton.displayName = "Skeleton";
var tableSkeletonRowPad = {
  sm: "py-1.5",
  md: "py-2",
  lg: "py-3"
};
var tableSkeletonCellHeight = {
  sm: "h-3.5",
  md: "h-4",
  lg: "h-5"
};
function TableSkeleton({
  columns,
  rows = 5,
  selectable,
  size = "md",
  columnWidths,
  className
}) {
  const rowPad = tableSkeletonRowPad[size];
  const cellHeight = tableSkeletonCellHeight[size];
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("w-full space-y-0", className), "aria-hidden": true, children: Array.from({ length: rows }).map((_, rowIndex) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex items-center gap-3 border-b border-border/80", rowPad), children: [
    selectable ? /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { variant: "checkbox", className: "shrink-0" }) : null,
    Array.from({ length: columns }).map((__, colIndex) => {
      const width = columnWidths?.[colIndex];
      return /* @__PURE__ */ jsxRuntime.jsx(
        Skeleton,
        {
          className: cn(
            "block min-w-0 flex-1 rounded-sm leading-none",
            cellHeight,
            width === void 0 && colIndex > 0 && "max-w-[12rem]"
          ),
          style: width !== void 0 ? { width, maxWidth: width } : void 0
        },
        colIndex
      );
    })
  ] }, rowIndex)) });
}
TableSkeleton.displayName = "TableSkeleton";
var imageVariants = classVarianceAuthority.cva("block bg-muted", {
  variants: {
    variant: {
      default: "",
      rounded: "rounded-md",
      circle: "rounded-full",
      square: "rounded-none"
    },
    fit: {
      cover: "object-cover",
      contain: "object-contain",
      fill: "object-fill",
      none: "object-none",
      "scale-down": "object-scale-down"
    }
  },
  defaultVariants: {
    variant: "default",
    fit: "cover"
  }
});
var Image = React9__namespace.forwardRef(
  ({
    src,
    alt,
    width,
    height,
    fit,
    variant,
    fallback,
    placeholder = "none",
    loadingStrategy,
    position,
    allowFullscreen = false,
    className,
    style,
    ...props
  }, ref) => {
    const [loaded, setLoaded] = React9__namespace.useState(false);
    const [failed, setFailed] = React9__namespace.useState(false);
    const shellRef = React9__namespace.useRef(null);
    const [isFullscreen, setIsFullscreen] = React9__namespace.useState(false);
    React9__namespace.useEffect(() => {
      const onChange = () => {
        setIsFullscreen(document.fullscreenElement === shellRef.current);
      };
      document.addEventListener("fullscreenchange", onChange);
      return () => document.removeEventListener("fullscreenchange", onChange);
    }, []);
    const toggleFullscreen = React9__namespace.useCallback(() => {
      const el = shellRef.current;
      if (!el) return;
      void (async () => {
        try {
          if (document.fullscreenElement === el) {
            await document.exitFullscreen();
          } else {
            await el.requestFullscreen();
          }
        } catch {
        }
      })();
    }, []);
    if (!src || failed) {
      if (fallback) return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: fallback });
      return /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { variant: "card", width, height, className });
    }
    const img = /* @__PURE__ */ jsxRuntime.jsx(
      "img",
      {
        ref,
        src,
        alt: alt ?? "",
        width,
        height,
        className: cn(
          imageVariants({ fit, variant }),
          className,
          placeholder !== "none" && !loaded && "sr-only",
          isFullscreen && "max-h-full max-w-full object-contain"
        ),
        loading: loadingStrategy,
        style: { objectPosition: position, ...style },
        onLoad: () => setLoaded(true),
        onError: () => setFailed(true),
        ...props
      }
    );
    const inner = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      placeholder === "skeleton" && !loaded ? /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { variant: "card", width, height, className }) : null,
      img
    ] });
    if (!allowFullscreen) {
      return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: inner });
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref: shellRef,
        className: cn("group/image relative inline-block max-w-full", isFullscreen && "flex h-full w-full items-center justify-center bg-background"),
        children: [
          inner,
          loaded ? /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              className: cn(
                "absolute bottom-1.5 right-1.5 z-10 rounded-md border border-border bg-background/90 p-1.5 text-foreground shadow-sm backdrop-blur-sm",
                "opacity-0 transition-opacity hover:bg-background group-hover/image:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "motion-reduce:opacity-100"
              ),
              "aria-label": isFullscreen ? "Exit fullscreen" : "Enter fullscreen",
              onClick: (e) => {
                e.stopPropagation();
                toggleFullscreen();
              },
              children: isFullscreen ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Minimize2, { className: "h-4 w-4", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Maximize2, { className: "h-4 w-4", "aria-hidden": true })
            }
          ) : null
        ]
      }
    );
  }
);
Image.displayName = "Image";
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function formatFileType(file) {
  if (file.type) {
    const [category, subtype] = file.type.split("/");
    if (category && subtype) {
      return subtype === "*" ? category : `${subtype.replace(/\+/g, " ")} (${category})`;
    }
    return file.type;
  }
  const ext = file.name.includes(".") ? file.name.split(".").pop() : void 0;
  return ext ? `.${ext.toLowerCase()}` : "Unknown type";
}
function formatAcceptHint(accept) {
  if (!accept?.trim()) return null;
  return accept.split(",").map((part) => part.trim()).filter(Boolean).join(", ");
}
function matchesAccept(file, accept) {
  if (!accept?.trim()) return true;
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  return accept.split(",").some((raw) => {
    const rule = raw.trim().toLowerCase();
    if (!rule) return false;
    if (rule.startsWith(".")) return name.endsWith(rule);
    if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1));
    return type === rule;
  });
}
function Upload({
  onUpload,
  onRemove,
  value,
  defaultValue = [],
  onChange,
  multiple = false,
  maxFiles,
  accept,
  maxSize,
  disabled,
  loading = false,
  dragAndDrop = true,
  preview = true,
  label,
  errorMessage,
  showFileList = true,
  size = "md",
  variant = "outline",
  className,
  children,
  ...rest
}) {
  const inputRef = React9__namespace.useRef(null);
  const [internal, setInternal] = React9__namespace.useState(defaultValue);
  const [dragOver, setDragOver] = React9__namespace.useState(false);
  const [localError, setLocalError] = React9__namespace.useState();
  const isControlled = value !== void 0;
  const files = isControlled ? value : internal;
  const setFiles = (next) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };
  const validateFiles = (incoming) => {
    let accepted = incoming;
    if (accept) {
      const rejected = incoming.filter((file) => !matchesAccept(file, accept));
      if (rejected.length > 0) {
        const hint = formatAcceptHint(accept);
        setLocalError(
          `Unsupported file type. Accepted: ${hint ?? accept}.`
        );
        accepted = incoming.filter((file) => matchesAccept(file, accept));
      } else if (!maxSize || !incoming.find((f) => f.size > maxSize)) {
        setLocalError(void 0);
      }
    }
    if (maxSize) {
      const tooLarge = accepted.find((f) => f.size > maxSize);
      if (tooLarge) {
        setLocalError(`"${tooLarge.name}" exceeds max size (${formatBytes(maxSize)}).`);
        accepted = accepted.filter((f) => f.size <= maxSize);
      } else if (!accept || accepted.every((f) => matchesAccept(f, accept))) {
        setLocalError(void 0);
      }
    }
    if (maxFiles) accepted = accepted.slice(0, maxFiles);
    return accepted;
  };
  const handleIncoming = async (incoming) => {
    if (disabled || loading) return;
    const next = validateFiles(multiple ? [...files, ...incoming] : incoming.slice(0, 1));
    setFiles(next);
    await onUpload(next);
  };
  const onInputChange = (e) => {
    const list = e.target.files ? Array.from(e.target.files) : [];
    void handleIncoming(list);
    e.target.value = "";
  };
  const removeAt = (index) => {
    const file = files[index];
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onRemove?.(file, index);
  };
  const shellClass = cn(
    "relative flex min-h-[8rem] w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-4 text-center transition-colors",
    variant === "filled" && "bg-muted/40",
    variant === "ghost" && "border-transparent bg-muted/20",
    dragOver && "border-primary bg-primary/5",
    disabled && "pointer-events-none opacity-50",
    errorMessage || localError ? "border-destructive/50" : "border-border"
  );
  return /* @__PURE__ */ jsxRuntime.jsx(FieldLayout, { label, errorMessage: errorMessage ?? localError, size, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("w-full", className), ...rest, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        className: shellClass,
        onDragEnter: dragAndDrop ? (e) => {
          e.preventDefault();
          setDragOver(true);
        } : void 0,
        onDragOver: dragAndDrop ? (e) => {
          e.preventDefault();
          setDragOver(true);
        } : void 0,
        onDragLeave: dragAndDrop ? () => setDragOver(false) : void 0,
        onDrop: dragAndDrop ? (e) => {
          e.preventDefault();
          setDragOver(false);
          void handleIncoming(Array.from(e.dataTransfer.files));
        } : void 0,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "input",
            {
              ref: inputRef,
              type: "file",
              className: "sr-only",
              disabled: disabled || loading,
              multiple,
              accept,
              onChange: onInputChange
            }
          ),
          loading ? /* @__PURE__ */ jsxRuntime.jsx(Spinner, { size: "md" }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Upload, { className: "h-8 w-8 text-muted-foreground" }),
          children ?? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "sm", weight: "medium", children: dragAndDrop ? "Drag files here or browse" : "Browse files" }),
            /* @__PURE__ */ jsxRuntime.jsxs(Text, { as: "div", size: "xs", variant: "muted", children: [
              multiple ? "Multiple files allowed" : "Single file",
              accept ? ` \xB7 ${formatAcceptHint(accept)}` : null,
              maxSize ? ` \xB7 Max ${formatBytes(maxSize)}` : null
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(
            Button,
            {
              variant: "outline",
              size: size === "lg" ? "md" : "sm",
              disabled: disabled || loading,
              onClick: () => inputRef.current?.click(),
              children: [
                "Choose file",
                multiple ? "s" : ""
              ]
            }
          )
        ]
      }
    ),
    showFileList && files.length > 0 ? /* @__PURE__ */ jsxRuntime.jsx("ul", { className: "mt-3 space-y-2", children: files.map((file, index) => /* @__PURE__ */ jsxRuntime.jsxs(
      "li",
      {
        className: "flex items-center gap-3 rounded-md border border-border bg-background p-2",
        children: [
          preview && file.type.startsWith("image/") ? /* @__PURE__ */ jsxRuntime.jsx(
            Image,
            {
              src: URL.createObjectURL(file),
              alt: file.name,
              width: 40,
              height: 40,
              className: "h-10 w-10 rounded object-cover"
            }
          ) : null,
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "sm", className: "truncate", children: file.name }),
            /* @__PURE__ */ jsxRuntime.jsxs(Text, { as: "div", size: "xs", variant: "muted", children: [
              formatFileType(file),
              " \xB7 ",
              formatBytes(file.size)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              iconOnly: true,
              "aria-label": `Remove ${file.name}`,
              disabled: disabled || loading,
              left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" }),
              onClick: () => removeAt(index)
            }
          )
        ]
      },
      `${file.name}-${index}`
    )) }) : null
  ] }) });
}
Upload.displayName = "Upload";
var inlineInputClass = cn(
  "m-0 min-w-[4ch] max-w-full rounded-sm border-0 border-b border-transparent bg-transparent p-0 text-sm leading-5 text-foreground shadow-none outline-none",
  "transition-colors placeholder:text-muted-foreground",
  "hover:border-border/60 focus:border-border focus:bg-muted/30",
  focusRing
);
function fieldWidthChars(value, placeholder, min = 4) {
  return Math.min(40, Math.max(min, value.length || placeholder.length || min));
}
function validateDraft(value, validate, required) {
  if (!validate) return true;
  if (typeof validate === "function") return !validate(value);
  if (required && value.trim().length === 0) return false;
  return true;
}
function InlineEdit({
  value,
  defaultValue = "",
  onSave,
  onCancel,
  placeholder = "Click to edit",
  disabled,
  required,
  validate,
  editTrigger = "click",
  saveOnBlur = false,
  saveOnEnter = true,
  className,
  ...rest
}) {
  const [editing, setEditing] = React9__namespace.useState(false);
  const [internal, setInternal] = React9__namespace.useState(defaultValue);
  const [draft, setDraft] = React9__namespace.useState(defaultValue);
  const inputRef = React9__namespace.useRef(null);
  const isControlled = value !== void 0;
  const displayValue = isControlled ? value : internal;
  React9__namespace.useEffect(() => {
    if (!editing) setDraft(displayValue);
  }, [displayValue, editing]);
  const startEdit = () => {
    if (disabled) return;
    setDraft(displayValue);
    setEditing(true);
  };
  const cancel = () => {
    setDraft(displayValue);
    setEditing(false);
    onCancel?.();
  };
  const save = () => {
    if (!validateDraft(draft, validate, required)) return;
    if (!isControlled) setInternal(draft);
    onSave?.(draft);
    setEditing(false);
  };
  if (editing) {
    return /* @__PURE__ */ jsxRuntime.jsxs("span", { className: cn("inline-flex max-w-full items-center gap-0.5", className), ...rest, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        "input",
        {
          ref: inputRef,
          type: "text",
          value: draft,
          required,
          placeholder,
          autoFocus: true,
          className: inlineInputClass,
          style: { width: `${fieldWidthChars(draft, placeholder)}ch` },
          onChange: (e) => setDraft(e.target.value),
          onBlur: saveOnBlur ? save : void 0,
          onKeyDown: (e) => {
            if (saveOnEnter && e.key === "Enter") {
              e.preventDefault();
              save();
            }
            if (e.key === "Escape") {
              e.preventDefault();
              cancel();
            }
          }
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          "aria-label": "Save",
          className: "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-primary hover:bg-muted",
          onClick: save,
          children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { className: "h-3.5 w-3.5" })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          "aria-label": "Cancel",
          className: "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground hover:bg-muted",
          onClick: cancel,
          children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-3.5 w-3.5" })
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsx("span", { className: cn("inline-flex max-w-full items-center", className), ...rest, children: /* @__PURE__ */ jsxRuntime.jsxs(
    "button",
    {
      type: "button",
      disabled,
      className: cn(
        "group inline-flex max-w-full items-center gap-1 rounded-sm px-0.5 py-0 text-left leading-5 transition-colors hover:bg-muted/50",
        disabled && "pointer-events-none opacity-50"
      ),
      onClick: editTrigger === "click" ? startEdit : void 0,
      onDoubleClick: editTrigger === "doubleClick" ? startEdit : void 0,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "span", size: "sm", className: "truncate leading-5", children: displayValue || /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: placeholder }) }),
        !disabled ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Pencil, { className: "h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-70" }) : null
      ]
    }
  ) });
}
InlineEdit.displayName = "InlineEdit";
function optionText(label) {
  if (typeof label === "string" || typeof label === "number") return String(label);
  return "";
}
function hasAdornment(node) {
  if (node == null || node === false) return false;
  if (typeof node === "string") return node.trim().length > 0;
  return true;
}
var Select = React9__namespace.forwardRef(
  ({
    items,
    left,
    placeholder = "Select\u2026",
    label,
    errorMessage,
    required,
    size = "md",
    variant = "outline",
    className,
    contentClassName: _contentClassName,
    value,
    defaultValue,
    onValueChange,
    onChange,
    disabled,
    ...selectProps
  }, ref) => {
    const generatedId = React9__namespace.useId();
    const grouped = React9__namespace.useMemo(() => {
      const out = [];
      for (const it of items) {
        const g = it.group;
        const last = out[out.length - 1];
        if (last && last.group === g) {
          last.items.push(it);
        } else {
          out.push({ group: g, items: [it] });
        }
      }
      return out;
    }, [items]);
    const isControlled = value !== void 0;
    const [uncontrolledValue, setUncontrolledValue] = React9__namespace.useState(() => defaultValue ?? "");
    const currentValue = isControlled ? value ?? "" : uncontrolledValue;
    const selectedOption = React9__namespace.useMemo(
      () => items.find((it) => it.value === currentValue),
      [items, currentValue]
    );
    const effectiveLeft = hasAdornment(selectedOption?.left) ? selectedOption?.left : left;
    const mergedOnChange = (e) => {
      if (!isControlled) setUncontrolledValue(e.target.value);
      onChange?.(e);
      onValueChange?.(e.target.value);
    };
    return /* @__PURE__ */ jsxRuntime.jsx(FieldLayout, { label, htmlFor: generatedId, required, size, errorMessage, children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative w-full", children: [
      hasAdornment(effectiveLeft) ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground", children: React9__namespace.isValidElement(effectiveLeft) ? effectiveLeft : /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: effectiveLeft, size: "sm", variant: "muted" }) }) : null,
      /* @__PURE__ */ jsxRuntime.jsxs(
        "select",
        {
          ref,
          id: generatedId,
          ...selectProps,
          "aria-required": required,
          "aria-invalid": Boolean(errorMessage) || void 0,
          disabled,
          ...isControlled ? { value: value ?? "" } : { defaultValue },
          onChange: mergedOnChange,
          className: cn(
            fieldSurfaceVariants({ control: "input", size, variant, invalid: Boolean(errorMessage) }),
            "w-full cursor-pointer appearance-none pr-9 text-left",
            hasAdornment(effectiveLeft) && "pl-10",
            focusRing,
            focusRingOffset,
            ringOffsetBackground,
            disabledControl,
            className
          ),
          children: [
            placeholder ? /* @__PURE__ */ jsxRuntime.jsx("option", { value: "", disabled: true, hidden: true, children: placeholder }) : null,
            grouped.map(
              (block, blockIndex) => block.group ? /* @__PURE__ */ jsxRuntime.jsx("optgroup", { label: block.group, children: block.items.map((item) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: item.value, disabled: item.disabled, children: optionText(item.label) || item.value }, item.value)) }, `${block.group}-${blockIndex}`) : block.items.map((item) => /* @__PURE__ */ jsxRuntime.jsx("option", { value: item.value, disabled: item.disabled, children: optionText(item.label) || item.value }, item.value))
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        lucideReact.ChevronDown,
        {
          className: "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60",
          "aria-hidden": true
        }
      )
    ] }) });
  }
);
Select.displayName = "Select";
var groupVariants = classVarianceAuthority.cva("space-y-2", {
  variants: {
    orientation: {
      horizontal: "flex flex-row flex-wrap gap-x-4 gap-y-2 space-y-0",
      vertical: ""
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});
var RadioGroup = React9__namespace.forwardRef(
  ({
    items,
    value,
    defaultValue,
    onChange,
    name: nameProp,
    required,
    disabled,
    orientation,
    size,
    errorMessage,
    heading,
    className,
    ...props
  }, ref) => {
    const generatedName = React9__namespace.useId().replace(/:/g, "");
    const name = nameProp ?? `radio-group-${generatedName}`;
    const isControlled = value !== void 0;
    const [internal, setInternal] = React9__namespace.useState(defaultValue ?? "");
    const selected = isControlled ? value ?? "" : internal;
    const setValue = (next) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "fieldset",
      {
        ref,
        className: cn(
          "space-y-2",
          disabled && "cursor-not-allowed opacity-60",
          className
        ),
        disabled,
        ...props,
        children: [
          heading ? /* @__PURE__ */ jsxRuntime.jsxs("legend", { className: cn(textVariants({ size: "sm", weight: "medium" }), "mb-2"), children: [
            heading,
            required ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-destructive", children: " *" }) : null
          ] }) : null,
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn(groupVariants({ orientation })), children: items.map((item) => /* @__PURE__ */ jsxRuntime.jsx(
            Radio,
            {
              name,
              value: item.value,
              checked: selected === item.value,
              onChange: (checked) => {
                if (checked) setValue(item.value);
              },
              label: item.label,
              description: item.description,
              disabled: disabled || item.disabled,
              size,
              required
            },
            item.value
          )) }),
          /* @__PURE__ */ jsxRuntime.jsx(ControlErrorMessage, { message: errorMessage })
        ]
      }
    );
  }
);
RadioGroup.displayName = "RadioGroup";
var FormContext = React9__namespace.createContext(null);
function useFormContext() {
  return React9__namespace.useContext(FormContext);
}
function Form({
  onSubmit,
  onCancel,
  initialValues,
  values: valuesProp,
  onValuesChange,
  validate,
  errors: errorsProp,
  validateOn = "submit",
  submitted: submittedProp,
  onSubmittedChange,
  resetSubmittedAfterMs,
  layout = "vertical",
  columns = 1,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  footer,
  disabled,
  loading,
  submitButtonProps,
  cancelButtonProps,
  children,
  className,
  ...props
}) {
  const [internalValues, setInternalValues] = React9__namespace.useState(initialValues ?? {});
  const [internalErrors, setInternalErrors] = React9__namespace.useState({});
  const [touched, setTouchedState] = React9__namespace.useState({});
  const [internalSubmitted, setInternalSubmitted] = React9__namespace.useState(false);
  const isControlled = valuesProp !== void 0;
  const isSubmittedControlled = submittedProp !== void 0;
  const submitted = isSubmittedControlled ? Boolean(submittedProp) : internalSubmitted;
  const setSubmitted = React9__namespace.useCallback(
    (next) => {
      if (!isSubmittedControlled) setInternalSubmitted(next);
      onSubmittedChange?.(next);
    },
    [isSubmittedControlled, onSubmittedChange]
  );
  React9__namespace.useEffect(() => {
    if (!resetSubmittedAfterMs || !submitted) return;
    const timer = window.setTimeout(() => setSubmitted(false), resetSubmittedAfterMs);
    return () => window.clearTimeout(timer);
  }, [resetSubmittedAfterMs, submitted, setSubmitted]);
  const values = isControlled ? valuesProp : internalValues;
  const errors = errorsProp ?? internalErrors;
  const setValue = React9__namespace.useCallback(
    (name, value) => {
      const next = { ...values, [name]: value };
      if (!isControlled) setInternalValues(next);
      onValuesChange?.(next);
    },
    [values, isControlled, onValuesChange]
  );
  const setError = React9__namespace.useCallback(
    (name, error) => {
      if (errorsProp) return;
      setInternalErrors((prev) => ({ ...prev, [name]: error }));
    },
    [errorsProp]
  );
  const setTouched = React9__namespace.useCallback((name, isTouched) => {
    setTouchedState((prev) => ({ ...prev, [name]: isTouched }));
  }, []);
  const runValidation = React9__namespace.useCallback(() => {
    if (!validate) return true;
    const result = validate(values) ?? {};
    if (!errorsProp) setInternalErrors(result);
    return Object.values(result).every((e) => !e);
  }, [validate, values, errorsProp]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouchedState((prev) => ({ ...prev, ...allTouched }));
    const valid = runValidation();
    if (!valid) return;
    await onSubmit(values);
  };
  const ctx = {
    values,
    errors,
    touched,
    submitted,
    setValue,
    setError,
    setTouched,
    validateOn,
    disabled,
    loading
  };
  const layoutClass = layout === "grid" ? cn(
    "grid gap-4",
    columns === 2 && "grid-cols-1 sm:grid-cols-2",
    columns === 3 && "grid-cols-1 sm:grid-cols-3",
    columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
  ) : layout === "horizontal" ? "flex flex-col gap-4 sm:grid sm:grid-cols-[minmax(8rem,12rem)_1fr] sm:items-start sm:gap-x-4 sm:gap-y-4" : "flex flex-col gap-4";
  const defaultFooter = /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap justify-end gap-2", children: [
    onCancel ? /* @__PURE__ */ jsxRuntime.jsx(
      Button,
      {
        type: "button",
        variant: "outline",
        label: cancelLabel,
        disabled: disabled || loading,
        onClick: onCancel,
        ...cancelButtonProps
      }
    ) : null,
    /* @__PURE__ */ jsxRuntime.jsx(
      Button,
      {
        type: "submit",
        variant: "primary",
        label: submitLabel,
        loading,
        disabled,
        ...submitButtonProps
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntime.jsx(FormContext.Provider, { value: ctx, children: /* @__PURE__ */ jsxRuntime.jsxs(
    "form",
    {
      noValidate: true,
      onSubmit: handleSubmit,
      className: cn("w-full space-y-4", className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: layoutClass, children }),
        footer ?? defaultFooter
      ]
    }
  ) });
}
Form.displayName = "Form";
function resolveFieldError(value, validate, required, errorMessage) {
  if (!validate) return void 0;
  const opts = { validate, required, errorMessage };
  return getStringFieldValidationError(value, opts);
}
function FormField({
  name,
  type = "text",
  label,
  placeholder,
  required,
  disabled,
  value: valueProp,
  defaultValue,
  onChange: onChangeProp,
  validate,
  errorMessage,
  touched: touchedProp,
  showError = true,
  render,
  children,
  className,
  inputProps
}) {
  const form = useFormContext();
  const fieldId = React9__namespace.useId();
  const value = valueProp != null ? String(valueProp) : form ? String(form.values[name] ?? "") : String(defaultValue ?? "");
  const touched = touchedProp ?? form?.touched[name] ?? false;
  const contextError = form?.errors[name];
  const localError = resolveFieldError(value, validate, required, errorMessage);
  const shouldShowError = form ? form.validateOn === "submit" ? form.submitted : form.validateOn === "blur" ? touched : touched : touched;
  const displayError = showError && shouldShowError ? contextError ?? localError : void 0;
  const setValue = (next) => {
    onChangeProp?.(next);
    form?.setValue(name, next);
    if (form && validate) {
      const err = resolveFieldError(next, validate, required, errorMessage);
      if (form.validateOn === "change" || form.submitted) {
        form.setError(name, err);
      }
      if (form.validateOn === "change") form.setTouched(name, true);
    }
  };
  const handleBlur = () => {
    if (form?.validateOn === "blur") {
      form.setTouched(name, true);
      if (validate) {
        const err = resolveFieldError(value, validate, required, errorMessage);
        form.setError(name, err);
      }
    }
  };
  const shared = {
    id: fieldId,
    name,
    value,
    onChange: setValue,
    onBlur: handleBlur,
    errorMessage: displayError,
    disabled: disabled ?? form?.disabled,
    required,
    placeholder
  };
  if (render) {
    return /* @__PURE__ */ jsxRuntime.jsx(FieldLayout, { className, label, htmlFor: fieldId, required, errorMessage: displayError, children: render(shared) });
  }
  if (children) {
    return /* @__PURE__ */ jsxRuntime.jsx(FieldLayout, { className, label, htmlFor: fieldId, required, errorMessage: displayError, children: React9__namespace.Children.map(children, (child) => {
      if (!React9__namespace.isValidElement(child)) return child;
      return React9__namespace.cloneElement(child, {
        id: fieldId,
        name,
        value,
        onChange: (e) => {
          setValue(e.target.value);
        },
        onBlur: handleBlur,
        disabled: shared.disabled,
        required,
        placeholder,
        errorMessage: displayError,
        validate
      });
    }) });
  }
  if (type === "textarea") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      Textarea,
      {
        id: fieldId,
        name,
        label,
        value,
        placeholder,
        required,
        disabled: shared.disabled,
        validate: form?.validateOn === "submit" ? void 0 : validate,
        errorMessage: displayError,
        className,
        onChange: (e) => setValue(e.target.value),
        onBlur: handleBlur,
        ...inputProps
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    TextInput,
    {
      id: fieldId,
      name,
      type,
      label,
      value,
      placeholder,
      required,
      disabled: shared.disabled,
      validate: form?.validateOn === "submit" ? void 0 : validate,
      errorMessage: displayError,
      className,
      onChange: (e) => setValue(e.target.value),
      onBlur: handleBlur,
      ...inputProps
    }
  );
}
FormField.displayName = "FormField";
function isNonEmptyLead(node) {
  if (node == null || node === false) return false;
  if (typeof node === "string") return node.trim().length > 0;
  if (Array.isArray(node)) return node.some((n) => isNonEmptyLead(n));
  return true;
}
var InputGroupContext = React9__namespace.createContext(null);
function useInputGroupContext() {
  return React9__namespace.useContext(InputGroupContext);
}
function InputGroup({
  children,
  disabled = false,
  loading,
  invalid = false,
  orientation = "horizontal",
  attached = true,
  size = "md",
  variant = "outline",
  left,
  placeholder,
  className,
  ...props
}) {
  const vertical = orientation === "vertical";
  const ctx = React9__namespace.useMemo(
    () => ({
      attached: attached && !vertical,
      vertical,
      size,
      variant,
      disabled,
      invalid,
      left,
      placeholder
    }),
    [attached, vertical, size, variant, disabled, invalid, left, placeholder]
  );
  const pillShell = isNonEmptyLead(ctx.left) && ctx.attached && !vertical;
  return /* @__PURE__ */ jsxRuntime.jsx(InputGroupContext.Provider, { value: ctx, children: /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      "data-slot": "input-group",
      "data-invalid": invalid || void 0,
      className: cn(
        "relative flex w-full",
        vertical ? "flex-col gap-2" : "flex-row flex-wrap items-stretch",
        !vertical && ctx.attached && cn(
          "overflow-hidden border bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background [&>*+*]:border-l [&>*+*]:border-border",
          pillShell ? "rounded-full" : "rounded-md",
          invalid ? "border-destructive focus-within:ring-destructive" : "border-border"
        ),
        disabled && "pointer-events-none opacity-60",
        className
      ),
      ...props,
      children: [
        loading ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2", children: /* @__PURE__ */ jsxRuntime.jsx(Spinner, { size: "sm" }) }) : null,
        children
      ]
    }
  ) });
}
InputGroup.displayName = "InputGroup";
var InputGroupInput = React9__namespace.forwardRef(
  ({
    className,
    size: sizeProp,
    variant: variantProp,
    invalid: invalidProp,
    disabled,
    placeholder: placeholderProp,
    ...props
  }, ref) => {
    const ctx = useInputGroupContext();
    const attached = ctx?.attached ?? false;
    const vertical = ctx?.vertical ?? false;
    const size = sizeProp ?? ctx?.size ?? "md";
    const variant = variantProp ?? ctx?.variant ?? "outline";
    const invalid = Boolean(invalidProp ?? ctx?.invalid);
    const groupDisabled = ctx?.disabled ?? false;
    const resolvedPlaceholder = placeholderProp ?? ctx?.placeholder;
    const shellLead = isNonEmptyLead(ctx?.left);
    const lead = ctx?.left;
    const inGroupShell = attached && !vertical;
    const inputEl = /* @__PURE__ */ jsxRuntime.jsx(
      "input",
      {
        ref,
        disabled: disabled || groupDisabled,
        placeholder: resolvedPlaceholder,
        className: cn(
          fieldSurfaceVariants({
            control: "input",
            size,
            variant,
            invalid
          }),
          !inGroupShell && "w-full",
          inGroupShell && cn(
            "min-w-0 flex-1 rounded-none border-0 bg-transparent shadow-none",
            "focus-visible:z-[1] focus-visible:ring-0 focus-visible:ring-offset-0",
            disabledControl
          ),
          inGroupShell && "rounded-none",
          shellLead && "pl-9",
          className
        ),
        ...props
      }
    );
    if (!shellLead) {
      return inputEl;
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        className: cn(
          "relative min-w-0",
          inGroupShell ? "flex-1" : "w-full"
        ),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: "pointer-events-none absolute left-2.5 top-1/2 z-[1] -translate-y-1/2 text-muted-foreground",
              "aria-hidden": true,
              children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: lead, size: "sm", variant: "muted" })
            }
          ),
          inputEl
        ]
      }
    );
  }
);
InputGroupInput.displayName = "InputGroupInput";
function InputGroupAddon({ className, children, ...props }) {
  const ctx = useInputGroupContext();
  const inShell = ctx?.attached && !ctx.vertical;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      role: "presentation",
      className: cn(
        "inline-flex shrink-0 items-center bg-muted/40 px-3 text-sm text-muted-foreground",
        inShell ? "rounded-none" : "rounded-md border border-border",
        className
      ),
      ...props,
      children
    }
  );
}
InputGroupAddon.displayName = "InputGroupAddon";
var InputGroupButton = React9__namespace.forwardRef(
  ({ className, variant = "outline", size = "md", disabled, ...props }, ref) => {
    const ctx = useInputGroupContext();
    const inShell = ctx?.attached && !ctx.vertical;
    const groupDisabled = ctx?.disabled ?? false;
    return /* @__PURE__ */ jsxRuntime.jsx(
      Button,
      {
        ref,
        variant,
        size,
        disabled: disabled || groupDisabled,
        className: cn(
          inShell && "shrink-0 rounded-none border-y-0 border-r-0 border-l border-border shadow-none",
          inShell && size === "sm" && "h-8",
          inShell && size === "md" && "h-10",
          inShell && size === "lg" && "h-11",
          className
        ),
        ...props
      }
    );
  }
);
InputGroupButton.displayName = "InputGroupButton";
var cardVariants = classVarianceAuthority.cva("rounded-[var(--radius-card,0.5rem)] border text-foreground", {
  variants: {
    variant: {
      transparent: "border-transparent bg-transparent shadow-none",
      "surface-1": "border-border bg-card shadow-sm",
      "surface-2": "border-border bg-muted/40 shadow-md",
      outlined: "border-border bg-background shadow-none"
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-base"
    }
  },
  defaultVariants: {
    variant: "surface-1",
    size: "md"
  }
});
var sectionPad = {
  sm: "px-3 py-2",
  md: "px-4 py-3",
  lg: "px-6 py-4"
};
function withUnit2(value) {
  if (value == null) return void 0;
  return typeof value === "number" ? `${value}px` : value;
}
var Card = React9__namespace.forwardRef(
  ({ variant, size = "md", header, footer, minHeight, maxHeight, className, children, style, ...props }, ref) => {
    const effectiveSize = size ?? "md";
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        "data-slot": "card",
        className: cn("relative flex flex-col overflow-hidden", cardVariants({ variant, size: effectiveSize }), className),
        style: { minHeight: withUnit2(minHeight), maxHeight: withUnit2(maxHeight), ...style },
        ...props,
        children: [
          header ? /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              "data-slot": "card-header",
              className: cn("sticky top-0 shrink-0 border-b border-border bg-inherit", sectionPad[effectiveSize]),
              children: header
            }
          ) : null,
          /* @__PURE__ */ jsxRuntime.jsx("div", { "data-slot": "card-content", className: cn("min-h-0 flex-1 overflow-y-auto", sectionPad[effectiveSize]), children }),
          footer ? /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              "data-slot": "card-footer",
              className: cn("sticky bottom-0 shrink-0 border-t border-border bg-inherit", sectionPad[effectiveSize]),
              children: footer
            }
          ) : null
        ]
      }
    );
  }
);
Card.displayName = "Card";
var separatorVariants = classVarianceAuthority.cva("shrink-0 bg-border ", {
  variants: {
    variant: {
      solid: "",
      dashed: "bg-transparent",
      dotted: "bg-transparent"
    },
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-6 w-px"
    }
  },
  compoundVariants: [
    { orientation: "horizontal", variant: "dashed", class: "h-0 border-t border-dashed border-border" },
    { orientation: "horizontal", variant: "dotted", class: "h-0 border-t border-dotted border-border" },
    { orientation: "vertical", variant: "dashed", class: "w-0 border-l border-dashed border-border" },
    { orientation: "vertical", variant: "dotted", class: "w-0 border-l border-dotted border-border" }
  ],
  defaultVariants: {
    orientation: "horizontal",
    variant: "solid"
  }
});
var Separator = React9__namespace.forwardRef(
  ({ variant, orientation, decorative = true, className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref,
      "data-slot": "separator",
      role: decorative ? "none" : "separator",
      "aria-orientation": orientation ?? "horizontal",
      className: cn(separatorVariants({ variant, orientation }), className),
      ...props
    }
  )
);
Separator.displayName = "Separator";
var stackVariants = classVarianceAuthority.cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      column: "flex-col"
    },
    gap: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6"
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline"
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly"
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap"
    }
  },
  defaultVariants: {
    direction: "column",
    gap: "md",
    wrap: false
  }
});
var StackInner = ({
  as = "div",
  direction,
  gap,
  align,
  justify,
  wrap,
  className,
  items,
  renderItem,
  getItemKey,
  ...props
}, ref) => {
  const Comp = as;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      ref,
      "data-slot": "stack",
      className: cn(stackVariants({ direction, gap, align, justify, wrap }), className),
      ...props,
      children: items.map((item, index) => /* @__PURE__ */ jsxRuntime.jsx(React9__namespace.Fragment, { children: renderItem(item, index) }, getItemKey?.(item, index) ?? index))
    }
  );
};
var Stack = Object.assign(
  React9__namespace.forwardRef(StackInner),
  { displayName: "Stack" }
);
var columnClass = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  12: "grid-cols-12"
};
var rowClass = {
  1: "grid-rows-1",
  2: "grid-rows-2",
  3: "grid-rows-3",
  4: "grid-rows-4",
  5: "grid-rows-5",
  6: "grid-rows-6"
};
var gridSpacingVariants = classVarianceAuthority.cva("", {
  variants: {
    gap: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6"
    },
    columnGap: {
      none: "gap-x-0",
      sm: "gap-x-2",
      md: "gap-x-4",
      lg: "gap-x-6"
    },
    rowGap: {
      none: "gap-y-0",
      sm: "gap-y-2",
      md: "gap-y-4",
      lg: "gap-y-6"
    },
    autoFlow: {
      default: "",
      row: "grid-flow-row",
      column: "grid-flow-col",
      dense: "grid-flow-dense",
      rowDense: "grid-flow-row-dense",
      colDense: "grid-flow-col-dense"
    },
    alignItems: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch"
    },
    justifyItems: {
      start: "justify-items-start",
      center: "justify-items-center",
      end: "justify-items-end",
      stretch: "justify-items-stretch"
    }
  },
  defaultVariants: {
    gap: "md",
    autoFlow: "default"
  }
});
function normalizeColumns(value) {
  if (value == null) return 1;
  const n = typeof value === "string" ? Number(value) : value;
  return [1, 2, 3, 4, 6, 12].includes(n) ? n : 1;
}
function normalizeRows(value) {
  if (value == null) return void 0;
  const n = typeof value === "string" ? Number(value) : value;
  return [1, 2, 3, 4, 5, 6].includes(n) ? n : void 0;
}
var GridInner = ({
  as = "div",
  columns: columnsProp = 1,
  rows: rowsProp,
  gap,
  columnGap,
  rowGap,
  autoFlow,
  alignItems,
  justifyItems,
  minChildWidth,
  className,
  style,
  items,
  renderItem,
  getItemKey,
  ...props
}, ref) => {
  const columns = normalizeColumns(columnsProp);
  const rows = normalizeRows(rowsProp);
  const Comp = as;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    {
      ref,
      "data-slot": "grid",
      className: cn(
        "grid",
        minChildWidth ? "grid-cols-[repeat(auto-fill,minmax(var(--grid-min),1fr))]" : columnClass[columns],
        rows != null && rowClass[rows],
        gridSpacingVariants({ gap, columnGap, rowGap, autoFlow, alignItems, justifyItems }),
        className
      ),
      style: minChildWidth ? { ...style, ["--grid-min"]: minChildWidth } : style,
      ...props,
      children: items.map((item, index) => /* @__PURE__ */ jsxRuntime.jsx(React9__namespace.Fragment, { children: renderItem(item, index) }, getItemKey?.(item, index) ?? index))
    }
  );
};
var Grid = Object.assign(
  React9__namespace.forwardRef(GridInner),
  { displayName: "Grid" }
);
var DEFAULT_RATIO = 16 / 9;
function toRatioNumber(value, fallback) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return fallback;
}
function formatAspectRatioLabel(ratio) {
  const pairs = [
    [21, 9],
    [16, 9],
    [16, 10],
    [3, 2],
    [4, 3],
    [5, 4],
    [1, 1]
  ];
  for (const [w, h] of pairs) {
    if (Math.abs(ratio - w / h) < 0.02) return `${w}:${h}`;
  }
  return String(Math.round(ratio * 1e3) / 1e3);
}
function sizeToCss(value) {
  if (value == null) return void 0;
  return typeof value === "number" ? `${value}px` : value;
}
var AspectRatio = React9__namespace.forwardRef(
  ({ className, ratio: ratioProp = DEFAULT_RATIO, children, minWidth, maxWidth, style, ...props }, ref) => {
    const ratio = toRatioNumber(ratioProp, DEFAULT_RATIO);
    const ratioLabel = formatAspectRatioLabel(ratio);
    const resolvedChildren = typeof children === "string" ? children.replace(/\{ratio\}/g, ratioLabel) : children;
    const mergedStyle = {
      ...style,
      aspectRatio: ratio,
      ...minWidth != null && { minWidth: sizeToCss(minWidth) },
      ...maxWidth != null && { maxWidth: sizeToCss(maxWidth) }
    };
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: cn("w-full overflow-hidden", className), style: mergedStyle, ...props, children: resolvedChildren });
  }
);
AspectRatio.displayName = "AspectRatio";
var ResizablePanelGroup = React9__namespace.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
    reactResizablePanels.PanelGroup,
    {
      ref,
      className: cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className),
      ...props
    }
  )
);
ResizablePanelGroup.displayName = "ResizablePanelGroup";
var ResizablePanel = React9__namespace.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntime.jsx(reactResizablePanels.Panel, { ref, ...props }));
ResizablePanel.displayName = "ResizablePanel";
function ResizableHandle({ className, withHandle, children, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactResizablePanels.PanelResizeHandle,
    {
      className: cn(
        "relative flex w-px items-center justify-center bg-border outline-none after:absolute after:inset-y-0 after:left-1/2 after:w-4 after:-translate-x-1/2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-4 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
        className
      ),
      ...props,
      children: children ?? (withHandle ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "z-10 flex h-7 w-4 items-center justify-center rounded-sm border border-border bg-muted", children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.GripVertical, { className: "h-3.5 w-3.5 text-muted-foreground", strokeWidth: 2 }) }) : null)
    }
  );
}
ResizableHandle.displayName = "ResizableHandle";
function Collapsible({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  trigger,
  children,
  disabled,
  footer,
  showContentDivider = true,
  className,
  ...props
}) {
  const [internal, setInternal] = React9__namespace.useState(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : internal;
  const setOpen = (next) => {
    if (!isControlled) setInternal(next);
    onOpenChange?.(next);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("w-full", className), ...props, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      Button,
      {
        variant: "ghost",
        disabled,
        "aria-expanded": open,
        className: "h-auto w-full justify-between gap-2 px-2 py-2 text-left font-medium",
        onClick: () => setOpen(!open),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "min-w-0 flex-1", children: trigger }),
          /* @__PURE__ */ jsxRuntime.jsx(
            lucideReact.ChevronDown,
            {
              className: cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180"),
              "aria-hidden": true
            }
          )
        ]
      }
    ),
    open ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("text-sm px-2 py-2", showContentDivider && "border-t border-border"), children }) : null,
    footer ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-muted-foreground", children: footer }) : null
  ] });
}
Collapsible.displayName = "Collapsible";
function asArray(multiple, v) {
  if (v == null) return [];
  if (multiple) return Array.isArray(v) ? v : typeof v === "string" && v ? [v] : [];
  if (typeof v === "string" && v) return [v];
  if (Array.isArray(v)) return v.length ? [v[0]] : [];
  return [];
}
function Accordion({
  items = [],
  type = "single",
  value,
  defaultValue,
  onChange,
  className,
  ...props
}) {
  const multiple = type === "multiple";
  const initial = asArray(multiple, defaultValue);
  const [internal, setInternal] = React9__namespace.useState(initial);
  const isControlled = value !== void 0;
  const openValues = asArray(multiple, isControlled ? value : internal);
  const setOpen = (panel, nextOpen) => {
    let next;
    if (multiple) {
      if (nextOpen) next = [.../* @__PURE__ */ new Set([...openValues, panel])];
      else next = openValues.filter((v) => v !== panel);
    } else {
      next = nextOpen ? [panel] : [];
    }
    if (!isControlled) setInternal(next);
    onChange?.(multiple ? next : next[0] ?? "");
  };
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("w-full divide-y divide-border rounded-md border border-border", className), ...props, children: items.map((item) => {
    const open = openValues.includes(item.value);
    const trigger = /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [
      item.left ? /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: item.left, size: "sm" }) : null,
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "min-w-0 flex-1", children: item.label }),
      item.loading ? /* @__PURE__ */ jsxRuntime.jsx(Spinner, { size: "sm" }) : null
    ] });
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "px-2 py-1 first:pt-2 last:pb-2", children: /* @__PURE__ */ jsxRuntime.jsx(
      Collapsible,
      {
        open,
        onOpenChange: (o) => setOpen(item.value, o),
        trigger,
        disabled: item.disabled,
        showContentDivider: false,
        className: "border-0",
        children: item.content
      }
    ) }, item.value);
  }) });
}
Accordion.displayName = "Accordion";
function ResizeContainer({
  direction: _direction = "both",
  minScale = 0.5,
  maxScale = 2,
  defaultScale = 1,
  scale: scaleProp,
  onScaleChange,
  fit = "contain",
  showControls = true,
  disabled,
  maxWidth,
  maxHeight,
  containerProps,
  contentProps,
  children,
  className,
  ...rest
}) {
  const [internalScale, setInternalScale] = React9__namespace.useState(defaultScale);
  const isControlled = scaleProp !== void 0;
  const scale = isControlled ? scaleProp : internalScale;
  const setScale = (next) => {
    const clamped = Math.min(maxScale, Math.max(minScale, next));
    if (!isControlled) setInternalScale(clamped);
    onScaleChange?.(clamped);
  };
  const fitClass = fit === "cover" ? "object-cover" : fit === "fill" ? "object-fill" : "object-contain";
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("w-full", className), ...rest, children: [
    showControls ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(Text, { as: "span", size: "sm", variant: "muted", children: [
        "Zoom ",
        Math.round(scale * 100),
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            iconOnly: true,
            "aria-label": "Zoom out",
            disabled: disabled || scale <= minScale,
            left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Minus, { className: "h-4 w-4" }),
            onClick: () => setScale(scale - 0.1)
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            iconOnly: true,
            "aria-label": "Zoom in",
            disabled: disabled || scale >= maxScale,
            left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { className: "h-4 w-4" }),
            onClick: () => setScale(scale + 0.1)
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            iconOnly: true,
            "aria-label": "Reset zoom",
            disabled,
            left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.RotateCcw, { className: "h-4 w-4" }),
            onClick: () => setScale(defaultScale)
          }
        )
      ] })
    ] }) : null,
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: "overflow-auto rounded-lg border border-border bg-muted/20 p-4",
        style: { maxWidth, maxHeight },
        ...containerProps,
        children: /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: cn("origin-top-left transition-transform", fitClass),
            style: { transform: `scale(${scale})` },
            ...contentProps,
            children
          }
        )
      }
    )
  ] });
}
ResizeContainer.displayName = "ResizeContainer";
var linkVariants = classVarianceAuthority.cva(
  "inline-flex items-center rounded-sm transition-colors focus-visible:outline-none",
  {
    variants: {
      variant: {
        default: "text-foreground hover:underline",
        muted: "text-muted-foreground hover:text-foreground",
        underline: "text-foreground underline underline-offset-4 hover:opacity-90"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Link = React9__namespace.forwardRef(
  ({ href, target, rel, variant, className, children, ...props }, ref) => {
    const opensNewTab = typeof target === "string" && target.toLowerCase() === "_blank";
    const resolvedRel = rel ?? (opensNewTab ? "noopener noreferrer" : void 0);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "a",
      {
        ref,
        href,
        target,
        rel: resolvedRel,
        className: cn(linkVariants({ variant }), focusRing, focusRingOffset, className),
        ...props,
        children
      }
    );
  }
);
Link.displayName = "Link";
var Breadcrumb = React9__namespace.forwardRef(
  ({ items, separator, maxItems, className, "aria-label": ariaLabel = "Breadcrumb", ...props }, ref) => {
    const sep = separator ?? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground", "aria-hidden": true });
    const visible = React9__namespace.useMemo(() => {
      if (!maxItems || items.length <= maxItems) return items;
      const first = items[0];
      const last = items[items.length - 1];
      items.slice(1, -1);
      if (!first || !last) return items;
      return [
        first,
        { label: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.MoreHorizontal, { className: "h-4 w-4 text-muted-foreground", "aria-hidden": true }), current: false },
        last
      ];
    }, [items, maxItems]);
    return /* @__PURE__ */ jsxRuntime.jsx("nav", { ref, "aria-label": ariaLabel, className: cn("w-full", className), ...props, children: /* @__PURE__ */ jsxRuntime.jsx("ol", { className: "flex flex-wrap items-center gap-1 text-sm", children: visible.map((item, i) => {
      const isLast = i === visible.length - 1;
      const isCurrent = Boolean(item.current) || isLast;
      return /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "flex items-center gap-1", children: [
        i > 0 ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex select-none items-center", children: sep }) : null,
        isCurrent || !item.href ? /* @__PURE__ */ jsxRuntime.jsx(
          Text,
          {
            as: "span",
            size: "sm",
            variant: isCurrent ? "default" : "muted",
            weight: isCurrent ? "medium" : "normal",
            "aria-current": isCurrent ? "page" : void 0,
            className: "max-w-[12rem] truncate",
            children: item.label
          }
        ) : /* @__PURE__ */ jsxRuntime.jsx(Link, { href: item.href, variant: "muted", className: "max-w-[12rem] truncate", children: item.label })
      ] }, i);
    }) }) });
  }
);
Breadcrumb.displayName = "Breadcrumb";
function useControllableOpen({
  open: openProp,
  defaultOpen = false,
  onOpenChange
}) {
  const [uncontrolled, setUncontrolled] = React9__namespace.useState(defaultOpen);
  const isControlled = openProp !== void 0;
  const open = isControlled ? openProp : uncontrolled;
  const setOpen = React9__namespace.useCallback(
    (next) => {
      if (!isControlled) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );
  return [open, setOpen];
}
var sidebarVariants = classVarianceAuthority.cva("flex flex-col border-border bg-background transition-[width] duration-200", {
  variants: {
    variant: {
      default: "border-r",
      floating: "m-2 rounded-xl border shadow-sm",
      inset: "m-2 rounded-xl border bg-muted/30"
    },
    side: {
      left: "",
      right: "border-l border-r-0"
    }
  },
  defaultVariants: {
    variant: "default",
    side: "left"
  }
});
function toCssSize(value, fallback) {
  if (value == null) return fallback;
  return typeof value === "number" ? `${value}px` : value;
}
function itemValue(item, index, prefix = "") {
  return item.value ?? `${prefix}item-${index}`;
}
function firstEnabledValue(items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item.disabled) return itemValue(item, i);
    if (item.children?.length) {
      const nested = firstEnabledValue(item.children);
      if (nested) return nested;
    }
  }
  return void 0;
}
function SidebarNavItem({
  item,
  index,
  depth,
  collapsed,
  activeValue,
  onSelect,
  itemProps
}) {
  const value = itemValue(item, index, depth > 0 ? `${depth}-` : "");
  const isActive = activeValue === value;
  const hasChildren = Boolean(item.children?.length);
  const [nestedOpen, setNestedOpen] = React9__namespace.useState(false);
  const rowClass2 = cn(
    "flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm font-medium transition-colors",
    "hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    isActive && "bg-muted text-foreground",
    !isActive && "text-muted-foreground hover:text-foreground",
    item.disabled && "pointer-events-none opacity-50",
    collapsed && "justify-center px-2"
  );
  const content = /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    item.left ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 text-muted-foreground", children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: item.left, size: "sm" }) }) : null,
    !collapsed ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "min-w-0 flex-1 truncate text-left", children: item.label }) : null,
    !collapsed && item.badge != null ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 text-xs text-muted-foreground", children: item.badge }) : null,
    !collapsed && hasChildren ? /* @__PURE__ */ jsxRuntime.jsx(
      lucideReact.ChevronDown,
      {
        className: cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", nestedOpen && "rotate-180"),
        "aria-hidden": true
      }
    ) : null
  ] });
  const handleActivate = () => {
    if (item.disabled) return;
    if (hasChildren && !collapsed) {
      setNestedOpen((o) => !o);
      return;
    }
    onSelect(value);
    if (item.href && typeof window !== "undefined") window.location.assign(item.href);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn(depth > 0 && !collapsed && "pl-2"), children: [
    item.href && !hasChildren ? /* @__PURE__ */ jsxRuntime.jsx(
      Link,
      {
        href: item.href,
        className: rowClass2,
        "aria-current": isActive ? "page" : void 0,
        onClick: () => onSelect(value),
        children: content
      }
    ) : /* @__PURE__ */ jsxRuntime.jsx("button", { type: "button", className: rowClass2, disabled: item.disabled, onClick: handleActivate, ...itemProps, children: content }),
    hasChildren && nestedOpen && !collapsed ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-0.5 space-y-0.5 border-l border-border pl-2", children: item.children.map((child, childIndex) => /* @__PURE__ */ jsxRuntime.jsx(
      SidebarNavItem,
      {
        item: child,
        index: childIndex,
        depth: depth + 1,
        collapsed,
        activeValue,
        onSelect,
        itemProps
      },
      itemValue(child, childIndex, `${value}-`)
    )) }) : null
  ] });
}
function Sidebar({
  items = [],
  value,
  defaultValue,
  onChange,
  side = "left",
  variant = "default",
  collapsible = false,
  defaultCollapsed = false,
  collapsed: collapsedProp,
  onCollapsedChange,
  container = "parent",
  heightMode = "parent",
  header,
  footer,
  children,
  width = "16rem",
  collapsedWidth = "3.5rem",
  toggleButtonProps,
  itemProps,
  className,
  ...rest
}) {
  const autoDefault = value === void 0 && defaultValue === void 0 ? firstEnabledValue(items) : void 0;
  const [internalValue, setInternalValue] = React9__namespace.useState(defaultValue ?? autoDefault ?? "");
  const isValueControlled = value !== void 0;
  const activeValue = isValueControlled ? value : internalValue;
  const [collapsed, setCollapsed] = useControllableOpen({
    open: collapsedProp,
    defaultOpen: defaultCollapsed,
    onOpenChange: onCollapsedChange
  });
  const isCollapsed = collapsible ? collapsed : false;
  const resolvedWidth = isCollapsed ? toCssSize(collapsedWidth, "3.5rem") : toCssSize(width, "16rem");
  const handleSelect = (next) => {
    if (!isValueControlled) setInternalValue(next);
    onChange?.(next);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "aside",
    {
      "aria-label": "Sidebar",
      style: { width: resolvedWidth },
      className: cn(
        sidebarVariants({ variant, side }),
        container === "screen" && "fixed inset-y-0 z-sticky",
        container === "screen" && side === "left" && "left-0",
        container === "screen" && side === "right" && "right-0",
        heightMode === "viewport" && "min-h-screen",
        heightMode === "parent" && "h-full min-h-0",
        className
      ),
      ...rest,
      children: [
        header || collapsible ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex items-center gap-2 p-3", isCollapsed && "justify-center"), children: [
          !isCollapsed && header ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-w-0 flex-1", children: header }) : null,
          collapsible ? /* @__PURE__ */ jsxRuntime.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              iconOnly: true,
              "aria-label": isCollapsed ? "Expand sidebar" : "Collapse sidebar",
              left: isCollapsed ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.PanelLeftOpen, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.PanelLeftClose, { className: "h-4 w-4" }),
              onClick: () => setCollapsed(!isCollapsed),
              ...toggleButtonProps
            }
          ) : null
        ] }) : null,
        /* @__PURE__ */ jsxRuntime.jsx("nav", { className: "flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-1", children: items.map((item, index) => /* @__PURE__ */ jsxRuntime.jsx(
          SidebarNavItem,
          {
            item,
            index,
            depth: 0,
            collapsed: isCollapsed,
            activeValue,
            onSelect: handleSelect,
            itemProps
          },
          itemValue(item, index)
        )) }),
        children,
        footer ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("p-3 text-sm text-muted-foreground", isCollapsed && "px-2 text-center"), children: footer })
        ] }) : null
      ]
    }
  );
}
Sidebar.displayName = "Sidebar";
function computePopoverStyle(trigger, content, placement, offset) {
  if (placement === "bottom") {
    return computeFloatingMenuStyle(trigger, content, {
      align: "start",
      sideOffset: offset,
      maxHeightCap: 480,
      minWidth: "auto"
    });
  }
  const rect = trigger.getBoundingClientRect();
  const base = { position: "fixed", zIndex: zLayerValue("dropdown"), visibility: "visible" };
  switch (placement) {
    case "top": {
      const h = content?.offsetHeight ?? 0;
      const style = computeFloatingMenuStyle(trigger, content, {
        align: "start",
        sideOffset: offset,
        maxHeightCap: 480,
        minWidth: "auto"
      });
      return { ...style, top: rect.top - offset - h };
    }
    case "left":
      return {
        ...base,
        left: rect.left - offset,
        top: rect.top + rect.height / 2,
        transform: "translate(-100%, -50%)"
      };
    case "right":
      return {
        ...base,
        left: rect.right + offset,
        top: rect.top + rect.height / 2,
        transform: "translateY(-50%)"
      };
    default:
      return base;
  }
}
function Popover({
  open: openProp,
  defaultOpen,
  onOpenChange,
  triggerProps,
  trigger,
  openOnClick = true,
  closeOnOutsideClick = true,
  placement = "bottom",
  offset = 8,
  className,
  cardProps,
  children,
  ...rest
}) {
  const { label = "Open", left, variant = "outline", size = "md", className: triggerClassName } = triggerProps ?? {};
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange });
  const triggerRef = React9__namespace.useRef(null);
  const contentRef = React9__namespace.useRef(null);
  const [contentStyle, setContentStyle] = React9__namespace.useState({ visibility: "hidden" });
  const [positioned, setPositioned] = React9__namespace.useState(false);
  const updatePosition = React9__namespace.useCallback(() => {
    const el = triggerRef.current;
    const panel = contentRef.current;
    if (!el) return;
    setContentStyle(computePopoverStyle(el, panel, placement, offset));
  }, [placement, offset]);
  React9__namespace.useLayoutEffect(() => {
    if (!open) {
      setPositioned(false);
      return;
    }
    setPositioned(false);
    updatePosition();
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      updatePosition();
      raf2 = requestAnimationFrame(() => setPositioned(true));
    });
    const onReflow = () => updatePosition();
    window.addEventListener("scroll", onReflow, true);
    window.addEventListener("resize", onReflow);
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("scroll", onReflow, true);
      window.removeEventListener("resize", onReflow);
    };
  }, [open, updatePosition]);
  React9__namespace.useEffect(() => {
    if (!open || !closeOnOutsideClick) return;
    const onPointerDown = (e) => {
      const t = e.target;
      if (triggerRef.current?.contains(t) || contentRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [open, closeOnOutsideClick, setOpen]);
  const content = open ? /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref: contentRef,
      style: {
        ...contentStyle,
        visibility: positioned ? contentStyle.visibility ?? "visible" : "hidden"
      },
      className: "w-max max-w-xs",
      children: /* @__PURE__ */ jsxRuntime.jsx(Card, { variant: "surface-1", size: "sm", ...cardProps, className: cn("shadow-md", cardProps?.className), children })
    }
  ) : null;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("relative inline-block", className), ...rest, children: [
    /* @__PURE__ */ jsxRuntime.jsx("div", { ref: triggerRef, children: trigger ? React9__namespace.isValidElement(trigger) ? React9__namespace.cloneElement(trigger, {
      onClick: (e) => {
        trigger.props.onClick?.(e);
        if (openOnClick) setOpen(!open);
      },
      "aria-expanded": open
    }) : trigger : /* @__PURE__ */ jsxRuntime.jsxs(
      Button,
      {
        variant,
        size,
        className: triggerClassName,
        "aria-expanded": open,
        onClick: () => setOpen(!open),
        children: [
          left ? /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: left, size: "sm" }) : null,
          label
        ]
      }
    ) }),
    typeof document !== "undefined" && content ? reactDom.createPortal(content, document.body) : null
  ] });
}
Popover.displayName = "Popover";
function itemValue2(item, index) {
  return item.value ?? `item-${index}`;
}
function firstEnabledValue2(items) {
  return items.find((i) => !i.disabled)?.value ?? (items[0] ? itemValue2(items[0], 0) : void 0);
}
function NavMenuLeaf({
  item,
  active,
  onSelect
}) {
  const className = cn(
    "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
    "hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    active ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
    item.disabled && "pointer-events-none opacity-50"
  );
  if (item.href) {
    return /* @__PURE__ */ jsxRuntime.jsxs(Link, { href: item.href, className, "aria-current": active ? "page" : void 0, onClick: onSelect, children: [
      item.left ? /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: item.left, size: "sm" }) : null,
      item.label
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "ghost", size: "md", className, disabled: item.disabled, left: item.left, onClick: onSelect, children: item.label });
}
function NavMenuSubmenu({ item, activeValue, onSelect }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Popover,
    {
      triggerProps: {
        label: item.label,
        left: item.left,
        variant: "ghost",
        className: "font-medium text-muted-foreground hover:text-foreground"
      },
      cardProps: { className: "min-w-[14rem] p-2" },
      placement: "bottom",
      children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-col gap-1", children: item.children?.map((child, index) => {
        const value = itemValue2(child, index);
        const active = activeValue === value;
        return /* @__PURE__ */ jsxRuntime.jsxs(
          "button",
          {
            type: "button",
            disabled: child.disabled,
            className: cn(
              "flex w-full flex-col items-start gap-0.5 rounded-md px-3 py-2 text-left transition-colors hover:bg-muted/80",
              active && "bg-muted",
              child.disabled && "pointer-events-none opacity-50"
            ),
            onClick: () => {
              onSelect(value);
              if (child.href && typeof window !== "undefined") window.location.assign(child.href);
            },
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "span", size: "sm", weight: "medium", children: child.label }),
              child.description ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "span", size: "xs", variant: "muted", children: child.description }) : null
            ]
          },
          value
        );
      }) })
    }
  );
}
function NavigationMenu({
  items,
  value,
  defaultValue,
  onChange,
  orientation = "horizontal",
  children,
  className,
  ...rest
}) {
  const autoDefault = value === void 0 && defaultValue === void 0 ? firstEnabledValue2(items) : void 0;
  const [internalValue, setInternalValue] = React9__namespace.useState(defaultValue ?? autoDefault ?? "");
  const isControlled = value !== void 0;
  const activeValue = isControlled ? value : internalValue;
  const select = (next) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "nav",
    {
      "aria-label": "Main",
      className: cn(
        "flex gap-1",
        orientation === "vertical" ? "flex-col items-stretch" : "flex-row flex-wrap items-center",
        className
      ),
      ...rest,
      children: [
        items.map((item, index) => {
          const itemKey = itemValue2(item, index);
          if (item.children?.length) {
            return /* @__PURE__ */ jsxRuntime.jsx(NavMenuSubmenu, { item, activeValue, onSelect: select }, itemKey);
          }
          return /* @__PURE__ */ jsxRuntime.jsx(
            NavMenuLeaf,
            {
              item,
              active: activeValue === itemKey,
              onSelect: () => {
                select(itemKey);
                if (item.href && typeof window !== "undefined") window.location.assign(item.href);
              }
            },
            itemKey
          );
        }),
        children
      ]
    }
  );
}
NavigationMenu.displayName = "NavigationMenu";
function menuValue(menu, index) {
  return menu.value ?? `menu-${index}`;
}
function Menubar({ menus = [], value, defaultValue, onChange, className, ...rest }) {
  const [internalValue, setInternalValue] = React9__namespace.useState(defaultValue ?? "");
  const isControlled = value !== void 0;
  const activeValue = isControlled ? value : internalValue;
  const setActive = (next) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };
  return /* @__PURE__ */ jsxRuntime.jsx("div", { role: "menubar", className: cn("inline-flex items-center gap-1 rounded-md border border-border bg-background p-1", className), ...rest, children: menus.map((menu, index) => {
    const menuKey = menuValue(menu, index);
    const open = activeValue === menuKey;
    return /* @__PURE__ */ jsxRuntime.jsx(
      Dropdown,
      {
        items: menu.items,
        open,
        onOpenChange: (nextOpen) => setActive(nextOpen ? menuKey : ""),
        triggerProps: {
          label: menu.label,
          variant: "ghost",
          size: "md",
          className: cn("font-medium", open && "bg-muted text-foreground")
        }
      },
      menuKey
    );
  }) });
}
Menubar.displayName = "Menubar";
function ContextMenu({
  items,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
  contentClassName,
  ...rest
}) {
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange });
  const [coords, setCoords] = React9__namespace.useState({ x: 0, y: 0 });
  const menuRef = React9__namespace.useRef(null);
  React9__namespace.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      const t = e.target;
      if (menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [open, setOpen]);
  const onContextMenu = (e) => {
    e.preventDefault();
    setCoords({ x: e.clientX, y: e.clientY });
    setOpen(true);
  };
  const menu = open ? /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref: menuRef,
      role: "menu",
      tabIndex: -1,
      style: { position: "fixed", top: coords.y, left: coords.x, zIndex: zLayerValue("dropdown"), minWidth: "10rem" },
      className: cn(
        "overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none animate-in fade-in-0",
        contentClassName
      ),
      children: items.map(
        (item, index) => item.separator ? /* @__PURE__ */ jsxRuntime.jsx("div", { role: "separator", className: "-mx-1 my-1 h-px bg-border" }, `sep-${index}`) : /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            role: "menuitem",
            tabIndex: -1,
            "aria-disabled": item.disabled || void 0,
            className: cn(
              "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
              "focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground",
              item.disabled && "pointer-events-none opacity-50"
            ),
            onClick: () => {
              if (item.disabled) return;
              item.onClick?.();
              setOpen(false);
            },
            children: [
              item.left ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-muted-foreground", children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: item.left, size: "sm" }) }) : null,
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex-1", children: item.label })
            ]
          },
          item.value ?? `item-${index}`
        )
      )
    }
  ) : null;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("inline-block", className), onContextMenu, ...rest, children: [
    children,
    typeof document !== "undefined" && menu ? reactDom.createPortal(menu, document.body) : null
  ] });
}
ContextMenu.displayName = "ContextMenu";
var navbarVariants = classVarianceAuthority.cva("w-full", {
  variants: {
    variant: {
      default: "bg-background",
      bordered: "border-b border-border bg-background",
      floating: "mx-auto max-w-6xl rounded-xl border border-border bg-background shadow-sm"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function navChildrenToDropdownItems(children) {
  return children.map((c) => ({
    label: c.label,
    disabled: c.disabled,
    onClick: c.disabled ? void 0 : c.href ? () => {
      if (typeof window !== "undefined") window.location.assign(c.href);
    } : void 0
  }));
}
function Navbar({
  logo,
  items = [],
  left,
  right,
  sticky = false,
  separator = false,
  variant = "default",
  className,
  children,
  linkVariant = "muted",
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "header",
    {
      className: cn(
        navbarVariants({ variant }),
        sticky && "sticky top-0 z-sticky",
        className
      ),
      ...rest,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("nav", { className: "flex min-h-14 flex-wrap items-center gap-3 px-4 py-2 md:gap-6 md:px-6", "aria-label": "Main", children: [
          logo != null ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex shrink-0 items-center gap-2", children: logo }) : null,
          left != null ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex shrink-0 items-center gap-2", children: left }) : null,
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex min-w-0 flex-1 flex-wrap items-center gap-1 md:gap-2", children: items.map((item, index) => {
            if (item.children?.length) {
              return /* @__PURE__ */ jsxRuntime.jsx(
                Dropdown,
                {
                  items: navChildrenToDropdownItems(item.children),
                  triggerProps: {
                    label: item.label,
                    left: item.left,
                    variant: "ghost",
                    size: "md",
                    className: cn(
                      "font-normal text-muted-foreground hover:text-foreground",
                      item.active && "bg-muted text-foreground"
                    )
                  }
                },
                index
              );
            }
            if (item.href) {
              return /* @__PURE__ */ jsxRuntime.jsx(
                Link,
                {
                  href: item.href,
                  variant: linkVariant,
                  className: cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/80",
                    item.active && "bg-muted text-foreground",
                    item.disabled && "pointer-events-none opacity-50"
                  ),
                  "aria-current": item.active ? "page" : void 0,
                  children: item.label
                },
                index
              );
            }
            return /* @__PURE__ */ jsxRuntime.jsx(
              Button,
              {
                variant: "ghost",
                size: "md",
                left: item.left,
                disabled: item.disabled,
                className: cn(
                  "font-normal text-muted-foreground hover:text-foreground",
                  item.active && "bg-muted text-foreground"
                ),
                children: item.label
              },
              index
            );
          }) }),
          right != null ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "ml-auto flex shrink-0 items-center gap-2", children: right }) : null,
          children
        ] }),
        separator ? /* @__PURE__ */ jsxRuntime.jsx(Separator, {}) : null
      ]
    }
  );
}
Navbar.displayName = "Navbar";
function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
function paginationWindow(current, totalPages, siblingCount) {
  if (totalPages <= 0) return [];
  const totalNumbers = siblingCount * 2 + 3;
  if (totalPages <= totalNumbers) return range(1, totalPages);
  const left = Math.max(2, current - siblingCount);
  const right = Math.min(totalPages - 1, current + siblingCount);
  const showLeftEllipsis = left > 2;
  const showRightEllipsis = right < totalPages - 1;
  const items = [1];
  if (showLeftEllipsis) items.push("ellipsis");
  items.push(...range(left, right));
  if (showRightEllipsis) items.push("ellipsis");
  items.push(totalPages);
  return items;
}
var Pagination = React9__namespace.forwardRef(
  ({
    total,
    pageSize = 10,
    value,
    defaultValue = 1,
    onChange,
    pageCount: pageCountProp,
    siblingCount = 1,
    showFirstLast = true,
    disabled,
    className,
    "aria-label": ariaLabel = "Pagination",
    ...props
  }, ref) => {
    const pageCount = Math.max(1, pageCountProp ?? Math.ceil(total / Math.max(1, pageSize)));
    const isControlled = value !== void 0;
    const [internalPage, setInternalPage] = React9__namespace.useState(
      () => Math.min(Math.max(1, defaultValue), pageCount)
    );
    React9__namespace.useEffect(() => {
      if (!isControlled) {
        setInternalPage((p) => Math.min(Math.max(1, p), pageCount));
      }
    }, [isControlled, pageCount]);
    const current = isControlled ? Math.min(Math.max(1, value), pageCount) : internalPage;
    const setPage = (next) => {
      const clamped = Math.min(Math.max(1, next), pageCount);
      if (!isControlled) setInternalPage(clamped);
      onChange?.(clamped);
    };
    const windowItems = paginationWindow(current, pageCount, siblingCount);
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "nav",
      {
        ref,
        "aria-label": ariaLabel,
        className: cn("flex flex-wrap items-center justify-center gap-1", className),
        ...props,
        children: [
          showFirstLast ? /* @__PURE__ */ jsxRuntime.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              iconOnly: true,
              "aria-label": "First page",
              disabled: disabled || current <= 1,
              onClick: () => setPage(1),
              left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronsLeft, { className: "h-4 w-4" })
            }
          ) : null,
          /* @__PURE__ */ jsxRuntime.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              iconOnly: true,
              "aria-label": "Previous page",
              disabled: disabled || current <= 1,
              onClick: () => setPage(current - 1),
              left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { className: "h-4 w-4" })
            }
          ),
          windowItems.map(
            (item, i) => item === "ellipsis" ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "span", size: "sm", variant: "muted", className: "px-1", children: "\u2026" }, `e-${i}`) : /* @__PURE__ */ jsxRuntime.jsx(
              Button,
              {
                variant: item === current ? "primary" : "outline",
                size: "sm",
                disabled,
                "aria-label": `Page ${item}`,
                "aria-current": item === current ? "page" : void 0,
                onClick: () => setPage(item),
                className: "min-w-9 px-2",
                children: item
              },
              item
            )
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              iconOnly: true,
              "aria-label": "Next page",
              disabled: disabled || current >= pageCount,
              onClick: () => setPage(current + 1),
              left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: "h-4 w-4" })
            }
          ),
          showFirstLast ? /* @__PURE__ */ jsxRuntime.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              iconOnly: true,
              "aria-label": "Last page",
              disabled: disabled || current >= pageCount,
              onClick: () => setPage(pageCount),
              left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronsRight, { className: "h-4 w-4" })
            }
          ) : null
        ]
      }
    );
  }
);
Pagination.displayName = "Pagination";
var STEP_VERTICAL_ITEM_PAD = "pb-5 last:pb-0";
var STEP_LABEL_GAP = "gap-2";
function resolveStatus(step, index, active) {
  if (step.status) return step.status;
  if (index < active) return "complete";
  if (index === active) return "current";
  return "upcoming";
}
function StepCircle({
  index,
  status,
  onChange,
  allowBack
}) {
  const circleClass = status === "complete" ? "border-primary bg-primary text-primary-foreground" : status === "current" ? "border-primary bg-background text-primary ring-2 ring-ring ring-offset-2 ring-offset-background" : status === "error" ? "border-destructive bg-destructive/10 text-destructive" : "border-border bg-muted/40 text-muted-foreground";
  const canClick = onChange && (status === "current" || status === "complete" && allowBack);
  const inner = status === "complete" ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { className: "h-4 w-4", strokeWidth: 2.5 }) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm font-semibold tabular-nums", children: index + 1 });
  if (onChange) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      Button,
      {
        variant: "ghost",
        size: "sm",
        className: cn(
          "h-9 w-9 shrink-0 rounded-full border-2 p-0",
          circleClass,
          !canClick && "pointer-events-none cursor-default hover:bg-transparent"
        ),
        "aria-current": status === "current" ? "step" : void 0,
        onClick: () => canClick && onChange(index),
        children: inner
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold tabular-nums",
        circleClass
      ),
      "aria-current": status === "current" ? "step" : void 0,
      children: status === "complete" ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { className: "h-4 w-4", strokeWidth: 2.5 }) : index + 1
    }
  );
}
var Stepper = React9__namespace.forwardRef(
  ({
    steps = [],
    value,
    defaultValue = 0,
    onChange,
    orientation = "horizontal",
    allowBack = true,
    horizontalGap = "none",
    className,
    ...props
  }, ref) => {
    const [internal, setInternal] = React9__namespace.useState(defaultValue);
    const isControlled = value !== void 0;
    const active = isControlled ? value : internal;
    const setStep = (next) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    };
    const stepChange = onChange ? (i) => setStep(i) : void 0;
    return /* @__PURE__ */ jsxRuntime.jsx("div", { ref, role: "navigation", "aria-label": "Progress", className: cn("w-full", className), ...props, children: orientation === "vertical" ? /* @__PURE__ */ jsxRuntime.jsxs("ol", { className: "relative flex list-none flex-col", children: [
      steps.length > 1 ? /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          className: "pointer-events-none absolute bottom-5 left-[1.125rem] top-[1.125rem] w-px -translate-x-1/2 bg-border",
          "aria-hidden": true
        }
      ) : null,
      steps.map((step, index) => {
        const status = resolveStatus(step, index, active);
        return /* @__PURE__ */ jsxRuntime.jsxs("li", { className: cn("relative z-[1] flex gap-3", STEP_VERTICAL_ITEM_PAD), children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex shrink-0 flex-col items-center", children: /* @__PURE__ */ jsxRuntime.jsx(
            StepCircle,
            {
              index,
              status,
              onChange: stepChange,
              allowBack
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex min-w-0 flex-col pt-1.5", STEP_LABEL_GAP), children: [
            /* @__PURE__ */ jsxRuntime.jsxs(Text, { as: "div", size: "sm", weight: "medium", className: "block leading-tight", children: [
              step.label,
              step.optional ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ml-1 text-xs font-normal text-muted-foreground", children: "(optional)" }) : null
            ] }),
            step.description ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "2xs", variant: "muted", className: "block w-full leading-snug", children: step.description }) : null
          ] })
        ] }, index);
      })
    ] }) : /* @__PURE__ */ jsxRuntime.jsxs("ol", { className: "relative flex w-full list-none flex-row items-start gap-0", children: [
      steps.length > 1 ? /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          className: "pointer-events-none absolute inset-x-0 top-[1.125rem] h-0.5 -translate-y-1/2 bg-border",
          style: {
            left: `${100 / steps.length / 2}%`,
            right: `${100 / steps.length / 2}%`
          },
          "aria-hidden": true
        }
      ) : null,
      steps.map((step, index) => {
        const status = resolveStatus(step, index, active);
        return /* @__PURE__ */ jsxRuntime.jsxs(
          "li",
          {
            className: cn(
              "relative z-[1] flex min-h-0 min-w-0 flex-1 basis-0 flex-col items-center text-center",
              horizontalGap === "md" && index > 0 && "ml-4",
              STEP_LABEL_GAP
            ),
            children: [
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex w-full items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(
                StepCircle,
                {
                  index,
                  status,
                  onChange: stepChange,
                  allowBack
                }
              ) }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex w-full flex-col items-center px-1", STEP_LABEL_GAP), children: [
                /* @__PURE__ */ jsxRuntime.jsxs(Text, { as: "div", size: "sm", weight: "medium", className: "block w-full leading-tight", children: [
                  step.label,
                  step.optional ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "ml-1 text-xs font-normal text-muted-foreground", children: "(optional)" }) : null
                ] }),
                step.description ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "2xs", variant: "muted", className: "block w-full leading-snug", children: step.description }) : null
              ] })
            ]
          },
          index
        );
      })
    ] }) });
  }
);
Stepper.displayName = "Stepper";
var tabsListVariants = classVarianceAuthority.cva("inline-flex h-10 items-center gap-1 rounded-md text-muted-foreground", {
  variants: {
    variant: {
      default: "bg-muted/50 p-1",
      underline: "h-auto gap-0 border-b border-border bg-transparent p-0",
      pill: "h-auto flex-wrap gap-2 bg-transparent p-0"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
var tabsTriggerVariants = classVarianceAuthority.cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "aria-selected:bg-background aria-selected:text-foreground aria-selected:shadow-sm",
        underline: "rounded-none border-b-2 border-transparent px-3 pb-2 pt-1 aria-selected:border-primary aria-selected:text-foreground",
        pill: "rounded-full border border-transparent px-3 py-1.5 aria-selected:border-border aria-selected:bg-background aria-selected:text-foreground aria-selected:shadow-sm"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function firstEnabledValue3(items) {
  return items.find((i) => !i.disabled)?.value ?? items[0]?.value;
}
var Tabs = React9__namespace.forwardRef(
  ({
    items,
    orientation = "horizontal",
    variant = "default",
    className,
    listClassName,
    value,
    defaultValue,
    onValueChange,
    ...props
  }, ref) => {
    const autoDefault = value === void 0 && defaultValue === void 0 ? firstEnabledValue3(items) : void 0;
    const initial = defaultValue ?? autoDefault ?? "";
    const [internal, setInternal] = React9__namespace.useState(initial);
    const isControlled = value !== void 0;
    const active = isControlled ? value : internal;
    const setTab = (next) => {
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    };
    const enabledValues = React9__namespace.useMemo(() => items.filter((i) => !i.disabled).map((i) => i.value), [items]);
    const tabIds = React9__namespace.useId();
    const onTabListKeyDown = (e) => {
      const horizontal = orientation === "horizontal";
      const prevKey = horizontal ? "ArrowLeft" : "ArrowUp";
      const nextKey = horizontal ? "ArrowRight" : "ArrowDown";
      if (![prevKey, nextKey, "Home", "End"].includes(e.key)) return;
      const idx = enabledValues.indexOf(active);
      if (idx < 0 && enabledValues.length) {
        e.preventDefault();
        setTab(enabledValues[0]);
        return;
      }
      let nextIdx = idx;
      if (e.key === prevKey) nextIdx = Math.max(0, idx - 1);
      else if (e.key === nextKey) nextIdx = Math.min(enabledValues.length - 1, idx + 1);
      else if (e.key === "Home") nextIdx = 0;
      else if (e.key === "End") nextIdx = enabledValues.length - 1;
      if (nextIdx !== idx && enabledValues[nextIdx]) {
        e.preventDefault();
        setTab(enabledValues[nextIdx]);
      }
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        className: cn(orientation === "vertical" && "flex gap-4", className),
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              role: "tablist",
              "aria-orientation": orientation,
              "aria-label": "Tabs",
              onKeyDown: onTabListKeyDown,
              className: cn(
                tabsListVariants({ variant }),
                orientation === "vertical" && "flex h-auto min-w-[10rem] flex-col items-stretch",
                listClassName
              ),
              children: items.map((item) => {
                const selected = active === item.value;
                return /* @__PURE__ */ jsxRuntime.jsxs(
                  "button",
                  {
                    type: "button",
                    role: "tab",
                    id: `${tabIds}-tab-${item.value}`,
                    "aria-selected": selected,
                    "aria-controls": `${tabIds}-panel-${item.value}`,
                    tabIndex: selected ? 0 : -1,
                    disabled: item.disabled,
                    className: cn(tabsTriggerVariants({ variant })),
                    onClick: () => !item.disabled && setTab(item.value),
                    children: [
                      item.left ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "inline-flex shrink-0 text-muted-foreground", children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: item.left, size: "sm" }) }) : null,
                      /* @__PURE__ */ jsxRuntime.jsx("span", { children: item.label }),
                      item.badge != null ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "span", size: "2xs", variant: "muted", className: "tabular-nums", children: item.badge }) : null
                    ]
                  },
                  item.value
                );
              })
            }
          ),
          items.map((item) => {
            const selected = active === item.value;
            return /* @__PURE__ */ jsxRuntime.jsx(
              "div",
              {
                role: "tabpanel",
                id: `${tabIds}-panel-${item.value}`,
                "aria-labelledby": `${tabIds}-tab-${item.value}`,
                hidden: !selected,
                className: cn(
                  "mt-3 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  orientation === "vertical" && "mt-0 flex-1"
                ),
                children: item.content != null ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm leading-relaxed text-foreground", children: item.content }) : null
              },
              item.value
            );
          })
        ]
      }
    );
  }
);
Tabs.displayName = "Tabs";
var toneCompoundVariants = [
  { tone: "neutral", variant: "solid", class: "border-transparent bg-muted text-foreground" },
  { tone: "neutral", variant: "outline", class: "border-border" },
  { tone: "info", variant: "solid", class: "border-transparent bg-info text-info-foreground" },
  { tone: "info", variant: "subtle", class: "border-info/30 bg-info/10 text-info" },
  { tone: "info", variant: "outline", class: "border-info/40 text-info" },
  { tone: "success", variant: "solid", class: "border-transparent bg-success text-success-foreground" },
  { tone: "success", variant: "subtle", class: "border-success/30 bg-success/10 text-success" },
  { tone: "success", variant: "outline", class: "border-success/40 text-success" },
  { tone: "warning", variant: "solid", class: "border-transparent bg-warning text-warning-foreground" },
  { tone: "warning", variant: "subtle", class: "border-warning/30 bg-warning/10 text-warning" },
  { tone: "warning", variant: "outline", class: "border-warning/40 text-warning" },
  { tone: "danger", variant: "solid", class: "border-transparent bg-destructive text-destructive-foreground" },
  { tone: "danger", variant: "subtle", class: "border-destructive/30 bg-destructive/10 text-destructive" },
  { tone: "danger", variant: "outline", class: "border-destructive/40 text-destructive" }
];
var feedbackVariantOptions = {
  tone: {
    neutral: "",
    info: "",
    success: "",
    warning: "",
    danger: ""
  },
  variant: {
    solid: "",
    subtle: "bg-muted/40",
    outline: "bg-background"
  }
};
function feedbackSurfaceVariants(base, defaultVariants) {
  return classVarianceAuthority.cva(base, {
    variants: feedbackVariantOptions,
    compoundVariants: toneCompoundVariants,
    defaultVariants
  });
}
var alertVariants = feedbackSurfaceVariants("relative flex w-full gap-3 rounded-lg border p-4", {
  tone: "neutral",
  variant: "subtle"
});
var Alert = React9__namespace.forwardRef(
  ({
    tone,
    variant,
    title,
    description,
    left,
    action,
    dismissible,
    onClose,
    className,
    children,
    role = "alert",
    ...props
  }, ref) => {
    const [dismissed, setDismissed] = React9__namespace.useState(false);
    if (dismissed) {
      return null;
    }
    const handleDismiss = () => {
      setDismissed(true);
      onClose?.();
    };
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, role, className: cn(alertVariants({ tone, variant }), className), ...props, children: [
      left ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 pt-0.5", children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: left, size: "md" }) }) : null,
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0 flex-1 flex flex-col gap-1", children: [
        title ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "sm", weight: "semibold", children: title }) : null,
        description ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "sm", className: "text-current opacity-80", children: description }) : null,
        children,
        action ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "pt-2", children: action }) : null
      ] }),
      dismissible ? /* @__PURE__ */ jsxRuntime.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          iconOnly: true,
          "aria-label": "Dismiss",
          className: "absolute right-2 top-2 h-8 w-8 shrink-0 text-current",
          onClick: handleDismiss,
          left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" })
        }
      ) : null
    ] });
  }
);
Alert.displayName = "Alert";
var toastVariants = feedbackSurfaceVariants(
  "pointer-events-auto relative flex w-full max-w-sm gap-3 rounded-lg border p-4 shadow-lg",
  { tone: "neutral", variant: "solid" }
);
function Toast({
  tone,
  variant,
  title,
  description,
  action,
  left,
  dismissible = true,
  onClose,
  className
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "status", className: cn(toastVariants({ tone, variant }), className), children: [
    left ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 pt-0.5", children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: left, size: "md" }) }) : null,
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0 flex-1 flex flex-col gap-1 pr-6", children: [
      title ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "sm", weight: "semibold", children: title }) : null,
      description ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "sm", className: "text-current opacity-80", children: description }) : null,
      action ? /* @__PURE__ */ jsxRuntime.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: "h-auto px-0 text-current hover:bg-transparent",
          label: action.label,
          onClick: action.onClick
        }
      ) : null
    ] }),
    dismissible && onClose ? /* @__PURE__ */ jsxRuntime.jsx(
      Button,
      {
        variant: "ghost",
        size: "sm",
        iconOnly: true,
        "aria-label": "Dismiss",
        className: "absolute right-2 top-2 h-8 w-8 shrink-0 text-current",
        onClick: onClose,
        left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" })
      }
    ) : null
  ] });
}
Toast.displayName = "Toast";
var toasts = [];
var listeners = /* @__PURE__ */ new Set();
function emit() {
  listeners.forEach((listener) => listener([...toasts]));
}
function genId() {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
function subscribeToasts(listener) {
  listeners.add(listener);
  listener([...toasts]);
  return () => {
    listeners.delete(listener);
  };
}
function dismissToast(id) {
  const item = toasts.find((t) => t.id === id);
  toasts = toasts.filter((t) => t.id !== id);
  item?.onClose?.();
  emit();
}
function toast(input) {
  const id = genId();
  const record = { id, duration: 5e3, dismissible: true, ...input };
  toasts = [...toasts, record];
  emit();
  return id;
}
function clearToasts() {
  toasts = [];
  emit();
}
var positionClasses = {
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end"
};
function Toaster({ position = "bottom-right", maxVisible = 5, className }) {
  const [items, setItems] = React9__namespace.useState([]);
  React9__namespace.useEffect(() => subscribeToasts(setItems), []);
  const visible = items.slice(-maxVisible);
  React9__namespace.useEffect(() => {
    const timers = visible.map((item) => {
      if (!item.duration || item.duration <= 0) return null;
      return window.setTimeout(() => dismissToast(item.id), item.duration);
    });
    return () => timers.forEach((t) => t != null && clearTimeout(t));
  }, [visible]);
  if (typeof document === "undefined") return null;
  return reactDom.createPortal(
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        "aria-live": "polite",
        "aria-relevant": "additions",
        className: cn(
          "pointer-events-none fixed z-toast flex w-full max-w-sm flex-col gap-2",
          positionClasses[position],
          className
        ),
        children: visible.map((item) => /* @__PURE__ */ jsxRuntime.jsx(
          Toast,
          {
            ...item,
            onClose: () => dismissToast(item.id)
          },
          item.id
        ))
      }
    ),
    document.body
  );
}
Toaster.displayName = "Toaster";
var overlayVariants = classVarianceAuthority.cva(
  "inset-0 bg-background/80 transition-opacity data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
  {
    variants: {
      blur: {
        true: "backdrop-blur-sm",
        false: ""
      }
    },
    defaultVariants: {
      blur: false
    }
  }
);
var OverlayPortalParentContext = React9__namespace.createContext(null);
function isPortalRef(value) {
  if (value === null || typeof value !== "object") return false;
  if (typeof HTMLElement !== "undefined" && value instanceof HTMLElement) return false;
  return "current" in value;
}
function resolvePortalTarget(container, parentHost) {
  if (container === void 0 || container === null || container === "body") {
    return typeof document !== "undefined" ? document.body : null;
  }
  if (container === "parent") {
    if (parentHost) return parentHost;
    return typeof document !== "undefined" ? document.body : null;
  }
  if (isPortalRef(container)) {
    return container.current;
  }
  return container;
}
function OverlayPortalScope({
  children,
  className
}) {
  const [host, setHost] = React9__namespace.useState(null);
  return /* @__PURE__ */ jsxRuntime.jsx(OverlayPortalParentContext.Provider, { value: host, children: /* @__PURE__ */ jsxRuntime.jsx("div", { ref: setHost, className: cn("relative isolate", className), children }) });
}
function Overlay({
  open = false,
  onClose,
  container,
  blur,
  showCloseButton = false,
  closeOnBackdropClick = true,
  className,
  children
}) {
  const parentHost = React9__namespace.useContext(OverlayPortalParentContext);
  const target = resolvePortalTarget(container, parentHost);
  const viewportFixed = typeof document !== "undefined" && target !== null && target === document.body;
  const node = /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      role: "presentation",
      "data-state": open ? "open" : "closed",
      "aria-hidden": !open,
      className: cn(
        overlayVariants({ blur }),
        viewportFixed ? "fixed z-overlay" : "absolute z-10",
        !open && "pointer-events-none opacity-0",
        className
      ),
      onClick: (e) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) onClose?.();
      },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "div",
          {
            className: "pointer-events-auto min-h-0 min-w-0 max-w-full",
            onClick: (e) => e.stopPropagation(),
            onPointerDown: (e) => e.stopPropagation(),
            children
          }
        ),
        showCloseButton && onClose ? /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Close",
            className: cn(
              "pointer-events-auto absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full",
              "border border-border bg-background text-foreground shadow-md",
              "hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            ),
            onClick: (e) => {
              e.stopPropagation();
              onClose();
            },
            children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4", strokeWidth: 2, "aria-hidden": true })
          }
        ) : null
      ]
    }
  );
  if (!open) return null;
  if (!target) return null;
  return reactDom.createPortal(node, target);
}
Overlay.displayName = "Overlay";
function LoadingOverlay({
  open,
  message,
  blur = false,
  className,
  container,
  spinnerSize = "lg"
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Overlay,
    {
      open,
      blur,
      closeOnBackdropClick: false,
      container,
      className: cn("flex items-center justify-center p-6", className),
      children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex max-w-sm flex-col items-center gap-3 text-center", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Spinner, { size: spinnerSize }),
        message != null && message !== "" ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-muted-foreground", children: message }) : null
      ] })
    }
  );
}
LoadingOverlay.displayName = "LoadingOverlay";
var emptyStateVariants = classVarianceAuthority.cva("mx-auto flex flex-col items-center justify-center text-center", {
  variants: {
    variant: {
      default: "rounded-xl border border-border bg-card/40 px-6 py-8 shadow-sm ring-1 ring-border/60",
      minimal: "rounded-md border-0 bg-transparent py-4 text-muted-foreground",
      spacious: "max-w-2xl rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted/20 px-10 py-16",
      error: "rounded-xl border-2 border-destructive/45 bg-destructive/[0.07] px-6 py-8 text-destructive shadow-sm"
    },
    size: {
      sm: "max-w-sm gap-2",
      md: "max-w-md gap-3",
      lg: "max-w-lg gap-4"
    }
  },
  compoundVariants: [
    { variant: "minimal", size: "sm", class: "gap-1.5 py-3" },
    { variant: "spacious", size: "lg", class: "gap-6 py-20" }
  ],
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});
var EmptyState = React9__namespace.forwardRef(
  ({ variant, size, title, description, icon, action, className, ...props }, ref) => {
    const iconMuted = variant === "minimal" ? "text-muted-foreground/80" : variant === "error" ? "text-destructive/80" : "text-muted-foreground";
    return /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        ref,
        role: "status",
        className: cn(emptyStateVariants({ variant, size }), className),
        ...props,
        children: [
          icon ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: iconMuted, children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: icon, size: variant === "spacious" && size === "lg" ? "xl" : "lg" }) }) : null,
          title ? /* @__PURE__ */ jsxRuntime.jsx(
            Text,
            {
              as: "div",
              size: size === "lg" ? "xl" : variant === "minimal" ? "sm" : "lg",
              weight: "semibold",
              variant: variant === "error" ? "danger" : "default",
              children: title
            }
          ) : null,
          description ? /* @__PURE__ */ jsxRuntime.jsx(
            Text,
            {
              as: "div",
              size: "sm",
              variant: variant === "error" ? "danger" : "muted",
              className: cn("max-w-sm", variant === "error" && "opacity-90"),
              children: description
            }
          ) : null,
          action ? /* @__PURE__ */ jsxRuntime.jsx(
            Button,
            {
              variant: action.variant ?? (variant === "error" ? "destructive" : "primary"),
              size: size === "sm" ? "sm" : "md",
              loading: action.loading,
              disabled: action.disabled,
              onClick: action.onClick,
              className: cn("mt-1", variant === "minimal" && "mt-0"),
              children: action.label
            }
          ) : null
        ]
      }
    );
  }
);
EmptyState.displayName = "EmptyState";
var pillSurfaceVariants = classVarianceAuthority.cva("inline-flex w-fit max-w-full items-center", {
  variants: {
    appearance: {
      solid: "",
      subtle: "",
      outline: "",
      ghost: ""
    },
    size: {
      sm: "h-5 px-2",
      md: "h-6 px-2.5"
    },
    tone: {
      neutral: "",
      info: "",
      success: "",
      warning: "",
      danger: ""
    },
    shape: {
      rounded: "rounded-md",
      pill: "rounded-full"
    },
    selected: {
      true: "ring-2 ring-primary/40",
      false: ""
    }
  },
  compoundVariants: [
    { appearance: "solid", tone: "neutral", class: "border border-foreground bg-foreground text-background" },
    { appearance: "subtle", tone: "neutral", class: "border border-border bg-muted text-foreground" },
    { appearance: "outline", tone: "neutral", class: "border border-border text-foreground" },
    { appearance: "ghost", tone: "neutral", class: "text-foreground" },
    { appearance: "solid", tone: "info", class: "border border-info bg-info text-info-foreground" },
    { appearance: "subtle", tone: "info", class: "border border-info/30 bg-info/15 text-info" },
    { appearance: "outline", tone: "info", class: "border border-info/50 text-info" },
    { appearance: "ghost", tone: "info", class: "text-info" },
    { appearance: "solid", tone: "success", class: "border border-success bg-success text-success-foreground" },
    { appearance: "subtle", tone: "success", class: "border border-success/30 bg-success/15 text-success" },
    { appearance: "outline", tone: "success", class: "border border-success/50 text-success" },
    { appearance: "ghost", tone: "success", class: "text-success" },
    { appearance: "solid", tone: "warning", class: "border border-warning bg-warning text-warning-foreground" },
    { appearance: "subtle", tone: "warning", class: "border border-warning/30 bg-warning/20 text-warning" },
    { appearance: "outline", tone: "warning", class: "border border-warning/50 text-warning" },
    { appearance: "ghost", tone: "warning", class: "text-warning" },
    { appearance: "solid", tone: "danger", class: "border border-destructive bg-destructive text-destructive-foreground" },
    { appearance: "subtle", tone: "danger", class: "border border-destructive/30 bg-destructive/15 text-destructive" },
    { appearance: "outline", tone: "danger", class: "border border-destructive/50 text-destructive" },
    { appearance: "ghost", tone: "danger", class: "text-destructive" }
  ],
  defaultVariants: {
    appearance: "subtle",
    size: "md",
    tone: "neutral",
    shape: "pill",
    selected: false
  }
});
var toggleSurfaceVariants = classVarianceAuthority.cva(
  cn("inline-flex w-fit max-w-full items-center font-medium transition-colors", focusRing, focusRingOffset, disabledControl),
  {
    variants: {
      toggleSurface: {
        primary: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90",
        outline: "border border-border bg-background text-foreground hover:bg-muted",
        ghost: "border-transparent bg-transparent text-foreground hover:bg-muted"
      },
      size: {
        sm: "h-5 px-2",
        md: "h-6 px-2.5"
      },
      shape: {
        rounded: "rounded-md",
        pill: "rounded-full"
      }
    },
    defaultVariants: {
      toggleSurface: "secondary",
      size: "md",
      shape: "pill"
    }
  }
);
var pillTextSize = {
  sm: "xs",
  md: "sm"
};
var Pill = React9__namespace.forwardRef(
  ({
    as = "span",
    appearance,
    size,
    tone,
    shape,
    selected,
    variant,
    left,
    right,
    onRemove,
    dot,
    disabled,
    toggleSurface,
    loading,
    className,
    children,
    ...props
  }, ref) => {
    const resolvedSize = size ?? "md";
    const resolvedToggleSurface = toggleSurface != null && toggleSurface !== "" ? toggleSurface : void 0;
    const busy = Boolean(loading);
    const isDisabled = disabled || busy;
    const removeBtn = onRemove && !isDisabled ? /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        type: "button",
        onClick: (e) => {
          e.stopPropagation();
          onRemove();
        },
        className: cn(
          "-mr-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
          "text-current opacity-70 hover:opacity-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
        ),
        "aria-label": "Remove",
        children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-3.5 w-3.5", strokeWidth: 2 })
      }
    ) : void 0;
    const spinnerSize = resolvedSize === "sm" ? "xs" : "sm";
    const mergedRight = busy || removeBtn != null || right != null ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      busy ? /* @__PURE__ */ jsxRuntime.jsx(Spinner, { size: spinnerSize }) : right,
      !busy ? removeBtn : null
    ] }) : void 0;
    const shellClass = resolvedToggleSurface != null ? cn(
      toggleSurfaceVariants({ toggleSurface: resolvedToggleSurface, size, shape }),
      selected && "ring-2 ring-primary/40 ring-offset-2 ring-offset-background"
    ) : pillSurfaceVariants({ appearance, size, tone, shape, selected });
    return /* @__PURE__ */ jsxRuntime.jsxs(
      Text,
      {
        ref,
        as,
        className: cn(shellClass, onRemove && !isDisabled && "pr-1", className),
        variant: resolvedToggleSurface != null ? "default" : variant ?? "default",
        size: pillTextSize[resolvedSize],
        weight: "medium",
        left,
        right: mergedRight,
        disabled: isDisabled,
        "aria-busy": busy || void 0,
        ...props,
        children: [
          dot ? /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: "mr-1.5 inline-block h-1.5 w-1.5 shrink-0 align-middle rounded-full bg-current",
              "aria-hidden": true
            }
          ) : null,
          children
        ]
      }
    );
  }
);
Pill.displayName = "Pill";
var Badge = React9__namespace.forwardRef(function Badge2(props, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(Pill, { ref, ...props });
});
Badge.displayName = "Badge";
var Tag = React9__namespace.forwardRef(function Tag2({ label, onRemove, variant = "subtle", left, disabled, className, ...props }, ref) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Pill,
    {
      ref,
      as: "span",
      appearance: variant,
      left,
      onRemove,
      disabled,
      className,
      ...props,
      children: label
    }
  );
});
Tag.displayName = "Tag";
var pageHeaderVariants = classVarianceAuthority.cva("w-full", {
  variants: {
    variant: {
      default: "",
      bordered: "rounded-lg border border-border bg-card/40 px-4 py-3",
      minimal: ""
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function PageHeader({
  heading,
  subheading,
  description,
  badge,
  actions,
  left,
  right,
  sticky,
  separator,
  variant,
  className,
  children,
  ...props
}) {
  const resolvedRight = right ?? actions;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      "data-slot": "page-header",
      className: cn(
        pageHeaderVariants({ variant }),
        sticky && "sticky top-0 z-sticky bg-background/95 backdrop-blur",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex min-w-0 flex-1 items-start gap-3", children: [
            left ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 pt-0.5 text-muted-foreground", children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: left, size: "md" }) }) : null,
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0 flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                heading ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "lg", weight: "semibold", children: heading }) : null,
                badge ? typeof badge === "string" ? /* @__PURE__ */ jsxRuntime.jsx(Pill, { appearance: "subtle", children: badge }) : badge : null
              ] }),
              subheading ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "sm", weight: "medium", variant: "muted", children: subheading }) : null,
              description ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "sm", variant: "muted", children: description }) : null,
              children
            ] })
          ] }),
          resolvedRight ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex shrink-0 flex-wrap items-center gap-2", children: resolvedRight }) : null
        ] }),
        separator ? /* @__PURE__ */ jsxRuntime.jsx(Separator, { className: "mt-3" }) : null
      ]
    }
  );
}
PageHeader.displayName = "PageHeader";
var pageFooterVariants = classVarianceAuthority.cva("w-full", {
  variants: {
    variant: {
      default: "border-t border-border bg-background px-4 py-3",
      minimal: "px-4 py-2 text-muted-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function PageFooter({
  left,
  right,
  sticky,
  separator,
  variant,
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "footer",
    {
      className: cn(
        pageFooterVariants({ variant }),
        sticky && "sticky bottom-0 z-sticky bg-background/95 backdrop-blur",
        className
      ),
      ...props,
      children: [
        separator ? /* @__PURE__ */ jsxRuntime.jsx(Separator, { className: "mb-3" }) : null,
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 text-sm", children: [
          left ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-w-0", children: left }) : null,
          children ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-w-0 flex-1", children }) : null,
          right ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "ml-auto shrink-0", children: right }) : null
        ] })
      ]
    }
  );
}
PageFooter.displayName = "PageFooter";
var heroVariants = classVarianceAuthority.cva("w-full", {
  variants: {
    variant: {
      default: "rounded-xl border border-border bg-card/40 p-8",
      centered: "rounded-xl border border-border bg-card/40 px-8 py-12 text-center",
      split: "grid gap-8 rounded-xl border border-border bg-card/40 p-8 md:grid-cols-2 md:items-center"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function Hero({
  title,
  description,
  image,
  badge,
  actions,
  variant = "default",
  className,
  children,
  ...props
}) {
  const content = /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex flex-col gap-4", variant === "centered" && "items-center text-center"), children: [
    badge ? typeof badge === "string" ? /* @__PURE__ */ jsxRuntime.jsx(Pill, { appearance: "subtle", tone: "info", className: "self-start", children: badge }) : badge : null,
    title ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "2xl", weight: "bold", className: variant === "centered" ? "mx-auto max-w-2xl" : void 0, children: title }) : null,
    description ? /* @__PURE__ */ jsxRuntime.jsx(
      Text,
      {
        as: "p",
        size: "md",
        variant: "muted",
        className: cn("max-w-2xl", variant === "centered" && "mx-auto"),
        children: description
      }
    ) : null,
    actions?.primary || actions?.secondary ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex flex-wrap gap-2", variant === "centered" && "justify-center"), children: [
      actions.secondary ? /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "outline", ...actions.secondary }) : null,
      actions.primary ? /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "primary", ...actions.primary }) : null
    ] }) : null,
    children
  ] });
  if (variant === "split" && image) {
    return /* @__PURE__ */ jsxRuntime.jsxs("section", { className: cn(heroVariants({ variant }), className), ...props, children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-col gap-4", children: content }),
      /* @__PURE__ */ jsxRuntime.jsx(Image, { src: image, alt: "", className: "h-56 w-full rounded-lg md:h-72", fit: "cover", variant: "rounded" })
    ] });
  }
  const effectiveVariant = variant === "split" && !image ? "default" : variant;
  return /* @__PURE__ */ jsxRuntime.jsxs("section", { className: cn(heroVariants({ variant: effectiveVariant }), "space-y-4", className), ...props, children: [
    image && variant !== "split" ? /* @__PURE__ */ jsxRuntime.jsx(Image, { src: image, alt: "", className: "mb-4 h-40 w-full rounded-lg", fit: "cover", variant: "rounded" }) : null,
    content
  ] });
}
Hero.displayName = "Hero";
function AuthLayout({ title, subtitle, logo, footer, children, className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("flex min-h-screen items-center justify-center bg-muted/30 p-4", className), ...props, children: /* @__PURE__ */ jsxRuntime.jsxs(Card, { className: "w-full max-w-md p-6 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mb-6 space-y-2 text-center", children: [
      logo ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mb-2 flex justify-center", children: logo }) : null,
      title ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "xl", weight: "semibold", children: title }) : null,
      subtitle ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "p", size: "sm", variant: "muted", children: subtitle }) : null
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-4", children }),
    footer ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-6 border-t border-border pt-4 text-center text-sm text-muted-foreground", children: footer }) : null
  ] }) });
}
AuthLayout.displayName = "AuthLayout";
function AppShell({ sidebar, header, footer, children, className, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex h-full min-h-0 w-full max-w-full overflow-hidden bg-background", className), ...props, children: [
    sidebar ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex h-full min-h-0 shrink-0 flex-col", children: sidebar }) : null,
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex h-full min-h-0 min-w-0 flex-1 flex-col", children: [
      header ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "shrink-0", children: header }) : null,
      /* @__PURE__ */ jsxRuntime.jsx("main", { className: "relative min-h-0 flex-1 overflow-y-auto p-4 md:p-6", children }),
      footer ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "shrink-0", children: footer }) : null
    ] })
  ] });
}
AppShell.displayName = "AppShell";
function HistoryControlButtons({
  canUndo = true,
  canRedo = true,
  canReset = true,
  onUndo,
  onRedo,
  onReset,
  showUndo = true,
  showRedo = true,
  showLabels = false,
  undoButtonProps,
  redoButtonProps,
  resetButtonProps,
  className,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("inline-flex items-center gap-1", className), ...rest, children: [
    showUndo ? /* @__PURE__ */ jsxRuntime.jsx(Tooltip, { content: "Undo", children: /* @__PURE__ */ jsxRuntime.jsx(
      Button,
      {
        variant: "outline",
        size: "sm",
        disabled: !canUndo,
        left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Undo2, { className: "h-4 w-4" }),
        label: showLabels ? "Undo" : void 0,
        iconOnly: !showLabels,
        "aria-label": "Undo",
        onClick: onUndo,
        ...undoButtonProps
      }
    ) }) : null,
    showRedo ? /* @__PURE__ */ jsxRuntime.jsx(Tooltip, { content: "Redo", children: /* @__PURE__ */ jsxRuntime.jsx(
      Button,
      {
        variant: "outline",
        size: "sm",
        disabled: !canRedo,
        left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Redo2, { className: "h-4 w-4" }),
        label: showLabels ? "Redo" : void 0,
        iconOnly: !showLabels,
        "aria-label": "Redo",
        onClick: onRedo,
        ...redoButtonProps
      }
    ) }) : null,
    onReset ? /* @__PURE__ */ jsxRuntime.jsx(Tooltip, { content: "Reset", children: /* @__PURE__ */ jsxRuntime.jsx(
      Button,
      {
        variant: "ghost",
        size: "sm",
        disabled: !canReset,
        left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.RotateCcw, { className: "h-4 w-4" }),
        label: showLabels ? "Reset" : void 0,
        iconOnly: !showLabels,
        "aria-label": "Reset",
        onClick: onReset,
        ...resetButtonProps
      }
    ) }) : null
  ] });
}
HistoryControlButtons.displayName = "HistoryControlButtons";
var positionVariants = classVarianceAuthority.cva("fixed z-modal flex flex-col gap-2", {
  variants: {
    position: {
      "top-left": "left-4 top-4 items-start",
      "top-right": "right-4 top-4 items-end",
      "bottom-left": "bottom-4 left-4 items-start",
      "bottom-right": "bottom-4 right-4 items-end",
      "left-center": "left-4 top-1/2 -translate-y-1/2 items-start",
      "right-center": "right-4 top-1/2 -translate-y-1/2 items-end"
    }
  },
  defaultVariants: {
    position: "bottom-right"
  }
});
var slideVariants = classVarianceAuthority.cva("transition-all duration-300 ease-out", {
  variants: {
    slideFrom: {
      left: "data-[state=open]:translate-x-0 data-[state=closed]:-translate-x-4 data-[state=closed]:opacity-0",
      right: "data-[state=open]:translate-x-0 data-[state=closed]:translate-x-4 data-[state=closed]:opacity-0",
      top: "data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-4 data-[state=closed]:opacity-0",
      bottom: "data-[state=open]:translate-y-0 data-[state=closed]:translate-y-4 data-[state=closed]:opacity-0"
    }
  },
  defaultVariants: {
    slideFrom: "right"
  }
});
function FixedScreenWidget({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  position = "bottom-right",
  slideFrom = "right",
  trigger,
  triggerProps,
  panelProps,
  offsetX = 0,
  offsetY = 0,
  pointerEvents = "auto",
  closeOnOutsideClick = true,
  closeOnEscape = true,
  children,
  className,
  ...rest
}) {
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange });
  const panelRef = React9__namespace.useRef(null);
  React9__namespace.useEffect(() => {
    if (!open || !closeOnOutsideClick) return;
    const onPointerDown = (e) => {
      if (panelRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [open, closeOnOutsideClick, setOpen]);
  React9__namespace.useEffect(() => {
    if (!open || !closeOnEscape) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open, closeOnEscape, setOpen]);
  const panelHeader = panelProps?.header;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn(positionVariants({ position }), className),
      style: { marginLeft: offsetX, marginTop: offsetY, pointerEvents },
      ...rest,
      children: [
        trigger ? React9__namespace.isValidElement(trigger) ? React9__namespace.cloneElement(trigger, {
          onClick: () => setOpen(!open)
        }) : trigger : /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "primary", onClick: () => setOpen(!open), ...triggerProps, children: triggerProps?.label ?? "Open" }),
        open ? /* @__PURE__ */ jsxRuntime.jsx("div", { ref: panelRef, children: /* @__PURE__ */ jsxRuntime.jsxs(
          Card,
          {
            "data-state": "open",
            className: cn("w-80 max-w-[calc(100vw-2rem)] shadow-lg", slideVariants({ slideFrom })),
            ...panelProps,
            header: void 0,
            children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between gap-2 border-b border-border px-3 py-2", children: [
                panelHeader ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-w-0 flex-1", children: panelHeader }) : /* @__PURE__ */ jsxRuntime.jsx("span", {}),
                /* @__PURE__ */ jsxRuntime.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    iconOnly: true,
                    "aria-label": "Close panel",
                    left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" }),
                    onClick: () => setOpen(false)
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "p-4", children })
            ]
          }
        ) }) : null
      ]
    }
  );
}
FixedScreenWidget.displayName = "FixedScreenWidget";
var modalSurfaceVariants = classVarianceAuthority.cva("relative w-full shadow-lg", {
  variants: {
    size: {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      full: "max-w-[calc(100%-2rem)]"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
var Modal = React9__namespace.forwardRef(function Modal2({
  open: openProp,
  defaultOpen,
  onOpenChange,
  onClose,
  triggerProps,
  header,
  footer,
  showClose = true,
  loading,
  size,
  minHeight,
  maxHeight,
  className,
  cardProps,
  container,
  children
}, ref) {
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange });
  const handleClose = React9__namespace.useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [setOpen, onClose]);
  const resolvedFooter = footer ?? (loading ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntime.jsx(Spinner, { size: "sm" }) }) : null);
  const dialog = /* @__PURE__ */ jsxRuntime.jsx(
    Overlay,
    {
      open,
      onClose: handleClose,
      container,
      blur: true,
      showCloseButton: showClose,
      closeOnBackdropClick: !loading,
      className: "flex items-center justify-center p-4",
      children: /* @__PURE__ */ jsxRuntime.jsx(
        Card,
        {
          ref,
          "data-slot": "modal",
          header,
          footer: resolvedFooter,
          minHeight,
          maxHeight,
          variant: "surface-1",
          size: "md",
          ...cardProps,
          className: cn(modalSurfaceVariants({ size }), className, cardProps?.className),
          children
        }
      )
    }
  );
  if (!triggerProps) return dialog;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      Button,
      {
        variant: triggerProps.variant ?? "primary",
        size: triggerProps.size,
        left: triggerProps.left,
        className: triggerProps.className,
        label: triggerProps.label ?? "Open",
        onClick: () => setOpen(true)
      }
    ),
    dialog
  ] });
});
Modal.displayName = "Modal";
function TriggerModal({
  triggerProps,
  showClose = true,
  ...modalProps
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(Modal, { triggerProps, showClose, ...modalProps });
}
TriggerModal.displayName = "TriggerModal";
var intentButtonVariant = {
  default: "primary",
  destructive: "destructive",
  delete: "destructive",
  save: "primary",
  warning: "primary"
};
function ConfirmModal({
  open: openProp,
  defaultOpen,
  onOpenChange,
  triggerProps,
  heading,
  description,
  left,
  intent = "default",
  confirmProps,
  cancelProps,
  loading,
  container,
  triggerModalProps,
  className,
  size = "md",
  ...rest
}) {
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange });
  const busy = Boolean(loading || confirmProps?.loading);
  const handleClose = React9__namespace.useCallback(() => {
    if (busy) return;
    setOpen(false);
  }, [busy, setOpen]);
  const handleConfirm = React9__namespace.useCallback(async () => {
    await confirmProps.onClick?.();
    handleClose();
  }, [confirmProps, handleClose]);
  const handleCancel = React9__namespace.useCallback(() => {
    cancelProps?.onClick?.();
    handleClose();
  }, [cancelProps, handleClose]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    TriggerModal,
    {
      open,
      onOpenChange: setOpen,
      triggerProps,
      container,
      size,
      showClose: false,
      loading: busy,
      className,
      header: /* @__PURE__ */ jsxRuntime.jsx(
        PageHeader,
        {
          heading,
          description,
          left,
          variant: "minimal"
        }
      ),
      footer: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            label: cancelProps?.label ?? "Cancel",
            disabled: busy,
            onClick: handleCancel
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          Button,
          {
            type: "button",
            variant: intentButtonVariant[intent],
            label: confirmProps.label,
            loading: busy,
            onClick: handleConfirm
          }
        )
      ] }),
      ...triggerModalProps,
      ...rest
    }
  );
}
ConfirmModal.displayName = "ConfirmModal";
function FormModal({
  open: openProp,
  defaultOpen,
  onOpenChange,
  triggerProps,
  heading,
  subheading,
  left,
  mode = "create",
  fields,
  formProps,
  onSubmit,
  onSubmitSuccess,
  onSubmitError,
  submitLabel,
  submittingLabel,
  cancelLabel = "Cancel",
  loading,
  submitDisabled,
  onCancel,
  validateOnSubmit = true,
  container,
  submitButtonProps,
  cancelButtonProps,
  triggerModalProps,
  className,
  children,
  size = "md",
  ...rest
}) {
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange });
  const [submitting, setSubmitting] = React9__namespace.useState(false);
  const busy = Boolean(loading || submitting);
  const resolvedSubmitLabel = busy && submittingLabel ? submittingLabel : submitLabel ?? (mode === "edit" ? "Save changes" : "Create");
  const handleClose = React9__namespace.useCallback(() => {
    if (busy) return;
    setOpen(false);
    onCancel?.();
  }, [busy, setOpen, onCancel]);
  const handleSubmit = React9__namespace.useCallback(
    async (values) => {
      setSubmitting(true);
      try {
        await onSubmit(values);
        onSubmitSuccess?.(values);
        setOpen(false);
      } catch (error) {
        onSubmitError?.(error);
      } finally {
        setSubmitting(false);
      }
    },
    [onSubmit, onSubmitSuccess, onSubmitError, setOpen]
  );
  const initialValues = React9__namespace.useMemo(() => {
    if (formProps?.initialValues) return formProps.initialValues;
    if (!fields) return {};
    return fields.reduce((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {});
  }, [fields, formProps?.initialValues]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    TriggerModal,
    {
      open,
      onOpenChange: setOpen,
      triggerProps,
      container,
      size,
      showClose: !busy,
      loading: busy,
      className,
      header: /* @__PURE__ */ jsxRuntime.jsx(
        PageHeader,
        {
          heading,
          subheading,
          left,
          variant: "minimal"
        }
      ),
      footer: null,
      ...triggerModalProps,
      ...rest,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        Form,
        {
          ...formProps,
          initialValues,
          validateOn: validateOnSubmit ? "submit" : formProps?.validateOn ?? "submit",
          onSubmit: handleSubmit,
          onCancel: handleClose,
          submitLabel: resolvedSubmitLabel,
          cancelLabel,
          loading: busy,
          disabled: submitDisabled || formProps?.disabled,
          submitButtonProps,
          cancelButtonProps,
          children: children ?? fields?.map((field) => /* @__PURE__ */ jsxRuntime.jsx(FormField, { ...field, disabled: field.disabled ?? busy }, field.name))
        }
      )
    }
  );
}
FormModal.displayName = "FormModal";
var avatarVariants = classVarianceAuthority.cva("relative inline-flex shrink-0 bg-muted text-muted-foreground", {
  variants: {
    size: {
      xs: "h-6 w-6 text-[10px]",
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
      xl: "h-16 w-16 text-lg"
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-md"
    }
  },
  defaultVariants: {
    size: "md",
    shape: "circle"
  }
});
var FALLBACK_COLOR_CLASS = {
  muted: "bg-muted text-muted-foreground",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  info: "bg-info text-info-foreground",
  destructive: "bg-destructive text-destructive-foreground"
};
function getAvatarInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}
var Avatar = React9__namespace.forwardRef(
  ({ src, alt, name, color, fallback, status, size, shape, className, style, ...props }, ref) => {
    const [failed, setFailed] = React9__namespace.useState(false);
    const imageNode = src && !failed ? /* @__PURE__ */ jsxRuntime.jsx(
      "img",
      {
        src,
        alt: alt ?? "Avatar",
        className: cn("h-full w-full object-cover", shape === "square" ? "rounded-md" : "rounded-full"),
        onError: () => setFailed(true)
      }
    ) : null;
    const fallbackNode = fallback ?? (name ? getAvatarInitials(name) : alt ? getAvatarInitials(alt) : "?");
    const showImage = Boolean(imageNode);
    const colorClass = color && !showImage ? FALLBACK_COLOR_CLASS[color] : void 0;
    const colorStyle = color && !showImage && !colorClass ? { backgroundColor: color, ...style } : style;
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        className: cn(avatarVariants({ size, shape }), !showImage && colorClass, className),
        style: colorStyle,
        ...props,
        children: /* @__PURE__ */ jsxRuntime.jsx(
          Icon,
          {
            node: imageNode,
            fallback: fallbackNode,
            alt,
            status,
            statusPosition: "bottom-right",
            size: size === "xs" ? "xs" : size === "sm" ? "sm" : size === "lg" ? "lg" : size === "xl" ? "xl" : "md",
            shape: shape === "square" ? "square" : "circle",
            className: "h-full w-full justify-center"
          }
        )
      }
    );
  }
);
Avatar.displayName = "Avatar";
function AvatarGroup({ items = [], max, size = "md", className, ...rest }) {
  const visible = max != null ? items.slice(0, max) : items;
  const overflow = max != null && items.length > max ? items.length - max : 0;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("flex items-center", className), ...rest, children: [
    visible.map((item, index) => /* @__PURE__ */ jsxRuntime.jsx(
      Avatar,
      {
        ...item,
        size,
        className: cn("-ml-2 ring-2 ring-background first:ml-0", item.className)
      },
      index
    )),
    overflow > 0 ? /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        className: cn(
          "-ml-2 flex shrink-0 items-center justify-center ring-2 ring-background",
          "bg-muted text-muted-foreground",
          size === "xs" && "h-6 min-w-[1.5rem] rounded-full text-[10px]",
          size === "sm" && "h-8 min-w-[2rem] rounded-full text-xs",
          size === "md" && "h-10 min-w-[2.5rem] rounded-full text-sm",
          size === "lg" && "h-12 min-w-[3rem] rounded-full text-base",
          size === "xl" && "h-16 min-w-[4rem] rounded-full text-lg"
        ),
        "aria-label": `${overflow} more`,
        children: [
          "+",
          overflow
        ]
      }
    ) : null
  ] });
}
AvatarGroup.displayName = "AvatarGroup";
var progressVariants = classVarianceAuthority.cva("relative w-full overflow-hidden rounded-full bg-muted", {
  variants: {
    size: {
      sm: "h-1.5",
      md: "h-2",
      lg: "h-3"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
var Progress = React9__namespace.forwardRef(
  ({ value, max = 100, showLabel, loading: loadingProp, size, className, ...props }, ref) => {
    const isLoading = Boolean(loadingProp) || value === null;
    const numeric = isLoading ? 0 : value ?? 0;
    const clamped = Math.max(0, Math.min(numeric, max));
    const percent = max > 0 ? clamped / max * 100 : 0;
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "w-full space-y-1", children: [
      showLabel ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "xs", variant: "muted", children: isLoading ? "\u2026" : `${Math.round(percent)}%` }) : null,
      /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          ref,
          role: "progressbar",
          "aria-valuemin": 0,
          "aria-valuemax": max,
          "aria-valuenow": isLoading ? void 0 : clamped,
          "aria-busy": isLoading || void 0,
          "data-state": isLoading ? "indeterminate" : "determinate",
          className: cn(progressVariants({ size }), className),
          ...props,
          children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "relative h-full w-full overflow-hidden rounded-[inherit]", children: isLoading ? /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: "absolute inset-y-0 left-0 w-[32%] min-w-[3rem] rounded-full bg-primary shadow-sm ring-1 ring-primary/25 animate-progress-indeterminate motion-reduce:animate-none",
              "aria-hidden": true
            }
          ) : /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: "h-full rounded-[inherit] bg-primary transition-[width] duration-300 ease-out",
              style: { width: `${percent}%` }
            }
          ) })
        }
      )
    ] });
  }
);
Progress.displayName = "Progress";
var kbdVariants = classVarianceAuthority.cva(
  "inline-flex items-center rounded border border-border bg-muted font-mono text-muted-foreground shadow-sm",
  {
    variants: {
      size: {
        sm: "h-5 px-1.5 text-[10px]",
        md: "h-6 px-2 text-xs"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var Kbd = React9__namespace.forwardRef(({ size, className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx("kbd", { ref, className: cn(kbdVariants({ size }), className), ...props, children }));
Kbd.displayName = "Kbd";
var KbdGroup = React9__namespace.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: cn("inline-flex items-center gap-1", className), ...props }));
KbdGroup.displayName = "KbdGroup";
var groupVariants2 = classVarianceAuthority.cva("flex", {
  variants: {
    gap: {
      sm: "gap-1",
      md: "gap-2",
      lg: "gap-3"
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap overflow-x-auto"
    }
  },
  defaultVariants: {
    gap: "md",
    wrap: true
  }
});
function PillGroup({
  items,
  value,
  defaultValue,
  onChange,
  selectable = false,
  onSelect,
  multiple = true,
  removable = false,
  onRemove,
  maxVisible,
  overflowLabel = "+{count}",
  children,
  size,
  variant,
  toggleSurface,
  loading: groupLoading,
  gap,
  wrap,
  className,
  ...props
}) {
  const groupBusy = Boolean(groupLoading);
  const resolvedToggleSurface = toggleSurface != null && toggleSurface !== "" ? toggleSurface : void 0;
  const initialSelectedValues = React9__namespace.useMemo(() => {
    if (defaultValue) return defaultValue;
    return items.filter((item) => item.selected).map((item) => item.value);
  }, [defaultValue, items]);
  const [internalItems, setInternalItems] = React9__namespace.useState(items);
  const [internalValue, setInternalValue] = React9__namespace.useState(initialSelectedValues);
  React9__namespace.useEffect(() => {
    setInternalItems(items);
  }, [items]);
  const selectedValues = value ?? internalValue;
  const isControlled = value !== void 0;
  const isInteractive = selectable;
  const visibleItems = typeof maxVisible === "number" && maxVisible >= 0 ? internalItems.slice(0, maxVisible) : internalItems;
  const overflowCount = typeof maxVisible === "number" && maxVisible >= 0 ? Math.max(0, internalItems.length - maxVisible) : 0;
  const handleToggle = (item) => {
    if (groupBusy || item.disabled || !selectable) return;
    const isSelected = selectedValues.includes(item.value);
    const next = multiple ? isSelected ? selectedValues.filter((v) => v !== item.value) : [...selectedValues, item.value] : isSelected ? [] : [item.value];
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(next);
    onSelect?.(item, !isSelected);
  };
  const handleRemove = (item) => {
    if (groupBusy || !removable || item.disabled) return;
    setInternalItems((prev) => prev.filter((pill) => pill.value !== item.value));
    if (selectable) {
      const nextSelected = selectedValues.filter((value2) => value2 !== item.value);
      if (!isControlled) {
        setInternalValue(nextSelected);
      }
      onChange?.(nextSelected);
    }
    onRemove?.(item.value);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn(groupVariants2({ gap, wrap }), className), ...props, children: [
    visibleItems.map((item) => {
      const selected = selectable ? selectedValues.includes(item.value) : Boolean(item.selected);
      const badgeClassName = cn(
        isInteractive && !groupBusy && "cursor-pointer hover:opacity-90",
        (item.disabled || groupBusy) && "cursor-not-allowed opacity-60"
      );
      const removeNode2 = removable && !item.disabled ? /* @__PURE__ */ jsxRuntime.jsx(
        "span",
        {
          role: "button",
          tabIndex: 0,
          className: "text-current/70 hover:text-current",
          "aria-label": `Remove ${String(item.label)}`,
          onClick: (event) => {
            event.preventDefault();
            event.stopPropagation();
            handleRemove(item);
          },
          onKeyDown: (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
              handleRemove(item);
            }
          },
          children: "\xD7"
        }
      ) : null;
      return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "inline-flex", children: isInteractive ? /* @__PURE__ */ jsxRuntime.jsx(
        Pill,
        {
          as: "button",
          onClick: () => handleToggle(item),
          disabled: item.disabled || groupBusy,
          "aria-pressed": selectable ? selected : void 0,
          size,
          appearance: resolvedToggleSurface != null ? void 0 : variant,
          tone: item.tone ?? "neutral",
          toggleSurface: resolvedToggleSurface,
          selected,
          left: item.left,
          right: removeNode2,
          className: badgeClassName,
          dot: item.dot,
          loading: !groupBusy && Boolean(item.loading),
          children: item.label
        }
      ) : /* @__PURE__ */ jsxRuntime.jsx(
        Pill,
        {
          size,
          appearance: resolvedToggleSurface != null ? void 0 : variant,
          tone: item.tone ?? "neutral",
          toggleSurface: resolvedToggleSurface,
          selected,
          left: item.left,
          right: removeNode2,
          className: badgeClassName,
          dot: item.dot,
          loading: !groupBusy && Boolean(item.loading),
          disabled: item.disabled || groupBusy,
          children: item.label
        }
      ) }, item.value);
    }),
    overflowCount > 0 && /* @__PURE__ */ jsxRuntime.jsx(Pill, { size, appearance: "outline", tone: "neutral", disabled: groupBusy, children: overflowLabel.replace("{count}", String(overflowCount)) }),
    groupBusy ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "inline-flex items-center self-center pl-1", "aria-busy": true, children: /* @__PURE__ */ jsxRuntime.jsx(Spinner, { size: "sm" }) }) : null,
    children
  ] });
}
PillGroup.displayName = "PillGroup";
var descriptionListVariants = classVarianceAuthority.cva("", {
  variants: {
    layout: {
      horizontal: "",
      vertical: ""
    },
    size: {
      sm: "gap-x-4 gap-y-1 text-sm",
      md: "gap-x-6 gap-y-2 text-sm"
    }
  },
  defaultVariants: {
    layout: "vertical",
    size: "md"
  }
});
var DescriptionList = React9__namespace.forwardRef(
  ({ className, items, layout = "vertical", size, ...props }, ref) => {
    const isHorizontal = layout === "horizontal";
    return /* @__PURE__ */ jsxRuntime.jsx(
      "dl",
      {
        ref,
        "data-slot": "description-list",
        className: cn(
          descriptionListVariants({ layout, size }),
          isHorizontal ? "grid grid-cols-[minmax(8rem,auto)_1fr] sm:grid-cols-[minmax(10rem,auto)_1fr]" : "flex flex-col",
          className
        ),
        ...props,
        children: items.map((item, index) => /* @__PURE__ */ jsxRuntime.jsxs(React9__namespace.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "dt",
            {
              className: cn(
                "font-medium text-foreground",
                isHorizontal ? "col-start-1 py-1" : "pt-2 first:pt-0",
                !isHorizontal && "border-b border-border pb-1"
              ),
              children: item.label
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            "dd",
            {
              className: cn(
                "min-w-0 text-muted-foreground",
                isHorizontal ? "col-start-2 py-1" : "pb-2 last:pb-0"
              ),
              children: item.value
            }
          )
        ] }, index))
      }
    );
  }
);
DescriptionList.displayName = "DescriptionList";
function reactNodeToSearchText(node) {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node).toLowerCase();
  if (Array.isArray(node)) return node.map(reactNodeToSearchText).join(" ");
  if (React9__namespace.isValidElement(node)) {
    const ch = node.props.children;
    return reactNodeToSearchText(ch);
  }
  return "";
}
function defaultListItemFilter(items, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [...items];
  return items.filter((item) => {
    const label = reactNodeToSearchText(item.label);
    const desc = item.description ? reactNodeToSearchText(item.description) : "";
    const val = item.value?.toLowerCase() ?? "";
    return label.includes(q) || desc.includes(q) || val.includes(q);
  });
}
var List = React9__namespace.forwardRef(
  ({
    className,
    items,
    layout = "list",
    listType = "unordered",
    gap,
    direction,
    align,
    justify,
    wrap,
    columns,
    rows,
    minChildWidth,
    columnGap,
    rowGap,
    autoFlow,
    alignItems,
    justifyItems,
    gridGap,
    divider,
    selectable,
    selectedValue: selectedValueProp,
    defaultSelectedValue,
    onSelect,
    emptyState,
    noResultsState,
    loading,
    children,
    header,
    search,
    ...props
  }, ref) => {
    const searchEnabled = search != null && search !== false;
    const searchOptions = typeof search === "object" ? search : {};
    const {
      filter: customFilter,
      defaultQuery,
      value: searchValueProp,
      onChange: onSearchChangeProp,
      onDebouncedChange,
      filterItems = true,
      ...searchInputProps
    } = searchOptions;
    const isSearchControlled = searchValueProp !== void 0;
    const [internalSearchQuery, setInternalSearchQuery] = React9__namespace.useState(() => defaultQuery ?? "");
    const searchQuery = isSearchControlled ? searchValueProp : internalSearchQuery;
    const setSearchQuery = React9__namespace.useCallback(
      (next) => {
        if (!isSearchControlled) setInternalSearchQuery(next);
        onSearchChangeProp?.(next);
      },
      [isSearchControlled, onSearchChangeProp]
    );
    const [debouncedQuery, setDebouncedQuery] = React9__namespace.useState(() => defaultQuery ?? "");
    React9__namespace.useEffect(() => {
      onDebouncedChange?.(debouncedQuery);
    }, [debouncedQuery, onDebouncedChange]);
    const isControlled = selectedValueProp !== void 0;
    const [internalSelected, setInternalSelected] = React9__namespace.useState(defaultSelectedValue);
    const selectedValue = isControlled ? selectedValueProp : internalSelected;
    const filteredItems = React9__namespace.useMemo(() => {
      if (!searchEnabled || !filterItems) return [...items];
      const run = customFilter ?? defaultListItemFilter;
      return [...run(items, debouncedQuery)];
    }, [items, debouncedQuery, searchEnabled, filterItems, customFilter]);
    const select = React9__namespace.useCallback(
      (item) => {
        if (!selectable || item.disabled || item.value == null) return;
        if (!isControlled) setInternalSelected(item.value);
        onSelect?.(item.value, item);
      },
      [selectable, isControlled, onSelect]
    );
    const renderRow = (item, index) => {
      const selected = selectable && item.value != null && selectedValue === item.value;
      return /* @__PURE__ */ jsxRuntime.jsxs(
        "div",
        {
          className: cn(
            "flex min-w-0 items-start gap-3 rounded-md px-2 py-2",
            layout === "grid" && "border border-border",
            selectable && !item.disabled && "cursor-pointer hover:bg-muted/60",
            item.disabled && "cursor-not-allowed opacity-60",
            selected && "bg-muted/80"
          ),
          role: selectable ? "option" : void 0,
          "aria-selected": selectable ? selected : void 0,
          onClick: () => select(item),
          onKeyDown: selectable ? (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              select(item);
            }
          } : void 0,
          tabIndex: selectable && !item.disabled ? 0 : void 0,
          children: [
            item.left ? /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: item.left, size: "sm", className: "mt-0.5 shrink-0" }) : null,
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "sm", weight: "medium", className: "text-foreground", children: item.label }),
              item.description ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "sm", variant: "muted", className: "mt-0.5", children: item.description }) : null
            ] }),
            item.action ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "shrink-0", children: item.action }) : null
          ]
        }
      );
    };
    const listAs = listType === "none" ? "div" : listType === "ordered" ? "ol" : "ul";
    const renderWrappedRow = (item, index) => {
      const row = renderRow(item);
      if (listType === "none") {
        return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-w-0", children: row });
      }
      return /* @__PURE__ */ jsxRuntime.jsx("li", { className: "list-none", children: row });
    };
    const listChrome = listType !== "none" && "list-none pl-0";
    const resolvedGridMin = minChildWidth ?? (columns == null ? "12rem" : void 0);
    const resolvedColumns = resolvedGridMin ? void 0 : columns ?? 2;
    const resolvedGridGap = gridGap ?? gap;
    const body = layout === "list" ? /* @__PURE__ */ jsxRuntime.jsx(
      Stack,
      {
        as: listAs,
        role: selectable ? "listbox" : void 0,
        className: cn(listChrome, divider && "divide-y divide-border"),
        items: filteredItems,
        getItemKey: (item, i) => item.value ?? i,
        renderItem: renderWrappedRow,
        direction,
        gap: divider ? gap ?? "none" : gap,
        align,
        justify,
        wrap
      }
    ) : /* @__PURE__ */ jsxRuntime.jsx(
      Grid,
      {
        as: listAs,
        role: selectable ? "listbox" : void 0,
        className: cn(listChrome),
        items: filteredItems,
        getItemKey: (item, i) => item.value ?? i,
        renderItem: renderWrappedRow,
        columns: resolvedColumns,
        rows,
        minChildWidth: resolvedGridMin,
        gap: resolvedGridGap,
        columnGap,
        rowGap,
        autoFlow,
        alignItems,
        justifyItems
      }
    );
    const emptyItems = items.length === 0;
    const emptyFilter = !emptyItems && filteredItems.length === 0;
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { ref, "data-slot": "list", className: cn("flex w-full flex-col gap-3", className), ...props, children: [
      header,
      searchEnabled ? /* @__PURE__ */ jsxRuntime.jsx(
        SearchInput,
        {
          value: searchQuery,
          onChange: setSearchQuery,
          onSearch: setDebouncedQuery,
          onClear: () => setDebouncedQuery(""),
          ...searchInputProps
        }
      ) : null,
      loading ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-muted-foreground", children: "Loading\u2026" }) : emptyItems ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-muted-foreground", children: emptyState ?? "Nothing to show." }) : emptyFilter ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-muted-foreground", children: noResultsState ?? "No matches." }) : body,
      children
    ] });
  }
);
List.displayName = "List";
var tableVariants = classVarianceAuthority.cva("w-full caption-bottom text-sm", {
  variants: {
    variant: {
      default: "",
      striped: "[&_tbody_tr:nth-child(even)]:bg-muted/30",
      bordered: "border border-border [&_td]:border-border [&_th]:border-border [&_td]:border [&_th]:border"
    },
    size: {
      sm: "[&_th]:px-2 [&_th]:py-1.5 [&_td]:px-2 [&_td]:py-1.5",
      md: "[&_th]:px-3 [&_th]:py-2 [&_td]:px-3 [&_td]:py-2",
      lg: "[&_th]:px-4 [&_th]:py-3 [&_td]:px-4 [&_td]:py-3"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});
function alignClass(a) {
  if (a === "center") return "text-center";
  if (a === "right") return "text-right";
  return "text-left";
}
function resolveRowId(data, row, getRowId) {
  const i = data.indexOf(row);
  return getRowId(row, i === -1 ? 0 : i);
}
function nextDirection(current, sameKey) {
  if (!sameKey) return "asc";
  return current === "asc" ? "desc" : "asc";
}
function tableCellContent(col, row, rowIndex) {
  if (col.render) return col.render(row, rowIndex);
  const raw = row[col.key];
  return raw ?? null;
}
var SELECT_COL_OFFSET = "3rem";
function widthPart(w) {
  if (w === void 0) return null;
  if (typeof w === "number") return `${w}px`;
  return String(w);
}
function stickyLeftOffset(columns, columnIndex, selectable) {
  if (columns[columnIndex]?.sticky !== "left") return void 0;
  const parts = [];
  if (selectable) parts.push(SELECT_COL_OFFSET);
  for (let j = 0; j < columnIndex; j++) {
    const p = widthPart(columns[j]?.width);
    if (p) parts.push(p);
  }
  if (parts.length === 0) return "0";
  if (parts.length === 1) return parts[0];
  return `calc(${parts.join(" + ")})`;
}
function stickyRightOffset(columns, columnIndex) {
  if (columns[columnIndex]?.sticky !== "right") return void 0;
  const parts = [];
  for (let j = columnIndex + 1; j < columns.length; j++) {
    const p = widthPart(columns[j]?.width);
    if (p) parts.push(p);
  }
  if (parts.length === 0) return "0";
  if (parts.length === 1) return parts[0];
  return `calc(${parts.join(" + ")})`;
}
function stickyColumnClasses(side) {
  return cn(
    "bg-background",
    side === "left" && "border-r border-border shadow-[inset_-10px_0_14px_-10px_rgba(0,0,0,0.14)]",
    side === "right" && "border-l border-border shadow-[inset_10px_0_14px_-10px_rgba(0,0,0,0.14)]"
  );
}
function stickyCheckboxEdgeClasses() {
  return cn(
    "bg-background border-r border-border shadow-[inset_-10px_0_14px_-10px_rgba(0,0,0,0.14)]"
  );
}
function stickyCellZ(header, stickyHeaderRow, columnSticky) {
  if (header) {
    if (stickyHeaderRow && columnSticky) return 5;
    if (stickyHeaderRow) return 4;
    if (columnSticky) return 3;
    return 0;
  }
  return columnSticky ? 2 : 0;
}
function Table({
  data = [],
  columns = [],
  sortable: tableSortable,
  defaultSortKey,
  defaultSortDirection = "asc",
  sortKey: sortKeyProp,
  sortDirection: sortDirectionProp,
  onSortChange,
  selectable,
  selectedRows: selectedRowsProp,
  defaultSelectedRows,
  onSelectionChange,
  getRowId = (_row, index) => index,
  stickyHeader,
  onRowClick,
  loading,
  loadingRows,
  emptyState,
  pagination,
  maxHeight,
  variant,
  size,
  className,
  ...props
}) {
  const [internalSortKey, setInternalSortKey] = React9__namespace.useState(defaultSortKey);
  const [internalSortDir, setInternalSortDir] = React9__namespace.useState(defaultSortDirection);
  const sortKey = sortKeyProp !== void 0 ? sortKeyProp : internalSortKey;
  const sortDir = sortDirectionProp !== void 0 ? sortDirectionProp : internalSortDir;
  const [internalSelected, setInternalSelected] = React9__namespace.useState(defaultSelectedRows ?? []);
  const selectionControlled = selectedRowsProp !== void 0;
  const selectedSet = React9__namespace.useMemo(() => {
    const list = selectionControlled ? selectedRowsProp : internalSelected;
    return new Set(list);
  }, [selectionControlled, selectedRowsProp, internalSelected]);
  const sortedData = React9__namespace.useMemo(() => {
    if (!tableSortable || !sortKey) return data;
    const col = columns.find((c) => c.key === sortKey);
    if (!col?.sortable) return data;
    const copy = [...data];
    const mult = sortDir === "asc" ? 1 : -1;
    copy.sort((a, b) => {
      const ai = a[sortKey];
      const bi = b[sortKey];
      if (ai == null && bi == null) return 0;
      if (ai == null) return 1;
      if (bi == null) return -1;
      if (typeof ai === "number" && typeof bi === "number") return (ai - bi) * mult;
      return String(ai).localeCompare(String(bi), void 0, { numeric: true }) * mult;
    });
    return copy;
  }, [data, columns, tableSortable, sortKey, sortDir]);
  const toggleSort = (key, columnSortable) => {
    if (!tableSortable || !columnSortable) return;
    const same = sortKey === key;
    const nextDir = nextDirection(sortDir, same);
    if (sortKeyProp === void 0) setInternalSortKey(key);
    if (sortDirectionProp === void 0) setInternalSortDir(nextDir);
    onSortChange?.(key, nextDir);
  };
  const toggleRow = (id) => {
    const next = new Set(selectedSet);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    const arr = Array.from(next);
    if (!selectionControlled) setInternalSelected(arr);
    onSelectionChange?.(arr);
  };
  const toggleAll = () => {
    const allIds = sortedData.map((row) => resolveRowId(data, row, getRowId));
    const allSelected = allIds.length > 0 && allIds.every((id) => selectedSet.has(id));
    const next = allSelected ? [] : allIds;
    if (!selectionControlled) setInternalSelected(next);
    onSelectionChange?.(next);
  };
  const showEmpty = !loading && sortedData.length === 0;
  const skeletonRowCount = loadingRows ?? (data.length > 0 ? data.length : 5);
  const skeletonLineClass = size === "sm" ? "h-5.5" : size === "lg" ? "h-7" : "h-6";
  const hasCheckbox = Boolean(selectable);
  const scrollStyle = {
    ...maxHeight != null ? {
      maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight
    } : {}
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("w-full space-y-3", className), ...props, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: "relative w-full overflow-auto rounded-[var(--radius-input,0.375rem)] border border-border",
        style: scrollStyle,
        children: /* @__PURE__ */ jsxRuntime.jsxs("table", { className: cn(tableVariants({ variant, size })), children: [
          /* @__PURE__ */ jsxRuntime.jsx("thead", { className: "border-b border-border bg-background [&_tr]:border-b", children: /* @__PURE__ */ jsxRuntime.jsxs("tr", { className: "transition-colors", children: [
            selectable ? /* @__PURE__ */ jsxRuntime.jsx(
              "th",
              {
                scope: "col",
                className: cn("w-10 align-middle shadow-sm", stickyCheckboxEdgeClasses()),
                style: {
                  position: "sticky",
                  left: 0,
                  ...stickyHeader ? { top: 0 } : {},
                  zIndex: stickyHeader ? 6 : 3
                },
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  Checkbox,
                  {
                    "aria-label": "Select all rows",
                    checked: sortedData.length > 0 && sortedData.every((row) => selectedSet.has(resolveRowId(data, row, getRowId))),
                    indeterminate: sortedData.some((row) => selectedSet.has(resolveRowId(data, row, getRowId))) && !sortedData.every((row) => selectedSet.has(resolveRowId(data, row, getRowId))),
                    onChange: toggleAll
                  }
                )
              }
            ) : null,
            columns.map((col, colIndex) => {
              const active = sortKey === col.key;
              const canSort = Boolean(tableSortable && col.sortable);
              const sl = stickyLeftOffset(columns, colIndex, hasCheckbox);
              const sr = stickyRightOffset(columns, colIndex);
              const colSticky = Boolean(sl || sr);
              const z = stickyCellZ(true, Boolean(stickyHeader), colSticky);
              return /* @__PURE__ */ jsxRuntime.jsx(
                "th",
                {
                  scope: "col",
                  style: {
                    ...col.width !== void 0 ? { width: col.width } : {},
                    ...sl ? { left: sl } : {},
                    ...sr ? { right: sr } : {},
                    ...stickyHeader || colSticky ? { position: "sticky" } : {},
                    ...stickyHeader ? { top: 0 } : {},
                    ...z ? { zIndex: z } : {}
                  },
                  className: cn(
                    "font-medium text-foreground bg-background",
                    alignClass(col.align),
                    canSort && "select-none",
                    colSticky && col.sticky && stickyColumnClasses(col.sticky),
                    stickyHeader && "shadow-sm"
                  ),
                  children: canSort ? /* @__PURE__ */ jsxRuntime.jsxs(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: cn("-ml-2 h-auto min-h-8 gap-1 px-2 font-medium", alignClass(col.align)),
                      onClick: () => toggleSort(col.key, col.sortable),
                      children: [
                        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "inline-flex min-w-0 items-center gap-1.5", children: col.header }),
                        active ? sortDir === "asc" ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowUp, { className: "h-3.5 w-3.5 shrink-0 opacity-70", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowDown, { className: "h-3.5 w-3.5 shrink-0 opacity-70", "aria-hidden": true }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ArrowUpDown, { className: "h-3.5 w-3.5 shrink-0 opacity-40", "aria-hidden": true })
                      ]
                    }
                  ) : col.header
                },
                col.key
              );
            })
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsx("tbody", { className: "[&_tr:last-child]:border-0", children: loading ? Array.from({ length: skeletonRowCount }).map((_, i) => /* @__PURE__ */ jsxRuntime.jsxs("tr", { className: "border-b border-border/80", children: [
            selectable ? /* @__PURE__ */ jsxRuntime.jsx(
              "td",
              {
                className: cn(stickyCheckboxEdgeClasses(), variant === "striped" && "bg-inherit"),
                style: { position: "sticky", left: 0, zIndex: 3 },
                children: /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { variant: "checkbox" })
              }
            ) : null,
            columns.map((col, colIndex) => {
              const sl = stickyLeftOffset(columns, colIndex, hasCheckbox);
              const sr = stickyRightOffset(columns, colIndex);
              const colSticky = Boolean(sl || sr);
              const z = stickyCellZ(false, false, colSticky);
              return /* @__PURE__ */ jsxRuntime.jsx(
                "td",
                {
                  style: {
                    ...col.width !== void 0 ? { width: col.width } : {},
                    ...sl ? { left: sl } : {},
                    ...sr ? { right: sr } : {},
                    ...colSticky ? { position: "sticky" } : {},
                    ...z ? { zIndex: z } : {}
                  },
                  className: cn(
                    alignClass(col.align),
                    colSticky && cn(
                      col.sticky && stickyColumnClasses(col.sticky),
                      variant === "striped" && "bg-inherit"
                    )
                  ),
                  children: /* @__PURE__ */ jsxRuntime.jsx(
                    Skeleton,
                    {
                      className: cn(
                        "block w-full max-w-full rounded-sm leading-none",
                        skeletonLineClass,
                        col.width === void 0 && colIndex > 0 && "max-w-[12rem]"
                      ),
                      style: col.width !== void 0 ? { width: col.width, maxWidth: col.width } : void 0
                    }
                  )
                },
                col.key
              );
            })
          ] }, `sk-${i}`)) : sortedData.map((row, rowIndex) => {
            const id = resolveRowId(data, row, getRowId);
            const sourceIndex = data.indexOf(row);
            const clickable = Boolean(onRowClick);
            return /* @__PURE__ */ jsxRuntime.jsxs(
              "tr",
              {
                className: cn(
                  "border-b border-border/80 transition-colors",
                  clickable && "cursor-pointer hover:bg-muted/40"
                ),
                onClick: clickable ? () => onRowClick(row, sourceIndex === -1 ? rowIndex : sourceIndex) : void 0,
                children: [
                  selectable ? /* @__PURE__ */ jsxRuntime.jsx(
                    "td",
                    {
                      onClick: (e) => e.stopPropagation(),
                      className: cn(stickyCheckboxEdgeClasses(), variant === "striped" && "bg-inherit"),
                      style: { position: "sticky", left: 0, zIndex: 3 },
                      children: /* @__PURE__ */ jsxRuntime.jsx(
                        Checkbox,
                        {
                          "aria-label": `Select row ${rowIndex + 1}`,
                          checked: selectedSet.has(id),
                          onChange: () => toggleRow(id)
                        }
                      )
                    }
                  ) : null,
                  columns.map((col, colIndex) => {
                    const sl = stickyLeftOffset(columns, colIndex, hasCheckbox);
                    const sr = stickyRightOffset(columns, colIndex);
                    const colSticky = Boolean(sl || sr);
                    const z = stickyCellZ(false, false, colSticky);
                    return /* @__PURE__ */ jsxRuntime.jsx(
                      "td",
                      {
                        style: {
                          ...sl ? { left: sl } : {},
                          ...sr ? { right: sr } : {},
                          ...colSticky ? { position: "sticky" } : {},
                          ...z ? { zIndex: z } : {}
                        },
                        className: cn(
                          "align-middle",
                          alignClass(col.align),
                          colSticky && cn(
                            col.sticky && stickyColumnClasses(col.sticky),
                            variant === "striped" && "bg-inherit"
                          )
                        ),
                        children: tableCellContent(col, row, rowIndex)
                      },
                      col.key
                    );
                  })
                ]
              },
              String(id)
            );
          }) })
        ] })
      }
    ),
    showEmpty ? emptyState ?? /* @__PURE__ */ jsxRuntime.jsx(EmptyState, { variant: "minimal", size: "sm", title: "No data", description: "There is nothing to display yet." }) : null,
    pagination && !showEmpty ? /* @__PURE__ */ jsxRuntime.jsx(Pagination, { ...pagination }) : null
  ] });
}
Table.displayName = "Table";
var Video = React9__namespace.forwardRef(
  ({ className, src, width, height, style, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      "video",
      {
        ref,
        "data-slot": "video",
        src,
        className: cn("max-w-full rounded-md bg-black object-contain", className),
        style: { width, height, ...style },
        ...props
      }
    );
  }
);
Video.displayName = "Video";

// src/components/data-display/treeUtils.ts
function cloneItem(item) {
  return {
    ...item,
    children: item.children?.map(cloneItem)
  };
}
function findNode(items, id) {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children?.length) {
      const nested = findNode(item.children, id);
      if (nested) return nested;
    }
  }
  return null;
}
function isDescendant(items, ancestorId, candidateId) {
  const ancestor = findNode(items, ancestorId);
  if (!ancestor?.children?.length) return false;
  const walk = (nodes) => {
    for (const node of nodes) {
      if (node.id === candidateId) return true;
      if (node.children?.length && walk(node.children)) return true;
    }
    return false;
  };
  return walk(ancestor.children);
}
function removeNode(items, id) {
  let removed = null;
  const next = items.map((item) => {
    if (item.id === id) {
      removed = cloneItem(item);
      return null;
    }
    if (item.children?.length) {
      const result = removeNode(item.children, id);
      if (result.removed) {
        removed = result.removed;
        return { ...item, children: result.items.length ? result.items : void 0 };
      }
    }
    return item;
  }).filter(Boolean);
  return { items: next, removed };
}
function insertSibling(items, targetId, node, after) {
  const result = [];
  for (const item of items) {
    if (item.id === targetId) {
      if (!after) result.push(node);
      result.push(item);
      if (after) result.push(node);
      continue;
    }
    if (item.children?.length) {
      const children = insertSibling(item.children, targetId, node, after);
      if (children !== item.children) {
        result.push({ ...item, children });
        continue;
      }
    }
    result.push(item);
  }
  return result;
}
function appendChild(items, targetId, node) {
  return items.map((item) => {
    if (item.id === targetId) {
      const children = item.children ? [...item.children, node] : [node];
      return { ...item, children };
    }
    if (item.children?.length) {
      return { ...item, children: appendChild(item.children, targetId, node) };
    }
    return item;
  });
}
function deleteTreeNode(items, id) {
  return removeNode(items, id).items;
}
function addTreeNodeSibling(items, targetId, node) {
  return insertSibling(items, targetId, node, true);
}
function addTreeNodeChild(items, targetId, node) {
  return appendChild(items, targetId, node);
}
function moveTreeNode(items, draggedId, targetId, position) {
  if (draggedId === targetId) return items;
  if (isDescendant(items, draggedId, targetId)) return items;
  const { items: withoutDragged, removed } = removeNode(items, draggedId);
  if (!removed) return items;
  if (position === "inside") {
    return appendChild(withoutDragged, targetId, removed);
  }
  return insertSibling(withoutDragged, targetId, removed, position === "after");
}
function treeItemKey(item, index, prefix = "") {
  if (item.id) return item.id;
  const fallback = item.value;
  return fallback ?? `${prefix}node-${index}`;
}
function normalizeTreeItems(items, prefix = "") {
  return items.map((item, index) => {
    const id = treeItemKey(item, index, prefix);
    return {
      ...item,
      id,
      children: item.children?.length ? normalizeTreeItems(item.children, `${id}-`) : item.children
    };
  });
}
function defaultIcon(item, expanded) {
  const isFolder = item.kind === "folder" || Boolean(item.children?.length);
  if (isFolder) {
    return expanded ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.FolderOpen, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Folder, { className: "h-3.5 w-3.5" });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(lucideReact.File, { className: "h-3.5 w-3.5" });
}
function resolveDropPosition(event, canDropInside) {
  const rect = event.currentTarget.getBoundingClientRect();
  const offset = (event.clientY - rect.top) / rect.height;
  if (canDropInside && offset > 0.28 && offset < 0.72) return "inside";
  return offset < 0.5 ? "before" : "after";
}
function TreeRow({
  item,
  depth,
  indent,
  selectedId,
  expandedIds,
  showIndentGuides,
  draggable,
  dropHint,
  allowAddSibling,
  allowAddChild,
  allowDelete,
  onToggle,
  onSelect,
  onAdd,
  onDelete,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd
}) {
  const hasChildren = Boolean(item.children?.length);
  const expanded = expandedIds.has(item.id);
  const selected = selectedId === item.id;
  const isFolder = item.kind === "folder" || hasChildren;
  const showAddSibling = Boolean(allowAddSibling);
  const showAddChild = Boolean(allowAddChild) && isFolder;
  const showDelete = Boolean(allowDelete);
  const hasActions = showAddSibling || showAddChild || showDelete;
  const dropActive = dropHint?.targetId === item.id;
  const dropBefore = dropActive && dropHint?.position === "before";
  const dropAfter = dropActive && dropHint?.position === "after";
  const dropInside = dropActive && dropHint?.position === "inside";
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { role: "none", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      "div",
      {
        role: "treeitem",
        "aria-selected": selected,
        "aria-expanded": hasChildren ? expanded : void 0,
        draggable: draggable || void 0,
        onDragStart: (event) => {
          if (!draggable) return;
          event.dataTransfer.effectAllowed = "move";
          event.dataTransfer.setData("text/plain", item.id);
          onDragStart(item.id);
        },
        onDragOver: (event) => {
          if (!draggable) return;
          onDragOver(event, item);
        },
        onDragLeave,
        onDrop: (event) => {
          if (!draggable) return;
          onDrop(event, item);
        },
        onDragEnd,
        className: cn(
          "group relative flex min-h-[30px] items-center rounded-sm text-sm transition-colors",
          selected && "bg-primary/10 text-foreground",
          !selected && "hover:bg-muted/70",
          dropInside && "bg-muted/60 ring-1 ring-inset ring-primary/40",
          showIndentGuides && depth > 0 && "border-l border-border/60"
        ),
        style: { paddingLeft: depth * indent + 4 },
        children: [
          dropBefore ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute inset-x-1 top-0 h-0.5 rounded-full bg-primary", "aria-hidden": true }) : null,
          dropAfter ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-primary", "aria-hidden": true }) : null,
          draggable ? /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              className: "flex h-6 w-4 shrink-0 cursor-grab items-center justify-center text-muted-foreground/70 active:cursor-grabbing",
              "aria-hidden": true,
              children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.GripVertical, { className: "h-3.5 w-3.5" })
            }
          ) : null,
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              type: "button",
              className: cn(
                "flex h-6 w-5 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted",
                !hasChildren && "invisible"
              ),
              "aria-label": expanded ? "Collapse" : "Expand",
              onClick: (event) => {
                event.stopPropagation();
                if (hasChildren) onToggle(item.id);
              },
              children: hasChildren ? expanded ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDown, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: "h-3.5 w-3.5" }) : null
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              className: "flex min-w-0 flex-1 items-center gap-2 rounded-sm py-1 pr-1 text-left",
              onClick: () => onSelect(item.id),
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "shrink-0 text-muted-foreground", children: item.left ? /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: item.left, size: "sm" }) : defaultIcon(item, expanded) }),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "min-w-0 flex-1 truncate", children: item.label })
              ]
            }
          ),
          hasActions ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex shrink-0 items-center gap-0.5 pr-1 opacity-70 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", children: [
            showAddSibling ? /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                disabled: !onAdd,
                className: "flex h-6 w-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40",
                "aria-label": "Add sibling",
                title: "Add sibling",
                onClick: (event) => {
                  event.stopPropagation();
                  onAdd?.({ targetId: item.id, relation: "sibling" });
                },
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { className: "h-3.5 w-3.5" })
              }
            ) : null,
            showAddChild ? /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                disabled: !onAdd,
                className: "flex h-6 w-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40",
                "aria-label": "Add child",
                title: "Add folder or request",
                onClick: (event) => {
                  event.stopPropagation();
                  onAdd?.({ targetId: item.id, relation: "child" });
                },
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Folder, { className: "h-3.5 w-3.5" })
              }
            ) : null,
            showDelete ? /* @__PURE__ */ jsxRuntime.jsx(
              "button",
              {
                type: "button",
                disabled: !onDelete,
                className: "flex h-6 w-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-40",
                "aria-label": "Delete",
                title: "Delete",
                onClick: (event) => {
                  event.stopPropagation();
                  onDelete?.(item.id);
                },
                children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Trash2, { className: "h-3.5 w-3.5" })
              }
            ) : null
          ] }) : null
        ]
      }
    ),
    hasChildren && expanded ? item.children.map((child, childIndex) => /* @__PURE__ */ jsxRuntime.jsx(
      TreeRow,
      {
        item: child,
        depth: depth + 1,
        indent,
        selectedId,
        expandedIds,
        showIndentGuides,
        draggable,
        dropHint,
        allowAddSibling,
        allowAddChild,
        allowDelete,
        onToggle,
        onSelect,
        onAdd,
        onDelete,
        onDragStart,
        onDragOver,
        onDragLeave,
        onDrop,
        onDragEnd
      },
      treeItemKey(child, childIndex, `${item.id}-`)
    )) : null
  ] });
}
function TreeView({
  items,
  selectedId,
  defaultSelectedId,
  onSelect,
  expandedIds,
  defaultExpandedIds = [],
  onExpandedChange,
  showIndentGuides = false,
  loading = false,
  emptyState = "No items",
  indent = 12,
  draggable = false,
  onMove,
  allowAddSibling = false,
  allowAddChild = false,
  allowDelete = false,
  onAdd,
  onDelete,
  className,
  ...rest
}) {
  const [internalSelected, setInternalSelected] = React9__namespace.useState(defaultSelectedId);
  const [internalExpanded, setInternalExpanded] = React9__namespace.useState(defaultExpandedIds);
  const [draggedId, setDraggedId] = React9__namespace.useState(null);
  const [dropHint, setDropHint] = React9__namespace.useState(null);
  const isSelectedControlled = selectedId !== void 0;
  const isExpandedControlled = expandedIds !== void 0;
  const resolvedSelected = isSelectedControlled ? selectedId : internalSelected;
  const resolvedExpanded = new Set(isExpandedControlled ? expandedIds : internalExpanded);
  const setSelected = (id) => {
    if (!isSelectedControlled) setInternalSelected(id);
    onSelect?.(id);
  };
  const toggleExpanded = (id) => {
    const next = new Set(resolvedExpanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    const arr = [...next];
    if (!isExpandedControlled) setInternalExpanded(arr);
    onExpandedChange?.(arr);
  };
  const normalizedItems = React9__namespace.useMemo(() => normalizeTreeItems(items), [items]);
  const handleDragOver = (event, item) => {
    event.preventDefault();
    if (!draggedId || draggedId === item.id) return;
    const canDropInside = item.kind === "folder" || Boolean(item.children?.length);
    const position = resolveDropPosition(event, canDropInside);
    setDropHint({ targetId: item.id, position });
  };
  const handleDrop = (event, item) => {
    event.preventDefault();
    const sourceId = event.dataTransfer.getData("text/plain") || draggedId;
    if (!sourceId || sourceId === item.id) return;
    const canDropInside = item.kind === "folder" || Boolean(item.children?.length);
    const position = dropHint?.targetId === item.id ? dropHint.position : resolveDropPosition(event, canDropInside);
    onMove?.({ draggedId: sourceId, targetId: item.id, position });
    setDraggedId(null);
    setDropHint(null);
  };
  const clearDrag = () => {
    setDraggedId(null);
    setDropHint(null);
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("flex items-center justify-center p-6", className), children: /* @__PURE__ */ jsxRuntime.jsx(Spinner, { size: "sm" }) });
  }
  if (!normalizedItems.length) {
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("p-4 text-sm text-muted-foreground", className), ...rest, children: emptyState });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      role: "tree",
      className: cn("w-full select-none space-y-px rounded-md border border-border/60 bg-background p-1", className),
      ...rest,
      children: normalizedItems.map((item, index) => /* @__PURE__ */ jsxRuntime.jsx(
        TreeRow,
        {
          item,
          depth: 0,
          indent,
          selectedId: resolvedSelected,
          expandedIds: resolvedExpanded,
          showIndentGuides,
          draggable,
          dropHint,
          allowAddSibling,
          allowAddChild,
          allowDelete,
          onToggle: toggleExpanded,
          onSelect: setSelected,
          onAdd,
          onDelete,
          onDragStart: setDraggedId,
          onDragOver: handleDragOver,
          onDragLeave: () => setDropHint(null),
          onDrop: handleDrop,
          onDragEnd: clearDrag
        },
        treeItemKey(item, index)
      ))
    }
  );
}
TreeView.displayName = "TreeView";
function Carousel({
  items = [],
  autoPlay = false,
  loop = true,
  interval = 4e3,
  showIndicators = true,
  showArrows = true,
  orientation = "horizontal",
  className,
  ...rest
}) {
  const [index, setIndex] = React9__namespace.useState(0);
  const count = items.length;
  const go = React9__namespace.useCallback(
    (next) => {
      if (!count) return;
      if (loop) setIndex((next % count + count) % count);
      else setIndex(Math.max(0, Math.min(count - 1, next)));
    },
    [count, loop]
  );
  React9__namespace.useEffect(() => {
    if (!autoPlay || count < 2) return;
    const timer = window.setInterval(() => go(index + 1), interval);
    return () => window.clearInterval(timer);
  }, [autoPlay, count, go, index, interval]);
  if (!count) return null;
  const item = items[index];
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn(
        "relative overflow-hidden rounded-xl border border-border bg-card",
        orientation === "vertical" ? "h-72" : "w-full",
        className
      ),
      ...rest,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn(orientation === "vertical" ? "h-full" : "w-full"), children: [
          /* @__PURE__ */ jsxRuntime.jsx(Image, { src: item.image, alt: item.imageAlt ?? "", className: "h-48 w-full md:h-56", fit: "cover", variant: "square" }),
          item.content ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "p-4", children: item.content }) : null
        ] }),
        showArrows && count > 1 ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              iconOnly: true,
              "aria-label": "Previous slide",
              className: "absolute left-2 top-1/2 z-10 -translate-y-1/2 bg-background/80",
              left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronLeft, { className: "h-4 w-4" }),
              onClick: () => go(index - 1)
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              iconOnly: true,
              "aria-label": "Next slide",
              className: "absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-background/80",
              left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronRight, { className: "h-4 w-4" }),
              onClick: () => go(index + 1)
            }
          )
        ] }) : null,
        showIndicators && count > 1 ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5", children: items.map((_, i) => /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            type: "button",
            "aria-label": `Go to slide ${i + 1}`,
            className: cn(
              "h-2 w-2 rounded-full transition-colors",
              i === index ? "bg-primary" : "bg-muted-foreground/40"
            ),
            onClick: () => setIndex(i)
          },
          i
        )) }) : null,
        /* @__PURE__ */ jsxRuntime.jsxs(Text, { as: "span", size: "xs", variant: "muted", className: "sr-only", children: [
          "Slide ",
          index + 1,
          " of ",
          count
        ] })
      ]
    }
  );
}
Carousel.displayName = "Carousel";
function CodeBlock({
  code = "",
  language,
  showLineNumbers = false,
  showCopy = true,
  filename,
  className,
  ...rest
}) {
  const lines = React9__namespace.useMemo(() => code.split(/\n/), [code]);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "div",
    {
      className: cn("relative overflow-hidden rounded-lg border border-border bg-muted/40", className),
      ...rest,
      children: [
        filename != null || showCopy ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex min-h-10 items-center justify-between gap-2 border-b border-border px-4 py-2", children: [
          filename != null ? /* @__PURE__ */ jsxRuntime.jsx(Text, { variant: "muted", className: "min-w-0 font-mono text-xs", children: filename }) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "min-w-0", "aria-hidden": true }),
          showCopy ? /* @__PURE__ */ jsxRuntime.jsx(CopyButton, { value: code, variant: "ghost", size: "sm", tooltip: false, copyLabel: "Copy" }) : null
        ] }) : null,
        /* @__PURE__ */ jsxRuntime.jsx("pre", { className: "overflow-x-auto p-4 text-sm leading-relaxed", children: showLineNumbers ? /* @__PURE__ */ jsxRuntime.jsx("code", { className: "grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 font-mono text-foreground", children: lines.map((line, i) => /* @__PURE__ */ jsxRuntime.jsxs(React9__namespace.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "select-none text-right tabular-nums text-muted-foreground", children: i + 1 }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "whitespace-pre", children: line })
        ] }, i)) }) : /* @__PURE__ */ jsxRuntime.jsx("code", { className: "block whitespace-pre font-mono text-foreground", children: code }) }),
        language ? /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "sr-only", children: [
          "Language: ",
          language
        ] }) : null
      ]
    }
  );
}
CodeBlock.displayName = "CodeBlock";
var alertDialogVariants = classVarianceAuthority.cva("", {
  variants: {
    variant: {
      default: "",
      destructive: "",
      warning: ""
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function AlertDialog({
  open: openProp,
  defaultOpen,
  onOpenChange,
  title,
  description,
  variant,
  confirmProps,
  cancelProps,
  loading,
  className,
  container
}) {
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange });
  const busy = Boolean(loading || confirmProps?.loading);
  const handleClose = React9__namespace.useCallback(() => {
    if (busy) return;
    setOpen(false);
  }, [busy, setOpen]);
  const confirmVariant = variant === "destructive" ? "destructive" : variant === "warning" ? "primary" : "primary";
  return /* @__PURE__ */ jsxRuntime.jsx(
    Overlay,
    {
      open,
      onClose: handleClose,
      container,
      blur: true,
      closeOnBackdropClick: !busy,
      className: "flex items-center justify-center p-4",
      children: /* @__PURE__ */ jsxRuntime.jsx(
        Card,
        {
          "data-slot": "alert-dialog",
          variant: "surface-1",
          size: "md",
          className: cn("relative w-full max-w-md shadow-lg", alertDialogVariants({ variant }), className),
          footer: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              Button,
              {
                variant: "outline",
                label: cancelProps?.label ?? "Cancel",
                disabled: busy,
                onClick: () => {
                  cancelProps?.onClick?.();
                  handleClose();
                }
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              Button,
              {
                variant: confirmVariant,
                label: confirmProps.label,
                loading: busy,
                onClick: () => {
                  confirmProps.onClick?.();
                  handleClose();
                }
              }
            )
          ] }),
          children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "lg", weight: "semibold", children: title }),
            description ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "sm", variant: "muted", children: description }) : null
          ] })
        }
      )
    }
  );
}
AlertDialog.displayName = "AlertDialog";
var drawerVariants = classVarianceAuthority.cva("relative flex flex-col border-border bg-card shadow-lg", {
  variants: {
    placement: {
      top: "w-full border-b",
      bottom: "w-full border-t",
      left: "h-full border-r",
      right: "h-full border-l"
    },
    size: {
      sm: "",
      md: "",
      lg: "",
      xl: "",
      full: ""
    },
    variant: {
      default: "rounded-none",
      sheet: ""
    }
  },
  compoundVariants: [
    { placement: "bottom", variant: "sheet", class: "rounded-t-xl" },
    { placement: "top", variant: "sheet", class: "rounded-b-xl" },
    { placement: "left", variant: "sheet", class: "rounded-r-xl" },
    { placement: "right", variant: "sheet", class: "rounded-l-xl" },
    { placement: ["top", "bottom"], size: "sm", class: "max-h-[30vh]" },
    { placement: ["top", "bottom"], size: "md", class: "max-h-[50vh]" },
    { placement: ["top", "bottom"], size: "lg", class: "max-h-[70vh]" },
    { placement: ["top", "bottom"], size: "xl", class: "max-h-[85vh]" },
    { placement: ["top", "bottom"], size: "full", class: "max-h-full" },
    { placement: ["left", "right"], size: "sm", class: "max-w-xs" },
    { placement: ["left", "right"], size: "md", class: "max-w-sm" },
    { placement: ["left", "right"], size: "lg", class: "max-w-md" },
    { placement: ["left", "right"], size: "xl", class: "max-w-lg" },
    { placement: ["left", "right"], size: "full", class: "max-w-full" }
  ],
  defaultVariants: {
    placement: "right",
    size: "md",
    variant: "default"
  }
});
var overlayAlign = {
  top: "flex items-start justify-center p-0",
  bottom: "flex items-end justify-center p-0",
  left: "flex items-stretch justify-start p-0",
  right: "flex items-stretch justify-end p-0"
};
var Drawer = React9__namespace.forwardRef(function Drawer2({
  open: openProp,
  defaultOpen,
  onOpenChange,
  showClose = true,
  header,
  footer,
  placement,
  size,
  variant,
  className,
  cardProps,
  container,
  children
}, ref) {
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange });
  const resolvedPlacement = placement ?? "right";
  const handleClose = React9__namespace.useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const resolvedHeader = header || showClose ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    header ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-w-0 flex-1", children: header }) : /* @__PURE__ */ jsxRuntime.jsx("span", {}),
    showClose ? /* @__PURE__ */ jsxRuntime.jsx(
      Button,
      {
        variant: "ghost",
        size: "sm",
        iconOnly: true,
        ariaLabel: "Close",
        left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" }),
        onClick: handleClose,
        className: "shrink-0"
      }
    ) : null
  ] }) : void 0;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Overlay,
    {
      open,
      onClose: handleClose,
      container,
      blur: true,
      showCloseButton: false,
      className: overlayAlign[resolvedPlacement],
      children: /* @__PURE__ */ jsxRuntime.jsx(
        Card,
        {
          ref,
          "data-slot": "drawer",
          header: resolvedHeader,
          footer,
          variant: "surface-1",
          size: "md",
          ...cardProps,
          className: cn(
            drawerVariants({ placement: resolvedPlacement, size, variant }),
            className,
            cardProps?.className
          ),
          children
        }
      )
    }
  );
});
Drawer.displayName = "Drawer";
function HoverCard({
  open: openProp,
  defaultOpen,
  onOpenChange,
  triggerProps,
  trigger,
  openDelay = 200,
  closeDelay = 100,
  placement = "bottom",
  offset,
  className,
  cardProps,
  children,
  ...rest
}) {
  const { label = "Hover", left, variant = "ghost", size = "md", className: triggerClassName } = triggerProps ?? {};
  const [open, setOpen] = useControllableOpen({ open: openProp, defaultOpen, onOpenChange });
  const openTimer = React9__namespace.useRef(null);
  const closeTimer = React9__namespace.useRef(null);
  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  };
  const scheduleOpen = () => {
    clearTimers();
    openTimer.current = setTimeout(() => setOpen(true), openDelay);
  };
  const scheduleClose = () => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpen(false), closeDelay);
  };
  React9__namespace.useEffect(() => clearTimers, []);
  const hoverHandlers = {
    onMouseEnter: scheduleOpen,
    onMouseLeave: scheduleClose,
    onFocus: scheduleOpen,
    onBlur: scheduleClose
  };
  const resolvedTrigger = trigger ? /* @__PURE__ */ jsxRuntime.jsx("span", { className: "inline-flex", ...hoverHandlers, children: trigger }) : /* @__PURE__ */ jsxRuntime.jsxs(Button, { variant, size, className: triggerClassName, ...hoverHandlers, children: [
    left ? /* @__PURE__ */ jsxRuntime.jsx(Icon, { node: left, size: "sm" }) : null,
    label
  ] });
  return /* @__PURE__ */ jsxRuntime.jsx(
    Popover,
    {
      open,
      onOpenChange: setOpen,
      trigger: resolvedTrigger,
      openOnClick: false,
      closeOnOutsideClick: false,
      placement,
      offset,
      className: cn(className),
      cardProps,
      ...rest,
      children: /* @__PURE__ */ jsxRuntime.jsx("div", { ...hoverHandlers, children })
    }
  );
}
HoverCard.displayName = "HoverCard";
var VisuallyHidden = React9__namespace.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntime.jsx(
    "span",
    {
      ref,
      className: cn(
        "absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)] [-webkit-clip-path:inset(50%)] [clip-path:inset(50%)]",
        className
      ),
      ...props
    }
  )
);
VisuallyHidden.displayName = "VisuallyHidden";
var ErrorBoundary = class extends React9__namespace.Component {
  constructor() {
    super(...arguments);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    this.props.onError?.(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? /* @__PURE__ */ jsxRuntime.jsx("div", { className: cn("rounded-md border border-destructive/40 bg-destructive/10 p-3", this.props.className), children: /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "div", size: "sm", variant: "danger", children: "Something went wrong." }) });
    }
    return this.props.children;
  }
};
ErrorBoundary.displayName = "ErrorBoundary";

// src/components/data-viz/chartUtils.ts
function readKey(row, key) {
  if (!key) return "";
  const value = row[key];
  if (typeof value === "number" || typeof value === "string") return value;
  return String(value ?? "");
}
function readNumber(row, key) {
  const value = readKey(row, key);
  return typeof value === "number" ? value : Number(value) || 0;
}
function maxOf(data, key) {
  return data.reduce((max, row) => Math.max(max, readNumber(row, key)), 0);
}
function sumOf(data, key) {
  return data.reduce((sum, row) => sum + readNumber(row, key), 0);
}
var CHART_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--info))",
  "hsl(var(--success))",
  "hsl(var(--warning))",
  "hsl(var(--destructive))"
];
function polarToCartesian(cx, cy, r, angle) {
  const rad = (angle - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}
var VIEW_W = 400;
var VIEW_H = 240;
var PAD = 36;
function GridLines() {
  return /* @__PURE__ */ jsxRuntime.jsx("g", { className: "text-border", stroke: "currentColor", strokeWidth: "1", children: [0, 1, 2, 3, 4].map((i) => {
    const y = PAD + (VIEW_H - PAD * 2) / 4 * i;
    return /* @__PURE__ */ jsxRuntime.jsx("line", { x1: PAD, x2: VIEW_W - PAD, y1: y, y2: y, opacity: 0.35 }, i);
  }) });
}
function BarChartSvg({ data, xKey = "label", yKey = "value", horizontal }) {
  const max = maxOf(data, yKey) || 1;
  const innerW = VIEW_W - PAD * 2;
  const innerH = VIEW_H - PAD * 2;
  const barGap = 8;
  const barSize = (innerW - barGap * (data.length - 1)) / Math.max(data.length, 1);
  return /* @__PURE__ */ jsxRuntime.jsx("g", { children: data.map((row, index) => {
    const value = readNumber(row, yKey);
    const label = readKey(row, xKey);
    const color = CHART_COLORS[index % CHART_COLORS.length];
    if (horizontal) {
      const w = value / max * innerW;
      const y2 = PAD + index * (innerH / data.length);
      const h2 = innerH / data.length - barGap;
      return /* @__PURE__ */ jsxRuntime.jsxs("g", { children: [
        /* @__PURE__ */ jsxRuntime.jsx("rect", { x: PAD, y: y2, width: w, height: h2, fill: color, rx: 4 }),
        /* @__PURE__ */ jsxRuntime.jsx("text", { x: PAD - 6, y: y2 + h2 / 2, textAnchor: "end", dominantBaseline: "middle", className: "fill-muted-foreground text-[10px]", children: label })
      ] }, index);
    }
    const h = value / max * innerH;
    const x = PAD + index * (barSize + barGap);
    const y = VIEW_H - PAD - h;
    return /* @__PURE__ */ jsxRuntime.jsxs("g", { children: [
      /* @__PURE__ */ jsxRuntime.jsx("rect", { x, y, width: barSize, height: h, fill: color, rx: 4 }),
      /* @__PURE__ */ jsxRuntime.jsx("text", { x: x + barSize / 2, y: VIEW_H - PAD + 14, textAnchor: "middle", className: "fill-muted-foreground text-[10px]", children: label })
    ] }, index);
  }) });
}
function LineChartSvg({ data, xKey = "label", yKey = "value", area, showPoints }) {
  const max = maxOf(data, yKey) || 1;
  const innerW = VIEW_W - PAD * 2;
  const innerH = VIEW_H - PAD * 2;
  const points = data.map((row, index) => {
    const x = PAD + index / Math.max(data.length - 1, 1) * innerW;
    const y = VIEW_H - PAD - readNumber(row, yKey) / max * innerH;
    return { x, y };
  });
  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPath = `${points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")} L ${points[points.length - 1]?.x ?? PAD} ${VIEW_H - PAD} L ${points[0]?.x ?? PAD} ${VIEW_H - PAD} Z`;
  return /* @__PURE__ */ jsxRuntime.jsxs("g", { children: [
    /* @__PURE__ */ jsxRuntime.jsx("polyline", { fill: "none", stroke: "hsl(var(--primary))", strokeWidth: "2", points: polyline }),
    area ? /* @__PURE__ */ jsxRuntime.jsx("path", { d: areaPath, fill: "hsl(var(--primary))", opacity: 0.15 }) : null,
    showPoints ? points.map((p, i) => /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: p.x, cy: p.y, r: 3, fill: "hsl(var(--primary))" }, i)) : null,
    data.map((row, index) => /* @__PURE__ */ jsxRuntime.jsx(
      "text",
      {
        x: points[index]?.x ?? PAD,
        y: VIEW_H - PAD + 14,
        textAnchor: "middle",
        className: "fill-muted-foreground text-[10px]",
        children: readKey(row, xKey)
      },
      index
    ))
  ] });
}
function PieChartSvg({ data, valueKey = "value", labelKey = "label", innerRadius = 0 }) {
  const total = sumOf(data, valueKey) || 1;
  const cx = VIEW_W / 2;
  const cy = VIEW_H / 2;
  const radius = Math.min(VIEW_W, VIEW_H) / 2 - 24;
  let cursor = 0;
  return /* @__PURE__ */ jsxRuntime.jsxs("g", { children: [
    data.map((row, index) => {
      const value = readNumber(row, valueKey);
      const angle = value / total * 360;
      const start = cursor;
      const end = cursor + angle;
      cursor = end;
      const color = CHART_COLORS[index % CHART_COLORS.length];
      const path = describeArc(cx, cy, radius, start, end);
      return /* @__PURE__ */ jsxRuntime.jsxs("g", { children: [
        /* @__PURE__ */ jsxRuntime.jsx("path", { d: `${path} L ${cx} ${cy} Z`, fill: color }),
        innerRadius > 0 ? /* @__PURE__ */ jsxRuntime.jsx("circle", { cx, cy, r: innerRadius, fill: "hsl(var(--background))" }) : null
      ] }, index);
    }),
    data.map((row, index) => /* @__PURE__ */ jsxRuntime.jsxs("text", { x: PAD, y: PAD + index * 14, className: "fill-foreground text-[10px]", children: [
      readKey(row, labelKey),
      " (",
      readNumber(row, valueKey),
      ")"
    ] }, `label-${index}`))
  ] });
}
function ScatterChartSvg({ data, xKey = "x", yKey = "y" }) {
  const maxX = maxOf(data, xKey) || 1;
  const maxY = maxOf(data, yKey) || 1;
  const innerW = VIEW_W - PAD * 2;
  const innerH = VIEW_H - PAD * 2;
  return /* @__PURE__ */ jsxRuntime.jsx("g", { children: data.map((row, index) => {
    const x = PAD + readNumber(row, xKey) / maxX * innerW;
    const y = VIEW_H - PAD - readNumber(row, yKey) / maxY * innerH;
    return /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: x, cy: y, r: 4, fill: CHART_COLORS[index % CHART_COLORS.length] }, index);
  }) });
}
function Chart({
  type,
  data,
  xKey,
  yKey,
  valueKey,
  labelKey,
  responsive = true,
  legend = false,
  grid = true,
  height = 240,
  width = "100%",
  innerRadius,
  horizontal,
  area,
  showPoints,
  className,
  ...props
}) {
  const chartProps = {
    type,
    data,
    xKey,
    yKey,
    valueKey,
    labelKey,
    horizontal,
    area: type === "area" || area,
    showPoints,
    innerRadius: type === "donut" ? innerRadius ?? 40 : innerRadius
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: cn("w-full", className), style: { width, height: typeof height === "number" ? `${height}px` : height }, children: [
    /* @__PURE__ */ jsxRuntime.jsxs("svg", { viewBox: `0 0 ${VIEW_W} ${VIEW_H}`, width: "100%", height: "100%", role: "img", "aria-label": "Chart", ...props, children: [
      grid && type !== "pie" && type !== "donut" ? /* @__PURE__ */ jsxRuntime.jsx(GridLines, {}) : null,
      type === "bar" ? /* @__PURE__ */ jsxRuntime.jsx(BarChartSvg, { ...chartProps }) : null,
      type === "line" || type === "area" ? /* @__PURE__ */ jsxRuntime.jsx(LineChartSvg, { ...chartProps }) : null,
      type === "scatter" ? /* @__PURE__ */ jsxRuntime.jsx(ScatterChartSvg, { ...chartProps }) : null,
      type === "pie" || type === "donut" ? /* @__PURE__ */ jsxRuntime.jsx(PieChartSvg, { ...chartProps, innerRadius: type === "donut" ? innerRadius ?? 40 : 0 }) : null
    ] }),
    legend ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-2 flex flex-wrap gap-3", children: data.map((row, index) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "h-2 w-2 rounded-full", style: { backgroundColor: CHART_COLORS[index % CHART_COLORS.length] } }),
      readKey(row, labelKey ?? xKey ?? "label")
    ] }, index)) }) : null
  ] });
}
Chart.displayName = "Chart";
function BarChart({ data, xKey, yKey, stacked, horizontal, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(Chart, { type: "bar", data, xKey, yKey, horizontal, stacked, ...props });
}
BarChart.displayName = "BarChart";
function LineChart({ data, xKey, yKey, curve: _curve = "linear", showPoints = true, area, ...props }) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Chart,
    {
      type: area ? "area" : "line",
      data,
      xKey,
      yKey,
      showPoints,
      area,
      ...props
    }
  );
}
LineChart.displayName = "LineChart";
function PieChart({ data, valueKey, labelKey, innerRadius, ...props }) {
  const isDonut = innerRadius != null && innerRadius > 0;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Chart,
    {
      type: isDonut ? "donut" : "pie",
      data,
      valueKey,
      labelKey,
      innerRadius,
      ...props
    }
  );
}
PieChart.displayName = "PieChart";

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
      },
      ocean: {
        name: "Ocean",
        file: "color/ocean.json",
        icon: "\u{1F30A}",
        description: "Teal accent on a light aqua surface"
      },
      forest: {
        name: "Forest",
        file: "color/forest.json",
        icon: "\u{1F332}",
        description: "Green accent on a soft natural background"
      },
      rose: {
        name: "Rose",
        file: "color/rose.json",
        icon: "\u{1F339}",
        description: "Rose accent with warm pink surfaces"
      },
      midnight: {
        name: "Midnight",
        file: "color/midnight.json",
        icon: "\u{1F30C}",
        description: "Deep indigo dark theme"
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
  },
  z: {
    sticky: "10",
    dropdown: "20",
    overlay: "40",
    modal: "50",
    toast: "60"
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
    },
    green: {
      "50": "#f0fdf4",
      "100": "#dcfce7",
      "200": "#bbf7d0",
      "300": "#86efac",
      "400": "#4ade80",
      "500": "#22c55e",
      "600": "#16a34a",
      "700": "#15803d",
      "800": "#166534",
      "900": "#14532d",
      "950": "#052e16"
    },
    teal: {
      "50": "#f0fdfa",
      "100": "#ccfbf1",
      "200": "#99f6e4",
      "300": "#5eead4",
      "400": "#2dd4bf",
      "500": "#14b8a6",
      "600": "#0d9488",
      "700": "#0f766e",
      "800": "#115e59",
      "900": "#134e4a",
      "950": "#042f2e"
    },
    amber: {
      "50": "#fffbeb",
      "100": "#fef3c7",
      "200": "#fde68a",
      "300": "#fcd34d",
      "400": "#fbbf24",
      "500": "#f59e0b",
      "600": "#d97706",
      "700": "#b45309",
      "800": "#92400e",
      "900": "#78350f",
      "950": "#451a03"
    },
    sky: {
      "50": "#f0f9ff",
      "100": "#e0f2fe",
      "200": "#bae6fd",
      "300": "#7dd3fc",
      "400": "#38bdf8",
      "500": "#0ea5e9",
      "600": "#0284c7",
      "700": "#0369a1",
      "800": "#075985",
      "900": "#0c4a6e",
      "950": "#082f49"
    },
    rose: {
      "50": "#fff1f2",
      "100": "#ffe4e6",
      "200": "#fecdd3",
      "300": "#fda4af",
      "400": "#fb7185",
      "500": "#f43f5e",
      "600": "#e11d48",
      "700": "#be123c",
      "800": "#9f1239",
      "900": "#881337",
      "950": "#4c0519"
    },
    indigo: {
      "50": "#eef2ff",
      "100": "#e0e7ff",
      "200": "#c7d2fe",
      "300": "#a5b4fc",
      "400": "#818cf8",
      "500": "#6366f1",
      "600": "#4f46e5",
      "700": "#4338ca",
      "800": "#3730a3",
      "900": "#312e81",
      "950": "#1e1b4b"
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
    destructive: "{palette.red.400}",
    "destructive-foreground": "{palette.white}",
    success: "{palette.green.400}",
    "success-foreground": "{palette.gray.950}",
    warning: "{palette.amber.400}",
    "warning-foreground": "{palette.gray.900}",
    info: "{palette.sky.400}",
    "info-foreground": "{palette.gray.900}",
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
    destructive: "{palette.red.600}",
    "destructive-foreground": "{palette.white}",
    success: "{palette.green.700}",
    "success-foreground": "{palette.white}",
    warning: "{palette.amber.600}",
    "warning-foreground": "{palette.gray.900}",
    info: "{palette.sky.500}",
    "info-foreground": "{palette.white}",
    border: "{palette.gray.200}",
    input: "{palette.gray.200}",
    ring: "{palette.gray.400}",
    skeleton: "{palette.gray.200}"
  }
};

// src/tokens/themes/color/ocean.json
var ocean_default = {
  _createdBy: "shru-design-system library",
  color: {
    primary: "{palette.teal.600}",
    "primary-foreground": "{palette.white}",
    background: "{palette.teal.50}",
    foreground: "{palette.gray.900}",
    card: "{palette.white}",
    "card-foreground": "{palette.gray.900}",
    popover: "{palette.white}",
    "popover-foreground": "{palette.gray.900}",
    secondary: "{palette.teal.100}",
    "secondary-foreground": "{palette.teal.900}",
    muted: "{palette.teal.50}",
    "muted-foreground": "{palette.teal.700}",
    accent: "{palette.teal.100}",
    "accent-foreground": "{palette.teal.900}",
    destructive: "{palette.red.600}",
    "destructive-foreground": "{palette.white}",
    success: "{palette.green.700}",
    "success-foreground": "{palette.white}",
    warning: "{palette.amber.600}",
    "warning-foreground": "{palette.teal.900}",
    info: "{palette.sky.500}",
    "info-foreground": "{palette.white}",
    border: "{palette.teal.200}",
    input: "{palette.teal.200}",
    ring: "{palette.teal.400}",
    skeleton: "{palette.teal.100}"
  }
};

// src/tokens/themes/color/forest.json
var forest_default = {
  _createdBy: "shru-design-system library",
  color: {
    primary: "{palette.green.600}",
    "primary-foreground": "{palette.white}",
    background: "{palette.green.50}",
    foreground: "{palette.gray.900}",
    card: "{palette.white}",
    "card-foreground": "{palette.gray.900}",
    popover: "{palette.white}",
    "popover-foreground": "{palette.gray.900}",
    secondary: "{palette.green.100}",
    "secondary-foreground": "{palette.green.900}",
    muted: "{palette.green.50}",
    "muted-foreground": "{palette.green.700}",
    accent: "{palette.green.100}",
    "accent-foreground": "{palette.green.900}",
    destructive: "{palette.red.600}",
    "destructive-foreground": "{palette.white}",
    success: "{palette.teal.700}",
    "success-foreground": "{palette.white}",
    warning: "{palette.amber.600}",
    "warning-foreground": "{palette.green.900}",
    info: "{palette.sky.500}",
    "info-foreground": "{palette.white}",
    border: "{palette.green.200}",
    input: "{palette.green.200}",
    ring: "{palette.green.400}",
    skeleton: "{palette.green.100}"
  }
};

// src/tokens/themes/color/rose.json
var rose_default = {
  _createdBy: "shru-design-system library",
  color: {
    primary: "{palette.rose.600}",
    "primary-foreground": "{palette.white}",
    background: "{palette.rose.50}",
    foreground: "{palette.gray.900}",
    card: "{palette.white}",
    "card-foreground": "{palette.gray.900}",
    popover: "{palette.white}",
    "popover-foreground": "{palette.gray.900}",
    secondary: "{palette.rose.100}",
    "secondary-foreground": "{palette.rose.900}",
    muted: "{palette.rose.50}",
    "muted-foreground": "{palette.rose.700}",
    accent: "{palette.rose.100}",
    "accent-foreground": "{palette.rose.900}",
    destructive: "{palette.red.600}",
    "destructive-foreground": "{palette.white}",
    success: "{palette.green.700}",
    "success-foreground": "{palette.white}",
    warning: "{palette.amber.600}",
    "warning-foreground": "{palette.rose.900}",
    info: "{palette.sky.500}",
    "info-foreground": "{palette.white}",
    border: "{palette.rose.200}",
    input: "{palette.rose.200}",
    ring: "{palette.rose.400}",
    skeleton: "{palette.rose.100}"
  }
};

// src/tokens/themes/color/midnight.json
var midnight_default = {
  _createdBy: "shru-design-system library",
  color: {
    primary: "{palette.indigo.400}",
    "primary-foreground": "{palette.white}",
    background: "{palette.indigo.950}",
    foreground: "{palette.indigo.50}",
    card: "{palette.indigo.900}",
    "card-foreground": "{palette.indigo.50}",
    popover: "{palette.indigo.900}",
    "popover-foreground": "{palette.indigo.50}",
    secondary: "{palette.indigo.800}",
    "secondary-foreground": "{palette.indigo.50}",
    muted: "{palette.indigo.800}",
    "muted-foreground": "{palette.indigo.300}",
    accent: "{palette.indigo.800}",
    "accent-foreground": "{palette.indigo.50}",
    destructive: "{palette.red.400}",
    "destructive-foreground": "{palette.white}",
    success: "{palette.green.400}",
    "success-foreground": "{palette.white}",
    warning: "{palette.amber.300}",
    "warning-foreground": "{palette.indigo.950}",
    info: "{palette.sky.400}",
    "info-foreground": "{palette.indigo.950}",
    border: "{palette.indigo.700}",
    input: "{palette.indigo.700}",
    ring: "{palette.indigo.500}",
    skeleton: "{palette.indigo.800}"
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
  },
  control: {
    height: {
      sm: "2rem",
      md: "2.5rem",
      lg: "2.75rem"
    },
    padding: {
      sm: "0.625rem",
      md: "0.75rem",
      lg: "0.875rem"
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
  },
  control: {
    height: {
      sm: "1.75rem",
      md: "2rem",
      lg: "2.25rem"
    },
    padding: {
      sm: "0.5rem",
      md: "0.625rem",
      lg: "0.75rem"
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
  name: "Brand",
  icon: "\u{1F3AF}",
  description: "Purple primary with pink accent on a light surface",
  color: {
    primary: "{palette.purple.600}",
    "primary-foreground": "{palette.white}",
    background: "{palette.purple.50}",
    foreground: "{palette.gray.900}",
    card: "{palette.white}",
    "card-foreground": "{palette.gray.900}",
    popover: "{palette.white}",
    "popover-foreground": "{palette.gray.900}",
    secondary: "{palette.purple.100}",
    "secondary-foreground": "{palette.purple.900}",
    muted: "{palette.purple.50}",
    "muted-foreground": "{palette.purple.700}",
    accent: "{palette.pink.500}",
    "accent-foreground": "{palette.white}",
    destructive: "{palette.red.600}",
    "destructive-foreground": "{palette.white}",
    success: "{palette.green.700}",
    "success-foreground": "{palette.white}",
    warning: "{palette.amber.600}",
    "warning-foreground": "{palette.gray.900}",
    info: "{palette.sky.500}",
    "info-foreground": "{palette.white}",
    border: "{palette.purple.200}",
    input: "{palette.purple.200}",
    ring: "{palette.purple.400}",
    skeleton: "{palette.purple.100}"
  },
  radius: {
    button: "0.5rem",
    card: "0.75rem"
  }
};

// src/tokens/themes/custom/minimal.json
var minimal_default = {
  _createdBy: "shru-design-system library",
  name: "Minimal",
  icon: "\u26AA",
  description: "Neutral gray palette with tighter component spacing",
  color: {
    primary: "{palette.gray.700}",
    "primary-foreground": "{palette.white}",
    background: "{palette.white}",
    foreground: "{palette.gray.900}",
    card: "{palette.white}",
    "card-foreground": "{palette.gray.900}",
    popover: "{palette.white}",
    "popover-foreground": "{palette.gray.900}",
    secondary: "{palette.gray.100}",
    "secondary-foreground": "{palette.gray.900}",
    muted: "{palette.gray.50}",
    "muted-foreground": "{palette.gray.500}",
    accent: "{palette.gray.100}",
    "accent-foreground": "{palette.gray.900}",
    destructive: "{palette.red.600}",
    "destructive-foreground": "{palette.white}",
    success: "{palette.green.700}",
    "success-foreground": "{palette.white}",
    warning: "{palette.amber.600}",
    "warning-foreground": "{palette.gray.900}",
    info: "{palette.sky.500}",
    "info-foreground": "{palette.white}",
    border: "{palette.gray.200}",
    input: "{palette.gray.200}",
    ring: "{palette.gray.400}",
    skeleton: "{palette.gray.200}"
  },
  spacing: {
    component: {
      xs: "0.375rem",
      sm: "0.5rem",
      md: "0.75rem",
      lg: "1rem",
      xl: "1.25rem"
    }
  },
  control: {
    height: {
      sm: "1.875rem",
      md: "2.125rem",
      lg: "2.375rem"
    },
    padding: {
      sm: "0.5rem",
      md: "0.625rem",
      lg: "0.75rem"
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
  "themes/color/ocean.json": ocean_default,
  "themes/color/forest.json": forest_default,
  "themes/color/rose.json": rose_default,
  "themes/color/midnight.json": midnight_default,
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
var THEME_SYNC_EVENT = "design-system-theme-sync";
function readStoredThemes() {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}
function broadcastThemeSync(themes) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(THEME_SYNC_EVENT, { detail: themes }));
}
function useTheme() {
  const [selectedThemes, setSelectedThemes] = React9.useState(getDefaultThemes());
  const [isLoading, setIsLoading] = React9.useState(false);
  const [error, setError] = React9.useState(null);
  const applyTheme = React9.useCallback(async (themes) => {
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
  React9.useEffect(() => {
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
  React9.useEffect(() => {
    if (typeof window === "undefined") return;
    const applyExternal = (themes) => {
      setSelectedThemes(themes);
    };
    const onSync = (event) => {
      const detail = event.detail;
      if (detail) applyExternal(detail);
    };
    const onStorage = (event) => {
      if (event.key !== STORAGE_KEY) return;
      const parsed = readStoredThemes();
      if (parsed) applyExternal(parsed);
    };
    window.addEventListener(THEME_SYNC_EVENT, onSync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(THEME_SYNC_EVENT, onSync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  const updateTheme = React9.useCallback(async (category, themeId) => {
    const newThemes = {
      ...selectedThemes,
      [category]: themeId || void 0
    };
    setSelectedThemes(newThemes);
    broadcastThemeSync(newThemes);
    await applyTheme(newThemes);
  }, [selectedThemes, applyTheme]);
  const resetToDefaults = React9.useCallback(async () => {
    const defaults = getDefaultThemes();
    setSelectedThemes(defaults);
    broadcastThemeSync(defaults);
    await applyTheme(defaults);
  }, [applyTheme]);
  const applyPresetSelection = React9.useCallback(
    async (preset) => {
      const next = { ...selectedThemes, ...preset };
      setSelectedThemes(next);
      broadcastThemeSync(next);
      await applyTheme(next);
    },
    [selectedThemes, applyTheme]
  );
  const getAvailableThemes = React9.useCallback(async (category) => {
    const categories = await getThemeCategories();
    return categories[category]?.themes || {};
  }, []);
  return {
    selectedThemes,
    updateTheme,
    resetToDefaults,
    applyPreset: applyPresetSelection,
    isLoading,
    error,
    getAvailableThemes
  };
}

// src/themes/ui/ThemeToggle/useThemeToggle.ts
function useThemeToggle(options) {
  const embedded = options?.embedded ?? false;
  const { selectedThemes, updateTheme, resetToDefaults, isLoading, getAvailableThemes } = useTheme();
  const [isOpen, setIsOpen] = React9.useState(false);
  const [activeCategory, setActiveCategory] = React9.useState("color");
  const [themeCategories, setThemeCategories] = React9.useState(null);
  const [categoryThemes, setCategoryThemes] = React9.useState({});
  const [themesLoading, setThemesLoading] = React9.useState(false);
  const menuRef = React9.useRef(null);
  const triggerRef = React9.useRef(null);
  React9.useEffect(() => {
    getThemeCategories().then(setThemeCategories);
  }, []);
  React9.useEffect(() => {
    if (!embedded && !isOpen) return;
    setThemesLoading(true);
    getAvailableThemes(activeCategory).then(setCategoryThemes).finally(() => setThemesLoading(false));
  }, [embedded, isOpen, activeCategory, getAvailableThemes]);
  React9.useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event) {
      const target = event.target;
      if (menuRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      setIsOpen(false);
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
  const handleThemeSelect = React9.useCallback(
    async (category, themeId) => {
      const currentTheme = selectedThemes[category];
      const newTheme = currentTheme === themeId ? void 0 : themeId;
      await updateTheme(category, newTheme);
    },
    [selectedThemes, updateTheme]
  );
  const handleResetAll = React9.useCallback(async () => {
    await resetToDefaults();
  }, [resetToDefaults]);
  const toggleMenu = React9.useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        const firstActive = Object.entries(selectedThemes).find(([, value]) => value)?.[0] ?? "color";
        setActiveCategory(firstActive);
      }
      return next;
    });
  }, [selectedThemes]);
  const closeMenu = React9.useCallback(() => setIsOpen(false), []);
  const categories = themeCategories ? Object.entries(themeCategories).sort(([, a], [, b]) => (a.order || 0) - (b.order || 0)) : [];
  return {
    selectedThemes,
    isLoading,
    isOpen,
    activeCategory,
    categoryThemes,
    themesLoading,
    categories,
    menuRef,
    triggerRef,
    setActiveCategory,
    handleThemeSelect,
    handleResetAll,
    toggleMenu,
    closeMenu
  };
}

// src/themes/ui/ThemeToggle/themeToggleConfig.ts
var PANEL_WIDTH = 300;
var colorThemeSwatches = {
  white: { background: "#ffffff", accent: "#3b82f6" },
  dark: { background: "#111827", accent: "#818cf8" },
  ocean: { background: "#f0fdfa", accent: "#0d9488" },
  forest: { background: "#f0fdf4", accent: "#16a34a" },
  rose: { background: "#fff1f2", accent: "#e11d48" },
  midnight: { background: "#0f172a", accent: "#6366f1" },
  brand: { background: "#faf5ff", accent: "#9333ea" },
  minimal: { background: "#fafafa", accent: "#374151" }
};
var categoryIcons = {
  color: "\u{1F3A8}",
  typography: "\u{1F4DD}",
  shape: "\u{1F532}",
  density: "\u{1F4CF}",
  animation: "\u2728",
  custom: "\u{1F3AF}"
};
var positionClasses2 = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6"
};
function getPanelPlacement(position) {
  return position.startsWith("bottom") ? "above" : "below";
}
function computePanelStyle(triggerRect, position, gap = 12) {
  const alignRight = position.endsWith("right");
  const alignLeft = position.endsWith("left");
  const above = getPanelPlacement(position) === "above";
  const style = {
    position: "fixed",
    width: PANEL_WIDTH,
    maxHeight: "min(70vh, 420px)",
    zIndex: zLayerValue("modal")
  };
  if (above) {
    style.bottom = window.innerHeight - triggerRect.top + gap;
  } else {
    style.top = triggerRect.bottom + gap;
  }
  if (alignRight) {
    style.right = Math.max(12, window.innerWidth - triggerRect.right);
  }
  if (alignLeft) {
    style.left = Math.max(12, triggerRect.left);
  }
  return style;
}
function ColorSwatch({ themeId }) {
  const swatch = colorThemeSwatches[themeId];
  if (!swatch) {
    return /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-xs", children: "\u{1F3A8}" });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "span",
    {
      className: "relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-border",
      "aria-hidden": true,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute inset-0", style: { backgroundColor: swatch.background } }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "span",
          {
            className: "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-background",
            style: { backgroundColor: swatch.accent }
          }
        )
      ]
    }
  );
}
function buildSummaryLine(categories, selectedThemes) {
  const labels = categories.map(([key, category]) => {
    const themeId = selectedThemes[key];
    if (!themeId) return null;
    return category.themes[themeId]?.name ?? themeId;
  }).filter(Boolean);
  return labels.length > 0 ? labels.join(" \xB7 ") : "Default theme";
}
function ThemePanel({
  categories,
  selectedThemes,
  activeCategory,
  onCategoryChange,
  categoryThemes,
  themesLoading,
  isApplying,
  onThemeSelect,
  onResetAll,
  onClose,
  showClose = true,
  className
}) {
  const themeEntries = Object.entries(categoryThemes);
  const activeCategoryMeta = categories.find(([key]) => key === activeCategory)?.[1];
  const summaryLine = buildSummaryLine(categories, selectedThemes);
  const categoryTabs = categories.map(([key, category]) => ({
    label: category.name,
    value: key,
    left: categoryIcons[key] ?? "\u2699\uFE0F",
    selected: key === activeCategory
  }));
  return /* @__PURE__ */ jsxRuntime.jsx(
    Card,
    {
      variant: "surface-1",
      size: "sm",
      className: cn("max-h-[min(70vh,420px)] shadow-xl", className),
      header: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          PageHeader,
          {
            heading: "Themes",
            description: summaryLine,
            actions: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                HistoryControlButtons,
                {
                  showUndo: false,
                  showRedo: false,
                  onReset: onResetAll,
                  resetButtonProps: { disabled: isApplying }
                }
              ),
              showClose && onClose ? /* @__PURE__ */ jsxRuntime.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  iconOnly: true,
                  ariaLabel: "Close theme panel",
                  left: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4" }),
                  onClick: onClose
                }
              ) : null
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntime.jsx(
          PillGroup,
          {
            size: "sm",
            variant: "outline",
            wrap: true,
            selectable: true,
            multiple: false,
            value: [activeCategory],
            onChange: (next) => {
              if (next[0]) onCategoryChange(next[0]);
            },
            items: categoryTabs
          }
        )
      ] }),
      footer: isApplying ? /* @__PURE__ */ jsxRuntime.jsx(Text, { as: "p", size: "xs", variant: "muted", children: "Applying theme\u2026" }) : void 0,
      children: themesLoading ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-2 gap-2", children: Array.from({ length: 6 }).map((_, index) => /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { variant: "button", className: "h-10 w-full" }, index)) }) : themeEntries.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "rounded-md border border-dashed border-border bg-muted/30 px-3 py-6 text-center", children: /* @__PURE__ */ jsxRuntime.jsxs(Text, { as: "p", size: "sm", variant: "muted", children: [
        "No themes in ",
        activeCategoryMeta?.name ?? activeCategory
      ] }) }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-2 gap-2 pb-1", children: themeEntries.map(([themeId, theme]) => {
        const selected = selectedThemes[activeCategory] === themeId;
        return /* @__PURE__ */ jsxRuntime.jsxs(
          Button,
          {
            type: "button",
            size: "sm",
            variant: selected ? "primary" : "outline",
            disabled: isApplying,
            "aria-pressed": selected,
            "aria-label": theme.description ? `${theme.name} \u2014 ${theme.description}` : theme.name,
            className: "h-auto w-full justify-start gap-2 px-2 py-2 text-left font-normal",
            onClick: () => onThemeSelect(activeCategory, themeId),
            children: [
              activeCategory === "color" ? /* @__PURE__ */ jsxRuntime.jsx(ColorSwatch, { themeId }) : /* @__PURE__ */ jsxRuntime.jsx("span", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-sm", children: theme.icon }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "min-w-0 flex-1 truncate", children: theme.name })
            ]
          },
          themeId
        );
      }) })
    }
  );
}
function ThemeToggle({ className, position = "bottom-right" }) {
  const {
    selectedThemes,
    isLoading,
    isOpen,
    activeCategory,
    categoryThemes,
    themesLoading,
    categories,
    menuRef,
    triggerRef,
    setActiveCategory,
    handleThemeSelect,
    handleResetAll,
    toggleMenu,
    closeMenu
  } = useThemeToggle();
  const [panelStyle, setPanelStyle] = React9.useState({ visibility: "hidden" });
  const updatePanelPosition = React9__namespace.default.useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    setPanelStyle(computePanelStyle(trigger.getBoundingClientRect(), position));
  }, [position]);
  React9.useLayoutEffect(() => {
    if (!isOpen) return;
    updatePanelPosition();
    const onReflow = () => updatePanelPosition();
    window.addEventListener("scroll", onReflow, true);
    window.addEventListener("resize", onReflow);
    return () => {
      window.removeEventListener("scroll", onReflow, true);
      window.removeEventListener("resize", onReflow);
    };
  }, [isOpen, updatePanelPosition]);
  const panelOrigin = position === "bottom-right" ? "origin-bottom-right" : position === "bottom-left" ? "origin-bottom-left" : position === "top-right" ? "origin-top-right" : "origin-top-left";
  const panel = isOpen && typeof document !== "undefined" ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    reactDom.createPortal(
      /* @__PURE__ */ jsxRuntime.jsx(
        "button",
        {
          type: "button",
          "aria-label": "Close theme panel",
          className: "fixed inset-0 z-overlay bg-background/35 backdrop-blur-[1px] transition-opacity duration-200",
          onClick: closeMenu
        }
      ),
      document.body
    ),
    reactDom.createPortal(
      /* @__PURE__ */ jsxRuntime.jsx(
        "div",
        {
          ref: menuRef,
          style: panelStyle,
          className: cn(
            panelOrigin,
            "transition-all duration-200 ease-out",
            isOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
          ),
          role: "dialog",
          "aria-label": "Theme settings",
          children: /* @__PURE__ */ jsxRuntime.jsx(
            ThemePanel,
            {
              categories,
              selectedThemes,
              activeCategory,
              onCategoryChange: setActiveCategory,
              categoryThemes,
              themesLoading,
              isApplying: isLoading,
              onThemeSelect: handleThemeSelect,
              onResetAll: handleResetAll,
              onClose: closeMenu
            }
          )
        }
      ),
      document.body
    )
  ] }) : null;
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { id: "theme-toggle", className: cn("fixed z-modal", positionClasses2[position], className), children: [
    /* @__PURE__ */ jsxRuntime.jsx(Tooltip, { content: "Theme settings", placement: position.endsWith("right") ? "left" : "right", children: /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        ref: triggerRef,
        type: "button",
        onClick: toggleMenu,
        "aria-expanded": isOpen,
        "aria-haspopup": "dialog",
        className: cn(
          "flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg",
          "transition-all duration-200 hover:scale-110 hover:shadow-xl active:scale-95",
          isOpen && "rotate-90 ring-2 ring-ring ring-offset-2 ring-offset-background"
        ),
        "aria-label": "Theme settings",
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
            "aria-hidden": true,
            children: [
              /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73 2.15l.22.38a2 2 0 0 1 0 2.73l-.22.38a2 2 0 0 0 2.15 2.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-2.15l-.22-.38a2 2 0 0 1 0-2.73l.22-.38a2 2 0 0 0-2.15-2.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }),
              /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "3" })
            ]
          }
        )
      }
    ) }),
    panel
  ] });
}

// src/themes/applyPreset.ts
async function applyPreset(preset, options) {
  const { base, persist = true, storageKey = "design-system-theme" } = options ?? {};
  const next = { ...base ?? getDefaultThemes(), ...preset };
  await generateAndApplyTheme(next);
  if (persist && typeof window !== "undefined") {
    localStorage.setItem(storageKey, JSON.stringify(next));
  }
  return next;
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
exports.Alert = Alert;
exports.AlertDialog = AlertDialog;
exports.AppShell = AppShell;
exports.AspectRatio = AspectRatio;
exports.AuthLayout = AuthLayout;
exports.Avatar = Avatar;
exports.AvatarGroup = AvatarGroup;
exports.Badge = Badge;
exports.BarChart = BarChart;
exports.Breadcrumb = Breadcrumb;
exports.Button = Button;
exports.Calendar = Calendar;
exports.Card = Card;
exports.Carousel = Carousel;
exports.Chart = Chart;
exports.Checkbox = Checkbox;
exports.CodeBlock = CodeBlock;
exports.Collapsible = Collapsible;
exports.Command = Command;
exports.ConfirmModal = ConfirmModal;
exports.ContextMenu = ContextMenu;
exports.CopyButton = CopyButton;
exports.DatePicker = DatePicker;
exports.DateRangePicker = DateRangePicker;
exports.DescriptionList = DescriptionList;
exports.Drawer = Drawer;
exports.Dropdown = Dropdown;
exports.EmptyState = EmptyState;
exports.ErrorBoundary = ErrorBoundary;
exports.FAB = FAB;
exports.FieldLayout = FieldLayout;
exports.FixedScreenWidget = FixedScreenWidget;
exports.Form = Form;
exports.FormField = FormField;
exports.FormModal = FormModal;
exports.Grid = Grid;
exports.HelperText = HelperText;
exports.Hero = Hero;
exports.HistoryControlButtons = HistoryControlButtons;
exports.HoverCard = HoverCard;
exports.Icon = Icon;
exports.Image = Image;
exports.InlineEdit = InlineEdit;
exports.InputGroup = InputGroup;
exports.InputGroupAddon = InputGroupAddon;
exports.InputGroupButton = InputGroupButton;
exports.InputGroupInput = InputGroupInput;
exports.InputOTP = InputOTP;
exports.Kbd = Kbd;
exports.KbdGroup = KbdGroup;
exports.Label = Label;
exports.LineChart = LineChart;
exports.Link = Link;
exports.List = List;
exports.LoadingOverlay = LoadingOverlay;
exports.Menubar = Menubar;
exports.Modal = Modal;
exports.Navbar = Navbar;
exports.NavigationMenu = NavigationMenu;
exports.Overlay = Overlay;
exports.OverlayPortalScope = OverlayPortalScope;
exports.PageFooter = PageFooter;
exports.PageHeader = PageHeader;
exports.Pagination = Pagination;
exports.PhoneInput = PhoneInput;
exports.PieChart = PieChart;
exports.Pill = Pill;
exports.PillGroup = PillGroup;
exports.Popover = Popover;
exports.Progress = Progress;
exports.Radio = Radio;
exports.RadioGroup = RadioGroup;
exports.Rating = Rating;
exports.ResizableHandle = ResizableHandle;
exports.ResizablePanel = ResizablePanel;
exports.ResizablePanelGroup = ResizablePanelGroup;
exports.ResizeContainer = ResizeContainer;
exports.SearchInput = SearchInput;
exports.Select = Select;
exports.Separator = Separator;
exports.Sidebar = Sidebar;
exports.Skeleton = Skeleton;
exports.Slider = Slider;
exports.Spinner = Spinner;
exports.SplitButton = SplitButton;
exports.Stack = Stack;
exports.Stepper = Stepper;
exports.THEME_CATEGORY_ORDER = THEME_CATEGORY_ORDER;
exports.Table = Table;
exports.TableSkeleton = TableSkeleton;
exports.Tabs = Tabs;
exports.Tag = Tag;
exports.Text = Text;
exports.TextInput = TextInput;
exports.Textarea = Textarea;
exports.ThemePanel = ThemePanel;
exports.ThemeToggle = ThemeToggle;
exports.TimePicker = TimePicker;
exports.Toast = Toast;
exports.Toaster = Toaster;
exports.Toggle = Toggle;
exports.Tooltip = Tooltip;
exports.TooltipProvider = TooltipProvider;
exports.TreeView = TreeView;
exports.TriggerModal = TriggerModal;
exports.Upload = Upload;
exports.Video = Video;
exports.VisuallyHidden = VisuallyHidden;
exports.addTreeNodeChild = addTreeNodeChild;
exports.addTreeNodeSibling = addTreeNodeSibling;
exports.alertDialogVariants = alertDialogVariants;
exports.alertVariants = alertVariants;
exports.applyPreset = applyPreset;
exports.applyThemeSync = applyThemeSync;
exports.badgeVariants = pillSurfaceVariants;
exports.buttonVariants = buttonVariants;
exports.cardVariants = cardVariants;
exports.clearToasts = clearToasts;
exports.defaultListItemFilter = defaultListItemFilter;
exports.deleteTreeNode = deleteTreeNode;
exports.descriptionListVariants = descriptionListVariants;
exports.disabledControl = disabledControl;
exports.dismissToast = dismissToast;
exports.drawerVariants = drawerVariants;
exports.emptyStateVariants = emptyStateVariants;
exports.enableDebugMode = enableDebugMode;
exports.fieldSurfaceVariants = fieldSurfaceVariants;
exports.focusRing = focusRing;
exports.focusRingDestructive = focusRingDestructive;
exports.focusRingOffset = focusRingOffset;
exports.formatAspectRatioLabel = formatAspectRatioLabel;
exports.getCurrentCSSVariables = getCurrentCSSVariables;
exports.getPhoneDialCode = getPhoneDialCode;
exports.getStringFieldValidationError = getStringFieldValidationError;
exports.getTheme = getTheme;
exports.getThemeCategories = getThemeCategories;
exports.getThemeFilePath = getThemeFilePath;
exports.getThemesForCategory = getThemesForCategory;
exports.gridVariants = gridSpacingVariants;
exports.heroVariants = heroVariants;
exports.iconVariants = iconVariants;
exports.linkVariants = linkVariants;
exports.modalSurfaceVariants = modalSurfaceVariants;
exports.moveTreeNode = moveTreeNode;
exports.navbarVariants = navbarVariants;
exports.overlayVariants = overlayVariants;
exports.pageFooterVariants = pageFooterVariants;
exports.pageHeaderVariants = pageHeaderVariants;
exports.peerFocusRing = peerFocusRing;
exports.pillVariants = pillSurfaceVariants;
exports.ratingVariants = ratingVariants;
exports.registerTheme = registerTheme;
exports.registerThemeFromFile = registerThemeFromFile;
exports.ringOffsetBackground = ringOffsetBackground;
exports.sidebarVariants = sidebarVariants;
exports.stackVariants = stackVariants;
exports.textVariants = textVariants;
exports.toast = toast;
exports.toastVariants = toastVariants;
exports.toggleThumbVariants = toggleThumbVariants;
exports.toggleVariants = toggleVariants;
exports.tooltipArrowVariants = tooltipArrowVariants;
exports.tooltipContentVariants = tooltipContentVariants;
exports.useFormContext = useFormContext;
exports.useTheme = useTheme;
exports.useThemeToggle = useThemeToggle;
