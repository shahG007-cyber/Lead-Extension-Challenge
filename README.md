# Leads Tracker

Leads Tracker is a small browser extension for saving and keeping track of useful leads and websites. Add a lead by entering text or save the URL of the active browser tab. Your leads are stored in the browser, so they remain available when you reopen the app.

## Features

- Save a lead from the text field with **Save Input**.
- Save the active tab's URL with **Save Tab**.
- See the total number of saved leads and up to five leads in the list.
- Clear the saved leads with **Delete All Leads**.
- Start with sample leads on first use; deleting them leaves the list empty.

## Run locally

You need [Node.js](https://nodejs.org/) and npm installed.

1. Open a terminal in the project directory.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the Vite development server:

   ```sh
   npm run dev
   ```

4. Open the local URL printed by Vite in your browser.

When running as a regular web page, **Save Tab** saves the page currently open in the app. To save the URL of another active tab, load the project as an extension instead.

## Load as a Chrome extension

1. Open `chrome://extensions` in Chrome and enable **Developer mode**.
2. Select **Load unpacked**.
3. Choose this project's folder (the folder containing `manifest.json`).
4. Open the Leads Tracker extension from the toolbar.

The extension needs the `tabs` permission to read the active tab's URL. Saved leads use the browser's local storage and are specific to the browser profile.
