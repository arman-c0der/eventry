import { registerUser } from "../../app/actions";

const RegistrationForm = () => {
    return (
        <form
            action={registerUser}
            className="max-w-md mx-auto bg-gray-800 p-6 rounded-xl shadow-lg space-y-4"
        >
            <h2 className="text-2xl font-bold text-white text-center">
                Register Account
            </h2>

            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-200 mb-1"
                >
                    Full Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-200 mb-1"
                >
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-200 mb-1"
                >
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-200 mb-1"
                >
                    Phone Number
                </label>
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-200 mb-1"
                >
                    Bio
                </label>
                <textarea
                    name="bio"
                    id="bio"
                    rows="4"
                    className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                ></textarea>
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
            >
                Register
            </button>
        </form>
    );
};

export default RegistrationForm;