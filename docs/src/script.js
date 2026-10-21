const translations = {
    en: {
        welcome_msg: "Welcome to Had Bank! Choose an option above to begin.",
        deposit_btn: "DEPOSIT",
        withdraw_btn: "WITHDRAW",
        statement_btn: "STATEMENT",
        footer_text_1: "More features coming soon.",
        footer_text_2: "Monetize with special fees!",
        prompt_deposit: "Enter the deposit amount:",
        prompt_withdraw: "Enter the withdrawal amount:",
        err_invalid_amount: "Operation failed! The entered amount is invalid.",
        err_invalid_numeric: "Operation failed! Please enter a valid numeric value.",
        err_balance: "Operation failed! You do not have sufficient balance.",
        err_limit: "Operation failed! The withdrawal amount exceeds the limit.",
        err_withdrawals: "Operation failed! Maximum number of withdrawals exceeded.",
        success_deposit: "Success! Deposited R\$ {amount}.",
        success_withdraw: "Success! Withdrew R\$ {amount}.",
        stmt_title: "================ STATEMENT ================",
        stmt_empty: "No transactions have been made.",
        stmt_balance: "Balance: R\$ {balance}",
        stmt_footer: "==========================================="
    },
    pt: {
        welcome_msg: "Bem-vindo ao Had Bank! Escolha uma opção acima para iniciar.",
        deposit_btn: "DEPÓSITO",
        withdraw_btn: "SAQUE",
        statement_btn: "EXTRATO",
        footer_text_1: "Mais funções em breve.",
        footer_text_2: "Monetize com taxas especiais!",
        prompt_deposit: "Digite o valor do depósito:",
        prompt_withdraw: "Digite o valor do saque:",
        err_invalid_amount: "Operação falhou! O valor informado é inválido.",
        err_invalid_numeric: "Operação falhou! Por favor, digite um valor numérico válido.",
        err_balance: "Operação falhou! Você não tem saldo suficiente.",
        err_limit: "Operação falhou! O valor do saque excede o limite.",
        err_withdrawals: "Operação falhou! Número máximo de saques excedido.",
        success_deposit: "Sucesso! Depositado R\$ {amount}.",
        success_withdraw: "Sucesso! Sacado R\$ {amount}.",
        stmt_title: "================ EXTRATO ================",
        stmt_empty: "Não foram realizadas movimentações.",
        stmt_balance: "Saldo: R\$ {balance}",
        stmt_footer: "========================================="
    },
    es: {
        welcome_msg: "¡Bienvenido a Had Bank! Elija una opción arriba para comenzar.",
        deposit_btn: "DEPÓSITO",
        withdraw_btn: "RETIRO",
        statement_btn: "EXTRACTO",
        footer_text_1: "Más funciones próximamente.",
        footer_text_2: "¡Monetiza con tarifas especiales!",
        prompt_deposit: "Introduzca el monto del depósito:",
        prompt_withdraw: "Introduzca el monto del retiro:",
        err_invalid_amount: "¡Operación fallida! El monto ingresado no es válido.",
        err_invalid_numeric: "¡Operación fallida! Por favor, ingrese un valor numérico válido.",
        err_balance: "¡Operación fallida! No cuenta con saldo suficiente.",
        err_limit: "¡Operación fallida! El monto del retiro excede el límite.",
        err_withdrawals: "¡Operación fallida! Se ha excedido o alcanzado el máximo de retiros.",
        success_deposit: "¡Éxito! Depositado R\$ {amount}.",
        success_withdraw: "¡Éxito! Retirado R\$ {amount}.",
        stmt_title: "================ EXTRACTO ================",
        stmt_empty: "No se han realizado transacciones.",
        stmt_balance: "Saldo: R\$ {balance}",
        stmt_footer: "=========================================="
    }
};

// Application State Management (Mirrors Python Backend)
let currentLang = 'en';
let balance = 0.0;
const limit = 500.0;
let statement = "";
let numberOfWithdrawals = 0;
const WITHDRAWAL_LIMIT = 3;

// DOM Selectors Handles
const balanceDisplay = document.getElementById('balance-display');
const consoleOutput = document.getElementById('console-output');
const themeToggleBtn = document.getElementById('theme-toggle');
const langButtons = document.querySelectorAll('.lang-btn');

// Formats Numerical Values to BRL Currencies
function formatCurrency(value) {
    return value.toFixed(2);
}

// Synchronizes the Dashboard Account Balance Display View
function updateBalanceDisplay() {
    balanceDisplay.textContent = `R$ ${formatCurrency(balance)}`;
}

// Prints output strings to the virtual banking console logs
function printToConsole(text) {
    consoleOutput.textContent = text;
}

// Translation UI Text Mapping Synchronizer Engine
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            if (element.classList.contains('op-label')) {
                element.textContent = translations[currentLang][key];
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });
}

// --- Bank Core Interactive Operations Functions ---

function handleDeposit() {
    const promptText = translations[currentLang].prompt_deposit;
    const inputVal = prompt(promptText);
    
    if (inputVal === null) return; // User Cancelled Action
    
    const amount = parseFloat(inputVal);
    
    if (isNaN(amount)) {
        printToConsole(translations[currentLang].err_invalid_numeric);
        return;
    }
    
    if (amount > 0) {
        balance += amount;
        statement += `${currentLang === 'pt' ? 'Depósito' : currentLang === 'es' ? 'Depósito' : 'Deposit'}: R$ ${formatCurrency(amount)}\n`;
        updateBalanceDisplay();
        
        let msg = translations[currentLang].success_deposit.replace('{amount}', formatCurrency(amount));
        printToConsole(msg);
    } else {
        printToConsole(translations[currentLang].err_invalid_amount);
    }
}

function handleWithdrawal() {
    const promptText = translations[currentLang].prompt_withdraw;
    const inputVal = prompt(promptText);
    
    if (inputVal === null) return; // User Cancelled Action
    
    const amount = parseFloat(inputVal);
    
    if (isNaN(amount)) {
        printToConsole(translations[currentLang].err_invalid_numeric);
        return;
    }
    
    const exceededBalance = amount > balance;
    const exceededLimit = amount > limit;
    const exceededWithdrawals = numberOfWithdrawals >= WITHDRAWAL_LIMIT;
    
    if (exceededBalance) {
        printToConsole(translations[currentLang].err_balance);
    } else if (exceededLimit) {
        printToConsole(translations[currentLang].err_limit);
    } else if (exceededWithdrawals) {
        printToConsole(translations[currentLang].err_withdrawals);
    } else if (amount > 0) {
        balance -= amount;
        statement += `${currentLang === 'pt' ? 'Saque' : currentLang === 'es' ? 'Retiro' : 'Withdrawal'}: R$ ${formatCurrency(amount)}\n`;
        numberOfWithdrawals++;
        updateBalanceDisplay();
        
        let msg = translations[currentLang].success_withdraw.replace('{amount}', formatCurrency(amount));
        printToConsole(msg);
    } else {
        printToConsole(translations[currentLang].err_invalid_amount);
    }
}

function handleStatement() {
    const t = translations[currentLang];
    let outputLines = [];
    
    outputLines.push(t.stmt_title);
    outputLines.push(statement ? statement.trim() : t.stmt_empty);
    outputLines.push(""); // Spacer Break
    outputLines.push(t.stmt_balance.replace('{balance}', formatCurrency(balance)));
    outputLines.push(t.stmt_footer);
    
    printToConsole(outputLines.join("\n"));
}

// --- Application Initialization Setup & Events Subscriptions ---

document.getElementById('btn-deposit').addEventListener('click', handleDeposit);
document.getElementById('btn-withdraw').addEventListener('click', handleWithdrawal);
document.getElementById('btn-statement').addEventListener('click', handleStatement);

// Dark/Light Theme Switching Action
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});

// Languages Switching Action Selection Bar
langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        langButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentLang = e.target.getAttribute('data-lang');
        applyTranslations();
    });
});

// App Startup Initial Execution Sync
updateBalanceDisplay();
