const input = document.getElementById('input');
const addbtn = document.getElementById('addbtn');
const div = document.getElementById('list')

//엔터로 입력시 ?????   그리고 input 입력시 비어있을때 입력 안되게 하기???
input.addEventListener('keyup', (e) => {
  if(e.keyCode === 13){
    addList()
  }
})

addbtn.addEventListener('click', () => {
  addList()
})

function addList() {
  if (input.value === '') return
  
  const List = document.createElement('div')

  const Input = document.createElement('input')

  const Label = document.createElement('label')
  Label.innerText = input.value
  Label.style.marginLeft = '10px'

  Input.type = 'checkbox'
  Input.addEventListener('change', (e) => {
      if (Input.checked) {
      Label.style.textDecoration = 'line-through'
      } else {
      Label.style.textDecoration = 'none'
      }
  })

  //리스트 삭제
  const DeleteButton =  document.createElement('button')
  DeleteButton.textContent = '제거하기'
  DeleteButton.style.marginLeft = '10px'
  DeleteButton.addEventListener('click', () => {
      List.parentNode.removeChild(List)
  })

  List.appendChild(Input)
  List.appendChild(Label)
  List.appendChild(DeleteButton)

  div.appendChild(List)
  //input 다시 공백으로
  input.value = ''
}