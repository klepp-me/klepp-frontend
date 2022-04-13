import { HubPayload } from "@aws-amplify/core"
import { Auth, Hub } from "aws-amplify"

import { useEffect, useState } from "react"
import { CognitoUser } from "amazon-cognito-identity-js"

export default function useAuth() {
  const [user, setUser] = useState<CognitoUser | null | undefined>()
  const [accessToken, setAccessToken] = useState<string>()
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
    Auth.signOut()
    setUserName("")
    setUser(null)
    setAccessToken("")
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        if (user) {
          setUser(user)
          setUserName(user.username)
        }
      })
      .catch(console.error)

    Auth.currentSession().then(session => {
      const token = session.getAccessToken().getJwtToken()
      setAccessToken(token)
    })

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
    Auth,
    user,
    accessToken,
    signOut,
    userName,
  }
}
