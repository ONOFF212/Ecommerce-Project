
'use client';
import { useRouter } from "next/navigation";
import { FaCartPlus } from "react-icons/fa6";
import { Card, Image, Text, Stack, Button, Group, Badge } from "@mantine/core";


import { createCartItem } from "@/features/dashboard/shoppingCart/services/cart-api";
import { useAuth } from "@/contexts/auth/AuthContext";
import { productsDetails } from "../types/product";

interface productDetailProps {
    product : productsDetails;
}


const URL = process.env.NEXT_PUBLIC_API_URL;
export function ProductCard({product}:productDetailProps) {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    const handleCart = async() =>{
        if(!isAuthenticated){
            router.push("/auth/login");
            return;
        }

        await createCartItem({quantity:1, product_id:product.id}); 
        window.location.reload();
    };

    const handleViewProduct = async() => {
        router.push(`/products/${product.id}`);
    };

    return(
        <Card
              shadow="sm" padding='md' radius='md' h={350} style={{display:'grid', gridTemplateRows:'160px 1fr', overflow:'hidden', cursor:'pointer', transition:'box-shadow 0.2s ease',}}
              onClick={handleViewProduct}
              onMouseEnter={(e) => {e.currentTarget.style.boxShadow='0 4px 12px rgba(0,0,0,0.12)';}}
              onMouseLeave={(e) => {e.currentTarget.style.boxShadow="";}}
        >
            <Image
                src={`${URL}/uploads/${product.imgUrl}`}
                alt={product.imgUrl}
                fit="contain"
                h={160}
                w='100%'
                p='md'
            />

            <Stack gap={8} justify="space-between" style={{overflow:"hidden", flex:1, minHeight:0}}>
                <Group justify="space-between">
                    <Text fw={600} c='dark' lineClamp={1}>
                        {product.name}
                    </Text>
                    <Text component="div" fw={600} c='dimmed' size="xs" lineClamp={1}>
                        <Badge  variant="light"  radius="md" size="sm">
                            {product.category.name}
                        </Badge>
                    </Text>
                </Group>
                <Text size="sm" c='black' lineClamp={3}>
                    {product.description}
                </Text>
                <Group justify="space-between" >
                    <Text size="sm" fw={700}>
                        Price:{product.price} 
                    </Text>
                    <Button
                            justify="end"
                            color="#31a6c4"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCart();}}
                            mt='sm'
                        >
                            <FaCartPlus style={{marginRight:8}}/>
                            Add-to-Cart
                        </Button>
                </Group>
            </Stack>
        </Card>
    );
};