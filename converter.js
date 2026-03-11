// converter.js

// Função para converter dólares (float) em centavos (inteiro)
function dollarsToCents(value) {
    return Math.round(value * 100);
}

// Função para calcular o menor número de moedas
function convertToCoins(cents) {
    const coins = [25, 10, 5, 1]; // valores das moedas em centavos
    const result = {};

    for (let coin of coins) {
        result[coin] = Math.floor(cents / coin);
        cents = cents % coin;
    }

    return result;
}

// Exemplo de uso
function main() {
    const input = 2.75; // valor em dólares (pode vir de entrada do usuário)
    const cents = dollarsToCents(input);
    console.log(`Valor em centavos: ${cents}`);

    const coins = convertToCoins(cents);
    console.log("Distribuição de moedas:");
    console.log(`25¢: ${coins[25]}`);
    console.log(`10¢: ${coins[10]}`);
    console.log(`5¢: ${coins[5]}`);
    console.log(`1¢: ${coins[1]}`);
}

main();
