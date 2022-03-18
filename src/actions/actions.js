export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const CREATE_TOURISM_ACTIVITY = "CREATE_TOURISM_ACTIVITY";
export const GET_COUNTRY_DETAILS = "GET_COUNTRY_DETAILS";
export const GET_TOURISM_ACTIVITIES = "GET_TOURISM_ACTIVITIES";

const baseUrl = "https://project-countries.herokuapp.com";
let urlCountries = `${baseUrl}/countries`;
let urlCountriesByName = `${baseUrl}/countries/?name=`;
let urlCountry = `${baseUrl}/countries/`;
let urlCreateActivity = `${baseUrl}/activity`;
let urlActivities = `${baseUrl}/activities`;

export function getCountries() {
  return function (dispatch) {
    try {
      return fetch(urlCountries)
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: GET_COUNTRIES, payload: data });
        })
        .catch((err) => {
          dispatch({
            type: GET_COUNTRIES,
            payload: [{ error: err.message }],
          });
        });
    } catch (err) {
      return err;
    }
  };
}

export function getCountriesByName(name, fCon, fAct, sortType, sAlph, sPop) {
  return function (dispatch) {
    try {
      return fetch(urlCountriesByName + name)
        .then((response) => response.json())
        .then((data) => {
          let manipulatedData = data;

          if (fCon !== "none") {
            manipulatedData = data.filter(
              (country) => country.continent === fCon
            );
          }
          if (fAct !== "none") {
            manipulatedData = data.filter(
              (country) => country.continent === fAct
            );
          }
          if (sortType !== "") {
            if (sAlph) {
              manipulatedData.sort((a, b) => {
                if (a.name < b.name) {
                  if (sortType === "ascending") {
                    return -1;
                  } else {
                    return 1;
                  }
                } else if (a.name > b.name) {
                  if (sortType === "ascending") {
                    return 1;
                  } else {
                    return -1;
                  }
                } else {
                  return 0;
                }
              });
            }
            if (sPop) {
              manipulatedData.sort((a, b) => {
                if (a.population < b.population) {
                  if (sortType === "ascending") {
                    return -1;
                  } else {
                    return 1;
                  }
                } else if (a.population > b.population) {
                  if (sortType === "ascending") {
                    return 1;
                  } else {
                    return -1;
                  }
                } else {
                  return 0;
                }
              });
            }
          }
          dispatch({ type: GET_COUNTRIES, payload: manipulatedData });
        })
        .catch((err) => {
          dispatch({
            type: GET_COUNTRIES,
            payload: [{ error: err.message }],
          });
        });
    } catch (err) {
      return err;
    }
  };
}

export function getCountryDetails(countryId) {
  return function (dispatch) {
    try {
      return fetch(urlCountry + countryId)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch({ type: GET_COUNTRY_DETAILS, payload: data });
        })
        .catch((err) => {
          dispatch({
            type: GET_COUNTRY_DETAILS,
            payload: [{ error: err.message }],
          });
        });
    } catch (err) {
      return err;
    }
  };
}

export function getTourismActivities() {
  return function (dispatch) {
    try {
      return fetch(urlActivities)
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: GET_TOURISM_ACTIVITIES, payload: data });
        })
        .catch((err) => {
          dispatch({
            type: GET_TOURISM_ACTIVITIES,
            payload: [{ error: err.message }],
          });
        });
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}

export function createTourismActivity(data) {
  return function (dispatch) {
    try {
      return fetch(urlCreateActivity, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((response) => {
          dispatch({
            type: CREATE_TOURISM_ACTIVITY,
            payload: [response],
          });
        })
        .catch((err) => {
          dispatch({
            type: CREATE_TOURISM_ACTIVITY,
            payload: [{ error: err.message }],
          });
        });
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}
