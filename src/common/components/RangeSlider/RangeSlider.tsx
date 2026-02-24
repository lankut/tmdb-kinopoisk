import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
    return `${value/10}`;
}

type Props ={
    handleRageChange: (val: number[]) => void,
    value: number[],
}

export const RangeSlider = ({handleRageChange, value}:Props) => {
    const handleChange = (_event: Event, newValue: number[]) => {
        handleRageChange(newValue);
    };

    return (
        <Box sx={{width: 250}}>
            <Slider
                getAriaLabel={() => 'Range'}
                value={[value[0]*10, value[1]*10]}
                onChange={handleChange}
                valueLabelDisplay="off"
                getAriaValueText={valuetext}
            />
        </Box>
    );
}
