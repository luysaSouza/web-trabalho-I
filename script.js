// script.js

document.addEventListener('DOMContentLoaded', () => {
    const usuario = localStorage.getItem('usuario');
    const stylePref = localStorage.getItem('estilo') || 'default';

    // Verificação para redirecionar para 404 se a página não for encontrada
    const validPages = [
        'principal.html',
        'usuarioNaoIdentificado.html',
        'login.html',
        '404.html',
        'contato.html',
        'servicos.html',
        'sobre.html'
    ]; // Adicione mais páginas válidas aqui

    const currentPage = window.location.pathname.split('/').pop();

    // Verifica se a página atual é válida
    const validURL = validPages.includes(currentPage);

    if (!validURL) {
        window.location.href = '404.html';  // Redireciona para a página de erro 404
        return;
    }

    // Redirecionamento se não autenticado
    if (!usuario && window.location.pathname.endsWith('principal.html')) {
        window.location.href = 'usuarioNaoIdentificado.html';
        return;
    }

    atualizarStatusUsuario();

    // Configura formulários
    if (document.getElementById('login-form')) configurarFormularioLogin();
    if (document.getElementById('cadastro-form')) configurarFormularioCadastro();

    inicializarAbas();

    // Apenas em página de cadastro: inicializa preferência de estilo (default ou custom)
    const customOption = document.getElementById('custom-option');
    const defaultOption = document.getElementById('default-option');
    const card = document.querySelector('.card');

    if (customOption && defaultOption && card) {
        const atualizarEstilo = () => {
            if (customOption.checked) {
                card.classList.add('custom-mode');
            } else {
                card.classList.remove('custom-mode');
            }
        };

        // Inicializa o estilo baseado na opção marcada
        atualizarEstilo();

        // Adiciona eventos de mudança
        customOption.addEventListener('change', atualizarEstilo);
        defaultOption.addEventListener('change', atualizarEstilo);
    }

    // Toggle dropdown menu
    const userIcon = document.getElementById('user-icon');
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (userIcon && dropdownMenu) {
        userIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            dropdownMenu.classList.toggle('active');
        });
        document.addEventListener('click', (event) => {
            if (!dropdownMenu.contains(event.target) && event.target !== userIcon) {
                dropdownMenu.classList.remove('active');
            }
        });
    }

    // Garante evento de logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.style.display = '';
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('usuario');
            window.location.href = 'login.html';
        });
    }
});

function atualizarStatusUsuario() {
    const userStatus = document.getElementById('user-status');
    const logoutBtn = document.getElementById('logout-btn');
    const usuario = localStorage.getItem('usuario');

    if (userStatus) {
        if (usuario) {
            userStatus.textContent = usuario;
            if (logoutBtn) logoutBtn.style.display = '';
        } else {
            userStatus.textContent = 'Usuário não autenticado';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }
}

function configurarFormularioLogin() {
    const formLogin = document.getElementById('login-form');
    formLogin.addEventListener('submit', event => {
        event.preventDefault();
        const login = document.getElementById('login-email').value.trim();
        const senha = document.getElementById('login-senha').value.trim();
        if (!login || !senha) return alert('Os campos Login e Senha devem estar preenchidos!');
        localStorage.setItem('usuario', login);
        window.location.href = 'principal.html';
    });
}

function configurarFormularioCadastro() {
    const formCadastro = document.getElementById('cadastro-form');
    formCadastro.addEventListener('submit', event => {
        event.preventDefault();
        const nome = document.getElementById('cadastro-nome').value.trim();
        const email = document.getElementById('cadastro-email').value.trim();
        const senha = document.getElementById('cadastro-senha').value.trim();
        if (!nome || !email || !senha) return alert('Todos os campos devem estar preenchidos!');
        localStorage.setItem('usuario', email);
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'principal.html';
    });
}

function inicializarAbas() {
    const tabs = document.querySelectorAll('.tab');
    const cadastroForm = document.getElementById('cadastro-form');
    const loginForm = document.getElementById('login-form');

    tabs.forEach((tab, idx) => tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        cadastroForm.style.display = idx === 0 ? 'block' : 'none';
        loginForm.style.display = idx === 1 ? 'block' : 'none';
    }));

    document.getElementById('link-entrar')?.addEventListener('click', e => { e.preventDefault(); tabs[1].click(); });
    document.getElementById('link-cadastrar')?.addEventListener('click', e => { e.preventDefault(); tabs[0].click(); });
}

// Aplica ou remove estilos customizados
function customizarFormulario() {
    const customOption = document.getElementById('custom-option');
    const card = document.querySelector('.card');

    if (!card) return;

    if (customOption.classList.contains('custom-active')) {
        card.classList.add('custom-mode');
    } else {
        card.classList.remove('custom-mode');
    }
}

function validarFormulario() {
    var nome = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var numero = document.getElementById('numero').value.trim();

    if (nome && email && numero) {
        alert('Dados enviados, logo entraremos em contato com você!');
    } else {
        alert('Por favor, preencha todos os campos antes de enviar.');
    }
}