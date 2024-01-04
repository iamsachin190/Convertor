// const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown = document.querySelectorAll(".dropdown select") ;
const btn = document.querySelector('form button') ;
const fromCurr = document.querySelector('.from select');;
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg') ;

for (const select of dropdown) {
   for(currCode in countryList){
    let newOption  = document.createElement('option') ;
    newOption.innerText = currCode  ; 
    newOption.value = currCode ; 
    if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "INR") {
        newOption.selected = "selected";
      }
      select.append(newOption) ;

      select.addEventListener("change" ,(e) =>{
        updateFlag(e.target);
      });
   }

    
}

const updateExchangeRate = async ()=>{
    let amount  = document.querySelector(".amount input") ; 
    let amtvalue =  amount.value ;
    if (amtvalue === "" || amtvalue < 1) {
        amtvalue = 1;
        amount.value = "1";
      }
      // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
      const URL =`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json` ;
      let response = await fetch (URL) ;
      let data = await response.json();
  
      let rate = data[toCurr.value.toLowerCase()];
      let finalAmount = amtvalue * rate;
     
      msg.innerText = `${amtvalue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

      

} ;

const updateFlag = (element) => {
    let currCode = element.value;
    console.log(currCode) ; 
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };
  
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
  });