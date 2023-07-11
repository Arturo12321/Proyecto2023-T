/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useOffices } from "../../context/OfficesContext";
import {  Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Map, {Marker, Popup} from 'react-map-gl';
import days from "dayjs";
import utc from "dayjs-plugin-utc";
days.extend(utc)

function OfficesPage() {
  const { user } = useAuth();
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const { getOffices, offices } = useOffices();
  useEffect(() => {
    getOffices();
  },[]);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id)
  }

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
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div className="card-header card-header-third-2 rounded">
                                                    <h1 className="card-header-title">Hola {user.firstname}</h1>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <Map
                                                mapboxAccessToken="pk.eyJ1Ijoicm9sYXd1cHl3ZSIsImEiOiJjbGp2MXUxZG8xYTJsM2puMGtzcHVha2ljIn0.45Nxh6N02qWZ_6KJeCsfuw"
                                                initialViewState={{
                                                longitude: -76.953477,
                                                latitude: -12.050086,
                                                zoom: 10
                                                }}
                                                style={{width: 1200, height: 600}}
                                                mapStyle="mapbox://styles/rolawupywe/cljuwt4w901k301pd4n0056qn"
                                                >
                                                {offices.map(office =>(   
                                                <div  key={office._id}>
                                                <Marker  longitude={office.longitude} latitude={office.latitude} offsetLeft={-20} offsetTop={-10}  cursor="pointer" color="red" onClick={()=>handleMarkerClick(office._id)} >
                                                
                                                </Marker>
                                                {office._id === currentPlaceId && (
                                                <Popup
                                                    latitude={office.latitude}
                                                    longitude={office.longitude}
                                                    closeButton={true}
                                                    closeOnClick={false}
                                                    anchor="top"
                                                    onClose={() => setCurrentPlaceId(null)}>
                                                    <div className="card-map">
                                                        <label className="label-map">Name</label>
                                                        <h5 className="h5-map">{office.name}</h5>
                                                        <label className="label-map">Phone</label>
                                                        <h5 className="h5-map">{office.phone}</h5>
                                                        <label className="label-map">Address</label>
                                                        <h5 className="h5-map">{office.address}</h5>
                                                        <img className="card-img-map"  src={`${office.image}`}  alt="..."  />     
                                                    </div> 
                                                </Popup>
                                                )}
                                                </div>
                                                 ))} 
                                            </Map>    
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
                                                                        <img className="card-img card-img-top "  src={`${office.image}`}  alt="..."  />    
                                                                        <h3 className="card-text-third">Pais: : {office.country}</h3>
                                                                        <h3 className="card-text-third">Ciudad : {office.city}</h3>
                                                                        <h3 className="card-text-third">Dirección : {office.address}</h3>
                                                                        <h3 className="card-text-third">Longitude : {office.longitude}</h3>  
                                                                        <h3 className="card-text-third">Latitude : {office.latitude}</h3> 
                                                                        <hr className="card-divider card" />       
                                        
                                                                        <div className="card-button-third"> 
                                                                            <i className="fa fa-automobile text-accent"></i>&nbsp;&nbsp;
                                                                            <i className="fa fa fa-heart-o text-accent "></i>&nbsp;&nbsp;
                                                                            <Link to={`/see-office/${office._id}`}>
                                                                             <i className="fa fa-sharp fa-eye text-accent "></i> 
                                                                            </Link>&nbsp;&nbsp;  
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

export default OfficesPage;