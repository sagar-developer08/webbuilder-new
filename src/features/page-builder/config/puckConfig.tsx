import type { Config } from "@puckeditor/core";
import { withResize } from "../blocks/withResize";
import { withAnimation } from "../animations";

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
import { NavbarBlock } from "../blocks/NavbarBlock";

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
    Section: withAnimation(withResize(SectionBlock)),
    Container: withAnimation(withResize(ContainerBlock)),
    TwoColumn: withAnimation(withResize(TwoColumnBlock)),
    ThreeColumn: withAnimation(withResize(ThreeColumnBlock)),
    TwoRow: withAnimation(withResize(TwoRowBlock)),
    ThreeRow: withAnimation(withResize(ThreeRowBlock)),
    Header2Col: withAnimation(withResize(Header2ColBlock)),
    TwoColFooter: withAnimation(withResize(TwoColFooterBlock)),
    Sidebar2Row: withAnimation(withResize(Sidebar2RowBlock)),
    Grid2x2: withAnimation(withResize(Grid2x2Block)),
    Navbar: withAnimation(NavbarBlock),
    Layout1: withAnimation(withResize(Layout1Block)),
    Layout2: withAnimation(withResize(Layout2Block)),
    Layout3: withAnimation(withResize(Layout3Block)),
    Layout4: withAnimation(withResize(Layout4Block)),
    Layout5: withAnimation(withResize(Layout5Block)),
    Layout6: withAnimation(withResize(Layout6Block)),
    Layout7: withAnimation(withResize(Layout7Block)),
    Layout8: withAnimation(withResize(Layout8Block)),

    // Text
    Heading1: withAnimation(withResize(Heading1Block)),
    Heading2: withAnimation(withResize(Heading2Block)),
    Heading3: withAnimation(withResize(Heading3Block)),
    Heading4: withAnimation(withResize(Heading4Block)),
    Heading5: withAnimation(withResize(Heading5Block)),
    Heading6: withAnimation(withResize(Heading6Block)),
    Paragraph: withAnimation(withResize(ParagraphBlock)),
    Span: withAnimation(withResize(SpanBlock)),

    // Basic
    Button: withAnimation(withResize(ButtonBlock)),
    Image: withAnimation(withResize(ImageBlock)),

    // Media
    Video: withAnimation(withResize(VideoBlock)),
    Audio: withAnimation(withResize(AudioBlock)),
    Marquee: withAnimation(withResize(MarqueeBlock)),
    Icon: withAnimation(withResize(IconBlock)),
    Embed: withAnimation(withResize(EmbedBlock)),

    // Link
    Link: withAnimation(withResize(LinkBlock)),
    PageLink: withAnimation(PageLink),

    // Form
    Form: withAnimation(withResize(FormBlock)),
    Input: withAnimation(withResize(InputBlock)),
    Textarea: withAnimation(withResize(TextareaBlock)),
    Select: withAnimation(withResize(SelectBlock)),
    Checkbox: withAnimation(withResize(CheckboxBlock)),
    Radio: withAnimation(withResize(RadioBlock)),
    SubmitButton: withAnimation(withResize(SubmitButtonBlock)),

    // Content
    OrderedList: withAnimation(withResize(OrderedListBlock)),
    UnorderedList: withAnimation(withResize(UnorderedListBlock)),
    ListItem: withAnimation(withResize(ListItemBlock)),
    Blockquote: withAnimation(withResize(BlockquoteBlock)),
    Code: withAnimation(withResize(CodeBlock)),
    Divider: withAnimation(withResize(DividerBlock)),
    Badge: withAnimation(withResize(BadgeBlock)),
    Spacer: withAnimation(withResize(SpacerBlock)),
    Table: withAnimation(withResize(TableBlock)),
    Accordion: withAnimation(withResize(AccordionBlock)),
    Tabs: withAnimation(withResize(TabsBlock)),
    Card: withAnimation(withResize(CardBlock)),

    // Charts
    BarChart: withAnimation(withResize(BarChartBlock)),
    DoughnutChart: withAnimation(withResize(DoughnutChartBlock)),
    AreaChart: withAnimation(withResize(AreaChartBlock)),
  },
  categories: {
    Layout: {
      components: [
        "Section", "Container", "TwoColumn", "ThreeColumn",
        "TwoRow", "ThreeRow", "Header2Col", "TwoColFooter",
        "Sidebar2Row", "Grid2x2", "Navbar",
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
