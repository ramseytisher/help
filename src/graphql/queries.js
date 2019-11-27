/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listAccounts = `query ListAccounts($limit: Int) {
  listAccounts(limit: $limit) {
    items {
      id
      first
      last
      email
      has
    }
  }
}
`;
export const getAccount = `query GetAccount($id: String!) {
  getAccount(id: $id) {
    id
    first
    last
    email
    has
  }
}
`;
