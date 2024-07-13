import { ReactQueryTestProvider, render, screen } from "src/test";

import { ChatTextField } from ".";

describe("<ChatTextField />", () => {
  it("renders", () => {
    render(
      <ReactQueryTestProvider>
        <ChatTextField conversationId="1" onSentMessage={jest.fn()} />
      </ReactQueryTestProvider>
    );
    const textbox = screen.getByRole("textbox");
    expect(textbox).toBeInTheDocument();
  });
});
