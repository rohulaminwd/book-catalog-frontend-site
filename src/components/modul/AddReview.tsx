import { usePostReviewMutation } from "@/redux/features/books/bookApi";
import { useState } from "react";
import { toast } from "react-toastify";


const AddReview = ({ review, setReview }: any) => {
    const [rating, setRating] = useState([1, 2, 3, 4, 5])
    const [value, setValue] = useState('Wow..! Nice book')

    const [addReview,] =
        usePostReviewMutation();
    const handleReview = async () => {
        const data = {
            rating: rating,
            review: value
        }

        const options = {
            id: review?._id,
            userId: review?.author?.email,
            data: data,
        };

        try {
            const response: any = await addReview(options);

            if (response?.data) {
                toast.success('Success add review');
                setReview(null)
            } else if (response?.error) {
                toast.error('Opps no..! fail review');
            }
        } catch (error) {
            toast.error('Opps no..! fail review');
            console.error(error);
        }
    }
    return (
        <div>
            <input type="checkbox" id="review" className="modal-toggle" />
            <div className="modal modal-middle">
                <div className="modal-box bg-white">
                    <div>
                        <div className="form-control">
                            <h2 className="label-text text-xl mb-3">Add Your Review</h2>
                            <textarea value={value} onChange={(e) => setValue(e.target.value)} className="textarea textarea-bordered h-24" placeholder="Enter review.."></textarea>
                        </div>
                        <div className="flex justify-end">
                            <div className="rating mt-4 text-right">
                                <input onClick={() => setRating([1])} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input onClick={() => setRating([1, 2])} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input onClick={() => setRating([1, 2, 3])} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input onClick={() => setRating([1, 2, 3, 4])} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input onClick={() => setRating([1, 2, 3, 4, 5])} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-3 mt-5">
                        <button
                            onClick={() => handleReview()}
                            className="btn btn-primary w-[100px] text-white btn-sm"
                        >
                            add
                        </button>
                        <label htmlFor="review" className="btn text-white bg-[#4f4e4e] btn-sm w-[100px] ">
                            cancel
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddReview;
