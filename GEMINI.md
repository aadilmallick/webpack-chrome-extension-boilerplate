# Chrome extension boilerplate

The boilerplate uses a modern web development stack:
- **Framework**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Bundler**: Webpack

## Core Chrome Extension Concepts

The project is structured around the primary components of a Chrome Extension:

1.  **Manifest (`src/static/manifest.json`)**: The most important file. It's the entry point for the extension, defining its name, version, permissions, and pointers to all other components (background script, popup, content scripts, etc.).

2.  **Background Script (`src/background/background.ts`)**: This is the extension's event handler and service worker. It runs in the background, independent of any web page, and manages the extension's state and logic. It listens for browser events (like a tab update, an alarm firing, or a message from another script) and coordinates actions across the extension. This boilerplate uses a controller pattern within the `src/background/controllers/` directory to keep the background logic organized.

3.  **Popup (`src/popup/popup.tsx`)**: The user interface (UI) that appears when a user clicks the extension's icon in the Chrome toolbar. It's a React component used for primary user interaction. Its corresponding HTML template is in `src/webpack-html-templates/popup.html`.

4.  **Options Page (`src/options/options.tsx`)**: A dedicated, full-tab page for users to configure the extension's settings. It's a React component that provides more space for complex configurations than the popup.

5.  **Content Script (`src/contentScript/contentScript.tsx`)**: A script injected directly into the context of web pages. It can read and manipulate the DOM, pass information to its parent extension, and render React components directly onto the page to modify its appearance or functionality.

6.  **Offscreen Document (`src/offscreen/offscreen.tsx`)**: A hidden HTML page bundled with the extension. Its purpose is to use DOM APIs that are not available in service workers, such as playing audio or interacting with the clipboard.

## Detailed File Structure

Here is a breakdown of the key files and directories:

```
/
├───.gitignore
├───package.json            # Defines dependencies, and npm scripts (e.g., `npm run build`)
├───postcss.config.js       # PostCSS configuration (used by Tailwind CSS)
├───tailwind.config.js      # Tailwind CSS configuration
├───tsconfig.json           # TypeScript compiler configuration
├───webpack.common.js       # Common Webpack configuration for bundling
├───webpack.dev.js          # Development-specific Webpack configuration
├───webpack.prod.js         # Production-specific Webpack configuration
├───.github/workflows/      # CI/CD workflows (e.g., for building a release .zip)
└───src/                    # Main application source code
    ├───background/
    │   ├───background.ts   # Main service worker entry point
    │   └───controllers/    # Organizes background logic by concern (alarms, storage, etc.)
    ├───chrome-api/         # IMPORTANT: Typed wrappers for the `chrome.*` APIs. Use these for type-safe, consistent access to browser APIs.
    ├───contentScript/
    │   └───contentScript.tsx # Injected into web pages
    ├───offscreen/
    │   └───offscreen.tsx   # Offscreen document for DOM-related background tasks
    ├───options/
    │   └───options.tsx     # The extension's options page UI
    ├───popup/
    │   └───popup.tsx       # The extension's popup UI
    ├───shadcn/             # shadcn/ui components and utilities for the UI
    ├───static/
    │   ├───icon.png
    │   └───manifest.json   # CRITICAL: The extension manifest file
    ├───styles/             # Global CSS files
    ├───utils/              # Reusable helper functions and classes
    │   ├───assorted-vanillajs/ # General purpose vanilla JS/TS helpers
    │   └───web-components/ # Custom Web Components, useful for injecting encapsulated UI into content scripts
    └───webpack-html-templates/
        └───popup.html      # HTML template for the popup, processed by Webpack
```

### Key Architectural Patterns

- **Typed Chrome API Wrappers (`src/chrome-api/`)**: Instead of calling `chrome.tabs.query(...)` directly, this boilerplate encourages using pre-defined, typed functions from the `src/chrome-api/` directory. This is a major feature that improves code quality and developer experience. **Always prefer using these wrappers.**

- **Controller Pattern (`src/background/controllers/`)**: The background script's logic is not monolithic. It's broken down into "controllers," each responsible for a specific domain (e.g., `storage.ts` handles all interactions with `chrome.storage`). This makes the background script easier to manage.

- **React for UI**: All user-facing components (Popup, Options, and even UI injected by Content Scripts) are built with React, enabling modern, component-based UI development.

- **Webpack for Bundling**: Webpack is configured to handle TypeScript compilation, React JSX, CSS processing (Tailwind), and bundling of all the different entry points (background, popup, content scripts) into a format the browser can run.

## Development Workflow

To work with this project, you will typically use scripts defined in `package.json`. you should also add the appropriate permissions and resources in the `static/manifest.json`.

- `npm run dev` or a similar command will likely start a development server that watches for file changes and rebuilds the extension automatically.
- `npm run build` will create a production-ready, optimized build of the extension in a `dist` or `build` folder, which can then be loaded into Chrome or packaged for the Chrome Web Store.
