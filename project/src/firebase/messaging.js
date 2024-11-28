import { getMessaging } from 'firebase/messaging';
import app from './config';

export const messaging = getMessaging(app);