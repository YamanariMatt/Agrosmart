// Espera o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona evento de clique para o botão de login
    const loginButton = document.getElementById('loginBtn');
    if (loginButton) {
        loginButton.addEventListener('click', login);
    }

    // Adiciona evento de clique para o ícone de visualizar senha
    const eyeIcon = document.getElementById('eyeIcon');
    const passwordField = document.getElementById('password'); // Armazena a referência do campo de senha

    if (eyeIcon) {
        eyeIcon.addEventListener('click', function() {
            togglePasswordVisibility(passwordField, eyeIcon);
        });
    }
});

// Função para realizar o login
function login(event) {
    event.preventDefault(); // Impede o comportamento padrão do botão

    const username = document.getElementById('username');
    const password = document.getElementById('password');

    // Remove a classe de erro dos campos
    username.classList.remove('error');
    password.classList.remove('error');

    // Verifica se os campos estão preenchidos
    if (username.value.trim() === "" || password.value.trim() === "") {
        if (username.value.trim() === "") {
            username.classList.add('error'); // Adiciona classe de erro
        }
        if (password.value.trim() === "") {
            password.classList.add('error'); // Adiciona classe de erro
        }

        // Exibe um alerta com SweetAlert2
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, preencha todos os campos.',
            customClass: {
                confirmButton: 'custom-button'
            }
        });
    } else {
        // Validação do email
        var emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|mil|br)(\.[a-z]{2})?$/i;
        if (!emailRegex.test(username.value)) {
            username.classList.add('error');
            Swal.fire({
                icon: 'error',
                title: 'Email inválido',
                text: 'Por favor, insira um e-mail válido.',
                customClass: {
                    confirmButton: 'custom-button'
                }
            });
            return; // Sai da função se o e-mail for inválido
        } else {
            // Aqui você pode adicionar a lógica de autenticação ou redirecionamento
            window.location.href = "./Agrosmart/page/inicio.html"; // Ajuste o caminho se necessário
        }
    }
}

// Função para alternar a visibilidade da senha
function togglePasswordVisibility(inputField, eyeIcon) {
    const isPasswordVisible = inputField.type === "password";

    // Altera o tipo do campo de senha
    inputField.type = isPasswordVisible ? "text" : "password";

    // Altera a imagem do ícone
    eyeIcon.querySelector('img').src = isPasswordVisible ? "/image/eye-closed-icon.png" : "/image/eye-icon.png";
}
