const express = require('express');
const cors = require('cors');

const app = express();

// Configurações iniciais (Middlewares)
app.use(cors()); // Permite que o Front-end acesse o Back-end
app.use(express.json()); // Permite que o servidor entenda arquivos JSON

// --- CONFIGURAÇÃO DO DESAFIO: CONVERSOR DE TICKETS ---

const PRECO_TICKET = 2.00; // Cada ticket custa 2 reais

app.post('/converter', (req, res) => {
    const { nome, valor, formaPagamento } = req.body; // Recebe a forma de pagamento
    const PRECO_TICKET = 2.00;

    const totalTickets = Math.floor(valor / PRECO_TICKET);
    const sobra = valor % PRECO_TICKET;

    let mensagemFinal = `Sucesso! Foram gerados ${totalTickets} tickets via ${formaPagamento}.`;
    
    if (sobra > 0) {
        mensagemFinal += ` Reembolso de R$ ${sobra.toFixed(2)} processado.`;
    }

    // Simulando um pequeno atraso no servidor para parecer processamento real
    setTimeout(() => {
        res.json({
            usuario: nome,
            ticketsGerados: totalTickets,
            formaPagamento,
            mensagem: mensagemFinal
        });
    }, 1500); // 1.5 segundos de "delay"
});

    // Envio dos dados para o Front-end
    res.json({
        usuario: nome,
        valorOriginal: valor,
        ticketsGerados: totalTickets,
        valorReembolsado: sobra,
        mensagem: mensagemFinal,
        status: "Operação Finalizada"
    });

// --- INICIALIZAÇÃO DO SERVIDOR ---

const PORT = 5000;
app.listen(PORT, () => {
    console.log("-----------------------------------------");
    console.log(`🚀 SERVIDOR ALEGRE E PROFISSIONAL RODANDO`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log("-----------------------------------------");
});
