import { signOut as amplifySignOut, getCurrentUser } from "aws-amplify/auth"
import { Hub } from "aws-amplify/utils"

import { useEffect, useState } from "react"

export default function useAuth() {
  const [user, setUser] = useState<{ username?: string } | null | undefined>()
  const [userName, setUserName] = useState<string>()

  const signOut = () => {
    amplifySignOut()
    setUserName("")
    setUser(null)
  }

  useEffect(() => {
    getCurrentUser()
      .then(currentUser => {
        if (currentUser) {
          setUser(currentUser)
          setUserName(currentUser.username)
        }
      })
      .catch(console.error)

    const unsubscribe = Hub.listen("auth", data => {
      switch (data.payload.event) {
        case "signedIn":
          setUser(data.payload.data as { username?: string })
          break
        case "signedOut":
          setUser(null)
          break
      }
    })

    return unsubscribe
  }, [])

  return {
    user,
    signOut,
    userName,
  }
}
