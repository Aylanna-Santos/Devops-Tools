const express = require('express');
const cors = require('cors');

const app = express();

// Configurações iniciais (Middlewares)
app.use(cors()); // Permite que o Front-end acesse o Back-end
app.use(express.json()); // Permite que o servidor entenda arquivos JSON

// --- CONFIGURAÇÃO DO DESAFIO: CONVERSOR DE TICKETS ---

const PRECO_TICKET = 2.00; // Cada ticket custa 2 reais

app.post('/converter', (req, res) => {
    const { nome, valor } = req.body;

    // Validação simples de segurança
    if (!nome || !valor || valor <= 0) {
        return res.status(400).json({ 
            erro: "Por favor, insira um nome válido e um valor maior que zero." 
        });
    }

    // 1. Cálculo da quantidade de tickets (Divisão Inteira)
    const totalTickets = Math.floor(valor / PRECO_TICKET);

    // 2. Cálculo do Resto (O que sobrou e não virou ticket)
    const sobra = valor % PRECO_TICKET;

    // 3. Construção da Resposta Personalizada
    let mensagemFinal = `Sucesso! Foram gerados ${totalTickets} tickets para ${nome}.`;
    
    // Lógica de Reembolso (Se o resto for maior que 0)
    if (sobra > 0) {
        const valorReembolso = sobra.toFixed(2);
        mensagemFinal += ` Identificamos um saldo restante de R$ ${valorReembolso}, que será reembolsado agora.`;
    }

    // Envio dos dados para o Front-end
    res.json({
        usuario: nome,
        valorOriginal: valor,
        ticketsGerados: totalTickets,
        valorReembolsado: sobra,
        mensagem: mensagemFinal,
        status: "Operação Finalizada"
    });
});

// --- INICIALIZAÇÃO DO SERVIDOR ---

const PORT = 5000;
app.listen(PORT, () => {
    console.log("-----------------------------------------");
    console.log(`🚀 SERVIDOR ALEGRE E PROFISSIONAL RODANDO`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log("-----------------------------------------");
});
