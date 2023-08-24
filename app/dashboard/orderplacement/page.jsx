"use client";
import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

const OrderPlacement = () => {
  const [foodData, setFoodData] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});
  const [orderSummary, setOrderSummary] = useState([]);
  const [ordertrackinginfo, setOrdertrackinginfo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://64e360ccbac46e480e78b1c3.mockapi.io/api/food-management-systems/food-management-systems"
        );
        const data = await response.json();
        setFoodData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleCancelOrder = () => {
    setOrderSummary([]);
    setItemQuantities({});
    setOrdertrackinginfo("");
  };

  const handleIncreaseQuantity = (itemId) => {
    setItemQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 0) + 1,
    }));

    const selectedItem = foodData.find((item) => item.id === itemId);

    setOrderSummary((prevSummary) => {
      const existingItem = prevSummary.find((item) => item.id === itemId);
      if (existingItem) {
        return prevSummary.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevSummary, { ...selectedItem, quantity: 1 }];
      }
    });
  };

  const filteredFoodData = foodData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDecreaseQuantity = (itemId) => {
    if (itemQuantities[itemId] > 0) {
      setItemQuantities((prevQuantities) => ({
        ...prevQuantities,
        [itemId]: prevQuantities[itemId] - 1,
      }));

      setOrderSummary((prevSummary) => {
        const existingItem = prevSummary.find((item) => item.id === itemId);
        if (existingItem) {
          return prevSummary.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
          );
        } else {
          return prevSummary;
        }
      });
    }
  };

  const handleOrderNow = (itemId) => {
    handleIncreaseQuantity(itemId);
  };

  const totalOrderPrice = orderSummary.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const handleCancelItem = (itemId) => {
    setOrderSummary((prevSummary) =>
      prevSummary.filter((item) => item.id !== itemId)
    );

    setItemQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[itemId];
      return updatedQuantities;
    });
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      items: orderSummary.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        name: item.name,
      })),
      total: orderSummary.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      ordertrackinginfo: ordertrackinginfo,
    };

    

    try {
      const response = await fetch(
        "https://64e360ccbac46e480e78b1c3.mockapi.io/api/food-management-systems/food-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (response.ok) {
        enqueueSnackbar("Order placed successfully!", {
          variant: "success",
        });
        // You can also reset the order summary or perform any other actions here.
      } else {
        console.error("Error placing order:", response.statusText);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="mt-5 lg:ml-72 ">
      <p className="text-center text-4xl font-bold mb-4">Order Your Food </p>
      <div>
        <input
          type="text"
          placeholder="Search by food name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-2 py-1 rounded-md border w-full mb-10"
        />
      </div>
      <div className="flex flex-col lg:flex-row gap-10 ">
        <div className="grid grid-cols-1  xl:grid-cols-2  2xl:grid-cols-3 gap-10 ">
          {isLoading ? (
          <p>Loading...</p>
        ) : (
            filteredFoodData.map((item) => (
              <div key={item.id} className="rounded-xl shadow-xl ">
                {item.image && (
                  <Image
                    className="rounded-t-xl w-[350px] h-[250px]"
                    src={item.image}
                    width={300}
                    height={300}
                    alt=""
                  />
                )}
                <div className="pt-2 px-2 pb-4">
                  <div className="mt-4 flex justify-between text-[20px] ">
                    <p className=" font-semibold">{item.name}</p>
                    <p>
                      <span className="font-semibold">$</span>
                      {item.price}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleOrderNow(item.id)}
                      className="px-8 py-4  rounded-lg mt-4 font-semibold order-btn"
                    >
                      Order Now
                    </button>
                    <div className="lg:flex gap-[30px] lg:mt-[30px] mt-4 items-center">
                      <div className="flex gap-4 items-center mt-4 lg:mt-0">
                        <div className="flex border items-center px-5 py-3 justify-between rounded-[30px] w-[120px]">
                          <button
                            onClick={() => handleDecreaseQuantity(item.id)}
                            className="text-lg"
                          >
                            -
                          </button>
                          <p className="text-lg">
                            {itemQuantities[item.id] || 0}
                          </p>
                          <button
                            onClick={() => handleIncreaseQuantity(item.id)}
                            className="text-lg"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )))}
        </div>
        <div >
          <p className="text-2xl mb-3 font-semibold"> Order Summary</p>
          <div className="bg-[#F3F3F6] pt-4 px-10 w-96 py-4">
            <div className="flex justify-between pb-6 items-center border-b-2 border-3">
              <p>Item name</p>
              <p>Quantity</p>
              <p>Price</p>
            </div>
            <div>
              {orderSummary.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b py-4"
                >
                  <p>{item.name}</p>
                  <p>{item.quantity}</p>
                  <p>{item.price * item.quantity}</p>
                </div>
              ))}
              <div className="flex justify-between pt-4">
                <p className="text-xl font-semibold">Total</p>
                <p className="text-xl font-semibold">${totalOrderPrice}</p>
              </div>

              <div className="my-4">
                <input
                  type="text"
                  placeholder="Order Tracking"
                  onChange={(e) => setOrdertrackinginfo(e.target.value)}
                  value={ordertrackinginfo}
                  className="px-2 py-3 rounded-md border"
                />
              </div>
              <div className="flex justify-between my-4">
                <button
                  onClick={handlePlaceOrder}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Place Order
                </button>
              
                  <button
                  
                    onClick={handleCancelOrder}// Add this line
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Cancel Order
                  </button>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacement;
