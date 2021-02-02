import {categoryModel} from './categoryModel'
export const categoriesList = []


const other = categoryModel('other','https://vistapointe.net/images/products-wallpaper-4.jpg',true)
categoriesList.push(other)

const legumes = categoryModel('legumes','https://www.jessicagavin.com/wp-content/uploads/2020/05/types-of-beans-1200.jpg')
categoriesList.push(legumes)

const oils = categoryModel('oils','https://www.excelvite.com/wp-content/uploads/2018/11/Healthy-oil.jpg')
categoriesList.push(oils)

const soaps = categoryModel('soaps','https://i.ytimg.com/vi/zkIvUfpRIrw/maxresdefault.jpg')
categoriesList.push(soaps)

const paths = categoryModel('paths','https://i.ytimg.com/vi/zkIvUfpRIrw/maxresdefault.jpg')
categoriesList.push(paths)

const flours = categoryModel('flours','https://res.cloudinary.com/grohealth/image/upload/$wpsize_!_cld_full!,w_1200,h_630,c_scale/v1588092404/Low-Carb-Flour.png')
categoriesList.push(flours)