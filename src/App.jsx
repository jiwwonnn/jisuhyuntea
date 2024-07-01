import {useState} from "react";

const App = () => {



  const [todoList, setTodoList] = useState([]) // 투두리스트 배열
  const [todo, setTodo] = useState('') // 투두 입력 내용
  const [edit, setEdit] = useState(false) // 수정 상태
  const [editText, setEditText] = useState('') // 수정 텍스트


  // input 에 value 값 넣기
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  // input에 checked, id, text 추가하고 todoList 배열에 추가하기
  // 입력 다 했으면 input 은 초기화하기
  const handleSubmit = () => {
    const newTodoItem = {
      id : Date.now(),
      text: todo,
      checked : false,
      isEdit: false,
    }

    setTodoList([...todoList, newTodoItem])
    setTodo('')

  }

  // 엔터키 누르면 내용이 추가가 되게 해야함.
  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      handleSubmit()
    }
  }

  // 리스트에서 닫기버튼 누르면 리스트에서 삭제 되어야함
  const handleListDelete = (id) => {
    // x버튼을 누른 아이템이 아닌것들만 모아서 필터링함 > 새로운 배열을 만듬.
    setTodoList(todoList.filter((item) => item.id !== id))
  }

  // 리스트에서 체크박스 누르면 할일을 완료 한거임.
  const listCheckedToggle = (id) => {
    setTodoList(todoList.map((item) => item.id === id ? {...item, checked: !item.checked } : item))
  }

  // 할일을 클릭하면 수정상태로 변경.
  const handleEdit = (id) => {
    console.log(id, "ID")
  }

  // 수정 input value
  const handleEditChange = (e) => {
    setEdit(e.target.value)
  }

  // 수정 버튼을 눌렀을때
  const handleEditSubmit = (id) => {
    setTodoList(
      todoList.map((item)=> item.id === id ? {...item, text: editText, isEdit: true} : item)
    )
  }




  return (
    <div className='all'>
      <div className={'top'}>
        {/*여기 input checkbox 누르면 모든 할일이 완료된 상태로 변경되게만 작업해보기*/}
        <input type="checkbox" />
        <input type="text" placeholder='입력' value={todo} onChange={handleChange} onKeyPress={handleKeyPress}/>
      </div>
      <div>
        {
          todoList.map((item , idx) => {
            return (
              <div className='mid' key={item.id}>
                <input type="checkbox" onClick={() => listCheckedToggle(item.id)}/>
                {
                  item.isEdit ?
                    (
                      <div>
                        <input type="text" value={item.text} onChange={handleEditChange}/>
                        <button onClick={() => handleEditSubmit(item.id)}>수정완료</button>
                      </div>
                    )
                    :
                    (
                      <div className={item.checked ? 'checked' : ""} onClick={() => handleEdit(item.id)}>{item.text}</div>
                    )

                }
                <div><button onClick={() => handleListDelete(item.id)}>삭제</button></div>
              </div>
            )
          })
        }

      </div>


      <div className='bot'>
        {/*남은 항목 개수 */}
        <div>
          2 items left
        </div>
        <div>
          {/*전체 확인하기*/}
          <button>all</button>
          {/*진행중 확인하기*/}
          <button>not</button>
          {/*종료 확인하기*/}
          <button>completed</button>
        </div>
        {/*완료된거만 삭제하기*/}
        <button>clear completed</button>
      </div>

      <div className='botbot'>할 일 클릭시 수정 가능</div>
    </div>
  )
}

export default App