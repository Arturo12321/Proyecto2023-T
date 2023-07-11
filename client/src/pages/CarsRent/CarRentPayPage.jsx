import { useEffect, useState } from "react";
import { useCarsRent } from "../../context/CarsRentContext";
import { useParams } from "react-router-dom";
import days from "dayjs";
import utc from "dayjs-plugin-utc";
days.extend(utc)

function CarRentPayPage() {
    const { getCarRent } = useCarsRent();
  const { id } = useParams();
  const [carRent, setCarRent] = useState();
  useEffect(() => {
    async function loadCarRent() {
      const carRentData  = await getCarRent(id);
      console.log(carRentData);
      setCarRent(carRentData);
    }

    loadCarRent();
  }, [getCarRent, id]);

  if (!carRent) {
    return <p>Cargando...</p>;
  }
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row m-t-sm">
          <div className="col-md-15">
            <div className="panel">
              <div className="panel-body">
                <div className="col-lg-12 col-md-12 col-sm-8" >
                  <div className="panel panel-filled">
                    <div className="wrapper wrapper-content animated fadeInRight">
                      <div className="panel-body">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="ibox product-detail">
                              <div className="ibox-content">
                                <div className="row">
                                  <div className="col-md-5">
                                    <div className="product-images">     
                                        <div className="image-imitation">
                                        <img className="card-imgs card-img-top"  src={`${carRent.image}`}  alt="..."  /> 
                                        <small>Esta imagen es referencial al original, si tienes algunas dudas puede contactarse con el dueño.</small>
                                        </div>         
                                    </div>
                                  </div>
                                  <div className="col-md-7">
                                      <h2 className="font-bold m-b-xs text-center">Hola, parece que te gusto este auto.</h2>
                                      <hr className="card-divider card" /> 
                                      <div className="row">
                                        <div className="col-lg-6">
                                            <h1 className="product-main-price text-center">{carRent.brand} <small className="">{carRent.model}</small> </h1>
                                        </div>
                                        <div className="col-lg-6">
                                            <h1 className="product-main-price text-center">Precio / hora   $: {carRent.price}.99</h1>
                                        </div>
                                      </div>
                                      <hr className="card-divider card" /> 
                                      <hr className="card-divider card" /> 
                                      <div className="col-lg-12">
                                            <h1  className="product-main-price text-center"> CARACTERISTICAS </h1>
                                        </div>
                                        <hr className="card-divider card" /> 
                                      <div className="row">
                                        <div className="col-lg-3 text-center">
                                            <h4 className="product-main-price">Fabricación: {days(carRent.year).utc().format('DD/MM/YYYY')}</h4>
                                        </div>
                                        <div className="col-lg-3 text-center">
                                            <h4 className="product-main-price">N° de Placa: {carRent.license_plate_number}</h4>
                                        </div>
                                        <div className="col-lg-3 text-center">
                                            <h4 className="product-main-price">Color del auto: {carRent.color}</h4>
                                        </div>
                                        <div className="col-lg-3 text-center">
                                            <h4 className="product-main-price">N° de asientos: {carRent.seats}</h4>
                                        </div>
                                        
                                      </div>
                                      <div className="row">
                                        <div className="col-lg-4 text-center">
                                          <h4 className="product-main-price">Tipo de Combustible: {carRent.fuel}</h4>
                                        </div>
                                        <div className="col-lg-4 text-center">
                                          <h4 className="product-main-price">Tipo de Transmisión : {carRent.transmission}</h4>
                                        </div>
                                        <div className="col-lg-4 text-center">
                                          <h4 className="product-main-price">Motor: {carRent.engine}</h4>
                                        </div>
                                      </div>
                                      <div className="row">

                                        <h4 className="col-lg-12 text-justify">Descripcion:  {carRent.description}</h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <hr className="card-divider card" /> 
                                <hr className="card-divider card" /> 
                                <div className="ibox-footer">
                                    <span className="pull-right">
                                        Ultima Actualización - <i className="fa fa-clock-o"></i> {days(carRent.updateAr).utc().format('DD/MM/YYYY')} {days(carRent.updateAr).utc().format('HH:MM')} 
                                    </span>
                                    Se recomieda no adquirir un automovil luego de los dos meses de la ultima actualización.
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
        </div>
    </section>
  )
}

export default CarRentPayPage;