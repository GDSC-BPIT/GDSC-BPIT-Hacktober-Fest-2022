var totalMoney = parseInt(document.getElementById("money").innerText); 

function transaction(debitAmount , creditAmount , totalMoney) {
    var transactionList = document.createElement("LI");
    var transactionDetails;
    
    if(debitAmount == 0){
        transactionDetails = document.createTextNode("Amount Credited: " + creditAmount + " || Total: " + totalMoney);
    } else {
        transactionDetails = document.createTextNode("Amount Debited: " + debitAmount + " || Total: " + totalMoney);
    }
    
    transactionList.appendChild(transactionDetails);
    document.getElementById("transaction").prepend(transactionList);
}


function addValue() {
    moneyIn = parseInt(document.getElementById("amount").value);
    
    if (moneyIn) {
      totalMoney = totalMoney + moneyIn;
      console.log(totalMoney);
      document.getElementById("money").innerText = totalMoney;

      transaction(moneyIn, 0, totalMoney);
    }

    document.getElementById("amount").value = "";
}

function subtractValue() {
    moneyOut = parseInt(document.getElementById("amount").value);
    
    if(moneyOut){
        totalMoney = totalMoney - moneyOut;
        
        if(totalMoney < 0){
            alert("‼️You are out of money‼️");
        }
        
        console.log(totalMoney);
        document.getElementById("money").innerText = totalMoney;    
        
        transaction(0 , moneyOut , totalMoney);
    }
    
    document.getElementById("amount").value = "";
}