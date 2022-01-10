let saveTodoItems = getLocalStorage();

const todoInput = document.getElementById('todoInput')
const todoItems = document.getElementById('todoItems');
const todoCount = document.getElementById('todoCount');

reloadTodoItems();


console.log(todoInput.value);

// 엔터키 입력 시
todoInput.addEventListener('keyup', function(e) {
	if (e.key === 'Enter' || e.keyCode === 13) {
		const inputValue = todoInput.value.trim()
		if (todoInput.value.trim() === '') {
			alert('값을 입력하세요.');
			todoInput.value = '';
			return;
		}

		// 추가
		addTodoItem(inputValue);
		removeAddEvent();
		checkAddEvent();
		todoInput.value = '';
	}
})


function addTodoItem(value) {
	let todoItem = {}
	todoItem.text = value;
	todoItem.toggle = false;
	saveTodoItems.push(todoItem);
	setTodoIndex();
	addTodoItemTemplate(todoItem);
	setLcoalStorage();
}

function addTodoItemTemplate(todoItem) {
	// mdi-check-circle
	// mdi-checkbox-blank-circle-outline (default)
	let template = `
		<div class="row">
			<div class="col-2">
				<button class="check-button btn btn-lg" data-index="${todoItem.index}">
	`
	if (todoItem.toggle) {
		template += `<i class="mdi mdi-check-circle"></i>`
	} else {
		template += `<i class="mdi mdi-checkbox-blank-circle-outline"></i>`
	}
	template += `</button>
			</div>
			<div class="col justify-content-center align-self-center">
				<span class="ms-1">${todoItem.text}</span>
			</div>
			<div class="col-2">
				<button class="remove-button btn btn-lg" data-index="${todoItem.index}">
					<i class="mdi mdi-window-close"></i>
				</button>
			</div>
		</div>
	`
	todoItems.innerHTML += template;
}

function setTodoIndex() {
	saveTodoItems.map((todoItem, index) => {
		todoItem.index = index;
	});
	todoCount.innerHTML = saveTodoItems.length == 0 ? '' : saveTodoItems.length;
}

function removeAddEvent() {
	const removeButtons = document.getElementsByClassName('remove-button')
	for (let removeButton of removeButtons) {
		removeButton.addEventListener('click', function() {
			saveTodoItems.splice(Number(this.dataset.index), 1);
			reloadTodoItems();
		});
	}
}

function checkAddEvent() {
	const checkButtons = document.getElementsByClassName('check-button')
	for (let checkButton of checkButtons) {
		checkButton.addEventListener('click', function() {
			let todoItem = saveTodoItems[Number(this.dataset.index)];
			todoItem.toggle = !todoItem.toggle;
			reloadTodoItems();
		});
	}
}

function reloadTodoItems() {
	todoItems.innerHTML = '';
	todoCount.innerHTML = '';
	setTodoIndex();
	for (let todoItem of saveTodoItems) {
		addTodoItemTemplate(todoItem);
	}
	removeAddEvent();
	checkAddEvent();
	setLcoalStorage();
}

function setLcoalStorage() {
	window.localStorage.setItem('todoItems', JSON.stringify(saveTodoItems));
}

function getLocalStorage() {
	return (window.localStorage.getItem('todoItems') == null) ? [] : JSON.parse(window.localStorage.getItem('todoItems'))
}