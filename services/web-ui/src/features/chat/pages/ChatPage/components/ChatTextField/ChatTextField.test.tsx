import {
  ReactQueryTestProvider,
  describe,
  expect,
  it,
  render,
  screen,
  vi,
} from "src/test";

import { ChatTextField } from ".";

describe("<ChatTextField />", () => {
  it("renders", () => {
    render(
      <ReactQueryTestProvider>
        <ChatTextField conversationId="1" onSentMessage={vi.fn()} />
      </ReactQueryTestProvider>,
    );
    const textbox = screen.getByRole("textbox");
    expect(textbox).toBeInTheDocument();
  });
});
