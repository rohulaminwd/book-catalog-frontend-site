import { api } from '@/redux/api/apiSlice';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    singleProduct: builder.query({
      query: (id) => `/product/${id}`,
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
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetProductsQuery,
  useCreateUserMutation,
  useLoginMutation,
  useSingleProductQuery,
} = userApi;
