const initialState = {
    addresses: []
}

export default function appReducer(state = initialState, action) {

    switch (action.type) {

        case 'maps/addressAdded': {

            let data = action.payload.split(';');
            let nome = data[0];
            let cognome = data[1];
            let indirizzo = data[2];
            let uniqueId = data[3];

            return {
                ...state,
                addresses: [
                    ...state.addresses,
                    {
                        nome: nome,
                        cognome: cognome,
                        indirizzo: indirizzo,
                        uniqueId: uniqueId
                    }
                ]
            }
        }

        case 'maps/addressClear': {
            return {
                ...state,
                addresses: []
            };
        }

        default:
            return state
    }
}