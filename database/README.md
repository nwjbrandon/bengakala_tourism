## Database Migrations Setup

### Install dependencies \#
- Install node libraries
```
npm install
```

### Migrate Database \#
- Ensure that MySQL service is running (!important)
```
npm run up
```

### To import SQL dump \#
- Request the dump from us or create your own
```
mysql -u bengkala -p bengkala < <file_name>.sql
```

### To create SQL dump
```
mysqldump -u bengkala -p bengkala > <file_name>.sql
```

### Usage
- To create a new migration script
```
npm run create <migration_script_name>
```
- To include the new or all of the migration script in the database
```
npm run up
```
- To fallback to the previous migration script
```
npm run down
```

### Tables Structure
The database contains three tables - TRANSACTIONS, INFORMATION, EXCLUDED_DATES, and ADMINISTRATORS. 
<br />
<br />
A more detail description can be found in the repo/back-end/src/storage/tableName.js
- ADMINISTRATORS
    - Information of authorized users to the dashboard pages to edit content on website
- TRANSACTIONS
    - Information of the visitors who want to visit the village (pay by cash or through midtrans)
- EXCLUDED_DATES
    - Information of the dates to exclud from calendar so that visitors cannot book 
- INFORMATION
    - All other information of the stories, pictures, etc


### Reference
- https://db-migrate.readthedocs.io/en/latest/
