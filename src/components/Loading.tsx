
import { FidgetSpinner, Dna } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className='text-center'>
        <FidgetSpinner
          visible={true}
          height="120"
          width="120"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          ballColors={['#ff0000', '#00ff00', '#0000ff']}
          backgroundColor="#F4442E"
        />
        {/* <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        /> */}
      </div>
    </div>
  );
};

export default Loading;
