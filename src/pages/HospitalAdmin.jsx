import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { 
  Building2, 
  Users, 
  DollarSign, 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Stethoscope,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'

const HospitalAdmin = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Cardiology', doctors: 3, consultations: 45 },
    { id: 2, name: 'Orthopedics', doctors: 2, consultations: 32 },
    { id: 3, name: 'Pediatrics', doctors: 4, consultations: 67 }
  ])
  const [doctors, setDoctors] = useState([
    { 
      id: 1, 
      name: 'Dr. John Smith', 
      specialization: 'Cardiology', 
      experience: 8, 
      consultations: 15, 
      revenue: 4500 
    },
    { 
      id: 2, 
      name: 'Dr. Sarah Johnson', 
      specialization: 'Orthopedics', 
      experience: 12, 
      consultations: 22, 
      revenue: 6600 
    }
  ])
  const [showAddDepartment, setShowAddDepartment] = useState(false)
  const [newDepartment, setNewDepartment] = useState({ name: '', description: '' })

  // Mock data
  const totalConsultations = 144
  const totalRevenue = 43200
  const totalDoctors = 9
  const totalDepartments = 3

  const handleAddDepartment = () => {
    if (newDepartment.name.trim()) {
      const department = {
        id: Date.now(),
        name: newDepartment.name,
        description: newDepartment.description,
        doctors: 0,
        consultations: 0
      }
      setDepartments([...departments, department])
      setNewDepartment({ name: '', description: '' })
      setShowAddDepartment(false)
    }
  }

  const handleDeleteDepartment = (id) => {
    setDepartments(departments.filter(dept => dept.id !== id))
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Building2 size={20} /> },
    { id: 'departments', label: 'Departments', icon: <Users size={20} /> },
    { id: 'doctors', label: 'Doctors', icon: <Stethoscope size={20} /> },
    { id: 'revenue', label: 'Revenue', icon: <DollarSign size={20} /> }
  ]

  return (
    <div>
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <Building2 className="card-icon" />
          <div>
            <h2 className="card-title">Hospital Admin Dashboard</h2>
            <p style={{ color: '#666', margin: 0 }}>
              Welcome back, {user?.name || 'Administrator'}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{totalConsultations}</div>
          <div className="stat-label">Total Consultations</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">₹{totalRevenue.toLocaleString()}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalDoctors}</div>
          <div className="stat-label">Associated Doctors</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalDepartments}</div>
          <div className="stat-label">Departments</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #f0f0f0', paddingBottom: '1rem' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-2">
              <div className="card">
                <h3 className="mb-2">Hospital Information</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Building2 size={16} />
                  <span>City General Hospital</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <MapPin size={16} />
                  <span>123 Medical Center Drive, City</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Phone size={16} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={16} />
                  <span>admin@cityhospital.com</span>
                </div>
              </div>

              <div className="card">
                <h3 className="mb-2">Recent Activity</h3>
                <div style={{ fontSize: '0.9rem' }}>
                  <div className="mb-2">• Dr. Sarah Johnson completed 3 consultations today</div>
                  <div className="mb-2">• New patient registration: Jane Doe</div>
                  <div className="mb-2">• Revenue generated: ₹2,400 from today's consultations</div>
                  <div className="mb-2">• Department update: Pediatrics schedule modified</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3>Hospital Departments</h3>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddDepartment(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Plus size={16} />
                Add Department
              </button>
            </div>

            {showAddDepartment && (
              <div className="card mb-3">
                <h4 className="mb-2">Add New Department</h4>
                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Department Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newDepartment.name}
                      onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
                      placeholder="Enter department name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newDepartment.description}
                      onChange={(e) => setNewDepartment({...newDepartment, description: e.target.value})}
                      placeholder="Enter description"
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-primary" onClick={handleAddDepartment}>
                    Add Department
                  </button>
                  <button className="btn btn-secondary" onClick={() => setShowAddDepartment(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Doctors</th>
                    <th>Consultations</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map(dept => (
                    <tr key={dept.id}>
                      <td>
                        <div>
                          <strong>{dept.name}</strong>
                          {dept.description && (
                            <div style={{ fontSize: '0.875rem', color: '#666' }}>
                              {dept.description}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>{dept.doctors}</td>
                      <td>{dept.consultations}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button className="btn btn-secondary" style={{ padding: '0.5rem' }}>
                            <Edit size={16} />
                          </button>
                          <button 
                            className="btn btn-danger" 
                            style={{ padding: '0.5rem' }}
                            onClick={() => handleDeleteDepartment(dept.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Doctors Tab */}
        {activeTab === 'doctors' && (
          <div>
            <h3 className="mb-2">Associated Doctors</h3>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Specialization</th>
                    <th>Experience</th>
                    <th>Consultations</th>
                    <th>Revenue Generated</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map(doctor => (
                    <tr key={doctor.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Stethoscope size={16} />
                          <strong>{doctor.name}</strong>
                        </div>
                      </td>
                      <td>{doctor.specialization}</td>
                      <td>{doctor.experience} years</td>
                      <td>{doctor.consultations}</td>
                      <td>₹{doctor.revenue.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Revenue Tab */}
        {activeTab === 'revenue' && (
          <div>
            <div className="grid grid-2">
              <div className="card">
                <h3 className="mb-2">Revenue Summary</h3>
                <div className="mb-2">
                  <strong>Total Revenue:</strong> ₹{totalRevenue.toLocaleString()}
                </div>
                <div className="mb-2">
                  <strong>Hospital Share (40%):</strong> ₹{(totalRevenue * 0.4).toLocaleString()}
                </div>
                <div className="mb-2">
                  <strong>Doctors Share (60%):</strong> ₹{(totalRevenue * 0.6).toLocaleString()}
                </div>
                <div className="mb-2">
                  <strong>Average per Consultation:</strong> ₹{(totalRevenue / totalConsultations).toFixed(0)}
                </div>
              </div>

              <div className="card">
                <h3 className="mb-2">Revenue by Department</h3>
                <div>
                  <div className="mb-2">
                    <strong>Cardiology:</strong> ₹{(totalRevenue * 0.35).toLocaleString()}
                  </div>
                  <div className="mb-2">
                    <strong>Orthopedics:</strong> ₹{(totalRevenue * 0.25).toLocaleString()}
                  </div>
                  <div className="mb-2">
                    <strong>Pediatrics:</strong> ₹{(totalRevenue * 0.40).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <h3 className="mb-2">Monthly Revenue Trend</h3>
              <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                <p style={{ color: '#666' }}>Revenue chart would be displayed here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HospitalAdmin 