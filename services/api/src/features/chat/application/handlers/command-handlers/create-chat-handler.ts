import { BadRequestException, NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";

import { CurrentOrganizationService } from "src/core/organizations";
import { CurrentProfileService } from "src/core/profiles";

import { ChatConversationService } from "../../../domain/services/chat-conversation.service";
import { ChatConversationMember } from "../../../infrastructure/entities/chat-conversation-member.entity";
import { ChatConversation } from "../../../infrastructure/entities/chat-conversation.entity";
import { CreateChatCommand } from "../../contracts/commands/create-chat.command";

@CommandHandler(CreateChatCommand)
export class CreateChatHandler implements ICommandHandler<
  CreateChatCommand,
  void
> {
  constructor(
    private readonly chatConversationService: ChatConversationService,
    private readonly currentOrganizationSerivce: CurrentOrganizationService,
    private readonly currentProfileService: CurrentProfileService,
  ) {}

  async execute(command: CreateChatCommand) {
    const currentOrganizationId =
      await this.currentOrganizationSerivce.fetchCurrentOrganizationId();

    const membersInAccess =
      await this.currentOrganizationSerivce.checkIfMembersInCurrentOrganization(
        command.profileIds,
      );

    if (!membersInAccess) {
      throw new NotFoundException("Profile not found in current organization");
    }

    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    if (command.profileIds.includes(currentProfileId)) {
      throw new BadRequestException("Cannot add current profile twice to chat");
    }

    const conversation = new ChatConversation();
    conversation.organizationId = currentOrganizationId;

    const profileIds = [currentProfileId, ...command.profileIds];

    conversation.members = profileIds.map((profileId) => {
      const member = new ChatConversationMember();
      member.conversation = conversation;
      member.profileId = profileId;
      return member;
    });

    await this.chatConversationService.createConversation(conversation);
  }
}
