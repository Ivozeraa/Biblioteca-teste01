import S from './styles/IconUser.Module.css'

import { FaUser } from 'react-icons/fa'

export const IconUser = () => {
  return (
    <div className={S.iconUser}>
      <FaUser className={S.icon}/>
    </div>
  )
}
