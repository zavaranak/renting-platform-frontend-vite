import { FormControl, Input, InputLabel } from '@mui/material';
import { ChangeEvent } from 'react';
import { LocationParam, useSearchStore } from '@store/search-store';
import { SearchOption } from '@lib/contanst';

export default function LocationSearchBox() {
  const { location, setLocation, handleSearch } = useSearchStore(
    (state) => state
  );
  // const [city, setCity] = useState(location?.city);
  // const [country, setCountry] = useState(location?.country);

  const handleLocationInput = (event: ChangeEvent<HTMLInputElement>) => {
    const type = event.target.name;
    const value = event.target.value;
    const city = location ? location.city : '';
    const country = location ? location.country : '';
    const newLocation = {
      city: type === 'city_input' ? value : city,
      country: type === 'country_input' ? value : country,
    };
    setLocation(newLocation);
    validateLocation(newLocation);
  };

  const validateLocation = (newLocation: LocationParam) => {
    if (newLocation) {
      if (newLocation.city !== '' && newLocation.country !== '') {
        handleSearch({
          searchOption: SearchOption.LOCATION,
          valid: true,
        });
      }
      if (newLocation.city === '' || newLocation.country === '') {
        handleSearch({
          searchOption: SearchOption.LOCATION,
          valid: false,
        });
      }
    }
  };

  return (
    <div className='w-full  border-2 border-neutral_brown border-b-transparent p-5'>
      <div className='text-sm uppercase font-bold pb-6'>
        where would you like to stay?
      </div>
      <div className='grid grid-cols-2 gap-x-10 mt-2'>
        <FormControl>
          <InputLabel>City</InputLabel>
          <Input
            name='city_input'
            type='text'
            value={location ? location.city : ''}
            onChange={handleLocationInput}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Country</InputLabel>
          <Input
            name='country_input'
            type='text'
            value={location ? location.country : ''}
            onChange={handleLocationInput}
          />
        </FormControl>
      </div>
    </div>
  );
}
