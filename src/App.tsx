import './App.css'


const Todolist = () => {
    return <>
        <title>Todolist</title>
        <div>
            <input type="text"/><button>+</button>
        </div>
        <div>
            <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JS</li>
            </ul>
        </div>
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </>;
}

const App = () => {
    return <div className='App'>
        <Todolist />
    </div>
}

export default App
