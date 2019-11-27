import React, { createContext, useState, useEffect } from "react"
import { Auth, API, graphqlOperation } from 'aws-amplify'

import { 
    getAccount as GetAccount, 
} from '../graphql/queries'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [accountInfo, setAccountInfo] = useState({})
    const [helloMessage, setHelloMessage] = useState('')

    useEffect(() => {
        console.log('Effecting login')
        Auth.currentAuthenticatedUser()
            .then(() => setLoggedIn(true))
            .catch(error => console.log('Error authing user: ', error))
    }, [loggedIn])

    async function getAccount() {
        try {
            const userId = Auth.user.username
            console.log('userId is: ', userId)
            const accountData = await API.graphql(graphqlOperation(GetAccount, { id: userId }))
            // console.log('Verify is: ', verify)
            console.log('Account data is: ', accountData)
            setAccountInfo(accountData.data.getAccount)
        } catch (error) {
            console.log('error getting account info', error)
        }
    }

    const handleLogout = () => {
        Auth.signOut()
        .then(() => setLoggedIn(false))
    }

    return (
        <UserContext.Provider value={{ loggedIn, accountInfo, setLoggedIn, handleLogout }}>
            {children}
            <pre>{JSON.stringify(Auth.user, null, 2)}</pre>
        </UserContext.Provider>
    )
}