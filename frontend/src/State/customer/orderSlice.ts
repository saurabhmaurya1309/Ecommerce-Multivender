import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderItem, OrderState } from "../../types/orderTypes";
import { api } from "../../config/Api";
import { Address } from "../../types/UserTypes";


const API_URL = "/api/orders";
 const initialState: OrderState = {
    orders: [],
    orderItems: null,
    currentOrder: null,
    paymentOrder: null,
    loading: false,
    error: null,
    orderCancelled: false, 
};

export const fetchUserOrderHistory =  createAsyncThunk<Order[],string>(
    'orders/fetchUserOrderHistory',
    async (jwt, {rejectWithValue}) => {
        try {
            const response = await api.get<Order[]>(`${API_URL}/user`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.error || 'Failed to fetch order history');
        }

    }
);

export const fetchOrderById =  createAsyncThunk<Order, { orderId: number;jwt: string }>(
    'orders/fetchOrderById',
    async ({ orderId,jwt }, {rejectWithValue}) => {
        try {
            const response = await api.get<Order>(`${API_URL}/${orderId}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.error || 'Failed to fetch order details');
        }
    }
);

export  const createOrder = createAsyncThunk<any, { address: Address; jwt: string ,paymentGateway: string}>(
    'orders/createOrder',
    async ({ address, jwt, paymentGateway }, {rejectWithValue}) => {
        try {
            const response = await api.post<any>(`${API_URL}`, address, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                },
                params: {
                    paymentGateway: paymentGateway
                }
            });
            console.log("Order Response:", response.data);
            if(response.data.payment_link_url){
                window.location.href = response.data.payment_link_url;
            }
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.error || 'Failed to create order');
        }
    }
);
export const fecthOrderItemById = createAsyncThunk<OrderItem, { orderItemId: number;jwt: string}>(
    'orders/fecthOrderItemById',
    async ({ orderItemId,jwt }, {rejectWithValue}) => {
        try {   
            const response = await api.get<OrderItem>(`${API_URL}/items/${orderItemId}`, {
                headers: {
                    'Authorization': `Bearer ${jwt}`
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.error || 'Failed to fetch order item details');
        }
    }
);

export const paymentSuccess = createAsyncThunk<any, {paymentId: string, jwt: string,paymentLinkId: string},{rejectValue: string}>(
    'orders/paymentSuccess',
    async ({ paymentId, jwt,paymentLinkId }, { rejectWithValue }) => {
        try {   
            const response = await api.get(`${API_URL}/payment/${paymentId}`,{
                headers: {
                    'Authorization': `Bearer ${jwt}`
                },
                params:{
                    paymentLinkId: paymentLinkId
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.error || 'Payment verification failed');
        }       
    }
);  
export const cancelOrder = createAsyncThunk<Order,any>(
    'orders/cancelOrder',
    async (orderId, {rejectWithValue}) => {
        try {
            const response = await api.put<Order>(`${API_URL}/${orderId}/cancel`,{},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            });
            return response.data;   
        }
        catch (error: any) {
            return rejectWithValue(error.response.data.error || 'Failed to cancel order');
        }
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
    .addCase(fetchUserOrderHistory.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.orderCancelled = false;
    })
    .addCase(fetchUserOrderHistory.fulfilled, (state, action:PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
    })
    .addCase(fetchUserOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
    })
    .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchOrderById.fulfilled, (state, action:PayloadAction<Order>) => {
        state.loading = false;
        state.currentOrder = action.payload;
    })
    .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
    })
    .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(createOrder.fulfilled, (state, action:PayloadAction<any>) => {
        state.loading = false;
        state.paymentOrder = action.payload;
    })
    .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
    })
    .addCase(fecthOrderItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fecthOrderItemById.fulfilled, (state, action) => {
        state.loading = false;  
        state.orderItems = [action.payload];
    })
    .addCase(fecthOrderItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
    })
    .addCase(paymentSuccess.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(paymentSuccess.fulfilled, (state, action) => {
        state.loading = false;
        //state.paymentOrder = action.payload;
    })
    .addCase(paymentSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
    })
    .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderCancelled = false;
    })
    .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderCancelled = true;
        // Update the order status in orders array if exists
        state.orders = state.orders.map(order =>
            order.id === action.payload.id ? action.payload : order
        );
        state.currentOrder = action.payload;
    })
    .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.orderCancelled = false;
    });
    }
});
export default orderSlice.reducer;