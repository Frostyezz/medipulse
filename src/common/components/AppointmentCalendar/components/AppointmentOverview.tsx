import React from 'react'
import { Flex } from '@mantine/core'
import { EventClickArg } from '@fullcalendar/core'
import useFetchProfile from '@/common/hooks/useFetchProfile'
import ProfileInfo from '@/views/TransferRequests/components/ProfileInfo'

const AppointmentOverview: React.FC<EventClickArg> = ({ event }) => {
  const patient = useFetchProfile(event.extendedProps.patientId)

  return (
    <Flex direction="column">
      {event.extendedProps.patientId && !!patient && <ProfileInfo {...patient} />}
    </Flex>
  )
}

export default AppointmentOverview