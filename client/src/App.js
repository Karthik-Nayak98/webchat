import { Routes, Route } from "react-router-dom";
import Chat from "./components/chat/chat";
import JoinChat from "./components/joinchat/joinchat";
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<JoinChat />} />
        <Route path='/:room' element={<Chat />} />
        {/* <Route path='/channel' element={<Chat />}> */}
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
