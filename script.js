// Variables
const itemsContainer = document.getElementById('items');
const subtotalElement = document.getElementById('subtotal');
const taxElement = document.getElementById('tax');
const totalElement = document.getElementById('total');
const addItemButton = document.getElementById('add-item');
const generatePdfButton = document.getElementById('generate-pdf');

// Función para calcular el total por fila
function calculateRowTotal() {
    const row = this.closest('tr');
    const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
    const unitPrice = parseFloat(row.querySelector('.unit-price').value) || 0;
    const total = (quantity * unitPrice).toFixed(2);

    row.querySelector('.item-total').textContent = `Q${total}`;
    calculateSummary();
}

// Función para calcular el resumen
function calculateSummary() {
    let subtotal = 0;

    document.querySelectorAll('.item-total').forEach(cell => {
        const value = parseFloat(cell.textContent.replace('Q', '').trim()) || 0;
        subtotal += value;
    });

    const tax = (subtotal * 0.12).toFixed(2);
    const total = (subtotal + parseFloat(tax)).toFixed(2);

    subtotalElement.textContent = `Q${subtotal.toFixed(2)}`;
    taxElement.textContent = `Q${tax}`;
    totalElement.textContent = `Q${total}`;
}

// Función para agregar una nueva fila
function addItem() {
    const rowCount = itemsContainer.rows.length + 1;
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${rowCount}</td>
        <td><input type="text" class="description"></td>
        <td><input type="number" class="quantity" min="0" step="1" value="0"></td>
        <td><input type="