const input = document.querySelector('input');
const button = document.querySelector('button');
const list = document.querySelector('ul'); // �޼ҵ��� ���ڸ� ul�� �־����! (���� h2����.)

let draggedItem = null;

button.addEventListener('click', addTodo);
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // ���� ����Ǵ� ���� ������.
        event.preventDefault();
        addTodo();
    }
});

function addTodo() {
    const todo = input.value;
    if (todo) {
        const item = document.createElement('li');
        item.draggable = true;
        // �� �� �巡���Ͽ� �켱���� �α�
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
        // ���� ���ã�� �����ϱ�
        const favoriteButton = document.createElement('button');
        favoriteButton.textContent = '��'; // ���� �������� ����Ʈ�� ���� ��� ��ġ

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

        todoText.addEventListener('click', () => { // �������� ����, �ѹ��� �������� ���� �����ϱ�
            if (todoText.style.textDecoration === 'line-through') {
                todoText.style.textDecoration = 'none';
            } else {
                todoText.style.textDecoration = 'line-through';
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X'; // XŰ�� ���� ���� ����
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            list.removeChild(item);
        });

        item.appendChild(deleteButton);

        list.appendChild(item);

        input.value = '';
    }
}
