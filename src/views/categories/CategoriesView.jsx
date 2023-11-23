import React from 'react'
import { Icon } from '@iconify/react';
import Header from '../../components/Header.jsx'
import CategoryCard from './CategoryCard.jsx'

export default function CategoriesView() {
  return (
    <>
    <Header viewName={"Categories"} productCountChip={false} search={true} path={"Home"}/>
        <main className="relative">
            <section className="grid grid-cols-4 gap-4 mx-4 mt-2">
                <CategoryCard name={"Sudaderas"}/>
                <CategoryCard name={"Sudaderas"}/>
                <CategoryCard name={"Sudaderas"}/>
                <CategoryCard name={"Sudaderas"}/>
                <CategoryCard name={"Sudaderas"}/>
                <CategoryCard name={"Sudaderas"}/>
                <CategoryCard name={"Sudaderas"}/>
                <CategoryCard name={"Sudaderas"}/>
                <CategoryCard name={"Sudaderas"}/>
                <CategoryCard name={"Sudaderas"}/>
                <CategoryCard name={"Sudaderas"}/>
                <CategoryCard name={"Sudaderas"}/>
                <CategoryCard name={"Sudaderas"}/>
                <CategoryCard name={"Sudaderas"}/>
                <CategoryCard name={"Sudaderas"}/>
                <CategoryCard name={"Sudaderas"}/>
            </section>
        </main>
    </>
  )
}
