/* eslint-disable react-hooks/exhaustive-deps */

import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import {  Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
    const {signin, errors: signinErrors, isAuthenticated } = useAuth();

    const { 
        register, 
        handleSubmit, 
        formState: {errors}, 
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = handleSubmit ((data) => {
        signin(data);
    });
    useEffect(() => {
        if (isAuthenticated) navigate("/cars-rent"); 
      }, [isAuthenticated]);
    return (
        <section className="content">
            <div className="container-center animated slideInDown">
                <div className="view-header">
                    <div className="header-icon">
                        <i className="pe page-header-icon pe-7s-unlock"></i>
                    </div>
                    <div className="header-title">
                        <h3>Login</h3>
                        <small>
                            Por favor ingrese sus credenciales para ingresar.
                        </small>
                    </div>
                </div>
                <div className="panel panel-filled">
                    <div className="panel-body">
                        {
                        signinErrors.map((error, i) =>  (
                            <div className="bg-red-500 p-2 text-white text-center my-2" key={i}> 
                            {error}
                            </div>
                        ))
                        }

                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label className="control-label">Email</label>
                                <input type="email" {...register('email', {required: true})}
                                    className="form-control"
                                    placeholder="Example@gmail.com" />

                                {errors.email && (
                                    <p className="text-red-500">Email is required!</p>            
                                )}

                            </div>
                            <div className="form-group">
                                <label className="control-label">Password</label>
                                <input type="password"  {...register('password', {required: true})} 
                                    className="form-control" 
                                    placeholder="********"/>

                                {errors.password && (
                                    <p className="text-red-500">Password is required!</p>            
                                )}     
                            </div>
                            <div  className="col-sm-12 text-center">              
                                <div className="panel-body buttons-margin"> 
                                    <button className="btn btn-w-md  btn-primary" type="submit">Sign In</button>&nbsp;&nbsp;
                                    <Link className="btn btn-w-md  btn-success" to="/register" >Register</Link> 
                                </div>
                            </div>   
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default LoginPage;