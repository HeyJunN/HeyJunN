const input = document.querySelector('input');
const button = document.querySelector('button');
const list = document.querySelector('ul'); // 메소드의 인자를 ul로 넣어야함! (원래 h2였음.)

let draggedItem = null;

button.addEventListener('click', addTodo);
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // 폼이 제출되는 것을 방지함.
        event.preventDefault();
        addTodo();
    }
});

function addTodo() {
    const todo = input.value;
    if (todo) {
        const item = document.createElement('li');
        item.draggable = true;
        // 할 일 드래그하여 우선순위 두기
        item.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() => {
                item.style.display = 'none';
            }, 0);
        });
        item.addEventListener('dragend', () => {
            setTimeout(() => {
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        });
        list.addEventListener('dragover', (event) => {
            event.preventDefault();
        });
        list.addEventListener('drop', () => {
            list.insertBefore(draggedItem, item);
        });
        item.addEventListener('dragenter', () => {
            item.style['border-bottom'] = '2px solid black';
        });
        item.addEventListener('dragleave', () => {
            item.style['border-bottom'] = '';
        });
        // 할일 즐겨찾기 설정하기
        const favoriteButton = document.createElement('button');
        favoriteButton.textContent = '☆'; // ☆을 눌렀을때 리스트의 가장 상단 위치

        const todoText = document.createElement('span');
        todoText.textContent = todo;

        favoriteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            list.insertBefore(item, list.firstChild);
            todoText.style.fontWeight = 'bold';
            favoriteButton.style.backgroundColor = 'gold';
        });
        item.appendChild(favoriteButton);

        item.appendChild(todoText);

        todoText.addEventListener('click', () => { // 눌렀을때 밑줄, 한번더 눌렀을때 밑줄 해제하기
            if (todoText.style.textDecoration === 'line-through') {
                todoText.style.textDecoration = 'none';
            } else {
                todoText.style.textDecoration = 'line-through';
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X'; // X키를 통해 할일 삭제
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            list.removeChild(item);
        });

        item.appendChild(deleteButton);

        list.appendChild(item);

        input.value = '';
    }
}
