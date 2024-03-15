import { info } from 'console';
import './style.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { apiLink } from '../api_links';
interface apiProps {
  name: string;
  date: string;
  countryCode: string;
}

const UsHolidays = (): React.ReactElement => {
  const [apiData, setApiData] = useState<apiProps[]>();

  useEffect(() => {
    fetchApi();
  }, []);

  //fetching api data using async await
  // const fetchApi = async () => {
  //   try {
  //     const response = await fetch(apiLink);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setApiData(data);
  //   } catch (error) {
  //     console.log('Something went Wrong !', error);
  //   }
  // };

  //fetching api data using axios
  //regular synchronous function using promises for handling asynchronouse operation

  // const fetchApi = () => {
  //   axios.get(apiLink)
  //   .then((response) => {
  //     const data = response.data;
  //     setApiData(data)
  //   })
  //   .catch((error) => {
  //   console.log("something went wrog!", error)
  //   })
  // }

  //axios try catch method
  const fetchApi = async () => {
    try {
      const response = await axios.get(apiLink)

      if(!response.status || response.status !== 200) {
        throw  new Error(`HTTP error! status: ${response.status}`)
      }

      const data = response.data;
      setApiData(data)
    } catch (error) {
      console.log('Error fetching data:', error)
    }
  }

  //changing date format
  const formatDate = (
    dateString: string,
    outputFormat = 'DD-MM-YYYY'
  ): string => {
    try {
      // Parse the date string using Date constructor
      const parsedDate = new Date(dateString);

      // Check if parsing was successful (valid date string)
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date string provided.');
      }

      // Format the date using toLocaleDateString with desired format
      return parsedDate.toLocaleDateString('en-UK', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      // Handle invalid date string (optional: return an empty string or default value)
      return ''; // You can return a default value here if desired
    }
  };

  return (
    <>
      <h2>welcome</h2>
      {!apiData && <p>Loading holidays...</p>}
      {apiData?.length === 0 && <p>No holidays found.</p>}
      {apiData && <h2>Public Holidays {apiData[0]?.countryCode}</h2>}

      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Holiday Type</th>
          </tr>
        </thead>

        <tbody>
          {apiData &&
            apiData.map((item, index) => (
              <tr key={index}>
                <td>{formatDate(item.date)}</td>
                <td>{item.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default UsHolidays;
