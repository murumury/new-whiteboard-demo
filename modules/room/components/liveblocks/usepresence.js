import { RoomProvider, useOthers } from "./liveblocks.config";

function App() {
  const others = useOthers();

  return <div>There are {others.length} other users with you in the room.</div>;
}

function Index() {
  return (
    <RoomProvider id="my-room-id" initialPresence={{}}>
      <App />
    </RoomProvider>
  );
}