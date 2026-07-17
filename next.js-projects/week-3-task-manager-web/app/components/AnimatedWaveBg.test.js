import { render } from "@testing-library/react";
import AnimatedWaveBg from "./AnimatedWaveBg";

describe("AnimatedWaveBg", () => {
  it("renders without crashing", () => {
    const { container } = render(<AnimatedWaveBg />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders four animated blob layers plus the gradient overlay", () => {
    const { container } = render(<AnimatedWaveBg />);
    const layers = container.firstChild.children;
    expect(layers.length).toBe(6);
  });
});