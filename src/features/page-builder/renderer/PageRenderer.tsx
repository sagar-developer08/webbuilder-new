import { Render } from "@puckeditor/core";
import { config } from "../config/puckConfig";

interface Props {
  data: any;
}

export default function PageRenderer({ data }: Props) {
  return <Render config={config} data={data} />;
}