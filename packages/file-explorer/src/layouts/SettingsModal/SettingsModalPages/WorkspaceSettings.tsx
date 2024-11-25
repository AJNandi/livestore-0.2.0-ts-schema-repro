import { Workspace } from "@repo/livestore"
import clsx from "clsx"
import { Button } from "../../../components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover"
import { getInitials } from "../../../lib/user"
import { SettingsHeader, SettingsInput, SettingsLabel } from "./Components"

const BGColors: string[] = ["bg-sky-500", "bg-indigo-500", "bg-rose-500", "bg-amber-500", "bg-orange-500", "bg-emerald-600", "bg-slate-600"]

export default function WorkspaceSettings({ workspace }: { workspace: Workspace }) {
  return (
    <div>
      <SettingsHeader title="Workspace settings" description="" />
      <div className="py-4 space-y-4">
        <SettingsInput
          id={"name"}
          label={"Name"}
          value={workspace.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length > 0) {
              // updateWorkspaceName(workspace, e.target.value)
            }
          }}
        />
        <div className="">
          <SettingsLabel id={"icon"} label={"Icon"} />
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className={clsx(
                    "w-16 h-16 border hover:brightness-[70%] text-white text-4xl items-center",
                    "bg-sky-500", // workspace.color,
                    `hover:bg-sky-500` //`hover:${workspace.color}`
                  )}
                >
                  {getInitials(workspace.name ?? "")}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="p-2">
                <div className="flex space-x-2 items-center justify-center">
                  {BGColors.map((color) => (
                    <Button
                      onClick={() => {
                        // updateWorkspaceColor(workspace, color)
                      }}
                      key={color}
                      className={clsx("h-7 w-7 p-0 rounded-full", color)}
                    ></Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}
