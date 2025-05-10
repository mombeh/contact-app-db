# Contact Book CLI

A simple and powerful command-line tool to manage your personal contact list. Built with Node.js and PostgreSQL.

---

## Features

- Add new contacts  
- Search contacts by name  
- Update contact details  
- Delete contacts (with confirmation prompt)  
- List all contacts  
- Assign contacts to groups  

---
## Command use to view the features

### 1. To add
node contacts.js add --name "" --phone "" --email "" --address "" --group ""

### 2. To delete
node contacts.js delete --id 

### 3. To update
node contacts.js update --id 1 --email "" --phone ""

### 4. To search
node contacts.js search --name ""

### 5. List of all changes
node contacts.js list
---

## Getting Started

### 1. Clone the Repository

git clone https://github.com/mombeh/contact-app-db.git
cd contact-app-db
