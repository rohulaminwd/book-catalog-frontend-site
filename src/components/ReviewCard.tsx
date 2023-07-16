import { AiFillStar } from "react-icons/ai";
import UserProfileImg from "./UserProfileImg";

const ReviewCard = ({ review }: any) => {
    const [revie, me] = review
    console.log(me)
    return (
        <div className="flex gap-x-2 chat chat-start py-1.5 w-full items-start">
            <div className="flex mt-1 items-center gap-x-1.5">
                <UserProfileImg
                    me={me}
                    textColor="ring-offset-[1px] text-[12px] text-white"
                    className="w-7 h-7 -ml-[1px] bg-purple-700 ring-[1px] ring-[#c591f2]"
                />
            </div>
            <div className="flex !w-full -mt-2 py-0 chat-bubble bg-purple-100 text-purple-600 justify-between items-center border-l-top-0 border rounded-xl p-1">
                <div className="ml-1">
                    {/* <p className="text-sm">{me?.name?.firstName}</p> */}
                    <div>
                        <p className="text-sm">{revie?.review}</p>
                    </div>
                </div>
                <div className="flex justify-end">
                    {
                        revie?.rating?.map((i: any) => (
                            <span key={i} className="text-purple-700"><AiFillStar size={16} /></span>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;