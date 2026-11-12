import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { Upload } from "./Upload"

describe("Upload", () => {
  it("renders without crashing", () => {
    const { container } = render(<Upload onUpload={() => {}} label="Upload files" />)
    expect(container).toBeTruthy()
  })
})
