export default function CustomTooltip({ active, payload, label }) {
    if (active && payload && payload.length) {
        const start = new Date(payload[0].payload.startDatetime);
        const end = new Date(payload[0].payload.endDatetime);
        const dateFormatter = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hourCycle: 'h23'
        })

        return (
            <div className="custom-tooltip container border border-slate-400 rounded p-1 bg-slate-100">
                <p className="tracking-[1px] text-sm">{`Heat No : ${payload[0].payload.product.heatNo}`}</p>
                <p className="tracking-[1px] text-sm">{`Stage : ${payload[0].payload.currentProcess}`}</p>
                {/* <p className="tracking-[1px] text-sm capitalize">{`Type: ${payload[0].payload.product.type}`}</p> */}
                <p className="tracking-[1px] text-sm">
                    {`Start: ${dateFormatter.format(start)}`}
                </p>
                <p className="tracking-[1px] text-sm">
                    {`End: ${dateFormatter.format(end)}`}
                </p>
            </div>
        )
    }

    return null;
}