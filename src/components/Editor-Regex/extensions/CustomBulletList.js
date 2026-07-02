import { BulletList } from "@tiptap/extension-bullet-list";

const CustomBulletList = BulletList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      listStyleType: {
        default: "disc",
        parseHTML: (element) => element.style.listStyleType || "disc",
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
      setBulletStyle:
        (style) =>
        ({ editor, commands, chain }) => {
          
          if (editor.isActive("bulletList")) {
            return commands.updateAttributes("bulletList", {
              listStyleType: style,
            });
          }

          
          return chain()
            .toggleBulletList()
            .updateAttributes("bulletList", { listStyleType: style })
            .run();
        },
    };
  },
});

export default CustomBulletList;