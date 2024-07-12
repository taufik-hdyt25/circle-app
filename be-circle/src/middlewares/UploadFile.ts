import * as multer from "multer";
import { NextFunction, Request, Response } from "express";

export const UploadFile = (fieldName: string) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
    },
  });

  const uploadFile = multer({ storage: storage });

  return (req: Request, res: Response, next: NextFunction) => {
    uploadFile.single(fieldName)(req, res, function (error: any) {
      if (error) {
        if (
          error instanceof multer.MulterError &&
          error.code === "LIMIT_UNEXPECTED_FILE"
        )
          return next();
        return res.status(400).json({ error });
      } else {
        if (req.file) {
          res.locals.filename = req.file.filename;
        }
        next();
      }
    });
  };
};
