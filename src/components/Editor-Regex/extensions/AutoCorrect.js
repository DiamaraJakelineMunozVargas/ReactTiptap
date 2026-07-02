import { Extension } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";

const AutoCorrect = Extension.create({
  name: "autoCorrect",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handleTextInput(view, from, to, text) {
            console.log(text);
            return false;
          },
        },
      }),
    ];
  },
});

export default AutoCorrect;
