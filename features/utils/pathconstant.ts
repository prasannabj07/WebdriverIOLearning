import * as path from 'path';

// Absolute path to attachments folder (for file uploads)
export const ATTACHMENT_FOLDER_PATH = path.join(process.cwd(), 'features', 'Resources', 'Attachment');
export const DOWNLOAD_FOLDER_PATH = path.resolve(__dirname, '..', 'downloads');