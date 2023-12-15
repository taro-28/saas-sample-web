import type { GraphQLClient, RequestOptions } from "graphql-request";
type GraphQLClientRequestHeaders = RequestOptions["requestHeaders"];
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateTodoInput = {
  content: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  deleteTodo: Scalars['ID']['output'];
  updateTodo: Todo;
};


export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};


export type MutationDeleteTodoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateTodoArgs = {
  input: UpdateTodoInput;
};

export type Query = {
  __typename?: 'Query';
  todos: Array<Todo>;
};

export type Todo = {
  __typename?: 'Todo';
  content: Scalars['String']['output'];
  createdAt: Scalars['Int']['output'];
  done: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
};

export type UpdateTodoInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  done?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
};

export type TodoPageQueryVariables = Exact<{ [key: string]: never; }>;


export type TodoPageQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'Todo', id: string, content: string, done: boolean, createdAt: number }> };

export type CreateTodoMutationVariables = Exact<{
  content: Scalars['String']['input'];
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'Todo', id: string } };

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo: string };

export type ToggleDoneTodoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  done: Scalars['Boolean']['input'];
}>;


export type ToggleDoneTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'Todo', id: string } };


export const TodoPageDocument = gql`
    query TodoPage {
  todos {
    id
    content
    done
    createdAt
  }
}
    `;
export const CreateTodoDocument = gql`
    mutation createTodo($content: String!) {
  createTodo(input: {content: $content}) {
    id
  }
}
    `;
export const DeleteTodoDocument = gql`
    mutation deleteTodo($id: ID!) {
  deleteTodo(id: $id)
}
    `;
export const ToggleDoneTodoDocument = gql`
    mutation toggleDoneTodo($id: ID!, $done: Boolean!) {
  updateTodo(input: {id: $id, done: $done}) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    TodoPage(variables?: TodoPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TodoPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TodoPageQuery>(TodoPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TodoPage', 'query');
    },
    createTodo(variables: CreateTodoMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTodoMutation>(CreateTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createTodo', 'mutation');
    },
    deleteTodo(variables: DeleteTodoMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteTodoMutation>(DeleteTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteTodo', 'mutation');
    },
    toggleDoneTodo(variables: ToggleDoneTodoMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ToggleDoneTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ToggleDoneTodoMutation>(ToggleDoneTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'toggleDoneTodo', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;