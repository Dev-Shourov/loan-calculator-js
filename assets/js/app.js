// Submit form-listener
document.getElementById('main-form').addEventListener('submit', function(thisEvent){
    // show loader
    document.getElementById('loader').style.display = 'block';
    // hide results
    document.getElementById('results').style.display = 'none';
    setTimeout(calculateResults, 2000);
    thisEvent.preventDefault();
});

// Calculate results
function calculateResults(){
    // get UI elements
    const UIamount            = document.getElementById('amount');
    const UIinterest          = document.getElementById('interest');
    const UIyears             = document.getElementById('years');
    const UImonthlyPay        = document.getElementById('payment');
    const UItotalPay          = document.getElementById('totalPay');
    const UItotalInterest     = document.getElementById('totalInterest');
    // get the vars
    const principal           = parseFloat(UIamount.value);
    const calculatedInterest  = parseFloat(UIinterest.value)/100/12;
    const calculatedpayment   = parseFloat(UIyears.value)*12;
    // calculate vals
    const x                   = Math.pow(1+calculatedInterest, calculatedpayment)
    const monthly             = (principal*x*calculatedInterest)/(x-1);
    if (isFinite(monthly)) {
        UImonthlyPay.value    = monthly.toFixed(2); 
        UItotalPay.value      = (monthly*calculatedpayment).toFixed(2); 
        UItotalInterest.value = ((monthly*calculatedpayment)-principal).toFixed(2);
        // show loader
        document.getElementById('loader').style.display = 'none';
        // hide results
        document.getElementById('results').style.display = 'block';
    } else {
        showError('Please insert valid values');
    }
}
// show error
function showError(error){
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger text-center';
    errorDiv.appendChild(document.createTextNode(error));
    const card = document.querySelector('.card');
    const form = document.getElementById('main-form');
    // show loader
    document.getElementById('loader').style.display = 'none';
    // hide results
    document.getElementById('results').style.display = 'none';
    // insert div
    card.insertBefore(errorDiv, form);
    setTimeout(clearError, 3000);
}
// clear error
function clearError(){
    document.querySelector('.alert').remove();
}