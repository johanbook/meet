import { faker } from "@faker-js/faker";
import { Meta, StoryObj } from "@storybook/react-vite";

import LineChartMini from ".";

faker.seed(0);

export default {
  title: "Core/Charts/LineChartMini",
  component: LineChartMini,
  decorators: [
    (Story) => (
      <div className="m-2 max-w-[200px] rounded-md border">
        <Story />
      </div>
    ),
  ],
} as Meta;

type Story = StoryObj<typeof LineChartMini>;

const START_DATE = new Date("2020-01-01");
const END_DATE = new Date("2023-03-20");

const generateDataPoints = (
  from: Date,
  to: Date,
  min: number,
  max: number,
  count: number,
) => {
  const dates = [];

  for (let index = 0; index < count; index++) {
    const time =
      from.getTime() + (index * (to.getTime() - from.getTime())) / count;

    dates.push({
      date: new Date(time).toISOString(),
      value: faker.number.int({ min, max }),
    });
  }

  return dates;
};

const DATA = generateDataPoints(START_DATE, END_DATE, 0, 10, 10);

export const Default: Story = {
  args: {
    data: DATA,
    height: 100,
  },
};
