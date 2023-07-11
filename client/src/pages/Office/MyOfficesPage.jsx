/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useOffices } from "../../context/OfficesContext";
import {  Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import days from "dayjs";
import utc from "dayjs-plugin-utc";
days.extend(utc)

function MyOfficesPage() {

  const { user } = useAuth();
  const { getMyOffices, deleteOffice, offices } = useOffices();

  useEffect(() => {
    getMyOffices();
  },[]);

  if (offices.length === 0) return (
    <section className="content">
        <div className="container-center md animated slideInDown">

            <div className="view-header">
                <div className="header-icon">
                    <i className="pe page-header-icon pe-7s-close-circle"></i>
                </div>
                <div className="header-title">
                  <h1>No hay Oficinas disponibles . . .</h1>
                </div>
            </div>
            <div className="panel panel-filled">
                <div className="panel-body">
                  Hola {user.firstname}, en esta pagina no hay oficinas, puedes actualizar la pagina o puedes volver dentro de un momento. 
                </div>
                <div className="panel-body">
                    Disculpa.. 
                </div>
            </div>
            <div>
                <Link to="/add-office" className="btn btn-accent">CREAR NUEVA OFICINA</Link>
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
                                                <h5 className="m-t-xs">Oficinas Registradas</h5>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6 text-right">
                                                <div className="panel-body buttons-margin">
                                                    <Link id="btnNuevo" className="btn btn-w-md btn-info"
                                                        to="/add-office">Nueva Oficina</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-hover table-striped" >
                                                <thead >
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Direccion</th>
                                                        <th>Ciudad</th>
                                                        <th>Pais</th>
                                                        <th>Telefono</th>
                                                        <th>Fecha de Publicacion</th>
                                                        <th>Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {offices.map((office) => (
                                                        <tr key={office._id}>
                                                            <td>{office.name}</td>
                                                            <td>{office.address}</td>
                                                            <td>{office.city}</td>
                                                            <td>{office.country}</td>
                                                            <td>{office.phone}</td>
                                                            <td>{days(office.createdAt).utc().format('DD/MM/YYYY')}</td>
                                                            <td>
                                                                <i  style={{ fontSize: '25px' }} className="pe pe-7s-trash text-accent " onClick={() =>{deleteOffice(office._id)}}></i>&nbsp;&nbsp;
                                                                <Link to={`/offices/${office._id}`}>
                                                                    <i  style={{ fontSize: '25px' }} className="pe pe-7s-pen text-accent" ></i>
                                                                </Link>&nbsp;&nbsp;
                                                                <Link to={`/see-office/${office._id}`}>
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
                                                        {offices.map((office) => (
                                                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={office._id}>
                                                                <div className="card-section border rounded ml-4 mr-4">
                                                                    <div className="card-header card-header-third rounded">
                                                                        <h3 className="card-header-title">{office.name}</h3>
                                                                    </div>
                                                                    <div className="card-body card-body-third "> 
                                                                        <img className="card-img card-img-top"  src={`${office.image}`}  alt="..."  />    
                                                                        <h3 className="card-text-third">Pais: : {office.country}</h3>
                                                                        <h3 className="card-text-third">Ciudad : {office.city}</h3>
                                                                        <h3 className="card-text-third">Dirección : {office.address}</h3> 
                                                                        <h3 className="card-text-third">Fecha : {days(office.year).utc().format('DD/MM/YYYY')}</h3>
                                                                        <hr className="card-divider card" />                                                                             
                                                                        <div className="card-button-third"> 
                                                                            <i className="pe pe-7s-trash text-accent" onClick={() =>{deleteOffice(office._id)}}></i>&nbsp;&nbsp;
                                                                            <Link to={`/see-office/${office._id}`}>
                                                                                <i className="fa fa-sharp fa-eye text-accent"></i>
                                                                            </Link> &nbsp;&nbsp;
                                                                            <Link to={`/offices/${office._id}`}>
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
  )
}

export default MyOfficesPage