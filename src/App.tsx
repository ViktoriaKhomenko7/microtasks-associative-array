import React, {useState} from 'react';
import './App.css';
import {Todolist} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type todoListType = {
  id: string
  title: string
  filter: FilterValuesType
}
function App() {

  // let [tasks, setTasks] = useState([
  //     {id: v1(), title: "HTML&CSS", isDone: true},
  //     {id: v1(), title: "JS", isDone: true},
  //     {id: v1(), title: "ReactJS", isDone: false},
  //     {id: v1(), title: "Rest API", isDone: false},
  //     {id: v1(), title: "GraphQL", isDone: false},
  // ]);
  // let [filter, setFilter] = useState<FilterValuesType>("all");

  let todolistID1=v1();
  let todolistID2=v1();

  let [todoLists, setTodoLists] = useState<todoListType[]>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, setTasks] = useState({
    [todolistID1]:[
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]:[
      {id: v1(), title: "Bread", isDone: true},
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "Cheese", isDone: false},
      {id: v1(), title: "Meat", isDone: false},
      {id: v1(), title: "Butter", isDone: false},
    ]
  });

  function removeTask(id: string) {
    // let filteredTasks = tasks.filter(t => t.id !== id);
    // setTasks(filteredTasks);
  }

  function addTask(title: string) {
    // let task = {id: v1(), title: title, isDone: false};
    // let newTasks = [task, ...tasks];
    // setTasks(newTasks);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    // let task = tasks.find(t => t.id === taskId);
    // if (task) {
    //   task.isDone = isDone;
    // }

    // setTasks([...tasks]);
  }



  // if ( === "active") {
  //   tasksForTodolist = tasks.filter(t => t.isDone === false);
  // }
  // if (filter === "completed") {
  //   tasksForTodolist = tasks.filter(t => t.isDone === true);
  // }

  function changeFilter(value: FilterValuesType) {
    // setFilter(value);
  }


  return (
      <div className="App">
        {todoLists.map((el)=>{
          let tasksForTodolist = tasks[el.id];
          return (
              <Todolist title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
              />
          )
        })}

      </div>
  );
}

export default App;
