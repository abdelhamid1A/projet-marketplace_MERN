export default function cartReducer(state,action){
    // console.log(state,action);
    switch (action.type) {
        case 'ADD_TO_CART':
            return [
                ...state,
                {
                    product:action.product
                }
        ]
            
            break;
        case 'DELETE_FROM_CART':{
                
                const index = action.index
                const newState = [...state]
                newState.splice(index,1)
                return newState;
                
            }
            
            break;
    
        default:
            if(state==undefined)
                return []
            return state
            break;
    }
}