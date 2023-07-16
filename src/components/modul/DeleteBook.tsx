import { useDeleteBookMutation } from "@/redux/features/books/bookApi";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const DeleteModule = ({ deleteBook, setDelete }: any) => {
    const navigate = useNavigate();
    const [deleteBookById,] =
        useDeleteBookMutation();


    const hanldeDelete = async () => {

        try {
            const response: any = await deleteBookById({ id: deleteBook?._id })

            if (response?.data) {
                toast.success('Successfully Delete the book');
                setDelete(null)
                navigate("/all-books");
            } else if (response?.error) {
                toast.error('Opps no..! fail Delete');
            }
        } catch (error) {
            toast.error('Opps no..! fail Delete');
            console.error(error);
        }
    };

    return (
        <div>
            <input type="checkbox" id="delete-book" className="modal-toggle" />
            <div className="modal modal-middle">
                <div className="modal-box pattern-bg">
                    <div className="text-xl flex justify-center">
                        <AiFillDelete size={60} />
                    </div>
                    <p className="text-red-700 font-bold text-2xl">
                        Are you sure you want to Delete this book
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-5">
                        <button
                            onClick={hanldeDelete}
                            className="btn btn-error w-[100px] text-white btn-sm"
                        >
                            Delete
                        </button>
                        <label htmlFor="delete-book" className="btn text-white bg-[#4f4e4e] btn-sm w-[100px] ">
                            cancel
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModule;
