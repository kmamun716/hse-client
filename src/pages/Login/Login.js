import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputForm from "../../components/shared/InputForm";
import { loginUser } from "../../redux/actions/authAction";

const Login = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const token = localStorage.getItem('authToken');
  const auth = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  let from = location.state?.from?.pathname || "/";
    const { register, handleSubmit, formState: { errors } } = useForm();
    useEffect(()=>{
      if(token){
        navigate(from, { replace: true });
        toast.success(auth?.data.message)
      }
    },[from, navigate, token, auth?.data])
  const onSubmit = data => {
    dispatch(loginUser(data))
  };
  if(auth?.error.message){
    toast.error(auth?.error.message)
  }
  return (
    <div className="flex flex-col items-center">
    <h3 className="text-xl underline font-thin">Login Here</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <InputForm
             type="email" 
             placeholder="Input Your Email" 
             register={register}
             name='email'
            />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <InputForm
             type="password" 
             placeholder="Input Your Password" 
             register={register}
             name='password'
            />
        </div>
        <input type="submit" className="btn btn-primary mt-2" value="Login"/>
      </form>
      <p>Not Have Any Account? <Link to='/register'>Register Here</Link></p>
    </div>
  );
};

export default Login;
