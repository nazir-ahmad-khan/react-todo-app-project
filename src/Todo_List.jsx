import { useRef, useState } from 'react';
import './Todo_List.css';
import { MdDelete, MdEdit } from 'react-icons/md';


function Todo_List() {

    const [newTodo, setNewTodo] = useState("");
    const [newData, setNewData] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const inputRef = useRef(null);
    const listRef = useRef(null);


    // input onChange
    const handleInput = (event) => {
        setNewTodo(event.target.value)
    }

    const addTodoData = () => {
        if (newTodo.trim() === "") return;
        if (editIndex !== null) {
            const updatedTodos = [...newData];
            updatedTodos[editIndex] = newTodo;
            setNewData(updatedTodos);
            setEditIndex(null)
        } else {
            setNewData([...newData, newTodo]);
        }
        setNewTodo("");
        inputRef.current.focus();
        setTimeout(() => {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }, 0);
    }

    const editTodo = (index) => {
        setNewTodo(newData[index]);
        setEditIndex(index);
        setTimeout(() => {
            inputRef.current.focus();
        }, 0);
    }

    const deleteTodo = (index) => {
        let filterName = newData.filter((newElem, id) => id !== index);
        setNewData(filterName)
    }

    const enterKey = (e) => {
        e.preventDefault();
        addTodoData();
        // inputRef.current.focus();
    }

    // CLEAR ALL TODOS (Bonus with confirmation)
    const clearAllTodos = () => {
        const comfirmClear = window.confirm(
            "Are you sure you want to clear all todos?"
        );
        if (comfirmClear) {
            setNewData([]);
            setNewTodo("");
            setEditIndex(null);
            inputRef.current.focus();
        }
    };

    return (
        <>
            <div className='body-container' >
                <div className='title'>
                    <h1>Todo List</h1>
                </div>
                <div className="todo-container">
                    <form className="input-container" onSubmit={enterKey}>
                        <input type="text" value={newTodo} onChange={handleInput} ref={inputRef} placeholder='Enter Your Name' />
                        <button type="submit" onClick={() => inputRef.current.focus()} >Add</button>
                    </form>

                    <div className='list-container' ref={listRef} >
                        <ul>
                            {newData.map((newVal, index) => {
                                return (
                                    <li key={index}>
                                        {newVal}
                                        <i className='btn-icon' onClick={() => deleteTodo(index)} ><MdDelete /></i>
                                        <i className='btn-icon' style={{ right: "80px" }} onClick={() => editTodo(index)} > <MdEdit /> </i>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className='btn-container'>

                        {newData.length > 0 && (
                            <button className="clear-btn" type='button' onClick={clearAllTodos} >Clear ToDos</button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Todo_List;