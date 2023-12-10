import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

export default function CategoryAddBtn() {
  return (
    <Link className="mt-4 rounded h-[192px] bg-[#e5e5e5] font-bold text-center align-middle" to="/categories/create">
      <Icon className="mx-auto mt-[3.5em] mb-1" width="34" height="34" icon="zondicons:add-solid" />
      New Category
    </Link>
  )
}
