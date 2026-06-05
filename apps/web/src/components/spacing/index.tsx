/**
 * 간격 컴포넌트
 *
 * @param {number} size - Y축 간격 (px)
 * @example
 * <Spacing size={8} />
 */
function Spacing({ size }: { size: number }) {
  return <div style={{ height: `${size}px`, flexShrink: 0 }} />;
}

export default Spacing;
