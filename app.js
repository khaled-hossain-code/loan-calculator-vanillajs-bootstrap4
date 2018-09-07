document.querySelector('#loan-form').addEventListener('submit', (e) => {
  document.querySelector('#results').style.display = 'none';
  document.querySelector('#loading').style.display = 'block';

  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

function calculateResults(e) {
  const amount = document.querySelector('#amount'),
        interest = document.querySelector('#interest'),
        years = document.querySelector('#years'),
        monthlyPayment = document.querySelector('#monthly-payment'),
        totalPayment = document.querySelector('#total-payment'),
        totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest)/(x - 1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    document.querySelector('#results').style.display = 'block';
  } else {
    showError('Please check your Numbers');
    setTimeout(clearErr, 3000);
  }
  document.querySelector('#loading').style.display = 'none';
}

function showError(errorMsg) {
  const err = document.createElement('div');

  err.className = 'alert alert-danger';
  err.appendChild(document.createTextNode(errorMsg));

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  card.insertBefore(err, heading);
}

function clearErr() {
  document.querySelector('.alert').remove();
}