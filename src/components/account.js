import React, { useContext, useState } from 'react'

import { Box } from 'grommet'
import { UserContext } from '../context/user-context'

export default () => {

    return (
        <Box>
            <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
        </Box>
    )
}