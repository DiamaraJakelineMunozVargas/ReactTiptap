import TextAlign from "@tiptap/extension-text-align";
import { useEffect, useRef } from "react";
import { useEditor } from "@tiptap/react";
import Wordtoolbar from "./Wordtoolbar";
import { Color } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import ResizeImage from "tiptap-extension-resize-image";
import FontSize from "./extensions/FontSize";
import { UnderlineStyle } from "./extensions/Underline";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import DocumentEditor from "./DocumentEditor";
import { useReactToPrint } from "react-to-print";

const EditorRegex = ({
  onSave,
  onPrint,
  variables = [],
  initialContent = "",
  onChange,
}) => {
  const editorTemplate = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      FontSize,
      UnderlineStyle,
      ResizeImage.extend({
        selectable: true,
        addAttributes() {
          return {
            ...this.parent?.(),
            style: {
              default: null,
              parseHTML: (element) => element.getAttribute("style"),
              renderHTML: (attributes) => {
                if (!attributes.style) return {};
                return { style: attributes.style };
              },
            },
          };
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Subscript,
      Superscript,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      handlePaste(view, event) {
        const items = event.clipboardData?.items;

        if (!items) return false;

        // IMAGENES
        for (const item of items) {
          if (item.type.startsWith("image")) {
            const file = item.getAsFile();

            const reader = new FileReader();

            reader.onload = () => {
              const src = reader.result;

              editor
                .chain()
                .focus()
                .setImage({ src })
                .updateAttributes("image", { style: "float: none;" })
                .run();
            };

            reader.readAsDataURL(file);

            return true;
          }
        }

        const html = event.clipboardData.getData("text/html");

        if (html) {
          editor.chain().focus().insertContent(html).run();

          return true;
        }

        const text = event.clipboardData.getData("text/plain");

        if (text) {
          const formattedText = text
            .split("\n")
            .map((line) => `<p>${line}</p>`)
            .join("");

          editor.chain().focus().insertContent(formattedText).run();

          return true;
        }

        return false;
      },
    },
  });
  const handleSave = () => {
    if (editorTemplate) {
      onSave?.(editorTemplate.getHTML());
    }
  };
  const documentoRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: documentoRef,
    documentTitle: "documento",
  });

  useEffect(() => {
    if (editorTemplate && initialContent && !editorTemplate.isFocused) {
      editorTemplate.commands.setContent(initialContent);
    }
  }, [editorTemplate, initialContent]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-300">
        <Wordtoolbar
          editor={editorTemplate}
          handleSave={handleSave}
          handlePrint={onPrint || handlePrint}
          variables={variables}
        />
      </div>

      <div ref={documentoRef} className="print-content-wrapper">
        <DocumentEditor editor={editorTemplate} />
      </div>
    </div>
  );
};

export default EditorRegex;
