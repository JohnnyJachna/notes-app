// src/Tiptap.tsx
import { useEditor, EditorContent, useEditorState  } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { UndoRedoButton } from '@/components/tiptap-ui/undo-redo-button'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from '@/components/tiptap-ui-primitive/toolbar'
import { Button } from '@/components/tiptap-ui-primitive/button'
import { Spacer } from '@/components/tiptap-ui-primitive/spacer'
import { BoldIcon } from '@/components/tiptap-icons/bold-icon'
import { ItalicIcon } from '@/components/tiptap-icons/italic-icon'

const TextEditor = () => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit], // define your extension array
    content: '<p>Note Content...</p>', // initial content
  })

  const editorState = useEditorState({
      editor,

      // the selector function is used to select the state you want to react to
      selector: ({ editor }) => {
        if (!editor) return null;

        return {
          isEditable: editor.isEditable,
          currentSelection: editor.state.selection,
          currentContent: editor.getJSON(),
          // you can add more state properties here e.g.:
          // isBold: editor.isActive('bold'),
          // isItalic: editor.isActive('italic'),
        };
      },
    });

  return (
    <>
     <Toolbar variant="default">
      <ToolbarGroup>
        <Button data-style="ghost">
          <BoldIcon className="tiptap-button-icon" />
        </Button>
        <Button data-style="ghost">
          <ItalicIcon className="tiptap-button-icon" />
        </Button>
        <UndoRedoButton
        editor={editor}
        action="undo"
        text="Undo"
        hideWhenUnavailable={true}
        showShortcut={true}
        onExecuted={() => console.log('Action executed!')}
      />
      <UndoRedoButton
        editor={editor}
        action="redo"
        text="Redo"
        hideWhenUnavailable={true}
        showShortcut={true}
        onExecuted={() => console.log('Action executed!')}
      />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <Button data-style="ghost">Format</Button>
      </ToolbarGroup>

      <Spacer />

      <ToolbarGroup>
        <Button data-style="primary">Save</Button>
      </ToolbarGroup>
    </Toolbar>
      <EditorContent editor={editor} />
    </>
  )
}

export default TextEditor