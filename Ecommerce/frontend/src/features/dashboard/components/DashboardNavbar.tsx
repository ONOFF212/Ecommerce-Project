
"use client"
import Link from "next/link";
import { FaCartPlus } from "react-icons/fa6";
import { Box, Group, Anchor } from "@mantine/core";

export default function DashboardNavbar() {
    return (
        <>
        <Box  p="md" bg="#31a6c4" >
            <Group justify="space-between">
                <Anchor component={Link}
                        href='/dashboard'
                        c="white" fw={700} underline="never"
                        className="!text-xl hover:!text-red-500 transition-all duration-200"
                >
                    Dashboard
                </Anchor>
                <Group>
                    <Anchor component={Link}
                        href='/products'
                        c="white" fw={700} underline="never"
                        className="hover:!text-black transition-all duration-200"
                    >
                        Products
                    </Anchor>

                    <Anchor component={Link}
                        href='/dashboard/orders'
                        c="white" fw={700} underline="never"
                        className="hover:!text-black transition-all duration-200"
                    >
                        Order
                    </Anchor>
                    
                    <Anchor component={Link}
                        href='/dashboard/shopping-cart'
                        c="white" fw={700} underline="never"
                        className="hover:!text-black transition-all duration-200"
                    >
                        <Group gap={4}>
                            <FaCartPlus size={20}/>
                            <span>Cart</span>
                        </Group>
                    </Anchor>

                    <Anchor component={Link}
                            href='/dashboard/profile'
                            c="white" fw={700} underline="never"
                            className=" hover:!text-black transition-all duration-200"
                    >
                        Profile
                    </Anchor>
                </Group>
            </Group>
        </Box>
        </>
    );
};
