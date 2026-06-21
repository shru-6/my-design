import * as React from "react"
import { Upload as UploadIcon, X } from "lucide-react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../utils"
import { Button } from "../actions/Button"
import { Image } from "../data-display/Image"
import { Spinner } from "../data-display/Spinner"
import { Text } from "../data-display/Text"
import { FieldLayout, fieldSurfaceVariants } from "./fieldPieces"

export interface UploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  onUpload: (files: File[]) => void | Promise<void>
  onRemove?: (file: File, index: number) => void
  value?: File[]
  defaultValue?: File[]
  onChange?: (files: File[]) => void
  multiple?: boolean
  maxFiles?: number
  accept?: string
  maxSize?: number
  disabled?: boolean
  loading?: boolean
  dragAndDrop?: boolean
  preview?: boolean
  label?: React.ReactNode
  errorMessage?: string
  showFileList?: boolean
  size?: VariantProps<typeof fieldSurfaceVariants>["size"]
  variant?: VariantProps<typeof fieldSurfaceVariants>["variant"]
  className?: string
  children?: React.ReactNode
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatFileType(file: File): string {
  if (file.type) {
    const [category, subtype] = file.type.split("/")
    if (category && subtype) {
      return subtype === "*" ? category : `${subtype.replace(/\+/g, " ")} (${category})`
    }
    return file.type
  }
  const ext = file.name.includes(".") ? file.name.split(".").pop() : undefined
  return ext ? `.${ext.toLowerCase()}` : "Unknown type"
}

function formatAcceptHint(accept?: string): string | null {
  if (!accept?.trim()) return null
  return accept
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .join(", ")
}

function matchesAccept(file: File, accept?: string): boolean {
  if (!accept?.trim()) return true
  const type = file.type.toLowerCase()
  const name = file.name.toLowerCase()

  return accept.split(",").some((raw) => {
    const rule = raw.trim().toLowerCase()
    if (!rule) return false
    if (rule.startsWith(".")) return name.endsWith(rule)
    if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1))
    return type === rule
  })
}

export function Upload({
  onUpload,
  onRemove,
  value,
  defaultValue = [],
  onChange,
  multiple = false,
  maxFiles,
  accept,
  maxSize,
  disabled,
  loading = false,
  dragAndDrop = true,
  preview = true,
  label,
  errorMessage,
  showFileList = true,
  size = "md",
  variant = "outline",
  className,
  children,
  ...rest
}: UploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [internal, setInternal] = React.useState<File[]>(defaultValue)
  const [dragOver, setDragOver] = React.useState(false)
  const [localError, setLocalError] = React.useState<string | undefined>()

  const isControlled = value !== undefined
  const files = isControlled ? value : internal

  const setFiles = (next: File[]) => {
    if (!isControlled) setInternal(next)
    onChange?.(next)
  }

  const validateFiles = (incoming: File[]): File[] => {
    let accepted = incoming

    if (accept) {
      const rejected = incoming.filter((file) => !matchesAccept(file, accept))
      if (rejected.length > 0) {
        const hint = formatAcceptHint(accept)
        setLocalError(
          `Unsupported file type. Accepted: ${hint ?? accept}.`
        )
        accepted = incoming.filter((file) => matchesAccept(file, accept))
      } else if (!maxSize || !incoming.find((f) => f.size > maxSize)) {
        setLocalError(undefined)
      }
    }

    if (maxSize) {
      const tooLarge = accepted.find((f) => f.size > maxSize)
      if (tooLarge) {
        setLocalError(`"${tooLarge.name}" exceeds max size (${formatBytes(maxSize)}).`)
        accepted = accepted.filter((f) => f.size <= maxSize)
      } else if (!accept || accepted.every((f) => matchesAccept(f, accept))) {
        setLocalError(undefined)
      }
    }

    if (maxFiles) accepted = accepted.slice(0, maxFiles)
    return accepted
  }

  const handleIncoming = async (incoming: File[]) => {
    if (disabled || loading) return
    const next = validateFiles(multiple ? [...files, ...incoming] : incoming.slice(0, 1))
    setFiles(next)
    await onUpload(next)
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files ? Array.from(e.target.files) : []
    void handleIncoming(list)
    e.target.value = ""
  }

  const removeAt = (index: number) => {
    const file = files[index]
    const next = files.filter((_, i) => i !== index)
    setFiles(next)
    onRemove?.(file, index)
  }

  const shellClass = cn(
    "relative flex min-h-[8rem] w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-4 text-center transition-colors",
    variant === "filled" && "bg-muted/40",
    variant === "ghost" && "border-transparent bg-muted/20",
    dragOver && "border-primary bg-primary/5",
    disabled && "pointer-events-none opacity-50",
    errorMessage || localError ? "border-destructive/50" : "border-border"
  )

  return (
    <FieldLayout label={label} errorMessage={errorMessage ?? localError} size={size}>
      <div className={cn("w-full", className)} {...rest}>
        <div
          className={shellClass}
          onDragEnter={dragAndDrop ? (e) => { e.preventDefault(); setDragOver(true) } : undefined}
          onDragOver={dragAndDrop ? (e) => { e.preventDefault(); setDragOver(true) } : undefined}
          onDragLeave={dragAndDrop ? () => setDragOver(false) : undefined}
          onDrop={
            dragAndDrop
              ? (e) => {
                  e.preventDefault()
                  setDragOver(false)
                  void handleIncoming(Array.from(e.dataTransfer.files))
                }
              : undefined
          }
        >
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            disabled={disabled || loading}
            multiple={multiple}
            accept={accept}
            onChange={onInputChange}
          />
          {loading ? <Spinner size="md" /> : <UploadIcon className="h-8 w-8 text-muted-foreground" />}
          {children ?? (
            <>
              <Text as="div" size="sm" weight="medium">
                {dragAndDrop ? "Drag files here or browse" : "Browse files"}
              </Text>
              <Text as="div" size="xs" variant="muted">
                {multiple ? "Multiple files allowed" : "Single file"}
                {accept ? ` · ${formatAcceptHint(accept)}` : null}
                {maxSize ? ` · Max ${formatBytes(maxSize)}` : null}
              </Text>
            </>
          )}
          <Button
            variant="outline"
            size={size === "lg" ? "md" : "sm"}
            disabled={disabled || loading}
            onClick={() => inputRef.current?.click()}
          >
            Choose file{multiple ? "s" : ""}
          </Button>
        </div>

        {showFileList && files.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center gap-3 rounded-md border border-border bg-background p-2"
              >
                {preview && file.type.startsWith("image/") ? (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded object-cover"
                  />
                ) : null}
                <div className="min-w-0 flex-1">
                  <Text as="div" size="sm" className="truncate">
                    {file.name}
                  </Text>
                  <Text as="div" size="xs" variant="muted">
                    {formatFileType(file)} · {formatBytes(file.size)}
                  </Text>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconOnly
                  aria-label={`Remove ${file.name}`}
                  disabled={disabled || loading}
                  left={<X className="h-4 w-4" />}
                  onClick={() => removeAt(index)}
                />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </FieldLayout>
  )
}

Upload.displayName = "Upload"
