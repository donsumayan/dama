export default function reducer(state=Array(8).fill(Array(8).fill(0)), action) {
    switch(action.type) {
        case 'UPDATE_GRID':
            console.log('Called a tester action', state)
            break;
        case 'RESET_GRID':
        case 'NEW_GAME':
            state = [...state, Array(8).fill(Array(8).fill(0))];
            break;
        default:
            break;
    }
    return state;   
}