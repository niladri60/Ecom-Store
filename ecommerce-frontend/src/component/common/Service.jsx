import React from 'react';

const Service = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-24 sm:px-2 sm:py-32 lg:px-4">
        <div className="max-w-2xl mx-auto px-4 grid grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-3">
          
          {/* Free Shipping */}
          <div className="text-center sm:flex sm:text-left lg:block lg:text-center">
            <div className="sm:flex-shrink-0">
              <div className="flow-root">
                <img
                  className="w-25 h-24 mx-auto"
                  src="https://cdn-icons-png.flaticon.com/512/10203/10203722.png"
                  alt="Free Shipping"
                />
              </div>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3 lg:mt-3 lg:ml-0">
              <h3 className="text-sm font-medium text-gray-900">Free Shipping</h3>
              <p className="mt-2 text-sm text-gray-500">
                It's not actually free; we just price it into the products. Someone's paying for it, and it's not us.
              </p>
            </div>
          </div>

          {/* 24/7 Customer Support */}
          <div className="text-center sm:flex sm:text-left lg:block lg:text-center">
            <div className="sm:flex-shrink-0">
              <div className="flow-root">
                <img
                  className="w-25 h-25 mx-auto"
                  src="https://cdn-icons-png.flaticon.com/512/8898/8898827.png"
                  alt="Customer Support"
                />
              </div>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3 lg:mt-3 lg:ml-0">
              <h3 className="text-sm font-medium text-gray-900">24/7 Customer Support</h3>
              <p className="mt-2 text-sm text-gray-500">
                Our AI chat widget is powered by a naive series of if/else statements. Guaranteed to irritate.
              </p>
            </div>
          </div>

          {/* Fast Shopping Cart */}
          <div className="text-center sm:flex sm:text-left lg:block lg:text-center">
            <div className="sm:flex-shrink-0">
              <div className="flow-root">
                <img
                  className="w-25 h-25 mx-auto"
                  src="https://cdn-icons-png.flaticon.com/512/9298/9298151.png"
                  alt="Fast Shopping Cart"
                />
              </div>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3 lg:mt-3 lg:ml-0">
              <h3 className="text-sm font-medium text-gray-900">Fast Shopping Cart</h3>
              <p className="mt-2 text-sm text-gray-500">
                Look how fast that cart is going. What does this mean for the actual experience? I don't know.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Service;
