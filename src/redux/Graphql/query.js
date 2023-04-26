import { gql } from "@apollo/client";
export const files = gql`
  {
    files {
      _id
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
export const create_File = gql`
  mutation createFile(
    $name: String!
    $createdAt: String!
    $lastAccess: String
    $parent: String!
    $path: [String]
    $data: String
    $extension: String!
    $updatedAt: String!
    $url: String
  ) {
    createFile(
      fileInput: {
        name: $name
        createdAt: $createdAt
        lastAccess: $lastAccess
        parent: $parent
        path: $path
        data: $data
        extension: $extension
        updatedAt: $updatedAt
        url: $url
      }
    ) {
      _id
    }
  }
`;

export const create_Folder = gql`
  mutation createFolder(
    $name: String!
    $createdAt: String!
    $lastAccess: String
    $parent: String!
    $path: [String]
    $updatedAt: String!
  ) {
    createFolder(
      folderInput: {
        name: $name
        createdAt: $createdAt
        lastAccess: $lastAccess
        parent: $parent
        path: $path
        updatedAt: $updatedAt
      }
    ) {
      _id
    }
  }
`;
