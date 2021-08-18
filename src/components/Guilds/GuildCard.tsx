import React from 'react'
import { Tooltip, Typography } from 'antd'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { Guild } from '../../types'
import { getEmployeeLink } from '../../paths'
import Technologies from '../UI/Technologies'
import { CardWrapper, CardHeader, GuildTitle } from './styled'
import Avatar from '../Avatar'

interface Props {
  guild: Guild
  style?: any
}

function GuildCard({ guild, style, history }: Props & RouteComponentProps) {
  return (
    <CardWrapper style={style}>
      <CardHeader>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <GuildTitle>
            <Link to={`/guilds/${guild.azureDisplayName}`}>{guild.title}</Link>
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
                <Avatar employee={lead} shape="circle" size="large" />
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

      <Technologies technologies={guild.skills} amount={2} isTitleShown />
    </CardWrapper>
  )
}

export default withRouter(GuildCard)
