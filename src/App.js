import logo from './logo.svg';
import './App.css';
import ColorBox from './components/ColorBox';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import { useState, useEffect } from 'react';
import queryString from 'query-string';
import PostFiltersForm from './components/PostFiltersForm';
import Clock from './components/Clock';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love Reactjs'},
    { id: 2, title: 'We love Reactjs'},
    { id: 3, title: 'They love Reactjs'},
  ]);

  const [postList, setPostList] = useState([]);

  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1
  });

  const [filters, setFilter] = useState({
    _limit: 10,
    _page: 1,
  });

  useEffect(() => {
    async function fetchPostList(){
      try{
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({responseJSON});

        const {data, pagination} = responseJSON;
        setPostList(data);
        setPagination(pagination);
      }
      catch(error){
        console.log('Failed to fetch post list: ', error.message);
      }
    }

    console.log('POST list effect');
    fetchPostList();
  }, [filters]);

  useEffect(() => {
    console.log('TODO list effect');
  });

  function handlePageChange(newPage){
    console.log('New page: ', newPage);
    setFilter({
      ...filters,
      _page: newPage
    });
  }

  function handleTodoClick(todo){
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if(index < 0 ) return;
    
    const newTodoList = [...todoList];
    newTodoList.splice(index,1);
    setTodoList(newTodoList);
  }

  function handleTodoFormSubmit(formValues){
    console.log('Form submit: ', formValues);
    // add new todo to current todo list
    const newTodo = {
      id: todoList.length + 1,
      ... formValues,
    };
    const newTodoList = [... todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  function handleFiltersChange(newFilters){
    console.log('New filters: ', newFilters);
    setFilter({
      ... filters,
      _page: 1,
      title_like: newFilters.searchTerm,
    });
  }

  const [showClock, setShowClock] = useState(true);

  return (
    <div className="App">
      <ColorBox />
      <TodoForm onSubmit = {handleTodoFormSubmit} />
      <TodoList todos = {todoList} onTodoClick = {handleTodoClick}/>
      <PostList posts = {postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange}/>
      <PostFiltersForm onSubmit={handleFiltersChange} />

      {showClock && <Clock />}
      <button onClick={() => setShowClock(false)}>Hide clock</button>
    </div>
  );
}

export default App;
