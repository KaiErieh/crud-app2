import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { useEffect } from "react"

export const AuthGU = ({ el }) => {
    const navigate = useNavigate();
    const { guest } = useSelector((state) => state.guest)
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user && !guest) {

            navigate('/')
        }


    }, [user, guest, navigate, el])

    return (el)

}
export const AuthU = ({ el }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user) {

            navigate('/')


        }


    }, [user, navigate, el])
    return (el)
}


const Auth = {
    AuthGU,
    AuthU,
}

export default Auth