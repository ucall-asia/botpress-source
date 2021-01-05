import { Table } from 'core/database/interfaces'

export class MessagesTable extends Table {
  readonly name: string = 'messages'

  async bootstrap() {
    let created = false

    await this.knex.createTableIfNotExists(this.name, table => {
      table.string('id').primary()
      table.integer('conversationId')
      table.string('incomingEventId')
      table.string('eventId')
      table.string('userId')
      table.jsonb('payload')
      table.string('full_name')
      table.string('avatar_url')
      table.timestamp('sent_on')
      table.index(['conversationId', 'sent_on'], 'wmcs_idx')
      created = true
    })
    await this.knex.raw(
      `CREATE INDEX IF NOT EXISTS wmcms_idx ON web_messages ("conversationId", message_type, sent_on DESC) WHERE message_type != 'visit';`
    )
    return created
  }
}
