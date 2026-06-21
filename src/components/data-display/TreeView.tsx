import * as React from "react"
import {
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  FolderOpen,
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react"
import { cn } from "../../utils"
import { Spinner } from "./Spinner"
import { Icon } from "../utilities/Icon"

export type TreeItemKind = "folder" | "file"

export type TreeItem = {
  id: string
  label: React.ReactNode
  left?: React.ReactNode
  kind?: TreeItemKind
  children?: TreeItem[]
}

export type TreeAddRelation = "sibling" | "child"
export type TreeMovePosition = "before" | "after" | "inside"

export interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items: TreeItem[]
  selectedId?: string
  defaultSelectedId?: string
  onSelect?: (id: string) => void
  expandedIds?: string[]
  defaultExpandedIds?: string[]
  onExpandedChange?: (ids: string[]) => void
  showIndentGuides?: boolean
  loading?: boolean
  emptyState?: React.ReactNode
  indent?: number
  draggable?: boolean
  onMove?: (payload: { draggedId: string; targetId: string; position: TreeMovePosition }) => void
  allowAddSibling?: boolean
  allowAddChild?: boolean
  allowDelete?: boolean
  onAdd?: (payload: { targetId: string; relation: TreeAddRelation }) => void
  onDelete?: (id: string) => void
  className?: string
}

type DropHint = {
  targetId: string
  position: TreeMovePosition
}

function treeItemKey(item: TreeItem, index: number, prefix = ""): string {
  if (item.id) return item.id
  const fallback = (item as TreeItem & { value?: string }).value
  return fallback ?? `${prefix}node-${index}`
}

function normalizeTreeItems(items: TreeItem[], prefix = ""): TreeItem[] {
  return items.map((item, index) => {
    const id = treeItemKey(item, index, prefix)
    return {
      ...item,
      id,
      children: item.children?.length ? normalizeTreeItems(item.children, `${id}-`) : item.children,
    }
  })
}

function defaultIcon(item: TreeItem, expanded: boolean) {
  const isFolder = item.kind === "folder" || Boolean(item.children?.length)
  if (isFolder) {
    return expanded ? <FolderOpen className="h-3.5 w-3.5" /> : <Folder className="h-3.5 w-3.5" />
  }
  return <File className="h-3.5 w-3.5" />
}

function resolveDropPosition(event: React.DragEvent<HTMLDivElement>, canDropInside: boolean): TreeMovePosition {
  const rect = event.currentTarget.getBoundingClientRect()
  const offset = (event.clientY - rect.top) / rect.height
  if (canDropInside && offset > 0.28 && offset < 0.72) return "inside"
  return offset < 0.5 ? "before" : "after"
}

function TreeRow({
  item,
  depth,
  indent,
  selectedId,
  expandedIds,
  showIndentGuides,
  draggable,
  dropHint,
  allowAddSibling,
  allowAddChild,
  allowDelete,
  onToggle,
  onSelect,
  onAdd,
  onDelete,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
}: {
  item: TreeItem
  depth: number
  indent: number
  selectedId?: string
  expandedIds: Set<string>
  showIndentGuides?: boolean
  draggable?: boolean
  dropHint?: DropHint | null
  allowAddSibling?: boolean
  allowAddChild?: boolean
  allowDelete?: boolean
  onToggle: (id: string) => void
  onSelect: (id: string) => void
  onAdd?: (payload: { targetId: string; relation: TreeAddRelation }) => void
  onDelete?: (id: string) => void
  onDragStart: (id: string) => void
  onDragOver: (event: React.DragEvent<HTMLDivElement>, item: TreeItem) => void
  onDragLeave: () => void
  onDrop: (event: React.DragEvent<HTMLDivElement>, item: TreeItem) => void
  onDragEnd: () => void
}) {
  const hasChildren = Boolean(item.children?.length)
  const expanded = expandedIds.has(item.id)
  const selected = selectedId === item.id
  const isFolder = item.kind === "folder" || hasChildren
  const showAddSibling = Boolean(allowAddSibling)
  const showAddChild = Boolean(allowAddChild) && isFolder
  const showDelete = Boolean(allowDelete)
  const hasActions = showAddSibling || showAddChild || showDelete

  const dropActive = dropHint?.targetId === item.id
  const dropBefore = dropActive && dropHint?.position === "before"
  const dropAfter = dropActive && dropHint?.position === "after"
  const dropInside = dropActive && dropHint?.position === "inside"

  return (
    <div role="none">
      <div
        role="treeitem"
        aria-selected={selected}
        aria-expanded={hasChildren ? expanded : undefined}
        draggable={draggable || undefined}
        onDragStart={(event) => {
          if (!draggable) return
          event.dataTransfer.effectAllowed = "move"
          event.dataTransfer.setData("text/plain", item.id)
          onDragStart(item.id)
        }}
        onDragOver={(event) => {
          if (!draggable) return
          onDragOver(event, item)
        }}
        onDragLeave={onDragLeave}
        onDrop={(event) => {
          if (!draggable) return
          onDrop(event, item)
        }}
        onDragEnd={onDragEnd}
        className={cn(
          "group relative flex min-h-[30px] items-center rounded-sm text-sm transition-colors",
          selected && "bg-primary/10 text-foreground",
          !selected && "hover:bg-muted/70",
          dropInside && "bg-muted/60 ring-1 ring-inset ring-primary/40",
          showIndentGuides && depth > 0 && "border-l border-border/60"
        )}
        style={{ paddingLeft: depth * indent + 4 }}
      >
        {dropBefore ? <span className="absolute inset-x-1 top-0 h-0.5 rounded-full bg-primary" aria-hidden /> : null}
        {dropAfter ? <span className="absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-primary" aria-hidden /> : null}

        {draggable ? (
          <span
            className="flex h-6 w-4 shrink-0 cursor-grab items-center justify-center text-muted-foreground/70 active:cursor-grabbing"
            aria-hidden
          >
            <GripVertical className="h-3.5 w-3.5" />
          </span>
        ) : null}

        <button
          type="button"
          className={cn(
            "flex h-6 w-5 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted",
            !hasChildren && "invisible"
          )}
          aria-label={expanded ? "Collapse" : "Expand"}
          onClick={(event) => {
            event.stopPropagation()
            if (hasChildren) onToggle(item.id)
          }}
        >
          {hasChildren ? (
            expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />
          ) : null}
        </button>

        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-2 rounded-sm py-1 pr-1 text-left"
          onClick={() => onSelect(item.id)}
        >
          <span className="shrink-0 text-muted-foreground">
            {item.left ? <Icon node={item.left} size="sm" /> : defaultIcon(item, expanded)}
          </span>
          <span className="min-w-0 flex-1 truncate">{item.label}</span>
        </button>

        {hasActions ? (
          <div className="flex shrink-0 items-center gap-0.5 pr-1 opacity-70 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
            {showAddSibling ? (
              <button
                type="button"
                disabled={!onAdd}
                className="flex h-6 w-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Add sibling"
                title="Add sibling"
                onClick={(event) => {
                  event.stopPropagation()
                  onAdd?.({ targetId: item.id, relation: "sibling" })
                }}
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            ) : null}
            {showAddChild ? (
              <button
                type="button"
                disabled={!onAdd}
                className="flex h-6 w-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Add child"
                title="Add folder or request"
                onClick={(event) => {
                  event.stopPropagation()
                  onAdd?.({ targetId: item.id, relation: "child" })
                }}
              >
                <Folder className="h-3.5 w-3.5" />
              </button>
            ) : null}
            {showDelete ? (
              <button
                type="button"
                disabled={!onDelete}
                className="flex h-6 w-6 items-center justify-center rounded-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Delete"
                title="Delete"
                onClick={(event) => {
                  event.stopPropagation()
                  onDelete?.(item.id)
                }}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      {hasChildren && expanded
        ? item.children!.map((child, childIndex) => (
            <TreeRow
              key={treeItemKey(child, childIndex, `${item.id}-`)}
              item={child}
              depth={depth + 1}
              indent={indent}
              selectedId={selectedId}
              expandedIds={expandedIds}
              showIndentGuides={showIndentGuides}
              draggable={draggable}
              dropHint={dropHint}
              allowAddSibling={allowAddSibling}
              allowAddChild={allowAddChild}
              allowDelete={allowDelete}
              onToggle={onToggle}
              onSelect={onSelect}
              onAdd={onAdd}
              onDelete={onDelete}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onDragEnd={onDragEnd}
            />
          ))
        : null}
    </div>
  )
}

export function TreeView({
  items,
  selectedId,
  defaultSelectedId,
  onSelect,
  expandedIds,
  defaultExpandedIds = [],
  onExpandedChange,
  showIndentGuides = false,
  loading = false,
  emptyState = "No items",
  indent = 12,
  draggable = false,
  onMove,
  allowAddSibling = false,
  allowAddChild = false,
  allowDelete = false,
  onAdd,
  onDelete,
  className,
  ...rest
}: TreeViewProps) {
  const [internalSelected, setInternalSelected] = React.useState(defaultSelectedId)
  const [internalExpanded, setInternalExpanded] = React.useState<string[]>(defaultExpandedIds)
  const [draggedId, setDraggedId] = React.useState<string | null>(null)
  const [dropHint, setDropHint] = React.useState<DropHint | null>(null)

  const isSelectedControlled = selectedId !== undefined
  const isExpandedControlled = expandedIds !== undefined
  const resolvedSelected = isSelectedControlled ? selectedId : internalSelected
  const resolvedExpanded = new Set(isExpandedControlled ? expandedIds : internalExpanded)

  const setSelected = (id: string) => {
    if (!isSelectedControlled) setInternalSelected(id)
    onSelect?.(id)
  }

  const toggleExpanded = (id: string) => {
    const next = new Set(resolvedExpanded)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    const arr = [...next]
    if (!isExpandedControlled) setInternalExpanded(arr)
    onExpandedChange?.(arr)
  }

  const normalizedItems = React.useMemo(() => normalizeTreeItems(items), [items])

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>, item: TreeItem) => {
    event.preventDefault()
    if (!draggedId || draggedId === item.id) return
    const canDropInside = item.kind === "folder" || Boolean(item.children?.length)
    const position = resolveDropPosition(event, canDropInside)
    setDropHint({ targetId: item.id, position })
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, item: TreeItem) => {
    event.preventDefault()
    const sourceId = event.dataTransfer.getData("text/plain") || draggedId
    if (!sourceId || sourceId === item.id) return
    const canDropInside = item.kind === "folder" || Boolean(item.children?.length)
    const position = dropHint?.targetId === item.id ? dropHint.position : resolveDropPosition(event, canDropInside)
    onMove?.({ draggedId: sourceId, targetId: item.id, position })
    setDraggedId(null)
    setDropHint(null)
  }

  const clearDrag = () => {
    setDraggedId(null)
    setDropHint(null)
  }

  if (loading) {
    return (
      <div className={cn("flex items-center justify-center p-6", className)}>
        <Spinner size="sm" />
      </div>
    )
  }

  if (!normalizedItems.length) {
    return (
      <div className={cn("p-4 text-sm text-muted-foreground", className)} {...rest}>
        {emptyState}
      </div>
    )
  }

  return (
    <div
      role="tree"
      className={cn("w-full select-none space-y-px rounded-md border border-border/60 bg-background p-1", className)}
      {...rest}
    >
      {normalizedItems.map((item, index) => (
        <TreeRow
          key={treeItemKey(item, index)}
          item={item}
          depth={0}
          indent={indent}
          selectedId={resolvedSelected}
          expandedIds={resolvedExpanded}
          showIndentGuides={showIndentGuides}
          draggable={draggable}
          dropHint={dropHint}
          allowAddSibling={allowAddSibling}
          allowAddChild={allowAddChild}
          allowDelete={allowDelete}
          onToggle={toggleExpanded}
          onSelect={setSelected}
          onAdd={onAdd}
          onDelete={onDelete}
          onDragStart={setDraggedId}
          onDragOver={handleDragOver}
          onDragLeave={() => setDropHint(null)}
          onDrop={handleDrop}
          onDragEnd={clearDrag}
        />
      ))}
    </div>
  )
}

TreeView.displayName = "TreeView"

export {
  addTreeNodeChild,
  addTreeNodeSibling,
  deleteTreeNode,
  moveTreeNode,
} from "./treeUtils"
