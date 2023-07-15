
import { Link } from 'react-router-dom';
import Img404 from "../assets/images/image_404.png"

const Notfound = () => {
    return (
        <div className='mx-4 w-full flex justify-center md:mx-8 lg:mx-16 mt-24'>
            <div>
                <div className="max-w-3xl grid place-content-center">
                    <img src={Img404} className="w-full" alt="error 404" />
                </div>
                <div className="text-center mt-5">
                    <h1 className='text-4xl font-bold'>We Have Lost This Page</h1>
                    <h1 className='text-xl font-bold mt-2 text-accent'>Ops..! No 404 Error..</h1>
                </div>
                <div className='w-full flex justify-center mt-5'>
                    <Link to='/' className=''>
                        <button className='btn mx-auto font-bold'>Back to Home</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Notfound;