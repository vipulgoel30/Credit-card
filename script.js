"use strict";
const input = document.querySelectorAll('input');
const front = document.querySelector('.front');
const back = document.querySelector('.back');
const inputBack = document.querySelector('.card-cvv-input input');

// checking next focus input panel
const nextFocusId = (id) => {

    let count = 1;

    while (count != 8) {
        const nextid = `#id${id === 8 ? id = 1 : ++id}`;
        console.log(nextid);
        const nextelement = document.querySelector(nextid);
        const length = nextelement.value.length;
        let max;
        if (nextid === '#id5') {
            max = Number(nextelement.getAttribute('maxlength'));
        } else {
            max = nextelement.max.length;
        }

        if (length === max) {
            count++;
        } else if (length !== max) {
            console.log(max, length);
            return `#id${id}`;
        }
    }
    if (count === 8) {
        return false;
    }
}

// adding focus zoom of the card for front of the card
[...input].forEach((e) => {
    e.addEventListener('focusin', () => {
        front.style.scale = '1.03';

        e.style.scale = '1.1'

        e.addEventListener('input', () => {

            // console.log(e.type);
            if (e.type === 'text') {
                const maxlength = Number(e.getAttribute('maxlength'));
                const length = e.value.length;
                if (maxlength === length) {
                    const nextid = nextFocusId(5);
                    if (nextid) {
                        document.querySelector(nextid).focus();
                    }
                    e.blur();



                }
            } else {
                const maxlength = Number(e.max.length);
                const length = e.value.length;
                const id = Number(e.getAttribute('id').slice(-1));
                if (length === maxlength) {
                    const nextid = nextFocusId(id);

                    if (nextid) {
                        document.querySelector(nextid).focus();
                    }
                    e.blur();
                } else if (length > maxlength) {
                    nextFocusId(id);
                    e.blur();
                    e.value = e.value.slice(0, maxlength);
                }
            }

        })
    })
    e.addEventListener('focusout', () => {
        front.style.scale = '1';
        e.style.scale = '1'
    })
})


// adding focus zoom for the back of the card
inputBack.addEventListener('focusin', () => {
    back.style.scale = '1.03';

})
inputBack.addEventListener('focusout', () => {
    back.style.scale = '1';
})
// adding back width and height

const backHeightChange = () => {
    back.style.height = `${front.offsetHeight}px`;
}

backHeightChange();
window.addEventListener('resize', backHeightChange);
window.addEventListener('orientationchange', backHeightChange);
