const cred_num_input = document.getElementById('cred_input');
const cred_label = document.getElementById('credit_num');
const logo = document.getElementById('logo');
const targetLength = 16;

cred_label.textContent = "#### \xa0 #### \xa0 #### \xa0 ####";

const month = document.getElementById('month_input');
const year = document.getElementById('year_input');

const visa_dig = [4];
const mastercard_dig = [51, 52, 53, 54, 55];
for (let i = 2221; i <= 2720; i++) mastercard_dig.push(i);
const amex_dig = [34, 37];
const discover_dig = [6011, 65, 644, 645, 646, 647, 648, 649];
for (let i = 622126; i <= 622925; i++) discover_dig.push(i);

function getCardType(number) {
    const cardType = {
        Visa: visa_dig.some(digit => number.startsWith(digit.toString())),
        Mastercard: mastercard_dig.some(digit => number.startsWith(digit.toString())),
        AmericanExpress: amex_dig.some(digit => number.startsWith(digit.toString())),
        Discover: discover_dig.some(digit => number.startsWith(digit.toString()))
    };

    return Object.keys(cardType).find(type => cardType[type]) || null;
}

cred_num_input.addEventListener('input', () => {
    const inputVal = cred_num_input.value;

    if (inputVal === "") {
        cred_label.textContent = "#### \xa0 #### \xa0 #### \xa0 ####";
        logo.src = '';
        return;
    }

    const cardType = getCardType(inputVal);
    if (cardType) {
        console.log("Detected card type:", cardType);
        logo.src = `logos/${cardType.toLowerCase()}.png`;
    } else {
        console.log("No card type detected.");
        logo.src = "images/transparent.png";
    }

    let maskedValue = inputVal
        .padEnd(targetLength, '#')
        .split('')
        .map((char, index) => {
            if (index < 4 || index >= targetLength - 4) {
                return char;
            } else {
                return inputVal[index] ? '•' : '#';
            }
        })
        .join('');

    const formattedValue = maskedValue.match(/.{1,4}/g).join("\xa0\xa0\xa0");
    
    cred_label.textContent = formattedValue;
});


const yearSelect = document.getElementById('year_input');
const currentYear = new Date().getFullYear();
const futureYears = 15;

for (let i = 0; i <= futureYears; i++) {
    const option = document.createElement('option');
    option.value = currentYear + i;
    option.textContent = currentYear + i;
    yearSelect.appendChild(option);
}


const name_input = document.getElementById('name_input');
const name_label = document.getElementById('name');
name_input.addEventListener('input', () => {
    if (name_input.value == "") {
        name_label.textContent = "Name Namey";
    }
    else {
        name_label.textContent = name_input.value;
    }
});






const month_input = document.getElementById('month_input');
const year_input = document.getElementById('year_input');
const dateLabel = document.getElementById('date');

function updateDateLabel() {
    const selectedMonth = month_input.value;
    const selectedYear = year_input.value;

    if (selectedMonth && selectedYear) {
        const yearSuffix = selectedYear.slice(-2);
        dateLabel.textContent = `${selectedMonth}/${yearSuffix}`;
    }
}

month_input.addEventListener('change', updateDateLabel);
year_input.addEventListener('change', updateDateLabel);


const cvv_input = document.getElementById('cvv_input');
const cvv_label = document.getElementById('cvv');

cvv_input.addEventListener('input', () => {
    cvv_input.value = cvv_input.value.replace(/\D/g, '');

    if (cvv_input.value.length > 3) {
        cvv_input.value = cvv_input.value.slice(0, 3);
    }

    cvv_label.textContent = '•'.repeat(cvv_input.value.length);
});