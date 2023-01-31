import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { multerFileFilter } from './multerFilters.utils';

export const multerOptions = (
  destination: string,
  allowAll = true,
): MulterOptions => {
  return {
    storage: diskStorage({
      destination,
      filename: (_, file, cb) => {
        const filename =
          `${file.originalname}-${Date.now()}` + extname(file.originalname);
        cb(null, filename);
      },
    }),
    fileFilter: multerFileFilter(allowAll),
  };
};
