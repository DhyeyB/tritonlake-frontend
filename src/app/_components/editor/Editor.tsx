import { CONFIG } from "@/app/_utils/Constants"
import JoditEditor, { IJoditEditorProps } from "jodit-react"
import React from "react"

const Editor: React.FC<IJoditEditorProps & { onBlur: (htmlValue: string | null) => void }> = ({ onBlur, ...props }) => {
    return (
        <JoditEditor
            config={{
                readonly: false,
                height: 200,
                statusbar: false,
                width: "100%",
                buttons: CONFIG.JODIT.SHOW_BUTTONS,
                removeButtons: CONFIG.JODIT.REMOVE_BUTTONS,
                containerStyle: { borderRadius: "10px" },
                toolbarButtonSize: "middle",
            }}
            {...props}
            onBlur={(newContent) => {
                const parser = new DOMParser()
                const doc = parser.parseFromString(newContent, "text/html")
                const textContent = doc.body.innerText
                if (textContent?.length && textContent !== '""') {
                    onBlur(newContent)
                } else {
                    onBlur(null)
                }
            }}
        />
    )
}

export default Editor
