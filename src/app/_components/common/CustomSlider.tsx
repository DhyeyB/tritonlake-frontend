import React, { useState } from "react"
import Slider from "rc-slider"
import "rc-slider/assets/index.css"
import { CustomSliderProps } from "@/app/_types/common/CustomSlider"

const CustomSlider: React.FC<CustomSliderProps> = ({ min, max, defaultValue = min, isRange = false, onChange }) => {
    const [sliderValue, setSliderValue] = useState<number | number[]>(defaultValue)

    const handleSliderChange = (value: number | number[]) => {
        setSliderValue(value) // Update the state when the slider changes
        onChange(value) // Pass the updated value to the parent component
    }

    return (
        <div
            style={{
                width: "100%",
                margin: "30px auto",
                padding: "0rem 1.5rem",
                textAlign: "center",
            }}
        >
            <Slider
                range={isRange} // Toggle range mode based on isRange
                min={min}
                max={max}
                defaultValue={defaultValue}
                value={sliderValue}
                onChange={handleSliderChange}
                marks={{
                    [min]: {
                        style: {
                            color: "#999",
                            fontSize: "12px",
                            fontWeight: "500",
                            marginTop: "-16px",
                            transform: "translateY(-20px)",
                        },
                        label: isRange ? `${min / 1000}k` : min,
                    },
                    [max]: {
                        style: {
                            color: "#999",
                            fontSize: "12px",
                            fontWeight: "500",
                            marginTop: "-16px",
                            transform: "translateY(-20px)",
                        },
                        label: isRange ? `${max / 1000000}M` : max,
                    },
                }}
                dots={false}
                railStyle={{
                    backgroundColor: "#f5f9f9",
                    height: 16,
                }}
                trackStyle={[
                    {
                        backgroundColor: isRange ? "#016937" : "transparent",
                        height: 16,
                    },
                ]}
                handleStyle={[
                    {
                        borderColor: "#ffffff",
                        height: 20,
                        width: 20,
                        marginTop: -2,
                        backgroundColor: "#ffffff",
                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.6)",
                    },
                    ...(isRange
                        ? [
                              {
                                  borderColor: "#ffffff",
                                  height: 20,
                                  width: 20,
                                  marginTop: -2,
                                  backgroundColor: "#ffffff",
                                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.6)",
                              },
                          ]
                        : []),
                ]}
                activeDotStyle={{
                    display: "none",
                }}
                dotStyle={{
                    display: "none",
                }}
            />
            {/* Dynamic value display */}
            <p style={{ marginTop: "10px", color: "#999", fontWeight: "500", fontSize: "14px" }}>
                {isRange ? `${(sliderValue as number[])[0].toLocaleString()} - ${(sliderValue as number[])[1].toLocaleString()}` : `${sliderValue.toLocaleString()}`}
            </p>
        </div>
    )
}

export default CustomSlider
