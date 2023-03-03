import { showNotification } from "@mantine/notifications";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { CloudinaryResponseType } from "../types";

const useUploadFiles = () => {
  const { t } = useTranslation();
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const uploadFiles = useCallback(
    async (files: File[], single?: boolean) => {
      try {
        setLoading(true);
        files.forEach(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "medipulse");
          const res = await fetch(
            process.env.NEXT_PUBLIC_CLOUDINARY_URL ?? "",
            {
              method: "POST",
              body: formData,
            }
          );
          const data = (await res.json()) as CloudinaryResponseType;
          setFileUrls(
            single ? [data.secure_url] : [...fileUrls, data.secure_url]
          );
          showNotification({
            title: t("file.upload.success"),
            message: "",
            color: "green",
          });
          setLoading(false);
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          showNotification({
            title: t("register.error"),
            message: t("register.error.file"),
            color: "red",
          });
          setLoading(false);
        }
      }
    },
    [t, fileUrls]
  );

  return [fileUrls, loading, uploadFiles] as const;
};

export default useUploadFiles;
