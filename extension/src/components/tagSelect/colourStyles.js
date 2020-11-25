/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import chroma from 'chroma-js';

export default () => ({
  control: (styles) => ({ ...styles, backgroundColor: 'white', width: '100%' }),
  option: (styles, {
    data, isDisabled, isFocused, isSelected,
  }) => {
    if (!data.color) {
      data.color = chroma.random();
    }
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
          ? data.color
          : isFocused
            ? color.alpha(0.1).css()
            : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  multiValue: (styles, { data }) => {
    if (!data.color) {
      data.color = chroma.random();
    }
    const color = chroma(data.color);

    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),

    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),

});
