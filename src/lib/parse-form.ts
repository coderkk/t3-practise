import type { NextApiRequest } from "next";
import mime from "mime";
import { join } from "path";
import * as dateFn from "date-fns";
import formidable from "formidable";
import { mkdir, stat } from "fs/promises";

export const FormidableError: typeof formidable.errors.FormidableError =
  formidable.errors.FormidableError;

interface FormFields {
  [fieldName: string]: string | string[];
}

interface FormFiles {
  [fieldName: string]: formidable.File[];
}

export const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files}> => {
  const uploadDir = join(
    process.env.ROOT_DIR || process.cwd(),
    `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`
  );

  try {
    await stat(uploadDir);
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      throw e;
    }
  }

  const form = formidable({
    maxFiles: 10,
    maxFileSize: 1024 * 1024 * 10, // 10mb
    uploadDir,
    filename: (_name: string, _ext: string, part: formidable.Part) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const filename = `${part.name || "unknown"}-${uniqueSuffix}.${
        mime.getExtension(part.mimetype || "") || "unknown"
      }`;
      return filename;
    },
    filter: (part: formidable.Part) => {
      return (
        part.name === "media" && (part.mimetype?.includes("image") || false)
      );
    },
  });

  const { fields, files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    form.parse(req, (err: Error | null, fields: formidable.Fields, files: formidable.Files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });

  return { fields, files };
};
