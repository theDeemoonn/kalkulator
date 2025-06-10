import * as React from 'react';

const EmailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.90625 5.625L9.46637 9.61688C9.78741 9.84737 10.2126 9.84737 10.5336 9.61688L16.0938 5.625M4.375 15.8333H15.625C16.6605 15.8333 17.5 14.9628 17.5 13.8889V6.11111C17.5 5.03722 16.6605 4.16667 15.625 4.16667H4.375C3.33947 4.16667 2.5 5.03722 2.5 6.11111V13.8889C2.5 14.9628 3.33947 15.8333 4.375 15.8333Z"
      stroke="#D1C8BF"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default EmailIcon;
