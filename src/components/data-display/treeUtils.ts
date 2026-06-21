import type { TreeItem } from "./TreeView"

export type TreeMovePosition = "before" | "after" | "inside"

function cloneItem(item: TreeItem): TreeItem {
  return {
    ...item,
    children: item.children?.map(cloneItem),
  }
}

function findNode(items: TreeItem[], id: string): TreeItem | null {
  for (const item of items) {
    if (item.id === id) return item
    if (item.children?.length) {
      const nested = findNode(item.children, id)
      if (nested) return nested
    }
  }
  return null
}

function isDescendant(items: TreeItem[], ancestorId: string, candidateId: string): boolean {
  const ancestor = findNode(items, ancestorId)
  if (!ancestor?.children?.length) return false

  const walk = (nodes: TreeItem[]): boolean => {
    for (const node of nodes) {
      if (node.id === candidateId) return true
      if (node.children?.length && walk(node.children)) return true
    }
    return false
  }

  return walk(ancestor.children)
}

function removeNode(items: TreeItem[], id: string): { items: TreeItem[]; removed: TreeItem | null } {
  let removed: TreeItem | null = null

  const next = items
    .map((item) => {
      if (item.id === id) {
        removed = cloneItem(item)
        return null
      }
      if (item.children?.length) {
        const result = removeNode(item.children, id)
        if (result.removed) {
          removed = result.removed
          return { ...item, children: result.items.length ? result.items : undefined }
        }
      }
      return item
    })
    .filter(Boolean) as TreeItem[]

  return { items: next, removed }
}

function insertSibling(items: TreeItem[], targetId: string, node: TreeItem, after: boolean): TreeItem[] {
  const result: TreeItem[] = []

  for (const item of items) {
    if (item.id === targetId) {
      if (!after) result.push(node)
      result.push(item)
      if (after) result.push(node)
      continue
    }

    if (item.children?.length) {
      const children = insertSibling(item.children, targetId, node, after)
      if (children !== item.children) {
        result.push({ ...item, children })
        continue
      }
    }

    result.push(item)
  }

  return result
}

function appendChild(items: TreeItem[], targetId: string, node: TreeItem): TreeItem[] {
  return items.map((item) => {
    if (item.id === targetId) {
      const children = item.children ? [...item.children, node] : [node]
      return { ...item, children }
    }
    if (item.children?.length) {
      return { ...item, children: appendChild(item.children, targetId, node) }
    }
    return item
  })
}

export function deleteTreeNode(items: TreeItem[], id: string): TreeItem[] {
  return removeNode(items, id).items
}

export function addTreeNodeSibling(items: TreeItem[], targetId: string, node: TreeItem): TreeItem[] {
  return insertSibling(items, targetId, node, true)
}

export function addTreeNodeChild(items: TreeItem[], targetId: string, node: TreeItem): TreeItem[] {
  return appendChild(items, targetId, node)
}

export function moveTreeNode(
  items: TreeItem[],
  draggedId: string,
  targetId: string,
  position: TreeMovePosition
): TreeItem[] {
  if (draggedId === targetId) return items
  if (isDescendant(items, draggedId, targetId)) return items

  const { items: withoutDragged, removed } = removeNode(items, draggedId)
  if (!removed) return items

  if (position === "inside") {
    return appendChild(withoutDragged, targetId, removed)
  }

  return insertSibling(withoutDragged, targetId, removed, position === "after")
}
