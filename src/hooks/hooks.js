import { useState, useEffect } from "react"
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect( async () => {

      if (name==='') {
        setCountry(null); 
        return; 
      }

      try {
        const fetched = await axios.get(`https://restcountries.com/v3.1/name/${name}`)

        const data = {
          capital: fetched.data[0].capital[0],
          name: fetched.data[0].name.common, 
          population: fetched.data[0].population, 
          flag: fetched.data[0].flags.png, 
        };

        const newCountry = {found:true, data}
        setCountry(newCountry)

      } catch (err) {
        console.log('err: ', err);
        setCountry({found: false})
      }
      
    }, [name])
  
    return country
}