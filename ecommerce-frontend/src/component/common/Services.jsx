import { Box } from "@mui/material";

const Services = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="text-center md:text-start mx-8 grid grid-cols-1 lg:grid-cols-3 md:gap-20">
        <Box className="flex max-w-xs gap-6 items-center justify-center flex-col bg-white px-4 py-8">
          {/* ICON */}
          <svg
            width="81"
            height="80"
            viewBox="0 0 81 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.3"
              d="M80.5 40C80.5 62.0914 62.5914 80 40.5 80C18.4086 80 0.5 62.0914 0.5 40C0.5 17.9086 18.4086 0 40.5 0C62.5914 0 80.5 17.9086 80.5 40ZM11.4071 40C11.4071 56.0675 24.4325 69.0929 40.5 69.0929C56.5675 69.0929 69.5929 56.0675 69.5929 40C69.5929 23.9325 56.5675 10.9071 40.5 10.9071C24.4325 10.9071 11.4071 23.9325 11.4071 40Z"
              fill="#2F2E30"
            />
            <circle cx="40.5" cy="40" r="29" fill="black" />
            {/* clipped content */}
            {/* You can keep or remove it based on your SVG size */}
          </svg>

          {/* TITLE */}
          <div className="font-bold text-xl">Fast Delivery</div>

          {/* DESCRIPTION */}
          <p className="text-base">Get your order delivered within 24 hours.</p>
        </Box>
      </div>
    </div>
  );
};

export default Services;
