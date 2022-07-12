function Validator(options) {
    function validate(inputElement, rule) {
        let errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        let errorMessage = rule.test(inputElement.value)
        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
    }
    let formElement = document.querySelector(options.form)
    if (formElement) {
        options.rules.forEach((rule) => {
            let inputElement = formElement.querySelector(rule.selector)
            if (inputElement) {
                inputElement.onblur = () => {
                    validate(inputElement,rule)
                }
                inputElement.onInput = () => {
                    let errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}

Validator.isRequired = function (selector) {
    return {
        selector : selector,
        test: function (value) {
            return value.trim() ? undefined : "Vui lòng nhập trường này"
        }
    }
}

Validator.isEmail = function (selector) {
    return {
        selector : selector,
        test: function (value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            return regex.test(value) ? undefined : "Nhập đúng định dạng email"
        }
    }
}

Validator.minLength = function (selector,min) {
    return {
        selector : selector,
        test: function (value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`
        }
    }
}