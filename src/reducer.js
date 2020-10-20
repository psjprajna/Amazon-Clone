export const initialState = {
    basket: [],
    list: [],
    user:null,
    counter:0
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
            let inc=state.counter
            if(inc===6){
                inc=0
            }
            else{
                inc=inc+1
            }
            return{
                ...state,
                list:[...state.list,action.item],
                counter:inc
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

            let dec=state.counter
            if(dec===0){
                dec=0
            }else{
                dec=dec-1
            }

            let newList=[...state.list];
            const newIndex = state.list.findIndex((basketItem) => basketItem.id === action.id);
                
            if(newIndex >= 0){
                newList.splice(newIndex, 1);
            }
            
            return { ...state,
                list:newList,
                counter:dec
            };

        case 'SET_USER':
            return{
                ...state,
                user:action.user
            }

        case 'EMPTY_BASKET':
            return{
                ...state,
                basket:[],
            }
        default:
            return state;
    }
}

export default reducer;