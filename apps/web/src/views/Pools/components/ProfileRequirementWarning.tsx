import { Box, Message, MessageText } from '@kazamaswap/uikit'

import { Pool, NextLinkFromReactRouter } from '@kazamaswap/widgets-internal'

import { useTranslation } from '@kazamaswap/localization'
import { Token } from '@kazamaswap/sdk'
import { useProfileRequirement } from '../hooks/useProfileRequirement'

export function ProfileRequirementWarning({
  profileRequirement,
}: {
  profileRequirement: Pool.DeserializedPool<Token>['profileRequirement']
}) {
  const { t } = useTranslation()
  const { notMeetRequired, notMeetThreshold } = useProfileRequirement(profileRequirement)
  return (
    <Message variant="warning">
      <Box>
        <MessageText>
          {notMeetRequired &&
            notMeetThreshold &&
            t('This pool requires active Pancake Profile and %amount% profile points.', {
              amount: profileRequirement?.thresholdPoints?.toNumber(),
            })}
          {notMeetRequired && !notMeetThreshold && t('This pool requires active Pancake Profile')}
          {!notMeetRequired &&
            notMeetThreshold &&
            t('This pool requires %amount% profile points.', {
              amount: profileRequirement?.thresholdPoints?.toNumber(),
            })}
        </MessageText>
        {(notMeetRequired || notMeetThreshold) && (
          <MessageText bold>
            {notMeetRequired ? (
              <NextLinkFromReactRouter style={{ textDecoration: 'underline' }} to="/create-profile">
                {t('Create Profile')} »
              </NextLinkFromReactRouter>
            ) : (
              <NextLinkFromReactRouter style={{ textDecoration: 'underline' }} to="/profile">
                {t('Go to Profile')} »
              </NextLinkFromReactRouter>
            )}
          </MessageText>
        )}
      </Box>
    </Message>
  )
}
