# My Project

## Resource

**Posts**

Attributes:

* name (string) - Not Null
* subject (string) - Not Null
* message (string) - Could be Null

## Schema

```sql
CREATE TABLE posts (
id INTEGER PRIMARY KEY,
name TEXT NOT NULL,
subject TEXT NOT NULL,
message TEXT);
```

## REST Endpoints

Name                           | Method | Path
-------------------------------|--------|------------------
Retrieve post collection | GET    | /posts
Retrieve post member     | GET    | /posts/*\<id\>*
Create post member       | POST   | /posts
Update post member       | PUT    | /posts/*\<id\>*
Delete post member       | DELETE | /posts/*\<id\>*