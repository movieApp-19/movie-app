import React, { useState } from 'react';
import './search.css';

function SearchUI(){


    const [selectYear, setSelectYear] = useState("");
    const [customYear, setCustomYear] = useState("");

    // Updating the selected year

    const handleYear = (e) => {
        setSelectYear(e.target.value);
        setCustomYear("");  // Reset custom year
    }

    const handleCustomYear = (e) => {
        setCustomYear(e.target.value);
    }

    return(
        <div>
        <form>
                <label htmlFor= "year">
                    Release year
                <select id="year" name="year" value={selectYear} onChange={handleYear}>
                    <option value="blank"></option>
              <option value="1990s">1990s</option>
              <option value="2000">2000s</option>
              <option value="2010s">2010s</option>
              <option value="custom">Type exact year</option>
            </select>
            </label>

            {selectYear === 'custom' && (
        <input
          type="number"
          name="customYear"
          id="customYear"
          placeholder="Enter year"
          value={customYear}
          onChange={handleCustomYear}
        />
      )}

                <label htmlFor= "language">
                    Language
                <select id="country" name="country">
                <option value="blank"></option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="German">German</option>
              <option value="Finnish">Finnish</option>
              <option value="Chinese">Chinese</option>
              <option value="Japanese">Japanese</option>
              <option value="French">French</option>
            </select>
                </label>
               
                <label htmlFor= "Sort by">
                    Sort by
                <select id="sortBy" name="sortBy">
                    <option value="blank"></option>
              <option value="most popular">Popularity descending</option>
              <option value="least popular">Popularity descending</option>
              
            </select>
            </label>
               
        </form>
        </div>
    )
}

export default SearchUI