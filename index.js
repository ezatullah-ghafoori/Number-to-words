
// some digits like 0-9 tens handreds and thousands 
const bigNums = ['', 'Hundred', 'Thousand'];
const numDigits = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const tenMembers = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

// this function's job is to check just single digits 
function checkSingleDigigts(arrayOfNumbers) {
	let x = Number(arrayOfNumbers[0]);
	return numDigits[x];
}
// and this is for tens or just to check the tens number like from 10 - 99 that has two digits
function checkTens(arrayOfNumbers) {
	let x = Number(arrayOfNumbers[0]);
	// this statement is used to check the first of the array if it was zero they will just run
	if (x === 0) {
		arrayOfNumbers.shift();
		return checkSingleDigigts(arrayOfNumbers)
	}
	else if (x === 1) {
		return tenMembers[arrayOfNumbers[1]];
	}
	else if (x !== 0) {
		let y = arrayOfNumbers[1] !== '0' ? numDigits[arrayOfNumbers[1]] : '';
		return tens[x] + ' ' + y;
	}
}
// this function is used to check handreds like 100 - 999
function checkHandred(arrayOfNumbers) {

	if (arrayOfNumbers[0] === '0') {
		arrayOfNumbers.shift()
		return checkTens(arrayOfNumbers)
	} else {

		let index1 = arrayOfNumbers[0] !== '0' ? numDigits[Number(arrayOfNumbers[0])] + ' ' : '';
		let index2 = bigNums[1];
		let index3;

		if (arrayOfNumbers[1] === '0') {
			let x = arrayOfNumbers[2] !== '0' ? numDigits[Number(arrayOfNumbers[2])] : '';
			index3 = ' ' + x;
		} else {
			if (arrayOfNumbers[1] === '1') {
				index3 = ' ' + tenMembers[arrayOfNumbers[2]];
			} else {
				let y = arrayOfNumbers[1] !== '0' ? numDigits[arrayOfNumbers[2]] : '';
				index3 = " " + tens[Number(arrayOfNumbers[1])] + ' ' + y;
			}
		}

		return index1 + index2 + index3;
	}

}
// this is used to check thousends like 1000 - 9999
function checkThousands(arrayOfNumbers) {
	if (arrayOfNumbers[0] === '0') {
		arrayOfNumbers.shift()
		return checkHandred(arrayOfNumbers)
	} else {
		let x = arrayOfNumbers[0];
		arrayOfNumbers.shift();
		if (arrayOfNumbers[arrayOfNumbers.length - 1] === '0' && arrayOfNumbers[arrayOfNumbers.length - 2] === '0' && arrayOfNumbers[arrayOfNumbers.length - 3] === '0') {
			return `${checkSingleDigigts([x])} ${bigNums[2]}`;
		} else {
			return `${checkSingleDigigts([x])} ${bigNums[2]} ${checkHandred(arrayOfNumbers)}`;
		}
	}
}
// and this function is used to check tens of thousends
function checkTensOfThousands(arrayOfNumbers) {
	if (arrayOfNumbers[0] === '0') {
		arrayOfNumbers.shift()
		return checkThousands(arrayOfNumbers)
	} else {
		let x = [arrayOfNumbers[0], arrayOfNumbers[1]]
		arrayOfNumbers.shift()
		let handreds = checkThousands(arrayOfNumbers).split(' ');
		handreds.shift()
		handreds = handreds.toLocaleString().replace(/,/g , ' ')
		if (arrayOfNumbers[arrayOfNumbers.length - 1] === '0' && arrayOfNumbers[arrayOfNumbers.length - 2] === '0' && arrayOfNumbers[arrayOfNumbers.length - 3] === '0') {
			if (arrayOfNumbers[2] === '0') {
				return `${checkTens(x)} thousands`;
			}
			else {
				return `${checkTens(x)} ${bigNums[2]}`;
			}
		}
		else {
			return `${checkTens(x)}  ${handreds}`;
		}
	}
}

// this function is used to call all the other functions. It works like Main function
function toWords(value) {
	// this Statement split the value into array;
	let arrayOfNumbers = value.split('');
	let result = '';
	// this Conditions Checks only single values
	if (value === '') {
		return 'the Result Will Display Here!!!'
	} else {
		switch (arrayOfNumbers.length) {
			case 1:
				result = checkSingleDigigts(arrayOfNumbers);
				break;
			case 2:
				result = checkTens(arrayOfNumbers);
				break;
			case 3:
				result = checkHandred(arrayOfNumbers);
				break;
			case 4:
				result = checkThousands(arrayOfNumbers);
				break;
			case 5:
				result = checkTensOfThousands(arrayOfNumbers);
				break;
			default:
				result = 'Out of Range'

		}
	}
	return result;
}

function changeNum(value) {
	const displayResult = document.getElementById('displaySpan');
	displayResult.textContent = toWords(value);
}
