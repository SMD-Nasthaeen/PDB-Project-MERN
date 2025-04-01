import React, { useState } from 'react';
import { Layout, BarChart3, Users, Calendar, CheckCircle2, Clock, ArrowUpRight, Plus } from 'lucide-react';
import Login from './login';
import Logout from './logout';

// Main App component
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle login with hardcoded credentials
  const handleLogin = (email, password) => {
    if (email === "admin@example.com" && password === "password") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials, please try again.");
    }
  };

  return isAuthenticated ? <ProjectHub onLogout={() => setIsAuthenticated(false)} /> : <Login onLogin={handleLogin} />;
}

// Project Hub component
function ProjectHub({ onLogout }) {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Website Redesign', progress: 75, members: 4, deadline: '2025-04-15', status: 'In Progress' },
    { id: 2, name: 'Mobile App Development', progress: 30, members: 6, deadline: '2025-05-20', status: 'Planning' },
    { id: 3, name: 'Marketing Campaign', progress: 90, members: 3, deadline: '2025-03-30', status: 'Review' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', progress: 0, members: 1, deadline: '', status: 'Planning' });

  // Handle new project form submission
  const handleAddProject = (e) => {
    e.preventDefault();
    const newId = projects.length + 1;
    setProjects([...projects, { id: newId, ...newProject }]);
    setIsModalOpen(false); // Close the modal after adding
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Layout className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Project Hub</h1>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </button>
              {/* Logout Button */}
              <button 
                onClick={onLogout} 
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<BarChart3 className="h-6 w-6 text-gray-400" />} title="Total Projects" value={projects.length} />
          <StatCard icon={<Users className="h-6 w-6 text-gray-400" />} title="Team Members" value="24" />
          <StatCard icon={<CheckCircle2 className="h-6 w-6 text-gray-400" />} title="Completed" value="8" />
          <StatCard icon={<Clock className="h-6 w-6 text-gray-400" />} title="In Progress" value="4" />
        </div>

        {/* Projects Table */}
        <ProjectsTable projects={projects} />

        {/* Recent Activity */}
        <RecentActivity />
      </div>

      {/* New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
            <form onSubmit={handleAddProject}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <input 
                  type="text" 
                  value={newProject.name} 
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Progress</label>
                <input 
                  type="number" 
                  value={newProject.progress} 
                  onChange={(e) => setNewProject({ ...newProject, progress: parseInt(e.target.value) })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Members</label>
                <input 
                  type="number" 
                  value={newProject.members} 
                  onChange={(e) => setNewProject({ ...newProject, members: parseInt(e.target.value) })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Deadline</label>
                <input 
                  type="date" 
                  value={newProject.deadline} 
                  onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select 
                  value={newProject.status} 
                  onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Review">Review</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// StatCard component for displaying statistics
function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">{icon}</div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-2xl font-semibold text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

// ProjectsTable component to show the list of active projects
function ProjectsTable({ projects }) {
  return (
    <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Active Projects</h3>
      </div>
      <div className="border-t border-gray-200">
        <div className="bg-gray-50 px-4 py-3 grid grid-cols-6 gap-4 text-sm font-medium text-gray-500">
          <div className="col-span-2">Project</div>
          <div>Team</div>
          <div>Progress</div>
          <div>Deadline</div>
          <div>Status</div>
        </div>
        <ul className="divide-y divide-gray-200">
          {projects.map((project) => (
            <li key={project.id} className="px-4 py-4 grid grid-cols-6 gap-4 hover:bg-gray-50 cursor-pointer">
              <div className="col-span-2">
                <div className="text-sm font-medium text-indigo-600">{project.name}</div>
              </div>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[...Array(project.members)].map((_, i) => (
                    <img key={i} className="h-8 w-8 rounded-full border-2 border-white" />
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
                </div>
                <span className="ml-2 text-sm text-gray-500">{project.progress}%</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">{project.deadline}</span>
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{project.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// RecentActivity component for showing activity feed
function RecentActivity() {
  return (
    <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {[1].map((item) => (
            <li key={item} className="px-4 py-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Sarah Thompson</p>
                  <p className="text-sm text-gray-500">Updated the design files for Website Redesign</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500">2h ago</span>
                <ArrowUpRight className="ml-2 h-4 w-4 text-gray-400" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
