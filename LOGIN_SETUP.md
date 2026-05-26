# Login & Signup Integration Guide

## ✅ Complete Setup Instructions

### Backend Setup

1. **Start the backend server:**

   ```bash
   cd braza-server
   npm install
   npm run dev
   ```

   The server will run on `http://localhost:8000`

2. **Create default admin user:**
   ```bash
   npm run seed
   ```
   This creates:
   - **Email:** admin@animalhub.com
   - **Username:** admin
   - **Password:** admin123
   - **Role:** admin

### Frontend Setup

1. **Start the frontend server:**

   ```bash
   cd braza-client
   npm install
   npm run dev
   ```

2. **Environment already configured:**
   - `VITE_API_URL=http://localhost:8000/api` ✅

---

## 🔐 Login & SignUp Features

### ✅ Authentication Works For:

- **Admins** - Login with admin credentials
- **Editors** - Sign up as viewer, can be promoted to editor
- **Viewers** - Cannot login to dashboard (prevented on SignIn page)

### SignUp Page (`/auth/signup`)

- ✅ Creates user account in database
- ✅ Passwords are hashed with bcryptjs
- ✅ Automatically set as "viewer" role
- ✅ Form validation for all fields
- ✅ Email and username must be unique

### SignIn Page (`/auth/signin`)

- ✅ Works for **admin** and **editor** users
- ✅ **Viewers are blocked** with error message
- ✅ Generates JWT token (expires in 1 hour)
- ✅ Stores token, name, and role in localStorage
- ✅ Redirects to dashboard on success
- ✅ Role-based dashboard access

### Login Same Way for Admin & Users

- Both admin and users login via the same endpoint: `/api/users/login`
- Both use email/username + password
- Both receive JWT token
- Type differentiation happens based on stored "type" field

---

## 🗄️ Database Fields

### User Schema

```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  username: String (required, unique),
  password: String (hashed, required),
  type: "admin" | "editor" | "viewer" (default: "viewer"),
  age: String (optional),
  gender: String (optional),
  contactNumber: String (optional),
  address: String (optional),
  isActive: Boolean (default: true),
  createdAt: Date (auto)
}
```

---

## 🧪 Test the System

### Test Admin Login:

1. Go to `http://localhost:3000/auth/signin`
2. Email: `admin@animalhub.com`
3. Password: `admin123`
4. ✅ Should redirect to `/dashboard`
5. ✅ All menu items visible (Dashboard, Reports, Users, Articles)

### Test SignUp → Create New User:

1. Go to `http://localhost:3000/auth/signup`
2. Fill in all fields
3. Password must be 8+ characters
4. ✅ User saved in database as "viewer"
5. ✅ Redirect to signin page

### Test Viewer Login Block:

1. SignUp as a new user (creates as viewer)
2. Try to login with that account
3. ✅ Error message: "Viewers are not allowed to log in to the dashboard..."

### Test Editor Access: 

1. (Admin) Go to Users page
2. Find a viewer account
3. Change their type to "editor"
4. ✅ Editor can now login and see Dashboard, Reports, Articles (not Users)

---

## 📝 Notes

- Admin can be created via seed script or manual database entry
- All passwords are hashed using bcryptjs (10 rounds)
- JWT tokens expire after 1 hour
- Only admins can manage users
- Role-based dashboard access is enforced in DashLayout
- Both user and admin use identical login process
