import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import cartIcon from "../../assets/ic-shopping-cart.svg";

function CartWidget({ countCartItems }) {
  return (
    <Link to={ROUTES.CART} className="flex items-center gap-2">
      <img src={cartIcon} alt="Ícono de carrito" className="h-6 w-6" />
      <span className="text-base bg-black text-white font-semibold rounded-3xl p-3 h-5 w-5 flex items-center justify-center">
        {countCartItems}
      </span>
    </Link>
  );
}

export default CartWidget;
