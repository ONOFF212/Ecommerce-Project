
'use client';
import Link from "next/link";
import { useAuth } from "@/contexts/auth/AuthContext";

import {Stack, NavLink, Box} from '@mantine/core';

import { RxDashboard } from "react-icons/rx";
import { TbCubePlus } from "react-icons/tb";
import { IoBagAddOutline } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { MdAddShoppingCart } from "react-icons/md";
import { usePathname } from "next/navigation";


export function AdminSideBar() {
    const {logout} = useAuth();
    const pathname = usePathname();
    const showAddProducts = pathname === '/admin/products';

    return (
        <>
        <Stack gap="lg" p="md" mt="xl">
            <NavLink
                component={Link}
                href="/admin"
                label="Dashboard"
                leftSection={<RxDashboard size={30}/>}
                styles={{root:{
                        border:"2px solid transparent", borderRadius:'24px', fontWeight:700, fontSize:"20px"
                    }
                }}
            />
            <NavLink
                component={Link}
                href="/admin/products"
                label="Products"
                leftSection={<TbCubePlus size={30}/>}
                styles={{root:{
                        border:"2px solid transparent", borderRadius:'24px', fontWeight:700, fontSize:"20px"
                    }
                }}
            />
            <NavLink
                component={Link}
                href="/admin/orders"
                label="Orders"
                leftSection={<IoIosPeople size={30}/>}
                styles={{root:{
                        border:"2px solid transparent", borderRadius:'24px', fontWeight:700, fontSize:"20px"
                    }
                }}
            />
            <NavLink
                component={Link}
                href="/admin/customers"
                label="Customers"
                leftSection={<IoBagAddOutline size={30}/>}
                styles={{root:{
                        border:"2px solid transparent", borderRadius:'24px', fontWeight:700, fontSize:"20px"
                    }
                }}
            />
            <Box style={{borderBottom:'1px solid #f8fafc', marginTop:20, marginBottom:20}}/>
            {showAddProducts && (
                <NavLink
                component={Link}
                href="/admin/products/new"
                label="Add Products"
                leftSection={<MdAddShoppingCart size={30} color="white" />}
                styles={{ root: { border: '1px solid #2563eb',borderRadius: '24px',fontWeight:700, transition: 'all 0.5s ease-in-out',},}}
                />
            )} 
            <Box style={{ flex: 1 }} />  
            <NavLink
                onClick={logout}
                label="Log-Out"
                leftSection={<LuLogOut size={30} color="red" />}
                styles={{ root: {
                    border: '1px solid #2563eb', borderRadius: '24px', padding: '10px 24px', color: 'white',fontColor:"black",
                    fontSize: '18px', fontWeight: 700, transition: 'all 0.5s ease-in-out',
                },
                }}
            />
        </Stack>
        </>
    );
};
