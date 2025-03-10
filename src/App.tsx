import { useState, useEffect } from "react";
import "./App.css";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import TodoForm from "./components/custom/form";
import ShowTodos from "./components/custom/showTodos";
import { Todo } from "@/types";
import SearchForm from "./components/custom/searchForm";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      setTodos(parsedTodos);
      setFilteredTodos(parsedTodos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <div className="w-full h-screen bg-[#0A0A0B] text-white">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <SearchForm todos={todos} setFilteredTodos={setFilteredTodos} />
          <ShowTodos todos={filteredTodos} setTodos={setTodos} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <TodoForm setTodos={setTodos} todos={todos} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;
