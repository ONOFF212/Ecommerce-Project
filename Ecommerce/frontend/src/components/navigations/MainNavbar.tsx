
'use client'
import Link from "next/link";
import { Group, Anchor, Box } from "@mantine/core";

import { useAuth } from "@/contexts/auth/AuthContext";

export default function Mainnavbar() {
    const {isAuthenticated} = useAuth();
    return (
        <>
            {!isAuthenticated && (
                <Box py="xs" px='md'>
                    <Group justify="center" gap="xl">
                        <Anchor
                            component={Link}
                            href='/'
                            c="white"
                            fw={700}
                            size="lg"
                            underline="never"
                            className="!text-xl hover:!text-black transition-all duration-200"
                        >
                            Home
                        </Anchor>

                        <Anchor
                            component={Link}
                            href='/auth/register'
                            c="white"
                            fw={700}
                            size="lg"
                            underline="never"
                            className="!text-xl hover:!text-black transition-all duration-200"
                        >
                            SignUp
                        </Anchor>

                        <Anchor
                            component={Link}
                            href='/auth/login'
                            c="white"
                            fw={700}
                            size="lg"
                            underline="never"
                            className="!text-xl hover:!text-black transition-all duration-200"
                        >
                            Login
                        </Anchor>

                    </Group>
                </Box>
            )}
        </>
    );
};