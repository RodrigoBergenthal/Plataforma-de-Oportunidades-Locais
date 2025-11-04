// script.js

// Array para armazenar as oportunidades (em memória, não persistente)
let opportunities = [];

// Função para renderizar o feed de oportunidades
function renderFeed() {
    const feedContainer = document.getElementById('opportunitiesFeed');
    const noPostsMessage = document.querySelector('.no-posts-message');

    // Limpa o feed
    feedContainer.innerHTML = '';

    if (opportunities.length === 0) {
        // Se não houver posts, mostra a mensagem
        feedContainer.appendChild(noPostsMessage.cloneNode(true));
        noPostsMessage.style.display = 'none'; // Esconde a original
    } else {
        // Esconde a mensagem se houver posts
        noPostsMessage.style.display = 'none';

        // Itera pelas oportunidades e cria os elementos
        opportunities.slice().reverse().forEach(opportunity => { // .slice().reverse() para mostrar as mais recentes primeiro
            const card = document.createElement('div');
            card.className = 'opportunity-card';

            // Mapeia o tipo para um texto mais amigável
            let typeText = '';
            switch(opportunity.type) {
                case 'job':
                    typeText = '💼 Vaga de Emprego';
                    break;
                case 'service':
                    typeText = '🛠️ Serviço Oferecido';
                    break;
                case 'event':
                    typeText = '📅 Evento/Curso';
                    break;
                default:
                    typeText = opportunity.type;
            }

            card.innerHTML = `
                <h3>${typeText}: ${opportunity.title}</h3>
                <p>${opportunity.description}</p>
                ${opportunity.contact ? `<p class="contact"><strong>Contato:</strong> ${opportunity.contact}</p>` : ''}
            `;
            feedContainer.appendChild(card);
        });
    }
}

// Função para lidar com o envio do formulário
document.getElementById('postForm')?.addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    // Coleta os dados do formulário
    const type = document.getElementById('postType').value;
    const title = document.getElementById('postTitle').value;
    const description = document.getElementById('postDescription').value;
    const contact = document.getElementById('postContact').value;

    // Cria um objeto de oportunidade
    const newOpportunity = {
        type: type,
        title: title,
        description: description,
        contact: contact,
        date: new Date() // Adiciona uma data para referência (opcional)
    };

    // Adiciona a nova oportunidade ao array
    opportunities.push(newOpportunity);

    // Re-renderiza o feed
    renderFeed();

    // Reseta o formulário
    document.getElementById('postForm').reset();

    // Mostra uma mensagem de sucesso (opcional)
    alert('Oportunidade publicada com sucesso!');
});

// Renderiza o feed inicial (vazio ou com dados se houvesse)
renderFeed();

// Função para lidar com o cadastro de usuário
document.getElementById('registrationForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const cpf = document.getElementById('cpf').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validação de senha
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }
    
    // Simulação de envio de código de confirmação
    alert(`Cadastro realizado com sucesso! Um código de confirmação foi enviado para ${email} e ${phone}.`);
    
    // Em uma aplicação real, redirecionaria para uma página de confirmação
    window.location.href = 'confirmacao.html';
});

// Função para lidar com o login
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Em uma aplicação real, faria a verificação no servidor
    alert(`Login realizado com sucesso!`);
    
    // Redireciona para a plataforma
    window.location.href = 'plataforma.html';
});

// Função para lidar com a confirmação de cadastro
document.getElementById('confirmationForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const confirmationCode = document.getElementById('confirmationCode').value;
    
    // Em uma aplicação real, faria a verificação no servidor
    alert(`Código de confirmação verificado com sucesso!`);
    
    // Redireciona para a plataforma
    window.location.href = 'plataforma.html';
});

// Função para reenviar o código de confirmação
document.getElementById('resendCode')?.addEventListener('click', function(e) {
    e.preventDefault();
    
    const email = localStorage.getItem('userEmail') || 'o seu e-mail';
    const phone = localStorage.getItem('userPhone') || 'o seu telefone';
    
    alert(`Código de confirmação reenviado para ${email} e ${phone}.`);
});

// Função para voltar à página anterior
function goBack() {
    // Se estiver na plataforma e o referrer for diferente de index, volta para index
    if (window.location.pathname.includes('plataforma.html')) {
        window.location.href = 'index.html';
    } else {
        window.history.back();
    }
}

// Função para lidar com o formulário de newsletter
document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('newsletterEmail').value;
    
    // Em uma aplicação real, faria o registro no servidor
    alert(`Obrigado por se inscrever! Enviamos uma confirmação para ${email}.`);
    
    // Limpa o formulário
    document.getElementById('newsletterForm').reset();
});