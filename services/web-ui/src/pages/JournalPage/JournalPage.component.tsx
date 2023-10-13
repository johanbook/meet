import { ReactElement } from "react";

import { List, ListItem, ListItemText } from "@mui/material";

import { JournalEntryDetails } from "src/api";
import { format } from "src/utils/string";

interface JournalPageComponentProps {
  data: JournalEntryDetails[];
}

export function JournalPageComponent({
  data,
}: JournalPageComponentProps): ReactElement {
  return (
    <List>
      {data.map((element) => (
        <ListItem>
          <ListItemText
            primary={format(element.commandName)}
            secondary={element.created.toLocaleString()}
          />
        </ListItem>
      ))}
    </List>
  );
}
