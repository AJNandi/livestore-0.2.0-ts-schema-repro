import { useRow } from "@livestore/react"
import { SettingsHeader, SettingsInput, SettingsReadonly } from "./Components"
import { tables, useClientState } from "@repo/livestore"

export default function MyAccount() {
  const [clientState] = useClientState()

  const [user] = useRow(tables.user, clientState.activeUserId!)

  return (
    <div>
      <SettingsHeader title="My account" description="" />
      <div className="py-4 space-y-4">
        <SettingsInput
          id={"name"}
          label={"Your name"}
          value={user.name}
          caption="Your display name is visible to others in the workspace."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length > 0) {
              // me.profile.name = e.target.value
              // update name
            }
          }}
        />
        <SettingsReadonly id="email" label="Email" value={user.email} />
      </div>
    </div>
  )
}
