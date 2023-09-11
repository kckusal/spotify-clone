"use client";

import { useUploadModal } from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import uniqId from "uniqid";
import { Button } from "./Button";
import { Input } from "./Input";
import { Modal } from "./Modal";

export const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();
  const supabase = useSupabaseClient();
  const { isOpen, onClose } = useUploadModal();
  const router = useRouter();

  const { register, handleSubmit, reset, trigger, formState } =
    useForm<FieldValues>({
      defaultValues: {
        author: "",
        title: "",
        song: null,
        image: null,
      },
      mode: "onBlur",
      reValidateMode: "onBlur",
    });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        return toast.error("Missing fields!");
      }

      const uniqueId = uniqId();

      // upload song
      const { data: songData, error: songError } = await supabase.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("Failed to upload song.");
      }

      // upload image
      const { data: imageData, error: imageError } = await supabase.storage
        .from("images")
        .upload(`image-${values.title}-${uniqueId}`, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) {
        setIsLoading(false);
        return toast.error("Failed to upload image.");
      }

      const { error } = await supabase.from("songs").insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path,
      });

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song created!");
      reset();
      onClose();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file..."
      isOpen={isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={(e) => {
          handleSubmit(onSubmit, (errors) => {
            console.error({ errors });
          })(e);
        }}
        className="flex flex-col gap-y-4"
      >
        <div>
          <Input
            id="title"
            disabled={isLoading}
            {...register("title", {
              required: "Title is required",
              onChange: () => {
                if (formState.errors.title) {
                  trigger("title");
                }
              },
            })}
            placeholder="Song title"
          />
          {formState.errors?.title?.type === "required" && (
            <p role="alert" className="text-sm text-red-400 p-1">
              Title is required
            </p>
          )}
        </div>

        <div>
          <Input
            id="author"
            disabled={isLoading}
            {...register("author", {
              required: "Author is required",
              onChange: () => {
                if (formState.errors.author) {
                  trigger("author");
                }
              },
            })}
            placeholder="Song author"
          />
          {formState.errors?.author?.type === "required" && (
            <p role="alert" className="text-sm text-red-400 p-1">
              Author is required
            </p>
          )}
        </div>

        <div>
          <div className="pb-1">Select a song file</div>

          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", {
              required: "Song is required",
              onChange: () => {
                if (formState.errors.song) {
                  trigger("song");
                }
              },
            })}
          />

          {formState.errors?.song?.type === "required" && (
            <p role="alert" className="text-sm text-red-400 p-1">
              Song is required
            </p>
          )}
        </div>

        <div>
          <div className="pb-1">Select an image</div>

          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: "Image is required" })}
          />
        </div>

        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};
