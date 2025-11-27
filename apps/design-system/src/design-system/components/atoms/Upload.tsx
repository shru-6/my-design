import * as React from "react"
import { cn } from "../utils"

export interface UploadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onUpload?: (files: FileList | null) => void
}

export function Upload({
  className,
  onUpload,
  onChange,
  ...props
}: UploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onUpload?.(e.target.files)
  }

  return (
    <input
      type="file"
      data-slot="upload"
      className={cn(
        "file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90",
        className
      )}
      onChange={handleChange}
      {...props}
    />
  )
}

export function UploadShowcase() {
  return (
    <div className="space-y-6 max-w-md">
      <div>
        <h4 className="text-sm font-medium mb-3">File Upload</h4>
        <Upload onUpload={(files) => console.log("Uploaded:", files)} />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Multiple Files</h4>
        <Upload multiple onUpload={(files) => console.log("Uploaded:", files)} />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-3">Accept Images Only</h4>
        <Upload accept="image/*" onUpload={(files) => console.log("Uploaded:", files)} />
      </div>
    </div>
  )
}

