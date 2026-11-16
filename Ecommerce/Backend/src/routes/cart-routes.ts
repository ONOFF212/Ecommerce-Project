
import Router from "@koa/router";

import { addItem,
         updateItem, 
         viewItems, 
         deleteItem,
         addAddress, 
         updateAddress
} from "../controllers/cart-controller.ts";

export const cartRouter = new Router({prefix:"/api"});

cartRouter.post('/carts', addItem);
cartRouter.get('/carts', viewItems);
cartRouter.put('/carts/:id' , updateItem);
cartRouter.delete('/carts/:id', deleteItem);

cartRouter.post('/carts/address', addAddress);
cartRouter.put('/carts/address/:id' , updateAddress);