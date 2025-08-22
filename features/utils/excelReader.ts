import * as XLSX from 'xlsx';
import * as path from 'path';
import { ATTACHMENT_FOLDER_PATH } from './pathconstant';

export function readExcelFile(fileName: string): any[] {
    const filePath = path.join(ATTACHMENT_FOLDER_PATH, fileName);
    const workbook = XLSX.readFile(filePath);

    const sheetName = workbook.SheetNames[0]; // Read first sheet
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        defval: '',   // keep empty cells as empty strings
        raw: false    // convert dates and numbers into formatted text
    });
    return jsonData; // Returns array of objects representing rows
}

