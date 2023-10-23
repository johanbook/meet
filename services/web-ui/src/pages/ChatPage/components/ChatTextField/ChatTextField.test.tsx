import { ReactQueryTestProvider, render, screen } from "src/test";

import { ChatTextField } from ".";

describe("<ChatTextField />", () => {
  it("renders", () => {
    render(
      <ReactQueryTestProvider>
        <ChatTextField onSentMessage={jest.fn()} receiverProfileId={1} />
      </ReactQueryTestProvider>
    );
    const textbox = screen.getByRole("textbox");
    expect(textbox).toBeInTheDocument();
  });
});
