import {
  CodeBlock,
  Pill,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Table,
  Text,
  TreeView,
} from "shru-design-system"
import { API_REQUEST_SNIPPETS } from "../apiCollection"
import type { Project, ProjectStatus } from "../types"
import type { ShowcaseApp } from "../useShowcaseApp"
import { PAGE_SIZE } from "../types"

function statusTone(status: ProjectStatus) {
  if (status === "Active") return "success"
  if (status === "Draft") return "warning"
  return "neutral"
}

type ProjectsViewProps = Pick<
  ShowcaseApp,
  | "paginatedProjects"
  | "filteredProjects"
  | "selectedProjectIds"
  | "setSelectedProjectIds"
  | "page"
  | "setPage"
  | "openProjectDetail"
  | "apiCollection"
  | "selectedApiId"
  | "setSelectedApiId"
  | "apiExpandedIds"
  | "setApiExpandedIds"
  | "moveApiNode"
  | "addApiNode"
  | "deleteApiNode"
>

export function ProjectsView({
  paginatedProjects,
  filteredProjects,
  selectedProjectIds,
  setSelectedProjectIds,
  page,
  setPage,
  openProjectDetail,
  apiCollection,
  selectedApiId,
  setSelectedApiId,
  apiExpandedIds,
  setApiExpandedIds,
  moveApiNode,
  addApiNode,
  deleteApiNode,
}: ProjectsViewProps) {
  const columns = [
    { key: "name", header: "Project", sortable: true },
    { key: "owner", header: "Owner", sortable: true },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (row: Project) => <Pill tone={statusTone(row.status)}>{row.status}</Pill>,
    },
    { key: "updatedAt", header: "Updated", sortable: true },
  ]

  const requestSnippet = API_REQUEST_SNIPPETS[selectedApiId]

  return (
    <div className="flex min-h-[520px] flex-col gap-4">
      <Text variant="muted" size="sm">
        Postman-style collection on the left — drag to reorder, hover for add/delete. Projects table on the right.
        {selectedProjectIds.length > 0 ? ` · ${selectedProjectIds.length} selected` : ""}
      </Text>

      <ResizablePanelGroup direction="horizontal" className="min-h-[480px] rounded-lg border border-border">
        <ResizablePanel defaultSize={30} minSize={22} className="min-w-0">
          <div className="flex h-full flex-col gap-2 border-r border-border bg-muted/20 p-3">
            <Text size="sm" weight="semibold">
              API collection
            </Text>
            <Text size="xs" variant="muted">
              Drag items · + sibling · folder icon adds child
            </Text>
            <TreeView
              items={apiCollection}
              selectedId={selectedApiId}
              onSelect={setSelectedApiId}
              expandedIds={apiExpandedIds}
              onExpandedChange={setApiExpandedIds}
              draggable
              onMove={moveApiNode}
              allowAddSibling
              allowAddChild
              allowDelete
              onAdd={addApiNode}
              onDelete={deleteApiNode}
              className="flex-1 overflow-auto border-0 bg-transparent p-0"
            />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel minSize={45} className="min-w-0">
          <div className="flex h-full flex-col gap-4 p-4">
            {requestSnippet ? (
              <div className="flex flex-col gap-2">
                <Text size="sm" weight="semibold">
                  Request preview
                </Text>
                <CodeBlock code={requestSnippet} language="http" showCopy />
              </div>
            ) : (
              <Text size="sm" variant="muted">
                Select a request in the collection to preview its HTTP snippet.
              </Text>
            )}

            <Text size="sm" weight="semibold">
              Projects ({filteredProjects.length})
            </Text>

            <Table
              data={paginatedProjects}
              columns={columns}
              sortable
              selectable
              selectedRows={selectedProjectIds}
              onSelectionChange={setSelectedProjectIds}
              getRowId={(row) => row.id}
              onRowClick={(row) => openProjectDetail(row.id)}
              emptyState={
                <Text variant="muted" size="sm">
                  No projects match your filters. Adjust filters or create a new project.
                </Text>
              }
              pagination={{
                total: filteredProjects.length,
                pageSize: PAGE_SIZE,
                value: page,
                onChange: setPage,
              }}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
