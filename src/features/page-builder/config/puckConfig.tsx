import type { Config } from "@puckeditor/core";

import { SectionBlock } from "../blocks/SectionBlock";
import { ContainerBlock } from "../blocks/ContainerBlock";
import { TwoColumnBlock } from "../blocks/TwoColumnBlock";
import { HeadingBlock } from "../blocks/HeadingBlock";
import { ParagraphBlock } from "../blocks/ParagraphBlock";
import { ButtonBlock } from "../blocks/ButtonBlock";
import { ImageBlock } from "../blocks/ImageBlock";

export const config: Config = {
  components: {
    Section: SectionBlock,
    Container: ContainerBlock,
    TwoColumn: TwoColumnBlock,
    Heading: HeadingBlock,
    Paragraph: ParagraphBlock,
    Button: ButtonBlock,
    Image: ImageBlock,
  },
};