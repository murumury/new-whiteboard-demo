import Canvas from './components/Canvas';
import MousePosition from './components/MousePosition';
import MousesRenderer from './components/MousesRenderer';
import MoveImage from './components/MoveImage';
import SelectionBtns from './components/SelectionBtns';
import { RoomProvider, useOthers } from "@/liveblocks.config";
import { useUpdateMyPresence } from "@/liveblocks.config";
import LiveAvatars from "@/modules/room/modules/board/components/LiveAvatars";
import { useMemo } from "react";

function App() {
  const others = useOthers();
  const updateMyPresence = useUpdateMyPresence();

  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      onPointerMove={(e) =>
        updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })
      }
      onPointerLeave={() => updateMyPresence({ cursor: null })}
    >
      {others.map(({ connectionId, presence }) =>
        presence.cursor ? (
          <Cursor
            key={connectionId}
            x={presence.cursor.x}
            y={presence.cursor.y}
          />
        ) : null
      )}
    </div>
  );
}

// Basic cursor component
function Cursor({ x, y }: { x: number, y: number }) {
  return (
    <img
      style={{
        position: "absolute",
        transform: `translate(${x}px, ${y}px)`,
      }}
      src="https://liveblocks.io/images/cursor.svg"
    />
  );
}
const Board = () => (
  <><RoomProvider id="my-room-id" initialPresence={{ cursor: null }}>
    
      <App />
      <Canvas />
      <LiveAvatars />
   <MoveImage />
   <SelectionBtns />
  
  </RoomProvider>
   
  </>
);

export default Board;
