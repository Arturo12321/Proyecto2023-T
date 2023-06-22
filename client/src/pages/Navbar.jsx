import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Navbar() {

    const { isAuthenticated, logout, user } = useAuth();
  return (
    <div className="wrapper">

    <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
            <div className="navbar-header">
                <Link className="navbar-brand" to= {
                    isAuthenticated ? "/cars" : "/"
                }>
                    FASTCAR
                </Link>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
                <div className="left-nav-toggle">
                    <a href="#">
                        <i className="stroke-hamburgermenu"></i>
                    </a>
                </div>
                <form className="navbar-form navbar-left">
                    <input type="text" className="form-control" placeholder="Busca el auto que necesites..." />
                </form>
                <ul className="nav navbar-nav navbar-right">
                    { isAuthenticated ? (
                    <>
                        <li className="dropdown">
                        <Link >Welcome {user.username} </Link>
                        </li>
                        <li className="dropdown">
                            <Link to='/profile'>Profile</Link>
                        </li>
                        <li className="dropdown">
                            <Link to="/" onClick={() => {logout()}}>Logout</Link>
                        </li>
                    </>

                    ): (
                    <>
                        <li className="dropdown">
                            <Link to='/register'>Register</Link>
                        </li>
                        <li className="dropdown">
                            <Link to='/login'>Login</Link>
                        </li>
                    </>
                    )}
                    <li className="dropdown">
                        <Link to="/profile">
                           
                        </Link>
                    </li>
                    
                </ul>
            </div>
        </div>
    </nav>
    { isAuthenticated ? (
        <>
            <aside className="navigation">
                <nav>
                    <ul className="nav luna-nav">
                        <li className="nav-category">
                            Hola,  {user.username} buen día....!
                        </li>
                        <li>
                        <Link to='/cars' >Cars</Link>
                        </li>
                    
                        <li>
                            <a href="#cars" data-toggle="collapse" aria-expanded="false">
                                My Cars<span className="sub-nav-icon"> <i className="stroke-arrow"></i> </span>
                            </a>
                            <ul id="cars" className="nav nav-second collapse">
                                <li>
                                    <Link to='/cars' >My Car Sales</Link>
                                </li>
                                <li>
                                    <Link to='/cars' >My Car Rental</Link>
                                </li>
                            </ul>
                        </li>
                        
                        <li>
                            <a href="#reservation" data-toggle="collapse" aria-expanded="false">
                                Reservation<span className="sub-nav-icon"> <i className="stroke-arrow"></i> </span>
                            </a>
                            <ul id="reservation" className="nav nav-second collapse">
                                <li>
                                    <Link to='/cars' >My Reservation</Link>
                                </li>
                                <li>
                                    <Link to='/cars' >My Pre-Reservation</Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-category">
                            Oficinas
                        </li>

                        <li>
                            <a href="#olima" data-toggle="collapse" aria-expanded="false">
                                LIMA <span className="sub-nav-icon"> <i className="stroke-arrow"></i> </span>
                            </a>
                            <ul id="olima" className="nav nav-second collapse">
                                <li>
                                    <Link to='/cars' >Ate</Link>
                                </li>
                                <li>
                                    <Link to='/cars' >Santa Anita</Link>
                                </li>
                                <li>
                                    <Link to='/cars' >Miraflores</Link>
                                </li>
                                <li>
                                    <Link to='/cars' >San Isidro</Link>
                                </li>
                            </ul>
                        </li>   
                        <li>
                            <a href="versions.html">
                                <span className="badge pull-right">1</span>
                                Versions
                            </a>
                        </li>
                        <li className="nav-info">
                            <i className="pe pe-7s-shield text-accent"></i>
                            <div className="m-t-xs">
                                <span className="c-white">FASTCAR</span> Hola que tal  {user.username} , espero que tengas un buen dia, te saluda el grupo de FastCar.
                            </div>             
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    ): (
        <>
            
        </>
    )}
    </div>
  );
}

export default Navbar;