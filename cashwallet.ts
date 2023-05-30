let balance = 0;
let loggedIn = false;
let accountName = '';
let accountNumber = '';

function login() {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	if (username === "" || password === "") {
		showLoginMessage("Please enter both username and password");
		return;
	}

	if (isValidLogin(username, password)) {
		loggedIn = true;
		accountName = username;
		accountNumber = generateAccountNumber();
		showBankingContainer();
		updateAccountInfo();
		showBankingMessage("Sign Up Successful!");
	} else {
		showLoginMessage("Invalid username or password. Ensure password is longer than 4.");
	}
}

function showLoginMessage(message) {
	const loginMessageElement = document.getElementById("login-message");
	loginMessageElement.textContent = message;
	setTimeout(() => {
		loginMessageElement.textContent = '';
	}, 10000);
}

function showBankingMessage(message) {
	const bankingMessageElement = document.getElementById("banking-message");
	bankingMessageElement.textContent = message;
	setTimeout(() => {
		bankingMessageElement.textContent = '';
	}, 10000);
}


function isValidLogin(username, password) {
	if (username.length < 3 || password.length < 4) {
		return false;
	}
	return true;
}

function showBankingContainer() {
	document.getElementById("login-container").style.display = "none";
	document.getElementById("banking-container").style.display = "block";
}

function updateAccountInfo() {
	const accountNameElement = document.getElementById("account-name");
	const accountNumberElement = document.getElementById("account-number");

	accountNameElement.textContent = `Account Name: ${accountName}`;
	accountNumberElement.textContent = `Account Number: ${accountNumber}`;
}

function generateAccountNumber() {
	const accountNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
	return accountNumber.toString();
}


function updateBalance() {
	const balanceElement = document.getElementById("balance");
	balanceElement.textContent = `Balance: $${balance.toFixed(2)}`;
}

function deposit() {
	const amount = parseFloat(document.getElementById("amount").value);
	if (isNaN(amount) || amount <= 0) {
		showBankingMessage("Invalid amount");
		return;
	}
	balance += amount;
	updateBalance();
	showBankingMessage(`Deposited $${amount.toFixed(2)}`);
}

function withdraw() {
	const amount = parseFloat(document.getElementById("amount").value);
	if (isNaN(amount) || amount <= 0) {
		showBankingMessage("Invalid amount");
		return;
	}
	if (balance < amount) {
		showBankingMessage("Insufficient balance");
		return;
	}
	balance -= amount;
	updateBalance();
	showBankingMessage(`Withdrawn $${amount.toFixed(2)}`);
}

function transfer() {
	const amount = parseFloat(document.getElementById("amount").value);
	if (isNaN(amount) || amount <= 0) {
		showBankingMessage("Invalid amount");
		return;
	}
	if (balance < amount) {
		showBankingMessage("Insufficient balance");
		return;
	}
	const recipient = prompt("Enter recipient's account number:");
	if (recipient === null || recipient === "") {
		showBankingMessage("Transfer Cancelled!!!");
		return;
	}
	if (recipient.length !== 10) {
		showBankingMessage("Invalid Account number. Try again!!!");
		return;
	}
	balance -= amount;
	updateBalance();
	showBankingMessage(`Transferred $${amount.toFixed(2)} to account ${recipient}`);
}

function showMessage(message) {
	const messageElement = document.getElementById("message");
	messageElement.textContent = message;
}