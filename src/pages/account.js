import React, { useState, useContext } from "react"
import { UserContext } from "../context/user-context"
import { API, graphqlOperation } from "aws-amplify"

import Layout from "../components/layout"

import { Box, Form, FormField, Button, CheckBox } from "grommet"

import { updateAccount as UpdateAccount } from "../graphql/mutations"

export default () => {
  const { loggedIn, accountInfo } = useContext(UserContext)

  const [first, setFirst] = useState(accountInfo.first)
  const [last, setLast] = useState(accountInfo.last)
  const [emailAllow, setEmailAllow] = useState(accountInfo.emailAllow)

  const handleSubmit = event => {
    if (event) {
      event.preventDefault()
      if (loggedIn) {
        updateAccount(event)
      }
    }
  }

  async function updateAccount(updates) {
    try {
      const updatedInfo = {
        id: accountInfo.id,
        first: updates.value.id,
        last: updates.value.id,
        emailAllow: updates.value.emailAllow,
      }
      console.log('Updating info to this: ', updatedInfo)
      const updatedAccountData = await API.graphql(
        graphqlOperation(UpdateAccount, { input: updatedInfo })
      )
    } catch (error) {
      console.log("Error updating acccount info", error)
    }
  }

  return (
    <Layout>
      {loggedIn ? (
        <Box>
          <Form
            onChange={value => console.log(value)}
            onSubmit={handleSubmit}
          >
            <FormField
              name="first"
              label="First Name"
              value={first}
              validate={{ regexp: /^[a-z]/i }}
            />
            <FormField
              name="last"
              label="Last Name"
              value={last}
              validate={{ regexp: /^[a-z]/i }}
            />
            <FormField
              name="email"
              type="email"
              label="Email"
              value={accountInfo.email}
            />
            <FormField
              disable
              name="emailAllow"
              label="Allow Email?"
              value={emailAllow}
              component={CheckBox}
            />
            <Button type="submit" primary label="Save" />
          </Form>
          <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
        </Box>
      ) : (
        <div>login</div>
      )}
    </Layout>
  )
}
