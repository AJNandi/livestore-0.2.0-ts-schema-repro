import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"

export const Route = createFileRoute("/file/$fileId")({
  parseParams: (params) => ({
    fileId: z.string().parse(params.fileId),
  }),
  component: FileComponent,
})

function FileComponent() {
  return <div>Editor placeholderF</div>
}
