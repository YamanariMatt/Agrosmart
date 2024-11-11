$(document).ready(function() {
    $('#acessarBtn').click(function(event) {
        var email = $('#email')[0]; // Obtenha o elemento do e-mail
        var password = $('#password')[0]; // Obtenha o elemento da senha
        var isValid = true; // Variável para rastrear a validade dos campos

        // Limpa as classes de erro anteriores
        email.classList.remove('error');
        password.classList.remove('error');

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

        // Validação da senha
        var validPassword = 'senhaSegura123'; // Exemplo de senha válida
        if (password.value.trim() === "") {
            password.classList.add('error');
            isValid = false;
            Swal.fire({
                icon: 'error',
                title: 'Senha vazia',
                text: 'Por favor, preencha a senha.',
                customClass: {
                    confirmButton: 'custom-button'
                }
            });
        } else if (password.value !== validPassword) {
            password.classList.add('error');
            isValid = false;
            Swal.fire({
                icon: 'error',
                title: 'Senha incorreta',
                text: 'Por favor, insira a senha correta.',
                customClass: {
                    confirmButton: 'custom-button'
                }
            });
        }

        // Impede o envio do formulário se não for válido
        if (!isValid) {
            event.preventDefault(); 
        } else {
            window.location.href = '/Agrosmart/inicial/inicio.html'; // Redireciona se tudo estiver correto
        }
    });
});

// Função para alternar a visibilidade da senha
function togglePasswordVisibility(inputId, eyeIcon) {
    const inputField = document.getElementById(inputId);
    const isPasswordVisible = inputField.type === "password";

    // Alterna o tipo do campo de senha
    inputField.type = isPasswordVisible ? "text" : "password";

    // Altera a imagem do ícone
    const iconImg = eyeIcon.querySelector('img');
    iconImg.src = isPasswordVisible ? "/image/eye-closed-icon.png" : "/image/eye-icon.png";
}
