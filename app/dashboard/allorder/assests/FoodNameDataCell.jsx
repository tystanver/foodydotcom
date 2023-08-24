"use client"
const FoodNameDataCell = ({ instance }) => {
    if (!instance?.items || instance.items.length === 0) {
      return <p>No data available</p>;
    }
  
    return (
      <div>
        {instance.items.map((item, idx) => (
          <p className="py-2 text-[15px] " key={idx}>{item?.name}</p>
        ))}
      </div>
    );
  };
  
  export default FoodNameDataCell;

