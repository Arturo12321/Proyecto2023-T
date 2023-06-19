/* eslint-disable react-hooks/exhaustive-deps */

import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();
  
  const onSubmit = handleSubmit(async(values) => {
    signup(values);
})
  
  useEffect(() => {
    if (isAuthenticated) navigate("/login"); 
  },[isAuthenticated])

  return (
    <section className="content">
        <div className="container-center animated slideInDown">
            <div className="view-header">
                <div className="header-icon">
                    <i className="pe page-header-icon pe-7s-unlock"></i>
                </div>
                <div className="header-title">
                    <h3>Register</h3>
                    <small>
                        Por favor ingrese sus credenciales para registrarse.
                    </small>
                </div>
            </div>
            <div className="panel panel-filled">
                <div className="panel-body">
                    {
                      registerErrors.map((error, i) =>  (
                        <div className="bg-red-500 p-2 text-white text-center my-2" key={i}> 
                          {error}
                        </div>
                      ))
                    }
                    <form onSubmit={onSubmit}>
                      <div className="form-group">
                      <label className="control-label">Username</label>  
                        <input type="text" {...register('username', {required: true})} 
                          className="form-control" 
                          placeholder="Username" />
                          <span className="help-block small">Your unique username to app</span>
                          {errors.username && (
                            <p className="text-red-500">Username is required!</p>            
                          )}
                      </div> 
                      <div className="form-group">
                        <label className="control-label">Email</label>
                        <input type="email" {...register('email', {required: true})}
                          className="form-control"
                          placeholder="Example@gmail.com" />
                          <span className="help-block small">Your address email to contact</span>
                          {errors.email && (
                            <p className="text-red-500">Email is required!</p>            
                          )}
                          
                      </div>        
                      <div className="form-group">
                        <label className="control-label">Password</label>  
                        <input type="password"  {...register('password', {required: true})} 
                          className="form-control" 
                          placeholder="*********"/>
                          <span className="help-block small">Your strong password</span>
                          {errors.password && (
                            <p className="text-red-500">Password is required!</p>            
                          )}                  
                      </div> 
                      <div>
                          <button className="btn btn-accent" type="submit">Register</button>
                          <Link className="btn btn-default" to="/login">Sign In</Link> 
                      </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
  )
}

export default RegisterPage
