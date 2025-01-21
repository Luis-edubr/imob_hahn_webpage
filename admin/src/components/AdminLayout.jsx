import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import ProfileLogo from './ProfileLogo';
import ImobLogo from './ImobLogo';
import './css/AdminLayout.css';


const AdminLayout = ({ children }) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/login');
    };

    return (
        <div>
            <header className="p-3 text-bg-dark" style={{ height: '80px' }}>
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <Link to={'/dashboard'}>
                        <div >
                            <ImobLogo />
                        </div>
                    </Link>
                    <div className="flex-shrink-0 dropdown">
                        <a
                            href="#"
                            className="d-block text-white link-body-emphasis text-decoration-none dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <ProfileLogo />
                        </a>
                        <ul className="dropdown-menu text-small shadow">
                            <li><a className="dropdown-item" href="#">Settings</a></li>
                            <li><a className="dropdown-item" href="#">Profile</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li>
                                <a className="dropdown-item" href="#" onClick={handleLogout}>
                                    Sign out
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-2 col-xl-1 px-sm-2 px-0 bg-dark">
                        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar">
                            <Link to="/dashboard" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-4">Imobiliária Hahn</span>
                            </Link>
                            <hr />
                            <ul className="nav nav-pills flex-column mb-auto">

                                <li className="nav-item">
                                    <Link to="/ciclos" className={`nav-link text-white ${window.location.pathname === '/imoveis' ? 'active' : ''}`}>
                                        <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Imóveis</span>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to="/users" className={`nav-link text-white ${window.location.pathname === '/usuarios' ? 'active' : ''}`}>
                                        <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Usuários</span>
                                    </Link>
                                </li>

                            </ul>
                            <hr />
                            <div className="dropdown">
                                <a
                                    href="#"
                                    className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <ProfileLogo className="me-2" />
                                    <strong>{user?.name}</strong>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                    <li><a className="dropdown-item" href="#">Perfil</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col py-3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;