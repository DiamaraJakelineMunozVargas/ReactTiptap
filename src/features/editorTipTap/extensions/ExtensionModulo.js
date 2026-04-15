import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import FormModulo from "../templates/FormModulo";

export default Node.create({
    name: "formModulo",
    group: "block",
    content: "block",
    atom: false,
    isolating: true,
    selectable: false,
    draggable: false,
    addAttributes() {
        return {
            paciente: { default: '' },
            edad: { default: '' },
            diagnostico: { default: '' },
            prescripcion: { default: '' },
        };
    },
    addKeyboardShortcuts() {
        return {

            Backspace: () => {

                return true;
            },
            // Bloqueamos la tecla de suprimir
            Delete: () => {
                return true;
            },
        };
    },

    parseHTML() {
        return [{ tag: "div[data-form-modulo]" }];
    },

    renderHTML({ HTMLAttributes }) {
        return ["div", { ...HTMLAttributes, "data-form-modulo": "" }, 0];
    },

    addNodeView() {
        return ReactNodeViewRenderer(FormModulo);
    },
});