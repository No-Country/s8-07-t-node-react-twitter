import { API_URL } from "../../../utils/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const { initialState } = require("@/data/tweets.js");

export const tweetsApi = createApi(
  {
    reducerPath: "tweetsApi",
    refetchOnFocus: false, // when the window is refocused, refetch the data
    refetchOnMountOrArgChange: 120,
    baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api/tweets/`, }),
    tagTypes: ["Tweets"],
    endpoints: (builder) => ({
      getAllTweets: builder.query({
        query: () => ({
          url: "all",
          method: 'GET',
          credentials: 'include',
          headers: {
            'content-type': 'application/json'
          }
        }),
        providesTags: ["Tweets"],
        // transformResponse: (response) => {
        //   return [...response, ...initialState]
        // }
      }),
      getTweetsByUserId: builder.query({
        query: ({ userId }) => `user/${userId}`,
      }),
      // confirmToken: builder.query({
      //   query: ({ token}) => `confirm/${token}`,
      // }),
      createTweet: builder.mutation({
        query: ({ body, token }) => ({
          url: "create",
          method: 'POST',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          formData: true,
          body,
        }),
        invalidatesTags: ["Tweets"],
      }),
      likeTweet: builder.mutation({
        query: ({ tweetId, token }) => ({
          url: `like/${tweetId}`,
          method: 'PUT',
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
        invalidatesTags: ["Tweets"],
      }),

    }),

  }
)

export const { useGetAllTweetsQuery, useGetTweetsByUserIdQuery, useCreateTweetMutation, useLikeTweetMutation } = tweetsApi
