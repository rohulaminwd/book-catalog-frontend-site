import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => `/book`,
      providesTags: ['review'],
    }),
    createBooks: builder.mutation({
      query: ({ data }) => ({
        url: `/book/create`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['review'],
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/review/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['review'],
    }),

    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['review'],
    }),

    deleteBook: builder.mutation({
      query: ({ id }) => ({
        url: `/book/${id}`,
        method: 'DELETE',
        body: [],
      }),
      invalidatesTags: ['review'],
    }),
  }),
});

export const {
  useCreateBooksMutation,
  useGetBooksQuery,
  usePostReviewMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = bookApi;
