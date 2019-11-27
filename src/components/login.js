import React, { useState, useContext, useEffect } from "react"
import { Authenticator, SignIn, SignUp } from "aws-amplify-react"
import { Link } from "gatsby"

// import SignUpForm from "./signUp"

import { Box, Button, Layer } from "grommet"

import { UserContext } from "../context/user-context"

export default () => {
  const [show, setShow] = useState(false)

  const { loggedIn, setLoggedIn, handleLogout } = useContext(UserContext)

  if (loggedIn) {
    return (
      <div>
        <Link to="/account">Acccount info</Link>
        <button onClick={() => handleLogout()}>logout</button>
      </div>
    )
  }

  return (
    <Box>
      <Button label="login" onClick={() => setShow(true)} />
      {show && (
        <Layer
          position="right"
          full="vertical"
          width="50vw"
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          {/* <Authenticator 
            hide={[SignUp]}
            onStateChange={authState => authState === 'signedIn' && setLoggedIn(true)}
            >
            <SignUpForm override={'SignUp'} />
          </Authenticator> */}
          <Authenticator
            onStateChange={authState =>
              authState === "signedIn" && setLoggedIn(true)
            }
          />
        </Layer>
      )}
    </Box>
  )
}
