function addUser(user) {
    console.log('action --->', user)
    return {
        type: 'ADD_USER', //nishani
        payload: user
    }
}

function removeUser() {
    return {
        type: 'REMOVE_USER'
    }
}

export {
    addUser,
    removeUser
}