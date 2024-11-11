function enviarCodigo() {
    var email = document.getElementById('email');
    var cmail = document.getElementById('cmail');
    var isValid = true; // Variável para controlar a validade

    // Remover classe de erro antes da validação
    email.classList.remove('error');
    cmail.classList.remove('error');

    // Validação do e-mail
    if (email.value.trim() === "") {
        email.classList.add('error');
        isValid = false;
        Swal.fire({
            icon: 'error',
            title: 'E-mail vazio',
            text: 'Por favor, preencha o e-mail.',
            customClass: {
                confirmButton: 'custom-button'
            }
        });
    } else {
        var emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|mil|br)(\.[a-z]{2})?$/i;
        if (!emailRegex.test(email.value)) {
            email.classList.add('error');
            isValid = false;
            Swal.fire({
                icon: 'error',
                title: 'Email inválido',
                text: 'Por favor, insira um e-mail válido.',
                customClass: {
                    confirmButton: 'custom-button'
                }
            });
        }
    }

    // Validação do e-mail de confirmação
    if (cmail.value.trim() === "") {
        cmail.classList.add('error');
        isValid = false;
        Swal.fire({
            icon: 'error',
            title: 'E-mail de confirmação vazio',
            text: 'Por favor, preencha o e-mail de confirmação.',
            customClass: {
                confirmButton: 'custom-button'
            }
        });
    } else if (cmail.value !== email.value) {
        cmail.classList.add('error');
        isValid = false;
        Swal.fire({
            icon: 'error',
            title: 'E-mails não coincidem!',
            text: 'Os e-mails informados não coincidem. Tente novamente.',
            customClass: {
                confirmButton: 'custom-button'
            }
        });
    }

    // Se todos os campos forem válidos, envie o código
    if (isValid) {
        Swal.fire({
            icon: 'success',
            title: 'Código enviado!',
            text: 'Código enviado para ' + email.value + '. Verifique sua caixa de entrada!',
            customClass: {
                confirmButton: 'custom-button'
            }
        });
    }
}
