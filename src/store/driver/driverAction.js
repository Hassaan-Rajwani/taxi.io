function addDriver(user) {
    console.log('action --->', user)
    return {
        type: 'ADD_DRIVER', //nishani
        payload: user
    }
}

function removeDriver() {
    return {
        type: 'REMOVE_DRIVER'
    }
}

export {
    addDriver,
    removeDriver
}