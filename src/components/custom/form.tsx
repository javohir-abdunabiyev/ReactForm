import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect } from "react";
import { Todo } from "@/types";

interface TodoFormProps {
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    todos: Todo[];
}

function TodoForm({ setTodos, todos }: TodoFormProps) {
    const { register, handleSubmit, reset, setFocus, formState: { errors } } = useForm<Todo>();

    const onSubmit = (data: Todo) => {
        const formData: Todo = {
            ...data,
            id: Math.floor(Math.random() * 1000),
            completed: false,
            created_at: new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }),
        };

        setTodos((prevTodos) => [...prevTodos, formData]);
        reset();
    };

    useEffect(() => {
        setFocus("title");
    }, [setFocus]);

    return (
        <center>
            <div className="flex justify-center mt-[250px]">
                <form onSubmit={handleSubmit(onSubmit)} className="regForm flex flex-col gap-[20px]">
                    <h1 className="text-[35px] font-bold">Add Todo</h1>
                    <Input
                        className="w-[300px] h-[50px]"
                        {...register("title", { required: "Title is required" })}
                        placeholder="Enter the title"
                    />
                    {errors.title && (
                        <span className="text-red-500">{errors.title.message}</span>
                    )}
                    <Button
                        className="w-[300px] h-[50px] bg-white text-black font-bold text-[18px]"
                        type="submit"
                    >
                        Add
                    </Button>
                </form>
            </div>
        </center>
    );
}

export default TodoForm;
