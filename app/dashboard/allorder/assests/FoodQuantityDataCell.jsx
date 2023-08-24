"use client"
const FoodQuantityDataCell = ({ instance }) => {
    // console.log(instance)
    if (!instance?.items || instance.items.length === 0) {
      return <p>No data available</p>;
    }
  
    return (
      <div>
        {instance.items.map((item, idx) => (
          <p className="py-2 ml-6" key={idx}>{item?.quantity}</p>
        ))}
      </div>
    );
  };
  
  export default FoodQuantityDataCell;