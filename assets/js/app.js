let x = prompt('Enter number');
var xTimes = x || 12;
var horizontal = '<th></th>'
    vertical = ''
    options = '';
var s1 = document.querySelector('#select1')
    s2 = document.querySelector('#select2')
    msg = document.querySelector('.ui.blue.message');
init();

function init() {
    reset();
    setupTableAndListeners();
}

function setupTableAndListeners() {
    for (var i = 1; i <= xTimes; i++) {
        horizontal += '<td class="headingNumber" id="headerParent_' + i + '">' + i + '</td>';
        vertical += '<tr><td class="num" id="rowParent_' + i + '">' + i + '</td>';
        options += '<option value="' + i + '">' + i + '</option>';
        for (let x = 1; x <= xTimes; x++) {
            let prod = i * x;
            vertical += '<td id="V_' + x + prod + '">' + prod + '</td>';
        }
    }
    vertical += '</tr>';
    document.querySelector('#horizontal').innerHTML = horizontal;
    document.querySelector('#vertical').innerHTML = vertical;
    s1.innerHTML = options;
    s2.innerHTML = options;
    s2.addEventListener('change', function() {
        find(this.value, s1.value);
        s1.addEventListener('change', function() {
            find(this.value, s2.value);
        });
    });
}

function find(value1, value2) {
    reset();
    let cellId = value2 * value1;
    let cell = document.querySelector('#V_' + value1 + cellId);
    let half = Math.round(xTimes / 2);
    cell.classList.toggle('green');
    document.querySelector('#rowParent_' + value2).classList.toggle('green');
    document.querySelector('#headerParent_' + value1).classList.toggle('green');
    cell.setAttribute('data-tooltip', value2 + ' * ' + value1 + ' = ' + cellId.toLocaleString());
    cell.setAttribute('data-position', (value1 <= half ? 'right center' : 'left center'));
    cell.setAttribute('data-inverted', '');
    msg.classList.remove('hide');
    msg.innerHTML = value2 + ' * ' + value1 + ' = ' + cellId.toLocaleString();
    cell.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

function reset() {
    items = document.querySelectorAll('.green');
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('green');
        items[i].removeAttribute('data-tooltip');
        items[i].removeAttribute('data-position');
        items[i].removeAttribute('data-inverted');
    }
    msg.classList.add('hide');
}
