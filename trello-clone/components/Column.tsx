import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Draggable, Droppable } from "react-beautiful-dnd"
import TodoCard from "./TodoCard";



type Props = {
    id: TypedColumn,
    todos: Todo[],
    index: number
    
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todos: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

export default function Column({id, todos, index}: Props) {
  return (
    <Draggable draggableId={id} index={index}>
        {(provided) => (
            <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            >
               {/*render the droppable todos in the column */}
               <Droppable droppableId={index.toString()} type="card">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`p-2 rounded-2xl shadow-sm ${
                      snapshot.isDraggingOver ? "bg-green-200" : "bg-white bg-opacity-50"

                    }`}
                 >
                 <h2 className="flex justify-between font-bold text-xl p-2">
                  {idToColumnText[id]}
                 <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-2 text-sm font-normal">
                  {todos.length}
                  </span>
                 </h2>

                 <div className="space-y-2">
                  {todos.map((todo,index) => (
                  <Draggable
                  key={todo.$id}
                  draggableId={todo.$id}
                  index={index}
                  >
                    {(provided) => (
                      <TodoCard
                      todo={todo}
                      index={index}
                      id={id}
                      innerRef={provided.innerRef}
                      draggableProps={provided.draggableProps}
                      dragHandleProps={provided.dragHandleProps}
                      />
                    )}
                  </Draggable>
                  ))}

                  {provided.placeholder}
                  

                  <div>
                    <button className="flex items-end justify-end p-2">
                      <PlusCircleIcon
                      className="h-10 w-10"
                      />
                    </button>
                  </div>



                 </div>
                 </div>
                )}
               </Droppable>
            </div>
        )}
    </Draggable>
  );
}
