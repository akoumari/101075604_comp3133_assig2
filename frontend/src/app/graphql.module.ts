import {NgModule} from '@angular/core';
import {ApolloClientOptions,ApolloLink, InMemoryCache} from '@apollo/client/core';


import { HttpClientModule } from '@angular/common/http';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { setContext } from '@apollo/client/link/context';

const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const token = localStorage.getItem("token");
  const auth = setContext((operation, context) => {
    if (token)
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
  });

  const link = ApolloLink.from([auth, httpLink.create({ uri })]);

  return {
    link: link,
    cache: new InMemoryCache()
  };
}

@NgModule({
  exports: [
    HttpClientModule,
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink]
  }]
})
export class GraphQLModule {}
