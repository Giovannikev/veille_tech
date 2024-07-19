// Action Creator
const newBooking = (book_name, amount) => {
    return {
        type: "NEW_BOOKING",
        payload: {
            book_name,
            amount
        }
    }
}

const cancelBooking = (book_name, amount) => {
    return {
        type: "CANCEL_BOOKING",
        payload: {
            book_name,
            amount
        }
    }
}

// Reducer

const reservationHistory = (oldReservationList = [], action) => {
    if (action.type === "NEW_BOOKING") {
        return [...oldReservationList, action.payload];
    }
    else if (action.type === "CANCEL_BOOKING") {
        return oldReservationList.filter(record => {
            return record.book_name !== action.payload.book_name
        })
    }
    return oldReservationList;
}

const cancellationHistory = (oldCancellationList = [], action) => {
    if (action.type === "CANCEL_BOOKING") {
        return [...oldReservationList, action.payload];
    }
    return oldCancellationList;
}

const accounting = (totalMoney = 100, action) => {
    if (action.type == "NEW_BOOKING") {
        return totalMoney + action.payload.amount;
    }
    if (action.type === "CANCEL_BOOKING") {
        return totalMoney - action.payload.amount;
    }
    return totalMoney;
}


// Redux store

console.log(Redux);
const { createStore, combineReducers } = Redux;
const railwayCentralStore = combineReducers({
    accounting: accounting,
    reservationHistory: reservationHistory,
    cancellationHistory: cancellationHistory,
})
const store = createStore(railwayCentralStore);

const action = newBooking('ranto', 200)
store.dispatch(action);
console.log(store.getState());