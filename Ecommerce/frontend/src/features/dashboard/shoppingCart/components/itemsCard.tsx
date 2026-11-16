
'use client'
import { Group, Card, Stack, Image, Text, Box, NumberInput, Badge, Grid, Tooltip, Button} from "@mantine/core";
import { cartItemsDetails } from "../types/cart";

import { GrFormSubtract } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";

import { useState } from "react";

import { deleteCartItem, updateCartItem } from "../services/cart-api";

interface productProps{
    cartItem: cartItemsDetails;
}

export  function CartItemsCard({cartItem}:productProps){
    
    const [quantity, setQuantity] = useState<number>(cartItem.quantity);

    const handleQuantity = (name:"sub" | "add") =>{
        let total = quantity;
        if(name === 'sub') {
            if(total === 1){return;}
            total--;
        }else if(name === 'add') {
            total++;
        }
        setQuantity(total);
    };

    const handleRemove = async() => {
        await deleteCartItem(cartItem.id);
        window.location.reload();
    };

    const handleSave = async() => {
        await updateCartItem(cartItem.id, quantity);
        window.location.reload();
    }

    const handleClear = () => {
        setQuantity(cartItem.quantity);
    }

    return(
        <>
        <Card withBorder w="100%">
            <Grid justify="center" gap={20} style={{marginRight:20}}>
                <Grid.Col span={12} >
            <Group gap="md" wrap="wrap" justify="space-between" >
                <Image src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${cartItem.product.imgUrl}`}
                        alt={cartItem.product.imgUrl}
                        w={50} h={50} radius="md" fit="cover"
                />
                <Stack gap="sm" style={{ minWidth:100}}>
                    <Box>
                        <Text size="xs" c="dimmed">Name</Text>
                        <Text size="xs" fw={700} style={{overflowWrap:"anywhere"}}>
                            {cartItem.product.name}
                        </Text>
                    </Box>
                    <Box>
                        <Text size="xs" c="dimmed">Price</Text>
                        <Text size="xs" fw={600} style={{overflowWrap:"anywhere"}}>
                            {cartItem.price}
                        </Text>
                    </Box>
                </Stack>
                <Box>
                    <Group>
                        <GrFormSubtract size={20} 
                                        onClick={() => handleQuantity("sub")} 
                                        className="mt-6 hover:!text-red-500 cursor-pointer transition-all duration-200"
                        />
                        <NumberInput hideControls 
                                     radius="md"
                                     min={1}
                                     value={quantity }
                                     label="quantity"
                                     styles={{
                                        input:{textAlign:"center", fontWeight:700},
                                        label:{textAlign:"center", width:"100%"}
                                     }}
                        />
                        <IoIosAdd size={20} 
                                  onClick={() => handleQuantity("add")}
                                  className="mt-6 hover:!text-green-500 cursor-pointer transition-all duration-200"
                        />
                    </Group>
                </Box>
                <Stack gap={4} align="center" justify="center" miw={80}>
                    <Text size="xs" c="dimmed">category</Text>
                    <Badge  variant="outline" radius="md" size="lg" ta="center">
                        <Text c="dimmed" size="xs">{cartItem.product.category.name}</Text>
                    </Badge>
                    <Tooltip label="Remove-items">
                        <Group
                                mt="10" 
                                onClick={handleRemove}
                                className="hover:!text-red-600 cursor-pointer transition-all duration-200"
                        >
                            <RiDeleteBin5Line size={15} />
                            <Text size="xs">Remove</Text>
                        </Group>
                    </Tooltip>
                </Stack>
            </Group>
            </Grid.Col>
            </Grid>
        </Card>
        <Box mt="md">
            <Group justify="end">
                <Button color="black" onClick={handleSave}>Save cart</Button> 
                <Button variant="transparent" c="black" onClick={handleClear}>Clear</Button>  
            </Group>
        </Box>
        </>
    );
};