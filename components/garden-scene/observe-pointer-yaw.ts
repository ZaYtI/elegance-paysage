const MAX_YAW_OFFSET = 0.25;

export function observePointerYaw(element: HTMLElement, onYaw: (yaw: number) => void): () => void {
  const handleMove = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    const bounds = element.getBoundingClientRect();
    onYaw(((event.clientX - bounds.left) / bounds.width - 0.5) * MAX_YAW_OFFSET);
  };
  const handleLeave = () => onYaw(0);

  element.addEventListener("pointermove", handleMove);
  element.addEventListener("pointerleave", handleLeave);

  return () => {
    element.removeEventListener("pointermove", handleMove);
    element.removeEventListener("pointerleave", handleLeave);
  };
}
