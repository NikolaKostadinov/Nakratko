export default function reducer (state=[], action) {

    switch (action.type) {
    
        case 'GET':
            state = []
            return state.concat(action.payload);

        default: return state;

    }

}