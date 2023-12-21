# Shades! The Browser Overlay Extension
<img src="https://github.com/tal-z/OverlayExtension/blob/main/EnvironmentOverlayExtension/icons/shades_nobg.png"/>


## What's up with Shades?
Shades is a Chrome browser extension that allows users to configure and apply semi-opaque overlays on their browser tabs. This can be useful for web developers who are working on applications where development occurs in multiple environments.

## What's in the Toolbox?
- **Customizable Options**: Easily add and configure overlays ("shades") with different colors, that you can easily apply to your browser tabs.
- **Persistent Configuration**: The extension remembers the overlay configuration for each tab, even as you navigate to new pages.
- **Intuitive Popup Interface**: Use the popup to apply or remove overlays with a single click.

## Installation
1. Download the extension files.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the downloaded extension folder.

## Usage
1. Click on the Shades extension icon in the Chrome toolbar.
2. Use the popup interface to apply or remove overlays.
3. Configure new overlay shades in the extension settings, following a link from the popup.

## Under the Hood
- **manifest.json**: Defines the extension metadata and settings.
- **content.js**: Injected into the active tab, handles communication from the popup to apply/remove overlay colors, and updates localstorage with the browser overlay state.
- **background.js**: Single-function: sends the active tab's tabId back to the content script (content.js).
- **popup.html**: The HTML file for the popup interface.
- **popup.js**: The JavaScript file handling the popup's functionality.
- **options.html**: The HTML file for extension settings.
- **options.js**: Manages the configuration of overlay buttons on the options page and in localstorage.
- **popup.css**, **options.css**: Stylesheets for the popup and settings pages.

## Contributing
Feel free to contribute to the development of Shades by opening issues or pull requests on the [GitHub repository](https://github.com/tal-z/OverlayExtension).

## License

This project is licensed under the [MIT License](LICENSE).
