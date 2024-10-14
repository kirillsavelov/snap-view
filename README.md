# SnapView

SnapView is a lightweight yet powerful TypeScript library for capturing high-quality screenshots of visible web page content. SnapView simplifies capturing web page screenshots, making it quick and effortless to generate previews, save snapshots, or capture content exactly as it appears in the browser.

With just a few lines of code, you can capture any HTML content and retrieve it in multiple formats (canvas, blob, or data URL), making it easy to integrate into your existing workflows. SnapView takes care of the complexities, so you can focus on building.

## Features

- **Effortless Screenshot Capture**: Instantly capture high-quality screenshots of visible web content, exactly as it appears in the browser, with zero hassle.
- **Flexible Output Options**: Easily retrieve your screenshot as a canvas, blob, or data URL.
- **Multiple Image Formats**: Export your screenshots in PNG, JPEG, or WEBP formats.
- **Comprehensive Module Support**: Compatible with ESM and CommonJS modules, along with an IIFE format for direct browser usage, ensuring smooth integration across different environments and build systems.

## Installation

Install SnapView via npm:

```bash
npm install snap-view
```

> **Note:** SnapView is not published on npm or any public CDN

## Usage

SnapView is designed for simplicity. You don't need to create an instance of any class. Simply import the `snap` function and call it to capture a screenshot.

### Importing SnapView

Depending on your project setup, you can import SnapView in different ways:

#### ES Modules (ESM)

If you're using a bundler that supports ES modules:

```ts
import { snap } from 'snap-view';
```

#### CommonJS (CJS)

For projects using CommonJS modules:

```ts
const { snap } = require('snap-view');
```

#### Browser Global (IIFE)

If you're including SnapView directly in the browser without a module bundler, use the IIFE build. Include the script in your HTML:

```html
<script src="path/to/snap-view.iife.js"></script>
```

The `snap` function will be available on the global `SnapView` object:

```ts
const { snap } = SnapView;
```

### Capturing a Screenshot

Here's how to use SnapView to capture a screenshot:

```ts
import { snap } from 'snap-view';
import type { View } from 'snap-view';

const view: View = await snap();
```

### Retrieving a Screenshot

The `snap()` function returns a `View` object that provides methods to access the captured screenshot in various formats.

#### Get as Canvas

```ts
const canvas: HTMLCanvasElement = await view.getCanvas();
// You can now use the canvas element as needed
```

#### Get as Blob

```ts
const blob: Blob = await view.getBlob({
  type: 'image/png', // Optional, defaults to 'image/png'
  quality: 0.9       // Optional, for 'image/jpeg' or 'image/webp', between 0 and 1
});
// You can now use the blob, e.g., upload it or create an object URL
```

#### Get as Data URL

```ts
const dataUrl: string = await view.getDataURL({
  type: 'image/png', // Optional, defaults to 'image/png'
  quality: 0.8        // Optional, for 'image/jpeg' or 'image/webp', between 0 and 1
});
// You can now use the data URL, e.g., set it as the src of an <img> element
```

### Options

#### Image Formats

Specify the image format using the `type` option:

- `'image/png'` (default)
- `'image/jpeg'`
- `'image/webp'`

#### Quality

For `'image/jpeg'` and `'image/webp'` formats, specify the `quality` option (a number between 0 and 1).

## License

SnapView is released under the [MIT License](LICENSE).
