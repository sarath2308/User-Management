import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi=createApi({
  reducerPath:'userApi',
  baseQuery:fetchBaseQuery({
    baseUrl:'http://localhost:5000/api/user',
    credentials:'include'
  }),
  endpoints:(builder)=>({
    getuser:builder.query({
      query:()=>({
        url:'/userData',
        method:'GET',
      })
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: '/upload-profile',
        method: 'POST',
        body: formData,
      }),
    }),
    logout:builder.mutation({
      query:()=>({
        url:'/logout',
        method:'POST',
      })
    })
  })
})

export const {useGetuserQuery,useUploadImageMutation,useLogoutMutation}=userApi;