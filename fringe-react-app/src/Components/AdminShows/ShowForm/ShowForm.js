import React from 'react';
import './ShowForm.css';

function ShowForm({ showForm, handleChange, handleSubmit, editing, cancelEditing, isEditing }) {
  const { date } = showForm;

  const includesDate = (value) => {
    return date && date.includes(value) ? true : false;
  };
   
  return (
    <div className="show-form">
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={showForm.title || ""} onChange={handleChange} required />
        <input type="text" name="artist" placeholder="Artist" value={showForm.artist || ""} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={showForm.description || ""} onChange={handleChange} required />
        <select name="time" value={showForm.time || ""} onChange={handleChange} required >
          <option value="">Select Start Time</option>
          <option value="19:00">19:00</option>
          <option value="19:30">19:30</option>
          <option value="20:30">20:30</option>
          <option value="21:00">21:00</option>
          <option value="21:30">21:30</option>
          <option value="22:00">22:00</option>
        </select>
        <input type="number" name="runtime" placeholder="Runtime (in minutes)" value={showForm.runtime || ""} onChange={handleChange} min="1" required />
        <fieldset className="margin-2vh">
        <legend>Dates:</legend>
        {[...Array(31).keys()].map((num) => (
          <label key={num}>
            <input type="checkbox" name="date" value={num + 1} checked={includesDate(num + 1)} onChange={handleChange} />
            {num + 1}
          </label>
        ))}
        </fieldset> 
        <input type="text" name="venue" placeholder="Venue" value={showForm.venue || ""} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={showForm.address || ""} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Ticket Price" value={showForm.price || ""} onChange={handleChange} min="1" required />
        <select name="genre" value={showForm.genre || ""} onChange={handleChange} required >
          <option value="">Select Genre</option>
          <option value="Comedy">Comedy</option>
          <option value="Dance">Dance</option>
          <option value="Theatre">Theatre</option>
        </select>
        <button type="submit" className="btn btn-secondary custom-btn-pink">{isEditing ? 'Update Show' : 'Add Show'}</button>
        {editing && <button type="button" onClick={cancelEditing} className="btn btn-secondary custom-btn-blue">Cancel</button>}
      </form>
      </div>
  );
}

export default ShowForm;









