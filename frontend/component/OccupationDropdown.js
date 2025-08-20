import React, { useState } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import css from '@component/css';

const OccupationDropdown = ({ options, placeholder, style, value, onValueChange }) => {

  return (
    <View style={[css.dropDownContainer, style]}>
      <View style={css.pickerWrapper}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={{ color: "#434E3E" }}
        >
          <Picker.Item label={placeholder} value="" enabled={false} />
          {options.map((option, index) => (
            <Picker.Item key={index} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default OccupationDropdown;
