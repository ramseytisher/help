/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var storageHelpAccountName = process.env.STORAGE_HELPACCOUNT_NAME
var storageHelpAccountArn = process.env.STORAGE_HELPACCOUNT_ARN

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk')
const uuid = require('uuid')
const region = process.env.REGION
const storageHelpAccountName = process.env.STORAGE_HELPACCOUNT_NAME

const docClient = new AWS.DynamoDB.DocumentClient({region})

const listAccounts = async event => {
  const { limit: Limit = 20 } = event.arguments

  const params = {
    TableName: storageHelpAccountName,
    Limit
  }

  const {
    Items: items
  } = await docClient.scan(params).promise()

  return {
    items
  }
}

const getAccount = async event => {
  const params = {
    TableName: storageHelpAccountName,
    Key: {
      id: event.arguments.id
    }
  }

  const { Item: account } = await docClient.get(params).promise()

  return account
}

const createAccount = async event => {
  const item = { ...event.arguments.input, id: uuid() }

  const params = {
    TableName: storageHelpAccountName,
    Item: item
  }

  await docClient.put(params).promise()

  return item
}

const updateAccount = async event => {
  const params = {
    TableName: storageHelpAccountName,
    Key: {
      id: event.arguments.id
    },
    UpdateExpression: "set first = :first, last = :last, email = :email",
    ExpressionAttributeValues: {
      ":first": event.arguments.input.first,
      ":last": event.arguments.input.last,
      ":email": event.arguments.input.email
    }
  }

  const { Attributes: updatedAccount } = await docClient.update(params).promise()

  return updateAccount
}

exports.handler = async function (event, context) { //eslint-disable-line
  try {
    switch(event.fieldName) {
      case "listAccounts": {
        const response = await listAccounts(event)
        context.done(null, response); // SUCCESS with message
        break
      }
      case "getAccount": {
        const response = await getAccount(event)
        context.done(null, response)
        break
      }
      case "createAccount": {
        const response = await createAccount(event)
        context.done(null, response)
        break
      }
      case "updateAccount": {
        const response = await updateAccount(event)
        context.done(null, response)
        break
      }
      default: {
        throw new Error(`Operation ${event.fieldName} not implemented!`)
      }
    }
  } catch (error) {
    context.done(error); // SUCCESS with message
  }
  
};
