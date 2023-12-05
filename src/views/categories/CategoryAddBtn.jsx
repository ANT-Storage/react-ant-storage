import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function CategoryAddBtn() {
  return (
    <Link className="absolute right-5 bottom-5" to="/categories/create">
      <Icon width="64" height="64" icon="zondicons:add-solid" />
    </Link>
  )
}
