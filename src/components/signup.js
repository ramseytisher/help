import React, { Component, useState, useEffect } from "react"
import { Auth } from "aws-amplify"

export default ({ authState, onStateChange }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmationCode, setConfirmationCode] = useState("")
  const [email, setEmail] = useState("")
  const [phone_number, setPhone_number] = useState("")
  const [signedUp, setSignedUp] = useState(false)

  const handleSubmit = event => {
    if (event) {
      event.preventDefault()
      if (!signedUp) {
        Auth.signUp({
          username: username,
          password: password,
          attributes: {
            email: email,
          },
        })
          .then(() => setSignedUp(true))
          .catch(error => console.log(error))
      } else {
        Auth.confirmSignUp(username, confirmationCode)
          .then(() => console.log("confirmed sign up"))
          .catch(error => console.log(error))
      }
    }
  }

  if (authState === "signUp") {
    return (
      <form onSubmit={handleSubmit}>
        <label>UserName</label>
        <input
          type="text"
          name="username"
          onChange={e => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="text"
          name="password"
          onChange={e => setPassword(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          onChange={e => setEmail(e.target.value)}
        />
        <label>Phone Number</label>
        <input
          type="text"
          name="phone_number"
          onChange={e => setPhone_number(e.target.value)}
        />
        <button>Sign Up</button>
        <button onClick={() => onStateChange('signIn', {})}>Back to Sign In</button>
      </form>
    )
  } else { return <div></div> }
}
