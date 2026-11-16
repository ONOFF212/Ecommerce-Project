
'use client'
import { useEffect, useState } from "react";
import { Box, Checkbox, Button, Stack, Group, Title, Divider, Text, NumberInput, Tooltip } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";


interface categoryProps{
    onFilterChange:(filters:{category:string;
                              minPrice:number;
                              maxPrice:number;
                              sort?:string;  
    }) =>void;
}

export default function SideBar({onFilterChange}:categoryProps){
    
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [debouncedPrices] = useDebouncedValue({category, minPrice, maxPrice}, 500);

    useEffect(() => {
        onFilterChange({
            category,
            minPrice: debouncedPrices.minPrice,
            maxPrice: debouncedPrices.maxPrice
        });
    }, [debouncedPrices,category, onFilterChange]);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)  =>{
        const {value, checked} = e.target;
        const newCategory = checked ? value :"";
        setCategory(newCategory);
        onFilterChange({
            category: newCategory,
            minPrice,
            maxPrice
        });
    };

    const handlePrice = (name:"minPrice" | "maxPrice", value:number | string) => {
        const price = value === "" ? 0 :Number(value);

        if(name === "minPrice"){
            if(maxPrice !== 0 && price > Number(maxPrice)){
                return;
            }
            setMinPrice(price);
        }else if(name === "maxPrice"){
            if(minPrice !== 0 && price < Number(minPrice)){
                return;
            }
            setMaxPrice(price);
        }
    };

    const handleReset = () => {
        setCategory("");
        setMaxPrice(0);
        setMinPrice(0);
    };

    return (
        <Box p='md'>
            <Group justify="space-between" pb='sm'>
                <Title order={5}>Filters</Title>
                <Tooltip label="Filter-Products">
                    <Text size="lg">☷</Text>
                </Tooltip>
            </Group>
            <Divider color="gray.3"/>
            <Title order={5} mt="lg" mb='md'>
                Categories
            </Title>

            <Stack>
                {["Health & Beauty",
                  "Electronics & Media",
                  "Fashion & Apparel",
                  "Home & Lifestyle"
                ].map((item) => (
                    <Checkbox
                        key={item}
                        label={item}
                        value={item}
                        checked={category === item}
                        onChange={(e) => handleChange(e)}
                    />))
                }
            </Stack>

            <Divider my='lg' color="gray.3"/>

            <Title order={5} mb="md">
                Price Range
            </Title>

            <Stack gap='md'>
                <NumberInput
                    label="Min-Price"
                    placeholder="Enter minimum price"
                    step={50}
                    value={minPrice || ""}
                    onChange={(value) => 
                        handlePrice("minPrice", value )
                    }
                    hideControls
                    radius='md'
                    styles={{
                        input:{textAlign:"center", fontWeight:700},
                        label:{textAlign:"center", width:"100%"}
                    }}
                />

                <NumberInput
                    label="Max-Price"
                    placeholder="Enter maximum price"
                    step={100}
                    value={maxPrice || ""}
                    onChange={(value) => 
                        handlePrice("maxPrice", value )
                    }
                    hideControls
                    radius='md'
                    styles={{
                        input:{textAlign:"center", fontWeight:700},
                        label:{textAlign:"center", width:"100%"}
                    }}
                />
            </Stack>

            <Divider my='lg' color="gray.3"/>

            <Button
                fullWidth
                onClick={handleReset}
                mt='sm'
            >
                Reset Filters
            </Button>
        </Box>
    );
};