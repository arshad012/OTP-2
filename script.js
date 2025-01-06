
const display_otp = document.querySelector('.display-otp');
const result = document.querySelector('.result');
const result_loader = document.querySelector('.result-loader');
const first_input = document.querySelector('#code-1');
const allInputs = document.querySelectorAll('.code');
const submitButtn = document.getElementById('submit');




allInputs.forEach((input) => {
	input.addEventListener('input', (e) => {
		const target = e.target;
		const val = target.value;
		if (val != "") {
	        const next = target.nextElementSibling;
	        if (next) {
	            next.focus();
	        }
	    }
	});
});

allInputs.forEach((input) => {
	input.addEventListener('keyup', (e) => {
		const target = e.target;
		const key = e.key;
		if(key == 'Backspace' || key == 'Delete') {
			const pre = target.previousElementSibling;
			if(pre) {
				pre.focus();
				pre.value = '';
			}
		}
	})
})


let otp = '';

function generateOTP() {
    result.innerText = null;
    otp = '';

    for(let i=0; i<6; i++) {
        let digit = Math.floor(Math.random()*9);
        otp += digit;
    }
    
    display_otp.innerText = otp;
    
    allInputs.forEach((input) => input.removeAttribute('disabled'));

    first_input.focus();
    submitButtn.removeAttribute('disabled');
}

function submitOTP() {
    event.preventDefault();

    submitButtn.setAttribute('disabled', true);

    result.innerText = null;
    result.style.opacity = 0;
    result_loader.style.display = 'block';
    let userInputs = '';

    allInputs.forEach((input) => {
        userInputs += input.value;
    })

    if(otp && userInputs == otp) {
        setTimeout(() => {
            success();
        }, 3000);
    } else {
        setTimeout(() => {
            failure();
        }, 3000);
    }
}

function success() {
    result_loader.style.display = 'none';
    result.innerText = 'Verified, you are a Human.';
    result.style.opacity = 1;

    if(window.innerHeight < 500) {
        result.style.fontSize = '26px';
    } else {
        result.style.fontSize = '20px';
    }
    reset();
}

function failure() {
    result_loader.style.display = 'none';
    result.innerText = 'We can\'t verify you as a Human.';
    result.style.opacity = 1;
    
    if(window.innerHeight < 500) {
        result.style.fontSize = '26px';
    } else {
        result.style.fontSize = '20px';
    }
    reset();
}

function reset() {
    display_otp.innerText = null;

    allInputs.forEach((input) => {
        input.value = null;
        input.setAttribute('disabled', true);
    })
}