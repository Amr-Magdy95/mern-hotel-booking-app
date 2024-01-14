import { Link } from "react-router-dom"

const Header = () => {
    return (
        <div className="bg-blue-800 text-white py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">Hotel App</Link>
                </span>
                <span className="flex space-x-2 ">
                    <Link to="/signin" className="flex items-center bg-white text-blue-600 px-3 font-bold hover:bg-gray-200">Sign in</Link>
                </span>
            </div>
        </div>
    )
}

export default Header