/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useCars } from "../context/CarsContext";
import {  Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function CarsPage() {
    const { user } = useAuth();
    const { deleteCar, getCars, cars } = useCars();

    useEffect(() => {
        getCars();
    }, []);

    if (cars.length === 0) return (
        <section className="content">
            <div className="container-center md animated slideInDown">

                <div className="view-header">
                    <div className="header-icon">
                        <i className="pe page-header-icon pe-7s-close-circle"></i>
                    </div>
                    <div className="header-title">
                        <h1>No hay autos . . .</h1>
                    </div>
                </div>
                <div className="panel panel-filled">
                    <div className="panel-body">
                        Hola {user.username}, en esta pagina no hay autos, puedes actualizar la pagina o puedes volver dentro de un momento. 
                    </div>
                    <div className="panel-body">
                        Disculpa.. 
                    </div>
                </div>
                <div>
                    <Link to="/add-car" className="btn btn-accent">CREAR NUEVO AUTO</Link>
                </div>
            </div>
        </section>
    );
  

  return (
    <section className="content">
        <div className="container-fluid">
            <div className="row m-t-sm">
                <div className="col-md-15">
                    <div className="panel">
                        <div className="panel-body">
                            <div className="col-md-12 col-sm-12" id="list_alumnos">
                                <div className="panel panel-filled">
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <h5 className="m-t-xs">Car Registrados</h5>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 text-right">
                                                <div className="panel-body buttons-margin">
                                                    <Link id="btnNuevo" className="btn btn-w-md btn-info"
                                                        to="/add-car">Nuevo Car</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-hover table-striped" >
                                                <thead >
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Model</th>
                                                        <th>Marca</th>
                                                        <th>Descripcion</th>
                                                        <th>Precio</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cars.map((car) => (
                                                        <tr key={car._id}>
                                                            <td>{car._id}</td>
                                                            <td>{car.model}</td>
                                                            <td>{car.brand}</td>
                                                            <td>{car.description}</td>
                                                            <td>{car.price}</td>
                                                            <td>
                                                                <i  style={{ fontSize: '25px' }} className="pe pe-7s-trash text-accent " onClick={() =>{ deleteCar(car._id);}}></i>&nbsp;&nbsp;
                                                                <Link to={`/cars/${car._id}`}>
                                                                    <i  style={{ fontSize: '25px' }} className="pe pe-7s-pen text-accent" ></i>
                                                                </Link>     
                                                            </td>
                                                            
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            
                                        </div>

                                        <div className="container-responsive principal">
                                            <div className="row">
                                                <div className="col-lg-12 text-center">
                                                    <div className="row">
                                                        {cars.map((car) => (
                                                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={car._id}>

                                                                <div className="card-section border rounded ml-4 mr-4">
                                                                
                                                                    <div className="card-header card-header-third rounded">
                                                                        <h3 className="card-header-title">{car.model}</h3>
                                                                    </div>
                                                                    <div className="card-body card-body-third "> 
                                                                        <img className="card-img-top "  src={`${car.image}`}  alt="..."  />    
                                                                        <h3 className="card-text-third">Marca : {car.brand}</h3>
                                                                        <h3 className="card-text-third">Precio $/. {car.price}</h3>
                                                                        <hr className="card-divider card" />       
                                                                        <div className="panel-body">
                                                                            {car.description}
                                                                        </div>
                                                                        
                                                                        <div className="card-button-third"> 
                                                                        <i className="pe pe-7s-trash text-accent" onClick={() =>{ deleteCar(car._id);}}></i>&nbsp;&nbsp;

                                                                        
                                                                            <i className="fa fa-automobile text-accent"></i>&nbsp;&nbsp;
                                                                            <i className="fa fa fa-heart-o text-accent "></i>&nbsp;&nbsp;
                                                                            <Link to={`/cars/${car._id}`}>
                                                                             <i className="pe pe-7s-pen text-accent "></i> 
                                                                            </Link>     
                                                                        </div>                     
                                                                    </div>         
                                                                </div> 
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>                            
  );
}

export default CarsPage;