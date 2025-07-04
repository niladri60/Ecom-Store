const BannerOffer = () => {
  return (
    <div className="p-10 py-12 bg-white text-blue-600">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <h2 className="text-center text-6xl tracking-tighter font-bold">
            Up to
            <br className="sm:hidden" />
            50% Off
          </h2>
          <div className="space-x-2 text-center py-2 lg:py-0">
            <span>Plus free shipping! Use code:</span>
            <span className="font-bold text-lg">NILCODE</span>
          </div>
          <a
            href="#"
            rel="noreferrer noopener"
            className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block bg-gray-50 text-blue-600 border-gray-400"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default BannerOffer