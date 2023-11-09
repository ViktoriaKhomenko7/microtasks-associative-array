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

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todoLists, setTodoLists] = useState<todoListType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Cheese", isDone: false},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Butter", isDone: false},
        ]
    });

//---------------------------!!!!!!!!!!-------------------------------
//map() сразу создает новый массив (делает поверхностную копию массива),
// поэтому нам не нужно раскукоживать массив [...arr], а уже внутри мы все делаем вручную
//filter() тоже создает новый массив как и map(), но делает копию внутри, поэтому мы делаем снаружи копию сами

// ----------------------Порядок написания функций----------------------
//1.Добавляем аргумент к функции 2.Пробрасываем аргумет в пропсы TodoList
//3.В TodoList достаем из пропсов и вставляем аргумент к функции
//4. Сетаем 5.




    function removeTask(todoListID: string, id: string) {
        setTasks({...tasks, [todoListID]:tasks[todoListID].filter(filtered=>filtered.id !== id)})
        // let filteredTasks = tasks.filter(t => t.id !== id);
        // setTasks(filteredTasks);
    }

    function addTask(todoListID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})

        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todoListID]:tasks[todoListID].map(el=>el.id === taskId ? {...el, isDone} : el)})

        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //   task.isDone = isDone;
        // }
        // setTasks([...tasks]);
    }

    function changeFilter(todoListID: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(filtered=>filtered.id===todoListID ? {...filtered, filter: value} : filtered))
    }

    return (
        <div className="App">
            {todoLists.map((el) => {
                let tasksForTodolist = tasks[el.id];
                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                }
                return (
                    <Todolist
                        key={el.id}
                        todoListID={el.id}
                        title={el.title}
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
