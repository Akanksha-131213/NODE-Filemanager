import File from "./file-schema.js";
import Folder from "./folder-schema.js";

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },

    files: () => {
      return File.find()
        .then((files) => {
          return files.map((file) => {
            return { ...file._doc, _id: file.id };
          });
        })
        .catch((err) => {
          throw err;
        });
    },
    folders: () => {
      return Folder.find()
        .then((folders) => {
          return folders.map((folder) => {
            return { ...folder._doc, _id: folder.id };
          });
        })
        .catch((err) => {
          throw err;
        });
    },
  },
  Mutation: {
    createFile: (args) => {
      const file = new File({
        name: args.fileInput.name,
        createdAt: new Date(args.fileInput.createdAt),
        data: args.fileInput.data,
        extension: args.fileInput.extension,
        lastAccess: new Date(args.fileInput.lastAccess),
        parent: args.fileInput.parent,
        path: args.fileInput.path,
        updatedAt: new Date(args.fileInput.updatedAt),
        url: args.fileInput.url,
      });
      return file
        .save()
        .then((result) => {
          console.log(result);
          return { ...result._doc, _id: result._doc._id.toString() };
        })
        .catch((err) => {
          console.log(err + "cos");
          throw err;
        });
    },
    createFolder: (args) => {
      const folder = new Folder({
        name: args.folderInput.name,
        createdAt: new Date(args.folderInput.createdAt),
        data: args.folderInput.data,
        extension: args.folderInput.extension,
        lastAccess: new Date(args.folderInput.lastAccess),
        parent: args.folderInput.parent,
        path: args.folderInput.path,
        updatedAt: new Date(args.folderInput.updatedAt),
        url: args.folderInput.url,
      });
      return folder
        .save()
        .then((result) => {
          console.log(result);
          return { ...result._doc, _id: result._doc._id.toString() };
        })
        .catch((err) => {
          console.log(err + "cos");
          throw err;
        });
    },
    delFile: async (parent, args, context, info) => {
      const { id } = args;
      await File.findByIdAndDelete(id);
      return "File is Successfully Deleted";
    },
    delFolder: async (parent, args, context, info) => {
      const { id } = args;
      await Folder.findByIdAndDelete(id);
      return "Folder is Successfully Deleted";
    },
    updateFile: async (parent, args, context, info) => {
      const { id } = args;
      const obj = await File.findByIdAndUpdate(id, args.data, { new: true });
      return obj;
    },
  },
};
export default resolvers;
