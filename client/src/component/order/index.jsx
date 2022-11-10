import styles from './styles.module.css';
 import {Link,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const AddOrder= ()=>{

    const [data,setData] = useState({
        sub_total:"",
        phonenumber:"",
      
    })

    const [error,setError] = useState("")

    const navigate = useNavigate();

    const handleChange= ({currentTarget:input}) =>{
        setData({...data,[input.name]:input.value});
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const user_id=localStorage.getItem("user_id");
        try{
            const url =`http://localhost:8000/Order/add-order/:id=${JSON.parse(user_id)}`
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
            <h1>Add Order</h1>
           
            </div>
            <div className={styles.right}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <input
                type="text"
                placeholder='Enter Your Sub Total'
                name='sub_total'
                onChange={handleChange}
                value={data.sub_total}
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
               
        {error && <div className={styles.error_msg}>{error}</div>}
                <button type='submit' className={styles.green_btn}>
                    Add Order
                </button>

            </form>
            </div>
        </div>
    </div>
)


}

export default AddOrder;