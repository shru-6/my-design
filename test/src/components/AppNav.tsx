import { NavLink } from "react-router-dom"

const links = [
  { to: "/gallery", label: "Gallery" },
  { to: "/showcase", label: "Showcase" },
] as const

export function AppNav() {
  return (
    <nav className="z-sticky shrink-0 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1500px] items-center gap-1 px-4 py-2 md:px-8">
        <span className="mr-4 text-sm font-semibold text-foreground">shru UI</span>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              [
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              ].join(" ")
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
