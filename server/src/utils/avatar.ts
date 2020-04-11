import { v4 as uuid } from 'uuid';

export function editFileName(req, file, cb: Function) {
  // const name = file.originalname.split('.')[0];
  cb(null, file.originalname);
}
