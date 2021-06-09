import React, {useCallback, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import "./PackSorting.scss";

type MultiRangeSliderType = {
    min: number
    max: number
    onChangeMinMaxValues: (minVal: number, maxVal: number) => void
}

const MultiRangeSlider: React.FC<MultiRangeSliderType> = ({min, max, onChangeMinMaxValues}) => {

    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    useEffect(() => {
        let timeout = setTimeout(() => {
            onChangeMinMaxValues(minVal, maxVal)
        }, 500)
        return () => {
            clearTimeout(timeout);
        }
    }, [minVal, maxVal])


    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            // @ts-ignore
            range.current.style.left = `${minPercent}%`;
            // @ts-ignore
            range.current.style.width = `${maxPercent - minPercent}%`;
        }

    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            // @ts-ignore
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    return (
        <div className="container">
            <input
                id="search"
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className="thumb thumb--left"
                // @ts-ignore
                style={{zIndex: minVal > max - 100 && "5"}}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className="thumb thumb--right"
            />

            <div className="slider">
                <div className="slider__track"/>
                <div ref={range} className="slider__range"/>
                <div className="slider__left-value">{minVal}</div>
                <div className="slider__right-value">{maxVal}</div>
            </div>
        </div>
    );
};

MultiRangeSlider.propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
};

export default MultiRangeSlider;
