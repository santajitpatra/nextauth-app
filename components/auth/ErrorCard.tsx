import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import React from 'react'
import { CardWrapper } from './CardWrapper'

export const ErrorCard = () => {
  return (
    <CardWrapper
    headerLable='Oops! Something went wrong'
    backButtonHref='/auth/login'
    backButtonLabel='Back to Login'>
      <div
      className='w-full flex justify-center items-center'>
        <ExclamationTriangleIcon className='text-destructive' />
      </div>
    </CardWrapper>
  )
}
