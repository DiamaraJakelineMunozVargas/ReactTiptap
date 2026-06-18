import TextAlign from "@tiptap/extension-text-align";
import { useState, useEffect } from "react";
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


const EditorRegex = ({ onSave, onPrint, variables = [], initialContent = "", onChange }) => {

  const [activeEditor, setActiveEditor] = useState(null);
  const [textoHtml, setTextoHtml] = useState(initialContent);



  const editorTemplate = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      FontSize,
      UnderlineStyle,
      ResizeImage,
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

      const html = editor.getHTML();

      setTextoHtml(html);

      onChange?.(html);
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

              editor.chain().focus().setImage({ src }).run();
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
    onSave?.(textoHtml);
  };

  useEffect(() => {
    if (editorTemplate && initialContent) {
      editorTemplate.commands.setContent(initialContent);
    }
  }, [editorTemplate, initialContent]);

  return (
    <div className="min-h-screen bg-gray-100">


      <div className="sticky top-0 z-10 bg-white border-b border-gray-300">
        <Wordtoolbar
          editor={activeEditor || editorTemplate}
          handleSave={handleSave}
          handlePrint={onPrint}
          variables={variables}
        />
      </div>

      <DocumentEditor
        editor={editorTemplate}
        setActiveEditor={setActiveEditor}
      />
    </div>
  );
};

export default EditorRegex;
