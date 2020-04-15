export function editFileName(req: any, file: any, cb: Function): void {
  // const name = file.originalname.split('.')[0];
  cb(null, file.originalname);
}

export const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
