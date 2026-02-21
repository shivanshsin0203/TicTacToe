import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router";
function Login() {
    const navigate=useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    async function handleSubmit():Promise<void> {
        try {
         const res=await axios.post("http://localhost:3001/login",{email,password})
         console.log(res.data);
         if(res.data.status===200){
            localStorage.setItem("token",res.data.token);
            toast.success(res.data.message);
            navigate("/dashboard")
         }
         else{
            toast.error(res.data.message);
         }
        } catch (error) {
            console.log(error);
            toast.error("Login failed");
        }
    }
    return (
        <div className="flex flex-col justify-center">
            <h1 className=" font-extrabold text-2xl p-2 gap-y-6">Login</h1>
            <div className=" flex justify-center items-center p-2 gap-y-5">
                <input type="text" placeholder="Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <Toaster />
        </div>
    );
}

export default Login;
