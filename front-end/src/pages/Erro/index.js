import { Link } from "react-router-dom";
import './erro.css'

function Erro(){
    return(
        <div className="not-found">
            <h1>404</h1>
            <h2>ops essa pagina nao existe</h2>
            <Link to="/">Volte para a Home </Link>
        </div>
    )
}
export default Erro;