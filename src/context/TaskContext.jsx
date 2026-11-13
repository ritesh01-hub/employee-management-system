import { useState, useEffect } from 'react'
import { TaskContext } from './contexts'
import { getTasks, saveTasks } from '../utils/localStorage'

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => getTasks())

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  const addTask = (task) => {
    const newTask = { ...task, id: Date.now(), status: 'new' }
    setTasks((prev) => [newTask, ...prev])
  }

  const updateTaskStatus = (id, status) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus, deleteTask }}>
      {children}
    </TaskContext.Provider>
  )
}