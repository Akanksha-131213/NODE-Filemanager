import { gql } from "@apollo/client";
export const files = gql`
  {
    files {
      name
      createdAt
      data
      extension
      lastAccess
      parent
      path
      updatedAt
      url
    }
  }
`;
export const folders = gql`
  {
    folders {
      _id
      name
      createdAt
      lastAccess
      parent
      path
      updatedAt
    }
  }
`;
