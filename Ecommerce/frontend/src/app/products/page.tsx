
'use client'
import { useState, useCallback } from "react";
import './product-style.css';

import SearchNavBar from "@/features/products/filters/Navbar";
import SideBar from "@/features/products/filters/Sidebar";
import Pagination from "@/components/Pagination";
import SortProducts from "@/features/products/filters/SortProducts";
import { ProductsList } from "@/features/products/components/ProductList";

import  ProductsHooks  from "@/features/products/hooks/useProducts";

export default function ProductPage(){
  const [filters, setFilters] = useState({ search:"", category:"", minPrice:0, maxPrice:0, sort:"", page:1, limit:8 });

  const {products, totalPages} = ProductsHooks(filters);

  const handleFilterChange = useCallback((newFilters: { category: string; minPrice: number; maxPrice: number; sort?: string; }) => {
                                        setFilters((prev) => ({
                                          ...prev,
                                          ...newFilters
                                        }));
                                      }, []);
  return (
   <div className="product-layout">
      <div className="nav-bar">
        <SearchNavBar onFilterChange={(newFilters) => 
                                        setFilters((prev) => ({
                                          ...prev,
                                          ...newFilters
                                        }))
                                      } 
        />
      </div>

      <div className="side-bar">
        <SideBar onFilterChange={handleFilterChange}
      />
      </div>

      <div className="product-view">
        <div>
          <SortProducts onSortChange={(newFilters) => 
                                          setFilters((prev) => ({
                                            ...prev,
                                            ...newFilters
                                          }))
                                          } 
                                        />
        </div>
        <ProductsList products={products} />
        {/* <Pagination page={filters.page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => 
                      setFilters((prev) => ({
                        ...prev,
                        page:newPage,
                      }))
                    }
        /> */}
      </div>

      <div className="footer font-mono">
        {/* <p>
          © {new Date().getFullYear()} Shopify. All rights reserved.
        </p> */}
        <Pagination page={filters.page}
                    totalPages={totalPages}
                    onPageChange={(newPage) => 
                      setFilters((prev) => ({
                        ...prev,
                        page:newPage,
                        
                      }))
                    }
        />
      </div>
    </div>
  );
};