/* eslint-disable react-hooks/exhaustive-deps */
import {  useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCarsSale } from "../../context/CarsSaleContext";
import { useEffect } from "react";

function CarsSaleFormPage() {

  const {register,setValue, handleSubmit, formState: { errors } } = useForm();
  const {createCarSale, getCarSale, updateCarSale } = useCarsSale();
  const navigate = useNavigate();
  const params = useParams();


  useEffect(() => {
    async function loadCar() {
       if(params.id) {
         const carSale = await getCarSale(params.id);
         console.log(carSale);
         setValue('brand', carSale.brand);
        setValue('model', carSale.model);
        setValue('year', carSale.year);
        setValue('image', carSale.image);
        setValue('license_plate_number', carSale.license_plate_number);
        setValue('color', carSale.color);
        setValue('price', carSale.price);
        setValue('description',carSale.description);
        setValue('transmission',carSale.transmission);
        setValue('fuel',carSale.fuel);
        setValue('seats',carSale.seats);
        setValue('engine',carSale.engine);
        setValue('mileage',carSale.mileage);
       }
     }
     loadCar()
   },[])

  const onSubmit = handleSubmit(async(data) => {
    const { brand, model, year, image, license_plate_number, color, price, description, transmission, fuel, seats, engine, mileage} = data;
    const carSaleData = { 
      brand, 
      model, 
      year, 
      image: image[0], 
      license_plate_number, 
      color, 
      price, 
      description, 
      transmission, 
      fuel, 
      seats, 
      engine, 
      mileage
    };

    if (params.id) {
      updateCarSale(params.id, carSaleData);
    }else {
      createCarSale(carSaleData);
    }
    navigate('/my-cars-sale');
  });
  return (
    <section className="content">
            <div className="container-center lg animated slideInDown">
                <div className="view-header">
                    <div className="header-icon">
                        <i className="pe page-header-icon pe-7s-car"></i>
                    </div>
                    <div className="header-title">
                        <h3>Register New Car for Sale</h3>
                        <small>
                            Por favor ingrese todos los datos para registrar un auto para alquilarlo.
                        </small>
                    </div>
                </div>


                <div className="panel panel-filled">
                  <div className="panel-body">
                    <form onSubmit={onSubmit}>

                    <div className="form-group col-lg-4">
                        <label className="control-label">Brand</label>
                        <input type="text" className="form-control" placeholder="Ingresar brand"
                          {...register("brand", { required: true })} />
                        <span className="help-block small">Your unique brand to app</span>
                        {errors.brand && (
                            <p className="text-red-500">Brand is required!</p>            
                        )}
                      </div>

                      <div className="form-group col-lg-4">
                        <label className="control-label">Model</label>
                        <input type="text" className="form-control" placeholder="Ingresar model"
                          {...register("model", { required: true })} />
                        <span className="help-block small">Your unique model to app</span>
                        {errors.model && (
                            <p className="text-red-500">Model is required!</p>            
                        )}
                      </div>

                      <div className="form-group col-lg-4">
                        <label className="control-label">Year</label>
                        <input type="date" className="form-control"
                          {...register("year", { required: true })} />
                        <span className="help-block small">Your unique year to app</span>
                        {errors.year && (
                            <p className="text-red-500">Year is required!</p>            
                        )}
                      </div>


                      <div className="form-group col-lg-4">
                        <label className="control-label">N° Placa</label>
                        <input type="text" className="form-control" placeholder="Ingresar la placa del auto"
                          {...register("license_plate_number", { required: true })} />
                        <span className="help-block small">Your unique N° Placa to app</span>
                        {errors.license_plate_number   && (
                            <p className="text-red-500">N° Placa is required!</p>            
                        )}
                      </div>

                      <div className="form-group col-lg-3">
                        <label className="control-label">Color</label>
                        <input type="text" className="form-control" placeholder="Color del auto"
                          {...register("color", { required: true })} />
                        <span className="help-block small">Your unique color to app</span>
                        {errors.color   && (
                            <p className="text-red-500">Color is required!</p>            
                        )}
                      </div>


                      <div className="form-group col-lg-2">
                        <label className="control-label">Asientos</label>
                        <input type="number" className="form-control" placeholder="Capacidad"
                          {...register("seats", { required: true })} />
                        <span className="help-block small">Your unique seats</span>
                        {errors.seats   && (
                            <p className="text-red-500">Seats is required!</p>            
                        )}
                      </div>

                      <div className="form-group col-lg-3">
                        <label className="control-label">Transmisión</label>
                        <input type="text" className="form-control" placeholder="Transmisión del auto."
                          {...register("transmission", { required: true })} />
                        <span className="help-block small">Your unique transmission</span>
                        {errors.transmission   && (
                            <p className="text-red-500">Transmission is required!</p>            
                        )}
                      </div>

                      <div className="form-group col-lg-3">
                        <label className="control-label">Price</label>
                        <input type="number" className="form-control" placeholder="Ingresar price"
                          {...register("price", { required: true })}/>
                        <span className="help-block small">Your unique price to app</span>
                        {errors.price && (
                            <p className="text-red-500">Price is required!</p>            
                        )}
                      </div>

                      <div className="form-group col-lg-3">
                        <label className="control-label">Kilometraje</label>
                        <input type="number" className="form-control" placeholder="Ingresar mileage"
                          {...register("mileage", { required: true })}/>
                        <span className="help-block small">Your unique mileage to app</span>
                        {errors.mileage && (
                            <p className="text-red-500">Mileage is required!</p>            
                        )}
                      </div>

                      <div className="form-group col-lg-3">
                        <label className="control-label">Motor</label>
                        <input type="text" className="form-control" placeholder="Ingresar el motor"
                          {...register("engine", { required: true })}/>
                        <span className="help-block small">Your unique engine to app</span>
                        {errors.engine && (
                            <p className="text-red-500">Engine is required!</p>            
                        )}
                      </div>

                      <div className="form-group col-lg-3">
                        <label className="control-label">Combustible</label>
                        <input type="text" className="form-control" placeholder="Ingresar el fuel."
                          {...register("fuel", { required: true })}/>
                        <span className="help-block small">Your unique fuel to app</span>
                        {errors.fuel && (
                            <p className="text-red-500">Fuel is required!</p>            
                        )}
                      </div>
                      <div className="form-group ">
                        <label className="control-label">Description</label>
                        <textarea type="text" rows="3" className="form-control" placeholder="Ingresar description" 
                            {...register("description", { required: true })}/>
                        <span className="help-block small">Your unique description to app</span>
                        {errors.description && (
                            <p className="text-red-500">Description is required!</p>            
                        )}
                      </div>
                      
                      <div className="form-group">
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
                              <Link className="btn btn-w-md btn-warning" to="/my-cars-sale">Cancelar</Link>
                          </div>
                      </div>    
                    </form>
                  </div>
                </div>
            </div>
        </section>
  )
}

export default CarsSaleFormPage