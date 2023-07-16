import { useCreateBooksMutation, useGetBooksQuery, useUpdateBookMutation } from "@/redux/features/books/bookApi";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BsFillImageFill } from "react-icons/bs";
import { useGetMeQuery } from "@/redux/features/users/userApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IBook } from "@/types/booksTypes";

const EditBook = ({ setAddBook }: any) => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>();
    const [image, setImage] = useState<any>();
    const [img, setImg] = useState<any>();
    const imageRef = useRef<any>();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const { data: bookdata } = useGetBooksQuery(undefined);
    const books: IBook[] = bookdata?.data;
    const book = books?.find(book => book?._id === id)

    const [title, setTitle] = useState<any>(book?.title);
    const [genre, setGenre] = useState<any>(book?.genre);
    const [date, setDate] = useState<any>(new Date(book?.publicationDate ? book?.publicationDate : new Date()).toISOString().split('T')[0]);


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
        control,
    } = useForm();


    const [updateBookById,] =
        useUpdateBookMutation();


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
                const editebook: any = {
                    title: title,
                    genre: genre,
                    publicationDate: new Date(date),
                    imageURL: img,
                };

                const options = {
                    id: id,
                    data: editebook,
                };

                console.log(options)


                try {
                    const response: any = await updateBookById(options);

                    if (response?.data) {
                        toast.success('Book update Successfully');
                        navigate(`/book-details/${id}`)
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
        <div className="bg-base-200">
            <div className="mx-auto pt-10 px-2 sm:px-0 sm:pt-20  min-h-screen">
                <div className="max-w-2xl my-auto p-4 mx-auto rounded-xl border shadow-xl pattern-bg">
                    <h2 className="text-2xl mb-5 font-bold flex justify-center">
                        Edit Book
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div onClick={() => imageRef.current.click()} className="w-full cursor-pointer text-center p-3 py-5 border rounded-xl bg-white">
                            <div className="w-full max-h-[300px] overflow-y-auto rounded-xl">
                                {image && (
                                    <img
                                        src={image.image}
                                        className="w-full max-h-[300px] rounded-xl"
                                        alt="post img"
                                    />
                                )}
                            </div>
                            {!image && <div className="content-center justify-center">
                                <img
                                    src={book?.imageURL}
                                    className="w-full max-h-[300px] rounded-xl"
                                    alt="post img"
                                />
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
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />

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
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                />

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
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />

                            </div>
                        </div>


                        {error && (
                            <p className="text-red-500 text-center mt-3 mb-0">
                                <small>{error}</small>
                            </p>
                        )}

                        <div className="flex items-center justify-center gap-x-3 mt-5">
                            <input
                                className="btn btn-sm w-[120px] text-white uppercase font-bold bg-gradient-to-r from-[#2091d9] to-[#13b38f] hover:from-[#13b38f] hover:to-[#2091d9] duration-300 border-0"
                                type="submit"
                                value="Edit Book"
                            />
                            <Link to={`/book-details/${id}`} className="btn text-white bg-[#4f4e4e] btn-sm w-[120px] ">
                                cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBook;