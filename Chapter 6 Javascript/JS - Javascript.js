// Get elements
const calculateBtn = document.getElementById('calculate-btn');
const costPerLiterInput = document.getElementById('cost-per-liter');
const litersPurchasedInput = document.getElementById('liters-purchased');
const totalCostDisplay = document.getElementById('total-cost');

// Calculate total cost
calculateBtn.addEventListener('click', () => {
  const costPerLiter = parseFloat(costPerLiterInput.value);
  const litersPurchased = parseFloat(litersPurchasedInput.value);

  // Calculate total cost
  const totalCost = (costPerLiter * litersPurchased).toFixed(2);

  // Display total cost in AED
  totalCostDisplay.textContent = `Total Cost: AED ${totalCost}`;
});