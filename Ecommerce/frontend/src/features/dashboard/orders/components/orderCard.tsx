
import { Box, Card, Text, Button, Group } from "@mantine/core";
import { orderDetails } from "../types/order";
import { useRouter } from "next/navigation";

interface orderDetailsProps{
    order:orderDetails;
}
export function OrderCard({order}:orderDetailsProps){
    const router = useRouter();
    const handleViewOrder = async() => {
        router.push(`/dashboard/orders/${order.id}`);
    };
    return(
        <>
        <Box>
            <Card shadow="md" padding="md" withBorder m="10" h="auto" mih="90vh">
                <Group>                
                    <Text size="xl" fw={900}>Order History</Text>
                </Group>
                <Box style={{borderBottom:'1px solid #e6e7e9', marginTop:"20px"}}/>
                <Box>
                    <Box style={{display:"grid", gridTemplateColumns:"0.5fr 1.2fr 1.2fr 0.8fr 0.8fr 1.2fr 0.8fr", gap:"10px", padding:"12px"}}>
                        <Text size="md" fw={900}>ID</Text>
                        <Text size="md" fw={900}>Order Date</Text>
                        <Text size="md" fw={900}>Total_Amount </Text>
                        <Text size="md" fw={900}>Quantity</Text>
                        <Text size="md" fw={900}> Status</Text>
                        <Text size="md" fw={900}>Order Address</Text>
                        <Text size="md" fw={900}>Details</Text>
                    </Box>
                </Box>
                <Box style={{borderBottom:'1px solid #121213', marginTop:"10px"}}/>
                {order != null ?(<Box>
                    <Card shadow="md" 
                          padding="md" 
                          withBorder 
                          mt="15" w="100%" 
                          style={{overflow:"hidden",transition:'box-shadow 0.2s ease'}}
                          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";}}
                          onMouseLeave={(e) => {e.currentTarget.style.boxShadow = "";}}
                    >
                        <Box style={{
                                      display:"grid", 
                                      gridTemplateColumns:"0.5fr 1.2fr 1.2fr 0.8fr 0.8fr 1.2fr 0.8fr",
                                      gap:"10px", 
                                      alignItems:"center", 
                                      padding:"5px", cursor:"pointer"
                                    }}
                        >
                            <Text>{order.id}</Text>
                            <Text>{order.order_date}</Text>
                            <Text>{`Rs. ${Number(order.total_amount) + 150}`}</Text>
                            <Text>{order.quantity}</Text>
                            {order.status === "pending" ? (<Text style={{color:"red"}}>{order.status}</Text>)
                            :(<Text style={{color:"green"}}>order.status</Text>)}
                            <Group gap={2}>
                                <Text>{`${order.shipping_address.province}`}</Text>
                                <Text>{`/ ${order.shipping_address.municipality}`}</Text>
                                <Text>{`/ ${order.shipping_address.country}`}</Text>
                            </Group>
                            <Box>
                                <Button color="black" 
                                        onClick={handleViewOrder}
                                        className="hover:!text-purple-500 cursor-pointer transition-all duration-200"
                                >
                                    view Order
                                </Button>
                            </Box>
                        </Box>
                    </Card>
                </Box>
                ):(
                    <Text fw={700} size="xl">No History Found!!!</Text>
                )}
            </Card>
        </Box>
        </>
    );
};