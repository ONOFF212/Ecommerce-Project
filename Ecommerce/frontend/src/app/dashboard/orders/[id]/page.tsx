
'use client'
import { getOrderItemsById } from "@/features/dashboard/orders/services/order-api";
import { Box, Card, Group, Text, Grid, ScrollArea, Stack, Image } from "@mantine/core";
import { use, useEffect, useState } from "react";
import { orderDetail } from "@/features/dashboard/orders/types/order";

interface paramsProps{
    params:Promise<{id:string}>;
}
export default function OrderView({params}:paramsProps) {
    const {id} = use(params);
    const [isOrder, setIsOrder] = useState<orderDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts(){
            const paramId =  Number(id);
            try{
                const result = await getOrderItemsById(paramId);
                setIsOrder(result.order?.[0]);
                setIsLoading(false);
            }catch(error){
                throw new Error(`Failed to Fetch Order Items ${error}`);
            }
        };
        fetchProducts();
    }, [id]);

    if(isLoading){
        return <Text>Loading order Items</Text>;
    }
    return(
        <>
        <Box>
            <Card shadow="md" padding="md" withBorder m="10" h="auto" mih="90vh">
                <Group>                
                    <Text size="xl" fw={900}>Order # {isOrder?.id ?? "Loading......"}</Text>
                </Group>
                <Box style={{borderBottom:'1px solid #e6e7e9', marginTop:"20px"}}/>

                <Text size="xl" fw={700} mt="10">
                    Address 
                </Text>

                <Box style={{display:"grid", gridTemplateColumns:"repeat(1, minmax(0,2fr))", gap:"50px", w:"70%"}}>
                    <Group mt={10} justify="space-between" gap={10} mx="40">
                        <Box w="30%">
                            <Text size="sm" c="dimmed" fw={600}>Country</Text>
                            <Box p="xs" bg="#e6e7e9" style={{border:"1px solid #e6e9e7", borderRadius:6}}>
                                <Text>{isOrder?.shipping_address.country ?? "Loading..."}</Text>
                            </Box>
                        </Box>
                        <Box w="30%">
                            <Text size="sm" c="dimmed" fw={600}>Province</Text>
                            <Box p="xs" bg="#e6e7e9" style={{border:"1px solid #e6e9e7", borderRadius:6}}>
                                <Text>{isOrder?.shipping_address.province ?? "Loading..."}</Text>
                            </Box>
                        </Box>
                        <Box w="30%">
                            <Text size="sm" c="dimmed" fw={600}>Municipality</Text>
                            <Box p="xs" bg="#e6e7e9" style={{border:"1px solid #e6e9e7", borderRadius:6}}>
                                <Text>{isOrder?.shipping_address.municipality ?? "Loading..."}</Text>
                            </Box>
                        </Box>
                        <Box w="30%">
                            <Text size="sm" c="dimmed" fw={600}>Ward NO</Text>
                            <Box p="xs" bg="#e6e7e9" style={{border:"1px solid #e6e9e7", borderRadius:6}}>
                                <Text>{isOrder?.shipping_address.ward ?? "Loading..."}</Text>
                            </Box>
                        </Box>
                        <Box w="30%">
                            <Text size="sm" c="dimmed" fw={600}>Local Address</Text>
                            <Box p="xs" bg="#e6e7e9" style={{border:"1px solid #e6e9e7", borderRadius:6}}>
                                <Text>{isOrder?.shipping_address.local ?? "Loading..."}</Text>
                            </Box>
                        </Box>
                        <Box w="30%">
                            <Text size="sm" c="dimmed" fw={600}>Street</Text>
                            <Box p="xs" bg="#e6e7e9" style={{border:"1px solid #e6e9e7", borderRadius:6}}>
                                <Text>{isOrder?.shipping_address.street ?? "Loading..."}</Text>
                            </Box>
                        </Box>
                        <Box w="30%">
                            <Text size="sm" c="dimmed" fw={600}>Mobile NO.</Text>
                            <Box p="xs" bg="#e6e7e9" style={{border:"1px solid #e6e9e7", borderRadius:6}}>
                                <Text>{isOrder?.shipping_address.phone ?? "Loading..."}</Text>
                            </Box>
                        </Box>
                    </Group>
                </Box>

                <Box style={{borderBottom:'1px solid #e6e7e9', marginTop:"20px"}}/>

                <Box>
                    <Text size="xl" fw={700} mt="10">
                        Products 
                    </Text>
                    <Grid>
                        <Grid.Col span={{base:12, md:6}}>
                            <ScrollArea h="400" scrollbarSize={6} >    
                                {isOrder?.order_items.map(order => (
                                    <Box key={order.product.id}>
                                        <Card shadow="md" withBorder w="100%" mt={4}>
                                        <Group wrap="wrap" gap="md">
                                            <Image src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${order.product.imgUrl}`}
                                                    alt={order.product.imgUrl}
                                                    w={50} h={50} radius="md" fit="cover"
                                            />
                                            <Stack gap="sm" style={{ minWidth:100}} mx="auto">
                                                <Box>
                                                    <Text size="xs" c="dimmed">Name</Text>
                                                    <Text size="md" fw={700} style={{overflowWrap:"anywhere"}}>
                                                        {order.product.name}
                                                    </Text>
                                                </Box>
                                                <Box>
                                                    <Text size="xs" c="dimmed">Price</Text>
                                                    <Text size="md" fw={600} style={{overflowWrap:"anywhere"}}>
                                                        {order.price}
                                                    </Text>
                                                </Box>
                                            </Stack>
                                            <Stack mx="auto">
                                                <Box>
                                                    <Text size="xs" c="dimmed">Quantity</Text>
                                                    <Text size="md" fw={600} style={{overflowWrap:"anywhere"}}>
                                                        {order.quantity}
                                                    </Text>
                                                </Box>
                                                <Box>
                                                    <Text size="xs" c="dimmed">Category</Text>
                                                    <Text size="md" fw={600} style={{overflowWrap:"anywhere"}}>
                                                        {order.product.category.name}
                                                    </Text>
                                                </Box>
                                            </Stack>
                                        </Group>
                                        </Card>
                                    </Box>
                                ))}
                            </ScrollArea>
                        </Grid.Col>
                            <Box style={{display:"grid", gridTemplateColumns:"repeat(2, minmax(0,1fr))",gap:"25px", margin:"20px auto", maxWidth:"450px", alignItems:"center" ,width:"100%"}}>
                                    <Box>
                                        <Text size="sm" c="dimmed" fw={600}>Order-Date</Text>
                                        <Box py="md" bg="#e6e7e9" style={{border:"1px solid #e6e9e7", borderRadius:6, minHeight:"60px", alignItems:'center',}}>
                                            <Text size="xl" style={{textAlign:"center"}}>{isOrder?.order_date ?? "Loading..."}</Text>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Text size="sm" c="dimmed" fw={600}>Order-Time</Text>
                                        <Box py="md" bg="#e6e7e9" style={{border:"1px solid #e6e9e7", borderRadius:6, minHeight:"60px", alignItems:'center',}}>
                                            <Text size="xl" style={{textAlign:"center"}}>{isOrder?.order_time ?? "Loading..."}</Text>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Text size="sm" c="dimmed" fw={600}>Total-Amount</Text>
                                        <Box py="md" bg="#e6e7e9" style={{border:"1px solid #e6e9e7", borderRadius:6, minHeight:"60px", alignItems:'center',}}>
                                            <Text size="xl" style={{textAlign:"center"}}>Rs. {isOrder?.total_amount !== null ? Number(isOrder?.total_amount)+150 : "Loading..."}</Text>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Text size="sm" c="dimmed" fw={600}>Total Quantity</Text>
                                        <Box py="md" bg="#e6e7e9" style={{border:"1px solid #e6e9e7", borderRadius:6, minHeight:"60px", alignItems:'center',}}>
                                            <Text size="xl" style={{textAlign:"center"}}>{isOrder?.quantity ?? "Loading..."}</Text>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Text size="sm" c="dimmed" fw={600}>Status</Text>
                                        <Box py="md" bg="#e6e7e9" style={{border:"1px solid #e6e9e7", borderRadius:6, minHeight:"60px", alignItems:'center',}}>
                                            <Text size="xl" 
                                                  style={{textAlign:"center"}}
                                                  className={isOrder?.status === "shipped" ? "text-yellow-500" : 
                                                             isOrder?.status === "pending" ? "text-red-500"  :
                                                             isOrder?.status === "cancelled" ? "text-red-500" :
                                                             isOrder?.status === "delivered" ? "text-green-500" : "text-gray-500"
                                                  }
                                            >
                                                {isOrder?.status ?? "Loading..."}
                                            </Text>
                                        </Box>
                                    </Box>
                            </Box>
                        <Grid.Col span={{base:12, md:6}}>
                        </Grid.Col>
                    </Grid>
                </Box>
            </Card>
        </Box>
        </>
    );
};
