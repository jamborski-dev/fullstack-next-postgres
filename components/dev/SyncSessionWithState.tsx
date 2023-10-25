import { useSession } from "next-auth/react"
import { useAppDispatch } from "../../redux/hooks/app"
import { signIn, signOut } from "../../redux/slices/auth"

export const SyncSessionWithState = ({ children }) => {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()

  // Synchronize NextAuth session with Redux state
  if (session) {
    dispatch(signIn(session.user))
  } else {
    dispatch(signOut())
  }

  return <>{children}</>
}
