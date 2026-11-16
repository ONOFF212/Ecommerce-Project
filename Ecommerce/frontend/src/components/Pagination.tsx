
import { Group, Text, Pagination } from "@mantine/core";
interface paginationProps {
    page:number;
    totalPages:number;
    onPageChange:(page:number) => void;
}

export default function Paginations({page,totalPages,onPageChange}:paginationProps) {

    return(
        <Pagination.Root total={totalPages} 
                         value={page} 
                         onChange={onPageChange}
                         style={{}}
        >
            <Group justify="center" gap="md">
                <Pagination.Previous/>
                <Text size="sm">
                    Page {page} of {totalPages}
                </Text>
                <Pagination.Next/>
            </Group>
        </Pagination.Root>
    );
};