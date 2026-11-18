
'use client';
import AdminProductsHooks from "@/features/admin/products/hooks/useAdminProducts";
import { AdminProductList } from "@/features/admin/products/components/AdminProductList";

export default function ProductPage(){

    const {productsList} = AdminProductsHooks();
    return(
        <>
        <div>
            <div>
                <AdminProductList products={productsList} />
            </div>
        </div>
        </>
    );
};