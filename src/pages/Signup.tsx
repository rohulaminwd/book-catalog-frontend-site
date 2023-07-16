

import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import signInBg from "../assets/images/signIn-bg.jpg";
import {
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
} from "react-icons/ai";
import {
    GiBookAura
} from "react-icons/gi";
import { useEffect, useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { IUser, IUserFrom } from "@/types/globalTypes";
import { useCreateUserMutation } from "@/redux/features/users/userApi";
import { toast } from "react-toastify";
import ProgressSpeener from "@/components/ProgressSpeener";

const SignUp = () => {
    const [error, setError] = useState<string>();

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset,
    } = useForm();
    const [loading, setLoading] = useState(false);
    console.log(loading)
    const newPass = useWatch({ control, name: "NewPass" });
    const oldPass = useWatch({ control, name: "OldPass" });
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(true);

    const [showOldPass, setshowOldPass] = useState(false);
    const [showNewPass, setshowNewPass] = useState(false);
    const [oldPassType, setOldPassType] = useState("password");
    const [newPassType, setNewPassType] = useState("password");

    const handleShowPass = (old: string) => {
        if (old === "oldPass") {
            setshowOldPass(!showOldPass);
            setOldPassType(oldPassType === "password" ? "text" : "password");
        } else {
            setshowNewPass(!showNewPass);
            setNewPassType(newPassType === "password" ? "text" : "password");
        }
    };

    useEffect(() => {
        if (
            newPass !== undefined &&
            newPass !== "" &&
            oldPass !== undefined &&
            oldPass !== "" &&
            newPass === oldPass
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [newPass, oldPass]);

    const [createUser, { isSuccess, isError, isLoading }] =
        useCreateUserMutation();

    const onSubmit: any = async (data: IUserFrom) => {
        setLoading(true);
        const user: IUser = {
            name: {
                firstName: data.firstName,
                lastName: data.lastName,
            },
            password: data.NewPass,
            email: data.email,
            address: data.address ? data.address : "Your Address",
        };

        try {
            const response: any = await createUser({ data: user });
            console.log(response, isSuccess, isError, isLoading)

            if (response?.data) {
                toast.success('SignUp success. Please login now.');
                reset();
                navigate("/login");
            } else if (response?.error) {
                setError(response?.error?.data?.message);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{ backgroundImage: `url(${signInBg})` }}
            className="bg-cover  h-screen"
        >
            <div className="h-screen bg-[#111f3b75] flex items-end sm:items-center justify-center w-full">
                <div
                    className="w-full sm:w-[500px] bg-base-100 rounded-3xl sm:rounded-b-3xl rounded-b-none p-3 py-5 sm:py-8 sm:p-8 shadow-md"
                    data-aos="zoom-in-down"
                    data-aos-delay="100"
                    data-aos-duration="800"
                >
                    <div className="text-center">
                        <div className="flex items-center justify-center">
                            <GiBookAura size={60} />
                        </div>
                        <h2 className="text-2xl font-bold text-center">New Account</h2>
                        <h6 className="text-center mb-3 leading-normal font-bold mx-auto sm:w-[80%]">
                            Hey Enter Your Details to create a account
                        </h6>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex w-full justify-between gap-x-3">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-cyan-900 font-bold">
                                            First Name
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="input input-bordered input-sm sm:input-md input-primary w-full"
                                        {...register("firstName", {
                                            required: {
                                                value: true,
                                                message: "First Name is required",
                                            },
                                            minLength: {
                                                value: 2,
                                                message: "Must be 2 characters longer",
                                            },
                                        })}
                                    />
                                    {errors.firstName && (
                                        <label className="label p-0 pt-1">
                                            {typeof errors.firstName.message === 'string' && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.firstName.message}
                                                </span>
                                            )}
                                        </label>
                                    )}
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-cyan-900 font-bold">
                                            Last Name
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="input input-bordered input-sm sm:input-md input-primary w-full"
                                        {...register("lastName", {
                                            required: {
                                                value: true,
                                                message: "Last Name is required",
                                            },
                                            minLength: {
                                                value: 2,
                                                message: "Must be 2 characters longer",
                                            },
                                        })}
                                    />
                                    {errors.lastName && (
                                        <label className="label p-0 pt-1">
                                            {typeof errors.lastName.message === 'string' && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.lastName.message}
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
                                            First Name
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Your Email"
                                        className="input input-bordered input-sm sm:input-md input-primary w-full"
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message: "Email is required",
                                            },
                                        })}
                                    />
                                    {errors.email && (
                                        <label className="label p-0 pt-1">
                                            {typeof errors.email.message === 'string' && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.email.message}
                                                </span>
                                            )}
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between gap-3">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-cyan-900 font-bold">
                                            Password
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={newPassType}
                                            placeholder="Password"
                                            className="input input-bordered !py-4 sm:!py-6 !rounded-md input-sm sm:input-md input-primary w-full"
                                            {...register("NewPass", {
                                                required: {
                                                    value: true,
                                                    message: "New Password is required",
                                                },
                                                minLength: {
                                                    value: 6,
                                                    message: "Must be 6 characters longer",
                                                },
                                            })}
                                        />
                                        <div
                                            onClick={() => handleShowPass("newPass")}
                                            className={`${showNewPass ? "text-primary" : "text-gray-400 "
                                                } cursor-pointer  absolute top-[5px] sm:top-[15px] right-1 sm:right-2`}
                                        >
                                            {showNewPass ? (
                                                <BiShow size={24} />
                                            ) : (
                                                <BiHide size={24} />
                                            )}
                                        </div>
                                    </div>
                                    {errors.NewPass && (
                                        <label className="label p-0 pt-1">
                                            {typeof errors.NewPass.message === 'string' && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.NewPass.message}
                                                </span>
                                            )}
                                        </label>
                                    )}
                                </div>

                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text text-cyan-900 font-bold">
                                            Confirm Password
                                        </span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={oldPassType}
                                            placeholder="Confirm Password"
                                            className="input input-bordered !py-4 sm:!py-6 !rounded-md input-sm sm:input-md input-primary w-full"
                                            {...register("OldPass", {
                                                required: {
                                                    value: true,
                                                    message: "Old Password is required",
                                                },
                                                minLength: {
                                                    value: 6,
                                                    message: "Must be 6 characters longer",
                                                },
                                            })}
                                        />
                                        <div
                                            onClick={() => handleShowPass("oldPass")}
                                            className={`${showOldPass ? "text-primary" : "text-gray-400 "
                                                } cursor-pointer  absolute top-[5px] sm:top-[15px] right-1 sm:right-2`}
                                        >
                                            {showOldPass ? (
                                                <BiShow size={24} />
                                            ) : (
                                                <BiHide size={24} />
                                            )}
                                        </div>
                                    </div>
                                    {errors.OldPass && (
                                        <label className="label p-0 pt-1">
                                            {typeof errors.OldPass.message === 'string' && (
                                                <span className="label-text-alt text-red-500">
                                                    {errors.OldPass.message}
                                                </span>
                                            )}
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div className="form-control w-full mb-5">
                                <label className="label">
                                    <span className="label-text text-cyan-900 font-bold">
                                        Your Address
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your Address"
                                    className="input input-bordered input-sm sm:input-md input-primary w-full"
                                    {...register("address", {
                                        required: {
                                            value: true,
                                            message: "Your Address is required",
                                        },
                                        minLength: {
                                            value: 5,
                                            message: "Must be 5 characters longer",
                                        },
                                    })}
                                />
                                {errors.address && (
                                    <label className="label p-0 pt-1">
                                        {typeof errors.address.message === 'string' && (
                                            <span className="label-text-alt text-red-500">
                                                {errors.address.message}
                                            </span>
                                        )}
                                    </label>
                                )}
                            </div>
                            {
                                loading && <ProgressSpeener loading={loading} />
                            }
                            {error && (
                                <p className="text-red-500 mb-2">
                                    <small>{error}</small>
                                </p>
                            )}
                            <input
                                className="btn w-full text-white uppercase font-bold bg-gradient-to-r from-[#2091d9] to-[#13b38f] hover:from-[#13b38f] hover:to-[#2091d9] duration-300 border-0"
                                type="submit"
                                disabled={disabled}
                                value="Create Account"
                            />
                        </form>

                        <div className="divider">OR</div>
                        <div className="flex mt-5 items-center font-bold justify-between">
                            <div>
                                <Link to="/">
                                    <h6 className="flex items-center gap-1 text-[#2091d9]">
                                        <AiOutlineArrowLeft />
                                        Back
                                    </h6>
                                </Link>
                            </div>
                            <div>
                                <Link to="/login">
                                    <h6 className="flex items-center gap-1 text-[#13b38f]">
                                        Login <AiOutlineArrowRight />
                                    </h6>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
