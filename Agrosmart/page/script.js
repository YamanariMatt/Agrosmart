
const apiKey = "ba04a400a8c4b6de9126a356942919a7"; // Certifique-se de que a chave é uma string

async function fetchWeatherData(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            document.getElementById("weather-city").textContent = data.name;
            document.getElementById("weather-temp").textContent = `${data.main.temp}°C`;
            document.getElementById("weather-condition").textContent = data.weather[0].description;
            document.getElementById("weather-humidity").textContent = `${data.main.humidity}%`;
        } else {
            alert("Não foi possível buscar o clima.");
        }
    } catch (error) {
        console.error("Erro ao buscar dados do clima:", error);
        alert("Erro ao buscar informações do clima.");
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(latitude, longitude);
            },
            (error) => {
                console.error("Erro ao obter localização:", error);
                alert("Permita o acesso à localização para ver o clima.");
            }
        );
    } else {
        alert("Geolocalização não é suportada pelo seu navegador.");
    }
}

// Chamar a função ao carregar a página
window.onload = getLocation;


// Função para alternar entre modo claro e escuro e salvar no LocalStorage
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const button = document.querySelector('.dark-mode-toggle');
    const darkModeEnabled = document.body.classList.contains('dark-mode');

    // Alterna a classe dark-mode para todas as tabelas
    const tables = document.querySelectorAll('table');
    tables.forEach((table) => {
        table.classList.toggle('dark-mode', darkModeEnabled);
    });

    if (darkModeEnabled) {
        button.textContent = 'Desativar Modo Escuro';
        setDarkModePreference('enabled');
    } else {
        button.textContent = 'Ativar Modo Escuro';
        setDarkModePreference('disabled');
    }
}

// Função para salvar o modo escuro no localStorage
function setDarkModePreference(state) {
localStorage.setItem('darkMode', state);
}

// Função para carregar o estado do modo escuro do localStorage ao iniciar
function loadDarkModePreference() {
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
document.body.classList.add('dark-mode');
document.querySelector('.dark-mode-toggle').textContent = 'Desativar Modo Escuro';
} else {
document.body.classList.remove('dark-mode');
document.querySelector('.dark-mode-toggle').textContent = 'Ativar Modo Escuro';
}
}

loadDarkModePreference();

// Variável para controlar o tamanho inicial da fonte
let fontSize = 16;

function setFontSizePreference(size) {
localStorage.setItem('fontSize', size);
}

function increaseFontSize() {
fontSize += 1;
document.body.style.fontSize = fontSize + 'px';
setFontSizePreference(fontSize);
}

function decreaseFontSize() {
if (fontSize > 1) {
fontSize -= 1;
document.body.style.fontSize = fontSize + 'px';
setFontSizePreference(fontSize);
}
}

function loadFontSizePreference() {
const savedFontSize = localStorage.getItem('fontSize');
if (savedFontSize) {
fontSize = parseInt(savedFontSize);
document.body.style.fontSize = fontSize + 'px';
}
}

loadFontSizePreference();


window.onscroll = function() {
  var header = document.querySelector('header');
  if (window.pageYOffset > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};
