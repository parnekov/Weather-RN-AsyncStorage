import { AsyncStorage } from 'react-native';

export const getApiAsync = (city) =>{
    return async (dispatch) => {
        console.log("getApiAsync");
        if (city){
            const api_url = await fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=5&appid=c4a2fab9875a4addca3b5ca41d0f8232`);
            const data = await api_url.json();
            if(data.city){
                dispatch({
                    type: 'GET_API',
                    data
                    })
            } else {
                alert("Put correct city");
            }
          } else {
             alert("Put city");
          }
    }
}


export const getDataFromStorage = () =>{
    console.log('getDataFromStorage');
    return async (dispatch) => {
        try{
            let storageObject = {};
            await AsyncStorage.getItem('weather').then((value)=> {
                storageObject = JSON.parse(value);                
            });
            dispatch({
                type: 'GET_STORAGE',
                array: storageObject.array
                })
        } catch (error){
            console.log(error.message);
        }
    }
}

export const updateAsyncStorage = (array) =>{
    let days = { array }
    return async (dispatch) => {
        try{
        await AsyncStorage.setItem('weather', JSON.stringify(days));
        dispatch({
            type: 'UPDATE_STORAGE',
            array
            })
        } catch (error){
            console.log(error.message);
        }
    }
}
     