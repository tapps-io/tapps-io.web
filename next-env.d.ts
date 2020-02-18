/// <reference types="next" />
/// <reference types="next/types/global" />

import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

declare module 'next' {
  export interface NextPageContext {
    apolloState?: NormalizedCacheObject;
    apolloClient?: ApolloClient<NormalizedCacheObject> | null;
  }
}

declare module 'apollo-client' {
  export interface ApolloClient {
    toJSON: (key?: string) => any;
  }
}
