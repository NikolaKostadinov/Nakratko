export default function reducer (state = {}, action) {

    switch (action.type) {

        case 'IN': return action.payload;

        case 'OUT': return { };

        case 'REFRESH': return { ...state, accessToken: action.payload };

        default: return state;

    }

}