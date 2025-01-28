document.addEventListener('DOMContentLoaded', function() {
    const acessarButton = document.getElementById('acessarBtn');
    if (acessarButton) {
        acessarButton.addEventListener('click', criarConta);
    }

    // Adiciona os eventos de clique para os ícones de visualizar senha
    const eyeIcon1 = document.getElementById('eyeIcon1');
    const eyeIcon2 = document.getElementById('eyeIcon2');

    if (eyeIcon1 && eyeIcon2) {
        eyeIcon1.addEventListener('click', function() {
            togglePasswordVisibility('password', eyeIcon1, eyeIcon2);
        });

        eyeIcon2.addEventListener('click', function() {
            togglePasswordVisibility('confirmPassword', eyeIcon2, eyeIcon1);
        });
    }
});

// Função de criar conta
function criarConta(event) {
    event.preventDefault(); // Impede o comportamento padrão do botão

    var username = document.getElementById('username');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');

    // Remove a classe de erro dos campos
    username.classList.remove('error');
    email.classList.remove('error');
    password.classList.remove('error');
    confirmPassword.classList.remove('error');

    var isValid = true;

    // Verifica se o apelido está preenchido
    if (username.value.trim() === "") {
        username.classList.add('error');
        isValid = false;
    }

    // Validação do email
    if (email.value.trim() === "") {
        email.classList.add('error');
        isValid = false;
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
            return;  // Sai da função se o e-mail for inválido
        }
    }

    // Verifica se a senha está preenchida e atende aos critérios de complexidade
    var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/; // Regex para 8+ caracteres, 1 número e 1 caractere especial
    if (password.value.trim() === "") {
        password.classList.add('error');
        isValid = false;
    } else if (!passwordRegex.test(password.value)) {
        password.classList.add('error');
        Swal.fire({
            icon: 'error',
            title: 'Senha inválida',
            text: 'A senha deve ter pelo menos 8 caracteres, incluindo 1 número e 1 caractere especial.',
            customClass: {
                confirmButton: 'custom-button'
            }
        });
        return; // Sai da função se a senha for inválida
    }

    // Verifica se a confirmação de senha está preenchida e se coincide com a senha
    if (confirmPassword.value.trim() === "") {
        confirmPassword.classList.add('error');
        isValid = false;
    } else if (confirmPassword.value !== password.value) {
        confirmPassword.classList.add('error');
        // Exibe o modal de senhas não coincidentes
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'As senhas não coincidem.',
            customClass: {
                confirmButton: 'custom-button'
            }
        });
        return;  // Sai da função para evitar o modal de erro geral
    }

    // Se todos os campos estiverem válidos, exibe a confirmação
    if (isValid) {
        Swal.fire({
            title: 'Confirmação',
            text: 'Você realmente deseja criar a conta?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            customClass: {
                confirmButton: 'custom-button'
            },
            backdrop: 'rgba(0,0,0,0.5)',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                // Redireciona para a página inicial se confirmado
                window.location.href = '../Agrosmart/page/inicio.html';
            }
        });
    } else {
        // Exibe um alerta caso os campos estejam incorretos, exceto se o erro for de senha
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos corretamente.',
            customClass: {
                confirmButton: 'custom-button'
            }
        });
    }
}

// Função para alternar a visibilidade da senha
function togglePasswordVisibility(inputId, eyeIcon, otherEyeIcon) {
    const inputField = document.getElementById(inputId);
    const isPasswordVisible = inputField.type === "password";

    // Alterna o tipo do campo de senha
    inputField.type = isPasswordVisible ? "text" : "password";

    // Altera a imagem do ícone
    eyeIcon.querySelector('img').src = isPasswordVisible ? "/image/eye-closed-icon.png" : "/image/eye-icon.png";
    
    // Sincroniza a visibilidade da outra senha
    const otherInputField = document.getElementById(inputId === 'password' ? 'confirmPassword' : 'password');
    otherInputField.type = isPasswordVisible ? "text" : "password";
    otherEyeIcon.querySelector('img').src = isPasswordVisible ? "/image/eye-closed-icon.png" : "/image/eye-icon.png";
}
