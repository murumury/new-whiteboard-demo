import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey: "pk_dev_hOTwqTN41EgLUARNXZpwmL_lTHpvMgALTk3V9ZaIuCzihzxs29ejisqsWOw_3lWw",
  
});

type Presence = {
  cursor: { x: number; y: number } | null;
};
type Storage = {
  // animals: LiveList<string>,
  // ...
};
type UserMeta = {
  info: {
    name: string;
    color: [string, string];
    picture?: string;
  };
};
export const { RoomProvider, useOthers,useUpdateMyPresence,useOthersMapped, useSelf } = createRoomContext<Presence,Storage,
UserMeta>(client);