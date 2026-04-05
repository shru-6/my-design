import { ThemeToggle } from 'shru-design-system'
import { componentMetadata } from './utils/componentMetadata'
import { ComponentCard } from './components/ComponentCard'

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'hsl(var(--background))' }}>
      <ThemeToggle position="bottom-right" />

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <main style={{ 
          flex: 1, 
          padding: '2rem',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
        }}>
          {componentMetadata?.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              color: 'hsl(var(--muted-foreground))',
            }}>
              <p>No components found matching your filters.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1rem' }}>
              {componentMetadata?.map(metadata => (
                <div key={metadata.name} className="flex flex-col gap-4 w-[430px] h-[450px]">
                  <ComponentCard metadata={metadata} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
