
import ReviewCard from "@/components/ReviewCard";
import AddReview from "@/components/modul/AddReview";
import DeleteModule from "@/components/modul/DeleteBook";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import { useGetUsersQuery } from "@/redux/features/users/userApi";
import { IBook } from "@/types/booksTypes";
import { IUser } from "@/types/globalTypes";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import Loading from "@/components/Loading";


export default function BookDetails() {
    const { id } = useParams();
    const token = localStorage.getItem("accessToken");
    const [deleteBook, setDelete] = useState<any>(null)
    const [review, setReview] = useState<any>(null);
    const { data: users, } = useGetUsersQuery(undefined);
    const userdata = users?.data;
    const { data, isLoading } = useGetBooksQuery(undefined);
    const books: IBook[] = data?.data;
    const book = books?.find(book => book?._id === id)

    const handleUser = (email: string) => {
        const user: IUser = userdata?.find((user: IUser) => user?.email === email);
        console.log(userdata, email, "oll ok")
        return user;
    }

    if (isLoading) {
        return <Loading />
    }


    return (
        <div className="max-w-7xl px-3 min-h-screen flex items-center mx-auto">
            <div className="md:flex w-full mt-8 justify-between items-center gap-x-5">
                <div className="w-full flex items-center justify-center">
                    <img src={book?.imageURL} className="rounded-xl mx-auto max-w-[600px] max-h-[600px]" alt="book" />
                </div>
                <div className="w-full md:pl-4  sm:border-l-2 border-purple-300">
                    <div className="my-2 mt-4">
                        <div className="flex justify-between">
                            <p className="text-3xl sm:text-5xl mt-3 font-bold text-purple-700">{book?.title}</p>
                        </div>
                        <div className="flex text-xl sm:text-2xl mt-8 gap-x-3 items-center">
                            <p className="font-bold">Genre:</p>
                            <p className="">{book?.genre}</p>
                        </div>
                        <div className="flex  text-xl sm:text-2xl sm:mt-4 gap-x-3 items-center">
                            <p className=" font-bold">Author:</p>
                            <p className="">
                                {book?.author?.name?.firstName} {book?.author?.name?.lastName}
                            </p>
                        </div>
                        <div className="flex text-xl sm:text-2xl sm:mt-4 gap-x-3 items-center">
                            <p className=" font-bold">Publish:</p>
                            <p className="">
                                {format(new Date(book?.publicationDate ? book?.publicationDate : ""), "PP")}
                            </p>
                        </div>
                        <div className="mt-4 rounded-md bg-purple-50 p-3">
                            <p className="text-xl sm:text-2xl font-bold text-purple-700">Reviews</p>
                            <div className="my-2">
                                {
                                    book?.review
                                        ?.map((review) => (
                                            <div key={review?._id} className="my-1">
                                                <ReviewCard key={review?._id} review={[review, handleUser(review?.userId)]} />
                                            </div>
                                        ))
                                        .reverse()
                                        .slice(0, 4)
                                }
                                {book?.review?.length && book.review.length > 0 ? null : <p>No review yet</p>}

                            </div>
                            {token && <div className="flex mt-4 justify-end">
                                <label onClick={() => setReview(book)} htmlFor="review" className="btn btn-sm bg-purple-600 hover:bg-purple-700 capitalize text-gray-200">Add Review</label>
                            </div>}
                        </div>
                        <div className="mt-4 flex items-center gap-x-2 rounded-md bg-purple-50 p-3">
                            <Link to={`/edit-book/${book?._id}`} onClick={() => setReview(book)} className="btn btn-sm btn-primary capitalize text-md text-gray-200">Edit Book</Link>
                            <label onClick={() => setDelete(book)} htmlFor="delete-book" className="btn btn-sm bg-purple-600 hover:bg-purple-700 capitalize text-md text-gray-200">Delete</label>
                        </div>
                    </div>
                </div>
            </div>
            {review && <AddReview review={review} setReview={setReview} />}
            {deleteBook && <DeleteModule deleteBook={deleteBook} setDelete={setDelete} />}
        </div >
    )
}
