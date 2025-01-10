"use client"
const CardLoader: React.FC<{ style?: object }> = ({ style }) => {
    return (
        <div className="card-skeleton" style={style}>
            <div className="card-loader">
                <div className="card-image-placeholder"></div>
            </div>
        </div>
    )
}

export default CardLoader
