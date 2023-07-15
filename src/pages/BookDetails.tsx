import BookCard from "@/components/BookCard";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import { IBook } from "@/types/booksTypes";
import { useParams } from "react-router-dom";


export default function BookDetails() {
    const { id } = useParams();
    const { data, isLoading, error } = useGetBooksQuery(undefined);
    const books: IBook[] = data?.data;
    const singleBook = books?.find(book => book?._id === id)

    console.log(id, singleBook, "okkk")

    return (
        <div>
            <div>
                <BookCard book={singleBook} />
            </div>
        </div>
    )
}
