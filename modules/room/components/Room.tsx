import { useRoom } from '@/common/recoil/room';

import RoomContextProvider from '../context/Room.context';
import Board from '../modules/board';
import Chat from '../modules/chat';
import ToolBar from '../modules/toolbar';
import NameInput from './NameInput';
import UserList from './UserList';
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

const Room = () => {
  const room = useRoom();

  if (!room.id) return <NameInput />;

  return (
    
    
    <>
    <RoomProvider id="my-room-id" initialPresence={{ cursor: null }}>

    <RoomContextProvider >
      <div className="relative h-full w-full overflow-hidden">
        <ToolBar />
        <Board />
       <Chat />
       <LiveAvatars />
<App />
      </div>
      
    </RoomContextProvider>
    </RoomProvider >
    </>
  );
};

export default Room;
