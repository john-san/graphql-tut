/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Client = {
  __typename?: 'Client';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addClient?: Maybe<Client>;
  addProject?: Maybe<Project>;
  deleteClient?: Maybe<Client>;
  deleteProject?: Maybe<Project>;
  updateProject?: Maybe<Project>;
};


export type MutationAddClientArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};


export type MutationAddProjectArgs = {
  clientId: Scalars['ID'];
  description: Scalars['String'];
  name: Scalars['String'];
  status?: InputMaybe<ProjectStatus>;
};


export type MutationDeleteClientArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateProjectArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<ProjectStatusUpdate>;
};

export type Project = {
  __typename?: 'Project';
  client?: Maybe<Client>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export enum ProjectStatus {
  Completed = 'completed',
  New = 'new',
  Progress = 'progress'
}

export enum ProjectStatusUpdate {
  Completed = 'completed',
  New = 'new',
  Progress = 'progress'
}

export type RootQueryType = {
  __typename?: 'RootQueryType';
  client?: Maybe<Client>;
  clients?: Maybe<Array<Maybe<Client>>>;
  project?: Maybe<Project>;
  projects?: Maybe<Array<Maybe<Project>>>;
};


export type RootQueryTypeClientArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type RootQueryTypeProjectArgs = {
  id?: InputMaybe<Scalars['ID']>;
};
