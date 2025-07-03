import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminAuthApi=createApi({
    reducerPath:'adminAuth',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:5000/api/admin',
        credentials:'include'
    }),
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(credentials)=>({
                url:'/auth',
                method:'POST',
                body:credentials
            })
        })
    })
})
export const {useLoginMutation}=adminAuthApi;