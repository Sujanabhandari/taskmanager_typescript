import TodoLists from './components/TodoLists';
import { Routes, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import Todos from './components/Todo';

export function App() {
  return (
    <>
      <div className="container mt-5">
        <h1><Link to='/'>Task Manager</Link></h1>
      </div>
      <Routes>
        <Route path="/" element={<TodoLists />} />
        <Route path="/todos/:id" element={<Todos />} />
      </Routes>
    </>
  );
}

export default App;
