import { MdOutlineEditNotifications ,MdOutlineSettings } from 'react-icons/md'

export const sidebarItems = [
  {
    id: 1,
    label: 'Notification',
    parent_id: null,
    icon: <MdOutlineEditNotifications size={27} />,
    order_index: 2,
    url: '/',
  },
  {
    id: 2,
    label: 'Settings',
    parent_id: null,
    icon: <MdOutlineSettings  size={27} />,
    order_index: 3,
    url: '/settings',
  },
]
