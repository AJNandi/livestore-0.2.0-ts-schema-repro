import { Cog8ToothIcon } from "@heroicons/react/24/outline"
import { useRow } from "@livestore/react"
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import { tables, useClientState, Workspace } from "@repo/livestore"
import clsx from "clsx"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent } from "../../components/ui/dialog"
import { getInitials } from "../../lib/user"
import MyAccount from "./SettingsModalPages/MyAccountSettings"
import People from "./SettingsModalPages/PeopleSettings"
import WorkspaceSettings from "./SettingsModalPages/WorkspaceSettings"

function TabButton({ tab, setTab, selected }: { selected: Tab; tab: Tab; setTab: (tab: Tab) => void }) {
  return (
    <Button
      variant="ghost"
      className={clsx("w-full justify-start h-7 hover:bg-slate-300", selected === tab ? "bg-slate-300 font-bold" : "")}
      onClick={() => {
        setTab(tab)
      }}
    >
      {tab}
    </Button>
  )
}

function SettingsContent({ tab, workspace }: { tab: Tab; workspace: Workspace }) {
  switch (tab) {
    case Tab.account:
      return <MyAccount />
    case Tab.workspaceSettings:
      return <WorkspaceSettings workspace={workspace} />
    case Tab.people:
      return <People workspace={workspace} />
    default:
      throw new Error("Invalid tab")
  }
}

enum Tab {
  account = "Account",
  workspaceSettings = "Settings",
  people = "People",
}

export default function SettingsModal({ open, onOpenChange }: { open: boolean; onOpenChange: (b: boolean) => void }) {
  const [clientState] = useClientState()

  const [user] = useRow(tables.user, clientState.activeUserId!)
  const [workspace] = useRow(tables.workspace, clientState.activeWorkspaceId!)

  const [tab, setTab] = useState<Tab>(Tab.people)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full pl-1 pr-4 px-2 space-x-1 rounded-none justify-start hover:bg-slate-200/50">
          <Cog8ToothIcon className="text-gray-400 h-4 w-4 shrink-0" />
          <span className={clsx("text-gray-700 pl-2 flex gap-x-3 py-1.5 text-xs leading-6 px-2 items-center group font-normal")}>
            Settings & members
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[75%] p-0 h-[60%] overflow-hidden" aria-describedby={undefined}>
        <VisuallyHidden.Root>
          <DialogTitle>Settings</DialogTitle>
        </VisuallyHidden.Root>
        <div className="flex divide-x divide-gray-200">
          <div className="bg-slate-200 p-4 w-72">
            <div className="space-y-4">
              <div>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 text-[8px]">
                    <AvatarImage src={""} />
                    <AvatarFallback className="text-white bg-blue-500">{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-col flex ml-2">
                    <span className="max-w-36 truncate text-sm font-medium min-h-4">{user.name}</span>
                    <span className="max-w-36 truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </div>
              <div className="text-xs">
                Account
                <TabButton tab={Tab.account} setTab={setTab} selected={tab} />
              </div>
              <div className="text-xs space-y-[1px]">
                Workspace
                <TabButton tab={Tab.workspaceSettings} setTab={setTab} selected={tab} />
                <TabButton tab={Tab.people} setTab={setTab} selected={tab} />
              </div>
            </div>
          </div>
          <div className="h-full w-full bg-slate-50 p-4">{SettingsContent({ tab, workspace })}</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
