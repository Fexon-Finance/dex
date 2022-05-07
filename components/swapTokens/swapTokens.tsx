import Image from 'next/image';

export function SwapTokens() {
  return (
    <div className="flex flex-col w-96 mx-auto bg-gray-900 rounded-xl p-4 space-y-8">
      <h2 className="text-xl font-bold uppercase text-gray-200">
        Swap
        {' '}
        <span className="text-yellow-600">BNB</span>
        {' '}
        for
        {' '}
        <span className="text-purple-600">EDDB</span>
      </h2>
      <div className="text-white">
        <div className="flex bg-black rounded-xl">
          <input type="number" id="bnb-amount" className="bg-black rounded-l-xl px-4 py-6 w-2/3" />
          <div className="w-1/3 my-auto">
            <div className="flex py-2 bg-gray-800 rounded-full justify-center mx-2">
              <Image src="/bnb-icon.svg" height={24} width={24} />
              <span className="ml-2 text-lg">BNB</span>
            </div>
          </div>
        </div>

      </div>

      <div className="text-white">
        <div className="flex bg-black rounded-xl w-full">
          <input type="number" id="eddb-amount" className="bg-black rounded-l-xl px-4 py-6 flex-1 focus:border-gray-800" />
          <div className="my-auto px-2">
            <div className="flex py-2 bg-gray-800 rounded-full justify-center px-4">
              <Image src="/bnb-icon.svg" height={24} width={24} />
              <span className="ml-2 text-lg">EDDB</span>
            </div>
          </div>
        </div>
      </div>

      <button type="button" onClick={() => {}} className="text-white font-medium rounded-xl py-3 bg-purple-800 hover:bg-purple-600">Swap</button>
    </div>
  );
}
