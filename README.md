# SnapView

A lightweight TypeScript library that makes capturing high-quality screenshots of web page content effortless and
reliable.

## Features

- **Effortless Screenshot Capture**: Instantly capture high-quality screenshots of visible web content, exactly as it appears in the browser
- **Flexible Output Options**: Get your screenshots as canvas, blob, or data URL formats
- **Multiple Image Formats**: Export screenshots in PNG, JPEG, or WEBP formats with customizable quality
- **Comprehensive Module Support**: Works with ESM, CommonJS, and IIFE formats for maximum compatibility
- **Zero Dependencies**: Built with zero external dependencies

## Quick Start

1. Install the library:

```sh
npm install snap-view
```

2. Use the library:

```ts
import { snap } from 'snap-view';
import type { View } from 'snap-view';

// capture a screenshot
const view: View = await snap();

// export the screenshot in your preferred format
const canvas: HTMLCanvasElement = await view.getCanvas();
const blob: Blob = await view.getBlob();
const dataUrl: string = await view.getDataURL();
```

## Full Guide

### Installation

Choose your preferred installation way:

```sh
# npm
npm install snap-view

# pnpm
pnpm add snap-view

# yarn
yarn add snap-view
```

### Integration

Choose your preferred integration way:

```ts
// ESM
import { snap } from 'snap-view';

// CommonJS
const { snap } = require('snap-view');

// Browser Global
<script src="path/to/snap-view.iife.js"></script>
const { snap } = SnapView;
```

### Basic Usage

Capture a screenshot:

```ts
import { snap } from 'snap-view';
import type { View } from 'snap-view';

const view: View = await snap();
```

### Export Formats

Export the screenshot in your preferred format:

#### Canvas

```ts
const canvas: HTMLCanvasElement = await view.getCanvas();
```

#### Blob

```ts
// Basic usage
const blob: Blob = await view.getBlob();

// With options
const blob: Blob = await view.getBlob({
  type: 'image/png', // default
  // type: 'image/jpeg',
  // type: 'image/webp',
  quality: 0.9, // Value between 0 and 1
});
```

#### Data URL

```ts
// Basic usage
const dataUrl: string = await view.getDataURL();

// With options
const dataUrl: string = await view.getDataURL({
  type: 'image/png', // default
  // type: 'image/jpeg',
  // type: 'image/webp',
  quality: 0.9, // Value between 0 and 1
});
```

## License

SnapView is released under the [MIT License](LICENSE).
