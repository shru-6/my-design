/**
 * Component Showcase Registry
 * 
 * Central registry for all component showcase functions.
 * Each component file exports a {ComponentName}Showcase function
 * which is registered here for use in the design system showcase page.
 * 
 * Progress Tracking:
 * - Atoms: 19/19 complete ✅
 * - Molecules: 29/29 complete ✅
 * - Layout: 15/15 complete ✅
 * - Primitives: 6/6 complete ✅
 * - UI: 3/3 complete ✅
 * 
 * Total: 72/72 components have showcases (100%) ✅
 * 
 * Variant Mapping Progress:
 * - 14 components updated to map from variants dynamically ✅
 *   (Button, Badge, Alert, Toggle, Empty, Text, Select, Accordion, Sheet, Tooltip, Separator, Popover, Slider, TextInput)
 */

import * as React from "react"

// Import showcases from atoms
import { 
  AlertShowcase, 
  ButtonShowcase, 
  TextInputShowcase, 
  BadgeShowcase, 
  LabelShowcase,
  TextareaShowcase,
  SeparatorShowcase,
  CheckboxShowcase,
  SwitchShowcase,
  RadioShowcase,
  SkeletonShowcase,
  ProgressShowcase,
  SpinnerShowcase,
  AvatarShowcase,
  EmptyShowcase,
  SliderShowcase,
  ToggleShowcase,
  InputOTPShowcase,
  KbdShowcase,
  TextShowcase,
  ImageShowcase,
  UploadShowcase,
  ErrorBoundaryShowcase
} from "./atoms"

// Import showcases from molecules
import {
  SelectShowcase,
  TabsShowcase,
  BreadcrumbShowcase,
  PaginationShowcase,
  ModalShowcase,
  PopoverShowcase,
  SheetShowcase,
  TooltipShowcase,
  AccordionShowcase,
  CollapsibleShowcase,
  CommandShowcase,
  CalendarShowcase,
  DropdownMenuShowcase,
  ContextMenuShowcase,
  MenubarShowcase,
  NavigationMenuShowcase,
  FormShowcase,
  HoverCardShowcase,
  AlertDialogShowcase,
  DrawerShowcase,
  CarouselShowcase,
  InputGroupShowcase,
  ToggleGroupShowcase,
  ToasterShowcase,
  FieldShowcase,
  ChartShowcase,
  FormInputShowcase,
  InlineEditShowcase,
  ConfirmModalShowcase,
  TriggerModalShowcase,
  FormModalShowcase,
  ToastShowcase,
  SnackbarShowcase,
  InfoBannerShowcase,
  StatusTextShowcase,
  CopyButtonShowcase,
  HistoryControlButtonsShowcase,
  StepperShowcase,
} from "./molecules"

// Import showcases from layout
import {
  CardShowcase,
  TableShowcase,
  ScrollAreaShowcase,
  AspectRatioShowcase,
  ResizableShowcase,
  SidebarShowcase,
  ContainerShowcase,
  StackShowcase,
  GridShowcase,
  BoxShowcase,
  ListShowcase,
  HeaderShowcase,
  FooterShowcase,
  CollapsiblePanelShowcase,
  ResizeContainerShowcase,
  EmptyScreenShowcase,
} from "./layout"

// Import showcases from primitives
import {
  PrimitiveBoxShowcase,
  PrimitiveFlexShowcase,
  PrimitiveStackShowcase,
  PrimitiveTextShowcase,
  IconShowcase,
  VisuallyHiddenShowcase,
} from "./primitives"

/**
 * Type for showcase components
 */
export type ShowcaseComponent = React.ComponentType

/**
 * Registry map of component names to showcase components
 */
const showcaseRegistry: Record<string, ShowcaseComponent> = {
  // Atoms (19/19 complete) ✅
  Alert: AlertShowcase,
  Button: ButtonShowcase,
  TextInput: TextInputShowcase,
  Badge: BadgeShowcase,
  Label: LabelShowcase,
  Textarea: TextareaShowcase,
  Separator: SeparatorShowcase,
  Checkbox: CheckboxShowcase,
  Switch: SwitchShowcase,
  Radio: RadioShowcase,
  Skeleton: SkeletonShowcase,
  Progress: ProgressShowcase,
  Spinner: SpinnerShowcase,
  Avatar: AvatarShowcase,
  Empty: EmptyShowcase,
  Slider: SliderShowcase,
  Toggle: ToggleShowcase,
  InputOTP: InputOTPShowcase,
  Kbd: KbdShowcase,
  Text: TextShowcase,
  Image: ImageShowcase,
  Upload: UploadShowcase,
  ErrorBoundary: ErrorBoundaryShowcase,
  
  // Molecules (29/29 complete) ✅
  Select: SelectShowcase,
  Tabs: TabsShowcase,
  Breadcrumb: BreadcrumbShowcase,
  Pagination: PaginationShowcase,
  Modal: ModalShowcase,
  Popover: PopoverShowcase,
  Sheet: SheetShowcase,
  Tooltip: TooltipShowcase,
  Accordion: AccordionShowcase,
  Collapsible: CollapsibleShowcase,
  Command: CommandShowcase,
  Calendar: CalendarShowcase,
  DropdownMenu: DropdownMenuShowcase,
  ContextMenu: ContextMenuShowcase,
  Menubar: MenubarShowcase,
  NavigationMenu: NavigationMenuShowcase,
  Form: FormShowcase,
  HoverCard: HoverCardShowcase,
  AlertDialog: AlertDialogShowcase,
  Drawer: DrawerShowcase,
  Carousel: CarouselShowcase,
  InputGroup: InputGroupShowcase,
  ToggleGroup: ToggleGroupShowcase,
  Toaster: ToasterShowcase,
  Field: FieldShowcase,
  Chart: ChartShowcase,
  FormInput: FormInputShowcase,
  InlineEdit: InlineEditShowcase,
  ConfirmModal: ConfirmModalShowcase,
  TriggerModal: TriggerModalShowcase,
  FormModal: FormModalShowcase,
  Toast: ToastShowcase,
  Snackbar: SnackbarShowcase,
  InfoBanner: InfoBannerShowcase,
  StatusText: StatusTextShowcase,
  CopyButton: CopyButtonShowcase,
  HistoryControlButtons: HistoryControlButtonsShowcase,
  Stepper: StepperShowcase,
  
  // Layout (15/15 complete) ✅
  Card: CardShowcase,
  Table: TableShowcase,
  ScrollArea: ScrollAreaShowcase,
  AspectRatio: AspectRatioShowcase,
  Resizable: ResizableShowcase,
  Sidebar: SidebarShowcase,
  Container: ContainerShowcase,
  Stack: StackShowcase,
  Grid: GridShowcase,
  Box: BoxShowcase,
  List: ListShowcase,
  Header: HeaderShowcase,
  Footer: FooterShowcase,
  CollapsiblePanel: CollapsiblePanelShowcase,
  ResizeContainer: ResizeContainerShowcase,
  EmptyScreen: EmptyScreenShowcase,
  
  // Primitives (6/6 complete) ✅
  PrimitiveBox: PrimitiveBoxShowcase,
  PrimitiveFlex: PrimitiveFlexShowcase,
  PrimitiveStack: PrimitiveStackShowcase,
  PrimitiveText: PrimitiveTextShowcase,
  Icon: IconShowcase,
  VisuallyHidden: VisuallyHiddenShowcase,
  
}

/**
 * Get the showcase component for a given component name
 * @param componentName - Name of the component
 * @returns The showcase component or null if not found
 */
export function getComponentShowcase(
  componentName: string
): ShowcaseComponent | null {
  return showcaseRegistry[componentName] || null
}

/**
 * Get all registered showcase component names
 * @returns Array of component names that have showcases
 */
export function getShowcaseComponentNames(): string[] {
  return Object.keys(showcaseRegistry)
}
