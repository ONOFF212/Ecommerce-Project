
import Router from "@koa/router";
import { createOrder,
         viewOrderItems, 
         viewOrderById, 
         adminUpdateOrder, 
         adminViewOrder 
} from "../controllers/order-controller.ts";
import { roleBasedMiddleware } from "../middlewares/role-based-middleware.ts";

export const orderRouter = new Router({prefix:'/api'});


orderRouter.post('/orders', createOrder);
orderRouter.get('/orders', viewOrderItems);
orderRouter.get('/orders/:id', viewOrderById);

orderRouter.get('/admin/orders',roleBasedMiddleware, adminViewOrder);
orderRouter.put('/admin/orders/:id',roleBasedMiddleware, adminUpdateOrder);