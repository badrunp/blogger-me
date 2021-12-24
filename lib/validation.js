const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default function validate(items){

    const validations = {}

    items.map((item) => {
        validations[item.label] = []
        if(item?.required){
            if(!item.value){
                validations[item.label] = [...validations[item.label], `${item.label} tidak boleh kosong!`]
            }
        }

        if(item?.min > 0){
            if(item.value && item.value.length < item.min){
                validations[item.label] = [...validations[item.label], `${item.label} minimal ${item.min} karakter!`]
            }
        }
        
        if(item.label === 'email'){
            if(!regEmail.test(item.value)){
                validations[item.label] = [...validations[item.label], `${item.label} tidak valid!`]
            }
        }

        if(validations[item.label].length == 0){
            delete validations[item.label]
        }
    })

    return validations;

}