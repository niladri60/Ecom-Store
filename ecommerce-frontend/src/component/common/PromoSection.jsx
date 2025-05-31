const PromoSection = () => {
  return (
    <section className="bg-white px-4 py-8 antialiased md:py-16">
      <div className="mx-auto grid max-w-screen-xl rounded-xl bg-gray-00 p-4 md:p-8 lg:grid-cols-12 lg:gap-8 lg:p-16 xl:gap-16">
        <div className="lg:col-span-5 lg:mt-0">
          <a href="#">
            <img
              className="mb-4 h-56 w-56 dark:hidden sm:h-96 sm:w-96 md:h-full md:w-full"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-components.svg"
              alt="peripherals"
            />
            <img
              className="mb-4 hidden dark:block md:h-full"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-components-dark.svg"
              alt="peripherals"
            />
          </a>
        </div>
        <div className="me-auto place-self-center lg:col-span-7">
          <h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
            Save $500 today on your purchase <br />
            of a new iMac computer.
          </h1>
          <p className="mb-6 text-gray-600">
            Reserve your new Apple iMac 27” today and enjoy exclusive savings
            with qualified activation. Pre-order now to secure your discount.
          </p>
          <a
            href="#"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
          >
            {" "}
            Pre-order now{" "}
          </a>
        </div>
      </div>
    </section>
  );
}

export default PromoSection