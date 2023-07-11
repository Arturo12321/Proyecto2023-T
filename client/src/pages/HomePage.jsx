import { Link } from "react-router-dom";
import MiImagen  from "../assets/images/FASTCARLOGO.png";

function HomePage() {
    return (
        <div id="page-wrapper" className="gray-bg" style={{ background :'' }}>
        <div className="row border-bottom">
        <nav className="navbar navbar-static-top  " role="navigation" style={{ marginBottom :'10rem' }} ></nav>
        <div className="wrapper wrapper-content">
                <div className="middle-box text-center animated fadeInRightBig">
                    <h1 className="empty font-bold">Bienvenido</h1>
                    <h1 className="empty-fastcar font-bold">RENTCAR</h1>
                    <Link to="/login" >
                        <img src={MiImagen} alt="Descripción de la imagen"/>
                    </Link>
                    <h1 className="empty-text font-bold">TU MEJOR OPCION</h1>
                </div>
            </div> 
            </div>
        </div> 
    );
}

export default HomePage;