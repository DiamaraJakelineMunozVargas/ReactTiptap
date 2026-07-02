import TextAlign from "@tiptap/extension-text-align";
import { useEffect, useRef } from "react";
import { useEditor } from "@tiptap/react";
import { Color } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import ResizeImage from "tiptap-extension-resize-image";
import CustomBulletList from "./extensions/CustomBulletList";
import { FontSize } from "@tiptap/extension-text-style";
import { UnderlineStyle } from "./extensions/Underline";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import DocumentEditor from "./DocumentEditor";
import { useReactToPrint } from "react-to-print";
import RibbonWord from "./RibbonWord/RibbonWord";
import AutoCorrect from "./extensions/AutoCorrect";
import CustomOrderedList from "./extensions/CustomOrderedList";

const EditorRegex = ({
  children,
  onSave,
  variables = [],
  initialContent = "",
  onChange,
  mostrarQR,
  qrValue
}) => {
  const editorTemplate = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList:false,
      }),
      TextStyle,
      FontFamily,
      FontSize,
      UnderlineStyle,
      AutoCorrect,
      CustomBulletList,
CustomOrderedList,
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

              editorTemplate
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
          editorTemplate.chain().focus().insertContent(html).run();

          return true;
        }

        const text = event.clipboardData.getData("text/plain");

        if (text) {
          const formattedText = text
            .split("\n")
            .map((line) => `<p>${line}</p>`)
            .join("");

          editorTemplate.chain().focus().insertContent(formattedText).run();

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
        <RibbonWord
          editor={editorTemplate}
          handleSave={handleSave}
          handlePrint={handlePrint}
          variables={variables}
        />
      </div>

      {children}

      <div ref={documentoRef} className="print-content-wrapper">
        <DocumentEditor editor={editorTemplate} mostrarQR={mostrarQR} qrValue={qrValue}/>
      </div>
    </div>
  );
};

export default EditorRegex;
