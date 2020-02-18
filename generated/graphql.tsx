/* eslint-disable */
import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any,
  /** 
 * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
 */
  DateTime: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
  /** 
 * A date string, such as 2007-12-03, compliant with the `full-date` format
   * outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for
   * representation of dates and times using the Gregorian calendar.
 */
  Date: any,
  /** The `Long` scalar type represents 52-bit integers */
  Long: any,
  /** A time string with format: HH:mm:ss.SSS */
  Time: any,
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Category = {
   __typename?: 'Category',
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  tapps?: Maybe<Array<Maybe<Tapp>>>,
  id: Scalars['ID'],
  created_at: Scalars['DateTime'],
  updated_at: Scalars['DateTime'],
};


export type CategoryTappsArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};

export type CategoryInput = {
  name: Scalars['String'],
  tapps?: Maybe<Array<Maybe<Scalars['ID']>>>,
  description?: Maybe<Scalars['String']>,
};

export type CreateCategoryInput = {
  data?: Maybe<CategoryInput>,
};

export type CreateCategoryPayload = {
   __typename?: 'createCategoryPayload',
  category?: Maybe<Category>,
};

export type CreateRoleInput = {
  data?: Maybe<RoleInput>,
};

export type CreateRolePayload = {
   __typename?: 'createRolePayload',
  role?: Maybe<UsersPermissionsRole>,
};

export type CreateSponsorInput = {
  data?: Maybe<SponsorInput>,
};

export type CreateSponsorPayload = {
   __typename?: 'createSponsorPayload',
  sponsor?: Maybe<Sponsor>,
};

export type CreateTappInput = {
  data?: Maybe<TappInput>,
};

export type CreateTappPayload = {
   __typename?: 'createTappPayload',
  tapp?: Maybe<Tapp>,
};

export type CreateUserInput = {
  data?: Maybe<UserInput>,
};

export type CreateUserPayload = {
   __typename?: 'createUserPayload',
  user?: Maybe<UsersPermissionsUser>,
};



export type DeleteCategoryInput = {
  where?: Maybe<InputId>,
};

export type DeleteCategoryPayload = {
   __typename?: 'deleteCategoryPayload',
  category?: Maybe<Category>,
};

export type DeleteRoleInput = {
  where?: Maybe<InputId>,
};

export type DeleteRolePayload = {
   __typename?: 'deleteRolePayload',
  role?: Maybe<UsersPermissionsRole>,
};

export type DeleteSponsorInput = {
  where?: Maybe<InputId>,
};

export type DeleteSponsorPayload = {
   __typename?: 'deleteSponsorPayload',
  sponsor?: Maybe<Sponsor>,
};

export type DeleteTappInput = {
  where?: Maybe<InputId>,
};

export type DeleteTappPayload = {
   __typename?: 'deleteTappPayload',
  tapp?: Maybe<Tapp>,
};

export type DeleteUserInput = {
  where?: Maybe<InputId>,
};

export type DeleteUserPayload = {
   __typename?: 'deleteUserPayload',
  user?: Maybe<UsersPermissionsUser>,
};

export type EditCategoryInput = {
  name?: Maybe<Scalars['String']>,
  tapps?: Maybe<Array<Maybe<Scalars['ID']>>>,
  description?: Maybe<Scalars['String']>,
};

export type EditFileInput = {
  name?: Maybe<Scalars['String']>,
  hash?: Maybe<Scalars['String']>,
  sha256?: Maybe<Scalars['String']>,
  ext?: Maybe<Scalars['String']>,
  mime?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Float']>,
  url?: Maybe<Scalars['String']>,
  provider?: Maybe<Scalars['String']>,
  provider_metadata?: Maybe<Scalars['JSON']>,
  related?: Maybe<Array<Maybe<Scalars['ID']>>>,
};

export type EditRoleInput = {
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>,
  users?: Maybe<Array<Maybe<Scalars['ID']>>>,
};

export type EditSponsorInput = {
  title?: Maybe<Scalars['String']>,
  link?: Maybe<Scalars['String']>,
};

export type EditTappInput = {
  tapp?: Maybe<Scalars['String']>,
  semver?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  sponsor?: Maybe<Scalars['ID']>,
  categories?: Maybe<Array<Maybe<Scalars['ID']>>>,
};

export type EditUserInput = {
  username?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  provider?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  resetPasswordToken?: Maybe<Scalars['String']>,
  confirmed?: Maybe<Scalars['Boolean']>,
  blocked?: Maybe<Scalars['Boolean']>,
  role?: Maybe<Scalars['ID']>,
};

export type FileInput = {
  name: Scalars['String'],
  hash: Scalars['String'],
  sha256?: Maybe<Scalars['String']>,
  ext?: Maybe<Scalars['String']>,
  mime: Scalars['String'],
  size: Scalars['Float'],
  url: Scalars['String'],
  provider: Scalars['String'],
  provider_metadata?: Maybe<Scalars['JSON']>,
  related?: Maybe<Array<Maybe<Scalars['ID']>>>,
};

export type InputId = {
  id: Scalars['ID'],
};



export type Morph = UsersPermissionsMe | UsersPermissionsMeRole | UsersPermissionsLoginPayload | Category | CreateCategoryPayload | UpdateCategoryPayload | DeleteCategoryPayload | Sponsor | CreateSponsorPayload | UpdateSponsorPayload | DeleteSponsorPayload | Tapp | CreateTappPayload | UpdateTappPayload | DeleteTappPayload | UploadFile | UsersPermissionsPermission | UsersPermissionsRole | CreateRolePayload | UpdateRolePayload | DeleteRolePayload | UsersPermissionsUser | CreateUserPayload | UpdateUserPayload | DeleteUserPayload;

export type Mutation = {
   __typename?: 'Mutation',
  createCategory?: Maybe<CreateCategoryPayload>,
  updateCategory?: Maybe<UpdateCategoryPayload>,
  deleteCategory?: Maybe<DeleteCategoryPayload>,
  createSponsor?: Maybe<CreateSponsorPayload>,
  updateSponsor?: Maybe<UpdateSponsorPayload>,
  deleteSponsor?: Maybe<DeleteSponsorPayload>,
  createTapp?: Maybe<CreateTappPayload>,
  updateTapp?: Maybe<UpdateTappPayload>,
  deleteTapp?: Maybe<DeleteTappPayload>,
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>,
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>,
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>,
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>,
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>,
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>,
  upload: UploadFile,
  multipleUpload: Array<Maybe<UploadFile>>,
  login: UsersPermissionsLoginPayload,
  register: UsersPermissionsLoginPayload,
};


export type MutationCreateCategoryArgs = {
  input?: Maybe<CreateCategoryInput>
};


export type MutationUpdateCategoryArgs = {
  input?: Maybe<UpdateCategoryInput>
};


export type MutationDeleteCategoryArgs = {
  input?: Maybe<DeleteCategoryInput>
};


export type MutationCreateSponsorArgs = {
  input?: Maybe<CreateSponsorInput>
};


export type MutationUpdateSponsorArgs = {
  input?: Maybe<UpdateSponsorInput>
};


export type MutationDeleteSponsorArgs = {
  input?: Maybe<DeleteSponsorInput>
};


export type MutationCreateTappArgs = {
  input?: Maybe<CreateTappInput>
};


export type MutationUpdateTappArgs = {
  input?: Maybe<UpdateTappInput>
};


export type MutationDeleteTappArgs = {
  input?: Maybe<DeleteTappInput>
};


export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>
};


export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>
};


export type MutationDeleteRoleArgs = {
  input?: Maybe<DeleteRoleInput>
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>
};


export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>
};


export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserInput>
};


export type MutationUploadArgs = {
  refId?: Maybe<Scalars['ID']>,
  ref?: Maybe<Scalars['String']>,
  field?: Maybe<Scalars['String']>,
  source?: Maybe<Scalars['String']>,
  file: Scalars['Upload']
};


export type MutationMultipleUploadArgs = {
  refId?: Maybe<Scalars['ID']>,
  ref?: Maybe<Scalars['String']>,
  field?: Maybe<Scalars['String']>,
  source?: Maybe<Scalars['String']>,
  files: Array<Maybe<Scalars['Upload']>>
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput
};


export type MutationRegisterArgs = {
  input: UserInput
};

export type Query = {
   __typename?: 'Query',
  category?: Maybe<Category>,
  categories?: Maybe<Array<Maybe<Category>>>,
  sponsor?: Maybe<Sponsor>,
  sponsors?: Maybe<Array<Maybe<Sponsor>>>,
  tapp?: Maybe<Tapp>,
  tapps?: Maybe<Array<Maybe<Tapp>>>,
  files?: Maybe<Array<Maybe<UploadFile>>>,
  role?: Maybe<UsersPermissionsRole>,
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>,
  user?: Maybe<UsersPermissionsUser>,
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>,
  me?: Maybe<UsersPermissionsMe>,
};


export type QueryCategoryArgs = {
  id: Scalars['ID']
};


export type QueryCategoriesArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type QuerySponsorArgs = {
  id: Scalars['ID']
};


export type QuerySponsorsArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type QueryTappArgs = {
  id: Scalars['ID']
};


export type QueryTappsArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type QueryFilesArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type QueryRoleArgs = {
  id: Scalars['ID']
};


export type QueryRolesArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type QueryUserArgs = {
  id: Scalars['ID']
};


export type QueryUsersArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};

export type RoleInput = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>,
  users?: Maybe<Array<Maybe<Scalars['ID']>>>,
};

export type Sponsor = {
   __typename?: 'Sponsor',
  title: Scalars['String'],
  link?: Maybe<Scalars['String']>,
  id: Scalars['ID'],
  created_at: Scalars['DateTime'],
  updated_at: Scalars['DateTime'],
};

export type SponsorInput = {
  title: Scalars['String'],
  link?: Maybe<Scalars['String']>,
};

export type Tapp = {
   __typename?: 'Tapp',
  tapp: Scalars['String'],
  semver: Scalars['String'],
  title: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  sponsor?: Maybe<Sponsor>,
  categories?: Maybe<Array<Maybe<Category>>>,
  id: Scalars['ID'],
  created_at: Scalars['DateTime'],
  updated_at: Scalars['DateTime'],
};


export type TappCategoriesArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};

export type TappInput = {
  tapp: Scalars['String'],
  semver: Scalars['String'],
  title: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  sponsor?: Maybe<Scalars['ID']>,
  categories?: Maybe<Array<Maybe<Scalars['ID']>>>,
};


export type UpdateCategoryInput = {
  where?: Maybe<InputId>,
  data?: Maybe<EditCategoryInput>,
};

export type UpdateCategoryPayload = {
   __typename?: 'updateCategoryPayload',
  category?: Maybe<Category>,
};

export type UpdateRoleInput = {
  where?: Maybe<InputId>,
  data?: Maybe<EditRoleInput>,
};

export type UpdateRolePayload = {
   __typename?: 'updateRolePayload',
  role?: Maybe<UsersPermissionsRole>,
};

export type UpdateSponsorInput = {
  where?: Maybe<InputId>,
  data?: Maybe<EditSponsorInput>,
};

export type UpdateSponsorPayload = {
   __typename?: 'updateSponsorPayload',
  sponsor?: Maybe<Sponsor>,
};

export type UpdateTappInput = {
  where?: Maybe<InputId>,
  data?: Maybe<EditTappInput>,
};

export type UpdateTappPayload = {
   __typename?: 'updateTappPayload',
  tapp?: Maybe<Tapp>,
};

export type UpdateUserInput = {
  where?: Maybe<InputId>,
  data?: Maybe<EditUserInput>,
};

export type UpdateUserPayload = {
   __typename?: 'updateUserPayload',
  user?: Maybe<UsersPermissionsUser>,
};


export type UploadFile = {
   __typename?: 'UploadFile',
  name: Scalars['String'],
  hash: Scalars['String'],
  sha256?: Maybe<Scalars['String']>,
  ext?: Maybe<Scalars['String']>,
  mime: Scalars['String'],
  size: Scalars['Float'],
  url: Scalars['String'],
  provider: Scalars['String'],
  provider_metadata?: Maybe<Scalars['JSON']>,
  related?: Maybe<Array<Maybe<Morph>>>,
  id: Scalars['ID'],
  created_at: Scalars['DateTime'],
  updated_at: Scalars['DateTime'],
};


export type UploadFileRelatedArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};

export type UserInput = {
  username: Scalars['String'],
  email: Scalars['String'],
  provider?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  resetPasswordToken?: Maybe<Scalars['String']>,
  confirmed?: Maybe<Scalars['Boolean']>,
  blocked?: Maybe<Scalars['Boolean']>,
  role?: Maybe<Scalars['ID']>,
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'],
  password: Scalars['String'],
  provider?: Maybe<Scalars['String']>,
};

export type UsersPermissionsLoginPayload = {
   __typename?: 'UsersPermissionsLoginPayload',
  jwt: Scalars['String'],
  user: UsersPermissionsMe,
};

export type UsersPermissionsMe = {
   __typename?: 'UsersPermissionsMe',
  id: Scalars['ID'],
  username: Scalars['String'],
  email: Scalars['String'],
  confirmed?: Maybe<Scalars['Boolean']>,
  blocked?: Maybe<Scalars['Boolean']>,
  role?: Maybe<UsersPermissionsMeRole>,
};

export type UsersPermissionsMeRole = {
   __typename?: 'UsersPermissionsMeRole',
  id: Scalars['ID'],
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
};

export type UsersPermissionsPermission = {
   __typename?: 'UsersPermissionsPermission',
  type: Scalars['String'],
  controller: Scalars['String'],
  action: Scalars['String'],
  enabled: Scalars['Boolean'],
  policy?: Maybe<Scalars['String']>,
  role?: Maybe<UsersPermissionsRole>,
  id: Scalars['ID'],
};

export type UsersPermissionsRole = {
   __typename?: 'UsersPermissionsRole',
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>,
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>,
  id: Scalars['ID'],
};


export type UsersPermissionsRolePermissionsArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type UsersPermissionsRoleUsersArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};

export type UsersPermissionsUser = {
   __typename?: 'UsersPermissionsUser',
  username: Scalars['String'],
  email: Scalars['String'],
  provider?: Maybe<Scalars['String']>,
  confirmed?: Maybe<Scalars['Boolean']>,
  blocked?: Maybe<Scalars['Boolean']>,
  role?: Maybe<UsersPermissionsRole>,
  id: Scalars['ID'],
  created_at: Scalars['DateTime'],
  updated_at: Scalars['DateTime'],
};

export type GetTappsQueryVariables = {
  tapp?: Maybe<Scalars['String']>
};


export type GetTappsQuery = (
  { __typename?: 'Query' }
  & { tapps: Maybe<Array<Maybe<(
    { __typename?: 'Tapp' }
    & Pick<Tapp, 'tapp' | 'semver' | 'title' | 'description'>
    & { sponsor: Maybe<(
      { __typename?: 'Sponsor' }
      & Pick<Sponsor, 'title' | 'link'>
    )>, categories: Maybe<Array<Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'name' | 'description'>
    )>>> }
  )>>> }
);


export const GetTappsDocument = gql`
query getTapps($tapp: String) {
  tapps(limit: 1, where: {tapp: $tapp}) {
    tapp
    semver
    title
    description
    sponsor {
      title
      link
    }
    categories {
      name
      description
    }
  }
}
    `;
export type GetTappsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetTappsQuery, GetTappsQueryVariables>, 'query'>;

    export const GetTappsComponent = (props: GetTappsComponentProps) => (
      <ApolloReactComponents.Query<GetTappsQuery, GetTappsQueryVariables> query={GetTappsDocument} {...props} />
    );
    
export type GetTappsQueryResult = ApolloReactCommon.QueryResult<GetTappsQuery, GetTappsQueryVariables>;