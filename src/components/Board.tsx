import { useMemo, useState } from "react"
import { Column } from "../types"
import ColumnContainer from "./ColumnContainer"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { SortableContext, arrayMove } from "@dnd-kit/sortable"

export default function Board() {

    const [columns, setColumns] = useState<Column[]>([])
    const columnsId = useMemo(() => columns.map(col => col.id), [columns])

    const addColumn = () => {
        const columnAdded: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`
        }
        setColumns([...columns, columnAdded]);
    }

    const generateId = () => {
        return Math.floor(Math.random() * 10001)
    }

    const onDragStart = (event) => {
        console.log("Dragged")
    }
    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return
        const activeColId = active.id
        const overColId = over.id
        if (activeColId === overColId) return

        setColumns((columns) => {
            const activeColInd = columns.findIndex(col => col.id === activeColId)
            const overColInd = columns.findIndex(col => col.id === overColId)
            return arrayMove(columns, activeColInd, overColInd)
        })
    }

    return (
        <div className="flex flex-col justify-center w-full h-full">
            <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <div className=" flex justify-start items-center gap-4">
                    <SortableContext items={columnsId}>
                        {
                            columns?.map(col => <ColumnContainer key={col.id} column={col} />)
                        }
                    </SortableContext>
                </div>
            </DndContext>
            <button onClick={addColumn}>Add Column</button>
        </div>
    )
}
