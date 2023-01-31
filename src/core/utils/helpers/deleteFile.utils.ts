import fs from 'fs';
export const deleteFile = (filePath?: string) => {
  if (filePath)
    fs.unlink(`public${filePath}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
};
