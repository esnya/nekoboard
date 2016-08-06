import { createAction } from 'redux-actions';

export const DRAWER = 'UI/DRAWER';
export const drawer = createAction(DRAWER, 'open');
export const openDrawer = createAction(DRAWER, () => true);
export const closeDrawer = createAction(DRAWER, () => false);
