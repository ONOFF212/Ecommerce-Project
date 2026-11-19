
"use client";
import { CartHooks } from "@/features/dashboard/shoppingCart/hooks/useCarts";
import { Card, Box, Text, Button,Image, Stack, Group, Grid, GridCol } from "@mantine/core";
import { useRouter } from "next/navigation";
import { createOrder } from "@/features/dashboard/shoppingCart/services/order-api";
export default function PlaceOrderPage(){
    const router = useRouter();
    
    const {address, cartItems, subTotal} = CartHooks();
    const handlePlaceOrder = async() => {
        const isCreateOrder = await createOrder(); 
        if(isCreateOrder) {
            router.push("/dashboard/shopping-cart")
            router.refresh();
        }
    };
    const handleCancleAndUpdate = () => { router.push("/dashboard/shopping-cart"); };
    return(
        <>
        <Box>
            <Card shadow="md" padding="md" withBorder m="10" h="100%" mih="90vh">
                <Text size="xl" fw={900}>Summary</Text>
                <Text size="xs" c="dimmed">
                        Make sure everything looks right before Place Order.
                </Text>
                <Box style={{borderBottom:'1px solid #e6e7e9', marginTop:"20px"}}/>
                <Grid mx={0} w="100%" justify="center" align="center">
                    <GridCol span={{base:12, md:6 , lg:4, sm:2}}>
                        <Box w="auto" h="auto">
                        <Card ml="20px" mt={20} w="auto">
                            <Box>
                                <Text size="xl" fw={700}>
                                    Address Review
                                </Text>
                                <Stack>
                                    <Box>
                                        <Text size="sm" c="dimmed" fw={600}>Country</Text>
                                        <Box p="xs"  bg="#e6e7e9" style={{border:"1px solid #e6e7e9", borderRadius:6}}>
                                            <Text>{`${address.country}` || "N/A"}</Text>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Text size="sm" c="dimmed" fw={600}>Province</Text>
                                        <Box p="xs"  bg="#e6e7e9" style={{border:"1px solid #e6e7e9", borderRadius:6}}>
                                            <Text>{`${address.province}` || "N/A"}</Text>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Text size="sm" c="dimmed" fw={600}>Municipality</Text>
                                        <Box p="xs"  bg="#e6e7e9" style={{border:"1px solid #e6e7e9", borderRadius:6}}>
                                            <Text>{`${address.municipality}` || "N/A"}</Text>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Text size="sm" c="dimmed" fw={600}>Local Name</Text>
                                        <Box p="xs"  bg="#e6e7e9" style={{border:"1px solid #e6e7e9", borderRadius:6}}>
                                            <Text>{`${address.local}` || "N/A"}</Text>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Text size="sm" c="dimmed" fw={600}>Street Name</Text>
                                        <Box p="xs"  bg="#e6e7e9" style={{border:"1px solid #e6e7e9", borderRadius:6}}>
                                            <Text>{`${address.street}` || "N/A"}</Text>
                                        </Box>
                                    </Box>
                                    <Box>
                                            <Text size="sm" c="dimmed" fw={600}>Ward No</Text>
                                            <Box p="xs"  bg="#e6e7e9" style={{border:"1px solid #e6e7e9", borderRadius:6}}>
                                                <Text>{`${address.ward}` || "N/A"}</Text>
                                            </Box>
                                            <Text size="sm" mt="6px" c="dimmed" fw={600}>Contact</Text>
                                            <Box p="xs"  bg="#e6e7e9" style={{border:"1px solid #e6e7e9", borderRadius:6}}>
                                                <Text>{`${address.phone}` || "N/A"}</Text>
                                            </Box>
                                    </Box>
                                </Stack>
                                <Box mt="10">
                                    <Button w="100%" color="#18191a" mt="auto" onClick={handleCancleAndUpdate}>
                                    Update
                                </Button>
                                </Box>
                            </Box>
                        </Card>
                    </Box>
                    </GridCol>
                    <Box style={{borderRight:'4px solid #0f0f0f', height:"auto", minHeight:"100%"}}/>
                    <GridCol span={{base:12, md:6 , lg:4, sm:2}}>
                        <Text size="xl" fw={700}>
                            Products Review
                        </Text>
                        <Card shadow="md" padding="md" withBorder h="auto">
                            {cartItems.length > 0 ?(
                                cartItems.map((item, index) => (
                                    <Box key={index} mt="10">
                                        <Group justify="space between" gap={4}>
                                            <Box>
                                                <Image src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.product.imgUrl}`}
                                                                        alt={item.product.imgUrl}
                                                                        w={50} h={50} radius="md" fit="cover"
                                                />
                                            </Box>
                                            <Box ml="40">
                                                <Box>
                                                    <Text size="xs" c="dimmed">Name</Text>
                                                    <Text fw={600} size="md" style={{overflowWrap:"anywhere"}}>
                                                        {item.product.name}
                                                    </Text>
                                                </Box>
                                                <Box mt="5">
                                                    <Text size="xs" c="dimmed">Quantity</Text>
                                                    <Text fw={600} size="md" style={{overflowWrap:"anywhere"}}>
                                                        {item.quantity}
                                                    </Text>
                                                </Box>
                                            </Box>
                                            <Box ml="auto" mr="10">
                                                <Text size="xs" c="dimmed" mx="md">Price</Text>
                                                    <Text fw={900} size="md" style={{overflowWrap:"anywhere"}}>
                                                        {`Rs. ${item.product.price}`}
                                                    </Text>
                                            </Box>
                                        </Group>
                                        <Box style={{borderBottom:'1px solid #e6e7e9', marginTop:"20px"}}/>
                                    </Box>
                                ))
                                ):(
                                    <Text c="dimmed" size="sm">
                                        Your Cart is Empty.
                                    </Text>
                                )
                            }
                            <Group justify="space-between"  mt={10} gap={4}>
                                <Text c="black">
                                    Subtotal
                                </Text>
                                <Text c="black" size="md" fw={400}>
                                    {subTotal === 0 ? "Rs 0.00" : `Rs. ${(subTotal).toFixed(2)}`}
                                </Text>
                            </Group>
                            <Group justify="space-between">
                                <Group>
                                    <Text>
                                        Shipping Fee
                                    </Text>
                                </Group>
                                    <span>{subTotal === 0 ? "Rs 0.00" : "Rs. 150.00"}</span>
                            </Group>                                
                            <Box style={{borderBottom:'1px solid #e6e7e9', marginTop:"20px"}}/>
                            <Group justify="space-between" mt={10}>
                                <Text fw={900} c="black" size="xl">
                                    Total
                                </Text>
                                <Text c="black" size="md" fw={700}>
                                    {subTotal === 0 ? "Rs 0.00" : `Rs. ${(subTotal + 150).toFixed(2)}`}
                                </Text>
                            </Group>
                            <Box mt={30} my="auto">
                                <Button w="100%" color="#31a6c4" mt="auto" onClick={handlePlaceOrder}>
                                    Order
                                </Button>
                                <Button w="100%" variant="transparent"
                                        mt="10" onClick={handleCancleAndUpdate}
                                        c="blue"
                                        className=" hover:!text-black transition-all duration-200"
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Card>                       
                    </GridCol>
                </Grid>
            </Card>
        </Box>
        </>
    );
};