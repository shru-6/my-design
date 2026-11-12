import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { AuthLayout } from "./AuthLayout"

describe("AuthLayout", () => {
  it("renders without crashing", () => {
    render(
      <AuthLayout title="Sign in">
        <div>Form content</div>
      </AuthLayout>
    )
    expect(screen.getByText("Sign in")).toBeInTheDocument()
  })
})
