const view = {
    displayGrid: (container) => container.innerHTML = model.createGrid(),
    highlightMultiples: (multiples) => multiples.forEach((multiple) => multiple.classList.add('highlight'))
};

const model = {
    gridSize: 144,
    clickedCell: null,
    createGrid: () => Array.from({ length: model.gridSize }, (v, i) => i + 1).map((i) => `<div class="cell">${i}</div>`).join('')
};

const controller = {
    resetGrid: (cells) => {
        Array.from(cells).forEach((item) => {
            if (item.classList.contains('highlight')) {
                item.classList.remove('highlight');
            }
        });
        model.clickedCell = null;
    },
    processMultiples: (cells) => {
        const multiples = Array.from(cells).filter((item) => {
            if (item.classList.contains('highlight')) {
                item.classList.remove('highlight');
            }
            return parseInt(item.textContent) % parseInt(model.clickedCell.textContent) === 0
        });
        view.highlightMultiples(multiples);
    }
};

const handleClick = (e) => {
    const cells = document.getElementsByClassName('cell');
    
    if(model.clickedCell !== null) {
        model.clickedCell.classList.remove('clicked');
    }

    if (e.target === model.clickedCell) {
        controller.resetGrid(cells);
    } else {
        e.target.classList.add('clicked');
        model.clickedCell = e.target;
        controller.processMultiples(cells);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    container.addEventListener('click', handleClick, false);
    view.displayGrid(container);
});