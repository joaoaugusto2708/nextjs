import Link from "next/link";
import { Nav, Navbar } from "reactstrap";

const Header = () => {
    return (
        <Navbar container="md" color="dark" dark>
            <Link legacyBehavior className="nav-link" href="/">
                <a className="navbar-brand">
                    Início
                </a>
            </Link>
            <Nav className="flex-row" navbar>
                <Link legacyBehavior className="nav-link" href="/products">
                    <a className="navbar-brand">
                        Produtos
                    </a>
                </Link>
                <Link legacyBehavior className="nav-link" href="/cart">
                    <a className="navbar-brand">
                        Carrinho
                    </a>
                </Link>
            </Nav>
        </Navbar>
    )
}

export default Header