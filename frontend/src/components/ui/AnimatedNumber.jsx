import { useEffect, useState } from "react";

const AnimatedNumber = ({
  value,
  duration = 2000,
  prefix = "",
  suffix = "",
}) => {
  const [displayValue, setDisplayValue] = useState(0);

useEffect(() => {
  const startTime = performance.now();
  const endValue = Number(value);

  // Duration scales with number magnitude
  const dynamicDuration = Math.min(
    2500,
    Math.max(800, Math.log10(endValue + 1) * 600)
  );

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / dynamicDuration, 1);

    const currentValue = progress * endValue;
    setDisplayValue(currentValue);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
}, [value]);

 return (
  <span>
    {prefix}
    {Number(displayValue).toLocaleString(undefined, {
      minimumFractionDigits: value % 1 !== 0 ? 1 : 0,
      maximumFractionDigits: value % 1 !== 0 ? 1 : 0,
    })}
    {suffix}
  </span>
);
};

export default AnimatedNumber;
