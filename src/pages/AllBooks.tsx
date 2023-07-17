import BookCard from "@/components/BookCard";
import Loading from "@/components/Loading";
import AddNewBook from "@/components/modul/AddNewBook";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import { IBook } from "@/types/booksTypes";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AllBooks() {
    const { data, isLoading } = useGetBooksQuery(undefined);
    const [addBook, setAddBook] = useState<any>(null)
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const books: IBook[] = data?.data;

    const searchBooks: any = books?.filter((book) => {
        const { title, genre, author }: any = book;
        const name = author?.name?.firstName + ' ' + author?.name?.lastName

        const search = searchQuery?.toLowerCase();
        const bookTitle = title?.toLowerCase();
        const bookGenre = genre?.toLowerCase();
        const bookAuthor = name?.toLowerCase();

        console.log(search, bookTitle, bookGenre, bookAuthor)

        return (
            bookTitle?.includes(search) ||
            bookGenre?.includes(search) ||
            bookAuthor?.includes(search)
        );
    });

    const filteredBooks = (quire: any) => {
        const filteredData = searchBooks?.filter((book: any) => {
            return (book?.genre === quire || new Date(book?.publicationDate).getFullYear() === quire)
        })

        setSearchResults(filteredData);
    }



    useEffect(() => {
        setSearchResults(searchBooks);
    }, [searchQuery, books])


    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="p-4 mt-2 foot-reem rounded-xl max-w-7xl mx-auto border border-purple-200 pat-bg">
                <div className="flex justify-between">
                    <h3 className="text-2xl font-bold  text-purple-700">Book Catalog</h3>
                    <h1 className="font-bold flex justify-center items-center text-md text-purple-200 w-[100px] h-8 px-1 rounded-full bg-purple-600">Item: {books?.length}</h1>
                </div>
                <div className="mt-5 md:flex justify-between w-full items-center">
                    <div className="form-control w-full">
                        <div className="input-group w-full">
                            <input type="text" value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search…"
                                className="input w-full max-w-sm input-bordered"
                            />
                            <button className="btn btn-square">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex mt-3 md:mt-0 justify-center md:justify-end items-center gap-x-2 w-full">
                        <div>
                            <span className="text-gray-500">Select Genre</span>
                            <select onChange={(e) => filteredBooks(e.target.value)} className="select select-bordered w-full max-w-xs">
                                {
                                    searchResults?.map((i: any, index) => (
                                        <option key={index}>{i?.genre}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <span className="text-gray-500">Select Year</span>
                            <select onChange={(e) => filteredBooks(e.target.value)} className="select select-bordered w-full max-w-xs">
                                {
                                    searchResults?.map((i: any, index) => (
                                        <option key={index}>{(new Date(i?.publicationDate).getFullYear())}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <div className="flex justify-center md:justify-start">
                        <label onClick={() => setAddBook("add book")} htmlFor="add-book" className="btn btn-wide bg-purple-500 hover:bg-purple-600 border-0 text-md btn-circle text-white">Add New Book</label>
                    </div>
                </div>
            </div>
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
            {addBook && <AddNewBook setAddBook={setAddBook} />}
        </div>
    );
}
