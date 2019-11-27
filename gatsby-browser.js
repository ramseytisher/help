import React from "react"
import { UserProvider } from "./src/context/user-context"

import Amplify from 'aws-amplify'
import awsconfig from './src/aws-exports'
Amplify.configure(awsconfig)

export const wrapRootElement = ({ element }) => (
    <UserProvider>
        {element}
    </UserProvider>
)