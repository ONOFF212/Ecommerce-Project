
'use client'
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";

import { Group, Card, Stack, Image, Text, Button, Box} from "@mantine/core";

import { adminDeleteProduct } from "@/features/admin/products/services/admin-product-api";
import { useRouter } from "next/navigation";

interface productDetail{
    id:number;
    imgUrl:string;
    name:string;
    price:number;
    stock:number;
    description:string;
    category:{
        id:string;
        name:string;
    };
}

interface productProps{
    product: productDetail;
}

export  function AdminProductCard({product}:productProps){
    const router = useRouter();

    const handleChange = (e:React.MouseEvent<HTMLButtonElement>, product:productDetail) => {
        const {name} = e.currentTarget;
        if(name === 'edit'){
            router.push(`/admin/products/${product.id}`);

        } else if(name === 'delete'){
            const id = Number(product.id);
            adminDeleteProduct(id);
            router.refresh();
        } else{
            throw new Error("Action Failed....");
            return;
        }
    };

    return(
        <>
        <Card withBorder w="100%">
            <Group gap="md" wrap="wrap">
                <Image src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.imgUrl}`}
                        alt={product.imgUrl}
                        w={96} h={96} radius="md" fit="cover"
                />
                <Stack gap="sm" style={{flex:1, minWidth:100}}>
                    <Box>
                        <Text size="xs" c="dimmed">Name</Text>
                        <Text size="xs" fw={700} style={{overflowWrap:"anywhere"}}>
                            {product.name}
                        </Text>
                    </Box>
                    <Box>
                        <Text size="xs" c="dimmed">Price</Text>
                        <Text size="xs" fw={600} style={{overflowWrap:"anywhere"}}>
                            {product.price}
                        </Text>
                    </Box>
                </Stack>
                <Stack gap={4} align="center" justify="center" miw={80}>
                    <Text size="xs" c="dimmed">Stock</Text>
                    <Text>{product.stock}</Text>
                </Stack>
                <Stack gap="sm" miw={100}>
                    <Button name="edit" variant="subtle" color="blue" size="xs"
                            leftSection={<BiSolidEdit size={18}/>}
                            onClick={(e) => handleChange(e, product)}
                    >
                        Edit
                    </Button>

                    <Button name="delete" variant="subtle" color="red" size="xs"
                            leftSection={<RiDeleteBin2Line size={18}/>}
                            onClick={(e) => handleChange(e, product)}
                    >
                        Delete
                    </Button>
                </Stack>
            </Group>
        </Card>
        </>
    );
};