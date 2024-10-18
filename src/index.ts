import { SnapView } from 'src/SnapView';
import type { View } from 'src/View';

const snapView: SnapView = new SnapView();

export const snap: () => Promise<View> = () => snapView.snap();
