let totalIncome = 0;
let totalExpenses = 0;
let entries = [];

function addEntry() {
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  if (description && amount) {
    const entry = { description, amount, category };
    entries.push(entry);
    
    if (category === 'Income') {
      totalIncome += amount;
    } else if (category === 'Expense') {
      totalExpenses += amount;
    }

    updateTable();
    updateOverview();
  }

  // Clear inputs
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
}

function updateTable() {
  const tableBody = document.getElementById('entries-table').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';

  entries.forEach(entry => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = entry.description;
    row.insertCell(1).textContent = `$${entry.amount.toFixed(2)}`;
    row.insertCell(2).textContent = entry.category;
  });
}

function updateOverview() {
  document.getElementById('total-income').textContent = `$${totalIncome.toFixed(2)}`;
  document.getElementById('total-expenses').textContent = `$${totalExpenses.toFixed(2)}`;
  document.getElementById('remaining-balance').textContent = `$${(totalIncome - totalExpenses).toFixed(2)}`;
}

function exportToExcel() {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(entries);
  XLSX.utils.book_append_sheet(wb, ws, 'Budget Data');
  XLSX.writeFile(wb, 'BudgetTracker.xlsx');
}
