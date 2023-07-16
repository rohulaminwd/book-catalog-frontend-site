import { useCreateBooksMutation } from "@/redux/features/books/bookApi";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BsFillImageFill } from "react-icons/bs";
import { useGetMeQuery } from "@/redux/features/users/userApi";
import ProgressSpeener from "../ProgressSpeener";

const AddNewBook = ({ setAddBook }: any) => {
    const [error, setError] = useState<string>();
    const [image, setImage] = useState<any>();
    const [img, setImg] = useState<any>();
    const imageRef = useRef<any>();
    const [loading, setLoading] = useState(false);

    const onImageChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            setImg(img);
            setImage({
                image: URL.createObjectURL(img),
            });
        }
    };

    const { data, } = useGetMeQuery(undefined);
    const me = data?.data;
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();


    const [addBook,] =
        useCreateBooksMutation();


    const onSubmit: any = async (data: any) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", img);
        formData.append("upload_preset", "expart_future_plan");
        formData.append("cloud_name", "ddlrfuyzp");
        const url = `https://api.cloudinary.com/v1_1/ddlrfuyzp/image/upload`;

        try {
            const response = await fetch(url, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (result) {
                const img = result.secure_url;

                const book: any = {
                    title: data.title,
                    genre: data.genre,
                    publicationDate: new Date(data?.pubDate),
                    author: me?._id,
                    imageURL: img,
                };

                console.log(book);

                try {
                    const response: any = await addBook({ data: book });

                    if (response?.data) {
                        toast.success('Add New Book Success');
                        reset();
                        setAddBook(null);
                    } else if (response?.error) {
                        setError(response?.error?.data?.message);
                        toast.error(response?.error?.data?.message)
                        console.log(response?.error)
                    }
                } catch (error) {
                    setError('An error occurred. Please try again.');
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
        } catch (error) {
            setError('An error occurred while uploading the image. Please try again.');
            console.error(error);
            setLoading(false);
        }
    };



    return (
        <div>
            <input type="checkbox" id="add-book" className="modal-toggle" />
            <div className="modal modal-middle">
                <div className="modal-box pattern-bg">
                    <h2 className="text-2xl mb-5 font-bold flex justify-center">
                        Add New Book
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div onClick={() => imageRef.current.click()} className="w-full cursor-pointer text-center p-3 py-5 border rounded-xl bg-white">
                            <div className="w-full max-h-[300px] overflow-y-auto rounded-xl">
                                {image && (
                                    <img
                                        src={image.image}
                                        className="w-full rounded-xl"
                                        alt="post img"
                                    />
                                )}
                            </div>
                            {!image && <div className="content-center justify-center">
                                <p className="flex text-gray-400 justify-center"><BsFillImageFill size={60} /></p>
                                <p className="mt-3 font-bold text-gray-500">select book picture</p>
                            </div>}
                            <div style={{ display: "none" }} className="hidden">
                                <input
                                    type="file"
                                    name="images"
                                    onChange={onImageChange}
                                    ref={imageRef}
                                    id=""
                                />
                            </div>
                        </div>
                        <div className="flex w-full gap-x-3 justify-between">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-cyan-900 font-bold">
                                        Book Title
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter book title"
                                    className="input input-bordered input-sm sm:input-md input-primary w-full"
                                    {...register("title", {
                                        required: {
                                            value: true,
                                            message: "Title is required",
                                        },
                                    })}
                                />
                                {errors.title && (
                                    <label className="label p-0 pt-1">
                                        {typeof errors.title.message === 'string' && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.title.message}
                                            </span>
                                        )}
                                    </label>
                                )}
                            </div>
                        </div>
                        <div className="flex w-full gap-x-3 justify-between">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-cyan-900 font-bold">
                                        Book Genre
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Book genre"
                                    className="input input-bordered input-sm sm:input-md input-primary w-full"
                                    {...register("genre", {
                                        required: {
                                            value: true,
                                            message: "Genre is required",
                                        },
                                    })}
                                />
                                {errors.genre && (
                                    <label className="label p-0 pt-1">
                                        {typeof errors.genre.message === 'string' && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.genre.message}
                                            </span>
                                        )}
                                    </label>
                                )}
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-cyan-900 font-bold">
                                        Publish Date
                                    </span>
                                </label>
                                <input
                                    type="date"
                                    placeholder="Enter Your Email"
                                    className="input input-bordered input-sm sm:input-md input-primary w-full"
                                    {...register("pubDate", {
                                        required: {
                                            value: true,
                                            message: "Publish Date is required",
                                        },
                                    })}
                                />
                                {errors.pubDate && (
                                    <label className="label p-0 pt-1">
                                        {typeof errors.pubDate.message === 'string' && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.pubDate.message}
                                            </span>
                                        )}
                                    </label>
                                )}
                            </div>
                        </div>

                        {
                            loading && <ProgressSpeener loading={loading} />
                        }

                        {error && (
                            <p className="text-red-500 text-center mt-3 mb-0">
                                <small>{error}</small>
                            </p>
                        )}

                        <div className="flex items-center justify-center gap-x-3 mt-5">
                            <input
                                className="btn btn-sm w-[120px] text-white uppercase font-bold bg-gradient-to-r from-[#2091d9] to-[#13b38f] hover:from-[#13b38f] hover:to-[#2091d9] duration-300 border-0"
                                type="submit"
                                value="Add Book"
                            />
                            <label htmlFor="add-book" className="btn text-white bg-[#4f4e4e] btn-sm w-[120px] ">
                                cancel
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewBook;