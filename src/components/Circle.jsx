import { useMemo, useEffect, useState } from "react";

const Circle = ({ gauge, isDisp }) => {
  const outerR = 150;
  const strokeWidth = 6;
  const color = "#FBBF24";

  // SVGのwidthとheightとなるサイズ
  const size = useMemo(() => outerR * 2, []);

  // strokeWidthを考慮した半径
  const r = useMemo(() => outerR - strokeWidth / 2, []);

  // 円周
  const circumference = useMemo(() => 2 * Math.PI * r, []);

  // 表示する円周の長さ
  const dashoffset = useMemo(
    () => circumference * ((100 - gauge) / 100),
    [gauge]
  );

  const [initialDashOffset, setInitialDashOffset] = useState(circumference);

  useEffect(() => {
    // ゲージが変更されたときに初期のstrokeDashoffsetを設定
    setInitialDashOffset(circumference);
  }, [circumference]);

  useEffect(() => {
    // isDisp が変更されたらアニメーションなしで直接目標の値に設定
    if (!isDisp) {
      setInitialDashOffset(circumference);
    }
  }, [isDisp, circumference]);

  const transitionStyle = useMemo(() => {
    return {
      strokeDashoffset: isDisp ? dashoffset : initialDashOffset,
      transition: isDisp ? "stroke-dashoffset 1000ms linear" : "none",
      strokeLinecap: "round",
    };
  }, [dashoffset, initialDashOffset, isDisp]);

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
