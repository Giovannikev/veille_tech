import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { activate, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import Spinner from '../../components/widgets/Spinner';
import "./css/ActivatePage.css"
const ActivatePage = () => {


    const { uid, token } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const handleSubmit = (e) => {
        e.preventDefault()

        const userData = {
            uid,
            token
        }
        dispatch(activate(userData))
        toast.success("Your account has been activated! You can login now")
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            navigate("/login")
        }

        dispatch(reset())

    }, [isError, isSuccess, navigate, dispatch])


    return (
        <div>
            <div className="activate-container">
                <h2 className='title'>Bienvenue sur Ikaly</h2>
                {isLoading && <Spinner />}
                <div className='activate-button'><button className="sm-button button-bg" type="submit" onClick={handleSubmit}>Activater mon compte</button></div>
            </div>
        </div>
    )
}

export default ActivatePage