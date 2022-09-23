const errorsTypes = {
	empty: 'No se permiten campos vacios',
	lettersAndAccent: 'Solamente se permiten letras y acentos',
	email: 'Proporcione un email valido',
	phone: 'Igrese un telefono de mas de 6 cifras',
	cc: 'Igrese un Documento de identidad valido (+6 digitos)'
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
				errorMessage = lengthValidation(fieldName,fieldValue);
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
