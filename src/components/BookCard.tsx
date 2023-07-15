import { Link } from "react-router-dom";



const BookCard = ({ book }: any) => {
    return (
        <div className="pattern-bg relative border-purple-200 font-reem shadow-sm rounded-xl p-4 border">
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
            <div className="my-2">
                <p className="text-xl font-bold text-purple-700">{book?.title}</p>
            </div>
            <div className="mt-5 flex justify-center">
                <Link to={`/book-details/${book?._id}`} className="btn btn-circle btn-wide text-xl bg-purple-700 border-0 hover:bg-purple-600 capitalize text-white" >See Details</Link>
            </div>
        </div>
    );
};

export default BookCard;
