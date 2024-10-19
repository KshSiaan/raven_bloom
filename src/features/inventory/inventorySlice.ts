import { createSlice } from "@reduxjs/toolkit";


type innerInventorytype = {
    name: string; // Name of the product
    ammount: number; // Stock quantity available
    _id: string; // Unique identifier (MongoDB ID)
    price:number;
    description: string;
}

type inventoryType = {
    inventory: innerInventorytype[]
}

let initialState = <inventoryType>{
    inventory: []
}

if (typeof window !== "undefined" && localStorage.getItem("inventory")) {
    const storedInventory = localStorage.getItem("inventory");

    if (storedInventory) {
        initialState = {
            inventory: JSON.parse(storedInventory) as innerInventorytype[],
        };
    }
}


const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers:{
        pushItem:(state,action)=>{
            state.inventory.push(action.payload)
            localStorage.setItem("inventory", JSON.stringify(state.inventory));
        },
        clearItem:(state,action)=>{
            state.inventory.splice(action.payload,1)
            localStorage.setItem("inventory", JSON.stringify(state.inventory));
        },
        change:(state,action)=>{
            const {index,amm} = action.payload
            state.inventory[index].ammount = amm
            localStorage.setItem("inventory", JSON.stringify(state.inventory));
        },
        clearAll:(state)=>{
            state.inventory = []
            localStorage.removeItem("inventory")
        },
    }
})

export const {reducer:inventoryReducer} = inventorySlice; 
export const {pushItem,clearItem,change,clearAll} = inventorySlice.actions;


