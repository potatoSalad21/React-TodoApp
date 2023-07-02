import { useState } from 'react';
import './style.css';

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    setTodos((currentTodoList) => {
      return [
        ...currentTodoList,
        { id: crypto.randomUUID(), title: newItem, complete: false },
      ];
    });

    setNewItem("");
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodoList => {
      return currentTodoList.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos(currentTodoList => {
      return currentTodoList.filter(todo => todo.id !== id);
    });
  }

  return (
      <>
        <h1>Todo Website</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="item">New Todo</label>
          <input 
            type="text"
            id="item"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        <section>
          <h2>Todo List:</h2>

          <ul className="todoList">
            {todos.map(todo => {
              return (
                <li key={todo.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.complete}
                      onChange={e => toggleTodo(todo.id, e.target.checked)}
                    />
                    {todo.title}
                  </label>
                  <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
                </li>
              );
            })}
          </ul>
        </section>
      </>
    );
}