export const emailValidation = email => {
    const emailRegex = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if (email.search(emailRegex) === -1) {
        return 'Enter the valid email address'
    } else {
        return undefined
    }
}

export const passwordValidation = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    if (password.search(passwordRegex) === -1) {
        return 'Please enter the valid password'
    } else {
        return undefined
    }
}

export const samePassword = (prevPassword, currentPassword) => {
    if (prevPassword !== currentPassword) {
        return 'Please enter the same password'
    } else if (!prevPassword) {
        return 'Please enter the password before confirm'
    } else {
        return undefined
    }
}

export const onlyStringValidation = content => {
    const contentRegex = /^[A-Z]+$/i
    if (content.search(contentRegex) === -1) {
        return 'Enter the valid name'
    } else {
        return undefined
    }
}

export const postcodeValidation = postcode => {
    const USpostcodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/
    if (postcode.search(USpostcodeRegex) === -1) {
        return 'Enter the valid postcode'
    } else {
        return undefined
    }
}

export const onlyNumValidation = num => {
    const numRegex = /^[0-9]+$/;
    if (num.search(numRegex) === -1) {
        return 'Enter number only'
    } else {
        return undefined
    }
}

export const checkNullValidation = content => {
    if (!content.length) {
        return 'Required'
    } else {
        return undefined
    }
}

export const cardNumberValidation = (cardNumber) => {
    const regexPattern = {
        MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
        VISA: /^4[0-9]{2,}$/,
        AMERICANEXPRESS: /^3[47][0-9]{5,}$/,
        DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/
    }
    for (const card in regexPattern) {
        if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) {
            if (cardNumber) {
                return cardNumber && /^[1-6]{1}[0-9]{14,15}$/i.test(cardNumber.replace(/[^\d]/g, '').trim())
                    ? ''
                    : 'Enter the valid card number'
            }
        }
    }
    return 'Enter the valid card number'
}



