import { ethers } from "ethers";
import { useEffect, useState } from "react";
import abi from "../utils/BuyMeACoffee.json";

const Sponsors = () => {
  const contractAddress = "0x442C1134b6F3B57a39a02Eff26fDA5d005898113";
  const contractABI = abi.abi;
  const [memos, setMemos] = useState([]);

  const getMemos = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const memos = await buyMeACoffee.getMemos();
        setMemos(memos);
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let buyMeACoffee;
    getMemos();

    // Create an event handler function for when someone sends
    // us a new memo.
    const onNewMemo = (from, timestamp, name, message) => {
      setMemos((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message,
          name,
        },
      ]);
    };

    const { ethereum } = window;

    // Listen for new memo events.
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();
      buyMeACoffee = new ethers.Contract(contractAddress, contractABI, signer);

      buyMeACoffee.on("NewMemo", onNewMemo);
    }

    return () => {
      if (buyMeACoffee) {
        buyMeACoffee.off("NewMemo", onNewMemo);
      }
    };
  }, []);

  function timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const time = date + " " + month + " " + year + " " + hour + ":" + min;
    return time;
  }

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center text-white">
      <h1 className="my-5 text-4xl font-semibold text-accent">
        Coffees received
      </h1>

      <div className="flex flex-col gap-5">
        {memos.map((memo, idx) => (
          <div key={idx} className="border-[1px] border-accent px-3">
            <p>"{memo.message}"</p>
            <p>
              From: {memo.name} at {timeConverter(memo.timestamp)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
