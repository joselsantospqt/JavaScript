let $form = document.querySelector('.validation')
let $inputs = $form.querySelectorAll('input')
let $textarea = $form.querySelector('textarea')
let $button = $form.querySelector('.js-button')

$button.addEventListener('click', (e) => {
    e.preventDefault();

    for (let input of $inputs) {
        let inputValue = input.value
        let inputName = input.name
        let texteValue = $textarea.value
        if (inputValue.trim()) {
            if (texteValue.trim()) {
                window.alert('MENSAGEM ENVIADA !');
                break;
            } else {
                inputName = $textarea.name
                window.alert('Preencha os campos: ' + `${inputName}`);
                break;
            }
        } else {
            window.alert('Preencha os campos: ' + `${inputName}`);
        }
    }

})