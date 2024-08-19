import {Navigate, Outlet} from "react-router-dom"
import {useContext} from "react"
import AuthContext from "../context/AuthContext"


const PrivateRoute = () => {
    let {user} = useContext(AuthContext)
    return (!user ? <Navigate to="/signin" /> : <Outlet/> )
}

export default PrivateRoute