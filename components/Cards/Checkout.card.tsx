import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useEffect, useState } from "react";
import { truncateAddress } from "../../utils/truncateAddress";
import abi from "../../utils/BuyMeACoffee.json";
import { ethers } from "ethers";
import toast from "react-hot-toast";

declare global {
  interface Window {
    ethereum: any;
  }
}

const CheckoutCard: FC = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [amount, setAmount] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const contractAddress = "0x442C1134b6F3B57a39a02Eff26fDA5d005898113";
  const contractABI = abi.abi;
  const [isPolygon, setIsPolygon] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const buyCoffee = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const coffeeTxn = await buyMeACoffee.buyCoffee(
          name ? name : "anon",
          message ? message : "Enjoy your coffee!",
          { value: ethers.utils.parseEther(`${0.5 * amount!}`) }
        );

        await coffeeTxn.wait();

        setName("");
        setMessage("");
        closeModal();
        toast.success("Coffee purchased successfully! Thank you :)");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const defaultAmounts = [1, 2, 5];

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  if (typeof window !== "undefined") {
    useEffect(() => {
      if (window?.ethereum?.networkVersion === "137") {
        setIsPolygon(true);
      }
    }, [window?.ethereum?.networkVersion]);
  }

  return (
    <div className="z-50 mt-10 flex w-[90vw] flex-col items-center space-y-5 rounded-md bg-darkerBlue p-10 px-5 shadow-xl sm:w-[436px] sm:px-10">
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center backdrop-blur-sm">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leaveFrom="opacity-0 scale-95"
              leaveTo="opacity-100 scale-100"
            >
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-xl bg-darkerBlue p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="my-2 text-lg font-medium leading-6 text-white"
                >
                  Buy me a coffee
                </Dialog.Title>
                <form onSubmit={buyCoffee}>
                  <input
                    className="mt-4 w-full rounded-xl bg-white/10 bg-opacity-10 p-4 text-white outline-none backdrop-blur-2xl backdrop-filter focus-visible:ring-blue-500"
                    placeholder="Name"
                    onChange={onNameChange}
                  />

                  <input
                    className="mt-4 w-full rounded-xl bg-white/10 bg-opacity-10 p-4 text-white outline-none backdrop-blur-2xl backdrop-filter focus-visible:ring-blue-500"
                    placeholder="Message"
                    onChange={onMessageChange}
                  />

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-xl border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      {loading ? (
                        <div
                          style={{ borderTopColor: "transparent" }}
                          className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-darkerBlue group-hover:border-accent"
                          role="status"
                        />
                      ) : (
                        <span>Buy ☕</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>{" "}
          </div>
        </Dialog>
      </Transition>
      <h2 className="font-ClashDisplay text-2xl font-semibold text-accent">
        Love what I do? Feel free to support me with a donation!
      </h2>
      <div className="group flex w-full items-center rounded-lg bg-[#E9F9FA]/30 text-white focus:outline-none">
        <p className="rounded-l-lg bg-[#E7EAEA]/80 px-4 py-3 text-lg uppercase text-black opacity-80 transition duration-200 group-hover:opacity-100">
          ☕
        </p>
        <input
          type="number"
          value={amount ? amount : ""}
          className="w-full rounded-lg bg-transparent px-4 py-3 text-white opacity-80 transition duration-200 focus:outline-none group-hover:opacity-100"
          placeholder="Enter Amount"
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
      </div>
      <div className="flex w-full items-center space-x-2">
        {defaultAmounts.map((buttonAmount) => (
          <button
            className={`${
              amount === buttonAmount ? "bg-accent" : "bg-[#E7EAEA]/80"
            }  rounded-full px-6 py-3 opacity-90 transition duration-200 hover:opacity-100`}
            onClick={() => setAmount(buttonAmount)}
            key={buttonAmount}
          >
            ☕ {buttonAmount}
          </button>
        ))}
      </div>
      <p className="text-[#E3E3E3]">1 coffee = 0.5 matic</p>
      <button
        onClick={() => {
          currentAccount
            ? navigator.clipboard.writeText(currentAccount)
            : connectWallet();
        }}
        className="group mt-4 flex w-full items-center justify-center rounded-lg border-2 border-accent bg-accent px-6 py-3 text-xl font-semibold transition duration-200 hover:border-accent hover:bg-transparent hover:text-accent"
      >
        {currentAccount ? (
          <span>
            {isPolygon
              ? truncateAddress(currentAccount)
              : "Please switch network to polygon"}
          </span>
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <button
        disabled={!currentAccount || window?.ethereum?.networkVersion !== "137"}
        onClick={openModal}
        role="link"
        className={`group mt-4 flex w-full items-center justify-center rounded-lg border-2 border-accent bg-transparent px-6 py-3 text-xl font-semibold text-accent transition duration-200 hover:border-accent hover:bg-accent hover:text-black
        ${
          !currentAccount ||
          (window?.ethereum?.networkVersion !== "137" &&
            "cursor-not-allowed opacity-50")
        }`}
      >
        {loading ? (
          <div
            style={{ borderTopColor: "transparent" }}
            className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-darkerBlue group-hover:border-accent"
            role="status"
          />
        ) : (
          <span>Sponsor</span>
        )}
      </button>
    </div>
  );
};

export default CheckoutCard;
