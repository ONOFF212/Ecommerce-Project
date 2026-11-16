
'use client'
import { Box } from "@mantine/core";
import { OrderHooks } from "@/features/dashboard/orders/hooks/useOrder";
import { OrderItemsList } from "@/features/dashboard/orders/components/orderItemsList";

export default function OrderPage(){
    const {isOrder} = OrderHooks();

    return(
        <>
        <Box>
            <OrderItemsList orders={isOrder?.order ? [isOrder.order] : []}/>
        </Box>
        </>
    );
};