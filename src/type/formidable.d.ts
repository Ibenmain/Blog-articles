declare module 'formidable' {
    import { IncomingMessage } from 'http';
  
    interface Fields {
      [key: string]: any;
    }
  
    interface File {
      filepath: string;
      originalFilename?: string;
      mimetype?: string;
      size: number;
      newFilename: string;
    }
  
    interface Files {
      [key: string]: File;
    }
  
    interface FormidableError extends Error {
      httpCode?: number;
    }
  
    class IncomingForm {
      parse(
        req: IncomingMessage,
        callback: (err: FormidableError | null, fields: Fields, files: Files) => void
      ): void;
    }
  
    export = IncomingForm;
  }
  