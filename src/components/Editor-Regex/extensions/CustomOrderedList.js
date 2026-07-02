import {OrderedList } from "@tiptap/extension-ordered-list";



const CustomOrderedList = OrderedList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      listStyleType: {
        default: "decimal",
        parseHTML: (element) => element.style.listStyleType || "decimal",
        renderHTML: (attributes) => {
          if (!attributes.listStyleType) return {};
          return {
            style: `list-style-type: ${attributes.listStyleType}`,
          };
        },
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setOrderedStyle:
        (style) =>
        ({ editor, commands, chain }) => {
          
          if (editor.isActive("orderedList")) {
            return commands.updateAttributes("orderedList", {
              listStyleType: style,
            });
          }

          
          return chain()
            .toggleOrderedList()
            .updateAttributes("orderedList", { listStyleType: style })
            .run();
        },
    };
  },
});

export default CustomOrderedList;