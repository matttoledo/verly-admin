import { NavLink } from './NavLink';

export { Nav };

function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Inicio</NavLink>
                <NavLink href="/customers" className="nav-item nav-link">Clientes</NavLink>
            </div>
        </nav>
    );
}