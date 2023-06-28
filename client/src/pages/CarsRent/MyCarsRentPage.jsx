/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useCarsRent } from "../../context/CarsRentContext";
import {  Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import days from "dayjs";
import utc from "dayjs-plugin-utc";
days.extend(utc)

function MyCarsRentPage() {
  const { user } = useAuth();
  const { getMyCarsRent,deleteCarRent, carsRent } =  useCarsRent();

  useEffect(() => {
    getMyCarsRent();
  },[]);

  if (carsRent.length === 0) return (
    <section className="content">
        <div className="container-center md animated slideInDown">

            <div className="view-header">
                <div className="header-icon">
                    <i className="pe page-header-icon pe-7s-close-circle"></i>
                </div>
                <div className="header-title">
                    <h1>No hay autos para RENTAR . </h1>
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
                <Link to="/add-car-rent" className="btn btn-accent">CREAR NUEVO AUTO PARA ALQUILAR</Link>
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
                                                <h5 className="m-t-xs">Car Registrados Para El Alquiler.</h5>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 text-right">
                                                <div className="panel-body buttons-margin">
                                                    <Link id="btnNuevo" className="btn btn-w-md btn-info"
                                                        to="/add-car-rent">Nuevo Car</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-hover table-striped" >
                                                <thead >
                                                    <tr>
                                                        <th>Model</th>
                                                        <th>Marca</th>
                                                        <th>Placa</th>
                                                        <th>Color</th>
                                                        <th>Precio</th>
                                                        <th>Fecha de Publicavion</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {carsRent.map((carRent) => (
                                                        <tr key={carRent._id}>
                                                            <td>{carRent.model}</td>
                                                            <td>{carRent.brand}</td>
                                                            <td>{carRent.license_plate_number}</td>
                                                            <td>{carRent.color}</td>
                                                            <td>{carRent.price}</td>
                                                            <td>{days(carRent.createdAt).utc().format('DD/MM/YYYY')}</td>
                                                            <td>
                                                                <i  style={{ fontSize: '25px' }} className="pe pe-7s-trash text-accent " onClick={() =>{deleteCarRent(carRent._id)}}></i>&nbsp;&nbsp;
                                                                <Link to={`/cars-rent/${carRent._id}`}>
                                                                    <i  style={{ fontSize: '25px' }} className="pe pe-7s-pen text-accent" ></i>
                                                                </Link>&nbsp;&nbsp;                                                                
                                                                <Link to={`/see-cars-rent/${carRent._id}`}>
                                                                    <i  style={{ fontSize: '25px' }} className="fa fa-sharp fa-eye text-accent" ></i>
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
                                                        {carsRent.map((carRent) => (
                                                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={carRent._id}>
                                                                <div className="card-section border rounded ml-4 mr-4">
                                                                    <div className="card-header card-header-third rounded">
                                                                        <h3 className="card-header-title">{carRent.model}</h3>
                                                                    </div>
                                                                    <div className="card-body card-body-third "> 
                                                                        <img className="card-img card-img-top"  src={`${carRent.image}`}  alt="..."  />    
                                                                        <h3 className="card-text-third">Marca : {carRent.brand}</h3>
                                                                        <h3 className="card-text-third">Precio $/. {carRent.price}</h3>
                                                                        <h3 className="card-text-third">Fecha : {days(carRent.year).utc().format('DD/MM/YYYY')}</h3>                                                                        <hr className="card-divider card" />       
                                                                        <hr className="card-divider card" /> 
                                                                        <div className="panel-body"> {carRent.description}</div>
                                                                        <div className="card-button-third">
                                                                            <i className="pe pe-7s-trash text-accent" onClick={() =>{deleteCarRent(carRent._id)}}></i>&nbsp;&nbsp;
                                                                            <Link to={`/see-cars-rent/${carRent._id}`}>
                                                                                <i className="fa fa-sharp fa-eye text-accent"></i>
                                                                            </Link> &nbsp;&nbsp;
                                                                            <Link to={`/cars-rent/${carRent._id}`}>
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

export default MyCarsRentPage;