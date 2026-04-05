import * as React33 from 'react';
import { useState, useCallback, useEffect, useRef } from 'react';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { Star, X, Search, GripVertical } from 'lucide-react';
import { OTPInput, REGEXP_ONLY_DIGITS } from 'input-otp';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { createPortal } from 'react-dom';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

// src/components/actions/Button.tsx
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var iconVariants = cva("inline-flex items-center justify-center shrink-0", {
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
var Icon = React33.forwardRef(
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
    const resolvedContent = node ?? fallback ?? null;
    if (!resolvedContent) return null;
    return /* @__PURE__ */ jsxs(
      "span",
      {
        ref,
        "data-slot": "icon",
        role: alt ? "img" : void 0,
        "aria-label": alt,
        className: cn(iconVariants({ size, variant, shape }), status && "relative", className),
        ...props,
        children: [
          React33.isValidElement(resolvedContent) ? React33.cloneElement(resolvedContent, {
            className: cn(resolvedContent.props.className),
            "aria-hidden": alt ? void 0 : true
          }) : resolvedContent,
          status && /* @__PURE__ */ jsx(
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
var textVariants = cva("text-foreground", {
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
var Text = React33.forwardRef(
  ({ as: Comp = "div", left, right, truncate, lineClamp, size, variant, weight, className, children, ...props }, ref) => {
    const resolvedSize = size ?? "md";
    const iconSize = textIconSizeMap[resolvedSize];
    const clamped = lineClamp != null;
    return /* @__PURE__ */ jsxs(
      Comp,
      {
        ref,
        "data-slot": "text",
        className: cn(
          textVariants({ size, variant, weight }),
          "inline-flex min-w-0 items-center gap-1.5",
          className
        ),
        ...props,
        children: [
          left ? /* @__PURE__ */ jsx(Icon, { node: left, size: iconSize }) : null,
          /* @__PURE__ */ jsx(
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
          right ? /* @__PURE__ */ jsx(Icon, { node: right, size: iconSize }) : null
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
var HelperText = React33.forwardRef(
  ({ tone = "muted", className, children, ...props }, ref) => /* @__PURE__ */ jsx(
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
var labelVariants = cva("inline-flex items-center gap-1.5 text-foreground", {
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
var Label = React33.forwardRef(
  ({ size, required, left, className, children, ...props }, ref) => {
    const resolvedSize = size ?? "md";
    return /* @__PURE__ */ jsxs(
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
          required ? /* @__PURE__ */ jsx("span", { className: textVariants({ variant: "danger" }), children: "*" }) : null
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
  const validationOpts = React33.useMemo(
    () => ({ validate, required, minLength, maxLength, errorMessage }),
    [validate, required, minLength, maxLength, errorMessage]
  );
  const validationError = React33.useMemo(
    () => getStringFieldValidationError(value, validationOpts),
    [value, validationOpts]
  );
  React33.useEffect(() => {
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
var fieldSurfaceVariants = cva(fieldSurfaceBase, {
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
    { control: "input", size: "sm", class: "h-8 text-sm px-2.5" },
    { control: "input", size: "md", class: "h-10 text-sm px-3" },
    { control: "input", size: "lg", class: "h-11 text-base px-3.5" },
    { control: "textarea", size: "sm", class: "text-sm px-2.5 py-2" },
    { control: "textarea", size: "md", class: "text-sm px-3 py-2.5" },
    { control: "textarea", size: "lg", class: "text-base px-3.5 py-3" }
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
  return /* @__PURE__ */ jsxs("div", { className: cn("w-full space-y-1.5", className), children: [
    label ? /* @__PURE__ */ jsx(Label, { htmlFor, required, size, children: label }) : null,
    children,
    /* @__PURE__ */ jsx(ControlErrorMessage, { message: errorMessage })
  ] });
}
function ControlLabelStack(props) {
  const { label, description, as: Comp = "span", htmlFor, className } = props;
  if (!label && !description) return null;
  return /* @__PURE__ */ jsxs(Comp, { htmlFor: Comp === "label" ? htmlFor : void 0, className: cn("grid gap-0.5 leading-tight", className), children: [
    label ? /* @__PURE__ */ jsx(Text, { as: "span", size: "sm", weight: "medium", children: label }) : null,
    description ? /* @__PURE__ */ jsx(Text, { as: "span", size: "xs", variant: "muted", children: description }) : null
  ] });
}
function ControlErrorMessage(props) {
  const { message } = props;
  if (!message) return null;
  return /* @__PURE__ */ jsx(HelperText, { tone: "error", children: message });
}
var adornmentPosition = {
  left: "absolute inset-y-0 left-0 flex items-center pl-3",
  right: "absolute inset-y-0 right-0 flex items-center pr-3"
};
function InputAdornmentSlot(props) {
  const { side, node, iconSize = "sm", interactive = false } = props;
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn(
        adornmentPosition[side],
        interactive ? "pointer-events-auto" : "pointer-events-none",
        textVariants({ variant: "muted" })
      ),
      children: React33.isValidElement(node) ? node : /* @__PURE__ */ jsx(Icon, { node, size: iconSize })
    }
  );
}
var sizeClass = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6"
};
var Spinner = React33.forwardRef(
  ({ size = "md", className, label = "Loading", ...props }, ref) => /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "3", className: "opacity-25" }),
        /* @__PURE__ */ jsx(
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
var buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors ${focusRing} ${focusRingOffset} ${disabledControl}`,
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
        sm: "h-8 px-3 text-sm",
        md: "h-9 px-4 text-sm",
        lg: "h-11 px-6 text-base"
      },
      iconOnly: {
        true: "aspect-square p-0",
        false: ""
      }
    },
    compoundVariants: [
      { iconOnly: true, size: "sm", class: "w-8" },
      { iconOnly: true, size: "md", class: "w-9" },
      { iconOnly: true, size: "lg", class: "w-11" }
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      iconOnly: false
    }
  }
);
var Button = React33.forwardRef((props, ref) => {
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
    disabled,
    ...domProps
  } = props;
  const busy = Boolean(loading);
  const content = /* @__PURE__ */ jsxs(Fragment, { children: [
    busy ? /* @__PURE__ */ jsx(Spinner, { size: size === "lg" ? "md" : "sm" }) : left ? /* @__PURE__ */ jsx(Icon, { node: left, size: "sm" }) : null,
    !iconOnly ? children ?? label : null,
    !busy && right ? /* @__PURE__ */ jsx(Icon, { node: right, size: "sm" }) : null
  ] });
  const classes = cn(buttonVariants({ variant, size, iconOnly }), className);
  if (href) {
    return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
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
var fabVariants = cva(
  `fixed z-30 inline-flex items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 ${focusRing} ${disabledControl}`,
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
var FAB = React33.forwardRef(
  ({ left, ariaLabel, variant, size, position, className, ...props }, ref) => /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      "aria-label": ariaLabel,
      className: cn(fabVariants({ variant, size, position }), className),
      ...props,
      children: /* @__PURE__ */ jsx(Icon, { node: left, size: size === "lg" ? "lg" : "md" })
    }
  )
);
FAB.displayName = "FAB";
var TextInput = React33.forwardRef(
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
    const generatedId = React33.useId();
    const inputId = id ?? generatedId;
    const [uncontrolledValue, setUncontrolledValue] = React33.useState(String(defaultValue ?? ""));
    const resolvedValue = value != null ? String(value) : uncontrolledValue;
    const { validationError, hasError, validationOpts } = useSyncStringFieldValidation(resolvedValue, {
      validate,
      required,
      minLength,
      maxLength,
      errorMessage,
      onValidate
    });
    return /* @__PURE__ */ jsx(
      FieldLayout,
      {
        label,
        htmlFor: inputId,
        required,
        size,
        errorMessage: hasError ? validationError : void 0,
        children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          left ? /* @__PURE__ */ jsx(InputAdornmentSlot, { side: "left", node: left }) : null,
          /* @__PURE__ */ jsx(
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
          right ? /* @__PURE__ */ jsx(InputAdornmentSlot, { side: "right", node: right, interactive: rightInteractive }) : null
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
var Textarea = React33.forwardRef(
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
    const generatedId = React33.useId();
    const textareaId = id ?? generatedId;
    const [uncontrolledValue, setUncontrolledValue] = React33.useState(String(defaultValue ?? ""));
    const resolvedValue = value != null ? String(value) : uncontrolledValue;
    const { validationError, hasError, validationOpts } = useSyncStringFieldValidation(resolvedValue, {
      validate,
      required,
      minLength,
      maxLength,
      errorMessage,
      onValidate
    });
    return /* @__PURE__ */ jsx(
      FieldLayout,
      {
        label,
        htmlFor: textareaId,
        required,
        size,
        errorMessage: hasError ? validationError : void 0,
        children: /* @__PURE__ */ jsx(
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
var checkboxVariants = cva(
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
var Checkbox = React33.forwardRef(
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
    const generatedId = React33.useId();
    const checkboxId = id ?? generatedId;
    const isControlled = checked !== void 0 && onChange != null;
    const resolvedDefault = Boolean(defaultState ?? checked);
    const [internalChecked, setInternalChecked] = React33.useState(resolvedDefault);
    const resolvedChecked = isControlled ? Boolean(checked) : internalChecked;
    const inputRef = React33.useRef(null);
    React33.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = Boolean(indeterminate);
      }
    }, [indeterminate]);
    React33.useImperativeHandle(ref, () => inputRef.current);
    return /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsx(
          "span",
          {
            "aria-hidden": "true",
            className: cn(
              checkboxVariants({ size }),
              peerFocusRing,
              resolvedChecked && "border-primary bg-primary text-primary-foreground",
              className
            ),
            children: indeterminate || resolvedChecked ? /* @__PURE__ */ jsx("span", { className: "text-[11px] leading-none", children: indeterminate ? "\u2212" : "\u2713" }) : null
          }
        ),
        /* @__PURE__ */ jsx(ControlLabelStack, { as: "label", htmlFor: checkboxId, label, description })
      ] }),
      /* @__PURE__ */ jsx(ControlErrorMessage, { message: errorMessage })
    ] });
  }
);
Checkbox.displayName = "Checkbox";
var radioVariants = cva(
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
var Radio = React33.forwardRef(
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
    ...props
  }, ref) => {
    const generatedId = React33.useId();
    const radioId = id ?? generatedId;
    const resolvedDefault = defaultState ?? defaultChecked;
    const [internalChecked, setInternalChecked] = React33.useState(Boolean(checked ?? resolvedDefault));
    const isControlled = checked !== void 0 && onChange != null;
    const resolvedChecked = isControlled ? checked : internalChecked;
    return /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxs("label", { htmlFor: radioId, className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsxs("span", { className: cn(radioVariants({ size, selected: resolvedChecked }), className), children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              ref,
              id: radioId,
              type: "radio",
              className: "sr-only",
              checked: isControlled ? checked : void 0,
              defaultChecked: isControlled ? resolvedDefault : checked ?? resolvedDefault,
              onChange: (event) => {
                if (!isControlled) {
                  setInternalChecked(event.target.checked);
                }
                onChange?.(event.target.checked);
              },
              ...props
            }
          ),
          resolvedChecked ? /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-primary" }) : null
        ] }),
        /* @__PURE__ */ jsx(ControlLabelStack, { label, description })
      ] }),
      /* @__PURE__ */ jsx(ControlErrorMessage, { message: errorMessage })
    ] });
  }
);
Radio.displayName = "Radio";
var switchVariants = cva(
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
var thumbVariants = cva(
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
var Switch = React33.forwardRef(
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
    ...props
  }, ref) => {
    const generatedId = React33.useId();
    const switchId = id ?? generatedId;
    const isControlled = checked !== void 0 && onChange != null;
    const resolvedDefault = defaultState ?? defaultChecked;
    return /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxs("label", { htmlFor: switchId, className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsx(
          SwitchPrimitive.Root,
          {
            ref,
            id: switchId,
            className: cn(switchVariants({ size }), className),
            checked: isControlled ? checked : void 0,
            defaultChecked: isControlled ? resolvedDefault : checked ?? resolvedDefault,
            onCheckedChange: (next) => onChange?.(next),
            ...props,
            children: /* @__PURE__ */ jsx(SwitchPrimitive.Thumb, { className: thumbVariants({ size }) })
          }
        ),
        /* @__PURE__ */ jsx(ControlLabelStack, { label, description })
      ] }),
      /* @__PURE__ */ jsx(ControlErrorMessage, { message: errorMessage })
    ] });
  }
);
Switch.displayName = "Switch";
var sliderThumbClassName = `block h-4 w-4 rounded-full border border-primary/60 bg-background shadow ${focusRing} ${disabledControl}`;
var sliderVariants = cva("relative flex w-full touch-none select-none items-center", {
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
var Slider = React33.forwardRef(
  ({
    value,
    defaultValue = 0,
    onChange,
    range = false,
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
    const normalizeValue = React33.useCallback(
      (nextValue) => {
        if (Array.isArray(nextValue)) return nextValue;
        if (range) return [nextValue, nextValue];
        return nextValue;
      },
      [range]
    );
    const initialValue = React33.useMemo(() => {
      const seed = value ?? defaultValue;
      return normalizeValue(seed);
    }, [defaultValue, normalizeValue, value]);
    const [internalValue, setInternalValue] = React33.useState(initialValue);
    const isControlled = value !== void 0 && onChange != null;
    const current = isControlled ? value : internalValue;
    const currentDisplay = valueFormatter ? valueFormatter(current) : Array.isArray(current) ? `${current[0]} - ${current[1]}` : current;
    return /* @__PURE__ */ jsxs("div", { className: "w-full space-y-1.5", children: [
      (label || showValue) && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        label ? /* @__PURE__ */ jsx(Label, { size: "sm", children: label }) : /* @__PURE__ */ jsx("span", {}),
        showValue ? /* @__PURE__ */ jsx(Text, { as: "span", size: "xs", variant: "muted", children: currentDisplay }) : null
      ] }),
      /* @__PURE__ */ jsxs(
        SliderPrimitive.Root,
        {
          ref,
          value: Array.isArray(current) ? current : [current],
          orientation,
          onValueChange: (next) => {
            const nextValue = range ? [next[0] ?? 0, next[1] ?? next[0] ?? 0] : next[0] ?? 0;
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
            /* @__PURE__ */ jsx(SliderPrimitive.Track, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "absolute h-full bg-primary" }) }),
            /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: sliderThumbClassName }),
            range ? /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: sliderThumbClassName }) : null
          ]
        }
      ),
      marks?.length ? /* @__PURE__ */ jsx("div", { className: "flex justify-between", children: marks.map((mark) => /* @__PURE__ */ jsx(Text, { as: "span", size: "2xs", variant: "muted", children: mark.label ?? mark.value }, `${mark.value}-${String(mark.label ?? "")}`)) }) : null,
      /* @__PURE__ */ jsx(ControlErrorMessage, { message: errorMessage })
    ] });
  }
);
Slider.displayName = "Slider";
var ratingVariants = cva("inline-flex items-center gap-0.5", {
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
var Rating = React33.forwardRef(
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
    const [internal, setInternal] = React33.useState(() => roundToStep(defaultValue, precision));
    const value = roundToStep(isControlled ? valueProp : internal, precision);
    const setValue = React33.useCallback(
      (next) => {
        const v = roundToStep(next, precision);
        if (!isControlled) setInternal(v);
        onChange?.(v);
      },
      [isControlled, onChange, precision]
    );
    const starRefs = React33.useRef([]);
    const onStarPointer = React33.useCallback(
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
    const rootId = id ?? React33.useId();
    const interactive = !readOnly && !disabled;
    return /* @__PURE__ */ jsxs("div", { ref, className: cn("flex flex-col gap-1", className), ...props, children: [
      label ? /* @__PURE__ */ jsx(Text, { as: "div", size: "sm", weight: "medium", className: "text-foreground", children: label }) : null,
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        left ? /* @__PURE__ */ jsx("span", { className: "inline-flex shrink-0 items-center", children: left }) : null,
        /* @__PURE__ */ jsx(
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
              return /* @__PURE__ */ jsx(
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
                  children: /* @__PURE__ */ jsxs("span", { className: "relative inline-block h-full w-full", children: [
                    /* @__PURE__ */ jsx(
                      Star,
                      {
                        className: "pointer-events-none absolute inset-0 text-muted-foreground",
                        strokeWidth: 1.5,
                        "aria-hidden": true
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "absolute inset-y-0 left-0 overflow-hidden",
                        style: { width: `${fill * 100}%` },
                        "aria-hidden": true,
                        children: /* @__PURE__ */ jsx(Star, { className: "pointer-events-none h-full min-w-full fill-primary text-primary", strokeWidth: 1.5 })
                      }
                    )
                  ] })
                },
                k
              );
            })
          }
        ),
        showValue ? /* @__PURE__ */ jsxs(Text, { as: "span", size: "sm", variant: "muted", className: "tabular-nums", children: [
          value,
          "/",
          max
        ] }) : null
      ] }),
      errorMessage ? /* @__PURE__ */ jsx(ControlErrorMessage, { message: errorMessage }) : null
    ] });
  }
);
Rating.displayName = "Rating";
var InputOTP = React33.forwardRef(
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
    const [internal, setInternal] = React33.useState(defaultValue);
    const value = isControlled ? valueProp : internal;
    const setValue = React33.useCallback(
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
    const rootId = id ?? React33.useId();
    return /* @__PURE__ */ jsx(FieldLayout, { label, htmlFor: rootId, size, errorMessage: showError, children: /* @__PURE__ */ jsx(
      OTPInput,
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
        pattern: REGEXP_ONLY_DIGITS,
        inputMode: "numeric",
        autoComplete: "one-time-code",
        containerClassName: cn("flex gap-2", className),
        onBlur: fieldControlBlurHandler(validationOpts, onBlur, onValidate),
        ...props,
        render: ({ slots }) => /* @__PURE__ */ jsx(Fragment, { children: slots.map((slot, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "relative flex w-10 items-center justify-center rounded-md border font-mono tabular-nums",
              fieldSurfaceVariants({ control: "input", size, variant, invalid }),
              slot.isActive && "ring-2 ring-ring ring-offset-2 ring-offset-background"
            ),
            children: /* @__PURE__ */ jsxs("span", { className: "text-foreground", children: [
              mask && slot.char ? "\u2022" : slot.char,
              slot.hasFakeCaret ? /* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "h-4 w-px animate-pulse bg-foreground duration-1000" }) }) : null
            ] })
          },
          i
        )) })
      }
    ) });
  }
);
InputOTP.displayName = "InputOTP";
var SearchInput = React33.forwardRef(
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
    const [internal, setInternal] = React33.useState(String(defaultValue ?? ""));
    const value = isControlled ? String(valueProp ?? "") : internal;
    const setValue = React33.useCallback(
      (next) => {
        if (!isControlled) setInternal(next);
        onChange?.(next);
      },
      [isControlled, onChange]
    );
    React33.useEffect(() => {
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
    return /* @__PURE__ */ jsx(
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
        left: /* @__PURE__ */ jsx(Search, { className: "h-4 w-4", strokeWidth: 2 }),
        right: loading ? /* @__PURE__ */ jsx(Spinner, { size: "sm", className: "pointer-events-none" }) : showClear ? /* @__PURE__ */ jsx(
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
            children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4", strokeWidth: 2 })
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
var cardVariants = cva("rounded-lg border text-foreground", {
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
function withUnit(value) {
  if (value == null) return void 0;
  return typeof value === "number" ? `${value}px` : value;
}
var Card = React33.forwardRef(
  ({ variant, size = "md", header, footer, minHeight, maxHeight, className, children, style, ...props }, ref) => {
    const effectiveSize = size ?? "md";
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        "data-slot": "card",
        className: cn("relative flex flex-col overflow-hidden", cardVariants({ variant, size: effectiveSize }), className),
        style: { minHeight: withUnit(minHeight), maxHeight: withUnit(maxHeight), ...style },
        ...props,
        children: [
          header ? /* @__PURE__ */ jsx(
            "div",
            {
              "data-slot": "card-header",
              className: cn("sticky top-0 z-20 shrink-0 border-b border-border bg-inherit", sectionPad[effectiveSize]),
              children: header
            }
          ) : null,
          /* @__PURE__ */ jsx("div", { "data-slot": "card-content", className: cn("min-h-0 flex-1 overflow-y-auto", sectionPad[effectiveSize]), children }),
          footer ? /* @__PURE__ */ jsx(
            "div",
            {
              "data-slot": "card-footer",
              className: cn("sticky bottom-0 z-20 shrink-0 border-t border-border bg-inherit", sectionPad[effectiveSize]),
              children: footer
            }
          ) : null
        ]
      }
    );
  }
);
Card.displayName = "Card";
var separatorVariants = cva("shrink-0 bg-border ", {
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
var Separator = React33.forwardRef(
  ({ variant, orientation, decorative = true, className, ...props }, ref) => /* @__PURE__ */ jsx(
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
var stackVariants = cva("flex", {
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
  return /* @__PURE__ */ jsx(
    Comp,
    {
      ref,
      "data-slot": "stack",
      className: cn(stackVariants({ direction, gap, align, justify, wrap }), className),
      ...props,
      children: items.map((item, index) => /* @__PURE__ */ jsx(React33.Fragment, { children: renderItem(item, index) }, getItemKey?.(item, index) ?? index))
    }
  );
};
var Stack = Object.assign(
  React33.forwardRef(StackInner),
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
var gridSpacingVariants = cva("", {
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
  return /* @__PURE__ */ jsx(
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
      children: items.map((item, index) => /* @__PURE__ */ jsx(React33.Fragment, { children: renderItem(item, index) }, getItemKey?.(item, index) ?? index))
    }
  );
};
var Grid = Object.assign(
  React33.forwardRef(GridInner),
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
var AspectRatio = React33.forwardRef(({ className, ratio: ratioProp = DEFAULT_RATIO, children, minWidth, maxWidth, style, ...props }, ref) => {
  const ratio = toRatioNumber(ratioProp, DEFAULT_RATIO);
  const ratioLabel = formatAspectRatioLabel(ratio);
  const resolvedChildren = typeof children === "string" ? children.replace(/\{ratio\}/g, ratioLabel) : children;
  const mergedStyle = {
    ...style,
    ...minWidth != null && { minWidth: sizeToCss(minWidth) },
    ...maxWidth != null && { maxWidth: sizeToCss(maxWidth) }
  };
  return /* @__PURE__ */ jsx(
    AspectRatioPrimitive.Root,
    {
      ref,
      ratio,
      className: cn("overflow-hidden", className),
      style: mergedStyle,
      ...props,
      children: resolvedChildren
    }
  );
});
AspectRatio.displayName = "AspectRatio";
var ResizablePanelGroup = React33.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    PanelGroup,
    {
      ref,
      className: cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className),
      ...props
    }
  )
);
ResizablePanelGroup.displayName = "ResizablePanelGroup";
var ResizablePanel = React33.forwardRef((props, ref) => /* @__PURE__ */ jsx(Panel, { ref, ...props }));
ResizablePanel.displayName = "ResizablePanel";
function ResizableHandle({ className, withHandle, children, ...props }) {
  return /* @__PURE__ */ jsx(
    PanelResizeHandle,
    {
      className: cn(
        "relative flex w-px items-center justify-center bg-border outline-none after:absolute after:inset-y-0 after:left-1/2 after:w-4 after:-translate-x-1/2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-4 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
        className
      ),
      ...props,
      children: children ?? (withHandle ? /* @__PURE__ */ jsx("span", { className: "z-10 flex h-7 w-4 items-center justify-center rounded-sm border border-border bg-muted", children: /* @__PURE__ */ jsx(GripVertical, { className: "h-3.5 w-3.5 text-muted-foreground", strokeWidth: 2 }) }) : null)
    }
  );
}
ResizableHandle.displayName = "ResizableHandle";
var linkVariants = cva(
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
var Link = React33.forwardRef(
  ({ href, target, rel, external, variant, className, children, ...props }, ref) => {
    const resolvedTarget = target ?? (external ? "_blank" : void 0);
    const resolvedRel = rel ?? (external || resolvedTarget === "_blank" ? "noopener noreferrer" : void 0);
    return /* @__PURE__ */ jsx(
      "a",
      {
        ref,
        href,
        target: resolvedTarget,
        rel: resolvedRel,
        className: cn(linkVariants({ variant }), focusRing, focusRingOffset, className),
        ...props,
        children
      }
    );
  }
);
Link.displayName = "Link";
var skeletonVariants = cva("animate-pulse bg-skeleton", {
  variants: {
    variant: {
      text: "h-4 w-12 rounded",
      avatar: "h-10 w-10 rounded-full",
      button: "h-9 w-24 rounded-md",
      badge: "h-5 w-5 rounded-full",
      card: "h-32 w-32 rounded-lg",
      input: "h-9 w-24 rounded-md",
      checkbox: "h-5 w-5 rounded-sm",
      radio: "h-5 w-5 rounded-full"
    }
  },
  defaultVariants: {
    variant: "text"
  }
});
function withUnit2(value) {
  if (value == null) return void 0;
  return typeof value === "number" ? `${value}px` : value;
}
var Skeleton = React33.forwardRef(
  ({ variant, width, height, count = 1, className, children, ...props }, ref) => {
    const items = Array.from({ length: Math.max(1, count) });
    return /* @__PURE__ */ jsx("div", { className: cn("flex flex-col gap-2", count === 1 && "contents"), children: items.map((_, idx) => /* @__PURE__ */ jsx(
      "div",
      {
        ref: idx === 0 ? ref : void 0,
        "data-slot": `skeleton-${idx}`,
        className: cn(skeletonVariants({ variant }), className),
        style: { width: withUnit2(width), height: withUnit2(height) },
        ...props,
        children
      },
      idx
    )) });
  }
);
Skeleton.displayName = "Skeleton";
var pillSurfaceVariants = cva("", {
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
var pillTextSize = {
  sm: "xs",
  md: "sm"
};
var Pill = React33.forwardRef(
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
    className,
    children,
    ...props
  }, ref) => {
    const resolvedSize = size ?? "md";
    const removeBtn = onRemove && !disabled ? /* @__PURE__ */ jsx(
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
        children: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5", strokeWidth: 2 })
      }
    ) : void 0;
    const mergedRight = removeBtn != null || right != null ? /* @__PURE__ */ jsxs(Fragment, { children: [
      right,
      removeBtn
    ] }) : void 0;
    return /* @__PURE__ */ jsxs(
      Text,
      {
        ref,
        as,
        className: cn(
          pillSurfaceVariants({ appearance, size, tone, shape, selected }),
          onRemove && !disabled && "pr-1",
          className
        ),
        variant: variant ?? "default",
        size: pillTextSize[resolvedSize],
        weight: "medium",
        left,
        right: mergedRight,
        disabled,
        ...props,
        children: [
          dot ? /* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 shrink-0 rounded-full bg-current" }) : null,
          children
        ]
      }
    );
  }
);
Pill.displayName = "Pill";
var Badge = React33.forwardRef(function Badge2(props, ref) {
  return /* @__PURE__ */ jsx(Pill, { ref, ...props });
});
Badge.displayName = "Badge";
var Tag = React33.forwardRef(function Tag2({ label, onRemove, variant = "subtle", left, disabled, className, ...props }, ref) {
  return /* @__PURE__ */ jsx(
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
var avatarVariants = cva("relative inline-flex shrink-0 bg-muted text-muted-foreground", {
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
var Avatar = React33.forwardRef(
  ({ src, alt, fallback, status, size, shape, className, ...props }, ref) => {
    const [failed, setFailed] = React33.useState(false);
    const imageNode = src && !failed ? /* @__PURE__ */ jsx(
      "img",
      {
        src,
        alt: alt ?? "Avatar",
        className: cn("h-full w-full object-cover", shape === "square" ? "rounded-md" : "rounded-full"),
        onError: () => setFailed(true)
      }
    ) : null;
    const fallbackNode = fallback ?? (alt ? alt.slice(0, 2).toUpperCase() : "AV");
    return /* @__PURE__ */ jsx("div", { ref, className: cn(avatarVariants({ size, shape }), className), ...props, children: /* @__PURE__ */ jsx(
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
    ) });
  }
);
Avatar.displayName = "Avatar";
var progressVariants = cva("relative w-full overflow-hidden rounded-full bg-muted", {
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
var Progress = React33.forwardRef(({ value = 0, max = 100, showLabel, indeterminate, size, className, ...props }, ref) => {
  const clamped = Math.max(0, Math.min(value, max));
  const percent = max > 0 ? clamped / max * 100 : 0;
  return /* @__PURE__ */ jsxs("div", { className: "w-full space-y-1", children: [
    showLabel ? /* @__PURE__ */ jsxs(Text, { as: "div", size: "xs", variant: "muted", children: [
      Math.round(percent),
      "%"
    ] }) : null,
    /* @__PURE__ */ jsx(ProgressPrimitive.Root, { ref, className: cn(progressVariants({ size }), className), value: indeterminate ? void 0 : clamped, max, ...props, children: /* @__PURE__ */ jsx(
      ProgressPrimitive.Indicator,
      {
        className: cn("h-full bg-primary transition-all", indeterminate && "animate-pulse"),
        style: { transform: indeterminate ? void 0 : `translateX(-${100 - percent}%)` }
      }
    ) })
  ] });
});
Progress.displayName = "Progress";
var kbdVariants = cva(
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
var Kbd = React33.forwardRef(({ size, className, children, ...props }, ref) => /* @__PURE__ */ jsx("kbd", { ref, className: cn(kbdVariants({ size }), className), ...props, children }));
Kbd.displayName = "Kbd";
var KbdGroup = React33.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("inline-flex items-center gap-1", className), ...props }));
KbdGroup.displayName = "KbdGroup";
var imageVariants = cva("block bg-muted", {
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
var Image = React33.forwardRef(
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
    className,
    style,
    ...props
  }, ref) => {
    const [loaded, setLoaded] = React33.useState(false);
    const [failed, setFailed] = React33.useState(false);
    if (!src || failed) {
      if (fallback) return /* @__PURE__ */ jsx(Fragment, { children: fallback });
      return /* @__PURE__ */ jsx(Skeleton, { variant: "card", width, height, className });
    }
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      placeholder === "skeleton" && !loaded ? /* @__PURE__ */ jsx(Skeleton, { variant: "card", width, height, className }) : null,
      /* @__PURE__ */ jsx(
        "img",
        {
          ref,
          src,
          alt: alt ?? "",
          width,
          height,
          className: cn(imageVariants({ fit, variant }), className, placeholder !== "none" && !loaded && "sr-only"),
          loading: loadingStrategy,
          style: { objectPosition: position, ...style },
          onLoad: () => setLoaded(true),
          onError: () => setFailed(true),
          ...props
        }
      )
    ] });
  }
);
Image.displayName = "Image";
var groupVariants = cva("flex", {
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
  gap,
  wrap,
  className,
  ...props
}) {
  const initialSelectedValues = React33.useMemo(() => {
    if (defaultValue) return defaultValue;
    return items.filter((item) => item.selected).map((item) => item.value);
  }, [defaultValue, items]);
  const [internalItems, setInternalItems] = React33.useState(items);
  const [internalValue, setInternalValue] = React33.useState(initialSelectedValues);
  React33.useEffect(() => {
    setInternalItems(items);
  }, [items]);
  const selectedValues = value ?? internalValue;
  const isControlled = value !== void 0;
  const isInteractive = selectable;
  const visibleItems = typeof maxVisible === "number" && maxVisible >= 0 ? internalItems.slice(0, maxVisible) : internalItems;
  const overflowCount = typeof maxVisible === "number" && maxVisible >= 0 ? Math.max(0, internalItems.length - maxVisible) : 0;
  const handleToggle = (item) => {
    if (item.disabled || !selectable) return;
    const isSelected = selectedValues.includes(item.value);
    const next = multiple ? isSelected ? selectedValues.filter((v) => v !== item.value) : [...selectedValues, item.value] : isSelected ? [] : [item.value];
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(next);
    onSelect?.(item, !isSelected);
  };
  const handleRemove = (item) => {
    if (!removable || item.disabled) return;
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
  return /* @__PURE__ */ jsxs("div", { className: cn(groupVariants({ gap, wrap }), className), ...props, children: [
    visibleItems.map((item) => {
      const selected = selectable ? selectedValues.includes(item.value) : Boolean(item.selected);
      const badgeClassName = cn(
        isInteractive && "cursor-pointer hover:opacity-90",
        item.disabled && "opacity-60 cursor-not-allowed"
      );
      const removeNode = removable && !item.disabled ? /* @__PURE__ */ jsx(
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
      return /* @__PURE__ */ jsx("div", { className: "inline-flex", children: isInteractive ? /* @__PURE__ */ jsx(
        Pill,
        {
          as: "button",
          onClick: () => handleToggle(item),
          disabled: item.disabled,
          "aria-pressed": selectable ? selected : void 0,
          size,
          appearance: variant,
          tone: item.tone ?? "neutral",
          selected,
          left: item.left,
          right: removeNode,
          className: badgeClassName,
          children: item.label
        }
      ) : /* @__PURE__ */ jsx(
        Pill,
        {
          size,
          appearance: variant,
          tone: item.tone ?? "neutral",
          selected,
          left: item.left,
          right: removeNode,
          className: badgeClassName,
          children: item.label
        }
      ) }, item.value);
    }),
    overflowCount > 0 && /* @__PURE__ */ jsx(Pill, { size, appearance: "outline", tone: "neutral", children: overflowLabel.replace("{count}", String(overflowCount)) }),
    children
  ] });
}
var descriptionListVariants = cva("", {
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
var DescriptionList = React33.forwardRef(
  ({ className, items, layout = "vertical", size, ...props }, ref) => {
    const isHorizontal = layout === "horizontal";
    return /* @__PURE__ */ jsx(
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
        children: items.map((item, index) => /* @__PURE__ */ jsxs(React33.Fragment, { children: [
          /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsx(
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
  if (React33.isValidElement(node)) {
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
var List = React33.forwardRef(
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
    const { filter: customFilter, defaultQuery, ...searchInputProps } = searchOptions;
    const [searchQuery, setSearchQuery] = React33.useState(() => defaultQuery ?? "");
    const [debouncedQuery, setDebouncedQuery] = React33.useState(() => defaultQuery ?? "");
    const isControlled = selectedValueProp !== void 0;
    const [internalSelected, setInternalSelected] = React33.useState(defaultSelectedValue);
    const selectedValue = isControlled ? selectedValueProp : internalSelected;
    const filteredItems = React33.useMemo(() => {
      if (!searchEnabled) return [...items];
      const run = customFilter ?? defaultListItemFilter;
      return [...run(items, debouncedQuery)];
    }, [items, debouncedQuery, searchEnabled, customFilter]);
    const select = React33.useCallback(
      (item) => {
        if (!selectable || item.disabled || item.value == null) return;
        if (!isControlled) setInternalSelected(item.value);
        onSelect?.(item.value, item);
      },
      [selectable, isControlled, onSelect]
    );
    const renderRow = (item, index) => {
      const selected = selectable && item.value != null && selectedValue === item.value;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn(
            "flex min-w-0 items-start gap-3 rounded-md px-2 py-2",
            divider && index > 0 && "border-t border-border",
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
            item.left ? /* @__PURE__ */ jsx(Icon, { node: item.left, size: "sm", className: "mt-0.5 shrink-0" }) : null,
            /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsx(Text, { as: "div", size: "sm", weight: "medium", className: "text-foreground", children: item.label }),
              item.description ? /* @__PURE__ */ jsx(Text, { as: "div", size: "sm", variant: "muted", className: "mt-0.5", children: item.description }) : null
            ] }),
            item.action ? /* @__PURE__ */ jsx("div", { className: "shrink-0", children: item.action }) : null
          ]
        }
      );
    };
    const listAs = listType === "none" ? "div" : listType === "ordered" ? "ol" : "ul";
    const renderWrappedRow = (item, index) => {
      const row = renderRow(item, index);
      if (listType === "none") {
        return /* @__PURE__ */ jsx("div", { className: "min-w-0", children: row });
      }
      return /* @__PURE__ */ jsx("li", { className: "list-none", children: row });
    };
    const listChrome = listType !== "none" && "list-none pl-0";
    const resolvedGridMin = minChildWidth ?? (columns == null ? "12rem" : void 0);
    const resolvedColumns = resolvedGridMin ? void 0 : columns ?? 2;
    const resolvedGridGap = gridGap ?? gap;
    const body = layout === "list" ? /* @__PURE__ */ jsx(
      Stack,
      {
        as: listAs,
        role: selectable ? "listbox" : void 0,
        className: cn(listChrome),
        items: filteredItems,
        getItemKey: (item, i) => item.value ?? i,
        renderItem: renderWrappedRow,
        direction,
        gap,
        align,
        justify,
        wrap
      }
    ) : /* @__PURE__ */ jsx(
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
    return /* @__PURE__ */ jsxs("div", { ref, "data-slot": "list", className: cn("flex w-full flex-col gap-3", className), ...props, children: [
      header,
      searchEnabled ? /* @__PURE__ */ jsx(
        SearchInput,
        {
          value: searchQuery,
          onChange: setSearchQuery,
          onSearch: setDebouncedQuery,
          onClear: () => setDebouncedQuery(""),
          ...searchInputProps
        }
      ) : null,
      loading ? /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: "Loading\u2026" }) : emptyItems ? /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: emptyState ?? "Nothing to show." }) : emptyFilter ? /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: noResultsState ?? "No matches." }) : body,
      children
    ] });
  }
);
List.displayName = "List";
var Video = React33.forwardRef(
  ({ className, src, width, height, style, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
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
var overlayVariants = cva(
  "inset-0 z-40 bg-background/80 transition-opacity data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
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
function Overlay({
  open = false,
  onClose,
  container,
  blur,
  fixed = true,
  className,
  children
}) {
  const node = /* @__PURE__ */ jsx(
    "div",
    {
      role: "presentation",
      "data-state": open ? "open" : "closed",
      "aria-hidden": !open,
      className: cn(
        overlayVariants({ blur }),
        fixed ? "fixed" : "absolute",
        !open && "pointer-events-none opacity-0",
        className
      ),
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose?.();
      },
      children
    }
  );
  if (!open) return null;
  if (container) {
    return createPortal(node, container);
  }
  return typeof document !== "undefined" ? createPortal(node, document.body) : null;
}
var tooltipContentVariants = cva(
  [
    "z-[60] max-w-xs overflow-visible rounded-md px-3 py-1.5 text-xs shadow-md",
    "transition-opacity duration-200 ease-out",
    "opacity-0 data-[state=delayed-open]:opacity-100 data-[state=instant-open]:opacity-100 data-[state=closed]:opacity-0"
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
var tooltipArrowVariants = cva("", {
  variants: {
    variant: {
      default: "fill-primary",
      inverted: "fill-foreground",
      info: "fill-info/35"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function Tooltip({
  content,
  openDelay = 300,
  disabled,
  children,
  placement = "top",
  className,
  variant
}) {
  const trigger = React33.isValidElement(children) ? children : /* @__PURE__ */ jsx("span", { className: "inline-flex", children });
  return /* @__PURE__ */ jsx(TooltipPrimitive.Provider, { delayDuration: openDelay, skipDelayDuration: 200, children: /* @__PURE__ */ jsxs(TooltipPrimitive.Root, { delayDuration: openDelay, children: [
    /* @__PURE__ */ jsx(TooltipPrimitive.Trigger, { asChild: true, disabled, children: trigger }),
    /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
      TooltipPrimitive.Content,
      {
        side: placement,
        sideOffset: 6,
        className: cn(tooltipContentVariants({ variant }), className),
        children: [
          content,
          /* @__PURE__ */ jsx(
            TooltipPrimitive.Arrow,
            {
              width: 11,
              height: 5,
              className: cn(tooltipArrowVariants({ variant }))
            }
          )
        ]
      }
    ) })
  ] }) });
}
var TooltipProvider = TooltipPrimitive.Provider;
var VisuallyHidden = React33.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
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
var ErrorBoundary = class extends React33.Component {
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
      return this.props.fallback ?? /* @__PURE__ */ jsx("div", { className: cn("rounded-md border border-destructive/40 bg-destructive/10 p-3", this.props.className), children: /* @__PURE__ */ jsx(Text, { as: "div", size: "sm", variant: "danger", children: "Something went wrong." }) });
    }
    return this.props.children;
  }
};

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
  const [selectedThemes, setSelectedThemes] = useState(getDefaultThemes());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const applyTheme = useCallback(async (themes) => {
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
  useEffect(() => {
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
  const updateTheme = useCallback(async (category, themeId) => {
    const newThemes = {
      ...selectedThemes,
      [category]: themeId || void 0
    };
    setSelectedThemes(newThemes);
    await applyTheme(newThemes);
  }, [selectedThemes, applyTheme]);
  const resetToDefaults = useCallback(async () => {
    const defaults = getDefaultThemes();
    setSelectedThemes(defaults);
    await applyTheme(defaults);
  }, [applyTheme]);
  const getAvailableThemes = useCallback(async (category) => {
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
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [themeCategories, setThemeCategories] = useState(null);
  const menuRef = useRef(null);
  useEffect(() => {
    getThemeCategories().then(setThemeCategories);
  }, []);
  useEffect(() => {
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
  const handleCategoryClick = useCallback((categoryKey) => {
    setSelectedCategory(categoryKey);
  }, []);
  const handleThemeSelect = useCallback(async (category, themeId) => {
    const currentTheme = selectedThemes[category];
    const newTheme = currentTheme === themeId ? void 0 : themeId;
    await updateTheme(category, newTheme);
  }, [selectedThemes, updateTheme]);
  const handleBack = useCallback(() => {
    setSelectedCategory(null);
  }, []);
  const toggleMenu = useCallback(() => {
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: menuRef,
      id: "theme-toggle",
      className: cn("fixed z-50", positionClasses[position], className),
      children: [
        /* @__PURE__ */ jsx(
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
            children: /* @__PURE__ */ jsxs(
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
                  /* @__PURE__ */ jsx("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73 2.15l.22.38a2 2 0 0 1 0 2.73l-.22.38a2 2 0 0 0 2.15 2.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-2.15l-.22-.38a2 2 0 0 1 0-2.73l.22-.38a2 2 0 0 0-2.15-2.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }),
                  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" })
                ]
              }
            )
          }
        ),
        isOpen && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 pointer-events-none", children: !selectedCategory ? /* @__PURE__ */ jsx(
          CategoryRing,
          {
            categories,
            onCategoryClick: handleCategoryClick,
            selectedThemes,
            position
          }
        ) : /* @__PURE__ */ jsx(
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
        ) })
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
  return /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children: items.map((item, index) => {
    const angle = arcConfig.startAngle + angleStep * (index + startOffset) * Math.sign(arcConfig.sweep);
    const pos = getPositionOnArc(angle, radius);
    return /* @__PURE__ */ jsx(
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
        title: item.label,
        children: item.content
      },
      item.id
    );
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
  return /* @__PURE__ */ jsx(
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
  const [themes, setThemes] = useState({});
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs("div", { className: "absolute inset-0", children: [
    /* @__PURE__ */ jsx(
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
        children: /* @__PURE__ */ jsxs(
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
              /* @__PURE__ */ jsx("path", { d: "m12 19-7-7 7-7" }),
              /* @__PURE__ */ jsx("path", { d: "M19 12H5" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      RadialWheel,
      {
        items,
        position,
        radius,
        buttonSize,
        startOffset: 1
      }
    ),
    isLoading && /* @__PURE__ */ jsx(
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

export { AspectRatio, Avatar, Badge, Button, Card, Checkbox, DescriptionList, ErrorBoundary, FAB, FieldLayout, Grid, HelperText, Icon, Image, InputOTP, Kbd, KbdGroup, Label, Link, List, Overlay, Pill, PillGroup, Progress, Radio, Rating, ResizableHandle, ResizablePanel, ResizablePanelGroup, SearchInput, Separator, Skeleton, Slider, Spinner, Stack, Switch, THEME_CATEGORY_ORDER, Tag, Text, TextInput, Textarea, ThemeToggle, Tooltip, TooltipProvider, Video, VisuallyHidden, applyThemeSync, pillSurfaceVariants as badgeVariants, buttonVariants, cardVariants, defaultListItemFilter, descriptionListVariants, disabledControl, enableDebugMode, fieldSurfaceVariants, focusRing, focusRingDestructive, focusRingOffset, formatAspectRatioLabel, getCurrentCSSVariables, getStringFieldValidationError, getTheme, getThemeCategories, getThemeFilePath, getThemesForCategory, gridSpacingVariants as gridVariants, iconVariants, linkVariants, overlayVariants, peerFocusRing, pillSurfaceVariants as pillVariants, ratingVariants, registerTheme, registerThemeFromFile, ringOffsetBackground, stackVariants, textVariants, tooltipArrowVariants, tooltipContentVariants, useTheme, useThemeToggle };
