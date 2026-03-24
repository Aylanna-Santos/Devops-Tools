import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [metodo, setMetodo] = useState('Pix'); // Estado para o pagamento
  const [loading, setLoading] = useState(false); // Estado para o "processando"
  const [resposta, setResposta] = useState(null);

  const lidarComConversao = async (e) => {
    e.preventDefault();
    setLoading(true); // Começa o processamento fake
    setResposta(null);

    try {
      const res = await axios.post('http://localhost:5000/converter', {
        nome,
        valor: parseFloat(valor),
        formaPagamento: metodo
      });
      setResposta(res.data);
    } catch (error) {
      alert("Erro na conexão!");
    } finally {
      setLoading(false); // Para o carregamento
    }
  };

  return (
    <div className="container">
      <h1>🎟️ Tickets Mania</h1>
      
      {!loading && !resposta && (
        <form onSubmit={lidarComConversao}>
          <input type="text" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          <input type="number" placeholder="Valor R$" value={valor} onChange={(e) => setValor(e.target.value)} required />
          
          <select value={metodo} onChange={(e) => setMetodo(e.target.value)} className="select-estilizado">
            <option value="Pix">Pix ⚡</option>
            <option value="Cartão de Crédito">Cartão de Crédito 💳</option>
            <option value="Dinheiro">Dinheiro 💵</option>
          </select>

          <button type="submit">PAGAR E GERAR</button>
        </form>
      )}

      {loading && (
        <div className="processando">
          <div className="spinner"></div>
          <p>Processando seu pagamento via {metodo}...</p>
        </div>
      )}

      {resposta && (
        <div className="resultado animate-pop">
          <h2>🎉 Tickets Prontos!</h2>
          <p><strong>{resposta.usuario}</strong>, você recebeu:</p>
          <div className="ticket-count">{resposta.ticketsGerados}</div>
          <p>{resposta.mensagem}</p>
          <button onClick={() => setResposta(null)}>NOVA CONVERSÃO</button>
        </div>
      )}
    </div>
  );
}

export default App;