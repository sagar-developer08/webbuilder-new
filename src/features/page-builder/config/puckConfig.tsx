import type { Config } from "@puckeditor/core";
import { withResize } from "../blocks/withResize";

// Layout blocks
import { SectionBlock } from "../blocks/SectionBlock";
import { ContainerBlock } from "../blocks/ContainerBlock";
import { TwoColumnBlock } from "../blocks/TwoColumnBlock";
import { ThreeColumnBlock } from "../blocks/ThreeColumnBlock";
import { TwoRowBlock } from "../blocks/TwoRowBlock";
import { ThreeRowBlock } from "../blocks/ThreeRowBlock";
import { Header2ColBlock } from "../blocks/Header2ColBlock";
import { TwoColFooterBlock } from "../blocks/TwoColFooterBlock";
import { Sidebar2RowBlock } from "../blocks/Sidebar2RowBlock";
import { Grid2x2Block } from "../blocks/Grid2x2Block";
import { Layout1Block } from "../blocks/Layout1Block";
import { Layout2Block } from "../blocks/Layout2Block";
import { Layout3Block } from "../blocks/Layout3Block";
import { Layout4Block } from "../blocks/Layout4Block";
import { Layout5Block } from "../blocks/Layout5Block";
import { Layout6Block } from "../blocks/Layout6Block";
import { Layout7Block } from "../blocks/Layout7Block";
import { Layout8Block } from "../blocks/Layout8Block";

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
import { PageLink } from "../blocks/PageLink";

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

// Chart blocks
import { BarChartBlock } from "../blocks/BarChartBlock";
import { DoughnutChartBlock } from "../blocks/DoughnutChartBlock";
import { AreaChartBlock } from "../blocks/AreaChartBlock";

export const config: Config = {
  components: {
    // Layout
    Section: withResize(SectionBlock),
    Container: withResize(ContainerBlock),
    TwoColumn: withResize(TwoColumnBlock),
    ThreeColumn: withResize(ThreeColumnBlock),
    TwoRow: withResize(TwoRowBlock),
    ThreeRow: withResize(ThreeRowBlock),
    Header2Col: withResize(Header2ColBlock),
    TwoColFooter: withResize(TwoColFooterBlock),
    Sidebar2Row: withResize(Sidebar2RowBlock),
    Grid2x2: withResize(Grid2x2Block),
    Layout1: withResize(Layout1Block),
    Layout2: withResize(Layout2Block),
    Layout3: withResize(Layout3Block),
    Layout4: withResize(Layout4Block),
    Layout5: withResize(Layout5Block),
    Layout6: withResize(Layout6Block),
    Layout7: withResize(Layout7Block),
    Layout8: withResize(Layout8Block),

    // Text
    Heading1: withResize(Heading1Block),
    Heading2: withResize(Heading2Block),
    Heading3: withResize(Heading3Block),
    Heading4: withResize(Heading4Block),
    Heading5: withResize(Heading5Block),
    Heading6: withResize(Heading6Block),
    Paragraph: withResize(ParagraphBlock),
    Span: withResize(SpanBlock),

    // Basic
    Button: withResize(ButtonBlock),
    Image: withResize(ImageBlock),

    // Media
    Video: withResize(VideoBlock),
    Audio: withResize(AudioBlock),
    Marquee: withResize(MarqueeBlock),
    Icon: withResize(IconBlock),
    Embed: withResize(EmbedBlock),

    // Link
    Link: withResize(LinkBlock),
    PageLink: PageLink,

    // Form
    Form: withResize(FormBlock),
    Input: withResize(InputBlock),
    Textarea: withResize(TextareaBlock),
    Select: withResize(SelectBlock),
    Checkbox: withResize(CheckboxBlock),
    Radio: withResize(RadioBlock),
    SubmitButton: withResize(SubmitButtonBlock),

    // Content
    OrderedList: withResize(OrderedListBlock),
    UnorderedList: withResize(UnorderedListBlock),
    ListItem: withResize(ListItemBlock),
    Blockquote: withResize(BlockquoteBlock),
    Code: withResize(CodeBlock),
    Divider: withResize(DividerBlock),
    Badge: withResize(BadgeBlock),
    Spacer: withResize(SpacerBlock),
    Table: withResize(TableBlock),
    Accordion: withResize(AccordionBlock),
    Tabs: withResize(TabsBlock),
    Card: withResize(CardBlock),

    // Charts
    BarChart: withResize(BarChartBlock),
    DoughnutChart: withResize(DoughnutChartBlock),
    AreaChart: withResize(AreaChartBlock),
  },
  categories: {
    Layout: {
      components: [
        "Section", "Container", "TwoColumn", "ThreeColumn",
        "TwoRow", "ThreeRow", "Header2Col", "TwoColFooter",
        "Sidebar2Row", "Grid2x2",
        "Layout1", "Layout2", "Layout3", "Layout4",
        "Layout5", "Layout6", "Layout7", "Layout8",
      ],
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
      components: ["Link", "PageLink"],
    },
    Form: {
      components: ["Form", "Input", "Textarea", "Select", "Checkbox", "Radio", "SubmitButton"],
    },
    Content: {
      components: ["OrderedList", "UnorderedList", "ListItem", "Blockquote", "Code", "Divider", "Badge", "Spacer", "Table", "Accordion", "Tabs", "Card"],
    },
    Charts: {
      components: ["BarChart", "DoughnutChart", "AreaChart"],
    },
  },
};
