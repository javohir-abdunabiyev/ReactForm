import { Todo } from "@/types";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";

interface ShowTodosProps {
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
}

const ShowTodos: React.FC<ShowTodosProps> = ({ todos,setTodos }) => {
    if (!Array.isArray(todos)) {
        return <p>No valid todos available</p>;
    }

    const handleDelete = (id: number) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    return (
        <center>
            <div>

                {
                    todos.map((todo) => (
                        <div key={todo.id} className="w-[600px] h-[60px] bg-gray-900 text-left rounded-[10px] p-[10px] mb-[20px]">
                            <div className="flex items-center justify-between">
                                <div className="flex  gap-[50px]" key={todo.id}>
                                    <p className="font-bold text-[18px]">{todo.title}</p>
                                    <p>{todo.created_at}</p>
                                </div>

                                <div className="flex gap-[40px]">
                                    <MdModeEditOutline size={25} />
                                    <MdDelete onClick={() => handleDelete(todo.id)} size={25} />
                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>
        </center>
    );
};

export default ShowTodos;
