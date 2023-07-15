
import ReviewCard from "@/components/ReviewCard";
import AddReview from "@/components/modul/AddReview";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import { useGetUsersQuery } from "@/redux/features/users/userApi";
import { IBook } from "@/types/booksTypes";
import { IUser } from "@/types/globalTypes";
import { useState } from "react";
import { useParams } from "react-router-dom";


export default function BookDetails() {
    const { id } = useParams();
    const [review, setReview] = useState<any>(null)
    const { data: users, } = useGetUsersQuery(undefined);
    const userdata = users?.data;
    const { data, isLoading, error } = useGetBooksQuery(undefined);
    const books: IBook[] = data?.data;
    const book = books?.find(book => book?._id === id)

    const handleUser = (email: string) => {
        const user: IUser = userdata?.find((user: IUser) => user?.email === email);
        console.log(userdata, email, "oll ok")
        return user;
    }


    return (
        <div className="max-w-7xl px-3 min-h-screen flex items-center mx-auto">
            <div className="sm:flex w-full mt-8 justify-between items-center gap-x-5">
                <div className="w-full flex items-center sm:border-r-2 border-purple-300 justify-center">
                    <img src={book?.imageURL} className="rounded-xl mx-auto max-w-[600px] max-h-[600px]" alt="book" />
                </div>
                <div className="w-full">
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
                                {book?.publicationDate}
                            </p>
                        </div>
                        <div className="mt-4 rounded-md bg-white p-3">
                            <p className="text-xl sm:text-2xl font-bold">Reviews</p>
                            <div className="my-2">
                                {
                                    book?.review?.map((review: any) => (
                                        <div key={review?._id} className="my-1">
                                            <ReviewCard key={review?._id} review={[review, handleUser(review?.userId)]} />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="flex mt-4 justify-end">
                                <label onClick={() => setReview(book)} htmlFor="review" className="btn btn-xs capitalize text-gray-700">Add Review</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {review && <AddReview review={review} setReview={setReview} />}
        </div >
    )
}
