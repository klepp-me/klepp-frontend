import { Authenticator, View, Image, Grid, Flex } from "@aws-amplify/ui-react"
import { Typography } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../contexts/AuthContextProvider"

function Login() {
  const navigate = useNavigate()

  const { user } = useAuth()

  function navigateToMain() {
    navigate("/", { replace: true })
  }

  useEffect(() => {
    if (user) {
      navigateToMain()
    }
  })

  return (
    <Grid>
      <Flex justifyContent='center'>
        <Authenticator
          className='auth'
          signUpAttributes={["email"]}
          components={authComponents}>
          {() => <></>}
        </Authenticator>
      </Flex>
    </Grid>
  )
}

const authComponents = {
  Header() {
    return (
      <View textAlign='center' padding='20'>
        <Image
          alt='Amplify logo'
          src='assets/klepp_logo_boge_small.png'
          width={200}
          height={200}
          margin={20}
        />
      </View>
    )
  },
  Footer() {
    return (
      <View textAlign='center'>
        <Typography variant='subtitle1' color='white' sx={{ mt: 2 }}>
          © Laget med kjærlighet av de tre vise menn
        </Typography>
      </View>
    )
  },
}

export default Login
