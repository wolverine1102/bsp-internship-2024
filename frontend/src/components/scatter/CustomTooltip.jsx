export default function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
        const start = new Date(payload[0].payload.start_datetime);
        const end = new Date(payload[0].payload.end_datetime)

        return (
            <div className="custom-tooltip">
                <p className="tracking-[1px] text-sm">{`Product ID : ${payload[0].payload.product.id}`}</p>
                <p className="tracking-[1px] text-sm capitalize">{`Type: ${payload[0].payload.product.type}`}</p>
                <p className="tracking-[1px] text-sm">
                    {`Start: ${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear()}, ${start.getHours()}:${start.getMinutes()}`}
                </p>
                <p className="tracking-[1px] text-sm">
                    {`End: ${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear()}, ${end.getHours()}:${end.getMinutes()}`}
                </p>
            </div>
        )
    }

    return null;
}