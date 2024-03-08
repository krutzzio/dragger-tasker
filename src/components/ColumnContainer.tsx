import { useSortable } from "@dnd-kit/sortable";
import { Column } from "../types"
import { CSS } from "@dnd-kit/utilities"

interface Props {
  column: Column;
}


export default function ColumnContainer(props: Props) {

  const { column } = props;

  const { setNodeRef, attributes, listeners, transform, transition } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }


  return (
    <div
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className="w-64 h-96 bg-stone-800">
      {props.column.title}
    </div>
  )
}
