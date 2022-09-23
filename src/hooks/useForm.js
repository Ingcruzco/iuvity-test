import {
    useState
} from 'react'

export const useForm = (initialState = {}) => {
	const [ formValues, setFormValues ] = useState(initialState)

	const handleInputValues = (event) => {
		setFormValues(formValues => ({...formValues, [event.target.id]: event.target.value }))
	}

	const setFormManually = (fields) =>{
		setFormValues(fields )
	}

	const reset = () => {
		setFormValues({})    
	}

	return [ formValues, handleInputValues,reset,setFormManually]

}