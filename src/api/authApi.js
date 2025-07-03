import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const authApi=createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5000/api/user/auth',
        credentials:'include'
    }),
    endpoints:(builder)=>
    ({
         signup:builder.mutation({
            query:(user)=>({
            url:'/signup',
            method:'POST',
            body:user,
            }),
         }),
         signin:builder.mutation({
            query:(credentials)=>({
                url:'/signin',
                method:'POST',
                body:credentials
            }),
         }),
    }),
})

export const {useSignupMutation,useSigninMutation}=authApi;