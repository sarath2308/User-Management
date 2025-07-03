
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminDataApi = createApi({
  reducerPath: 'adminDataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/admin',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () =>({
       url:'/users',
      method:'GET'
      }) 
    }),
    addUser: builder.mutation({
      query: (body) => ({
        url: '/add',
        method: 'POST',
        body:body
      }),
    }),
    editUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/edit/${id}`,
        method: 'PUT',
        body:body
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = adminDataApi;
