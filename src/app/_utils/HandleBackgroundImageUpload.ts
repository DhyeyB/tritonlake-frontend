export const addBackgroundImage = (watchedFile: FileList, className: string) => {
    if (watchedFile) {
        const reader = new FileReader()
        reader.readAsDataURL(watchedFile as unknown as Blob)
        reader.onloadend = () => {
            const imageDiv = document.querySelector(`.${className}`) as HTMLElement
            if (imageDiv) {
                imageDiv.style.backgroundImage = `url(${reader.result})`
            }
        }
    }
}
