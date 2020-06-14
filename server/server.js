import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import faker from "faker";
import times from "lodash.times";
import random from "lodash.random";
import typeDefs from "./graphQL/schema";
import resolvers from "./graphQL/resolvers";
import db from "./models";
import { join } from "path";

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: { db }
});

const app = express();
server.applyMiddleware({ app });

app.use(express.static(join(__dirname, "public")));

db.sequelize.sync().then(() => {
  // populate author table with dummy data
  db.Author.bulkCreate(
    times(10, () => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    }))
  );
  // populate post table with dummy data
  db.Post.bulkCreate(
    times(10, () => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: random(1, 10)
    }))
  );

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
});
