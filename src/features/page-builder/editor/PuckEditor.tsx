import { Puck } from "@puckeditor/core";
import "@puckeditor/core/dist/index.css";
import { config } from "../config/puckConfig";

interface Props {
  onPublish: (data: any) => void;
  initialData?: any;
}

export default function PageEditor({ onPublish, initialData }: Props) {
  return (
    <Puck
      config={config}
      data={initialData ?? { content: [] }}
      onPublish={(data) => {
        onPublish(data);
      }}
    />
  );
}