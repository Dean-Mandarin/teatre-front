import Home from "./components/home";
import Comments from "./components/comments";
import Performances from "./components/performances";
import Header from "./components/header";

function App() {
  return (
    <div className="App" style={{margin: '-8px', fontFamily: 'Ysabeau'}}>
      <Header/>
      <Home/>
      <Performances/>
      <Comments/>
    </div>
  )
}

export default App;
