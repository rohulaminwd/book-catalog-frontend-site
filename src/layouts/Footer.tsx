

export default function Footer() {
    return (
        <div>
            <footer className="p-5 sm:p-10 max-w-7xl mx-auto text-base-content">
                <div className="sm:flex gap-x-8 justify-between">
                    <div className="max-w-[350px]">
                        <h1 className="font-bold text-gray-700 mb-5 text-2xl">Book Catalog</h1>
                        <p className="text-sm text-base-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam amet esse vel officiis rerum ullam accusamus sit, iure ratione ab deleniti, dolores ut,</p>
                    </div>
                    <div className="footer grid-cols-2 mt-5 sm:mt-0">
                        <div>
                            <span className="footer-title">Company</span>
                            <a className="link link-hover">About us</a>
                            <a className="link link-hover">Contact</a>
                            <a className="link link-hover">Jobs</a>
                            <a className="link link-hover">Press kit</a>
                        </div>
                        <div>
                            <span className="footer-title">Legal</span>
                            <a className="link link-hover">Terms of use</a>
                            <a className="link link-hover">Privacy policy</a>
                            <a className="link link-hover">Cookie policy</a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 content-center text-center">
                    <div className="form-control mx-auto w-full sm:w-80">
                        <label className="label">
                            <span className="label-text">Enter your email address</span>
                        </label>
                        <div className="relative">
                            <input type="text" placeholder="username@site.com" className="input input-bordered w-full pr-16" />
                            <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">Subscribe</button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
