import * as React from 'react';

const ChevronUp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={12}
    height={7}
    viewBox="0 0 12 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 5.58344L6.00081 1L11 5.58344"
      stroke="#99928B"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ChevronUp;
