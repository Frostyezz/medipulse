import React, { useEffect } from "react";
import { Dropzone, IMAGE_MIME_TYPE, DropzoneProps } from "@mantine/dropzone";
import { PhotoUp } from "tabler-icons-react";
import useUploadFiles from "@/common/hooks/useUploadFiles";
import { useTranslation } from "react-i18next";
import { showNotification } from "@mantine/notifications";
import { Avatar } from "@mantine/core";

const AvatarUpload: React.FC<
  Partial<DropzoneProps> & { onUpload: (value: string) => void; value?: string }
> = ({ onUpload, ...props }) => {
  const [fileUrls, loading, uploadFiles] = useUploadFiles();
  const { t } = useTranslation();

  useEffect(() => {
    onUpload(fileUrls[0]);
  }, [fileUrls]);

  return (
    <Dropzone
      onDrop={(files) => uploadFiles(files, true)}
      onReject={() =>
        showNotification({
          title: t("register.error"),
          message: t("createProfile.medic.error.avatar"),
          color: "red",
        })
      }
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      loading={loading}
      sx={{
        borderRadius: "100%",
        width: "100px",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...props}
    >
      <Dropzone.Idle>
        {fileUrls.length || props?.value ? (
          <Avatar
            src={fileUrls.length ? fileUrls[0] : (props?.value as string) ?? ""}
            alt="Avatar"
            sx={{ width: "100px", height: "100px", borderRadius: "100%" }}
          />
        ) : (
          <PhotoUp
            width={50}
            height={50}
            style={{ marginTop: "5px", color: "#cdd4dc" }}
          />
        )}
      </Dropzone.Idle>
      <Dropzone.Accept>
        <Avatar
          src={fileUrls.length ? fileUrls[0] : (props?.value as string) ?? ""}
          alt="Avatar"
          sx={{ width: "100px", height: "100px", borderRadius: "100%" }}
        />
      </Dropzone.Accept>
    </Dropzone>
  );
};

export default AvatarUpload;
