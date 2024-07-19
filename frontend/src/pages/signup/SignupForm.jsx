import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from '../../features/auth/authSlice'
import Spinner from "../../components/widgets/Spinner"
import React, { useEffect, useState } from 'react';
import Loader from '../../components/widgets/Loader';
export function SignupForm() {
    const [formData, setFormData] = useState({
        "first_name": "",
        "last_name": "",
        "email": "",
        "password": "",
        "re_password": "",

    });

    const { first_name, last_name, email, password, re_password } = formData

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        })
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== re_password) {
            toast.error("Passwords do not match")
        } else {
            const userData = {
                first_name,
                last_name,
                email,
                password,
                re_password,

            }
            dispatch(register(userData))
        }
    }
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate("/")
            toast.success("An activation email has been sent to your email. Please check your email")
        }
        dispatch(reset());

    }, [isError, isSuccess, user, navigate, dispatch])
    return (
        <>
            {isLoading && <Loader />}
            <form className="signup-form">
                <div className="form-group">
                    <label htmlFor="first_name">Nom</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder='Joe'
                        onChange={handleChange}
                        value={first_name}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Prénoms</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder='Doe'
                        onChange={handleChange}
                        value={last_name}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Adresse e-mail</label>
                    <input
                        type="email"
                        id="email"
                        onChange={handleChange}
                        value={email}
                        name="email"
                        placeholder="joedoe@gmail.com"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        onChange={handleChange}
                        value={password}
                        name="password"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Resaissir mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        onChange={handleChange}
                        value={re_password}
                        name="re_password"
                        required
                    />
                </div>

                <button type="submit" className="signup-btn" onClick={handleSubmit}>S'inscrire</button>
            </form>
            <div className="login-link">

                <p>Déjà membre ? <Link to={`/login`}>Connectez-vous</Link>
                </p>
            </div>
        </>
    );
}