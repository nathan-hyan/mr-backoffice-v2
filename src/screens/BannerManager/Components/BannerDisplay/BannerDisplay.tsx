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
}

function SortableImage({
  id,
  src,
  isPrimary,
}: {
  id: string;
  src: string;
  isPrimary: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        position: 'relative',
        marginRight: 16,
        cursor: 'grab',
      }}
    >
      <img src={src} alt='Banner' className={styles.image} />
      {isPrimary && (
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
          Principal
        </span>
      )}
    </div>
  );
}

function BannerImageDisplay({ data, onReorder = () => {} }: Props) {
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
            display: 'flex',
            flexDirection: 'row',
            gap: 16,
            overflowX: 'auto',
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
              isPrimary={idx === 0}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default BannerImageDisplay;
