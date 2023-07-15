import BookCard from "@/components/BookCard";
import Footer from "@/layouts/Footer";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import { useGetMeQuery } from "@/redux/features/users/userApi";
import { IBook } from "@/types/booksTypes";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  const { data, } = useGetBooksQuery(undefined);
  const books: IBook[] = data?.data;
  const { data: user, } = useGetMeQuery(undefined);
  const me = user?.data;
  return (
    <div>
      <div className="p-4 mt-4 foot-reem rounded-xl max-w-7xl mx-auto pattern-bg">
        <h3 className="text-2xl font-bold text-purple-700">Book Catalog</h3>
        <div>
          {me ?
            <label htmlFor="add-book" className="btn btn-sm  btn-primary text-md rounded-[20px] text-white">Add New Book</label>
            : <Link to='signup' className="btn btn-sm  btn-primary text-md rounded-[20px] text-white">Sign up Now</Link>
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
    </div>
  );
}
