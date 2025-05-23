// components/TaskModal.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, X, Save, Calendar, AlignLeft, Flag, CheckCircle } from 'lucide-react';
import {  priorityStyles, DEFAULT_TASK } from '../assets/dummy';

const API_BASE = 'http://localhost:4000/api/tasks';

const TaskModal = ({ isOpen, onClose, taskToEdit, onSave, onLogout }) => {
  const [taskData, setTaskData] = useState(DEFAULT_TASK);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!isOpen) return;
    if (taskToEdit) {
      const normalized = taskToEdit.completed === 'Yes' || taskToEdit.completed === true ? 'Yes' : 'No';
      setTaskData({
        ...DEFAULT_TASK,
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        priority: taskToEdit.priority || 'Low',
        dueDate: taskToEdit.dueDate?.split('T')[0] || '',
        completed: normalized,
        id: taskToEdit._id,
      });
    } else {
      setTaskData(DEFAULT_TASK);
    }
    setError(null);
  }, [isOpen, taskToEdit]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  }, []);

  const getHeaders = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No auth token found');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (taskData.dueDate < today) {
      setError('Due date cannot be in the past.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const isEdit = Boolean(taskData.id);
      const url = isEdit ? `${API_BASE}/${taskData.id}/gp` : `${API_BASE}/gp`;
      const resp = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: getHeaders(),
        body: JSON.stringify(taskData),
      });
      if (!resp.ok) {
        if (resp.status === 401) return onLogout?.();
        const err = await resp.json();
        throw new Error(err.message || 'Failed to save task');
      }
      const saved = await resp.json();
      onSave?.(saved);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }, [taskData, today, getHeaders, onLogout, onSave, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-gradient-to-br from-white to-fuchsia-50 border border-purple-200 shadow-2xl rounded-2xl max-w-lg w-full p-6 relative animate-fadeIn">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold text-purple-800 flex items-center gap-2">
            {taskData.id ? <Save className="text-purple-500 w-5 h-5" /> : <PlusCircle className="text-purple-500 w-5 h-5" />}
            {taskData.id ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-purple-100 rounded-full transition">
            <X className="text-purple-600 w-5 h-5" />
          </button>
        </div>

        {/* Error Box */}
        {error && <div className="text-sm text-red-600 bg-red-100 p-3 rounded-lg border border-red-200 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Task Title</label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-purple-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-400 outline-none bg-white"
              placeholder="Enter task title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 flex items-center gap-1 mb-1">
              <AlignLeft className="w-4 h-4 text-purple-500" /> Description
            </label>
            <textarea
              name="description"
              rows="3"
              value={taskData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-purple-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-400 outline-none bg-white"
              placeholder="Add details about your task"
            />
          </div>

          {/* Priority and Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1 mb-1">
                <Flag className="w-4 h-4 text-purple-500" /> Priority
              </label>
              <select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-purple-400 outline-none ${priorityStyles[taskData.priority]}`}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1 mb-1">
                <Calendar className="w-4 h-4 text-purple-500" /> Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                required
                min={today}
                value={taskData.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-purple-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-400 outline-none bg-white"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-purple-500" /> Status
            </label>
            <div className="flex gap-6">
              {['Yes', 'No'].map((val) => (
                <label key={val} className="flex items-center space-x-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="completed"
                    value={val}
                    checked={taskData.completed === val}
                    onChange={handleChange}
                    className="accent-purple-600 w-4 h-4"
                  />
                  <span>{val === 'Yes' ? 'Completed' : 'In Progress'}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (
              taskData.id
                ? (<><Save className="w-4 h-4" /> Update Task</>)
                : (<><PlusCircle className="w-4 h-4" /> Create Task</>)
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
