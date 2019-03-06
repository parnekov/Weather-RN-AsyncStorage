import { AsyncStorage } from 'react-native';

export const updateAsyncStorage = async (array) =>{
  let days = { array }
  try{
    await AsyncStorage.setItem('weather', JSON.stringify(days));
    } catch (error){
        console.log(error.message);
    }
  return array;
}

// get objects (days) from api
const createWeatherArrayDays = (data) => {
  const weatherArray = [];
    for(let i = 0; i < 5; i++){
      weatherArray.push({
        city: data.city.name,
        country: data.city.country,
        date: data.list[i].dt,
        temp: data.list[i].temp.day,
        conditionDescr: data.list[i].weather[0].description,
        conditionId: data.list[i].weather[0].id,
        humidity: data.list[i].humidity,
        pressure: data.list[i].pressure
      })
    }    
  return weatherArray;
}

export const reducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_API':
      return createWeatherArrayDays(action.data);

    case 'GET_STORAGE':
      console.log('GET_STORAGE');
      return action.array;

    case 'UPDATE_STORAGE':
    console.log('UPDATE_STORAGE');
    return state.slice();   

    default: 
    return state;
  }
}



