import React, { useContext, useState } from 'react'

import { Box } from 'grommet'
import { UserContext } from '../context/user-context'

export default () => {

    const { accountInfo } = useContext(UserContext)
    return (
        <Box>
            <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
        </Box>
    )
}