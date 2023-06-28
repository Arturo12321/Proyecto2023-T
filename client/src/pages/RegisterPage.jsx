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
    <section className="content ">
        <div className="container-center lg animated slideInDown">
            <div className="view-header">
                <div className="header-icon">
                    <i className="pe page-header-icon pe-7s-add-user"></i>
                </div>
                <div className="header-title">
                    <h3>Register</h3>
                    <small>
                      Please enter your data to register.
                    </small>
                </div>
            </div>

            <div className="panel panel-filled">
                <div className="panel-body">
                    {
                      registerErrors.map((error, i) =>  (
                        <div className="bg-red-500 p-2 text-red-600 text-center my-2" key={i}> 
                          {error}
                        </div>
                      ))
                    }
                    <form onSubmit={onSubmit}>

                      <div className="form-group col-lg-6">
                        <label className="control-label">Username</label>  
                          <input type="text" {...register('username', {required: true})} 
                            className="form-control" 
                            placeholder="Username" />
                            <span className="help-block small">Your unique username to app</span>
                            {errors.username && (
                              <p className="text-red-500">Username is required!</p>            
                            )}
                      </div> 

                      <div className="form-group col-lg-6">
                        <label className="control-label">Nombre de Empresa</label>  
                          <input type="text" {...register('company_name', {required: true})} 
                            className="form-control" 
                            placeholder="Nombre de Empresa" />
                            <span className="help-block small">Your unique company to app</span>
                            {errors.company_name && (
                              <p className="text-red-500">Nombre de Empresa is required!</p>            
                            )}
                      </div> 

                      <div className="form-group col-lg-6">
                        <label className="control-label">Nombres</label>  
                          <input type="text" {...register('firstname', {required: true})} 
                            className="form-control" 
                            placeholder="Nombres Completos" />
                            <span className="help-block small">Your unique firstname to app</span>
                            {errors.firstname && (
                              <p className="text-red-500">First Name is required!</p>            
                            )}
                      </div> 

                      <div className="form-group col-lg-6">
                        <label className="control-label">Apellidos</label>  
                          <input type="text" {...register('lastname', {required: true})} 
                            className="form-control" 
                            placeholder="Apellidos Completos" />
                            <span className="help-block small">Your unique lastname to app</span>
                            {errors.lastname && (
                              <p className="text-red-500">Last Name is required!</p>            
                            )}
                      </div> 

                      <div className="form-group col-lg-4">
                        <label className="control-label">DNI O PASAPORTE</label>  
                          <input type="text" {...register('dni', {required: true})} 
                            className="form-control" 
                            placeholder="Documento de Identificacion" />
                            <span className="help-block small">Your unique dni to app</span>
                            {errors.dni && (
                              <p className="text-red-500">DNI O PASAPORTE is required!</p>            
                            )}
                      </div> 

                      <div className="form-group col-lg-4">
                      <label className="control-label">RUC</label>  
                        <input type="text" {...register('ruc', {required: true})} 
                          className="form-control" 
                          placeholder="RUC" />
                          <span className="help-block small">Your unique ruc to app</span>
                          {errors.ruc && (
                            <p className="text-red-500">RUC is required!</p>            
                          )}
                      </div> 

                      <div className="form-group col-lg-4">
                        <label className="control-label">Telefono</label>  
                          <input type="number" {...register('cell_phone', {required: true})} 
                            className="form-control" 
                            placeholder="Telefono" />
                            <span className="help-block small">Your unique telefono to app</span>
                            {errors.cell_phone && (
                              <p className="text-red-500">Telefono is required!</p>            
                            )}
                      </div> 

                      <div className="form-group col-lg-6">
                        <label className="control-label">Fecha de Nacimiento</label>  
                          <input type="date" {...register('birth_date', {required: true})} 
                            className="form-control" 
                            placeholder="Fecha de Nacimiento" />
                            <span className="help-block small">Your unique birth date to app</span>
                            {errors.birth_date && (
                              <p className="text-red-500">Birth date is required!</p>            
                            )}
                      </div> 

                      <div className="form-group col-lg-6">
                        <label className="control-label">Direccion</label>
                        <input type="text" {...register('address', {required: true})}
                          className="form-control"
                          placeholder="Ingrese su direccion" />
                          <span className="help-block small">Your address</span>
                          {errors.address && (
                            <p className="text-red-500">Adress is required!</p>            
                          )}
                      </div>

                      <div className="form-group col-lg-6">
                        <label className="control-label">Email</label>
                        <input type="email" {...register('email', {required: true})}
                          className="form-control"
                          placeholder="Example@gmail.com" />
                          <span className="help-block small">Your address email to contact</span>
                          {errors.email && (
                            <p className="text-red-500">Email is required!</p>            
                          )}
                          
                      </div>         

                      <div className="form-group col-lg-6">
                        <label className="control-label">Password</label>  
                        <input type="password"  {...register('password', {required: true})} 
                          className="form-control" 
                          placeholder="*********"/>
                          <span className="help-block small">Your strong password</span>
                          {errors.password && (
                            <p className="text-red-500">Password is required!</p>            
                          )}                  
                      </div> 

                      <div  className="col-sm-12 text-center">              
                        <div className="panel-body buttons-margin"> 
                          <button className="btn btn-w-md  btn-primary" type="submit">Register</button>&nbsp;&nbsp;
                          <Link className="btn btn-w-md  btn-success" to="/login" >Login</Link> 
                        </div>
                      </div>
                        
                    </form>
                    
                </div>
            </div>
        </div>
    </section>
  )
}

export default RegisterPage
