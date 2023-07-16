import BookCard from "@/components/BookCard";
import Loading from "@/components/Loading";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import { IBook } from "@/types/booksTypes";
import { AnimatePresence, motion } from "framer-motion";

export default function AllBooks() {
    const { data, isLoading } = useGetBooksQuery(undefined);
    const books: IBook[] = data?.data;

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div>
                <motion.div
                    layout
                    className="md:mt-5 md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3"
                >
                    <AnimatePresence>
                        {books?.map((i) => (
                            <>
                                <motion.div
                                    layout
                                    animate={{ opacity: 1, scale: 1 }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    key={i?._id}
                                    className={`p-2 sm:p-1  mt-5 md:mt-0 w-full cursor-pointer hover:-translate-y-1 duration-300`}
                                >
                                    <BookCard
                                        book={i}
                                    />
                                </motion.div>
                            </>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
