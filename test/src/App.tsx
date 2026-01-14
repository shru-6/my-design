import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  // Atoms
  Button, Badge, TextInput, Label, Textarea, Separator, Checkbox,
  Alert, AlertTitle, AlertDescription, Avatar, AvatarImage, AvatarFallback,
  Progress, Radio, RadioItem, Skeleton, Slider, Spinner, Switch, Toggle,
  Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent,
  Text, InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator,
  Kbd, KbdGroup, Image, Upload,
  // Molecules
  Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel,
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
  Collapsible, CollapsibleTrigger, CollapsibleContent,
  Popover, PopoverTrigger, PopoverContent,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter,
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter,
  HoverCard, HoverCardTrigger, HoverCardContent,
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext,
  ToggleGroup, ToggleGroupItem,
  ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator,
  Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem,
  Calendar, CalendarDayButton,
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator,
  NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent,
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
  Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage,
  Field, FieldLabel, FieldContent, FieldDescription, FieldGroup,
  Toast, Toaster, Snackbar, StatusText, Stepper, InfoBanner, InlineEdit,
  InputGroup, InputGroupAddon, InputGroupInput, InputGroupButton,
  FormInput, ConfirmModal, CopyButton, FormModal, TriggerModal, HistoryControlButtons,
  // Layout
  Box, Stack, Grid, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  AspectRatio, ScrollArea, Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  Container, List, Header, Footer, EmptyScreen, CollapsiblePanel,
  ResizablePanelGroup, ResizablePanel, ResizableHandle, ResizeContainer,
  Sidebar, SidebarProvider, SidebarContent, SidebarHeader, SidebarFooter, SidebarTrigger,
  // Theme
  ThemeToggle
} from 'shru-design-system'

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectValue, setSelectValue] = useState("")
  const [accordionValue, setAccordionValue] = useState("")
  const [tabsValue, setTabsValue] = useState("tab1")
  const [sheetOpen, setSheetOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [carouselApi, setCarouselApi] = useState(null)
  const [sliderValue, setSliderValue] = useState([50])
  const [progressValue, setProgressValue] = useState(33)
  const [switchChecked, setSwitchChecked] = useState(false)
  const [radioValue, setRadioValue] = useState("")
  const [inlineEditValue, setInlineEditValue] = useState("Click to edit me")
  
  const form = useForm({
    defaultValues: {
      email: "",
    },
  })

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <ThemeToggle position="bottom-right" />
      <h1>Component Library Test - shru-design-system</h1>
      <p style={{ color: '#666', marginTop: '0.5rem' }}>
        Testing all components from the design system
      </p>

      {/* ATOMS SECTION */}
      <section style={{ marginTop: '3rem' }}>
        <h2>Atoms</h2>
        
        <div style={{ marginTop: '1.5rem' }}>
          <h3>Button</h3>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Badge</h3>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Alert</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', maxWidth: '500px' }}>
            <Alert>
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>This is a default alert message.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Error Alert</AlertTitle>
              <AlertDescription>This is a destructive alert message.</AlertDescription>
            </Alert>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Avatar</h3>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Progress</h3>
          <div style={{ maxWidth: '300px', marginTop: '1rem' }}>
            <Progress value={progressValue} />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <Button size="sm" onClick={() => setProgressValue(Math.max(0, progressValue - 10))}>-</Button>
              <Button size="sm" onClick={() => setProgressValue(Math.min(100, progressValue + 10))}>+</Button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Radio</h3>
          <div style={{ marginTop: '1rem' }}>
            <Radio value={radioValue} onValueChange={setRadioValue}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <RadioItem value="option1" id="radio-option1" />
                  <Label htmlFor="radio-option1">Option 1</Label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <RadioItem value="option2" id="radio-option2" />
                  <Label htmlFor="radio-option2">Option 2</Label>
                </div>
              </div>
            </Radio>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Skeleton</h3>
          <div style={{ maxWidth: '300px', marginTop: '1rem' }}>
            <Skeleton style={{ height: '20px', marginBottom: '0.5rem' }} />
            <Skeleton style={{ height: '20px', width: '80%' }} />
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Slider</h3>
          <div style={{ maxWidth: '300px', marginTop: '1rem' }}>
            <Slider value={sliderValue} onValueChange={setSliderValue} />
            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Value: {sliderValue[0]}</p>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Spinner</h3>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
            <Spinner />
            <Spinner size="sm" />
            <Spinner size="lg" />
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Switch</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
            <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} />
            <Label>Toggle switch</Label>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Toggle</h3>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Toggle>Toggle</Toggle>
            <Toggle pressed>Toggled</Toggle>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Empty</h3>
          <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
            <Empty>
              <EmptyContent>📦</EmptyContent>
              <EmptyHeader>
                <EmptyTitle>No items found</EmptyTitle>
                <EmptyDescription>Get started by creating your first item.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Text</h3>
          <div style={{ marginTop: '1rem' }}>
            <Text as="p">This is a paragraph using the Text component.</Text>
            <Text as="h4" style={{ marginTop: '0.5rem' }}>This is a heading using Text.</Text>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>InputOTP</h3>
          <div style={{ marginTop: '1rem' }}>
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSeparator />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Kbd</h3>
          <div style={{ marginTop: '1rem' }}>
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </div>
        </div>
      </section>

      {/* MOLECULES SECTION */}
      <section style={{ marginTop: '3rem' }}>
        <h2>Molecules</h2>

        <div style={{ marginTop: '1.5rem' }}>
          <h3>Modal</h3>
          <Modal open={modalOpen} onOpenChange={setModalOpen}>
            <ModalTrigger asChild>
              <Button>Open Modal</Button>
            </ModalTrigger>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Modal Example</ModalTitle>
                <ModalDescription>This is a modal dialog example.</ModalDescription>
              </ModalHeader>
              <ModalFooter>
                <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setModalOpen(false)}>Confirm</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>AlertDialog</h3>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Item</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the item.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Accordion</h3>
          <div style={{ maxWidth: '500px', marginTop: '1rem' }}>
            <Accordion type="single" value={accordionValue} onValueChange={setAccordionValue}>
              <AccordionItem value="item1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that match the design system.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Breadcrumb</h3>
          <div style={{ marginTop: '1rem' }}>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Collapsible</h3>
          <div style={{ maxWidth: '500px', marginTop: '1rem' }}>
            <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
              <CollapsibleTrigger asChild>
                <Button>Toggle Collapsible</Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px', marginTop: '0.5rem' }}>
                  This is collapsible content that can be shown or hidden.
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Tabs</h3>
          <div style={{ maxWidth: '500px', marginTop: '1rem' }}>
            <Tabs value={tabsValue} onValueChange={setTabsValue}>
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">Content for Tab 1</TabsContent>
              <TabsContent value="tab2">Content for Tab 2</TabsContent>
              <TabsContent value="tab3">Content for Tab 3</TabsContent>
            </Tabs>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Sheet</h3>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button>Open Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Sheet Title</SheetTitle>
                <SheetDescription>This is a sheet component.</SheetDescription>
              </SheetHeader>
              <div style={{ marginTop: '1rem' }}>
                <p>Sheet content goes here.</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Popover</h3>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button>Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div style={{ padding: '0.5rem' }}>
                <p>This is popover content.</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>DropdownMenu</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>HoverCard</h3>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">Hover me</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div>
                <p style={{ fontWeight: 'bold' }}>Hover Card</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>This appears on hover.</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Pagination</h3>
          <div style={{ marginTop: '1rem' }}>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>ToggleGroup</h3>
          <div style={{ marginTop: '1rem' }}>
            <ToggleGroup type="single">
              <ToggleGroupItem value="left">Left</ToggleGroupItem>
              <ToggleGroupItem value="center">Center</ToggleGroupItem>
              <ToggleGroupItem value="right">Right</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>ContextMenu</h3>
          <div style={{ marginTop: '1rem' }}>
            <ContextMenu>
              <ContextMenuTrigger>
                <div style={{ padding: '2rem', border: '1px dashed #ccc', borderRadius: '8px', cursor: 'context-menu' }}>
                  Right click here
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Copy</ContextMenuItem>
                <ContextMenuItem>Paste</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Delete</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Command</h3>
          <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
            <Command>
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>Calendar</CommandItem>
                  <CommandItem>Search Emoji</CommandItem>
                  <CommandItem>Calculator</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Calendar</h3>
          <div style={{ marginTop: '1rem' }}>
            <Calendar />
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Carousel</h3>
          <div style={{ maxWidth: '500px', marginTop: '1rem' }}>
            <Carousel setApi={setCarouselApi}>
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div style={{ padding: '2rem', border: '1px solid #e5e7eb', borderRadius: '8px', textAlign: 'center' }}>
                      Slide {index + 1}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Form</h3>
          <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => console.log(data))}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <TextInput type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormDescription>Enter your email address.</FormDescription>
                    </FormItem>
                  )}
                />
                <Button type="submit" style={{ marginTop: '1rem' }}>Submit</Button>
              </form>
            </Form>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Field</h3>
          <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <FieldContent>
                <TextInput placeholder="Enter your name" />
                <FieldDescription>This is a field description.</FieldDescription>
              </FieldContent>
            </Field>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>InputGroup</h3>
          <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
            <InputGroup>
              <InputGroupAddon>@</InputGroupAddon>
              <InputGroupInput placeholder="username" />
            </InputGroup>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>FormInput</h3>
          <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
            <FormInput label="Email" placeholder="you@example.com" description="Enter your email" />
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>ConfirmModal</h3>
          <ConfirmModal
            open={confirmModalOpen}
            onOpenChange={setConfirmModalOpen}
            onConfirm={() => alert('Confirmed!')}
            title="Delete Item"
            description="Are you sure you want to delete this item?"
            confirmLabel="Delete"
            cancelLabel="Cancel"
            variant="destructive"
          />
          <Button onClick={() => setConfirmModalOpen(true)}>Open Confirm Modal</Button>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>CopyButton</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
            <span>Copy this text</span>
            <CopyButton text="This is the text to copy" />
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>StatusText</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
            <StatusText text="Success message" status="success" />
            <StatusText text="Error message" status="error" />
            <StatusText text="Warning message" status="warning" />
            <StatusText text="Info message" status="info" />
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Stepper</h3>
          <div style={{ marginTop: '1rem' }}>
            <Stepper
              steps={[
                { label: "Step 1", completed: true },
                { label: "Step 2", active: true },
                { label: "Step 3" },
              ]}
            />
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>InfoBanner</h3>
          <div style={{ maxWidth: '500px', marginTop: '1rem' }}>
            <InfoBanner message="This is an info message" variant="info" />
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>InlineEdit</h3>
          <div style={{ marginTop: '1rem' }}>
            <InlineEdit
              value={inlineEditValue}
              onSave={(value) => {
                setInlineEditValue(value)
                console.log('Saved:', value)
              }}
            />
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>HistoryControlButtons</h3>
          <div style={{ marginTop: '1rem' }}>
            <HistoryControlButtons />
          </div>
        </div>
      </section>

      {/* LAYOUT SECTION */}
      <section style={{ marginTop: '3rem' }}>
        <h2>Layout</h2>

        <div style={{ marginTop: '1.5rem' }}>
          <h3>Box</h3>
          <Box style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px', marginTop: '1rem' }}>
            This is a Box component
          </Box>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Stack</h3>
          <Stack gap={4} style={{ marginTop: '1rem' }}>
            <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}>Item 1</div>
            <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}>Item 2</div>
            <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}>Item 3</div>
          </Stack>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Grid</h3>
          <Grid cols={3} gap={4} style={{ marginTop: '1rem' }}>
            <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}>Grid Item 1</div>
            <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}>Grid Item 2</div>
            <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px' }}>Grid Item 3</div>
          </Grid>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Card</h3>
          <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the card content.</p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>AspectRatio</h3>
          <div style={{ maxWidth: '400px', marginTop: '1rem' }}>
            <AspectRatio ratio={16 / 9}>
              <div style={{ width: '100%', height: '100%', backgroundColor: '#e5e7eb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                16:9 Aspect Ratio
              </div>
            </AspectRatio>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>ScrollArea</h3>
          <div style={{ maxWidth: '300px', marginTop: '1rem' }}>
            <ScrollArea style={{ height: '200px', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem' }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} style={{ padding: '0.5rem' }}>Item {i + 1}</div>
              ))}
            </ScrollArea>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Table</h3>
          <div style={{ marginTop: '1rem' }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>john@example.com</TableCell>
                  <TableCell>Admin</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>jane@example.com</TableCell>
                  <TableCell>User</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Container</h3>
          <Container maxWidth="md" style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '2rem', marginTop: '1rem' }}>
            <p>This is a container with max-width: md</p>
          </Container>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>List</h3>
          <div style={{ marginTop: '1rem' }}>
            <List variant="unordered">
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </List>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Header</h3>
          <Header style={{ padding: '1rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Page Header</h3>
              <Button size="sm">Action</Button>
            </div>
          </Header>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Footer</h3>
          <Footer style={{ padding: '1rem', marginTop: '1rem' }}>
            <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#666' }}>
              © 2024 Design System
            </div>
          </Footer>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>EmptyScreen</h3>
          <div style={{ maxWidth: '500px', marginTop: '1rem' }}>
            <EmptyScreen
              title="No items found"
              description="Get started by creating your first item"
              action={<Button>Create Item</Button>}
            />
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>CollapsiblePanel</h3>
          <div style={{ maxWidth: '500px', marginTop: '1rem' }}>
            <CollapsiblePanel title="Click to expand">
              <p>This is the collapsible panel content.</p>
            </CollapsiblePanel>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Resizable</h3>
          <div style={{ height: '300px', border: '1px solid #e5e7eb', borderRadius: '8px', marginTop: '1rem' }}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={50}>
                <div style={{ padding: '1rem', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Panel 1
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <div style={{ padding: '1rem', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Panel 2
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
