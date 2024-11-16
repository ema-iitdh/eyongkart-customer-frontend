import { Link, NavLink, useNavigate } from "react-router-dom";

export default function WomenCategoryOption({ title, filteredWomen }) {
  const navigate = useNavigate();

  return (
    <div className="group relative">
      <p className="cursor-pointer p-2 hover:bg-red-500">{title}</p>
      {/* Dropdown for subcategories */}
      <div className="hidden group-hover:grid absolute left-0 top-0 z-10 bg-gray-100 px-4 grid-cols-3 gap-4 overflow-y-auto w-[600px]">
        {filteredWomen?.map((category) => (
          <div key={category._id} className="category">
            <NavLink
              key={category._id}
              to={`/sorted/${category._id} `}
              className="font-bold text-red-500 cursor-pointer"
            >
              {category.name}
            </NavLink>
            {/* Subcategories List */}
            <ul className="list-none mt-2">
              {category?.subCategories
                ?.sort((a, b) =>
                  a.subCategoryName.localeCompare(b.subCategoryName)
                )
                .map((subcategory) => (
                  <li key={subcategory._id}>
                    <NavLink
                      to={`/sorted/${category._id}/${subcategory._id}`}
                      className="block text-sm text-black hover:text-red-500"
                    >
                      {subcategory.subCategoryName}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
