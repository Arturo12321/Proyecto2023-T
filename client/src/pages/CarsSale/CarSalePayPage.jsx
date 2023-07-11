import { useEffect, useState } from "react";
import { useCarsSale } from "../../context/CarsSaleContext";
import {  useParams } from "react-router-dom";
import days from "dayjs";
import utc from "dayjs-plugin-utc";
days.extend(utc)
function CarSalePayPage() {
  const { getCarSale } = useCarsSale();
  const { id } = useParams();
  const [carSale, setCarSale] = useState();
  useEffect(() => {
    async function loadCarSale() {
      const carSaleData = await getCarSale(id);
      console.log(carSaleData);
      setCarSale(carSaleData);
    }

    loadCarSale();
  }, [getCarSale, id]);

  if (!carSale) {
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
                                        <img className="card-imgs card-img-top"  src={`${carSale.image}`}  alt="..."  /> 
                                        <small>Esta imagen es referencial al original, si tienes algunas dudas puede contactarse con el dueño.</small>
                                        </div>         
                                    </div>
                                  </div>
                                  <div className="col-md-7">
                                      <h2 className="font-bold m-b-xs text-center">Hola, parece que te gusto este auto.</h2>
                                      <hr className="card-divider card" /> 
                                      <div className="row">
                                        <div className="col-lg-6">
                                            <h1 className="product-main-price text-center">{carSale.brand} <small className="">{carSale.model}</small> </h1>
                                        </div>
                                        <div className="col-lg-6">
                                            <h1 className="product-main-price text-center">Precio del auto   $: {carSale.price}.99</h1>
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
                                            <h4 className="product-main-price">Fabricación: {days(carSale.year).utc().format('DD/MM/YYYY')}</h4>
                                        </div>
                                        <div className="col-lg-3 text-center">
                                            <h4 className="product-main-price">N° de Placa: {carSale.license_plate_number}</h4>
                                        </div>
                                        <div className="col-lg-3 text-center">
                                            <h4 className="product-main-price">Color del auto: {carSale.color}</h4>
                                        </div>
                                        <div className="col-lg-3 text-center">
                                            <h4 className="product-main-price">N° de asientos: {carSale.seats}</h4>
                                        </div>
                                        
                                      </div>
                                      <div className="row">
                                        <div className="col-lg-4 text-center">
                                          <h4 className="product-main-price">Tipo de Combustible: {carSale.fuel}</h4>
                                        </div>
                                        <div className="col-lg-4 text-center">
                                          <h4 className="product-main-price">Tipo de Transmisión : {carSale.transmission}</h4>
                                        </div>
                                        <div className="col-lg-4 text-center">
                                          <h4 className="product-main-price">Motor: {carSale.engine}</h4>
                                        </div>
                                      </div>
                                      <div className="row">

                                        <h4 className="col-lg-12 text-justify">Descripcion:  {carSale.description}</h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <hr className="card-divider card" /> 
                                <hr className="card-divider card" /> 
                                <div className="ibox-footer">
                                    <span className="pull-right">
                                        Ultima Actualización - <i className="fa fa-clock-o"></i> {days(carSale.updateAr).utc().format('DD/MM/YYYY')} {days(carSale.updateAr).utc().format('HH:MM')} 
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

export default CarSalePayPage