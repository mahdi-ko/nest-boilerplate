import { BadRequestException } from '@nestjs/common';

export const multerFileFilter =
  (allowAll: boolean) => (req, file, callback) => {
    const regex = allowAll
      ? /\.(jpg|jpeg|png|webp|doc|docx|pdf|xls|xlsx|ppt|pptx|)$/
      : /\.(jpg|jpeg|png|webp)$/;
    if (!file.originalname.match(regex)) {
      return callback(
        new BadRequestException(
          `Only image files${
            allowAll ? ', pdf and microsoft office files' : ''
          } are allowed`,
        ),
        false,
      );
    }
    callback(null, true);
  };
