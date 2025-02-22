# API Documentation

## Base URL
```
http://your-server-address/api
```

## Endpoints

---
## User Endpoints

### 1. Get All Users
**Endpoint:**
```
GET /users
```
**Response:**
```json
[
  {
    "_id": "string",
    "username": "string",
    "email": "string",
    "home_address": {
      "type": "Point",
      "coordinates": [longitude, latitude]
    },
    "status": "Safe" | "Needs Rescue"
  }
]
```

### 2. Add a User
**Endpoint:**
```
POST /users
```
**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "home_address": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  },
  "status": "Safe" | "Needs Rescue"
}
```
**Response:**
```json
{
  "_id": "string",
  "username": "string",
  "email": "string",
  "home_address": { ... },
  "status": "string"
}
```

### 3. Delete a User
**Endpoint:**
```
DELETE /users
```
**Request Body:**
```json
{
  "id": "string"
}
```
**Response:**
```json
{
  "message": "User deleted."
}
```

---
## Evacuation Area Endpoints

### 4. Get All Evacuation Areas
**Endpoint:**
```
GET /evac-areas
```
**Response:**
```json
[
  {
    "_id": "string",
    "name": "string",
    "location": {
      "type": "Point",
      "coordinates": [longitude, latitude]
    },
    "current_occupancy": number,
    "estimated_capacity": number,
    "status": "Full" | "Vacant",
    "feedbacks": ["string"]
  }
]
```

### 5. Add an Evacuation Area
**Endpoint:**
```
POST /evac-areas
```
**Request Body:**
```json
{
  "name": "string",
  "location": {
    "type": "Point",
    "coordinates": [longitude, latitude]
  },
  "current_occupancy": number,
  "estimated_capacity": number,
  "feedbacks": ["string"]
}
```
**Response:**
```json
{
  "_id": "string",
  "name": "string",
  "location": { ... },
  "status": "string"
}
```

### 6. Delete an Evacuation Area
**Endpoint:**
```
DELETE /evac-areas
```
**Request Body:**
```json
{
  "id": "string"
}
```
**Response:**
```json
{
  "message": "Evac area deleted."
}
```

---
## Flood Endpoints

### 7. Get All Floods
**Endpoint:**
```
GET /floods
```
**Response:**
```json
[
  {
    "_id": "string",
    "path": {
      "type": "LineString",
      "coordinates": [[longitude, latitude], ...]
    },
    "status": "Passable" | "Ankle-Deep" | "Knee-Deep" | "Waist-Deep" | "Chest-Deep" | "Unknown",
    "comment": "string",
    "image": "base64 string"
  }
]
```

### 8. Add a Flood Report
**Endpoint:**
```
POST /floods
```
**Request Body:**
```json
{
  "author_id": "string",
  "path": {
    "type": "LineString",
    "coordinates": [[longitude, latitude], ...]
  },
  "status": "Passable" | "Ankle-Deep" | "Knee-Deep" | "Waist-Deep" | "Chest-Deep" | "Unknown",
  "comment": "string"
}
```
**Response:**
```json
{
  "_id": "string",
  "path": { ... },
  "status": "string"
}
```

### 9. Delete a Flood Report
**Endpoint:**
```
DELETE /floods
```
**Request Body:**
```json
{
  "id": "string"
}
```
**Response:**
```json
{
  "message": "Flood deleted."
}
```

---
## File Upload Endpoints

### 10. Upload a File
**Endpoint:**
```
POST /upload
```
**Request:**
- Multipart form-data with a `file` field.

**Response:**
```json
{
  "message": "File uploaded successfully",
  "filename": "string",
  "size": number,
  "fileId": "string"
}
```

### 11. Get File by Filename
**Endpoint:**
```
GET /file/:filename
```
**Response:**
- The requested file is returned as an attachment.

---
## Route Endpoints

### 12. Get All Routes
**Endpoint:**
```
GET /routes
```
**Response:**
```json
[
  {
    "_id": "string",
    "path": {
      "type": "LineString",
      "coordinates": [[longitude, latitude], ...]
    }
  }
]
```

### 13. Add a Route
**Endpoint:**
```
POST /routes
```
**Request Body:**
```json
{
  "path": {
    "type": "LineString",
    "coordinates": [[longitude, latitude], ...]
  }
}
```
**Response:**
```json
{
  "_id": "string",
  "path": { ... }
}
```

### 14. Delete a Route
**Endpoint:**
```
DELETE /routes
```
**Request Body:**
```json
{
  "id": "string"
}
```
**Response:**
```json
{
  "message": "Route deleted."
}
```

