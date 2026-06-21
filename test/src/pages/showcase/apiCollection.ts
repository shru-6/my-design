import type { TreeItem } from "shru-design-system"

export const INITIAL_API_COLLECTION: TreeItem[] = [
  {
    id: "workspace",
    label: "Jane Workspace",
    kind: "folder",
    children: [
      {
        id: "api-v1",
        label: "API v1",
        kind: "folder",
        children: [
          { id: "get-users", label: "GET Users", kind: "file" },
          { id: "post-user", label: "POST Create user", kind: "file" },
        ],
      },
      {
        id: "auth",
        label: "Auth",
        kind: "folder",
        children: [{ id: "post-login", label: "POST Login", kind: "file" }],
      },
    ],
  },
]

export const API_REQUEST_SNIPPETS: Record<string, string> = {
  "get-users": `GET /v1/users
Authorization: Bearer {{token}}`,
  "post-user": `POST /v1/users
Content-Type: application/json

{ "name": "Alex Jane", "email": "alex@jane.com" }`,
  "post-login": `POST /auth/login
Content-Type: application/json

{ "email": "alex@jane.com", "password": "••••••••" }`,
}

let nodeCounter = 0

export function createApiNode(label: string, kind: "folder" | "file" = "file"): TreeItem {
  nodeCounter += 1
  return {
    id: `api-node-${Date.now()}-${nodeCounter}`,
    label,
    kind,
    ...(kind === "folder" ? { children: [] } : {}),
  }
}
