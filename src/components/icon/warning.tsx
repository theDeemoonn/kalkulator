import * as React from 'react';

const Warning = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 8.75006V5.0121M8 11.5207V11.5535M12.7249 14.6667H3.27506C1.98425 14.6667 0.894936 13.8136 0.552211 12.6465C0.40591 12.1482 0.585674 11.6293 0.860632 11.1874L5.58557 2.66756C6.69258 0.888643 9.30742 0.888646 10.4144 2.66756L15.1394 11.1874C15.4143 11.6293 15.5941 12.1482 15.4478 12.6465C15.1051 13.8136 14.0157 14.6667 12.7249 14.6667Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Warning;
