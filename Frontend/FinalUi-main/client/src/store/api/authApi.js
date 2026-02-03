import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = 'http://localhost:8080/api'  // YOUR BACKEND

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => {
        const { token, id, email, name, role } = response
        return { token, userId: id, email, name, role }
      },
    }),
    
    getMe: builder.query({
      query: () => '/auth/me',
      providesTags: ['Auth'],
    }),
    
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),

      // src/features/auth/authApi.js - VERIFY THIS
    forgotPassword: builder.mutation({
      query: (body) => ({  // ✅ body param
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email: body.email || body }  // ✅ Force object format
      }),
    }),


    // ✅ NEW: Reset Password
    resetPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: { 
          token, 
          newPassword  // Matches ResetPasswordReq DTO
        },
      }),
    }),
  }),
})

// ✅ UPDATED: Export ALL hooks
export const { 
  useLoginMutation, 
  useGetMeQuery, 
  useLogoutMutation,
  useForgotPasswordMutation,  // ✅ NEW
  useResetPasswordMutation    // ✅ NEW
} = authApi
