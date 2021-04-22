import {NgModule} from '@angular/core';
import {ApolloClientOptions,ApolloLink, InMemoryCache} from '@apollo/client/core';


import { HttpClientModule } from '@angular/common/http';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

import { setContext } from '@apollo/client/link/context';

const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  const auth = setContext(async(_, { headers }) => {
    let token = this.auth.getCachedAccessToken();
  
    if (!token) {
      await this.auth.acquireToken().toPromise();
      token = this.auth.getCachedAccessToken();
    }
    
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache
  }
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
