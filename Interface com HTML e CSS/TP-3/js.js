let $form = document.querySelector('.validation')
let $inputs = $form.querySelectorAll('input')
let $textarea = $form.querySelector('textarea')
let $button = $form.querySelector('.js-button')

$button.addEventListener('click', (e)=>{
    e.preventDefault();

    for(let input of $inputs){
        let inputValue = input.value
        let texteValue = $textarea.value
        if(inputValue.trim()){
            input.classList.remove('is-invalid')
            if(texteValue.trim()){
                $textarea.classList.remove('is-invalid')
                window.alert('MENSAGEM ENVIADA !');  
                break;  
            }else{
                $textarea.classList.add('is-invalid')
            }
        }else{
            input.classList.add('is-invalid')
        }
    }

})
