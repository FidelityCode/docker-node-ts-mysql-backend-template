// Import necessary types from express
import { Express, Request, Response, NextFunction } from 'express';
import db from '../database'; // Adjust the import path based on your project structure

// Type definition for the row structure returned by the database query
interface VersionRow {
  version: string;
}

export default function setupRoutes(app: Express) {
  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    db.raw('SELECT VERSION() as version')
  .then((result) => {
    // Accessing the result correctly depends on the structure of the returned data
    // The structure can vary based on the database driver or ORM you're using
    let versionRow;
    if (Array.isArray(result)) {
      // For some configurations, the actual result is in the first element of the array
      versionRow = result[0][0]; // Adjust based on your result structure
    } else {
      // Directly accessing the result if it's not an array
      versionRow = result[0];
    }

    if (versionRow) {
      res.json({ message: `Hello from MySQL ${versionRow.version}` });
    } else {
      throw new Error('No version information found');
    }
  })
  .catch(next);

  });
}
