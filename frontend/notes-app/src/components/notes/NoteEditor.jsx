import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai/react";
import { updateNoteAtom } from "./NotesAtoms";

import styles from "../css-modules/NoteEditor.module.css";
import NoteTags from "./NoteTags";
import Button from "../Button";

const NoteEditor = ({ noteAtom, handleCloseEditor }) => {
  const note = useAtomValue(noteAtom);
  const updateNote = useSetAtom(updateNoteAtom);

  const [header, setHeader] = useState(note.header);
  const [content, setContent] = useState(note.content);

  const handleClick = async () => {
    let updatedNote = note;

    if (header !== note.header || content !== note.content) {
      console.log("true");
      updatedNote = {
        ...note,
        update_date: new Date().toLocaleString(),
      };

      if (header !== note.header) {
        updatedNote = {
          ...updatedNote,
          header: header,
        };
      }
      if (content !== note.content) {
        updatedNote = {
          ...updatedNote,
          content: content,
        };
      }
      console.log("updated note: " + updatedNote);
      await updateNote(updatedNote);
    }
    handleCloseEditor();
  };

  return (
    <div className={styles.editor}>
      <textarea
        id="Header"
        placeholder="Header..."
        value={header}
        onChange={(e) => setHeader(e.target.value)}
      ></textarea>
      <textarea
        id="Content"
        placeholder="Content..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <Button type="button" name="Done" onClick={handleClick} />
    </div>
  );
};

//   const [header, setHeader] = useState(note.header);
//   const [content, setContent] = useState(note.content);
//   const [noteTags, setNoteTags] = useState(note.tags);
//   // const [noteSources, setNoteSources] = useState(note.sources);
//   const [addableTags, setAddableTags] = useState([]);
//   const [tagSelection, setTagSelection] = useState();
//   const [tagsAvailable, setTagsAvailable] = useState(false);

//   const { makeRequest } = useAPI();

//   useEffect(() => {
//     const addable = tagList.filter(
//       (option) => !noteTags.some((noteTag) => noteTag.id === option.id)
//     );

//     if (addable && addable.length > 0) {
//       setTagsAvailable(true);
//       setAddableTags(addable);
//       setTagSelection(addable[0].id);
//     } else {
//       setAddableTags([]);
//       setTagsAvailable(false);
//     }
//   }, [noteTags]);

//   const addTag = async () => {
//     try {
//       await makeRequest(
//         `sets/${note.set_id}/notes/${note.id}/tags/${tagSelection}`,
//         {
//           method: "POST",
//           body: tagSelection,
//         }
//       );
//       const addedTag = tagList.find((tag) => tag.id == tagSelection);
//       setNoteTags([...noteTags, addedTag]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const removeTag = async (id) => {
//     try {
//       await makeRequest(`sets/${note.set_id}/notes/${note.id}/tags/${id}`, {
//         method: "DELETE",
//         body: tagSelection,
//       });
//       setNoteTags(noteTags.filter((tag) => tag.id !== id));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateData = async (date) => {
//     const body = {
//       id: note.id,
//       update_date: date,
//     };

//     if (header !== note.header) {
//       body.header = header;
//     }
//     if (content !== note.content) {
//       body.content = content;
//     }

//     try {
//       await makeRequest(`sets/${note.set_id}/notes`, {
//         method: "PATCH",
//         body: JSON.stringify(body),
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleClick = () => {
//     const updatedNote = {
//       header: header,
//       content: content,
//       update_date: note.update_date,
//       tags: noteTags,
//       // sources: noteSources,
//     };

//     if (header !== note.header || content !== note.content) {
//       updatedNote.update_date = new Date().toLocaleString();
//       updateData(updatedNote.update_date);
//     }

//     closeEditor(updatedNote);
//   };

//   return (
//     <div className={styles.editor}>
//       <textarea
//         id="Header"
//         placeholder="Header..."
//         value={header}
//         onChange={(e) => setHeader(e.target.value)}
//       ></textarea>
//       <textarea
//         id="Content"
//         placeholder="Content..."
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       ></textarea>
//       <NoteTags tags={noteTags} editable={true} removeTag={removeTag} />
//       <>
//         {tagsAvailable ? (
//           <>
//             <select
//               value={tagSelection}
//               onChange={(e) => setTagSelection(e.target.value)}
//             >
//               {addableTags.map((tag) => (
//                 <option key={tag.id} value={tag.id}>
//                   {tag.name}
//                 </option>
//               ))}
//             </select>
//             <Button type="button" name="Add" onClick={addTag} />
//           </>
//         ) : (
//           <p>Click edit to add a tag</p>
//         )}
//       </>
//       <Button type="button" name="Done" onClick={handleClick} />
//     </div>
//   );
// };

export default NoteEditor;
