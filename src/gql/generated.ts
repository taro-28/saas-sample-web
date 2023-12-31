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

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  todos: Array<Todo>;
};

export type CreateCategoryInput = {
  name: Scalars['String']['input'];
};

export type CreateTodoInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  content: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createTodo: Todo;
  deleteCategory: Scalars['ID']['output'];
  deleteTodo: Scalars['ID']['output'];
  updateCategory: Category;
  updateTodo: Todo;
  updateTodoDone: Todo;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTodoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
};


export type MutationUpdateTodoArgs = {
  input: UpdateTodoInput;
};


export type MutationUpdateTodoDoneArgs = {
  input: UpdateTodoDoneInput;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  todos: Array<Todo>;
};

export type Todo = {
  __typename?: 'Todo';
  category?: Maybe<Category>;
  content: Scalars['String']['output'];
  createdAt: Scalars['Int']['output'];
  done: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
};

export type UpdateCategoryInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateTodoDoneInput = {
  done: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
};

export type UpdateTodoInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type CategoryPageQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoryPageQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: number }> };

export type TodoPageQueryVariables = Exact<{ [key: string]: never; }>;


export type TodoPageQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: number }>, todos: Array<{ __typename?: 'Todo', id: string, content: string, done: boolean, createdAt: number, category?: { __typename?: 'Category', id: string, name: string } | null }> };

export type CategoryComboboxFragment = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: number }> };

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: string } };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: string };

export type CategoryTableFragment = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: number }> };

export type CreateTodoFormFragment = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: number }> };

export type CreateTodoMutationVariables = Exact<{
  input: CreateTodoInput;
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'Todo', id: string } };

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo: string };

export type TodoTableFragment = { __typename?: 'Query', todos: Array<{ __typename?: 'Todo', id: string, content: string, done: boolean, createdAt: number, category?: { __typename?: 'Category', id: string, name: string } | null }>, categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: number }> };

export type TodoTableTodoFragment = { __typename?: 'Todo', id: string, content: string, done: boolean, createdAt: number, category?: { __typename?: 'Category', id: string, name: string } | null };

export type MakeTodoTableColumnsFragment = { __typename?: 'Query', todos: Array<{ __typename?: 'Todo', id: string, content: string, done: boolean, createdAt: number, category?: { __typename?: 'Category', id: string, name: string } | null }>, categories: Array<{ __typename?: 'Category', id: string, name: string, createdAt: number }> };

export type UpdateDoneTodoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  done: Scalars['Boolean']['input'];
}>;


export type UpdateDoneTodoMutation = { __typename?: 'Mutation', updateTodoDone: { __typename?: 'Todo', id: string } };

export type UpdateTodoMutationVariables = Exact<{
  input: UpdateTodoInput;
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'Todo', id: string } };

export const CategoryTableFragmentDoc = gql`
    fragment CategoryTable on Query {
  categories {
    id
    name
    createdAt
  }
}
    `;
export const CategoryComboboxFragmentDoc = gql`
    fragment CategoryCombobox on Query {
  categories {
    id
    name
    createdAt
  }
}
    `;
export const CreateTodoFormFragmentDoc = gql`
    fragment CreateTodoForm on Query {
  ...CategoryCombobox
}
    ${CategoryComboboxFragmentDoc}`;
export const TodoTableTodoFragmentDoc = gql`
    fragment TodoTableTodo on Todo {
  id
  content
  done
  createdAt
  category {
    id
    name
  }
}
    `;
export const MakeTodoTableColumnsFragmentDoc = gql`
    fragment MakeTodoTableColumns on Query {
  todos {
    ...TodoTableTodo
  }
  ...CategoryCombobox
}
    ${TodoTableTodoFragmentDoc}
${CategoryComboboxFragmentDoc}`;
export const TodoTableFragmentDoc = gql`
    fragment TodoTable on Query {
  ...MakeTodoTableColumns
}
    ${MakeTodoTableColumnsFragmentDoc}`;
export const CategoryPageDocument = gql`
    query CategoryPage {
  ...CategoryTable
}
    ${CategoryTableFragmentDoc}`;
export const TodoPageDocument = gql`
    query TodoPage {
  ...CreateTodoForm
  ...TodoTable
}
    ${CreateTodoFormFragmentDoc}
${TodoTableFragmentDoc}`;
export const CreateCategoryDocument = gql`
    mutation createCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
    id
  }
}
    `;
export const DeleteCategoryDocument = gql`
    mutation deleteCategory($id: ID!) {
  deleteCategory(id: $id)
}
    `;
export const CreateTodoDocument = gql`
    mutation createTodo($input: CreateTodoInput!) {
  createTodo(input: $input) {
    id
  }
}
    `;
export const DeleteTodoDocument = gql`
    mutation deleteTodo($id: ID!) {
  deleteTodo(id: $id)
}
    `;
export const UpdateDoneTodoDocument = gql`
    mutation updateDoneTodo($id: ID!, $done: Boolean!) {
  updateTodoDone(input: {id: $id, done: $done}) {
    id
  }
}
    `;
export const UpdateTodoDocument = gql`
    mutation updateTodo($input: UpdateTodoInput!) {
  updateTodo(input: $input) {
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CategoryPage(variables?: CategoryPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CategoryPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CategoryPageQuery>(CategoryPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CategoryPage', 'query');
    },
    TodoPage(variables?: TodoPageQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<TodoPageQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TodoPageQuery>(TodoPageDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'TodoPage', 'query');
    },
    createCategory(variables: CreateCategoryMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateCategoryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateCategoryMutation>(CreateCategoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createCategory', 'mutation');
    },
    deleteCategory(variables: DeleteCategoryMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteCategoryMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteCategoryMutation>(DeleteCategoryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteCategory', 'mutation');
    },
    createTodo(variables: CreateTodoMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTodoMutation>(CreateTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createTodo', 'mutation');
    },
    deleteTodo(variables: DeleteTodoMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteTodoMutation>(DeleteTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteTodo', 'mutation');
    },
    updateDoneTodo(variables: UpdateDoneTodoMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateDoneTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateDoneTodoMutation>(UpdateDoneTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateDoneTodo', 'mutation');
    },
    updateTodo(variables: UpdateTodoMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateTodoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateTodoMutation>(UpdateTodoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateTodo', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;