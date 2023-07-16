
import { ProgressBar } from 'react-loader-spinner';

const ProgressSpeener = ({ loading }: any) => {
  return (
    <div>
      {loading && (
        <div className="w-full flex items-center justify-center">
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        </div>
      )}
    </div>
  );
};

export default ProgressSpeener;
