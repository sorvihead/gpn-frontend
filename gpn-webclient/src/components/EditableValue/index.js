import { Button, Input, Select } from 'antd';
import React, { useState, useContext } from 'react';
import { FilterContext } from '../../context';

const EditableValue = ({
  record,
  parameterName,
  value,
  validValues,
  custom,
  addNewValue,
  allowClear,
  warning,
}) => {
  const {
    dispatch,
    state,
  } = useContext(FilterContext);

  const [newValue, setNewValue] = useState('');

  const onAddValue = (evt) => {
    evt.preventDefault();

    addNewValue(parameterName, newValue);
    setNewValue('');
  };

  const updateValue = (parameter, updatedValue) => {
    dispatch({
        type: 'UPDATE_FACILITY',
        payload: {
          id: record.id,
          parameterName,
          updatedValue,
        },
      });
  }
  return (
    <Select
      className={
        warning
          ? 'table__cell-select table__cell-select--warning'
          : 'table__cell-select'
      }
      value={value}
      onChange={(updatedValue) => updateValue(parameterName, updatedValue)}
      options={validValues.map((item) => ({ label: item, value: item }))}
      showSearch
      allowClear={allowClear}
      dropdownRender={(menu) => (
        <>
          {menu}
          {custom && (
            <form className="table__adding" onSubmit={(evt) => onAddValue(evt)}>
              <Input
                className="table__adding-input"
                value={newValue}
                onChange={(evt) => setNewValue(evt.target.value)}
              />
              <Button
                className="table__adding-button"
                htmlType="submit"
                type="primary"
              >
                Add
              </Button>
            </form>
          )}
        </>
      )}
    />
  );
};


EditableValue.defaultProps = {
  addNewValue: () => {},
  custom: false,
  allowClear: false,
  warning: false,
};

export default EditableValue;
