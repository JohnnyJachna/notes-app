import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Button } from "flowbite-react";
import { MarkButton } from "@/components/tiptap-ui/mark-button";

const NoteContentEditor = ({ content, setContent }) => {
  const editor = useEditor({
    // immediatelyRender: false,
    // shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class:
          "prose prose-sm dark:prose-invert max-w-none min-h-[160px] focus:outline-none",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
    ],
    content: content || "<p></p>",
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
  });

  // Sync when switching notes (avoid clobbering while typing)
  useEffect(() => {
    if (!editor) return;
    if (content && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  if (!editor)
    return <div className="text-sm text-gray-500">Loading editor…</div>;

  const cmd = () => editor.chain().focus();

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        <MarkButton type="bold" />
        <Button
          size="xs"
          color={editor.isActive("bold") ? "editorActive" : "editor"}
          onClick={() => cmd().toggleBold().run()}
        >
          B
        </Button>
        <Button
          size="xs"
          color={editor.isActive("italic") ? "editorActive" : "editor"}
          onClick={() => cmd().toggleItalic().run()}
        >
          I
        </Button>
        <Button
          size="xs"
          color={editor.isActive("underline") ? "editorActive" : "editor"}
          onClick={() => cmd().toggleUnderline().run()}
        >
          U
        </Button>
        <Button
          size="xs"
          color={editor.isActive("strike") ? "editorActive" : "editor"}
          onClick={() => cmd().toggleStrike().run()}
        >
          S
        </Button>
        <Button
          size="xs"
          color={editor.isActive("bulletList") ? "editorActive" : "editor"}
          onClick={() => cmd().toggleBulletList().run()}
        >
          • •
        </Button>
        <Button
          size="xs"
          color={editor.isActive("orderedList") ? "editorActive" : "editor"}
          onClick={() => cmd().toggleOrderedList().run()}
        >
          1.
        </Button>
        <Button
          size="xs"
          color={editor.isActive("blockquote") ? "dark" : "light"}
          onClick={() => cmd().toggleBlockquote().run()}
        >
          &ldquo;
        </Button>
        <Button
          size="xs"
          color="editor"
          onClick={() => {
            const url = prompt("Link URL");
            if (url) cmd().setLink({ href: url }).run();
          }}
        >
          Link
        </Button>
        <Button
          size="xs"
          color="failure"
          onClick={() => cmd().unsetLink().run()}
        >
          Unlink
        </Button>
        <Button
          size="xs"
          color={editor.isActive("blockquote") ? "dark" : "light"}
          onClick={() => cmd().toggleCodeBlock().run()}
        >
          {"</>"}
        </Button>
        <Button size="xs" color="editor" onClick={() => cmd().undo().run()}>
          Undo
        </Button>
        <Button size="xs" color="editor" onClick={() => cmd().redo().run()}>
          Redo
        </Button>
      </div>
      <div className="rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-3">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default NoteContentEditor;
