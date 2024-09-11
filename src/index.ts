import { SnapView } from '@/SnapView';
import { View } from '@/View';

const snapView: SnapView = new SnapView();

window.addEventListener('load', async (event: Event): Promise<void> => {
  const view: View = await snapView.snap();
  const canvas: HTMLCanvasElement = await view.getCanvas();
  const blob: Blob = await view.getBlob();
  const dataURL: string = await view.getDataURL();

  document.getElementById('output')!.appendChild(canvas);
});
