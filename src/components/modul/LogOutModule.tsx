


const LogOutModule = ({ setLogout }: any) => {
    const logOut = () => {
        setLogout(null);
        localStorage.removeItem("accessToken");
    };

    return (
        <div>
            <input type="checkbox" id="Logout-modal" className="modal-toggle" />
            <div className="modal modal-middle">
                <div className="modal-box pattern-bg">
                    <p className="text-red-700 font-bold text-2xl">
                        Are you sure you want to Logout this Website
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-5">
                        <button
                            onClick={logOut}
                            className="btn btn-error w-[100px] text-white btn-sm"
                        >
                            Logout
                        </button>
                        <label htmlFor="Logout-modal" className="btn text-white bg-[#4f4e4e] btn-sm w-[100px] ">
                            cancel
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogOutModule;
