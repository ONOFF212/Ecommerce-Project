
'use client';
import { Box, Group, TextInput, ActionIcon, Text, Tooltip } from "@mantine/core";
import { FiHeart, FiSearch, FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import Mainnavbar from '@/components/navigation/HomeNavbar';
import { useRouter } from "next/navigation";
import { CartHooks } from "@/features/dashboard/shoppingCart/hooks/useCarts";


interface searchProps{
    onFilterChange:(filters:{search:string}) =>void;
}

export default function SearchNavBar( {onFilterChange}:searchProps){

    const router = useRouter();
    const {num} = CartHooks();
    const[searchQuery, setSearchQuery] = useState('');

    const handleQuery = async(value:string) => {
        setSearchQuery(value);
        onFilterChange({search:value});
    };

    return(
        <Box>
            <Mainnavbar/>
            <Group mt="sm" gap='md' align="center" wrap="nowrap">
                <Text
                    fw={700}
                    size="30px"
                    style={{whiteSpace:"wrap"}}
                >
                    Shopify
                </Text>

                <Text
                    size="sm"
                    c='black'
                    style={{whiteSpace:'wrap'}}
                >
                    Everything You Love, In One Place
                </Text>

                <TextInput
                    placeholder="Search Products...."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.currentTarget.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleQuery(searchQuery);
                        }
                    }}
                    rightSection={
                        <Tooltip label="search">
                            <ActionIcon
                                onClick={() => handleQuery(searchQuery)}
                            >
                                <FiSearch size={20}/>
                            </ActionIcon>
                        </Tooltip>
                    }
                    radius="md"
                    size="sm"
                    w={400}
                    style={{flex:1, minWidth:150}}
                    styles={{
                        input:{backgroundColor : '#f8fafc',
                            color:'black',
                        },
                    }}
                />

                <Tooltip label='shopping-cart'>
                    <ActionIcon 
                        variant="subtle"
                        color="white"
                        size='xl'
                        aria-label="Shopping cart"
                        onClick={() => router.push('/dashboard/shopping-cart')}
                    >
                        <FiShoppingCart size={25} />
                            {num !== undefined && num > 0 && (
                                <span
                                    style={{position:"absolute", top:"1px", right:"0px", fontSize:"18px", fontWeight:"bold", color:"black"}}
                                >
                                    {num}
                                </span>
                            )} 
                    </ActionIcon>
                </Tooltip>

                <Tooltip label='whishlist' >
                    <ActionIcon 
                        variant="subtle"
                        color="white"
                        size='xl'
                        aria-label="Wishlist"
                    >
                        <FiHeart size={25} />
                    </ActionIcon>
                </Tooltip>
            </Group>
        </Box>
    );
};