export const checkErrorBeforeSave = (state) => {
    const { userData, error } = state
    let errorValue = {}

    Object.keys(userData).forEach(val => {
        let errorKey = val + 'Error'
        if (!userData[val].length || error[errorKey]) {
            if (!userData[val].length) {
                errorValue = { ...errorValue, [`${val}Error`]: 'Required' }
            } else {
                errorValue = { ...errorValue, [`${val}Error`]: error[`${val}Error`] }
            }
        }
    })

    return errorValue
}