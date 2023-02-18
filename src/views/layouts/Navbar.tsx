import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes/routes";

class Navbar extends React.Component {
    render() {
        return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to={routes.home}>Home</Link>
                    </li>
                    <li>
                        <Link to={routes.about}>About</Link>
                    </li>
                    <li>
                        <Link to={routes.calculator}>Calculator</Link>
                    </li>
                </ul>
            </nav>
        </header>
        );
    }
}

export default Navbar;