import { useState, useEffect, useMemo } from 'react';
import './ContactsApp.css';

// Mock Data
const mockData = [
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '+1 (555) 123-4567', company: 'Tech Corp', jobTitle: 'Software Engineer', city: 'San Francisco', country: 'USA', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '+1 (555) 234-5678', company: 'Design Studio', jobTitle: 'UX Designer', city: 'New York', country: 'USA', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, firstName: 'Michael', lastName: 'Johnson', email: 'michael.j@example.com', phone: '+1 (555) 345-6789', company: 'Finance Inc', jobTitle: 'Financial Analyst', city: 'Chicago', country: 'USA', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, firstName: 'Emily', lastName: 'Brown', email: 'emily.brown@example.com', phone: '+1 (555) 456-7890', company: 'Marketing Pro', jobTitle: 'Marketing Manager', city: 'Los Angeles', country: 'USA', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, firstName: 'David', lastName: 'Wilson', email: 'david.wilson@example.com', phone: '+1 (555) 567-8901', company: 'Consulting Group', jobTitle: 'Senior Consultant', city: 'Boston', country: 'USA', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 6, firstName: 'Sarah', lastName: 'Martinez', email: 'sarah.m@example.com', phone: '+1 (555) 678-9012', company: 'Health Systems', jobTitle: 'Healthcare Administrator', city: 'Seattle', country: 'USA', avatar: 'https://i.pravatar.cc/150?img=6' },
  { id: 7, firstName: 'James', lastName: 'Anderson', email: 'james.anderson@example.com', phone: '+1 (555) 789-0123', company: 'Edu Tech', jobTitle: 'Product Manager', city: 'Austin', country: 'USA', avatar: 'https://i.pravatar.cc/150?img=7' },
  { id: 8, firstName: 'Lisa', lastName: 'Taylor', email: 'lisa.taylor@example.com', phone: '+1 (555) 890-1234', company: 'Retail Solutions', jobTitle: 'Sales Director', city: 'Miami', country: 'USA', avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: 9, firstName: 'Robert', lastName: 'Thomas', email: 'robert.thomas@example.com', phone: '+1 (555) 901-2345', company: 'Legal Associates', jobTitle: 'Attorney', city: 'Denver', country: 'USA', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: 10, firstName: 'Jennifer', lastName: 'Garcia', email: 'jennifer.garcia@example.com', phone: '+1 (555) 012-3456', company: 'Media Network', jobTitle: 'Content Creator', city: 'Portland', country: 'USA', avatar: 'https://i.pravatar.cc/150?img=10' },
];

// API function as specified
const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData), 500);
  });
};

export default function ContactsApp() {
  // State
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterField, setFilterField] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [sortField, setSortField] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch data on mount
  useEffect(() => {
    getData().then((data) => {
      setContacts(data);
      setLoading(false);
    });
  }, []);

  // Get unique values for selected filter field
  const filterOptions = useMemo(() => {
    if (!filterField) return [];
    return [...new Set(contacts.map((c) => c[filterField]))].sort();
  }, [contacts, filterField]);

  // Process contacts: search -> filter -> sort
  const processedContacts = useMemo(() => {
    let result = [...contacts];

    // Apply search
    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.firstName.toLowerCase().includes(query) ||
          c.lastName.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query) ||
          c.company.toLowerCase().includes(query) ||
          c.jobTitle.toLowerCase().includes(query) ||
          c.city.toLowerCase().includes(query)
      );
    }

    // Apply field-specific filter
    if (filterField && filterValue) {
      result = result.filter((c) =>
        c[filterField].toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    // Apply sort
    result.sort((a, b) => {
      const aVal = String(a[sortField]).toLowerCase();
      const bVal = String(b[sortField]).toLowerCase();
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [contacts, search, filterField, filterValue, sortField, sortOrder]);

  if (loading) {
    return <div className="loading">Loading contacts...</div>;
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Contacts Database</h1>
        <p>Manage {contacts.length} contacts with search, filter, and sort</p>
      </div>

      {/* Search */}
      <input
        type="text"
        className="search"
        placeholder="Search by name, email, company, job title, or city..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Controls */}
      <div className="controls">
        {/* Filter */}
        <div className="control-group">
          <label>Filter by:</label>
          <select
            value={filterField}
            onChange={(e) => {
              setFilterField(e.target.value);
              setFilterValue('');
            }}
          >
            <option value="">None</option>
            <option value="company">Company</option>
            <option value="jobTitle">Job Title</option>
            <option value="city">City</option>
            <option value="country">Country</option>
          </select>

          {filterField && (
            <select value={filterValue} onChange={(e) => setFilterValue(e.target.value)}>
              <option value="">Select {filterField}...</option>
              {filterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {filterValue && (
            <button onClick={() => { setFilterField(''); setFilterValue(''); }}>
              Clear
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="control-group">
          <label>Sort by:</label>
          <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="company">Company</option>
            <option value="jobTitle">Job Title</option>
            <option value="city">City</option>
          </select>

          <button
            className={`sort-btn ${sortOrder}`}
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? '↑ A-Z' : '↓ Z-A'}
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="results">
        Showing <strong>{processedContacts.length}</strong> of <strong>{contacts.length}</strong> contacts
        {(search || filterField || filterValue) && (
          <button className="clear-all" onClick={() => { setSearch(''); setFilterField(''); setFilterValue(''); }}>
            Clear all filters
          </button>
        )}
      </div>

      {/* Contact cards */}
      {processedContacts.length === 0 ? (
        <div className="no-results">
          <p>No contacts found</p>
          <small>Try adjusting your search or filters</small>
        </div>
      ) : (
        <div className="grid">
          {processedContacts.map((contact) => (
            <div key={contact.id} className="card">
              <img src={contact.avatar} alt={contact.firstName} />
              <h3>
                {contact.firstName} {contact.lastName}
              </h3>
              <p className="job">{contact.jobTitle}</p>
              <p className="company">{contact.company}</p>
              <p className="email">{contact.email}</p>
              <p className="phone">{contact.phone}</p>
              <p className="location">
                {contact.city}, {contact.country}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
