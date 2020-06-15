import React from 'react'
import { Avatar, Tooltip, Typography } from 'antd'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Guild } from '../../types'
import { getEmployeeLink, getGuildLink } from '../../paths'
import Technologies from './Technologies'
import { CardWrapper, CardHeader, GuildTitle } from './styled'

interface Props {
  guild: Guild
  style?: any
}

function GuildCard({ guild, style, history }: Props & RouteComponentProps) {
  return (
    <CardWrapper style={style}>
      <CardHeader>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <GuildTitle onClick={() => history.push(getGuildLink(guild.azureDisplayName))}>
            {guild.title}
          </GuildTitle>
          <span style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.45)' }}>
            {guild.azureDisplayName}
          </span>
        </div>
        <div style={{ display: 'flex' }}>
          {guild.leaders.map(lead => (
            <Tooltip key={lead.id} placement="bottom" title={lead.name}>
              <div
                onClick={() => history.push(getEmployeeLink(lead.email))}
                style={{ cursor: 'pointer', marginLeft: '8px' }}
              >
                <Avatar src={lead.avatar} shape="circle" size="large" />
              </div>
            </Tooltip>
          ))}
        </div>
      </CardHeader>

      <Typography.Paragraph
        ellipsis={{ rows: 4 }}
        style={{ height: '85px', margin: '20px 0 20px 0' }}
      >
        {guild.shortDescription}
      </Typography.Paragraph>

      <Technologies technologies={guild.skills} shortList />
    </CardWrapper>
  )
}

export default withRouter(GuildCard)
