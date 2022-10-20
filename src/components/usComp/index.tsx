import React, { PropsWithChildren } from 'react'

import UsButton from '../usButton'

export {
  UsButton
}

const UsContainer: React.FC<PropsWithChildren> | any = (props) => {
  return (
    <React.Fragment>{props.children}</React.Fragment>
  )
}

export default UsContainer;