import {
  Alert,
  AvatarGroup,
  Pill,
  BarChart,
  Button,
  Card,
  EmptyState,
  Progress,
  Table,
  Text,
} from "shru-design-system"
import { TEAM_MEMBERS } from "../data"
import type { ShowcaseApp } from "../useShowcaseApp"

const TEAM_COLUMNS = [
  { key: "name", header: "Name" },
  { key: "role", header: "Role" },
  {
    key: "status",
    header: "Status",
    render: (row: (typeof TEAM_MEMBERS)[number]) => (
      <Pill tone={row.status === "Active" ? "success" : "warning"}>{row.status}</Pill>
    ),
  },
]

type DashboardViewProps = Pick<
  ShowcaseApp,
  | "profile"
  | "notifications"
  | "usagePercent"
  | "chartData"
  | "activeProjects"
  | "showSkeleton"
  | "setShowSkeleton"
  | "navigate"
>

export function DashboardView({
  profile,
  notifications,
  usagePercent,
  chartData,
  activeProjects,
  showSkeleton,
  setShowSkeleton,
  navigate,
}: DashboardViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <Alert
        tone="info"
        title="Welcome back"
        description={`${profile.name}, you have ${activeProjects.length} active project${activeProjects.length === 1 ? "" : "s"}.`}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <Card header={<Text weight="semibold">Plan usage</Text>}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="info">Pro plan</Pill>
              <Text variant="muted" size="sm">
                {activeProjects.length} of 10 project slots
              </Text>
            </div>
            <Progress value={usagePercent} showLabel />
          </div>
        </Card>

        <Card header={<Text weight="semibold">Signups</Text>}>
          <BarChart data={chartData} xKey="label" yKey="value" height={160} />
        </Card>
      </div>

      <Card
        header={
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Text weight="semibold">Team</Text>
            <AvatarGroup
              size="sm"
              items={TEAM_MEMBERS.map((m) => ({ name: m.name, color: "primary" as const }))}
              max={4}
            />
          </div>
        }
        footer={
          <Button size="sm" variant="ghost" onClick={() => setShowSkeleton((value) => !value)}>
            {showSkeleton ? "Show team table" : "Preview loading state"}
          </Button>
        }
      >
        {showSkeleton ? (
          <Table
            data={[]}
            columns={TEAM_COLUMNS}
            loading
            loadingRows={TEAM_MEMBERS.length}
            getRowId={(row) => row.id}
          />
        ) : (
          <Table data={TEAM_MEMBERS} columns={TEAM_COLUMNS} getRowId={(row) => row.id} />
        )}
      </Card>

      {!notifications ? (
        <EmptyState
          title="Notifications paused"
          description="Re-enable email notifications in Settings to receive project alerts."
          action={{ label: "Open settings", onClick: () => navigate("settings") }}
        />
      ) : null}
    </div>
  )
}
