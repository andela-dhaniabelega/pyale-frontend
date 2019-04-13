import axios from 'axios'


export const loadProperties = () => {
  return (dispatch, getState) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/api/v1/properties/`)
      .then((res) => {
        dispatch({type: 'LOAD_PROPERTY_SUCCESS', data: res.data})
      }).catch((error) => {
        console.log(error)
      });
  }
};

export const filterProperties = (filters) => {
  return (dispatch, getState) => {
    const categories = filters.selectedCategories;
    const location = filters.selectedLocation;
    return axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/properties/filter?categories=${categories}&location=${location}`)
      .then((res) => {
        dispatch({type: 'PROPERTY_FILTER_SUCCESS', data: res.data})
      }).catch((error) => {
        console.log(error)
      });
  }
};

export const getProperty= (property_id) => {
  return (dispatch, getState) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/api/v1/properties/${property_id}/`)
      .then((res) => {
       dispatch({type: 'LOAD_PROPERTY_DETAIL_SUCCESS', data: res.data})
      }).catch((error) => {
        console.log(error)
      })
  }
};
