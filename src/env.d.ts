declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_AIRTABLE_API_KEY: string;
      REACT_APP_AIRTABLE_BASE_ID: string;
      REACT_APP_AIRTABLE_TABLE_ID: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
