import { XCircleIcon } from "@heroicons/react/24/solid"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Workspace } from "@repo/livestore"
import clsx from "clsx"
import { Group } from "jazz-tools"
import { Avatar, AvatarFallback } from "../../../components/ui/avatar"
import { Button } from "../../../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu"
import { getInitials } from "../../../lib/user"
import { InviteUserDialog } from "../../Invite/InviteUserDialog"
import { SettingsHeader, SettingsLabel } from "./Components"

export default function People({ workspace }: { workspace: Workspace }) {
  // const members = workspace.members

  return (
    <div>
      <SettingsHeader title="People" description="Add and remove members from your workspace" />
      <div className="py-4 space-y-4">
        <div className="flex items-end">
          <div className="flex-1">
            <SettingsLabel id="members" label="Members" />
          </div>
          {/* <InviteUserDialog workspace={workspace} /> */}
        </div>
        {/* {members?.map((member) => (
          <div key={member.id}>
            <div className="text-sm">
              <UserTile member={member} />
            </div>
          </div>
        ))} */}
      </div>
    </div>
  )
}

function UserTile({ member }: { member: Group["members"][0] }) {
  // const { me } = useAccount({ profile: true })
  const user = member.account

  if (!user || !user.profile) return null

  return (
    <div>
      <div className="flex items-center">
        <Avatar className="h-8 w-8 text-[8px]">
          {/* <AvatarImage src={user?.picture} /> */}
          <AvatarFallback className="text-white bg-blue-500">{getInitials(user.profile.name)}</AvatarFallback>
        </Avatar>
        <div className="space-x-2 flex items-center flex-1">
          <div className="flex-col flex ml-2 flex-grow">
            <span className="max-w-48 truncate text-sm font-medium">{user.profile.name}</span>
            <span className="max-w-36 truncate text-xs">{user.profile.name}</span>
          </div>
          {/* {member.status !== "active" && <div className="bg-slate-200 text-xs rounded-full px-2 py-1 cursor-default">{member.status}</div>} */}
          <div className="flex items-start">{member.role}</div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="h-6 w-6 p-0 my-2 hover:bg-slate-200">
                  <DotsHorizontalIcon className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end">
                <DropdownMenuItem
                  disabled={member.role !== "admin"}
                  className="text-xs text-red-600"
                  onSelect={async () => {
                    // removeMemberFromWorkspace(member)
                    // navigate({ to: "/" })
                  }}
                >
                  <XCircleIcon className="w-4 h-4 mr-2" />
                  Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}
