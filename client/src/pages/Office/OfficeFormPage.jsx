/* eslint-disable react-hooks/exhaustive-deps */
import {  useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useOffices } from "../../context/OfficesContext";
import { useEffect } from "react";
function OfficeFormPage() {
  const {register,setValue, handleSubmit, formState: { errors } } = useForm();
  const {createOffice, getOffice, updateOffice } = useOffices();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadCar() {
       if(params.id) {
         const office = await getOffice(params.id);
          console.log(office);
          setValue('name', office.name);
          setValue('address', office.address);
          setValue('city', office.city);
          setValue('country', office.country);
          setValue('phone', office.phone);
          setValue('email', office.email);
          setValue('latitude', office.latitude);
          setValue('longitude',office.longitude);
          setValue('image',office.image);
       }
     }
     loadCar()
   },[])

   const onSubmit = handleSubmit(async(data) => {
    const { name, address, city, country, phone, email, latitude, longitude, image} = data;
    const carSaleData = { 
      name, 
      address, 
      city, 
      country, 
      phone, 
      email, 
      latitude, 
      longitude, 
      image: image[0]
    };

    if (params.id) {
      updateOffice(params.id, carSaleData);
    }else {
      createOffice(carSaleData);
    }
    navigate('/my-offices');
  });
  return (
    <section className="content">
            <div className="container-center md animated slideInDown">
                <div className="view-header">
                    <div className="header-icon">
                        <i className="fa fa-building"></i>
                    </div>
                    <div className="header-title">
                        <h3>Register New Office</h3>
                        <small>
                            Por favor ingrese todos los datos para registrar una oficina.
                        </small>
                    </div>
                </div>


                <div className="panel panel-filled">
                  <div className="panel-body">
                    <form onSubmit={onSubmit}>

                      <div className="form-group col-lg-6">
                        <label className="control-label">Name</label>
                        <input type="text" className="form-control" placeholder="Ingresar name"
                          {...register("name", { required: true })} />
                        <span className="help-block small">Your unique name to app</span>
                        {errors.name && (
                            <p className="text-red-500">Name is required!</p>            
                        )}
                      </div>

                      <div className="form-group col-lg-6">
                        <label className="control-label">Address</label>
                        <input type="text" className="form-control" placeholder="Ingresar address"
                          {...register("address", { required: true })} />
                        <span className="help-block small">Your unique address to app</span>
                        {errors.address && (
                            <p className="text-red-500">Address is required!</p>            
                        )}
                      </div>

                      <div className="form-group col-lg-4">
                        <label className="control-label">City</label>
                        <input type="text" className="form-control" placeholder="Ingresar city"
                          {...register("city", { required: true })} />
                        <span className="help-block small">Your unique city to app</span>
                        {errors.city && (
                            <p className="text-red-500">City is required!</p>            
                        )}
                      </div>

                      <div className="form-group col-lg-4">
                        <label className="control-label">Country</label>
                        <input type="text" className="form-control" placeholder="Ingresar la pais"
                          {...register("country", { required: true })} />
                        <span className="help-block small">Your unique country to app</span>
                        {errors.country  && (
                            <p className="text-red-500">Country is required!</p>            
                        )}
                      </div>

                      <div className="form-group col-lg-4">
                        <label className="control-label">Phone</label>
                        <input type="number" className="form-control" placeholder="Phone de la oficina"
                          {...register("phone", { required: true })} />
                        <span className="help-block small">Your unique phone to app</span>
                        {errors.phone   && (
                            <p className="text-red-500">Phone is required!</p>            
                        )}
                      </div>

                      <div className="form-group col-lg-12">
                        <label className="control-label">Email</label>
                        <input type="email" className="form-control" placeholder="user@example.com"
                          {...register("email", { required: true })} />
                        <span className="help-block small">Your unique email</span>
                        {errors.email   && (
                            <p className="text-red-500">Email is required!</p>            
                        )}
                      </div>

                      <div className="form-group col-lg-6">
                        <label className="control-label">Latitude</label>
                        <input type="number" className="form-control" placeholder="Ingrese la latitud ." step="any"
                          {...register("latitude", { required: true })} />
                        <span className="help-block small">Your unique latitude</span>
                        {errors.latitude   && (
                            <p className="text-red-500">Latitude is required!</p>            
                        )}
                      </div>

                      <div className="form-group col-lg-6">
                        <label className="control-label">Longitude</label>
                        <input type="number" className="form-control" placeholder="Ingresar la longitud" step="any"
                          {...register("longitude", { required: true })}/>
                        <span className="help-block small">Your unique longitude to app</span>
                        {errors.longitude && (
                            <p className="text-red-500">Longitude is required!</p>            
                        )}
                      </div>
                      
                      <div className="form-group col-lg-12">
                      <label className="control-label">Image</label>
                      <input type="file" className="form-control" placeholder="Ingresar imagen"
                          {...register("image", { required: true })}/>   
                      {errors.image && (
                            <p className="text-red-500">Image is required!</p>            
                      )}
                      </div>
                      <div  className="col-sm-12 text-right">
                          <div className="panel-body buttons-margin">
                              <button type="submit" className="btn btn-w-md btn-success">Guardar</button>&nbsp;&nbsp;
                              <Link className="btn btn-w-md btn-warning" to="/my-offices">Cancelar</Link>
                          </div>
                      </div>    
                    </form>
                  </div>
                </div>
            </div>
        </section>
  )
}

export default OfficeFormPage;