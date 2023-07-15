import { api } from '@/redux/api/apiSlice';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => `/auth/me`,
    }),
    getUsers: builder.query({
      query: () => `/users/`,
    }),
    createUser: builder.mutation({
      query: ({ data }) => ({
        url: `/auth/signUp`,
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: ({ data }) => ({
        url: `/auth/login`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useGetMeQuery,
  useGetUsersQuery,
} = userApi;
