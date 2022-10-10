//event listener se dodaje na formu
document.getElementById('loan-form').addEventListener('submit', 
function(e){
    document.querySelector('.results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 3000)

    e.preventDefault()

})
;

function calculateResults(e){
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const year = document.getElementById('year');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    // parseFloat() string -> number
    const principal =  parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) /100 /12;
    const calculatedPayments = parseFloat(year.value) * 12;

    //formula za izracunavanje kamate
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x-1);

    //isFinite - da li je prosledjena vrednost konacan broj
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2
            )
        //show results
        document.querySelector('.results').style.display = 'block';
        //hide the loader
        document.getElementById('loading').style.display = 'none';

    }else{
        // alert('Please, fill in the inputs!') ili
        displayError("Proverite da li ste dobro popunili sva polja!")
    }
}

function displayError(error){
    //hide results
    document.querySelector('.results').style.display = 'none';
    //hide the loader
    document.getElementById('loading').style.display = 'none';

    const errorWrapper = document.createElement('div');
    const card = document.querySelector('.wrapper');
    const heading = document.querySelector('.title');
    errorWrapper.className = 'error-wrapper';
    errorWrapper.appendChild(document.createTextNode(error));
    card.insertBefore(errorWrapper, heading);
    errorWrapper.style.background = "red";

    setTimeout(removeError, 3000) //prima 2 parametra, funkciju i broj milisecunda

}

function removeError(){
    document.querySelector('.error-wrapper').remove()
}