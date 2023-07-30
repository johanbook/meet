# Testing

The software system comes with an opinionated framework for testing of both
backend and frontend. For frontend, DOM testing is utilized.

## Guide

### Backend

In the backend, the recommendation is to test all command handlers and
non-trivial query handlers. This should also cover testing of domain services. A
test might look something like this:

```ts
import { Repository } from "typeorm";

import { createMockRepository } from "src/test/mocks/repository.mock";

import { MonkeyService } from "../../domain/services/monkey.service";
import { Monkey } from "../../infrastructure/entities/monkey.entity";
import { CreateMonkeyHandler } from "./create-monkey.handler";

describe(CreateMonkeyHandler.name, () => {
  let monkeyService: MonkeyService;
  let commandHandler: CreateMonkeyHandler;
  let monkies: Repository<Monkey>;

  beforeEach(() => {
    monkies = createMockRepository<Monkey>();
    monkeyService = new MonkeyService(monkies);
    commandHandler = new CreateMonkeyHandler(monkeyService);
  });

  describe("can create monkey", () => {
    it("should save changes", async () => {
      await commandHandler.execute();

      expect(monkies.save).toHaveBeenCalled();
    });
  });
});
```

### Frontend

In the frontend, components should have tests where needed due to DOM-testing
being resource-heavy. A test can be written as below:

```tsx
import { render, screen } from "src/test";

import { Button } from ".";

describe("<Button />", () => {
  it("renders", () => {
    render(<Button>my-text</Button>);
    const text = screen.getByText(/my-text/);
    expect(text).toBeInTheDocument();
  });
});
```

### Coverage

Coverage is calculated for test runs and each service has a required minimum
coverage threshold. These thresholds should not be set in stone, but adjusted
after need. They should serve as a guard for not forgetting to write tests.
