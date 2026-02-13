# API Documentation

## Business API

### Base URL
```
/api/v1/business
```

**Internal Structure:** `src/app/api/v1/business/route.ts`

---

## Endpoints

### GET /api/v1/business

Retrieves a list of all businesses from the database.

#### Request

**Method:** `GET`

**URL:** `/api/v1/business`

**Headers:**
```
Content-Type: application/json
```

**Query Parameters:** None

**Request Body:** None

#### Response

**Success Response (200 OK)**

```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "businessName": "Pet Care Center",
      "services": "care",
      "serviceHours": "9:00 AM - 5:00 PM",
      "businessDescription": "Professional pet care services",
      "businessType": "Service",
      "serviceAreas": "Downtown, Midtown",
      "images": [
        "https://utfs.io/f/H75a0zZETgmOMniMWRS8aVfeblWhHZ52Oiu9T6DSAgd7YEo4"
      ],
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

**Error Response (500 Internal Server Error)**

```json
{
  "success": false,
  "message": "An error occurred while fetching businesses"
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Indicates if the request was successful |
| `data` | array | Array of business objects |
| `count` | number | Total number of businesses returned |
| `message` | string | Error message (only present on error) |

#### Business Object Structure

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (MongoDB ObjectId) |
| `businessName` | string | Name of the business |
| `services` | string | Service type: `"care"`, `"food"`, `"bath"`, or `"groom"` |
| `serviceHours` | string | Operating hours (e.g., "9:00 AM - 5:00 PM") |
| `businessDescription` | string | Description of the business |
| `businessType` | string | Type of business: `"Restaurant"`, `"Retail"`, or `"Service"` |
| `serviceAreas` | string | Areas where the business operates |
| `images` | string[] | Array of image URLs from UploadThing |
| `createdAt` | string (ISO 8601) | Date and time when the business was created |
| `updatedAt` | string (ISO 8601) | Date and time when the business was last updated |

#### Example Usage

**JavaScript/TypeScript (Fetch API)**
```javascript
async function fetchBusinesses() {
  try {
    const response = await fetch('/api/v1/business');
    const result = await response.json();
    
    if (result.success) {
      console.log(`Found ${result.count} businesses`);
      result.data.forEach(business => {
        console.log(business.businessName);
      });
    } else {
      console.error('Error:', result.message);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}
```

**cURL**
```bash
curl -X GET http://localhost:3000/api/v1/business \
  -H "Content-Type: application/json"
```

**Axios**
```javascript
import axios from 'axios';

async function fetchBusinesses() {
  try {
    const response = await axios.get('/api/v1/business');
    const { success, data, count } = response.data;
    
    if (success) {
      console.log(`Found ${count} businesses`);
      return data;
    }
  } catch (error) {
    console.error('Error fetching businesses:', error.response?.data?.message);
  }
}
```

**React Query**
```typescript
import { useQuery } from '@tanstack/react-query';

function useBusinesses() {
  return useQuery({
    queryKey: ['businesses'],
    queryFn: async () => {
      const response = await fetch('/api/v1/business');
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message);
      }
      
      return result.data;
    },
  });
}

// Usage in component
function BusinessList() {
  const { data, isLoading, error } = useBusinesses();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.map(business => (
        <div key={business.id}>{business.businessName}</div>
      ))}
    </div>
  );
}
```

#### Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success - Businesses retrieved successfully |
| 500 | Internal Server Error - An error occurred on the server |

#### Notes

- Businesses are returned in descending order by creation date (newest first)
- The `images` array contains full URLs from UploadThing
- All dates are returned in ISO 8601 format
- The API uses the existing `getBusinesses()` server action internally
- This endpoint is part of the v1 API version (`src/app/api/v1/business/`)
- No authentication is required for this endpoint (adjust based on your security requirements)

#### Error Handling

Always check the `success` field in the response before processing data:

```javascript
const response = await fetch('/api/v1/business');
const result = await response.json();

if (result.success) {
  // Process data
  const businesses = result.data;
} else {
  // Handle error
  console.error(result.message);
}
```

---

## File Structure

```
src/app/api/
├── v1/                      ← API version folder
│   └── business/
│       └── route.ts         ← Business API route handler
└── auth/
    └── verify-pass-client/
        └── route.tsx
```

---

## Server Actions

The API endpoint uses the following server action internally:

### `getBusinesses()`

**Location:** `src/actions/business.ts`

**Returns:** `Promise<GetBusinessesResult>`

**Structure:**
```typescript
interface GetBusinessesResult {
  success: boolean;
  businesses?: Business[];
  message?: string;
}

interface Business {
  id: string;
  businessName: string;
  services: string;
  serviceHours: string;
  businessDescription: string;
  businessType: string;
  serviceAreas: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Testing

### Using Postman

1. **Method:** GET
2. **URL:** `http://localhost:3000/api/v1/business`
3. **Headers:** 
   - `Content-Type: application/json`
4. **Body:** None

### Using Browser Console

```javascript
fetch('/api/v1/business')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

## Changelog

### Version 1.0.1
- Reorganized API route into v1 version folder
- Route now located at `src/app/api/v1/business/route.ts`
- URL updated to: `/api/v1/business`

### Version 1.0.0
- Initial API endpoint for fetching businesses
- Returns all businesses with complete data structure
- Includes error handling and proper HTTP status codes

