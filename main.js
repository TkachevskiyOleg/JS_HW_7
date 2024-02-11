
const additionalNewsArray = [
    'Additional News 1',
    'Additional News 2',
    'Additional News 3'
];

function updateSliderValue(event) {
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderThumb = document.getElementById('sliderThumb');
    const sliderValueSpan = document.getElementById('sliderValue');

    const trackWidth = sliderTrack.clientWidth;
    const clickX = event.clientX - sliderTrack.getBoundingClientRect().left;
    const percentage = (clickX / trackWidth) * 100;

    const newValue = Math.min(100, Math.max(0, percentage));

    sliderThumb.style.left = `${newValue}%`;
    sliderValueSpan.textContent = Math.round(newValue);

}


function toggleAccordion(sectionId) {
    const content = document.getElementById(sectionId);
    const allContents = document.querySelectorAll('.accordion-content');

    allContents.forEach((item) => {
        if (item !== content) {
            item.style.display = 'none';
        }
    });

    if (content.style.display === 'block') {
        content.style.display = 'none';
    } else {
        content.style.display = 'block';
    }
}

function generateCalendar() {
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const calendarContainer = document.getElementById('calendarContainer');

    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
        alert('Please enter a valid month (1-12) and year.');
        return;
    }

    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

    let calendarHTML = '<table><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr><tr>';

    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarHTML += '<td></td>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        calendarHTML += `<td>${day}</td>`;

        if ((firstDayOfMonth + day - 1) % 7 === 6) {
            calendarHTML += '</tr><tr>';
        }
    }

    calendarHTML += '</tr></table>';
    calendarContainer.innerHTML = calendarHTML;
}

document.addEventListener('DOMContentLoaded', function () {
    const linkList = document.getElementById('linkList');
    const links = linkList.getElementsByTagName('a');

    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        if (link.getAttribute('href') && link.getAttribute('href').startsWith('http://')) {
            link.classList.add('underline-dotted');
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const bookList = document.getElementById('bookList');
    let selectedBooks = new Set();

    bookList.addEventListener('click', function (event) {
        const clickedElement = event.target;
        const isCtrlPressed = event.ctrlKey;
        const isShiftPressed = event.shiftKey;

        if (clickedElement.tagName === 'LI') {
            const bookId = clickedElement.getAttribute('data-id');

            if (isCtrlPressed) {
                if (selectedBooks.has(bookId)) {
                    selectedBooks.delete(bookId);
                } else {
                    selectedBooks.add(bookId);
                }
            } else if (isShiftPressed && selectedBooks.size > 0) {
                const lastSelectedBook = Array.from(selectedBooks)[selectedBooks.size - 1];
                const start = Math.min(parseInt(lastSelectedBook), parseInt(bookId));
                const end = Math.max(parseInt(lastSelectedBook), parseInt(bookId));

                for (let i = start; i <= end; i++) {
                    selectedBooks.add(i.toString());
                }
            } else {
                selectedBooks.clear();
                selectedBooks.add(bookId);
            }

            Array.from(bookList.children).forEach(book => {
                const id = book.getAttribute('data-id');
                if (selectedBooks.has(id)) {
                    book.classList.add('selected');
                } else {
                    book.classList.remove('selected');
                }
            });
        }
    });
});
document.addEventListener('keydown', function (event) {
    const isCtrlPressed = event.ctrlKey;

    if (isCtrlPressed && event.key === 'q') {
        event.preventDefault();
        toggleEditor();
    } else if (isCtrlPressed && event.key === 's') {
        event.preventDefault();
        saveChanges();
    }
});

function toggleEditor() {
    const textContainer = document.getElementById('textContainer');
    const editContainer = document.getElementById('editContainer');

    textContainer.style.display = 'none';
    editContainer.style.display = 'block';

    const displayText = document.getElementById('displayText');
    const editText = document.getElementById('editText');

    editText.value = displayText.textContent;
}

function saveChanges() {
    const textContainer = document.getElementById('textContainer');
    const editContainer = document.getElementById('editContainer');

    textContainer.style.display = 'block';
    editContainer.style.display = 'none';

    const displayText = document.getElementById('displayText');
    const editText = document.getElementById('editText');

    displayText.textContent = editText.value;
}

function sortTable(columnIndex) {
    const table = document.getElementById('dataTable');
    const rows = Array.from(table.rows).slice(1);
    const isNumeric = !isNaN(parseFloat(rows[0].cells[columnIndex].textContent));

    rows.sort((a, b) => {
        const aValue = isNumeric ? parseFloat(a.cells[columnIndex].textContent) : a.cells[columnIndex].textContent;
        const bValue = isNumeric ? parseFloat(b.cells[columnIndex].textContent) : b.cells[columnIndex].textContent;

        if (aValue < bValue) {
            return -1;
        } else if (aValue > bValue) {
            return 1;
        } else {
            return 0;
        }
    });

    table.tBodies[0].innerHTML = '';

    rows.forEach(row => table.tBodies[0].appendChild(row));
}


