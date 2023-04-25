import { gql } from "apollo-server-express";
const typeDefs = gql`
  type File {
    _id: ID!
    name: String!

    createdAt: String!
    data: String
    extension: String!
    lastAccess: String

    parent: String!
    path: [String]
    updatedAt: String!
    url: String
  }
  type Folder {
    _id: ID!
    name: String!

    createdAt: String!

    lastAccess: String

    parent: String!
    path: [String]
    updatedAt: String!
  }
  input FolderInput {
    name: String!

    createdAt: String!

    lastAccess: String

    parent: String!
    path: [String]
    updatedAt: String!
  }

  input FileInput {
    name: String!

    createdAt: String!
    data: String
    extension: String!
    lastAccess: String

    parent: String!
    path: [String]
    updatedAt: String!
    url: String
  }
  type Query {
    hello: String
    files: [File!]!
    folders: [Folder!]!
  }
  input updateFile {
    data: String
  }
  type Mutation {
    createFile(fileInput: FileInput): File
    createFolder(folderInput: FolderInput): Folder
    delFile(id: ID): String
    delFolder(id: ID): String
    updateFile(id: ID, data: updateFile): File
  }
`;
export default typeDefs;
