import { useMemo } from "react";

const Circle = ({ gauge}) => {
  const outerR = 150;
  const strokeWidth = 6;
  const color = "#FBBF24";
  /**
   * SVGのwidthとheightとなるサイズ
   */
  const size = useMemo(() => {
    return outerR * 2;
  }, []);

  /**
   * strokeWidthを考慮した半径
   */
  const r = useMemo(() => {
    return outerR - strokeWidth / 2;
  }, []);

  /**
   * 円周
   */
  const circumference = useMemo(() => {
    return 2 * Math.PI * r;
  }, []);

  const transitionStyle = useMemo(() => {
    return {
      strokeDashoffset: circumference * ((100 - gauge) / 100),
      transition: "stroke-dashoffset 1000ms linear",
      strokeLinecap: "round",
    };
  }, [gauge]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        r={r}
        cx={outerR}
        cy={outerR}
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        style={{ ...transitionStyle }}
        transform={`rotate(-90 ${outerR} ${outerR})`}
      />
    </svg>
  );
};

export default Circle;
