import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Todo } from "@/types"

interface SearchFormProps {
    todos: Array<Todo>
    setFilteredTodos: (array: Array<Todo>) => void
}

const SearchForm: React.FC<SearchFormProps> = ({ todos, setFilteredTodos }) => {
    const [search, setSearch] = useState<string>("")

    useEffect(() => {
        const filtered = todos.filter((todo) =>
            todo.title.toLowerCase().includes(search.toLowerCase().trim())
        );
        setFilteredTodos(filtered)
    }, [search, todos, setFilteredTodos])

    return (
        <div>
            <center>
                <h1 className="text-[45px] font-bold mb-[30px] mt-[20px]">Search Todo</h1>
                <Input
                    className="w-[300px] h-[50px] mb-[50px]"
                    placeholder="Search"
                    name="search"
                    onKeyUp={(e) => setSearch(e.target.value)}
                />
            </center>
        </div>
    )
}

export default SearchForm
