import type { Config } from "@puckeditor/core";

// Layout blocks
import { SectionBlock } from "../blocks/SectionBlock";
import { ContainerBlock } from "../blocks/ContainerBlock";
import { TwoColumnBlock } from "../blocks/TwoColumnBlock";

// Text blocks
import { Heading1Block } from "../blocks/Heading1Block";
import { Heading2Block } from "../blocks/Heading2Block";
import { Heading3Block } from "../blocks/Heading3Block";
import { Heading4Block } from "../blocks/Heading4Block";
import { Heading5Block } from "../blocks/Heading5Block";
import { Heading6Block } from "../blocks/Heading6Block";
import { ParagraphBlock } from "../blocks/ParagraphBlock";
import { SpanBlock } from "../blocks/SpanBlock";

// Basic blocks
import { ButtonBlock } from "../blocks/ButtonBlock";
import { ImageBlock } from "../blocks/ImageBlock";

// Media blocks
import { VideoBlock } from "../blocks/VideoBlock";
import { AudioBlock } from "../blocks/AudioBlock";
import { MarqueeBlock } from "../blocks/MarqueeBlock";
import { IconBlock } from "../blocks/IconBlock";
import { EmbedBlock } from "../blocks/EmbedBlock";

// Link blocks
import { LinkBlock } from "../blocks/LinkBlock";

// Form blocks
import { FormBlock } from "../blocks/FormBlock";
import { InputBlock } from "../blocks/InputBlock";
import { TextareaBlock } from "../blocks/TextareaBlock";
import { SelectBlock } from "../blocks/SelectBlock";
import { CheckboxBlock } from "../blocks/CheckboxBlock";
import { RadioBlock } from "../blocks/RadioBlock";
import { SubmitButtonBlock } from "../blocks/SubmitButtonBlock";

// Content blocks
import { OrderedListBlock } from "../blocks/OrderedListBlock";
import { UnorderedListBlock } from "../blocks/UnorderedListBlock";
import { ListItemBlock } from "../blocks/ListItemBlock";
import { BlockquoteBlock } from "../blocks/BlockquoteBlock";
import { CodeBlock } from "../blocks/CodeBlock";
import { DividerBlock } from "../blocks/DividerBlock";
import { BadgeBlock } from "../blocks/BadgeBlock";
import { SpacerBlock } from "../blocks/SpacerBlock";
import { TableBlock } from "../blocks/TableBlock";
import { AccordionBlock } from "../blocks/AccordionBlock";
import { TabsBlock } from "../blocks/TabsBlock";
import { CardBlock } from "../blocks/CardBlock";

export const config: Config = {
  components: {
    // Layout
    Section: SectionBlock,
    Container: ContainerBlock,
    TwoColumn: TwoColumnBlock,

    // Text
    Heading1: Heading1Block,
    Heading2: Heading2Block,
    Heading3: Heading3Block,
    Heading4: Heading4Block,
    Heading5: Heading5Block,
    Heading6: Heading6Block,
    Paragraph: ParagraphBlock,
    Span: SpanBlock,

    // Basic
    Button: ButtonBlock,
    Image: ImageBlock,

    // Media
    Video: VideoBlock,
    Audio: AudioBlock,
    Marquee: MarqueeBlock,
    Icon: IconBlock,
    Embed: EmbedBlock,

    // Link
    Link: LinkBlock,

    // Form
    Form: FormBlock,
    Input: InputBlock,
    Textarea: TextareaBlock,
    Select: SelectBlock,
    Checkbox: CheckboxBlock,
    Radio: RadioBlock,
    SubmitButton: SubmitButtonBlock,

    // Content
    OrderedList: OrderedListBlock,
    UnorderedList: UnorderedListBlock,
    ListItem: ListItemBlock,
    Blockquote: BlockquoteBlock,
    Code: CodeBlock,
    Divider: DividerBlock,
    Badge: BadgeBlock,
    Spacer: SpacerBlock,
    Table: TableBlock,
    Accordion: AccordionBlock,
    Tabs: TabsBlock,
    Card: CardBlock,
  },
  categories: {
    Layout: {
      components: ["Section", "Container", "TwoColumn"],
    },
    Text: {
      components: ["Heading1", "Heading2", "Heading3", "Heading4", "Heading5", "Heading6", "Paragraph", "Span"],
    },
    Basic: {
      components: ["Button", "Image"],
    },
    Media: {
      components: ["Video", "Audio", "Marquee", "Icon", "Embed"],
    },
    Link: {
      components: ["Link"],
    },
    Form: {
      components: ["Form", "Input", "Textarea", "Select", "Checkbox", "Radio", "SubmitButton"],
    },
    Content: {
      components: ["OrderedList", "UnorderedList", "ListItem", "Blockquote", "Code", "Divider", "Badge", "Spacer", "Table", "Accordion", "Tabs", "Card"],
    },
  },
};
