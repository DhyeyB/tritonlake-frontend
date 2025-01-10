import { SwatchColorPickerProps } from "@/app/_types/common/SwatchColorPicker"
import React, { useState, useEffect } from "react"
import { ChromePicker, ColorResult } from "react-color"

const SwatchColorPicker: React.FC<SwatchColorPickerProps> = (props) => {
    const [color, setColor] = useState<string>(props.color)
    const [displaySwatchColorPicker, setDisplaySwatchColorPicker] = useState(false)

    useEffect(() => {
        setColor(props.color)
    }, [props.color])

    const displayColor = color && color.charAt(0) !== "#" ? `rgb(${JSON.parse(color).r}, ${JSON.parse(color).g}, ${JSON.parse(color).b}, ${JSON.parse(color).a})` : color

    const renderSwatchColorPickerModal = () => {
        if (!displaySwatchColorPicker) {
            return null
        }
        return (
            <div className="pop">
                <div className="mask" onClick={() => setDisplaySwatchColorPicker(false)} />
                <div className="picker-wrapper">
                    <ChromePicker
                        color={color}
                        onChange={(updatedColor: ColorResult) => {
                            setColor(updatedColor.hex)
                            props.onColorChange(updatedColor)
                        }}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="react-color v-swatch">
            <div
                className={`color-box ${props.colorBoxClassName}`}
                style={{
                    ...props.colorBoxStyle,
                }}
            >
                <div className="mb-3 d-flex flex-column">
                    <input
                        type="text"
                        placeholder="#000000"
                        value={displayColor}
                        onChange={(e) => {
                            setColor(e.target.value)
                            props.onColorChange(e.target.value)
                        }}
                        readOnly
                        aria-label="Color"
                        className="form-control form-control-solid text-uppercase"
                    />

                    <div className="cursor-pointer t-custom-view-color-input" onClick={() => setDisplaySwatchColorPicker(true)}>
                        <span className="input-group-text t-span-color-input" id="basic-addon1" style={{ backgroundColor: color }} />
                    </div>
                </div>
                {renderSwatchColorPickerModal()}
            </div>
        </div>
    )
}

SwatchColorPicker.defaultProps = {
    colorBoxClassName: "",
    colorBoxStyle: {},
}

export default SwatchColorPicker
