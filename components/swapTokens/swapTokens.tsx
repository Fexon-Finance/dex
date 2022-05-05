export function SwapTokens() {
  return (
    <div className="flex flex-col w-96 mx-auto bg-gray-700 rounded-xl p-4 space-y-8">
      <h2 className="text-xl font-medium uppercase text-white">
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
          <input id="bnb-amount" className="bg-black rounded-l-xl p-4 w-full" />
          <div className="my-auto px-4">
            <span className="px-3 py-2 bg-gray-500 rounded-full">BNB</span>
          </div>
        </div>

      </div>

      <div className="text-white">
        <div className="flex bg-black rounded-xl">
          <input id="eddb-amount" className="bg-black rounded-l-xl p-4 w-full" />
          <div className="my-auto px-4">
            <span className="px-3 py-2 bg-gray-500 rounded-full">EDDB</span>
          </div>
        </div>
      </div>

      <button type="button" onClick={() => {}} className="text-white font-medium rounded-xl bg-black py-3">Swap</button>
    </div>
  );
}
