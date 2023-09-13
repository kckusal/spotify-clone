"use client";

import { useAuthModal } from "@/hooks/useAuthModal";
import { useOnPlay } from "@/hooks/useOnPlay";
import { useSubscribeModal } from "@/hooks/useSubscribeModal";
import { useUploadModal } from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { FC } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import { MediaItem } from "./MediaItem";

interface Props {
  songs: Song[];
}
export const Library: FC<Props> = ({ songs }) => {
  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();
  const uploadModal = useUploadModal();
  const { user, subscription } = useUser();

  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      authModal.onOpen();
      return;
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" />
          <p className="text-neutral-400 font-medium ">Your Library</p>
        </div>

        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((song) => (
          <MediaItem
            key={song.id}
            onClick={() => onPlay(song.id)}
            data={song}
          />
        ))}
      </div>
    </div>
  );
};
