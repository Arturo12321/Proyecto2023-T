/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useCars } from "../context/CarsContext";
import {  Link } from "react-router-dom";
function CarsPage() {
  const { getCars, cars } = useCars();

  useEffect(() => {
    getCars();
  }, []);

  if (cars.length === 0) return <h1>No Cars</h1>;

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
                                            <div className="col-sm-10">
                                                <h5 className="m-t-xs">Car Registrados</h5>
                                            </div>
                                            <div className="col-sm-2 text-right">
                                                <div className="panel-body buttons-margin">
                                                    <Link id="btnNuevo" className="btn btn-w-md btn-info"
                                                        to="/cars/new">Nuevo Car</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-hover table-striped" >
                                                <thead >
                                                    <tr>
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
                                                            <td>{car.model}</td>
                                                            <td>{car.brand}</td>
                                                            <td>{car.description}</td>
                                                            <td>{car.price}</td>
                                                            <td>
                                                                <i  style={{ fontSize: '25px' }} className="pe pe-7s-trash text-accent"></i>&nbsp;&nbsp;
                                                                <i  style={{ fontSize: '25px' }} className="pe pe-7s-pen text-accent"></i>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            
                                        </div>

                                        <div className="container principal">
                                            <div className="row">
                                                <div className="col-lg-12 text-center">
                                                    <div className="row">
                                                        {cars.map((car) => (
                                                            <div className="col-lg-4 col-md-12 mb-4" key={car._id}>

                                                                <div className="card-section border rounded ml-4 mr-4">
                                                                
                                                                    <div className="card-header card-header-third rounded">
                                                                        <h3 className="card-header-title mb-3 mt-1 ">{car.model}</h3>
                                                                    </div>
                                                                    <div className="card-body card-body-third "> 
                                                                        <img className="card-img-top" src="https://media.istockphoto.com/id/1150931120/es/foto/ilustraci%C3%B3n-3d-del-coche-blanco-compacto-gen%C3%A9rico-vista-frontal-lateral.jpg?s=1024x1024&w=is&k=20&c=lgzPc6AkILBJuWwREePNHlmdAy_yyRNRp-EF8ZGnP28=" alt="..." style={{ width : '33rem'}} />    
                                                                        <h3 className="card-text-third">Marca : {car.brand}</h3>
                                                                        <h3 className="card-text-third">Description : {car.description}</h3>
                                                                        <h3 className="card-text-third">Precio $/. {car.price}</h3>     
                                                                        <div className="card-button-third"> 
                                                                            <i className="pe pe-7s-trash text-accent "></i>&nbsp;&nbsp;
                                                                            <i className="fa fa-automobile text-accent "></i>&nbsp;&nbsp;
                                                                            <i className="fa fa fa-heart-o text-accent "></i>&nbsp;&nbsp;
                                                                            <i className="pe pe-7s-pen text-accent "></i>                                            
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