import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) ? [] : JSON.parse(localStorage.getItem('cartItems')),
    amount: 0,
    total: 0,
    isLoading: true,
    isLogin: false,
    data: [],
    datas: []
}

export const getAllCandleafs = createAsyncThunk('card/getAllCarts', async () => {
    try{
        const url = 'https://candleafs-api-1311.herokuapp.com/api/v1/candleafs'
        const response = await fetch(url)
        const dataResponse = await response.json()
        return dataResponse;
    } catch(err){
        console.log(err);
    }
    
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{

        addItem: (state, action) => {
            let flag = false;  
            const items = state.cartItems.map(item => {
                if(item._id === action.payload.id){
                    flag = true;
                    return {...item, amount: item.amount + action.payload.amount}
                }

                return item;
            })

            if(flag){
                state.cartItems = items;
            } else {
                const newItem = state.data.filter(item => item._id === action.payload.id)
                newItem[0].amount = action.payload.amount;
                state.cartItems = [...state.cartItems, newItem[0]]
            }
            state.cartItems = [...state.cartItems]
        },  
        
        removeItem:(state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload)
        },
        
        decreaseItem:(state, action) => {
            const newItems = state.cartItems.map(item => {
                if(item._id === action.payload){
                    return {...item, amount: item.amount - 1}
                }
                return item;
            }).filter(item => item.amount > 0)
            state.cartItems = newItems
        },

        increaseItem:(state, action) => {
            const newItems = state.cartItems.map(item => {
                if(item._id === action.payload){
                    return {...item, amount: item.amount + 1}
                }
                return item;
            })
            state.cartItems = newItems
        },

        getTotalAmount: (state) => {
            let {amount, total} = state.cartItems.reduce((a, c) => {
                a.amount += c.amount;
                a.total += c.amount * c.price;
                return a
            },{amount: 0, total: 0})
            localStorage.setItem('cartItems', JSON.stringify([...state.cartItems]))
            state.amount = amount
            state.total = total
        },

        checkIsLogin: (state) => {
            if(state.isLogin === true){
                state.isLogin = false;
            } else {    
                state.isLogin = true;
            }
            
        }
    },
    extraReducers:{
        [getAllCandleafs.pending]: (state) => {
            state.isLoading = true
        },
        [getAllCandleafs.fulfilled]: (state, action) => {
            state.data = action.payload.candleafs
            state.isLoading = false
            state.datas = action.payload.candleafs
        },
        [getAllCandleafs.rejected]: (state) => {
            state.isLoading = false
            state.data = []
        }
    }
})

export const {removeItem, increaseItem, decreaseItem, getTotalAmount, addItem, checkIsLogin} = cartSlice.actions;
export default cartSlice.reducer