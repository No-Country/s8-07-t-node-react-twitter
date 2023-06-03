import { API_URL } from "../../../utils/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/users/`, }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "all",
        method: 'GET',
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        }
      }),
      providesTags: ["Users"],
    }),
    getMyProfile: builder.query({
      query: (token) => ({
        url: "me",
        method: 'GET',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getUserById: builder.query({
      query: (userId) => `profile/${userId}`,
    }),
    createUser: builder.mutation({
      query: ({ body, token }) => ({
        url: "create",
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    followUser: builder.mutation({
      query: ({ userId, token }) => ({
        url: `follow/${userId}`,
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    }),
    unFollowUser: builder.mutation({
      query: ({ userId, token }) => ({
        url: `unfollow/${userId}`,
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    }),
  }),

})

export const { useGetAllUsersQuery, useGetUserByIdQuery, useCreateUserMutation, useFollowUserMutation, useUnFollowUserMutation, useGetMyProfileQuery } = usersApi;
