import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import InputForm from "../../components/shared/InputForm";
import { registerUser } from "../../redux/actions/authAction";
import { emptyData } from '../../redux/reducers/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const auth = useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is mendatory')
      .min(6, 'Password must be at 6 char long'),
    confirmPassword: Yup.string()
      .required('Password is mendatory')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  })
  const formOptions = { resolver: yupResolver(formSchema) }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);
  useEffect(()=>{
    if(auth?.data?.user){
      navigate('/login');
      toast.success(auth?.data?.message)
      dispatch(emptyData())
    }
  },[auth?.data, navigate, dispatch])
  const onSubmit = (data) => {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      mobile: data.mobile
    };
    dispatch(registerUser(newUser));
  };
  if(auth?.error.message){
    toast.error(auth?.error.message)
  }
  
  return (
    <div className="flex flex-col items-center">
        <h3 className="text-xl underline font-thin">Get Membership</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>
          <InputForm
            type="text"
            placeholder="Input Your Name"
            register={register}
            name="name"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Email</span>
          </label>
          <InputForm
            type="email"
            placeholder="Input Your Email"
            register={register}
            name="email"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Password</span>
          </label>
          <InputForm
            type="password"
            placeholder="Input Your Password"
            register={register}
            name="password"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <InputForm
            type="password"
            placeholder="Type Password Again"
            register={register}
            name="confirmPassword"
          />
          <div className="text-xl text-red-500">{errors.confirmPassword?.message}</div>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Mobile</span>
          </label>
          <InputForm
            type="text"
            placeholder="Input Your Mobile Number"
            register={register}
            name="mobile"
          />
        </div>
        <input
          type="submit"
          className="btn btn-secondary mt-2"
          value="Register"
        />
      </form>
      <p>
        Already A Member? <Link to="/login">Login Here</Link>
      </p>
    </div>
  );
};

export default Register;
