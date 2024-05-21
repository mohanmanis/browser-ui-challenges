import { useEffect, useState, useMemo } from "react";
import { getData } from "../data";

const Bar = ({
  name,
  ticketCount,
  colour: backgroundColor,
  maxTicketCount,
}) => {
  const height = `${(ticketCount / maxTicketCount) * 100}%`;
  return (
    <div
      className="bar"
      style={{ height, backgroundColor }}
      title={`${name} ${ticketCount}`}
    />
  );
};

export const BarChart = ({}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setData(data);
    };
    fetchData();
  }, []);

  const maxTicketCount = useMemo(
    () => Math.max(...(data || [])?.map(({ ticketCount }) => ticketCount)),
    [data]
  );

  return (
    <div className="container">
      <div className="bar-chart">
        {data.map(({ id, ...rest }) => (
          <Bar key={id} {...rest} maxTicketCount={maxTicketCount} />
        ))}
      </div>
    </div>
  );
};
