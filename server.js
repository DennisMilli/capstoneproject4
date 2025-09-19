import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000; 
const API_URL = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;

let currencies = [];

app.set('view engine', 'ejs');
app.use(express.static(__dirname));


app.get("/", async (req, res) => {
  try {
    const apiResponse = await axios.get(API_URL);
    const liveRates = apiResponse.data.conversion_rates;
    const currencyCodes = Object.keys(liveRates);
    const currencyToCountry = {
        USD: { code: "US", country: "United States" },
          AED: { code: "AE", country: "United Arab Emirates" },
          AFN: { code: "AF", country: "Afghanistan" },
          ALL: { code: "AL", country: "Albania" },
          AMD: { code: "AM", country: "Armenia" },
          ANG: { code: "CW", country: "Curaçao" },
          AOA: { code: "AO", country: "Angola" },
          ARS: { code: "AR", country: "Argentina" },
          AUD: { code: "AU", country: "Australia" },
          AWG: { code: "AW", country: "Aruba" },
          AZN: { code: "AZ", country: "Azerbaijan" },
          BAM: { code: "BA", country: "Bosnia and Herzegovina" },
          BBD: { code: "BB", country: "Barbados" },
          BDT: { code: "BD", country: "Bangladesh" },
          BGN: { code: "BG", country: "Bulgaria" },
          BHD: { code: "BH", country: "Bahrain" },
          BIF: { code: "BI", country: "Burundi" },
          BMD: { code: "BM", country: "Bermuda" },
          BND: { code: "BN", country: "Brunei" },
          BOB: { code: "BO", country: "Bolivia" },
          BRL: { code: "BR", country: "Brazil" },
          BSD: { code: "BS", country: "Bahamas" },
          BTN: { code: "BT", country: "Bhutan" },
          BWP: { code: "BW", country: "Botswana" },
          BYN: { code: "BY", country: "Belarus" },
          BZD: { code: "BZ", country: "Belize" },
          CAD: { code: "CA", country: "Canada" },
          CDF: { code: "CD", country: "Democratic Republic of Congo" },
          CHF: { code: "CH", country: "Switzerland" },
          CLP: { code: "CL", country: "Chile" },
          CNY: { code: "CN", country: "China" },
          COP: { code: "CO", country: "Colombia" },
          CRC: { code: "CR", country: "Costa Rica" },
          CUP: { code: "CU", country: "Cuba" },
          CVE: { code: "CV", country: "Cape Verde" },
          CZK: { code: "CZ", country: "Czech Republic" },
          DJF: { code: "DJ", country: "Djibouti" },
          DKK: { code: "DK", country: "Denmark" },
          DOP: { code: "DO", country: "Dominican Republic" },
          DZD: { code: "DZ", country: "Algeria" },
          EGP: { code: "EG", country: "Egypt" },
          ERN: { code: "ER", country: "Eritrea" },
          ETB: { code: "ET", country: "Ethiopia" },
          EUR: { code: "EU", country: "European Union" },
          FJD: { code: "FJ", country: "Fiji" },
          FKP: { code: "FK", country: "Falkland Islands" },
          FOK: { code: "FO", country: "Faroe Islands" },
          GBP: { code: "GB", country: "United Kingdom" },
          GEL: { code: "GE", country: "Georgia" },
          GGP: { code: "GG", country: "Guernsey" },
          GHS: { code: "GH", country: "Ghana" },
          GIP: { code: "GI", country: "Gibraltar" },
          GMD: { code: "GM", country: "Gambia" },
          GNF: { code: "GN", country: "Guinea" },
          GTQ: { code: "GT", country: "Guatemala" },
          GYD: { code: "GY", country: "Guyana" },
          HKD: { code: "HK", country: "Hong Kong" },
          HNL: { code: "HN", country: "Honduras" },
          HRK: { code: "HR", country: "Croatia" },
          HTG: { code: "HT", country: "Haiti" },
          HUF: { code: "HU", country: "Hungary" },
          IDR: { code: "ID", country: "Indonesia" },
          ILS: { code: "IL", country: "Israel" },
          IMP: { code: "IM", country: "Isle of Man" },
          INR: { code: "IN", country: "India" },
          IQD: { code: "IQ", country: "Iraq" },
          IRR: { code: "IR", country: "Iran" },
          ISK: { code: "IS", country: "Iceland" },
          JEP: { code: "JE", country: "Jersey" },
          JMD: { code: "JM", country: "Jamaica" },
          JOD: { code: "JO", country: "Jordan" },
          JPY: { code: "JP", country: "Japan" },
          KES: { code: "KE", country: "Kenya" },
          KGS: { code: "KG", country: "Kyrgyzstan" },
          KHR: { code: "KH", country: "Cambodia" },
          KID: { code: "KI", country: "Kiribati" },
          KMF: { code: "KM", country: "Comoros" },
          KRW: { code: "KR", country: "South Korea" },
          KWD: { code: "KW", country: "Kuwait" },
          KYD: { code: "KY", country: "Cayman Islands" },
          KZT: { code: "KZ", country: "Kazakhstan" },
          LAK: { code: "LA", country: "Laos" },
          LBP: { code: "LB", country: "Lebanon" },
          LKR: { code: "LK", country: "Sri Lanka" },
          LRD: { code: "LR", country: "Liberia" },
          LSL: { code: "LS", country: "Lesotho" },
          LYD: { code: "LY", country: "Libya" },
          MAD: { code: "MA", country: "Morocco" },
          MDL: { code: "MD", country: "Moldova" },
          MGA: { code: "MG", country: "Madagascar" },
          MKD: { code: "MK", country: "North Macedonia" },
          MMK: { code: "MM", country: "Myanmar" },
          MNT: { code: "MN", country: "Mongolia" },
          MOP: { code: "MO", country: "Macau" },
          MRU: { code: "MR", country: "Mauritania" },
          MUR: { code: "MU", country: "Mauritius" },
          MVR: { code: "MV", country: "Maldives" },
          MWK: { code: "MW", country: "Malawi" },
          MXN: { code: "MX", country: "Mexico" },
          MYR: { code: "MY", country: "Malaysia" },
          MZN: { code: "MZ", country: "Mozambique" },
          NAD: { code: "NA", country: "Namibia" },
          NGN: { code: "NG", country: "Nigeria" },
          NIO: { code: "NI", country: "Nicaragua" },
          NOK: { code: "NO", country: "Norway" },
          NPR: { code: "NP", country: "Nepal" },
          NZD: { code: "NZ", country: "New Zealand" },
          OMR: { code: "OM", country: "Oman" },
          PAB: { code: "PA", country: "Panama" },
          PEN: { code: "PE", country: "Peru" },
          PGK: { code: "PG", country: "Papua New Guinea" },
          PHP: { code: "PH", country: "Philippines" },
          PKR: { code: "PK", country: "Pakistan" },
          PLN: { code: "PL", country: "Poland" },
          PYG: { code: "PY", country: "Paraguay" },
          QAR: { code: "QA", country: "Qatar" },
          RON: { code: "RO", country: "Romania" },
          RSD: { code: "RS", country: "Serbia" },
          RUB: { code: "RU", country: "Russia" },
          RWF: { code: "RW", country: "Rwanda" },
          SAR: { code: "SA", country: "Saudi Arabia" },
          SBD: { code: "SB", country: "Solomon Islands" },
          SCR: { code: "SC", country: "Seychelles" },
          SDG: { code: "SD", country: "Sudan" },
          SEK: { code: "SE", country: "Sweden" },
          SGD: { code: "SG", country: "Singapore" },
          SHP: { code: "SH", country: "Saint Helena" },
          SLL: { code: "SL", country: "Sierra Leone" },
          SOS: { code: "SO", country: "Somalia" },
          SRD: { code: "SR", country: "Suriname" },
          SSP: { code: "SS", country: "South Sudan" },
          STN: { code: "ST", country: "São Tomé and Príncipe" },
          SYP: { code: "SY", country: "Syria" },
          SZL: { code: "SZ", country: "Eswatini" },
          THB: { code: "TH", country: "Thailand" },
          TJS: { code: "TJ", country: "Tajikistan" },
          TMT: { code: "TM", country: "Turkmenistan" },
          TND: { code: "TN", country: "Tunisia" },
          TOP: { code: "TO", country: "Tonga" },
          TRY: { code: "TR", country: "Turkey" },
          TTD: { code: "TT", country: "Trinidad and Tobago" },
          TVD: { code: "TV", country: "Tuvalu" },
          TWD: { code: "TW", country: "Taiwan" },
          TZS: { code: "TZ", country: "Tanzania" },
          UAH: { code: "UA", country: "Ukraine" },
          UGX: { code: "UG", country: "Uganda" },
          UYU: { code: "UY", country: "Uruguay" },
          UZS: { code: "UZ", country: "Uzbekistan" },
          VES: { code: "VE", country: "Venezuela" },
          VND: { code: "VN", country: "Vietnam" },
          VUV: { code: "VU", country: "Vanuatu" },
          WST: { code: "WS", country: "Samoa" },
          XAF: { code: "CM", country: "CFA Franc (Central Africa)" },
          XCD: { code: "AG", country: "Eastern Caribbean" },
          XDR: { code: "IMF", country: "International Monetary Fund" },
          XOF: { code: "BJ", country: "CFA Franc (West Africa)" },
          XPF: { code: "PF", country: "French Polynesia" },
          YER: { code: "YE", country: "Yemen" },
          ZAR: { code: "ZA", country: "South Africa" },
          ZMW: { code: "ZM", country: "Zambia" },
          ZWL: { code: "ZW", country: "Zimbabwe" },
    };    
    currencies = currencyCodes.map(code => {
      const mapping = currencyToCountry[code];
      return {
        currency: code,
        currencyCode: mapping ? mapping.code : code, 
        country: mapping ? mapping.country : code,   
        rate: liveRates[code] 
      };
    }); 

    const tickerPairs = [
      // Nigeria-specific majors
      { from: "USD", to: "NGN", name: "USD/NGN" },
      { from: "GBP", to: "NGN", name: "GBP/NGN" },
      { from: "EUR", to: "NGN", name: "EUR/NGN" },
      { from: "CNY", to: "NGN", name: "CNY/NGN" },

      // Global majors
      { from: "EUR", to: "USD", name: "EUR/USD" },
      { from: "USD", to: "JPY", name: "USD/JPY" },
      { from: "GBP", to: "USD", name: "GBP/USD" },
      { from: "AUD", to: "USD", name: "AUD/USD" },
      { from: "USD", to: "CAD", name: "USD/CAD" },
      { from: "USD", to: "CHF", name: "USD/CHF" },
      { from: "NZD", to: "USD", name: "NZD/USD" }
    ];

    // Calculate rates for each pair
    const tickersWithRates = tickerPairs.map(pair => {
      const fromCurrency = currencies.find(c => c.currency === pair.from);
      const toCurrency = currencies.find(c => c.currency === pair.to);
      
      if (fromCurrency && toCurrency) {
        const rate = (toCurrency.rate / fromCurrency.rate).toFixed(2);
        return {
          ...pair,
          rate: rate,
          displayText: `1 ${pair.from} = ${rate} ${pair.to}`
        };
      }
      
      return {
        ...pair,
        rate: "N/A",
        displayText: `Rate unavailable for ${pair.from}/${pair.to}`
      };
    });

    res.render('index.ejs', { 
      currencies, 
      tickerPairs: tickersWithRates // Send the calculated pairs with rates
    });
    
  } catch (error) {
    console.error("❌ Failed to fetch API:", error.message);
    res.render("index.ejs", { currencies: [], error: error.message });
  }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });