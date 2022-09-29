const { User } = require('../models');

// If a user tries to log in with the wrong username or password, it'll return an authentication error
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
      me: async () => {
        return User
      }  
    },

    Mutation: {
       addUser: async (parent, args) => {
        const user = await User.create(args);

        return user;
       },
       
       login: async (parent, { email, password }) => {
         const user = await User.findOne({ email });

         if(!user) {
            throw new AuthenticationError('Incorrect credentials')
         }

         const correctPW = await user.isCorrectPassword(password);

         if(!correctPW) {
            throw new AuthenticationError('Incorrect credentials')
         }

         return user;
       }
    }
};

module.exports = resolvers;