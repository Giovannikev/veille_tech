import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../../features/auth/authSlice'
import Spinner from "../../components/widgets/Spinner"

export function ResetForm() {

    const [formData, setFormData] = useState({
        "email": "",
    });

    const { email } = formData;

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email
        }
        dispatch(resetPassword(userData))
    }
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            navigate("/")
            toast.success("A reset password email has been sent to you.")
        }
    }, [isError, isSuccess, message, navigate, dispatch])


    return (
        <>
            <div className="login-header">
                <h1>Reset Password</h1>
                {isLoading && <Spinner />}
            </div>
            <form className="login-form" >
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleChange}
                        name="email"
                        required />
                </div>
                <button type="submit" className="login-btn" onClick={handleSubmit}>Envoyer</button>
            </form>

        </>
    );
}

