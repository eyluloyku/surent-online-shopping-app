import React, { useState, useMemo } from "react";
import countryList from 'react-select-country-list'

function AdressInfo({ formData, setFormData }) {

  const [value, setValue] = useState("")
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setValue(value)
    setFormData({ ...formData, country: value });
  }
  
  return (
    <div className="other-info-container">
      <select value={value} onChange={(e) => changeHandler(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Telephone"
        value={formData.Telephone}
        onChange={(e) => {
          setFormData({ ...formData, Telephone: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="City"
        value={formData.City}
        onChange={(e) => {
          setFormData({ ...formData, City: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Zip-code"
        value={formData.Zipcode}
        onChange={(e) => {
          setFormData({ ...formData, Zipcode: e.target.value });
        }}
      />
    </div>
  );
}

export default AdressInfo;