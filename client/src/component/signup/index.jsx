import styles from './styles.module.css';
import {Link,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Signup= ()=>{

    const [data,setData] = useState({
        name:"",
        phonenumber:"",
        password:""
    })

    const [error,setError] = useState("")

    const navigate = useNavigate();

    const handleChange= ({currentTarget:input}) =>{
        setData({...data,[input.name]:input.value});
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const url ="http://localhost:8000/users/add-user"
            const {data:res} = await axios.post(url,data);
            navigate("/login")
            console.log(res.message);

        }
        catch(error){
            if(error.response && error.response.status >= 400 && error.response.status <= 500){
                    setError(error.response.data.message);
            }
        }
    }

return (
    <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
        <div className={styles.left}>
            <h1>Welcome Back</h1>
           <Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sing in
						</button>
					</Link>
            </div>
            <div className={styles.right}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <input
                type="text"
                placeholder='Enter Your Name'
                name='name'
                onChange={handleChange}
                value={data.name}
                required
                className={styles.input}
                />
                <input
                type="number"
                placeholder='Enter Your Phone Number'
                name='phonenumber'
                onChange={handleChange}
                value={data.phonenumber}
                required
                className={styles.input}
                />
                <input
                type="password"
                placeholder='Enter Your Password'
                name='password'
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
                />
        {error && <div className={styles.error_msg}>{error}</div>}
                <button type='submit' className={styles.green_btn}>
                    Sign up
                </button>

            </form>
            </div>
        </div>
    </div>
)


}

export default Signup;