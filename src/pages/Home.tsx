import BookCard from "@/components/BookCard";
import Loading from "@/components/Loading";
import AddNewBook from "@/components/modul/AddNewBook";
import Footer from "@/layouts/Footer";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import { IBook } from "@/types/booksTypes";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const { data, isLoading } = useGetBooksQuery(undefined);
  const [addBook, setAddBook] = useState<any>(null)
  const books: IBook[] = data?.data;
  const usertoken = localStorage.getItem("accessToken");


  console.log(isLoading, "ok done hoy naki")

  if (isLoading) {
    return <Loading />
  }


  return (
    <div className="">
      <div className="p-4 mt-4 foot-reem rounded-xl max-w-7xl mx-auto pattern-bg">
        <div className="flex justify-between">
          <h3 className="text-2xl font-bold  text-purple-700">Book Catalog</h3>
          <h1 className="font-bold flex justify-center items-center text-md text-purple-700 w-[100px] h-8 px-1 rounded-full bg-purple-200">Item: {books?.length}</h1>
        </div>
        <div className="mt-5">
          <div className="join w-[100%]">
            <div>
              <div>
                <input className="input w-full input-bordered border-purple-400 join-item" placeholder="Search..." />
              </div>
            </div>
            <select className="select w-full select-bordered border-purple-400 join-item">
              <option disabled selected>genre</option>
              <option>publicationDate</option>
              <option>Drama</option>
              <option>Action</option>
            </select>
            <div className="indicator">
              <button className="btn bg-purple-700 text-white join-item">Search</button>
            </div>
          </div>
        </div>
        <div className="mt-5">
          {usertoken ?
            <div className="flex justify-end">
              <label onClick={() => setAddBook("add book")} htmlFor="add-book" className="btn btn-wide bg-purple-500 hover:bg-purple-600 border-0 text-lg btn-circle text-white">Add New Book</label>
            </div>
            : <div className="flex justify-end">
              <Link to='signup' className="btn btn-wide btn-circle bg-purple-500 hover:bg-purple-600 border-0 text-lg text-white">Sign up Now</Link>
            </div>
          }
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
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
                  className={`p-2 sm:p-1  mt-5 md:mt-0 w-full  cursor-pointer hover:-translate-y-1 duration-300`}
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
      <div className="flex my-8 justify-center items-center">
        <Link to='/all-books' className="btn text-white shadow-lg btn-wide text-xl btn-circle btn-primary ">
          See More Books
        </Link>
      </div>
      <div className="pattern-bg">
        <Footer />
      </div>
      {addBook && <AddNewBook setAddBook={setAddBook} />}
    </div>
  );
}
