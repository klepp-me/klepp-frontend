import { HubPayload } from "@aws-amplify/core"
import { signOut as amplifySignOut, getCurrentUser } from "aws-amplify/auth"
import { Hub } from "aws-amplify/utils"

import { useEffect, useState } from "react"

export default function useAuth() {
  const [user, setUser] = useState<{ username?: string } | null | undefined>()
  const [userName, setUserName] = useState<string>()

  const handleAuth = (payload: HubPayload) => {
    switch (payload.event) {
      case "signIn":
        return setUser(payload.data)
      case "signOut":
        return setUser
    }
  }

  const signOut = () => {
    amplifySignOut()
    setUserName("")
    setUser(null)
  }

  useEffect(() => {
    getCurrentUser()
      .then(user => {
        if (user) {
          setUser(user)
          setUserName(user.username)
        }
      })
      .catch(console.error)

    Hub.listen("auth", data => {
      handleAuth(data.payload)
    })

    return () =>
      Hub.remove("auth", data => {
        const { payload } = data
        handleAuth(payload)
      })
  }, [])

  return {
    user,
    signOut,
    userName,
  }
}
