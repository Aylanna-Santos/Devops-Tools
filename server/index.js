const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PRECO_TICKET = 2.00; // Cada ticket custa 2 reais

app.post('/converter', (req, res) => {
    const { nome, valor, formaPagamento } = req.body;

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
            valorOriginal: valor,
            ticketsGerados: totalTickets,
            valorReembolsado: sobra,
            formaPagamento,
            mensagem: mensagemFinal,
            status: "Operação Finalizada"
        });
    }, 1500);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log("-----------------------------------------");
    console.log(`🚀 SERVIDOR RODANDO`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log("-----------------------------------------");
});