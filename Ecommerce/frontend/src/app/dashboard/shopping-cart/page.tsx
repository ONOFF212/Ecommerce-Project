
'use client'
import  {useRouter}  from "next/navigation";
import { Card, Box, Text,Button,ScrollArea, Stack, Group, Grid, TextInput, Tooltip } from "@mantine/core";

import { CartHooks } from "@/features/dashboard/shoppingCart/hooks/useCarts";
import { CartList } from "@/features/dashboard/shoppingCart/components/cartItemsList";

import { createAddressSchema, addressInput } from "@/features/dashboard/shoppingCart/types/address";
import { zodResolver } from "@hookform/resolvers/zod";
import{useForm } from "react-hook-form";

import { TbReceiptDollar } from "react-icons/tb";
import { MdOutlineLocalShipping } from "react-icons/md";

import { createAddress, updateAddress } from "@/features/dashboard/shoppingCart/services/cart-api";


export default function ShoppingCart(){
    const router =  useRouter();
    const {cartItems , num, subTotal, address, isLoading} = CartHooks();
    
    const {register,handleSubmit, formState:{errors},} = useForm<addressInput>({resolver:zodResolver(createAddressSchema), 
                                                                    defaultValues:{
                                                                        province:address.province ?? "", 
                                                                        municipality:"", 
                                                                        local:"", 
                                                                        street:"",
                                                                        phone:"" ,
                                                                        ward:"" ,
                                                                        country:""
                                                                    },
                                                                });

    const handleCheckOut = async(address:addressInput)=>{
        try{
            if(!address){
                alert("Address is Empty. Please fill the Address");
                return;
            }
            router.push('/dashboard/shopping-cart/place-order');
        }catch(error){
            console.error("Checkout error:", error);
        }
        router.push('/dashboard/shopping-cart/place-order');
    };
    const handleExistingCheckout = () => {
        if(!cartItems || cartItems.length === 0){
            alert("Your cart is Empty");
            return;
        }
        router.push('/dashboard/shopping-cart/place-order');
    };
    const onSubmit = async(data:addressInput) => {
        await createAddress(data);
        router.refresh();
    };

    const handleUpdate = async(data:addressInput)=>{
        await updateAddress(data);
        router.refresh();
    }

    const handleButton = ()=>{
        router.push('/');
    }
    return(
        <>
        <Box>
            <Grid justify="center" gap={20} style={{marginRight:20}}>
                <Grid.Col span={6} >
                    <Card shadow="md" padding="lg" mt="md" withBorder h={600}>
                        <Group justify="space-between">
                            <Box>
                                <Text size="xl" fw={900}>
                                    Your Shopping Cart
                                </Text>
                                <Text size="xs" c="dimmed">
                                    Make sure everything looks right before checkout.
                                </Text>
                            </Box>
                            <Button size="xs" 
                                    variant="default" 
                                    c="dimmed"  onClick={handleButton}
                            >
                                Continue shopping
                            </Button>
                        </Group>
                        <Group w="100%">
                            <ScrollArea h={500} w="100%" scrollbarSize={6}>
                                {isLoading ? (
                                    <CartList cartItem={cartItems}/>
                                ):(
                                    <Box>
                                        <Box style={{borderBottom:'1px solid #e6e7e9', marginTop:10}}/>
                                        <Text fw={700} size="xl" style={{textAlign:"center", alignItems:"center"}}>No Cart Item Found!!!</Text>
                                    </Box>
                                )}
                            </ScrollArea>
                        </Group>
                    </Card>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Card shadow="md" padding="lg" mt="md" withBorder h="auto">
                        <Box>
                            <Group justify="space-between">
                                <Text fw={900}>
                                    Order Cost
                                </Text>
                                <Group>
                                    <Text size="sm" c="dimmed">{num}</Text>
                                    <Text size="sm" c="dimmed">
                                    items
                                    </Text>
                                </Group>
                            </Group>
                        </Box>
                        <Box style={{borderBottom:'1px solid #e6e7e9', marginTop:10}}/>
                        <Box>
                            <Stack mt="md" c="dimmed">
                                <Group justify="space-between">
                                    <Group>
                                        <TbReceiptDollar size={20}/>
                                    <Text>
                                        Subtotal
                                    </Text>
                                    </Group>
                                    <Text>{`Rs ${subTotal}`}</Text>
                                </Group>
                                <Group justify="space-between">
                                    <Group>
                                        <MdOutlineLocalShipping size={20}/>
                                        <Text>
                                            Shipping Fee
                                        </Text>
                                    </Group>
                                    <span>{subTotal === 0 ? "Rs 0.00" : "Rs. 150"}</span>
                                </Group>
                                <Box style={{borderBottom:'1px solid #e6e7e9', marginTop:10}}/>
                                <Group justify="space-between">
                                    <Text fw={900} c="black" size="xl">
                                        Total
                                    </Text>
                                    <Text c="black" size="md" fw={700}>
                                        {subTotal === 0 ? "Rs 0.00" : `Rs. ${(subTotal + 150).toFixed(2)}`}
                                    </Text>
                                </Group>
                            </Stack>
                        </Box>
                        <Box style={{borderBottom:'1px solid #e6e7e9', marginTop:10}}/>
                        <Stack>
                            <form onSubmit={ handleSubmit(onSubmit)}>
                                <Text mt="10" size="md" fw={700}>Shipping Address</Text>
                                <TextInput size="xs" fw={700} label="Country" placeholder={`${address?.country ?? "Country" }`}
                                            {...register("country", {required:true})} error={errors.country?.message} defaultValue={address?.country ?? ""}
                                />
                                <TextInput mt="10" size="xs" fw={700} label="Province/State*" placeholder={`${address?.province ?? "Province Name"}`} 
                                    {...register("province")} error={errors.province?.message}  defaultValue={address?.province ?? ""}
                                />
                                <TextInput mt="10" size="xs" fw={700} label="City/Municipality*" placeholder={`${address?.municipality ?? "Municipality Name"}`} 
                                    {...register("municipality")} error={errors.municipality?.message} defaultValue={address?.municipality ?? ""}
                                />
                                <TextInput mt="10" size="xs" fw={700} label="Area/locality*" placeholder={`${address?.local ?? "Local Address"}`}
                                    {...register("local")} error={errors.local?.message} defaultValue={address?.local ?? ""}
                                />
                                <TextInput mt="10" size="xs" fw={700} label="Street Address*" placeholder={`${address?.street ?? "Street Name"}`}
                                    {...register("street")} error={errors.street?.message} defaultValue={address?.street ?? ""}
                                />
                                <Group grow align="flex-start"  mx="auto" justify="space-between" gap="md">
                                    <TextInput mt="10" size="xs" fw={700}  label="Mobile Number*"
                                                placeholder={`${address?.phone ?? "Mobile Number"}`} styles={{input:{textAlign:"center"},}}
                                                {...register("phone")} error={errors.phone?.message} defaultValue={address?.phone ?? ""}
                                    />
                                    <TextInput mt="10" size="xs" fw={700} ta="center" label="Ward NO"
                                                placeholder={`${address?.ward ?? "Ward No"}`} styles={{input:{textAlign:"center"},}}
                                                {...register("ward")} error={errors.ward?.message} defaultValue={address?.ward ?? ""}
                                    />
                                </Group>
                            
                                <Group justify="center" mt="20">
                                    {!address ?(
                                    <Tooltip label="save address">
                                        <Button color="#fffffe"                                         
                                                bg="green"
                                                type="button"
                                                onClick={handleSubmit(onSubmit)}
                                                className="hover:!shadow-md" 
                                        >
                                            submit
                                        </Button>
                                    </Tooltip>
                                    ):(
                                    <Tooltip label="update Address">
                                        <Button color="#131212" 
                                            type="button"
                                            onClick={handleSubmit(handleUpdate)}
                                            className="hover:!shadow-md"  
                                        >
                                        update
                                        </Button>
                                    </Tooltip>
                                    )}
                                </Group>
                            </form>
                        </Stack>
                        <Box style={{borderBottom:'1px solid #e6e7e9', marginTop:10}}/>
                        <Box mt="auto">
                            <Button w="100%" color="#31a6c4" mt="auto" onClick={address ? handleExistingCheckout : handleSubmit(handleCheckOut)}>
                                {"Checkout ->"}
                            </Button>
                            <Group justify="center" mb="auto">
                                <Button size="sm"  mx="auto" mt="md" variant="transparent" 
                                    c="black"  onClick={handleButton}
                                    className=" hover:!text-[#31a6c4] transition-all duration-200"
                                    styles={{root:{'&hover':{backgroundColor:"#44a8b6"}}}}
                                >
                                    Continue shopping
                                </Button>
                            </Group>
                        </Box>
                    </Card>
                </Grid.Col>
            </Grid>
        </Box>
        </>
    );
};