import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {useState} from "react";

function valuetext(value: number) {
    return `${value}`;
}

export const RangeSlider = () => {
    const [value, setValue] = useState<number[]>([0, 10]);

    const handleChange = (_event: Event, newValue: number[]) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: 250}}>
            <Slider
                getAriaLabel={() => 'Range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
        </Box>
    );
}
