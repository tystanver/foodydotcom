
"use client"
const OrderTrackingDataCell = ({ instance }) => {
  const getStatusBackgroundColor = (status) =>
    status === 'Confirmed'
      ? 'green'
      : status === 'Preparing'
      ? 'orange'
      : status === 'Ready'
      ? 'gray'
      : status === 'Delivered'
      ? 'red'
      : ''; // Default color if status is not recognized

  const backgroundColor = getStatusBackgroundColor(instance?.ordertrackinginfo);

  return (
    <div>
      <p
        className="py-2 ml-6 px-4 m-2 rounded-lg font-semibold"
        style={{ backgroundColor: backgroundColor, color: 'white' }}
      >
        {instance?.ordertrackinginfo}
      </p>
    </div>
  );
};

export default OrderTrackingDataCell;

