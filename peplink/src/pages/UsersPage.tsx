import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import './UsersPage.css'

interface User {
  name: string
  role: string
  gender: string
  age: number
}

const defaultUsers: User[] = [
  { name: "Jonas", role: "Administratorius", gender: "Vyras", age: 30 },
  { name: "Agnė", role: "Vadybininkė", gender: "Moteris", age: 28 },
  { name: "Tomas", role: "Programuotojas", gender: "Vyras", age: 25 }
]

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [sortBy, setSortBy] = useState<keyof User>('name')
  const [formData, setFormData] = useState<User>({
    name: '',
    role: '',
    gender: 'Vyras',
    age: 0
  })
  const [editIndex, setEditIndex] = useState<number | null>(null)

  useEffect(() => {
    const storedUsers = localStorage.getItem('users')
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    } else {
      setUsers(defaultUsers)
      localStorage.setItem('users', JSON.stringify(defaultUsers))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: id === 'age' ? parseInt(value) : value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newUsers = [...users]
    
    if (editIndex !== null) {
      newUsers[editIndex] = formData
      setEditIndex(null)
    } else {
      newUsers.push(formData)
    }
    
    setUsers(newUsers)
    localStorage.setItem('users', JSON.stringify(newUsers))
    setFormData({ name: '', role: '', gender: 'Vyras', age: 0 })
  }

  const deleteUser = (index: number) => {
    const newUsers = [...users]
    newUsers.splice(index, 1)
    setUsers(newUsers)
    localStorage.setItem('users', JSON.stringify(newUsers))
    
    if (editIndex === index) {
      setEditIndex(null)
      setFormData({ name: '', role: '', gender: 'Vyras', age: 0 })
    }
  }

  const editUser = (index: number) => {
    setEditIndex(index)
    setFormData(users[index])
  }

  const cancelEdit = () => {
    setEditIndex(null)
    setFormData({ name: '', role: '', gender: 'Vyras', age: 0 })
  }

  
  const indexedUsers = users.map((user, index) => ({ user, originalIndex: index }))
  
  const sortedIndexedUsers = [...indexedUsers].sort((a, b) => {
    if (typeof a.user[sortBy] === 'string' && typeof b.user[sortBy] === 'string') {
      return (a.user[sortBy] as string).localeCompare(b.user[sortBy] as string)
    }
    return (a.user[sortBy] as number) - (b.user[sortBy] as number)
  })

  return (
    <div className="users-container">
      <Navbar />
      <h1 className="users-title">Vartotojų sąrašas</h1>

      <form className="user-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          id="name" 
          placeholder="Vardas" 
          required 
          value={formData.name}
          onChange={handleInputChange}
        />
        <input 
          type="text" 
          id="role" 
          placeholder="Pareigos" 
          required 
          value={formData.role}
          onChange={handleInputChange}
        />
        <select 
          id="gender" 
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="Vyras">Vyras</option>
          <option value="Moteris">Moteris</option>
        </select>
        <input 
          type="number" 
          id="age" 
          placeholder="Amžius" 
          required 
          value={formData.age || ''}
          onChange={handleInputChange}
        />
        <button type="submit">{editIndex !== null ? 'Atnaujinti' : 'Pridėti'}</button>
        {editIndex !== null && (
          <button type="button" onClick={cancelEdit}>Atšaukti</button>
        )}
      </form>

      <div className="sort-container">
        <label htmlFor="sort">Rūšiuoti pagal:</label>
        <select 
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as keyof User)}
        >
          <option value="name">Vardas (A-Z)</option>
          <option value="role">Pareigos (A-Z)</option>
          <option value="gender">Lytis (A-Z)</option>
          <option value="age">Amžius (žemiausias-aukščiausias)</option>
        </select>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Vardas</th>
            <th>Pareigos</th>
            <th>Lytis</th>
            <th>Amžius</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {sortedIndexedUsers.map(({ user, originalIndex }) => (
            <tr key={originalIndex}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.gender}</td>
              <td>{user.age}</td>
              <td>
                <button className="edit-btn" onClick={() => editUser(originalIndex)}>Redaguoti</button>
                <button className="delete-btn" onClick={() => deleteUser(originalIndex)}>Šalinti</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage