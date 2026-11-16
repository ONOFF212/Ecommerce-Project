
import { orderDetails } from "../types/order";
import { Box } from "@mantine/core";
import { OrderCard } from "./orderCard";

interface orderProps {
    orders:orderDetails[];
}
export function OrderItemsList({orders}:orderProps){
    return(
        <>
        <Box>
            <ul>
                 {orders.map(order => (
                    <Box key={order.id}>
                        <OrderCard  order={order}/>
                    </Box>
                 ))}       
            </ul>
        </Box>
        </>
    );
};