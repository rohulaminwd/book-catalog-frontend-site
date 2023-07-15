import { AiFillStar } from "react-icons/ai";
import UserProfileImg from "./UserProfileImg";

const ReviewCard = ({ review }: any) => {
    const [revie, me] = review
    console.log(me)
    return (
        <div className="flex gap-x-1 items-start">
            <div className="flex mt-1 items-center gap-x-1.5">
                <UserProfileImg
                    me={me}
                    textColor="sm:text-[8px] ring-offset-[1px] text-[8px] text-white"
                    className="w-4 h-4 -ml-[1px] bg-secondary ring-[1px] ring-[#91f2dc]"
                />
            </div>
            <div className="flex w-full justify-between items-center border-l-top-0 border rounded-xl p-1">
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