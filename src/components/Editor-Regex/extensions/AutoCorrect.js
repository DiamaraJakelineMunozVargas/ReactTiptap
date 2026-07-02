import { Extension } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";

const AutoCorrect = Extension.create({
  name: "autoCorrect",

  addProseMirrorPlugins() {
    function isInsideList($from) {
      for (let i = 0; i <= $from.depth; i++) {
        const type = $from.node(i).type.name;

        if (type === "bulletList" || type === "orderedList") {
          return true;
        }
      }

      return false;
    }
    return [
      new Plugin({
        props: {
          handleTextInput(view, from, to, text) {
            const { selection } = view.state;
            const isLowerCase =
              text === text.toLowerCase() && text !== text.toUpperCase();
            console.log(selection.$from.parentOffset); //la cantidad del cursor que avanza
            console.log(isInsideList(selection.$from));
            if (
              isInsideList(selection.$from) &&
              selection.$from.parentOffset === 0 &&
              isLowerCase
            ) {
              view.dispatch(
                view.state.tr.insertText(text.toUpperCase(), from, to),
              );

              return true;
            }
            return false;
          },
        },
      }),
    ];
  },
});

export default AutoCorrect;
