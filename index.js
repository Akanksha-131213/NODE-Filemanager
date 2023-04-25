import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import bodyParser from "body-parser";
import cors from "cors";
import File from "./file-schema.js";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import Folder from "./folder-schema.js";
import { ApolloServer, gql } from "apollo-server-express";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
// const port = 8080;

// app.use(bodyParser.json());

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });
  app.use((req, res) => {
    res.send("HELLO FROM EXPRESS APP");
  });
  dotenv.config();
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  Connection(username, password);

  app.listen(8080, () => console.log("Server is running on port 8080"));
}
startServer();

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: buildSchema(`
//         type File {
//           _id: ID!
//           name: String!,

//           createdAt: String!,
//           data: String,
//           extension: String!,
//           lastAccess: String,

//           parent: String!,
//           path: [String],
//           updatedAt: String!,
//           url: String,
//         }
//         input FileInput {
//           name: String!,

//           createdAt: String!,
//           data: String,
//           extension: String!,
//           lastAccess: String,

//           parent: String!,
//           path: [String],
//           updatedAt: String!,
//           url: String,
//         }
//         type Folder {
//           _id: ID!
//           name: String!,

//           createdAt: String!,

//           lastAccess: String,

//           parent: String!,
//           path: [String],
//           updatedAt: String!,

//         }
//         input FolderInput {
//           name: String!,

//           createdAt: String!,

//           lastAccess: String,

//           parent: String!,
//           path: [String],
//           updatedAt: String!,
//         }
//         type RootQuery {
//             files: [File!]!
//             folders: [Folder!]!
//         }
//         type RootMutation {
//             createFile(fileInput: FileInput): File
//             createFolder(folderInput: FolderInput): Folder
//         }
//         schema {
//             query: RootQuery
//             mutation: RootMutation
//         }
//     `),
//     rootValue: {
//       files: () => {
//         return File.find()
//           .then((files) => {
//             return files.map((file) => {
//               return { ...file._doc, _id: file.id };
//             });
//           })
//           .catch((err) => {
//             throw err;
//           });
//       },
//       folders: () => {
//         return Folder.find()
//           .then((folders) => {
//             return folders.map((folder) => {
//               return { ...folder._doc, _id: folder.id };
//             });
//           })
//           .catch((err) => {
//             throw err;
//           });
//       },
//       createFile: (args) => {
//         const file = new File({
//           name: args.fileInput.name,
//           createdAt: new Date(args.fileInput.createdAt),
//           data: args.fileInput.data,
//           extension: args.fileInput.extension,
//           lastAccess: new Date(args.fileInput.lastAccess),
//           parent: args.fileInput.parent,
//           path: args.fileInput.path,
//           updatedAt: new Date(args.fileInput.updatedAt),
//           url: args.fileInput.url,
//         });
//         return file
//           .save()
//           .then((result) => {
//             console.log(result);
//             return { ...result._doc, _id: result._doc._id.toString() };
//           })
//           .catch((err) => {
//             console.log(err + "cos");
//             throw err;
//           });
//       },
//       createFolder: (args) => {
//         const folder = new Folder({
//           name: args.folderInput.name,
//           createdAt: new Date(args.folderInput.createdAt),
//           data: args.folderInput.data,
//           extension: args.folderInput.extension,
//           lastAccess: new Date(args.folderInput.lastAccess),
//           parent: args.folderInput.parent,
//           path: args.folderInput.path,
//           updatedAt: new Date(args.folderInput.updatedAt),
//           url: args.folderInput.url,
//         });
//         return folder
//           .save()
//           .then((result) => {
//             console.log(result);
//             return { ...result._doc, _id: result._doc._id.toString() };
//           })
//           .catch((err) => {
//             console.log(err + "cos");
//             throw err;
//           });
//       },
//     },
//     graphiql: true,
//   })
// );

// app.use(cors());

// dotenv.config();
// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;
// Connection(username, password);

// app.use("/", fileRoutes);

// app.get("/", (req, res) => res.send("hello Express is running."));
// app.get("*", (req, res) => res.send("Route not defined or exist."));
// app.listen(port, () => console.log(`Sever Port Is http://localhost:${port}`));
