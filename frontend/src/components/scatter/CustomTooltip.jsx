export default function CustomTooltip({ active, payload, label, hoveredHeatNo }) {
    if (active && payload && payload.length && hoveredHeatNo) {
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
        const isMC = payload[0].payload.currentProcess.split(" ")[0] === "MC";

        return (
            <div className="custom-tooltip container border border-slate-400 rounded p-1 bg-slate-100 font-bold text-xs mt-5 ml-1">
                <p className="tracking-[1px]">{`Heat No : ${payload[0].payload.heatNo}`}</p>
                <p className="tracking-[1px]">{`Stage : ${payload[0].payload.currentProcess}`}</p>
                <p className="tracking-[1px]">
                    {`Start: ${dateFormatter.format(start)}`}
                </p>
                <p className="tracking-[1px]">
                    {`End: ${dateFormatter.format(end)}`}
                </p>
                <p className="tracking-[1px]">{`Grade : ${payload[0].payload.grade}`}</p>
                {isMC && payload[0].payload.tundishNo ?
                    <p className="tracking-[1px]">{`Tundish No : ${payload[0].payload.tundishNo}`}</p> : ''}
                {isMC && payload[0].payload.tundishLife ?
                    <p className="tracking-[1px]">{`Tundish Life : ${payload[0].payload.tundishLife}`}</p> : ''}
                {isMC && payload[0].payload.mouldNo ?
                    <p className="tracking-[1px]">{`Mould No : ${payload[0].payload.mouldNo}`}</p> : ''}
                {isMC && payload[0].payload.mouldLife ?
                    <p className="tracking-[1px]">{`Mould Life : ${payload[0].payload.mouldLife}`}</p> : ''}
                <p className="tracking-[1px]">{`Status : ${payload[0].payload.status}`}</p>
            </div>
        )
    }

    return null;
}