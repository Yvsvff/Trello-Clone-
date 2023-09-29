import { databases, storage } from '@appwrite';
import { getTodosGroupedByColumn } from '@lib/getTodosGroupedByColumn';
import { create } from 'zustand'

interface BoardState{
    board: Board;
    getBoard: () => void;
    setBoardState: (board: Board) => void;
    updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
    newTaskInput: string
    setNewTaskInput: (input:string) => void;
    image: File | null;
    searchString: string;
    setSearchString: (searchString: string) => void;
    newTaskType: TypedColumn;
    setNewTaskType: (columnId: TypedColumn) => void
    setImage: (image: File | null) => void;
    deleteTask: (taskIndex: number, todoId: Todo, id: TypedColumn) => void;
    addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void;

}
export const useBoardStore = create<BoardState>((set,get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  searchString: "",
  newTaskInput: "",
  newTaskType: "todo",
  setNewTaskType: (columnId: TypedColumn) => set({newTaskType: columnId}),
  setImage: (image: File | null) => set({image}),
  setSearchString: (searchString) => set({searchString}),

  setNewTaskInput: (input: string) => set({newTaskInput: input}),

  getBoard: async() => {
    const board = await getTodosGroupedByColumn();
    set({board});

  },
  image: null,
  setBoardState: (board) => set({board}),
  

  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
const newColumns = new Map(get().board.columns)

//delete todoId from newColumns
newColumns.get(id)?.todos.splice(taskIndex, 1);

set({board: {columns: newColumns}});

if (todo.image) {
  await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
}

await databases.deleteDocument(
  process.env.NEXT_PUBLIC_DATABASE_ID!,
  process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
  todo.$id
)
  },

  updateTodoInDB: async(todo, columnId) => {
      await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
        todo.$id,
        {
          title: todo.title,
          status: columnId,
        }
      );
  },
  addTask: async (todo: string, columnId: TypedColumn, image?: File | null) => {
    let file: Image | undefined;
    
    if(image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.buckedId,
          fileId: fileUploaded.$id,
        };
      }
    }
  },
 
}))

