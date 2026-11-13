const USERS_KEY = 'ems_users'
const TASKS_KEY = 'ems_tasks'
const CURRENT_USER_KEY = 'ems_current_user'

const defaultUsers = [
  { id: 0, name: 'Admin', email: 'admin@gmail.com', password: '123', role: 'admin' },
  { id: 1, name: 'Employee 1', email: 'employee1@gmail.com', password: '123', role: 'employee' },
  { id: 2, name: 'Employee 2', email: 'employee2@gmail.com', password: '123', role: 'employee' },
  { id: 3, name: 'Employee 3', email: 'employee3@gmail.com', password: '123', role: 'employee' },
  { id: 4, name: 'Employee 4', email: 'employee4@gmail.com', password: '123', role: 'employee' },
  { id: 5, name: 'Employee 5', email: 'employee5@gmail.com', password: '123', role: 'employee' },
]

const defaultTasks = [
  { id: 1, title: 'Design Login Page', description: 'Create a responsive login page using React and CSS.', category: 'Design', assignedTo: 'employee1@gmail.com', dueDate: '2026-11-05', status: 'new' },
  { id: 2, title: 'Create Navbar', description: 'Build a responsive navigation bar.', category: 'Frontend', assignedTo: 'employee1@gmail.com', dueDate: '2026-11-03', status: 'completed' },
  { id: 3, title: 'Implement Dashboard', description: 'Develop the main employee dashboard UI.', category: 'Development', assignedTo: 'employee1@gmail.com', dueDate: '2026-11-06', status: 'active' },
  { id: 4, title: 'Fix CSS Issues', description: 'Resolve responsive layout issues before deadline.', category: 'Bug Fix', assignedTo: 'employee1@gmail.com', dueDate: '2026-11-02', status: 'failed' },
  { id: 5, title: 'Update Profile Page', description: 'Add employee profile information and editing functionality.', category: 'Frontend', assignedTo: 'employee1@gmail.com', dueDate: '2026-11-07', status: 'new' },

  { id: 6, title: 'Build API Integration', description: 'Connect frontend with backend REST APIs.', category: 'Backend', assignedTo: 'employee2@gmail.com', dueDate: '2026-11-05', status: 'new' },
  { id: 7, title: 'Create User Schema', description: 'Design and implement the user database schema.', category: 'Database', assignedTo: 'employee2@gmail.com', dueDate: '2026-11-01', status: 'completed' },
  { id: 8, title: 'Authentication System', description: 'Implement login and registration functionality.', category: 'Backend', assignedTo: 'employee2@gmail.com', dueDate: '2026-11-08', status: 'active' },
  { id: 9, title: 'API Documentation', description: 'Complete documentation for all REST API endpoints.', category: 'Documentation', assignedTo: 'employee2@gmail.com', dueDate: '2026-11-02', status: 'failed' },
  { id: 10, title: 'Password Reset API', description: 'Develop the forgot password and reset password APIs.', category: 'Backend', assignedTo: 'employee2@gmail.com', dueDate: '2026-11-09', status: 'new' },

  { id: 11, title: 'Create Landing Page', description: 'Develop a modern and responsive landing page.', category: 'Frontend', assignedTo: 'employee3@gmail.com', dueDate: '2026-11-05', status: 'new' },
  { id: 12, title: 'Design Footer', description: 'Create a reusable website footer component.', category: 'Design', assignedTo: 'employee3@gmail.com', dueDate: '2026-11-02', status: 'completed' },
  { id: 13, title: 'Implement Search', description: 'Add search functionality to the product listing page.', category: 'Development', assignedTo: 'employee3@gmail.com', dueDate: '2026-11-06', status: 'active' },
  { id: 14, title: 'Optimize Images', description: 'Compress images to improve website performance.', category: 'Optimization', assignedTo: 'employee3@gmail.com', dueDate: '2026-11-01', status: 'failed' },
  { id: 15, title: 'Create Contact Form', description: 'Build a contact form with input validation.', category: 'Frontend', assignedTo: 'employee3@gmail.com', dueDate: '2026-11-10', status: 'new' },

  { id: 16, title: 'Testing Login Module', description: 'Test login functionality with different test cases.', category: 'Testing', assignedTo: 'employee4@gmail.com', dueDate: '2026-11-05', status: 'new' },
  { id: 17, title: 'Write Test Cases', description: 'Prepare test cases for employee registration.', category: 'Testing', assignedTo: 'employee4@gmail.com', dueDate: '2026-11-03', status: 'completed' },
  { id: 18, title: 'Bug Tracking', description: 'Identify and report bugs in the dashboard.', category: 'Bug Fix', assignedTo: 'employee4@gmail.com', dueDate: '2026-11-07', status: 'active' },
  { id: 19, title: 'Browser Compatibility', description: 'Verify UI compatibility across different browsers.', category: 'Testing', assignedTo: 'employee4@gmail.com', dueDate: '2026-11-02', status: 'failed' },
  { id: 20, title: 'Performance Testing', description: 'Check application loading speed and performance.', category: 'Optimization', assignedTo: 'employee4@gmail.com', dueDate: '2026-11-11', status: 'new' },

  { id: 21, title: 'Develop Reports Page', description: 'Create an employee performance reports page.', category: 'Frontend', assignedTo: 'employee5@gmail.com', dueDate: '2026-11-05', status: 'new' },
  { id: 22, title: 'Create Sidebar', description: 'Build a reusable dashboard sidebar component.', category: 'Design', assignedTo: 'employee5@gmail.com', dueDate: '2026-11-01', status: 'completed' },
  { id: 23, title: 'Add Charts', description: 'Integrate charts to display employee statistics.', category: 'Development', assignedTo: 'employee5@gmail.com', dueDate: '2026-11-08', status: 'active' },
  { id: 24, title: 'Export Reports', description: 'Implement PDF and CSV report export functionality.', category: 'Development', assignedTo: 'employee5@gmail.com', dueDate: '2026-11-03', status: 'failed' },
  { id: 25, title: 'Update Dashboard UI', description: 'Improve dashboard layout and visual consistency.', category: 'Design', assignedTo: 'employee5@gmail.com', dueDate: '2026-11-12', status: 'new' },
]

const readOrSeed = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw)
  } catch {
    // corrupted data, fall through and reseed
  }
  localStorage.setItem(key, JSON.stringify(fallback))
  return fallback
}

export const getUsers = () => readOrSeed(USERS_KEY, defaultUsers)

export const getTasks = () => readOrSeed(TASKS_KEY, defaultTasks)

export const saveTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
}

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY))
  } catch {
    return null
  }
}

export const saveCurrentUser = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
}

export const clearCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY)
}