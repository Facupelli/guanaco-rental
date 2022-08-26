import { useState } from "react";
import { supabase } from "../lib/supabase";

export const useDownloadBlob = () => {
  const [blob, setBlob] = useState();

  const downloadDni = async (name) => {
    try {
      const { data, error } = await supabase.storage
        .from("users-dni")
        .download(`${name}`);
      const blobUrl = URL.createObjectURL(data);
      setBlob(blobUrl);
    } catch (e) {
      console.log(e);
    }
  };

  return {blob, setBlob, downloadDni}
};
