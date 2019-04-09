export default function TokensReducer(state = {
    tokens: [],
},action) {
    switch(action.type) {

        case "ADD_TOKEN":
        return Object.assign({}, {
            tokens: state.tokens
        });
        default: 
            return state;
    }
};

