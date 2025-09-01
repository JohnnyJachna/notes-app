### Overview

This is a notes app website made using React, FastAPi, and Supabase. This is a five and half minute video of me presenting the project [https://www.youtube.com/watch?v=lMyWtbcXfvk](https://www.youtube.com/watch?v=lMyWtbcXfvk) 

### Background

I made this app for my final project at Build Carolina, where we needed to make a website that is either something fun or solves a problem. I focused on the problem solving aspect, while also making the website user-friendly, intuitive, and helpful. 

### Why

I chose to make a notes app because when writing papers in school that required lots of sources, my process was cumbersome and a bit frustrating. I would copy and paste sections of sources and write down notes to myself that said where the section came from and that it was copy and pasted. I would then eventually either summarize, paraphrase, or quote these sections. Next, I would note what I did to them, and then rearrange them by cutting and pasting the order of the sections into the order I wanted them in my paper. This process allowed me to organize my sources while avoiding plagiarism by noting where the sources came from and what status they were (summarized, etc.). Although this process helped me, constantly having to cut and paste the sections in a long google doc became cumbersome quickly, especially with all of the side notes and sources tied to each section. This notes app is designed to make my process of writing notes easier, while also including other quality of life features to make it easy to use for anyone.

### Features

* User accounts, each having their own sets  
* Sets which contain a set of notes, including their sources and tags.  
* Set preview displaying its name and when hovered, an edit and delete button. Editing allows for changing the name, and deleting is recursive, so all included notes, tags, and sources will be deleted  
* Notes previews, each containing a header, the content, tags, sources, and last edit date and time. Displayed in a dynamic grid, and includes a delete button when hovering  
* Note preview sizes which change the amount of visible note content. The dropdown includes small, medium, large, and full (displays all available content instead of truncating with a scrollbar)  
* Sort notes ascending or descending by either the header, number of tags or sources, last edit, create date, and a custom order  
* Filter notes by only displaying ones containing the selected source or tag  
* Note editor which appears as a modal when clicking on a note and allows editing each part of the note. A user can either save or discard the changes by clicking the x or anywhere off the note  
* Color editor for note, tags, and sources allow selecting from either a hex/rgb value, fifteen swatches, or a draggable color selector  
* Rich text editor for the note content and includes undo/redo, text size, lists, blockquote, code block, bold, italic, strike through, code, underline, highlight, links, subscript and superscript, left, center, right, and justify alignment. Includes shortcut keys  
* Tag and source adding to notes only shows available tags or sources from a dropdown, and each tag or source can be deleted individually by clicking on its x  
* Tag and source editor opened by a button and displayed in a drawer, with tags and sources separated by an accordion, allowing them to be collapsed and expanded as needed. Each editor allows for adding, editing, deleting, and sorting by their name alphabetically either ascending or descending  
* Tags can have their name and color changed  
* Sources can have their name, color, title, authors, publishers, pages, date published, date updated, and date accessed changed (all optional). Each editable part of the note uses normal text so any format can be used (ex: 9/1/2025 or September 1st, 2025, 101-250 or pg. 101 to pg. 250). The editor uses the same modal functionality as the notes  
* Note sources can be clicked on in the note editor and display all inputted information in a popup next to the relevant source  
* Custom sort toggle which will either open or close the drag and drop area (discarding changes). The button title changes from Custom Sort to Cancel when clicked  
* Drag and drop functionality for ordering the notes in a custom order which can be saved, and then displayed in the note preview section. The custom sort order can be selected from the sort options

### Tools

* Clerk for user accounts with its clerk themes addon for dark mode and clerk backend api on the backend  
* Tailwind for styling  
* Flowbite React for styled components. Used components: accordion, accordion content, accordion panel, accordion title, badge, button, button group, card, create theme, dark theme toggle, drawer, drawer header, drawer items, dropdown, dropdown item, footer, footer copyright, hr, label, modal, modal body, modal footer, modal header, navbar, navbar brand, navbar collapse, navbar link, navbar toggle, popover, spinner, text input, theme provider.  
* React Icons. Used icons: CgNotes, FaEdit, FaSortAmountDown, FaSortAmountUp, FaSortAmountUpAlt, IoIosColorFill, IoMdAddCircleOutline, IoMdPricetag, LuNotepadText, MdDeleteForever,   
* Tiptap for rich text editor (react, pm, starter-kit, extensions, filter handler, highlight, horizontal rule, list subscript, superscript, text align, typography)  
* Dnd kit for drag and drop functionality (core, helpers, modifiers, sortable)  
* Jotai for state management  
* FastApI and SQLModel for the backend, using Alembic for migrations  
* NH3 for html sanitization to safely store the html created by the rich text editor  
* Supabase for the database
