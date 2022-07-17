export default function reducer (state = {}, action) {

    switch (action.type) {

        case 'IN': return action.payload;

        case 'OUT': return { };

        default: return state;

    }

}