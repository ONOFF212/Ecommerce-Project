
import { CgProfile } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Group, Text, ActionIcon } from "@mantine/core";


export default function AdminHeader(){
    return(
        <Group justify="space-between" align="center">
            <Text fw={700} size="xl" ff="monospace">
                Admin Panel
            </Text>

            <Group gap={40}>
                <ActionIcon>
                    <IoIosNotificationsOutline size={30}/>
                </ActionIcon>
                <ActionIcon>
                    <CgProfile size={30}/>
                </ActionIcon>
            </Group>
        </Group>
    );
};