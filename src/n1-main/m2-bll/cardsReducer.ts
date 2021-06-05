
let initialState = {

}

export const cardsReducer = (state: initialStateType = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

// ACTIONS
const someAction = () => ({type: "CARDS/TYPE"})

// TYPES
type initialStateType = typeof initialState
type ActionType = ReturnType<typeof someAction>