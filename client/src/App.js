import { Routes, Route } from "react-router-dom";
import Chat from "./components/chat/chat";
import JoinChat from "./components/joinchat/joinchat";
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<JoinChat />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
