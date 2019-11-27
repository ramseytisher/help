import React, { createContext, useState, useEffect } from "react"
import { Auth, API, graphqlOperation } from "aws-amplify"

import { Box } from "grommet"

import { verifyAccount as VerifyAccount } from "../graphql/mutations"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [accountInfo, setAccountInfo] = useState({})

  useEffect(() => {
    if (loggedIn) {
      Auth.currentAuthenticatedUser()
        .then(() => setLoggedIn(true))
        .then(() => verifyAccount())
        .catch(error => console.log("Error authing user: ", error))
    }
  }, [loggedIn])

  async function verifyAccount() {
    try {
      const user = Auth.user
      const userInfo = {
        id: user.username,
        email: user.attributes.email,
      }
      const accountData = await API.graphql(
        graphqlOperation(VerifyAccount, { input: userInfo })
      )
      setAccountInfo(accountData.data.verifyAccount)
    } catch (error) {
      console.log("error getting account info", error)
    }
  }

  const handleLogout = () => {
    Auth.signOut().then(() => {
      setLoggedIn(false)
      setAccountInfo({})
    })
  }

  return (
    <UserContext.Provider
      value={{ loggedIn, accountInfo, setLoggedIn, handleLogout }}
    >
      {children}
      <Box direction="row">
        <Box width="50vw">
          <pre>{JSON.stringify(Auth.user, null, 2)}</pre>
        </Box>
        <Box width="50vw">
          <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
        </Box>
      </Box>
    </UserContext.Provider>
  )
}
