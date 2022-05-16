/* eslint-disable react/jsx-no-bind */
import {
  ChainId,
  useAddress,
  useCoinbaseWallet,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
  useWalletConnect,
} from '@thirdweb-dev/react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

export function ConnectWallet() {
  const [ isOpen, setIsOpen ] = useState(false);

  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const isMismatched = useNetworkMismatch();
  const network = useNetwork();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (address && !isMismatched) closeModal();
  });

  const addr = `${address?.slice(0, 5)}...${address?.slice(-5)}`;

  return (
    <>
      {address ? (
        <p className="text-white text-sm">
          {addr}
        </p>
      ) : (
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-base rounded-xl text-white border-2 border-indigo-500"
        >
          Connect Wallet
        </button>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white flex justify-between"
                  >
                    {isMismatched ? 'Wrong network!' : 'Connect Wallet'}
                    <button type="button" onClick={closeModal} className="font-lg mr-1">x</button>
                  </Dialog.Title>

                  <div className="mt-4 flex flex-col space-y-2">
                    {isMismatched ? (
                      <button
                        type="button"
                        disabled={ChainId.BSC === network[0].data.chain?.id}
                        key={ChainId.BSC}
                        onClick={async () => network[1]?.(ChainId.BSC)}
                        className="px-4 py-2 text-base rounded-xl text-white border-2 border-indigo-500 bg-indigo-500"
                      >
                        Switch to Binance Smart Chain
                      </button>
                    ) : (
                      <>
                        <button type="button" onClick={connectWithMetamask} className="px-4 py-2 text-base rounded-xl text-white border-2 border-indigo-500 hover:bg-indigo-600">Metamask</button>
                        <button type="button" onClick={connectWithCoinbaseWallet} className="px-4 py-2 text-base rounded-xl text-white border-2 border-indigo-500 hover:bg-indigo-600">Coinbase Wallet</button>
                        <button type="button" onClick={connectWithWalletConnect} className="px-4 py-2 text-base rounded-xl text-white border-2 border-indigo-500 hover:bg-indigo-600">WalletConnect</button>
                      </>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

