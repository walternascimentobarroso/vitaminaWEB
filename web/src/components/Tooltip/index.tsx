import { FC, ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
  tooltip?: string;
  direction?: "top" | "bottom";
}

const Tooltip: FC<Props> = ({
  children,
  tooltip,
  direction = "top",
}): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { height } = container.current.getBoundingClientRect();
        let halfHeight = height / 2;
        tooltipRef.current.style.top =
          direction === "top" ? `-${halfHeight}px` : `${height + halfHeight}px`;
      }}
      className="group relative inline-block"
    >
      {children}
      {tooltip ? (
        <span
          ref={tooltipRef}
          className="
          invisible group-hover:visible opacity-0 group-hover:opacity-100
          bg-blue-500 text-white py-1 px-4 rounded absolute top-full whitespace-nowrap
          top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          dark:bg-gray-900 dark:text-white"
        >
          <span className="relative z-10">{tooltip}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-blue-500 dark:text-gray-900 absolute rotate-45 -translate-x-1/2 left-1/2 fill-current"
            style={direction === "top" ? { top: "18px" } : { top: "-7px" }}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"></path>
          </svg>
        </span>
      ) : null}
    </div>
  );
};

export default Tooltip;
