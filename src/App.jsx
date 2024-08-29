import Header from "./components/header";
import TodoList from "./components/TodoList";
import bgMain from './assets/bgmain.svg';


const App = () => {
  return (
    <div className=" w-100" style={
      {
        backgroundImage: `url(${bgMain})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '200px', 
        color: 'black', 
        height:'100vh'
      }
    }>

   <Header/>
  
   <TodoList/>
    </div>
  )
}

export default App
