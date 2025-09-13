
const denominations = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];

function calculateChange() {
    // Get input values
    const billAmount = parseFloat(document.getElementById('billAmount').value);
    const paidAmount = parseFloat(document.getElementById('paidAmount').value);
    const messageDiv = document.getElementById('message');
    const resultTable = document.getElementById('resultTable');
    const tableBody = document.getElementById('tableBody');

    messageDiv.innerHTML = '';
    tableBody.innerHTML = '';
    resultTable.style.display = 'none';
    messageDiv.className = 'message';


    if (isNaN(billAmount) || isNaN(paidAmount)) {
        messageDiv.className = 'message error';
        messageDiv.innerHTML = 'Please enter valid amounts.';
        return;
    }
    if (billAmount <= 0 || paidAmount <= 0) {
        messageDiv.className = 'message error';
        messageDiv.innerHTML = 'Amounts cannot be negative or zero.';
        return;
    }
    if (paidAmount < billAmount) {
        const difference = billAmount - paidAmount;
        messageDiv.className = 'message error';
        messageDiv.innerHTML = `Please pay ₹${difference.toFixed(2)} more.`;
        return;
    }


    let change = paidAmount - billAmount;
    if (change === 0) {
        messageDiv.className = 'message success';
        messageDiv.innerHTML = 'No change required.';
        return;
    }

    const result = [];
    let remaining = change;
    for (let denom of denominations) {
        if (remaining >= denom) {
            const count = Math.floor(remaining / denom);
            remaining = remaining % denom;
            result.push({ denomination: denom, count: count });
        }
    }

    if (result.length > 0) {
        resultTable.style.display = 'table';
        result.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${item.denomination}</td><td>${item.count}</td>`;
            tableBody.appendChild(row);
        });
        messageDiv.className = 'message success';
        messageDiv.innerHTML = `Change to return: ₹${change.toFixed(2)}`;
    } else {
        messageDiv.className = 'message error';
        messageDiv.innerHTML = 'Unable to calculate change with available denominations.';
    }

}