import { closestCenter, DndContext } from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import styles from './styles.module.scss';

interface BannerItem {
  url: string;
  tag: string;
}

interface Props {
  data: BannerItem[];
  onReorder?: (newOrder: BannerItem[]) => void;
  onDelete?: (url: string) => void;
}

function SortableImage({
  id,
  src,
  isPrimary,
  onDelete = () => {},
}: {
  id: string;
  src: string;
  isPrimary: boolean;
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
          ❌
        </button>
      )}
    </div>
  );
}

function BannerImageDisplay({
  data,
  onReorder = () => {},
  onDelete = () => {},
}: Props) {
  const handleDragEnd = (event: import('@dnd-kit/core').DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id && onReorder) {
      const oldIndex = data.findIndex((img) => img.url === active.id);
      const newIndex = data.findIndex((img) => img.url === over?.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        const updatedOrder = arrayMove(data, oldIndex, newIndex);
        onReorder(updatedOrder);
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={data.map((item) => item.url)}
        strategy={horizontalListSortingStrategy}
      >
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
              key={image.url}
              id={image.url}
              src={image.url}
              isPrimary={idx === 0}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export default BannerImageDisplay;
