import { ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloDriver } from "@nestjs/apollo/dist/drivers";
import { join } from "path";

export const apolloDriverConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(
    process.cwd(), 
    'libs', 
    'providers', 
    'src', 
    'graphql', 
    'schema.gql'
  ),
  sortSchema: true,
  context: ({ req, res }) => ({ req, res })
}