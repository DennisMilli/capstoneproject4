document.addEventListener("DOMContentLoaded", () => {
if (document.querySelector(".nav-block")) {
    // Nav-bar
    let clickedNav1 = $('.nav-block div :nth-child(1)');
    let clickedNav2 = $('.nav-block div :nth-child(2)');
    let clickedNav3 = $('.nav-block div :nth-child(3)');
    
    $('.nav-block').click(() => {
        clickedNav1.toggleClass('leftX');
        clickedNav2.toggleClass('middleX');
        clickedNav3.toggleClass('rightX');
        $('.side-bar').toggleClass('active')
        $('body').toggleClass('no-scroll')
    })
};
if (document.querySelector("#modal")) {

const body = $("body");
const modal = $("#modal");
let modalOpened = false;
const select = $(".currency-section");
const countryOptions = $(".countrySelector .countries");
const options = document.querySelectorAll('.countries');
const highlight = document.querySelector('.highlight');
const searchInput = document.getElementById('countrySearch');
let activeSelector = null;
            
select.click(function() {
  $('.currency-selector').removeClass('active-selector');
  
  $(this).addClass('active-selector');
  
  activeSelector = $(this);
  modal.addClass("active-modal");
  body.addClass("no-scroll")
  modalOpened = true;
  console.log(modalOpened);
})

countryOptions.click(function() {
  if (!activeSelector) return;
  
  let flag = $(this).find(".flag-box").html();
  let currency = $(this).find(".currency").text();
  let rate = $(this).data("rate");
  let code = $(this).data("code");
  
  let currentCurrency = activeSelector.find('p').text();
  let currentCode = activeSelector.find(".currency-selector").data("code");

  if (currency === currentCurrency && code === currentCode) {
    // Just close the modal without changing values
    $(".modalContent").addClass("closing");
    modal.addClass("closing");
    setTimeout(() => {
      modal.removeClass("active-modal");
      body.removeClass("no-scroll");
      modal.removeClass("closing");
      modalOpened = false;
      console.log("Modal closed without changes - same currency selected");
      $(".modalContent").removeClass("closing");
    }, 600);
    return; // Exit the function early
  }

  activeSelector.find('.flag-box').html(flag);
  activeSelector.find('p').text(currency);
  activeSelector.find(".currency-selector").attr('data-rate', rate);
  activeSelector.find(".currency-selector").attr('data-code', code);
  
  $(".modalContent").addClass("closing");
  modal.addClass("closing");
  setTimeout(() => {
    modal.removeClass("active-modal");
    body.removeClass("no-scroll");
    modal.removeClass("closing");
    modalOpened =  false;
    console.log(modalOpened, flag, currency);
    $(".modalContent").removeClass("closing");
  }, 600);
})
$(document).click((event) => {
  if (event.target.id === "modal" && modalOpened) {
    if (activeSelector) {
      activeSelector.removeClass('active-selector');
      activeSelector = null;
    }
    console.log("Clicked outside modal!");
    $(".modalContent").addClass("closing");
    modal.addClass("closing");
    setTimeout(() => {
      modalOpened = false;
      modal.removeClass("active-modal");
      body.removeClass("no-scroll");
      modal.removeClass("closing");
      console.log("Modal closed:", modalOpened);
      $(".modalContent").removeClass("closing");
    }, 600); 
  };
  });

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    console.log("🔍 searchBar typed:", searchInput.value);

    $(".countries").each(function () {
      const country = $(this).find(".country-name").text().toLowerCase();
      const currency = $(this).find(".currency").text().toLowerCase();

      if (country.includes(searchTerm) || currency.includes(searchTerm)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
};
  
  options.forEach(option => {
    let hoverTimer;

    option.addEventListener('mouseenter', () => {
        highlight.style.width = `${option.offsetWidth}px`;
        highlight.style.height = `${option.offsetHeight}px`;
        highlight.style.transform = `translateY(${option.offsetTop}px)`;
        highlight.style.opacity = "1"; // show when hovering
    
        hoverTimer = setTimeout(() => {
          option.classList.add("active-hover");
        }, 150);
        });

    option.addEventListener("mouseleave", () => {
      highlight.style.opacity = "0";
      clearTimeout(hoverTimer);
      option.classList.remove("active-hover");
    });
  });
};

if (document.querySelector(".calculator")) {
  const countryOptions = document.querySelectorAll(".countrySelector .countries")
  const box1Input = document.getElementById("box1Input");   
  const box2Input = document.getElementById("box2Input"); 
  const conversionRateElement = document.getElementById("conversion-rate");
  let activeBox = 1;

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  function getRate(currencyCode) {
    const pickedRate = document.querySelector(`[data-code='${currencyCode}']`);
    console.log(pickedRate);
    return pickedRate ? parseFloat(pickedRate.dataset.rate) : null;
  }
  function convertCurrency(amount, fromCurrency, toCurrency) {
    const fromRate = getRate(fromCurrency);
    const toRate = getRate(toCurrency);
    if (!fromRate || !toRate) return null;
    return amount * (toRate / fromRate);
  }

  function sanitizeInput(value) {
    // Allow only numbers + decimal
    const clean = value.replace(/[^\d.]/g, "");

    // Limit total length
    return clean.length > 8 ? clean.slice(0, 8) : clean;
  }

  function handleBox1Input() {
    const raw = sanitizeInput(box1Input.value);
    box1Input.value = raw;
    const amount = parseFloat(raw) || 0;
    
    const fromCurrency = document.querySelector("#selector1").dataset.code;
    const toCurrency = document.querySelector("#selector2").dataset.code;
    const result = convertCurrency(amount, fromCurrency, toCurrency);
    console.log(result);
    box2Input.value = result ? formatter.format(result) : "";
    updateConversionRateVisibility();
  }
  function handleBox2Input() {
    const raw = sanitizeInput(box2Input.value);
    box2Input.value = raw;
    const amount = parseFloat(raw) || 0;
    
    const fromCurrency = document.querySelector("#selector2").dataset.code;
    const toCurrency = document.querySelector("#selector1").dataset.code;
    const result = convertCurrency(amount, fromCurrency, toCurrency);
    console.log(result);
    box1Input.value = result ? formatter.format(result) : "";
    updateConversionRateVisibility();
  }

  function updateConversionRateVisibility() {
    const box1Value = parseFloat(box1Input.value) || 0;
    const box2Value = parseFloat(box2Input.value) || 0;
    
    if (box1Value > 0 || box2Value > 0) {
      conversionRateElement.style.display = "block";
      updateConversionRateContent();
    } else {
      // Hide conversion rate
      conversionRateElement.style.display = "none";
    }
  }

  function updateConversionRateContent() {
    const fromCurrency = document.querySelector("#selector1").dataset.code;
    const toCurrency = document.querySelector("#selector2").dataset.code;
    
    const fromRate = getRate(fromCurrency);
    const toRate = getRate(toCurrency);
    
    if (fromRate && toRate) {
      const baseRate = toRate / fromRate;
      conversionRateElement.querySelector("p").innerHTML = 
        `1 ${fromCurrency} <i class="bi bi-arrow-left-right"></i> ${formatter.format(baseRate)} ${toCurrency}`;
    }
  }

// Track focus
box1Input.addEventListener("input", handleBox1Input);
box1Input.addEventListener("focus", () => (activeBox = 1));

box2Input.addEventListener("input", handleBox2Input);
box2Input.addEventListener("focus", () => (activeBox = 2));

document.querySelectorAll(".currency-selector").forEach(selector => {
  selector.addEventListener("click", function() {
    if (conversionRateElement.style.display === "block") {
      updateConversionRateContent();
    }
  });
});

countryOptions.forEach(option => {
    option.addEventListener("click", function() {
      console.log("Country clicked:", this.dataset.code);

  if (activeBox === 1) {
    handleBox1Input();
  } else {
    handleBox2Input();
  }
if (conversionRateElement.style.display === "block") {
  updateConversionRateContent();
}
});
});
conversionRateElement.style.display = "none";

}
});

