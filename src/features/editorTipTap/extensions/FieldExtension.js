import { Node, mergeAttributes } from "@tiptap/core";

const Field = Node.create({
    name: "field",

    group: "inline",
    inline: true,

    content: "text*",

    parseHTML() {
        return [{ tag: "span[data-field]" }];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "span",
            mergeAttributes(HTMLAttributes, {
                "data-field": "",
                class: "doc-field",
            }),
            0,
        ];
    },
});

export default Field;