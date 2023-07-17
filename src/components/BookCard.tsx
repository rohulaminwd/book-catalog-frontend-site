import { Link } from "react-router-dom";
import { format } from "date-fns";
import { AiFillHeart } from "react-icons/ai";



const BookCard = ({ book }: any) => {
    return (
        <div className="pat-bg relative border-purple-200 font-reem shadow-lg rounded-xl p-4 border">
            <div className="rounded-lg">
                <img src={book?.imageURL} className="rounded-xl w-full bg-purple-700 border border-purple-200 h-[200px]" alt="book" />
            </div>
            <div className="base-card w-[124px] h-[124px] overflow-hidden absolute -top-2 -left-2">
                <p
                    className={`bg-purple-700 p-0.5 -rotate-45 shadow-sm mt-7 -ml-10 text-white text-center text-sm`}
                >
                    popular
                </p>
            </div>
            <div className="my-2 mt-4">
                <div className="flex justify-between">
                    <p className="text-xl font-bold text-purple-700">{book?.title}</p>
                    <p className=" text-orange-500"> <AiFillHeart size={30} /> </p>
                </div>
                <div className="flex mt-4 justify-between items-center">
                    <p className="text-[16] font-bold">Genre:</p>
                    <p className="text-[16]">{book?.genre}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-[16] font-bold">Author:</p>
                    <p className="text-[16]">
                        {book?.author?.name?.firstName} {book?.author?.name?.lastName}
                    </p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-[16] font-bold">Publish:</p>
                    <p className="text-[16]">
                        {format(new Date(book?.publicationDate), "PP")}
                    </p>
                </div>

            </div>
            <div className="mt-5 flex justify-center">
                <Link to={`/book-details/${book?._id}`} className="btn btn-circle btn-wide text-xl bg-purple-700 border-0 hover:bg-purple-600 capitalize text-white" >See Details</Link>
            </div>
        </div>
    );
};

export default BookCard;
