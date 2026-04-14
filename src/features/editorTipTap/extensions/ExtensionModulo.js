import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import FormModulo from "../templates/FormModulo";

export default Node.create({
    name: "formModulo",

    group: "block",

    atom: true,
    isolating: true,
    selectable: false,
    draggable: false,

    addKeyboardShortcuts() {
        return {
            Backspace: ({ editor }) => {
                const { state } = editor.view;
                const { selection } = state;

                const $from = selection.$from;

                // ecorrer todos los niveles
                for (let i = $from.depth; i > 0; i--) {
                    const node = $from.node(i);

                    if (node.type.name === "formModulo") {
                        return true; // bloquea borrado
                    }
                }

                return false;
            },

            Delete: ({ editor }) => {
                const { state } = editor.view;
                const { selection } = state;

                const $from = selection.$from;

                for (let i = $from.depth; i > 0; i--) {
                    const node = $from.node(i);

                    if (node.type.name === "formModulo") {
                        return true;
                    }
                }

                return false;
            },
        };
    },

    parseHTML() {
        return [{ tag: "div[data-form-modulo]" }];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            "div",
            {
                ...HTMLAttributes,
                "data-form-modulo": "",
            },
            0,
        ];
    },

    addNodeView() {
        return ReactNodeViewRenderer(FormModulo);
    },
});