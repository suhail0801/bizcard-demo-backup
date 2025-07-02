# Migration Guide: Using `onfra/bizcard` Instead of `bizcard-demo`

This guide explains all the changes and steps required to migrate from the original `bizcard-demo` (GitHub clone) to the updated `onfra/bizcard` project. It is intended for users who already have `bizcard-demo` and want to use the improved and maintained version in `onfra/bizcard`.

---

## 1. Project Structure and Usage Changes

- The updated project is now located at `onfra/bizcard`.
- **You only need to use the `onfra/bizcard` project.** There is no need to run both the backend and frontend from `bizcard-demo`.
- **Use the `newBackend` directory** inside `onfra/bizcard` for all backend operations. Do not use the old `backend` directory.
- The frontend is integrated and works with the new backend. All development and deployment should be done from `onfra/bizcard`.
- **You can run all commands from the root of `onfra/bizcard`**; you do not need to enter the `newBackend` or `frontend` folders separately to start the application.

---

## 2. Database Setup

The application requires a MySQL database named `bizcard` with the following tables and structures. If your tables are missing any columns, use the provided SQL commands to update them.

### Required Tables and Their Structures

#### `users`
```sql
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS isActive tinyint(1) DEFAULT 1,
ADD COLUMN IF NOT EXISTS businessCode varchar(255) UNIQUE,
ADD COLUMN IF NOT EXISTS jobTitle varchar(255),
ADD COLUMN IF NOT EXISTS businessName varchar(255),
ADD COLUMN IF NOT EXISTS profilePhoto varchar(255),
ADD COLUMN IF NOT EXISTS mobile varchar(32);
```
| Field        | Type         | Null | Key | Default | Extra          |
|--------------|--------------|------|-----|---------|----------------|
| id           | int          | NO   | PRI | NULL    | auto_increment |
| username     | varchar(255) | NO   |     | NULL    |                |
| email        | varchar(255) | NO   | UNI | NULL    |                |
| password     | varchar(255) | NO   |     | NULL    |                |
| isActive     | tinyint(1)   | YES  |     | 1       |                |
| businessCode | varchar(255) | YES  | UNI | NULL    |                |
| createdAt    | datetime     | NO   |     | NULL    |                |
| updatedAt    | datetime     | NO   |     | NULL    |                |
| jobTitle     | varchar(255) | YES  |     | NULL    |                |
| businessName | varchar(255) | YES  |     | NULL    |                |
| profilePhoto | varchar(255) | YES  |     | NULL    |                |
| mobile       | varchar(32)  | YES  |     | NULL    |                |

#### `contacts`
```sql
ALTER TABLE contacts 
ADD COLUMN IF NOT EXISTS contactUserId int,
ADD COLUMN IF NOT EXISTS contactName varchar(255),
ADD COLUMN IF NOT EXISTS contactEmail varchar(255),
ADD COLUMN IF NOT EXISTS contactPhone varchar(255),
ADD COLUMN IF NOT EXISTS contactCardId int,
ADD COLUMN IF NOT EXISTS addedAt datetime,
ADD COLUMN IF NOT EXISTS sharedBack tinyint(1) DEFAULT 0,
ADD COLUMN IF NOT EXISTS notes varchar(255),
ADD COLUMN IF NOT EXISTS jobTitle varchar(255),
ADD COLUMN IF NOT EXISTS businessName varchar(255),
ADD COLUMN IF NOT EXISTS savedBy varchar(255);
```
| Field         | Type         | Null | Key | Default | Extra          |
|---------------|--------------|------|-----|---------|----------------|
| id            | int          | NO   | PRI | NULL    | auto_increment |
| userId        | int          | NO   |     | NULL    |                |
| contactUserId | int          | YES  |     | NULL    |                |
| contactName   | varchar(255) | YES  |     | NULL    |                |
| contactEmail  | varchar(255) | YES  |     | NULL    |                |
| contactPhone  | varchar(255) | YES  |     | NULL    |                |
| contactCardId | int          | YES  |     | NULL    |                |
| addedAt       | datetime     | YES  |     | NULL    |                |
| sharedBack    | tinyint(1)   | YES  |     | 0       |                |
| notes         | varchar(255) | YES  |     | NULL    |                |
| createdAt     | datetime     | NO   |     | NULL    |                |
| updatedAt     | datetime     | NO   |     | NULL    |                |
| jobTitle      | varchar(255) | YES  |     | NULL    |                |
| businessName  | varchar(255) | YES  |     | NULL    |                |
| savedBy       | varchar(255) | YES  |     | NULL    |                |

#### `savedcards`
```sql
ALTER TABLE savedcards 
ADD COLUMN IF NOT EXISTS title varchar(255),
ADD COLUMN IF NOT EXISTS config json,
ADD COLUMN IF NOT EXISTS jobTitle varchar(255),
ADD COLUMN IF NOT EXISTS mobile varchar(255),
ADD COLUMN IF NOT EXISTS businessName varchar(255),
ADD COLUMN IF NOT EXISTS profilePhoto varchar(255),
ADD COLUMN IF NOT EXISTS logo varchar(255),
ADD COLUMN IF NOT EXISTS coverPhoto varchar(255),
ADD COLUMN IF NOT EXISTS primaryBackgroundColor varchar(255),
ADD COLUMN IF NOT EXISTS secondaryBackgroundColor varchar(255),
ADD COLUMN IF NOT EXISTS textColor varchar(255),
ADD COLUMN IF NOT EXISTS titleColor varchar(255),
ADD COLUMN IF NOT EXISTS primaryActions json,
ADD COLUMN IF NOT EXISTS secondaryActions json,
ADD COLUMN IF NOT EXISTS featuredContent json,
ADD COLUMN IF NOT EXISTS userId int;
```
| Field                    | Type         | Null | Key | Default | Extra          |
|--------------------------|--------------|------|-----|---------|----------------|
| id                       | int          | NO   | PRI | NULL    | auto_increment |
| title                    | varchar(255) | YES  |     | NULL    |                |
| config                   | json         | YES  |     | NULL    |                |
| firstName                | varchar(255) | NO   |     | NULL    |                |
| lastName                 | varchar(255) | NO   |     | NULL    |                |
| jobTitle                 | varchar(255) | YES  |     | NULL    |                |
| mobile                   | varchar(255) | YES  |     | NULL    |                |
| email                    | varchar(255) | YES  |     | NULL    |                |
| businessName             | varchar(255) | YES  |     | NULL    |                |
| profilePhoto             | varchar(255) | YES  |     | NULL    |                |
| logo                     | varchar(255) | YES  |     | NULL    |                |
| coverPhoto               | varchar(255) | YES  |     | NULL    |                |
| primaryBackgroundColor   | varchar(255) | YES  |     | NULL    |                |
| secondaryBackgroundColor | varchar(255) | YES  |     | NULL    |                |
| textColor                | varchar(255) | YES  |     | NULL    |                |
| titleColor               | varchar(255) | YES  |     | NULL    |                |
| primaryActions           | json         | YES  |     | NULL    |                |
| secondaryActions         | json         | YES  |     | NULL    |                |
| featuredContent          | json         | YES  |     | NULL    |                |
| createdAt                | datetime     | NO   |     | NULL    |                |
| updatedAt                | datetime     | NO   |     | NULL    |                |
| userId                   | int          | YES  | MUL | NULL    |                |

#### `cardtemplates`
```sql
ALTER TABLE cardtemplates 
ADD COLUMN IF NOT EXISTS desc varchar(255),
ADD COLUMN IF NOT EXISTS htmlPreview text,
ADD COLUMN IF NOT EXISTS htmlData json,
ADD COLUMN IF NOT EXISTS isActive tinyint(1) DEFAULT 1;
```
| Field       | Type         | Null | Key | Default | Extra          |
|-------------|--------------|------|-----|---------|----------------|
| id          | int          | NO   | PRI | NULL    | auto_increment |
| name        | varchar(255) | NO   |     | NULL    |                |
| desc        | varchar(255) | YES  |     | NULL    |                |
| htmlPreview | text         | YES  |     | NULL    |                |
| htmlData    | json         | YES  |     | NULL    |                |
| isActive    | tinyint(1)   | YES  |     | 1       |                |
| createdAt   | datetime     | NO   |     | NULL    |                |
| updatedAt   | datetime     | NO   |     | NULL    |                |

#### `usercards`
(Structure not provided, but ensure this table exists as in the original `bizcard-demo`.)

#### `activities`
(Structure not provided, but ensure this table exists as in the original `bizcard-demo`.)

---

## 3. Steps to Migrate and Run

1. **Copy the `onfra/bizcard` folder** into your workspace.
2. **Install dependencies**:
   - From the root of `onfra/bizcard`, run:
     - `npm install` (installs all dependencies for both backend and frontend)
3. **Set up the MySQL database** as described above. Use the provided SQL commands to add any missing columns.
4. **Configure environment variables** as needed (see `.env.example` or documentation if available).
5. **Start the application:**
   - From the root of `onfra/bizcard`, run:
     - `npm start` (or the appropriate command)
   - The frontend will connect to the backend automatically.

---

## 4. Additional Notes

- If you have custom data in your old database, migrate it to the new structure as needed.
- If you have made custom changes to the frontend in `bizcard-demo`, manually merge those changes into `onfra/bizcard/frontend`.
- Ensure that any file upload directories (e.g., `uploads/`) are present and writable.
- Check for any new configuration files or scripts in `onfra/bizcard` that may not exist in `bizcard-demo`.

---

## 5. Troubleshooting

- If you encounter errors related to missing tables or columns, double-check your database schema and use the SQL commands above.
- Review backend and frontend logs for more details on any issues.

---

**For further help, refer to the README files in `onfra/bizcard` and its subfolders.**
