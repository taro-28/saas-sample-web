/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query CategoryPage {\n    categories {\n      id\n      name\n      createdAt\n    }\n  }\n": types.CategoryPageDocument,
    "\n  query TodoPage {\n    ...CreateTodoForm\n    ...TodoTable\n  }\n": types.TodoPageDocument,
    "\n  fragment CategoryCombobox on Query {\n    categories {\n      id\n      name\n      createdAt\n    }\n  }\n": types.CategoryComboboxFragmentDoc,
    "\nmutation createCategory($input: CreateCategoryInput!) {\n  createCategory(input: $input) {\n      id\n    }\n}\n": types.CreateCategoryDocument,
    "\nmutation deleteCategory($id: ID!) {\n  deleteCategory(id: $id)\n}\n": types.DeleteCategoryDocument,
    "\n  fragment CategoryTable on Query {\n    categories {\n      id\n      name\n      createdAt\n    }\n  }\n": types.CategoryTableFragmentDoc,
    "\n  fragment CreateTodoForm on Query {\n    ...CategoryCombobox\n  }\n": types.CreateTodoFormFragmentDoc,
    "\nmutation createTodo($input: CreateTodoInput!) {\n  createTodo(input: $input) {\n    id\n    content\n  }\n}\n": types.CreateTodoDocument,
    "\nmutation deleteTodo($id: ID!) {\n  deleteTodo(id: $id)\n}\n": types.DeleteTodoDocument,
    "\n  fragment TodoTable on Query {\n    todos {\n      ...TodoTableTodo\n    }\n    ...MakeTodoTableColumns\n  }\n": types.TodoTableFragmentDoc,
    "\n  fragment TodoTableTodo on Todo {\n    id\n    content\n    done\n    createdAt\n    category {\n      id\n      name\n    }\n  }\n": types.TodoTableTodoFragmentDoc,
    "\n  fragment MakeTodoTableColumns on Query {\n    todos {\n      ...TodoTableTodo\n    }\n    ...CategoryCombobox\n  }\n": types.MakeTodoTableColumnsFragmentDoc,
    "\nmutation updateDoneTodo($id: ID!, $done: Boolean!) {\n  updateTodoDone(input: { id: $id, done: $done }){\n    id\n  }\n}\n": types.UpdateDoneTodoDocument,
    "\nmutation updateTodo($input: UpdateTodoInput!) {\n  updateTodo(input: $input){\n    id\n  }\n}\n": types.UpdateTodoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CategoryPage {\n    categories {\n      id\n      name\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query CategoryPage {\n    categories {\n      id\n      name\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TodoPage {\n    ...CreateTodoForm\n    ...TodoTable\n  }\n"): (typeof documents)["\n  query TodoPage {\n    ...CreateTodoForm\n    ...TodoTable\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CategoryCombobox on Query {\n    categories {\n      id\n      name\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  fragment CategoryCombobox on Query {\n    categories {\n      id\n      name\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation createCategory($input: CreateCategoryInput!) {\n  createCategory(input: $input) {\n      id\n    }\n}\n"): (typeof documents)["\nmutation createCategory($input: CreateCategoryInput!) {\n  createCategory(input: $input) {\n      id\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation deleteCategory($id: ID!) {\n  deleteCategory(id: $id)\n}\n"): (typeof documents)["\nmutation deleteCategory($id: ID!) {\n  deleteCategory(id: $id)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CategoryTable on Query {\n    categories {\n      id\n      name\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  fragment CategoryTable on Query {\n    categories {\n      id\n      name\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CreateTodoForm on Query {\n    ...CategoryCombobox\n  }\n"): (typeof documents)["\n  fragment CreateTodoForm on Query {\n    ...CategoryCombobox\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation createTodo($input: CreateTodoInput!) {\n  createTodo(input: $input) {\n    id\n    content\n  }\n}\n"): (typeof documents)["\nmutation createTodo($input: CreateTodoInput!) {\n  createTodo(input: $input) {\n    id\n    content\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation deleteTodo($id: ID!) {\n  deleteTodo(id: $id)\n}\n"): (typeof documents)["\nmutation deleteTodo($id: ID!) {\n  deleteTodo(id: $id)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TodoTable on Query {\n    todos {\n      ...TodoTableTodo\n    }\n    ...MakeTodoTableColumns\n  }\n"): (typeof documents)["\n  fragment TodoTable on Query {\n    todos {\n      ...TodoTableTodo\n    }\n    ...MakeTodoTableColumns\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TodoTableTodo on Todo {\n    id\n    content\n    done\n    createdAt\n    category {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment TodoTableTodo on Todo {\n    id\n    content\n    done\n    createdAt\n    category {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MakeTodoTableColumns on Query {\n    todos {\n      ...TodoTableTodo\n    }\n    ...CategoryCombobox\n  }\n"): (typeof documents)["\n  fragment MakeTodoTableColumns on Query {\n    todos {\n      ...TodoTableTodo\n    }\n    ...CategoryCombobox\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation updateDoneTodo($id: ID!, $done: Boolean!) {\n  updateTodoDone(input: { id: $id, done: $done }){\n    id\n  }\n}\n"): (typeof documents)["\nmutation updateDoneTodo($id: ID!, $done: Boolean!) {\n  updateTodoDone(input: { id: $id, done: $done }){\n    id\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nmutation updateTodo($input: UpdateTodoInput!) {\n  updateTodo(input: $input){\n    id\n  }\n}\n"): (typeof documents)["\nmutation updateTodo($input: UpdateTodoInput!) {\n  updateTodo(input: $input){\n    id\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;