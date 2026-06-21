import {
  Button,
  Form,
  FormField,
  Popover,
  Separator,
  Text,
  Toggle,
  Upload,
  toast,
} from "shru-design-system"
import type { ShowcaseApp } from "../useShowcaseApp"
import { ThemeSettingsSection } from "./ThemeSettingsSection"

type SettingsViewProps = Pick<
  ShowcaseApp,
  "profile" | "notifications" | "setNotifications" | "saveProfile"
>

export function SettingsView({ profile, notifications, setNotifications, saveProfile }: SettingsViewProps) {
  return (
    <Form
      key={`${profile.name}-${profile.email}`}
      initialValues={{ name: profile.name, email: profile.email }}
      onSubmit={saveProfile}
    >
      <div className="flex max-w-xl flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Text weight="semibold">Profile</Text>
          <FormField name="name" label="Display name" placeholder="Your name" required />
          <FormField name="email" label="Email" type="email" placeholder="you@jane.com" required validate />
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <Text weight="semibold">Appearance</Text>
          <Text size="sm" variant="muted">
            Theme panel embedded in-page — same UI as the FAB toggle, without fixed positioning.
          </Text>
          <ThemeSettingsSection />
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <Text weight="semibold">Preferences</Text>
          <Toggle
            checked={notifications}
            onChange={setNotifications}
            label="Email notifications"
            description="Project updates and team invites"
          />
          <Upload
            label="Avatar"
            maxFiles={1}
            accept="image/*"
            onUpload={() => {
              toast({ title: "Uploaded", description: "Avatar saved for this session." })
            }}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="submit">Save changes</Button>
          <Popover triggerProps={{ label: "Advanced", variant: "outline" }}>
            <Text size="sm">Export data, API keys, and billing would live here.</Text>
          </Popover>
        </div>
      </div>
    </Form>
  )
}
