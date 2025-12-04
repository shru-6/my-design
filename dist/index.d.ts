import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import * as src from 'src';

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
    menuRef: react.RefObject<HTMLDivElement | null>;
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

export { type ThemeMetadata, type ThemeSelection, ThemeToggle, type ThemeToggleProps, discoverTokenFiles, getTheme, getThemeCategories, getThemeFilePath, getThemesForCategory, registerTheme, registerThemeFromFile, scanCategory, useTheme, useThemeToggle };
