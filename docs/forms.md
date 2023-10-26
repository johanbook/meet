# Forms

## Guide

Forms are built using the `useForm` hook that handles validation and tracking
touch state out of the box.

In most cases, one form is built around one API call. For these cases, it is
recommended the follow the approach as below:

```tsx
import { ReactElement, SyntheticEvent } from "react";

import { CreateBlogPostCommentCommand } from "src/api";
import { useForm } from "src/core/forms";

export function MonkeyComponent(): ReactElement {
  const form = useForm<CreateBlogPostCommentCommand>({
    content: "",
  });

  function handleSubmit(): void {
    const { data } = form.validate();
    console.log("Submitted form with data:", data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        error={form.state.content.error}
        onBlur={() => form.validate(["content"])}
        onChange={(content) => form.setState({ content })}
        value={form.state.content.value}
      />

      <Button disabled={!form.isValid} type="submit">
        Submit
      </Button>
    </form>
  );
}
```

## Nested forms

For nested or dynamics forms, one will have to write bespoke logic.
