import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import { VariantProps } from 'class-variance-authority';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

declare const buttonVariants: (props?: ({
    readonly variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    readonly size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const Button: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<(props?: ({
    readonly variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    readonly size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & {
    asChild?: boolean;
}, "ref"> & React.RefAttributes<HTMLButtonElement>>;

declare const badgeVariants: (props?: ({
    readonly variant?: "default" | "destructive" | "outline" | "secondary" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const Badge: React.ForwardRefExoticComponent<Omit<React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement> & VariantProps<(props?: ({
    readonly variant?: "default" | "destructive" | "outline" | "secondary" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & {
    asChild?: boolean;
}, "ref"> & React.RefAttributes<HTMLSpanElement>>;

declare const textInputTypes: readonly ["text", "email", "password", "number", "tel", "url", "search"];
interface TextInputProps extends React.ComponentProps<"input"> {
    type?: typeof textInputTypes[number];
}
declare const TextInput: React.ForwardRefExoticComponent<Omit<TextInputProps, "ref"> & React.RefAttributes<HTMLInputElement>>;

interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
}
declare const Label: React.ForwardRefExoticComponent<Omit<LabelProps, "ref"> & React.RefAttributes<HTMLLabelElement>>;

interface TextareaProps extends React.ComponentProps<"textarea"> {
}
declare const Textarea: React.ForwardRefExoticComponent<Omit<TextareaProps, "ref"> & React.RefAttributes<HTMLTextAreaElement>>;

declare const separatorOrientations: readonly ["horizontal", "vertical"];
interface SeparatorProps extends React.ComponentProps<typeof SeparatorPrimitive.Root> {
    orientation?: typeof separatorOrientations[number];
}
declare const Separator: React.ForwardRefExoticComponent<Omit<SeparatorProps, "ref"> & React.RefAttributes<HTMLDivElement>>;

interface CheckboxProps extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
}
declare const Checkbox: React.ForwardRefExoticComponent<Omit<CheckboxProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;

declare function Modal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function ModalTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare function ModalPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>): react_jsx_runtime.JSX.Element;
declare function ModalClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>): react_jsx_runtime.JSX.Element;
declare function ModalOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>): react_jsx_runtime.JSX.Element;
declare function ModalContent({ className, children, showCloseButton, ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean;
}): react_jsx_runtime.JSX.Element;
declare function ModalHeader({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function ModalFooter({ className, ...props }: React.ComponentProps<"div">): react_jsx_runtime.JSX.Element;
declare function ModalTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>): react_jsx_runtime.JSX.Element;
declare function ModalDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>): react_jsx_runtime.JSX.Element;

declare function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>): react_jsx_runtime.JSX.Element;
declare function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>): react_jsx_runtime.JSX.Element;
declare const selectTriggerSizes: readonly ["sm", "default"];
declare function SelectTrigger({ className, size, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
    size?: typeof selectTriggerSizes[number];
}): react_jsx_runtime.JSX.Element;
declare function SelectContent({ className, children, position, align, ...props }: React.ComponentProps<typeof SelectPrimitive.Content>): react_jsx_runtime.JSX.Element;
declare function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>): react_jsx_runtime.JSX.Element;
declare function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>): react_jsx_runtime.JSX.Element;
declare function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>): react_jsx_runtime.JSX.Element;
declare function SelectScrollUpButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>): react_jsx_runtime.JSX.Element;
declare function SelectScrollDownButton({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>): react_jsx_runtime.JSX.Element;

declare function TooltipProvider({ delayDuration, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>): react_jsx_runtime.JSX.Element;
declare function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>): react_jsx_runtime.JSX.Element;
declare function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>): react_jsx_runtime.JSX.Element;
declare const tooltipSides: readonly ["top", "right", "bottom", "left"];
declare function TooltipContent({ className, sideOffset, children, side, ...props }: React.ComponentProps<typeof TooltipPrimitive.Content> & {
    side?: typeof tooltipSides[number];
}): react_jsx_runtime.JSX.Element;

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
 * Base themes are defined here. Additional themes can be discovered dynamically
 * by scanning the /tokens/themes/ directory structure.
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
 * Allows users to add themes without modifying the base config
 * Can be used for any category including custom
 */
declare function registerTheme(category: string, themeId: string, metadata: ThemeMetadata): Record<string, ThemeCategory>;
/**
 * Register a theme from a token file
 * Helper function to automatically register a theme by loading its file
 * Users can call this after creating a theme file
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

export { Badge, Button, Checkbox, Label, Modal, ModalClose, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalOverlay, ModalPortal, ModalTitle, ModalTrigger, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, Separator, THEME_CATEGORY_ORDER, TextInput, Textarea, type ThemeMetadata$1 as ThemeMetadata, type ThemeSelection, ThemeToggle, type ThemeToggleProps, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, applyThemeSync, badgeVariants, buttonVariants, enableDebugMode, getCurrentCSSVariables, getTheme, getThemeCategories, getThemeFilePath, getThemesForCategory, registerTheme, registerThemeFromFile, useTheme, useThemeToggle };
