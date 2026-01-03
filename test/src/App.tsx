import { useState, useEffect } from 'react'
import { Button, Badge, TextInput, Label, Textarea, Separator, Checkbox, Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription, ModalFooter, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, ThemeToggle } from 'shru-design-system'
// import { THEME_CATEGORY_ORDER, registerThemeFromFile } from 'shru-design-system'

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectValue, setSelectValue] = useState("")
  
  // Example: Register a custom theme from a file
  useEffect(() => {
    // This is just an example - users can call this to register themes
    // registerThemeFromFile('custom', 'my-custom-theme', '/tokens/themes/custom/my-custom-theme.json')
    //   .then(() => console.log('Custom theme registered!'))
    //   .catch(err => console.error('Failed to register theme:', err))
  }, [])

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <ThemeToggle position="bottom-right" />
      <h1>Test App - shru-design-system</h1>
      
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
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
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
          <h3>TextInput</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', maxWidth: '300px' }}>
            <div>
              <Label htmlFor="text-input">Text Input</Label>
              <TextInput id="text-input" placeholder="Enter text..." style={{ marginTop: '0.5rem' }} />
            </div>
            <div>
              <Label htmlFor="email-input">Email</Label>
              <TextInput id="email-input" type="email" placeholder="you@example.com" style={{ marginTop: '0.5rem' }} />
            </div>
            <TextInput placeholder="Disabled input" disabled />
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Textarea</h3>
          <div style={{ marginTop: '1rem', maxWidth: '400px' }}>
            <Label htmlFor="textarea">Message</Label>
            <Textarea id="textarea" placeholder="Enter your message..." rows={4} style={{ marginTop: '0.5rem' }} />
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Separator</h3>
          <div style={{ marginTop: '1rem', maxWidth: '400px' }}>
            <div>Content above</div>
            <Separator style={{ margin: '1rem 0' }} />
            <div>Content below</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
              <div>Left</div>
              <Separator orientation="vertical" style={{ height: '40px' }} />
              <div>Right</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Checkbox</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Checkbox id="checkbox1" />
              <Label htmlFor="checkbox1" style={{ cursor: 'pointer' }}>Accept terms and conditions</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Checkbox id="checkbox2" defaultChecked />
              <Label htmlFor="checkbox2" style={{ cursor: 'pointer' }}>Option 2 (checked)</Label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Checkbox id="checkbox3" disabled />
              <Label htmlFor="checkbox3" style={{ cursor: 'pointer', opacity: 0.5 }}>Option 3 (disabled)</Label>
            </div>
          </div>
        </div>
      </section>

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
                <ModalDescription>
                  This is a modal dialog example. You can close it by clicking the X button or clicking outside.
                </ModalDescription>
              </ModalHeader>
              <ModalFooter>
                <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setModalOpen(false)}>Confirm</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Select</h3>
          <div style={{ marginTop: '1rem' }}>
            <Select value={selectValue} onValueChange={setSelectValue}>
              <SelectTrigger style={{ width: '200px' }}>
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="orange">Orange</SelectItem>
                <SelectItem value="grape">Grape</SelectItem>
              </SelectContent>
            </Select>
            {selectValue && (
              <p style={{ marginTop: '0.5rem', color: '#666' }}>
                Selected: {selectValue}
              </p>
            )}
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Tooltip</h3>
          <div style={{ marginTop: '1rem' }}>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  Tooltip content from shru-design-system
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2>Theme Testing</h2>
        <p style={{ marginTop: '1rem', color: '#666' }}>
          Toggle themes using the ThemeToggle button. Changes should be visible:
        </p>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', color: '#666' }}>
          <li><strong>Typography:</strong> Font family changes (sans vs serif)</li>
          <li><strong>Animation:</strong> Transition speeds (gentle vs brisk) - hover over buttons</li>
          <li><strong>Density:</strong> Spacing changes (comfortable vs compact) - notice gaps between elements</li>
          <li><strong>Custom:</strong> Color and radius changes (brand theme)</li>
        </ul>
        
        <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
          <h3 style={{ marginBottom: '1rem' }}>Typography Demo</h3>
          <p className="font-sans" style={{ marginBottom: '0.5rem' }}>
            This text uses <code>font-sans</code> - should change with typography theme
          </p>
          <p className="font-body">
            This text uses <code>font-body</code> - should change with typography theme
          </p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Animation Demo</h3>
          <p style={{ marginTop: '0.5rem', color: '#666', marginBottom: '1rem' }}>
            Hover over buttons to see animation speed changes (gentle = slower, brisk = faster)
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button className="duration-fast">Fast Animation</Button>
            <Button className="duration-normal">Normal Animation</Button>
            <Button className="duration-slow">Slow Animation</Button>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Density Demo</h3>
          <p style={{ marginTop: '0.5rem', color: '#666', marginBottom: '1rem' }}>
            Toggle between "Comfortable" and "Compact" density. Notice spacing between elements changes:
          </p>
          <ul style={{ marginBottom: '1rem', paddingLeft: '1.5rem', color: '#666' }}>
            <li><strong>Comfortable:</strong> More spacing (1.25rem gaps)</li>
            <li><strong>Compact:</strong> Less spacing (0.75rem gaps)</li>
          </ul>
          
          {/* Test gap-component-* classes (the fix we just made) */}
          <div className="flex flex-wrap gap-component-md" style={{ marginBottom: '1rem' }}>
            <Badge>Item 1</Badge>
            <Badge variant="secondary">Item 2</Badge>
            <Badge variant="outline">Item 3</Badge>
            <Badge variant="destructive">Item 4</Badge>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            Above uses <code>gap-component-md</code> class (should change with density toggle)
          </p>
          
          {/* Test with buttons that use gap-component-* internally */}
          <div style={{ marginTop: '1rem' }}>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
              Buttons use <code>gap-component-sm</code> internally:
            </p>
            <div className="flex flex-wrap gap-component-md">
              <Button size="default">Button 1</Button>
              <Button size="default" variant="secondary">Button 2</Button>
              <Button size="default" variant="outline">Button 3</Button>
            </div>
          </div>
          
          {/* Test CSS variables directly */}
          <div style={{ marginTop: '1rem', padding: 'var(--spacing-component-md, 1rem)', border: '2px solid var(--border)', borderRadius: '8px' }}>
            <p>This box uses <code>padding: var(--spacing-component-md)</code></p>
            <p style={{ marginTop: 'var(--spacing-component-sm, 0.5rem)' }}>This paragraph has <code>margin-top: var(--spacing-component-sm)</code></p>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Custom Theme Demo (Brand)</h3>
          <p style={{ marginTop: '0.5rem', color: '#666', marginBottom: '1rem' }}>
            Toggle to "Brand" custom theme to see primary color and radius changes
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button>Primary Button (uses --primary)</Button>
            <Button variant="outline">Outline Button</Button>
          </div>
          <div style={{ marginTop: '1rem', padding: '1rem', border: '2px solid var(--border)', borderRadius: 'var(--radius-card, 0.5rem)', backgroundColor: 'var(--card)' }}>
            <p>This card uses <code>border-radius: var(--radius-card)</code></p>
            <p>Buttons use <code>border-radius: var(--radius)</code> (mapped from --radius-button)</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
