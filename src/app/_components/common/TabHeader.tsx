const TabHeader: React.FC<{ heading: string; loading?: boolean }> = ({ heading, loading }) => {
    return (
        <div className="card-header border-0">
            <div className="card-title m-0">{loading ? <h3 className="fw-bold m-0 loader-heading"></h3> : <h3 className="fw-bold m-0">{heading}</h3>}</div>
        </div>
    )
}

export default TabHeader
