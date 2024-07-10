# Photos

There is builtin support for photos where metadata is stored in the database and
photos are stored in the database.

To utilize the builtin photo support, add a new entity like below:

```ts
import { BasePhoto } from "src/core/photos";

@Entity()
export class ChatConversationPhoto extends BasePhoto {
  @OneToOne(() => ChatConversation, (conversation) => conversation.photo, {
    onDelete: "CASCADE",
  })
  conversation!: ChatConversation;

  @Column()
  conversationId!: string;
}
```
