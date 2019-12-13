const axios = require('axios');


const getExchangeRate =  async (fromCurrency, toCurrency)=>{
    try{
    const response = await axios.get(`http://apilayer.net/api/live

    ? access_key = 0010196b0a4d13ebaf6fdfe775bf78da`);
    const rate = response.data.rates;
    const euro = 1 / rate[fromCurrency];
    const exchangeRate = euro * rate[toCurrency];

    return exchangeRate;
    }

    catch(error){
        throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
    }
   

};

const getCountries = async (currencyCode)=>{

    try {
     const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);

        return response.data.map(country=> country.name);
    } catch (error) {
        throw new Error(`Unable to get ${currencyCode}`);
    }
   
}


const convert = async (fromCurrency, toCurrency, amount)=>{
    let exchangeRate;
    let countries;

        await Promise.all([ getExchangeRate(fromCurrency, toCurrency), getCountries(toCurrency) ])
        .then(([exchVal, countVal])=>{
            exchangeRate = exchVal;
            countries = countVal;
        });
        
        // const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
        // const countries = await getCountries(toCurrency);
        const convertedAmount = (amount * exchangeRate).toFixed(2);
        return  `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. 
        You can spend these in the following countries: ${countries}`;
    

};


convert('USD', 'HRK', 20)
  .then((message) => {
    console.log(message);
  }).catch((error) => {
    console.log(error.message);
  });