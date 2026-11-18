
import { cartItemsDetails } from "../types/cart";
import { CartItemsCard } from "./itemsCard";

interface cartProps{
    cartItem:cartItemsDetails[];
}

export function CartList({cartItem}:cartProps) {
    return(
        <div className="w-[100%] py-4">
                    <ul>
                        {cartItem.map(product => (
                            <div key={product.id} className="mt-4">
                                <CartItemsCard cartItem={product}/>
                            </div>
                        ))}
                    </ul>
                </div>
    );
};