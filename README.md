# StreetEasyAgain

TLDR: StreetEasy Sucks. It won't tell me if I already reached out to someone.

## from my other project
A few basics on the project.

I've decided that VITE is a starting point for building the project, as eventually we may want to add packages (or even preact) to the extension.

At the very least, it should make it somewhat easy to manage bulding the extension, now that the hard work of figuring out how the silly builds work.

To get started all you need to do is

1. yarn install
2. run yarn watch (this runs build in watch mode)
3. import the extension into your chrome browser
   a. chrome://extension
   b. (enabled developer mode)
   c. load unpacked - select the dist directory

The way the project is structured we have

1. manifest.json

This is what tells chrome what to do with the extension. It's how we request permissions as well. Entrypoints for the chrome extension are defined here.

2. index.html

This is the popover that you see when you click on the extension. Note, everything is vanilla TS, no UI frameworks are setup, so this will
probably be pretty ugly to start!

3. background.ts

This is the background-worker that is run on every webpage visted by the chrome extension. Right now it adds a right click menu.

## Notes

Any TS file you add to the src directory will automatically get picked up as somethign to compile to .js in the distribution directory!
