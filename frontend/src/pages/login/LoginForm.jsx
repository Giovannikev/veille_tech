import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { login, reset, getUserInfo } from '../../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from "../../components/widgets/Spinner"

export function LoginForm() {

    const [formData, setFormData] = useState({
        "email": "",
        "password": "",
    });
    const { email, password } = formData

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }
        dispatch(login(userData))
    }


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate("/")
        }

        dispatch(reset());
        dispatch(getUserInfo())

    }, [isError, isSuccess, user, navigate, dispatch]);



    return (
        <>
            <div className="login-header">
                <h1>Connexion</h1>
                <p>Accédez à votre compte</p>
                {isLoading && <Spinner />}

            </div>
            <form className="login-form" onSubmit={handleSubmit}>
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
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password"
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                        value={password}
                        required
                    />                </div>
                <button type="submit" className="login-btn" onClick={handleSubmit}>Se connecter</button>
                <div className="forgot-password">
                    <Link to={`/reset_password`}>Mot de passe oublié ?</Link>
                </div>
            </form>
            <div className="signup-link">
                <p>Pas de compte ?<Link to={`/signup`}>Inscrivez-vous</Link> </p>
            </div>
        </>
    );
}

