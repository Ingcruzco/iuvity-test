export const phoneValidation = (e) =>{
    const regex = /[`!@#$%^&*_\=\[\]{};':"\\|,.<>\/?~]|[a-zA-ZÀ-ÿ\u00f1\u00d1]/g;

    const isValidNumber = regex.test(e.target.value)
    let correctPhone = 
    e.target.value.trim()
            .replace(/ /g,'')
            .replace('(','')
            .replace(')','')
            .replace('-','')
            .replace('+','');

    if (correctPhone.toString().length < 10 || isValidNumber ) return
    if (correctPhone.toString().length > 13) correctPhone = correctPhone.toString().slice(0,13)
    if (correctPhone.toString().length > 10){
        let rightPhone = correctPhone.slice(-7)
        let middlePhone = 
        correctPhone
            .slice(correctPhone.length - 10, correctPhone.length - 7)
            .trim() 
        let leftPhone = correctPhone.slice(0, correctPhone.length - 10)
        correctPhone = `+(${leftPhone}) ${middlePhone} ${rightPhone}`
    } else {
        let rightPhone = correctPhone.slice(-7)
        let middlePhone = correctPhone.slice(correctPhone.length - 10, correctPhone.length - 7)
        correctPhone = `${middlePhone} ${rightPhone}`
    }
    e.target.value = correctPhone
}