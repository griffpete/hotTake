# Project 4 - Resourceful

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
## Resource
**Subjects**

Attributes:

* subject (string) - Not Null

## Schema

```sql
CREATE TABLE IF NOT EXISTS subjects (
id INTEGER PRIMARY KEY,
subject TEXT NOT NULL)
```        

## REST Endpoints

Name                           | Method | Path
-------------------------------|--------|------------------
Retrieve post collection | GET    | /userPosts
Retrieve post member     | GET    | /userPosts/*\<id\>*
Create post member       | POST   | /userPosts
Update post member       | PUT    | /userPosts/*\<id\>*
Delete post member       | DELETE | /userPosts/*\<id\>*
Retreive subject collection | GET | /subjects

## Deployment Instructions

### Building and Pushing Docker Images
1. Frontend:
   ```bash
   docker build -t <your-dockerhub-username>/hottake-frontend:latest -f frontend/Dockerfile .
   docker push <your-dockerhub-username>/hottake-frontend:latest

2. backend
docker build -t <your-dockerhub-username>/hottake-backend:latest -f backend/Dockerfile .
docker push <your-dockerhub-username>/hottake-backend:latest

## Deploying to Kubernetes
kubectl apply -f frontend-deployment.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f ingress.yaml
