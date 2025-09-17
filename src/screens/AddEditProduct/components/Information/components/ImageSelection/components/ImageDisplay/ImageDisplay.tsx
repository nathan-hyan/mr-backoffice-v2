import { closestCenter, DndContext } from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import styles from './styles.module.scss';

interface Props {
  data: string[];
  onReorder?: (newOrder: string[]) => void;
  onDelete?: (id: string) => void;
}

function SortableImage({
  id,
  src,
  isCover,
  onDelete = () => {},
}: {
  id: string;
  src: string;
  isCover: boolean;
  onDelete?: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{
        position: 'relative',
        marginRight: 16,
      }}
    >
      <div
        {...attributes}
        {...listeners}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
          cursor: 'grab',
        }}
      >
        <img src={src} alt='Product' className={styles.image} />
        {isCover && (
          <span
            style={{
              position: 'absolute',
              top: 2,
              left: 2,
              background: '#1976d2',
              color: '#fff',
              fontSize: 10,
              padding: '2px 6px',
              borderRadius: 4,
            }}
          >
            Portada
          </span>
        )}
      </div>

      {onDelete && (
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          style={{
            position: 'absolute',
            top: 2,
            right: 2,
            background: '#f44336',
            color: '#fff',
            fontSize: 10,
            padding: '2px 6px',
            borderRadius: 4,
            border: 'none',
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          X
        </button>
      )}
    </div>
  );
}

function ImageDisplay({
  data,
  onReorder = () => {},
  onDelete = () => {},
}: Props) {
  const handleDragEnd = (event: import('@dnd-kit/core').DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id && onReorder) {
      const oldIndex = data.findIndex((img) => img === active.id);
      const newIndex = data.findIndex((img) => img === over?.id);
      onReorder(arrayMove(data, oldIndex, newIndex));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={data} strategy={horizontalListSortingStrategy}>
        <div
          style={{
            width: '100%',
            overflowX: 'auto',
            padding: '8px 0',
            boxSizing: 'border-box',
            maxWidth: '100%',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              flexDirection: 'row',
              gap: 16,
              minWidth: 'max-content',
              alignItems: 'center',
            }}
          >
            {data.length === 0 && (
              <div style={{ width: 100, height: 100, background: '#eee' }} />
            )}
            {data.map((image, idx) => (
              <SortableImage
                key={image}
                id={image}
                src={image}
                isCover={idx === 0}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default ImageDisplay;
