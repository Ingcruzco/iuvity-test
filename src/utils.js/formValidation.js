const errorsTypes = {
	empty: 'No se permiten campos vacios',
	lettersAndAccent: 'Solamente se permiten letras y acentos',
	email: 'Proporcione un email valido',
	phone: 'Igrese un telefono de por lo menos 10 cifras',
	cc: 'Igrese un Documento de identidad valido (+6 digitos)',
	phoneCharacters: 'Solamente se permiten números y los caracteres especiales (,) y +	',
	phoneOverload: 'El máximo de digitos es 12'
}

export const lettersAndAccentValidator = field => {
	if (field.trim() === '' || undefined ) return errorsTypes.empty;
	const regex = /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g;
	return !regex.test(field) && errorsTypes.lettersAndAccent;
}

const emailValidation = email => {
	const regex = /^\w+@[a-zA-Z0-9]+?\.[a-zA-Z]{2,3}$/g
	return !regex.test(email) && errorsTypes.email;
}

const lengthValidation = (fieldName, fieldValue ) =>{
	const errorType = fieldName === "phoneNumber" ? errorsTypes.phone : errorsTypes.cc;
	return fieldValue.toString().length < 7 && errorType;
}

const validatePhoneNumber = (phoneNumber) => {
	const isValidNumber = hasSpecialCharacters(phoneNumber)
    let correctPhone = 
        phoneNumber.trim()
            .replace(/ /g,'')
            .replace(/[+()]/g,'');
    if ( isValidNumber ) return errorsTypes.phoneCharacters;
    if (correctPhone.toString().length < 10  ) return errorsTypes.phone;
		if (correctPhone.toString().length > 14 ) return errorsTypes.phoneOverload;
    if (correctPhone.toString().length > 10){
        let rightPhone = correctPhone.slice(-7)
        let middlePhone = correctPhone.slice(correctPhone.length - 10, correctPhone.length - 7)
        let leftPhone = correctPhone.slice(0, correctPhone.length - 10)
        correctPhone = `+(${leftPhone}) ${middlePhone} ${rightPhone}`
    } else {
        let rightPhone = correctPhone.slice(-7)
        let middlePhone = correctPhone.slice(correctPhone.length - 10, correctPhone.length - 7)
        correctPhone = `${middlePhone} ${rightPhone}`
    }
    return false
}

const hasSpecialCharacters= (phoneNumber) => {
	const regex = /[`!@#$%^&*_\=\[\]{};':"\\|,.<>\/?~a-zA-Z]|[a-zA-ZÀ-ÿ\u00f1\u00d1]/g;
	return regex.test(phoneNumber);
}

export const errorFormHandler = (formValues,setErrors,optionsInForm) => {
	let foundErrors = false
	for(const [ fieldName, fieldValue ] of Object.entries(formValues)){
		if(!optionsInForm.includes(fieldName)) continue
		let errorMessage
		switch (fieldName) {
			case 'email':
				errorMessage = emailValidation(fieldValue);
				break;
			case 'phoneNumber':
				errorMessage = validatePhoneNumber(fieldValue);
				break;
			case 'cc':
				errorMessage = lengthValidation(fieldName,fieldValue);
				break;
			default:
				errorMessage = lettersAndAccentValidator(fieldValue);
				break;
		}
		if ( errorMessage ){
			foundErrors = true;
			setErrors(errors => ({
				...errors,
				[fieldName]: {
					message: errorMessage
				}
			}))
		}else {
			setErrors( errors => {
				delete errors[fieldName];
				return errors;
			})	
		}
	}
	return foundErrors;
}
