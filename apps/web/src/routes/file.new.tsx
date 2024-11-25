import { DefaultLoadingComponent } from "@repo/file-explorer"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/file/new")({
  component: FileNew,
  beforeLoad: async () => {},
})

function FileNew() {
  // const { user: authUser, isLoading } = instantdb.useAuth()
  // const { isLoading: isUserDataLoading, user } = getUser(authUser?.id)
  // const { activeWorkspaceId } = useActiveWorkspace()
  // const navigate = useNavigate()

  // useAuthRedirect()

  // useEffect(() => {
  //   if (!isLoading && !isUserDataLoading && user && authUser && activeWorkspaceId) {
  //     const fileId = createFile(user, { id: activeWorkspaceId } as IWorkspace)
  //     const createWorkspace = async () => {
  //       await EditorView.createWithEmptySheet(fileId, user.id, user.displayName, user.email)
  //       navigate({ to: `/file/${fileId}` })
  //     }

  //     createWorkspace()
  //   }
  // }, [isLoading, isUserDataLoading])

  // if (isLoading || isUserDataLoading) return <DefaultLoadingComponent show wait="delay-0" />

  return <DefaultLoadingComponent show wait="delay-0" />
}
