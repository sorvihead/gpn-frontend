import React, { useReducer } from 'react';

const initialState = {
    wells: [],
    facilities: [],
}

const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_WELLS':
        return {
        ...state,
        wells: action.payload,
      };
      case 'SET_FACILITIES': {
        return {...state,
        facilities: action.payload,
        };
      };
      case 'UPDATE_WELL': {
        return {...state,
        wells: state.wells.map(
          (well) =>
            well.id !== action.payload.id
              ? well
              : {
                  ...well,
                  [action.payload.parameterName]: action.payload.updatedValue
                }
        )
        };
      };
      case 'UPDATE_FACILITY': {
        return {...state,
        facilities: state.facilities.map(
          (facility) =>
            facility.id !== action.payload.id
              ? facility
              : {
                  ...facility,
                  [action.payload.parameterName]: action.payload.updatedValue,
                  lifecycle: [...facility.lifecycle, {name: action.payload.updatedValue, date: "2021-06-27"}],
                  prevStatus: facility.currentStatus,
                }
        ),
        wells: state.wells.map(
            (well) =>
                well.facility.id !== action.payload.id
                    ? well
                    : {
                        ...well,
                        facility: {
                          ...well.facility,
                          currentStatus: action.payload.updatedValue,
                          lifecycle: [...well.facility.lifecycle, {name: action.payload.updatedValue, date: "2021-06-27"}],
                          prevStatus: well.facility.currentStatus,
                        }
                    }
        )
        };
      };
      default:
        return state;
    }
  };

const FilterProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <FilterContext.Provider value={{ state, dispatch }}>
            {props.children}
        </FilterContext.Provider>
    );
};

const FilterContext = React.createContext(initialState);

export { FilterContext, FilterProvider };