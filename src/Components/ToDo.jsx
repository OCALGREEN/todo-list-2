import React, {useState} from 'react'

const ToDo = () => {
    const [todoItem, setTodoItem] = useState("") 
    const [todoList, setTodoList] = useState([])
    const [isSubmitted, setIsSubmitted] = useState(false) 
    const [errorMessage, setErrorMessage] = useState("") 

    const handleSubmit = (e) => {
        e.preventDefault() 
        if(todoItem.length < 1){
            setErrorMessage("PLease Enter a Task")
        }
        else {
            const todoObject = {
                text: todoItem,
                complete: false
            }
            setTodoList([...todoList, todoObject])
            setTodoItem("") 
            setIsSubmitted(true) 
            setErrorMessage("")
            console.log("Todo List: ", todoList)
        }
    }

    const handleDelete = (index) => {
        const filteredItemList = todoList.filter((item, i) => {
            return i !== index 
        })
        setTodoList([...filteredItemList])
    }

    const handleComplete = (idx) => {
        const updatedItemList = todoList.map((todo, i) => {
            if(idx === i){
                todo.complete = !todo.complete
            }
            return todo 
        })
        setTodoList(updatedItemList) 
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mt-5 d-flex justify-content-evenly">
                    <label className="form-label">Add: </label>
                    <input className="form-label" type="text" value={todoItem} onChange={(e) => setTodoItem(e.target.value)}/>
                    <button className="btn btn-primary">Add</button>
                </div>
                    {
                        errorMessage?
                        <h1>{errorMessage}</h1>:
                        <h1></h1>
                    }
            </form>
            {
                isSubmitted?
                todoList.map((item, i) => {
                    const todoClasses = []

                    if(item.complete) {
                        todoClasses.push("strike-through") 
                    }

                    return(
                        <div className="mt-3 d-flex justify-content-evenly">
                            <p key={i} className={todoClasses.join(" ")}>{item.text}</p>
                            <input onChange={(e)=>{handleComplete(i)}} checked={item.complete} type="checkbox" name="done" id="done"/>
                            <button className="btn btn-danger" onClick={(e) => handleDelete(i)}>Delete</button>
                        </div>
                    )
                }):
                <h1></h1>
            }
        </div>
    )
}

export default ToDo