# Pre-Publish Checklist & Planning

## 🎯 Goal
Organize, polish, and document the existing design system before publishing. Everything works, but needs better structure and consistency.

---

## 1️⃣ Tailwind CSS Token & Variant Planning

### Current State
- CSS variables defined in `src/index.css`
- Tailwind config extends colors, spacing, borderRadius
- Some inconsistencies in variant usage across components

### Tasks

#### A. Standardize Color Tokens
- [ ] Audit all color usage across components
- [ ] Ensure all components use semantic tokens (`bg-primary`, `text-foreground`, etc.)
- [ ] Remove any hardcoded colors
- [ ] Document color token usage per component
- [ ] Verify dark mode tokens are complete

#### B. Standardize Variant System
- [ ] Define global variant values:
  - `variant`: solid, outline, ghost, subtle, link (where applicable)
  - `color`: primary, neutral, success, warning, danger, info (where applicable)
  - `size`: xs, sm, md, lg, xl (standardize across all)
- [ ] Audit each component's variant prop
- [ ] Ensure consistent variant naming
- [ ] Document which components use which variants

#### C. Standardize Spacing & Sizing
- [ ] Verify all components use consistent size scale
- [ ] Ensure spacing tokens are used consistently
- [ ] Document size mappings (e.g., Button sm = Text sm = Input sm)

#### D. Update Tailwind Config
- [ ] Ensure safelist includes all CVA-generated classes
- [ ] Verify all semantic tokens are mapped
- [ ] Document any custom utilities needed
- [ ] Ensure test app config matches library config

---

## 2️⃣ Theme System Planning

### Current State
- Theme system exists with categories: color, typography, shape, density, animation, custom
- Theme toggle component exists
- Token files in `src/tokens/`

### Tasks

#### A. Theme Categories Audit
- [ ] Review existing themes:
  - Color: white, dark ✅
  - Typography: sans, serif ✅
  - Shape: smooth, sharp ✅
  - Density: comfortable, compact ✅
  - Animation: gentle, brisk ✅
  - Custom: brand, minimal ✅
- [ ] Decide if all are needed or should be consolidated
- [ ] Document theme combinations that work well
- [ ] Create theme preview/showcase

#### B. Theme Token Completeness
- [ ] Verify all CSS variables have token definitions
- [ ] Ensure all theme categories cover all tokens
- [ ] Test theme switching doesn't break any components
- [ ] Document how to add custom themes

#### C. Theme Toggle Implementation
- [ ] Verify ThemeToggle works correctly
- [ ] Test theme persistence (localStorage)
- [ ] Ensure theme applies to all components
- [ ] Document theme toggle usage

---

## 3️⃣ Component Folder Reorganization

### Current State
- `src/atoms/` - 25 files
- `src/molecules/` - 38 files
- `src/layout/` - 16 files

### Tasks

#### A. Verify Component Categorization
- [ ] Review COMPONENT_CATEGORIES.md against actual files
- [ ] Move misplaced components:
  - Check if any atoms should be molecules
  - Check if any molecules should be layout
  - Check if any layout should be molecules
- [ ] Ensure folder structure matches documentation

#### B. File Naming Consistency
- [ ] Verify all files use PascalCase
- [ ] Ensure component name matches file name
- [ ] Check for any duplicate exports

#### C. Export Organization
- [ ] Review `src/index.ts` exports
- [ ] Ensure all components are exported
- [ ] Organize exports by category (atoms, molecules, layout)
- [ ] Export types consistently
- [ ] Remove any unused exports

---

## 4️⃣ Test Folder Setup & Component Rendering

### Current State
- Test app exists at `test/`
- ComponentCard, ComponentPreview, PropsPanel exist
- componentMetadata.ts tracks components

### Tasks

#### A. Component Rendering Verification
- [ ] Ensure all components render correctly in test app
- [ ] Verify all variants display properly
- [ ] Test all interactive states (hover, focus, disabled, loading)
- [ ] Check responsive behavior
- [ ] Verify theme switching works in test app

#### B. Test App Organization
- [ ] Organize components by category in test app
- [ ] Add search/filter functionality if needed
- [ ] Ensure props panel works for all components
- [ ] Add examples for common use cases
- [ ] Verify all component metadata is accurate

#### C. Test App Styling
- [ ] Ensure test app uses library CSS correctly
- [ ] Verify Tailwind config in test app matches library
- [ ] Test dark mode in test app
- [ ] Ensure all components are visible and styled correctly

---

## 5️⃣ Code Cleanup & Consistency

### Tasks

#### A. Remove Inconsistencies
- [ ] Audit React imports (use `import React` consistently)
- [ ] Standardize prop naming (onChange vs onValueChange)
- [ ] Remove duplicate code patterns
- [ ] Consolidate similar utility functions
- [ ] Remove unused imports

#### B. Remove Redundancy
- [ ] Check for duplicate component logic
- [ ] Consolidate similar variant definitions
- [ ] Remove redundant wrapper components
- [ ] Simplify compound component patterns where possible

#### C. Remove Repetition
- [ ] Extract common patterns into utilities
- [ ] Create shared CVA patterns
- [ ] Consolidate size mappings
- [ ] Create shared type definitions

#### D. Code Quality
- [ ] Run ESLint/Prettier (if configured)
- [ ] Fix TypeScript errors
- [ ] Remove any `any` types
- [ ] Ensure all components have displayName
- [ ] Verify all refs are forwarded correctly

---

## 6️⃣ Documentation Structure

### Required Documentation Files

#### A. Core Documentation
- [x] `README.md` - Main project overview ✅
- [x] `docs/COMPONENT_CATEGORIES.md` - Component inventory ✅
- [x] `docs/DESIGN_SYSTEM_PLAN.md` - Architecture overview ✅
- [x] `docs/PROP_DESIGN_PRINCIPLES.md` - Prop design guidelines ✅
- [x] `docs/DESIGN_RULES.md` - Implementation rules ✅

#### B. Usage Documentation
- [ ] `docs/GETTING_STARTED.md` - Quick start guide
  - Installation
  - Basic setup
  - First component usage
  - Theme setup

- [ ] `docs/USAGE_GUIDE.md` - Detailed usage
  - Importing components
  - Using variants
  - Theme customization
  - Common patterns
  - Integration examples

- [ ] `docs/REQUIREMENTS.md` - Project requirements
  - Dependencies
  - Node/React versions
  - Browser support
  - Build tools needed

#### C. Development Documentation
- [ ] `docs/CONTRIBUTING.md` - How to contribute
  - Adding a new component
  - Component structure
  - Testing requirements
  - PR process

- [ ] `docs/COMPONENT_DEVELOPMENT.md` - Component development guide
  - Step-by-step: Adding a component
  - CVA pattern usage
  - Variant definition
  - Composition patterns
  - Testing checklist

#### D. Reference Documentation
- [ ] `docs/API_REFERENCE.md` - Complete API reference
  - All components
  - All props
  - All types
  - Examples

- [ ] `docs/THEME_GUIDE.md` - Theme system guide
  - Available themes
  - Custom theme creation
  - Theme token reference
  - Theme toggle usage

- [ ] `docs/TOKENS_REFERENCE.md` - Design tokens reference
  - Color tokens
  - Spacing tokens
  - Typography tokens
  - All CSS variables

#### E. Project Structure Documentation
- [ ] `docs/FILE_STRUCTURE.md` - Project organization
  - Folder structure
  - File naming conventions
  - Export patterns
  - Build output

---

## 7️⃣ Pre-Publish Verification

### Final Checks

#### A. Build & Export
- [ ] Verify build succeeds without errors
- [ ] Check all components export correctly
- [ ] Verify TypeScript types are generated
- [ ] Test ESM and CJS builds
- [ ] Verify bundle size is reasonable

#### B. Test App
- [ ] All components render in test app
- [ ] All variants work
- [ ] Theme switching works
- [ ] No console errors
- [ ] No visual bugs

#### C. Documentation
- [ ] All docs are complete
- [ ] Examples are accurate
- [ ] Links work
- [ ] Code examples are tested

#### D. Package.json
- [ ] Version number is correct
- [ ] All dependencies are listed
- [ ] Peer dependencies are correct
- [ ] Exports are configured correctly
- [ ] Files array includes dist

---

## 📋 Implementation Order

### Phase 1: Foundation (Week 1)
1. Tailwind token standardization
2. Variant system audit
3. Component folder verification

### Phase 2: Cleanup (Week 2)
4. Code consistency fixes
5. Remove redundancies
6. Test app verification

### Phase 3: Documentation (Week 3)
7. Create missing docs
8. Update existing docs
9. Add examples

### Phase 4: Final Polish (Week 4)
10. Theme system verification
11. Final testing
12. Pre-publish checklist

---

## ✅ Success Criteria

- [ ] All components use consistent tokens
- [ ] All variants are standardized
- [ ] All components render correctly in test app
- [ ] Theme system works flawlessly
- [ ] Code is clean and consistent
- [ ] All documentation is complete
- [ ] Build succeeds
- [ ] Ready for npm publish
