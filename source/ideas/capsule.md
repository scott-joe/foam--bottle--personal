# Capsule

> The capsule is what takes you there and lets you walk among the heavens

## The Hook

> Life outside the Web.

- Show how others track you, help people understand what the language is of their surveillance (what does Telemtry mean?).

## Reader

- Gemini style text documents with additional payload information about the document outline, size, author, publish date, copyright, etc.
- Any open source e-reader could arrive at this page, save it (be it article or book), and track it the way you would anything else. DRM-free documents. Pay for the book, lend the book. When you lend the book, you no longer have access until they return it. You can request the book back using the app/email. They can in turn share it as well, but it requires permission from the original person first. Can original purchaser revoke access? Metadata would include purchaser and current viewer.
- Make this process as similar to the physical book experience as possible. Except your notes are kept with your device, not with the content. Those notes are overlaid onto the content when it's back in your control.
- Hifi tech, lofi delivery. E-Ink preferred receipents -> audio capable.
- Most of the features of Pocket, but without ads. I don't need to support an enormous dev team. I just want to funnel my content back into something I'd enjoy reading it on. Operates as a lofi content source with built-in text-to-speech
- What if Foam simply managed your various knowledge stores? If it was a subdir without .git on itself, but on it's subdirectories? Then it could manage and map infinite stores of information that you could simply clone in and wire up to extend your network. You could even publish specific sub-stores and access them all together, but they'd version separately. Perhaps add some auto "push to wherever this needs to go" functionality.
  - Add another `bottle` with some command like `foam add bottle ______` to add it to the set of managed projects if we're using some sort of repository of bottles like Homebrew.
  - It could do a sort of watch on that workspace tree and auto-commit changes at an interval, perform uniform Prettier/Linting changes, linking/indexing/etc. At your workspace level. The commits look at each Bottle's `.git` directory and apply `.gitconfig` if present. Somehow tell the editor to use any present Prettier/Linting configs in those Bottles. Also, may need config around auto-save-auto-push (ASAP) auto-pull-auto-merge (APAM) if it's in a shared library. If your code editor prompted you to make changes to a specific piece of documentation based on correlating filenames or other declarations, that could be super helpful in making sure documentation is up to date. 
  - That workspace stuff comes in at the Foam level with possible overrides lower in the tree for some settings.

## Editor / Writing

- Add Grammarly support for writing
- Add other features like the AI shortening/summary development.
- Swap between WISIWIG editor for notes and full text editor with preview for serious creations.
- Publish to gemini for reading in Gemini-like browser and CapsuleReader. Publish HTML version to the Web.
