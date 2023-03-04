import React, { useEffect, useRef } from "react";
import { Text, Group, Button, createStyles } from "@mantine/core";
import { Dropzone, MIME_TYPES, DropzoneProps } from "@mantine/dropzone";
import { CloudUpload, X, Download } from "tabler-icons-react";
import { useTranslation } from "react-i18next";
import useUploadFiles from "@/common/hooks/useUploadFiles";
import { showNotification } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    marginBottom: "30px",
  },

  dropzone: {
    borderWidth: "1px",
    paddingBottom: "50px",
  },

  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  control: {
    position: "absolute",
    width: "250px",
    left: `calc(50% - 125px)`,
    bottom: "-20px",
    zIndex: 999999,
  },
}));

interface DropzoneButtonProps {
  onUpload: (value: string) => void;
  title: string;
  subtitle: string;
}

const DropzoneButton: React.FC<
  Partial<DropzoneProps> & DropzoneButtonProps
> = ({ onUpload, title, subtitle, ...props }) => {
  const { classes, theme } = useStyles();
  const openRef = useRef<() => void>(null);
  const { t } = useTranslation();
  const [fileUrls, loading, uploadFiles] = useUploadFiles();

  useEffect(() => {
    onUpload(fileUrls[0]);
  }, [fileUrls]);

  return (
    <div className={classes.wrapper}>
      <Dropzone
        loading={loading}
        openRef={openRef}
        onDrop={(files) => uploadFiles(files, true)}
        onReject={() =>
          showNotification({
            title: t("register.error"),
            message: t("createProfile.medic.errorUpload.proof"),
            color: "red",
          })
        }
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.pdf]}
        maxSize={30 * 1024 ** 2}
        {...props}
      >
        <div style={{ pointerEvents: "none" }}>
          <Group position="center">
            <Dropzone.Accept>
              <Download
                width={50}
                height={50}
                color={theme.colors[theme.primaryColor][6]}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <X width={50} height={50} color={theme.colors.red[6]} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <CloudUpload
                width={50}
                height={50}
                color={
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black
                }
              />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>{title}</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            {subtitle}
          </Text>
        </div>
      </Dropzone>

      <Button
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current?.()}
      >
        {t("createProfile.button.proof")}
      </Button>
    </div>
  );
};

export default DropzoneButton;
