export const initialState = {
    basket: [],
    list: [],
    user:null
};
export const getBasketTotal=(basket)=>
    basket?.reduce((amount,item)=> item.price +amount,0);

const reducer=(state,action)=>{
    switch(action.type){
        case 'ADD':
            return{
                ...state,
                basket:[...state.basket,action.item],
            };
        case 'ADD_PRODUCT':
            return{
                ...state,
                list:[...state.list,action.item],
            };
        
        case 'REMOVE':
            let newBasket=[...state.basket];

            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);
             
            if(index >= 0){
                newBasket.splice(index, 1);
            }
            
            return { ...state,
                basket:newBasket
            };
        
        case 'REMOVE_PRODUCT':
            let newList=[...state.list];

            const newIndex = state.list.findIndex((basketItem) => basketItem.id === action.id);
                
            if(newIndex >= 0){
                newList.splice(newIndex, 1);
            }
            
            return { ...state,
                list:newList
            };

        case 'SET_USER':
            return{
                ...state,
                user:action.user
            }
        default:
            return state;
    }
}

export default reducer;