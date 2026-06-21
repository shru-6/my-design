import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "shru-design-system"
import { AppNav } from "./components/AppNav"
import { GalleryPage } from "./pages/GalleryPage"
import { ShowcasePage } from "./pages/ShowcasePage"

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-dvh min-h-0 flex-col bg-background">
        <AppNav />
        <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <Routes>
            <Route path="/" element={<Navigate to="/gallery" replace />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/showcase" element={<ShowcasePage />} />
          </Routes>
        </main>
        <Toaster position="bottom-right" />
      </div>
    </BrowserRouter>
  )
}

export default App
