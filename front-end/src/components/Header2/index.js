import { Link, useNavigate } from "react-router-dom";
import './header2.css';
import dogLogo from '../../assets/logoDOG.png'


function Header() {
    const navigate = useNavigate();

    const navHome = () => {
        navigate("/");
    }

    const navHistoric = () => {
        navigate("/favoritos")
    }

    return (
        <header className="header">
            
                <img className="dogLogo"
                    src={dogLogo}
                    onClick={() => navHome()} />

                <h1 className="marcaLogo" onClick={() => navHome()}>PetFeed Manager</h1>
            
            <div className="nav">
                <Link className="Link" to="/">Home</Link>
                <Link className="LinkHistorico" to="/historico">Histórico</Link>
            </div>

        </header>
    )
}
export default Header;