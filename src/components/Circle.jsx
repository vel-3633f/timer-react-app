import { useMemo } from "react";

const Circle = ({ gauge }) => {
  const props = {
    color: "#FBBF24",
    r: 150,
    strokeWidth: 6,
    value: gauge,
  };

  const { color, r: outerR, strokeWidth, value } = props;

  /**
   * SVGのwidthとheightとなるサイズ
   */
  const size = useMemo(() => {
    return outerR * 2;
  }, [outerR]);

  /**
   * strokeWidthを考慮した半径
   */
  const r = useMemo(() => {
    return outerR - strokeWidth / 2;
  }, [outerR, strokeWidth]);

  /**
   * 円周
   */
  const circumference = useMemo(() => {
    return 2 * Math.PI * r;
  }, [r]);

  /**
   * 表示する円周の長さ
   */
  const dashoffset = useMemo(() => {
    return circumference * ((100 - value) / 100);
  }, [circumference, value]);

  const transitionStyle = useMemo(() => {
    return {
      strokeDashoffset: dashoffset,
      transition: "stroke-dashoffset 1000ms linear",
    };
  }, [dashoffset]);

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
        style={transitionStyle}
        transform={`rotate(-90 ${outerR} ${outerR})`}
      />
    </svg>
  );
};

export default Circle;
