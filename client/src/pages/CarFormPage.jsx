/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCars } from "../context/CarsContext";
function CarFormPage() {
  
  const {register, handleSubmit, formState: { errors } } = useForm();
  const { createCar } = useCars();
  
  const onSubmit = handleSubmit(async(data) => {
    const { model, brand, description, price, image } = data;
    const carData = {
      model,
      brand,
      description,
      price,
      image: image[0], // Accede al archivo seleccionado correctamente
    };
    createCar(carData);

  });

  return (
    <section className="content">
            <div className="container-center animated slideInDown">
                <div className="view-header">
                    <div className="header-icon">
                        <i className="pe page-header-icon pe-7s-car"></i>
                    </div>
                    <div className="header-title">
                        <h3>Register New Car</h3>
                        <small>
                            Por favor ingrese todos los datos para registrar.
                        </small>
                    </div>
                </div>
                <div className="panel panel-filled">
                  <div className="panel-body">
                    <form onSubmit={onSubmit}>
                      

                      <div className="form-group">

                        <label className="control-label">Model</label>

                        <input type="text" className="form-control" placeholder="Ingresar model"
                          {...register("model", { required: true })} />

                        <span className="help-block small">Your unique model to app</span>

                        {errors.model && (
                            <p className="text-red-500">Model is required!</p>            
                        )}
                        
                      </div>

                      <div className="form-group">

                        <label className="control-label">Brand</label>

                        <input type="text" className="form-control" placeholder="Ingresar brand"
                          {...register("brand", { required: true })} />

                        <span className="help-block small">Your unique brand to app</span>

                        {errors.brand && (
                            <p className="text-red-500">Brand is required!</p>            
                        )}

                      </div>

                      <div className="form-group">
                        <label className="control-label">Description</label>
                        <textarea type="text" rows="5" className="form-control" placeholder="Ingresar description" 
                            {...register("description", { required: true })}/>

                        <span className="help-block small">Your unique description to app</span>

                        {errors.description && (
                            <p className="text-red-500">Description is required!</p>            
                        )}
                      </div>

                      <div className="form-group">

                        <label className="control-label">Price</label>
                        <input type="number" className="form-control" placeholder="Ingresar price"
                          {...register("price", { required: true })}/>

                        <span className="help-block small">Your unique price to app</span>

                        {errors.price && (
                            <p className="text-red-500">Price is required!</p>            
                        )}

                      </div>

                      <div className="form-group">
                      <label className="control-label">Image</label>
                      <input type="file" className="form-control" placeholder="Ingresar image"
                          {...register("image", { required: true })}/>
                          
                      {errors.image && (
                            <p className="text-red-500">Image is required!</p>            
                      )}
                      
                      </div>
                      <div  className="col-sm-12 text-right">
                          <div className="panel-body buttons-margin">
                              <button type="submit" className="btn btn-w-md btn-success">Guardar</button>&nbsp;&nbsp;
                              <Link className="btn btn-w-md btn-warning" to="/cars">Cancelar</Link>
                          </div>
                      </div>    
                      
                    </form>

                  </div>
                </div>
            </div>
        </section>
  )
}

export default CarFormPage;