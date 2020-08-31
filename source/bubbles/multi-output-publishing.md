# Multi Output Publishing

Just markdown files in a linked structure. Special indecies are used to denote what is published. a `package.json` or shell file keeps script definitions used to build or publish files. Personal site may execute a script to pull in a `yaml` manifest, walk down the list of files, marry it with a template, run it through pandoc and spit out a set of `.gmi` files in one directory, `.html` files in another, and `.gopher` files in another. Github webhooks can be set up to pick up on changes to those directories or branches.

Simultaneous publishing across and for various networks

- Github Pages
  - Personal Foam guide or GH Pages hosted version of the personal site
- Netlify
- Vercel
- Gemini server
- Gopher server
